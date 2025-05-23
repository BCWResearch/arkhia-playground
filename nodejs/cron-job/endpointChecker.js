console.clear();
require('dotenv').config({path: '.env'});
const { CronJob } = require('cron');
const { exec } = require('child_process');
const axios = require('axios');
const mailchimp = require('@mailchimp/mailchimp_transactional');
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const apiKey = process.env.ARKHIA_API_KEY;
const endpoint = process.env.ARKHIA_MAINNET_API_URL;

// Define success and error messages
const SuccessMessages = {
    ENDPOINT_MONITORING_RUNNING: 'Endpoint monitoring job running',
    ENDPOINT_MONITORING_SCHEDULED: 'Endpoint monitoring job scheduled',
    EMAIL_SENT: 'Notification email sent successfully'
};

const LoggerMessage = {
    ENDPOINT_MONITORING_FAILED: 'Failed to start endpoint monitoring job',
    EMAIL_FAILED: 'Failed to send notification email',
    ENDPOINT_DOWN: 'Endpoint is down',
    ENDPOINT_HEALTHY: 'Endpoint is healthy',
    ENDPOINT_CHECK_ERROR: 'Error checking endpoint'
};

class EndpointMonitorHandler {
    static endpointMonitoringJob;

    // Define the endpoints to monitor with their complete configuration
    static endpoints = [
        {
            name: "JSON-RPC",
            url: `${endpoint}/json-rpc/v1/${apiKey}`,
            type: "json-rpc",
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                jsonrpc: "2.0",
                method: "web3_clientVersion",
                params: [],
                id: 0
            },
            validateResponse: (response) => {
                const isValidRpcResponse = response.data &&
                    response.data.hasOwnProperty('jsonrpc') &&
                    response.data.hasOwnProperty('id');

                if (!isValidRpcResponse) {
                    console.error(`Invalid JSON-RPC response:`, response.data);
                    return false;
                }
                return true;
            }
        },
        {
            name: "REST API",
            url: `${endpoint}/${apiKey}/api/v1/transactions`,
            type: "rest",
            method: "get",
            headers: {},
            data: {},
            validateResponse: (response) => {
                return response.status >= 200 && response.status < 300;
            }
        },
        {
            name: "Arkhia Auth API",
            url: "https://auth-be.arkhia.io/health",
            type: "health",
            method: "get",
            headers: {},
            data: {},
            validateResponse: (response) => {
                // Check if response status is OK and data contains status field
                const isValid = response.status >= 200 &&
                    response.status < 300 &&
                    response.data;

                if (!isValid) {
                    console.error(`Invalid health check response from Auth API:`, response.data);
                    return false;
                }
                return true;
            }
        },
        {
            name: "Watchtower API",
            url: `${endpoint}/watchtower/v1`,
            type: "watchtower",
            method: "get",
            headers: {},
            data: {},
            validateResponse: (response) => {
                const isValid = response.status >= 200 && response.status < 300;

                if (!isValid) {
                    console.error(`Invalid response from Watchtower API:`, response.data);
                    return false;
                }
                return true;
            }
        },
        {
            name: "Events API",
            url: `https://api.arkhia.io/service/status/${apiKey}`,
            type: "events",
            method: "get",
            headers: {},
            data: {},
            validateResponse: (response) => {
                const isValid = response.status >= 200 && response.status < 300;

                if (!isValid) {
                    console.error(`Invalid response from Events API:`, response.data);
                    return false;
                }
                return true;
            }
        },
        {
            name: "Subgraph API",
            url: `${endpoint}/subgraph/v1/${apiKey}`,
            type: "subgraph",
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                query: `{ _meta { block { number } } }`
            },
            validateResponse: (response) => {
                const isValid = response.status >= 200 &&
                    response.status < 300 &&
                    response.data &&
                    !response.data.errors;

                if (!isValid) {
                    console.error(`Invalid response from Subgraph API:`, response.data);
                    return false;
                }
                return true;
            }
        }
    ];

    // Start all scheduled jobs
    static async startScheduledJobs() {
        this.startEndpointMonitoringJob();
    }

    // Initialize and start the endpoint monitoring job
    static async startEndpointMonitoringJob() {
        try {
            // Run every 6 hours
            const everySixHours = '0 */6 * * *';
            this.endpointMonitoringJob = new CronJob(everySixHours, async () => {
                console.log(SuccessMessages.ENDPOINT_MONITORING_RUNNING);
                await this.checkEndpoints();
            });

            this.endpointMonitoringJob.start();
            console.log(SuccessMessages.ENDPOINT_MONITORING_SCHEDULED);
        } catch (e) {
            console.error(`${LoggerMessage.ENDPOINT_MONITORING_FAILED}: ${e.message}`);
        }
    }

    // Check all endpoints and send notification if any are down
    static async checkEndpoints() {
        const failedEndpoints = [];
        console.log(`Starting endpoint checks at ${new Date().toISOString()}`);

        for (const endpoint of this.endpoints) {
            console.log(`Checking endpoint: ${endpoint.name} - ${endpoint.url}`);
            try {
                const isHealthy = await this.checkEndpointHealth(endpoint);
                if (!isHealthy) {
                    failedEndpoints.push(endpoint);
                    console.error(`${LoggerMessage.ENDPOINT_DOWN}: ${endpoint.name} - ${endpoint.url}`);
                } else {
                    console.log(`${LoggerMessage.ENDPOINT_HEALTHY}: ${endpoint.name} - ${endpoint.url}`);
                    console.log(`✅ API call to ${endpoint.name} successful at ${new Date().toISOString()}`);
                }
            } catch (error) {
                failedEndpoints.push(endpoint);
                console.error(`${LoggerMessage.ENDPOINT_CHECK_ERROR}: ${endpoint.name} - ${endpoint.url}`, error);
            }
        }

        if (failedEndpoints.length > 0) {
            await this.sendNotificationEmail(failedEndpoints);
        } else {
            console.log(`All endpoints are healthy! Check completed at ${new Date().toISOString()}`);
            console.log('All endpoints are healthy. Running NPM commands...');
            await this.runNPMCommands();
        }
    }

    // Check if an endpoint is healthy based on its configuration
    static async checkEndpointHealth(endpoint) {
        try {
            console.log(`Making ${endpoint.type} request to: ${endpoint.url} using ${endpoint.method.toUpperCase()} method`);
            const startTime = Date.now();

            // Create the request configuration using the endpoint's properties
            const requestConfig = {
                method: endpoint.method,
                url: endpoint.url,
                headers: endpoint.headers || {},
                timeout: 10000
            };

            // Add data payload if it exists
            if (endpoint.data && Object.keys(endpoint.data).length > 0) {
                requestConfig.data = endpoint.data;
            }

            const response = await axios(requestConfig);
            const responseTime = Date.now() - startTime;

            // Use the endpoint's validation function or default to status code check
            const isHealthy = endpoint.validateResponse
                ? endpoint.validateResponse(response)
                : (response.status >= 200 && response.status < 300);

            if (isHealthy) {
                console.log(`Response from ${endpoint.url} received in ${responseTime}ms with status code: ${response.status}`);
            } else {
                console.error(`Unhealthy response from ${endpoint.url} with status code: ${response.status}`);
            }
            return isHealthy;
        } catch (error) {
            console.error(`Failed to connect to ${endpoint.url}: ${error.message}`);
            return false;
        }
    }
    static async runNPMCommands() {
        const commands = [
            'npm run test:arkhia',
            'npm run test:hedera:rest:api',
            'npm run test:hedera:rest:api:contracts',
            'npm run test:hedera:jsonrpc:testnet:contract:all',
            'npm run test:hedera:api:events:read',
            'npm run test:hedera:subgraph:api'
        ];

        for (const command of commands) {
            try {
                console.log(`Running command: ${command}`);
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error executing command ${command}:`, error);
                        return;
                    }
                    console.log(`Output from command ${command}:`, stdout);
                    if (stderr) {
                        console.error(`Stderr from command ${command}:`, stderr);
                    }
                });
            } catch (error) {
                console.error(`Failed to run command ${command}: ${error.message}`);
            }
        }
    }

    // Send notification email for failed endpoints
    static async sendNotificationEmail(failedEndpoints) {
        try {
            // Initialize Mailchimp with API key
            const mailchimpClient = mailchimp(MAILCHIMP_API_KEY);

            // Format the failed endpoints as message
            const messageDetails = failedEndpoints.map(endpoint =>
                `${endpoint.name}: ${endpoint.url}`
            ).join('\n');

            // Create HTML version of the message
            const htmlContent = `
        <h2>Endpoint Monitoring Alert</h2>
        <p>The following endpoints are currently down:</p>
        <ul>
          ${failedEndpoints.map(endpoint =>
                `<li><strong>${endpoint.name}:</strong> ${endpoint.url}</li>`
            ).join('')}
        </ul>
        <p>Please check the endpoints and restore service as soon as possible.</p>
        <p>Time of check: ${new Date().toISOString()}</p>
      `;

            // Prepare email message with multiple recipients
            const emailMessage = {
                message: {
                    from_email: 'paul@arkhia.io',
                    to: [
                        { email: 'paul@bcw.group' },
                        { email: 'daniel@arkhia.io' },
                        { email: 'syed@arkhia.io' },
                        { email: 'amman@bcw.group' }
                    ],
                    subject: 'Endpoint Monitoring Alert: Endpoints Down',
                    text: `The following endpoints are currently down:\n\n${messageDetails}`,
                    html: htmlContent
                }
            };

            // Send email
            console.log('Sending email via Mailchimp...');
            const response = await mailchimpClient.messages.send(emailMessage);
            console.log(`${SuccessMessages.EMAIL_SENT}:`, response);
        } catch (error) {
            console.error(`${LoggerMessage.EMAIL_FAILED}: ${error.message}`);
            throw error;
        }
    }
}

module.exports = EndpointMonitorHandler;

if (require.main === module) {
    (async () => {
        try {
            await EndpointMonitorHandler.startScheduledJobs();
            console.log('Endpoint monitoring started successfully');
        } catch (error) {
            console.error('Failed to start endpoint monitoring:', error);
        }
    })();
}