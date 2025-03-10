console.clear();
require('dotenv').config({path: '.env'});
const { CronJob } = require('cron');
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

    // Define the endpoints to monitor with their types
    static endpoints = [
        { name: 'REST API', url: `${endpoint}/${apiKey}/api/v1/transactions`, type: 'rest' },
        { name: 'JSON-RPC', url: `${endpoint}/json-rpc/v1/${apiKey}`, type: 'json-rpc' },
    ];

    // Start all scheduled jobs
    static async startScheduledJobs() {
        this.startEndpointMonitoringJob();
    }

    // Initialize and start the endpoint monitoring job
    static async startEndpointMonitoringJob() {
        try {
            // Run every 5 minutes
            //TODO: Update time to check every 24 hours
            const everyFiveMinutes = '*/5 * * * *';

            this.endpointMonitoringJob = new CronJob(everyFiveMinutes, async () => {
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
                const isHealthy = await this.checkEndpointHealth(endpoint.url, endpoint.type);
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
        }
    }

    // Check if an endpoint is healthy based on its type
    static async checkEndpointHealth(url, type = 'rest') {
        try {
            let response;
            const startTime = Date.now();

            if (type === 'json-rpc') {
                console.log(`Making JSON-RPC request to: ${url}`);
                // Use the specific JSON-RPC request format
                response = await axios({
                    method: 'post',
                    url: url,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        jsonrpc: "2.0",
                        method: "web3_clientVersion",
                        params: [],
                        id: 0
                    },
                    timeout: 10000
                });

                // For JSON-RPC, also check if the response contains expected fields
                const isValidRpcResponse = response.data &&
                    response.data.hasOwnProperty('jsonrpc') &&
                    response.data.hasOwnProperty('id')

                if (!isValidRpcResponse) {
                    console.error(`Invalid JSON-RPC response from ${url}:`, response.data);
                    return false;
                }
            } else {
                console.log(`Making REST API request to: ${url}`);
                response = await axios.get(url, { timeout: 10000 });
            }

            const responseTime = Date.now() - startTime;

            const isHealthy = response.status >= 200 && response.status < 300;
            if (isHealthy) {
                console.log(`Response from ${url} received in ${responseTime}ms with status code: ${response.status}`);
            } else {
                console.error(`Unhealthy response from ${url} with status code: ${response.status}`);
            }
            return isHealthy;
        } catch (error) {
            console.error(`Failed to connect to ${url}: ${error.message}`);
            return false;
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

            // Prepare email message
            const emailMessage = {
                message: {
                    from_email: 'paul@arkhia.io',
                    to: [{ email: 'paul@bcw.group' }],
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

// Export the class for use in other modules
module.exports = EndpointMonitorHandler;

// Start the monitoring when this file is executed directly
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