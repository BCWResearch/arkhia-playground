require('dotenv').config();
const axios = require('axios');

const authUrl = process.env.ARKHIA_AUTH_URL;
const userEmail = process.env.ARKHIA_EMAIL;
const userPassword = process.env.ARKHIA_PASSWORD;


const TEST_TIMEOUT = 30000;

// Helper function to check environment variables
const checkEnvVariables = () => {
    const required = {
        ARKHIA_AUTH_URL: authUrl,
        ARKHIA_EMAIL: userEmail,
        ARKHIA_PASSWORD: userPassword
    };

    const missing = Object.entries(required)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

//extract JWT token from Set-Cookie header
const extractTokenFromCookie = (setCookieHeader) => {
    if (!setCookieHeader) return null;


    const cookieString = Array.isArray(setCookieHeader)
        ? setCookieHeader.find(cookie => cookie.includes('jwt_token=')) || setCookieHeader[0]
        : setCookieHeader;

    // Extract jwt_token value
    const tokenMatch = cookieString.match(/jwt_token=([^;]+)/);
    return tokenMatch ? tokenMatch[1] : null;
};

// Helper function to create axios instance with auth token cookie
const createAuthenticatedClient = (token) => {
    return axios.create({
        baseURL: authUrl,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `jwt_token=${token}`
        },
        withCredentials: true
    });
};

describe('Arkhia Platform Operations Tests', () => {
    let authToken = null;
    let apiClient = null;
    let createdProjectId = null;


    beforeAll(async () => {
        checkEnvVariables();

        // Login and get auth token from cookie
        try {
            const response = await axios.post(`${authUrl}/user/login`, {
                email: userEmail,
                password: userPassword
            });

            // Extract token from Set-Cookie header
            const setCookieHeader = response.headers['set-cookie'];
            authToken = extractTokenFromCookie(setCookieHeader);

            if (!authToken) {
                throw new Error('No JWT token found in response cookies');
            }

            apiClient = createAuthenticatedClient(authToken);

            console.log('Successfully authenticated');
        } catch (error) {
            console.error('Failed to authenticate:', error.message);
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
            throw error;
        }
    }, TEST_TIMEOUT);

    describe('Arkhia Authentication', () => {
        it('should successfully login to Arkhia with valid credentials', async () => {
            const response = await axios.post(`${authUrl}/user/login`, {
                email: userEmail,
                password: userPassword
            });

            expect(response.status).toBe(200);
            expect(response.headers).toHaveProperty('set-cookie');

            // Verify JWT token is present in cookies
            const setCookieHeader = response.headers['set-cookie'];
            const token = extractTokenFromCookie(setCookieHeader);
            expect(token).toBeTruthy();
        });

        it('should fail login to Arkhia with invalid credentials', async () => {
            await expect(
                axios.post(`${authUrl}/user/login`, {
                    email: 'invalid@email.com',
                    password: 'wrongpassword'
                })
            ).rejects.toThrow();
        });
    });

    describe('Arkhia User', () => {
        it('should get user details', async () => {
            const response = await apiClient.get('/user/details');

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('status', true);
            expect(response.data).toHaveProperty('response');

            const userDetails = response.data.response;

            // Validate user details structure
            expect(userDetails).toHaveProperty('id');
            expect(userDetails).toHaveProperty('email');
            expect(userDetails).toHaveProperty('domain');
            expect(userDetails).toHaveProperty('role_id');
            expect(userDetails).toHaveProperty('active');
            expect(userDetails).toHaveProperty('created_at');
            expect(userDetails).toHaveProperty('updated_at');

            // Validate that the email matches the logged-in user
            expect(userDetails.email).toBe(userEmail);

            // Validate user is active
            expect(userDetails.active).toBe(true);

            console.log('User details retrieved successfully');
        });

        it('should get user subscription details', async () => {
            const response = await apiClient.get('/user/subscription');

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('status', true);
            expect(response.data).toHaveProperty('response');

            const subscription = response.data.response;

            // Validate plan details
            expect(subscription).toHaveProperty('plan_details');
            const planDetails = subscription.plan_details;
            expect(planDetails).toHaveProperty('id');
            expect(planDetails).toHaveProperty('name');
            expect(planDetails).toHaveProperty('description');
            expect(planDetails).toHaveProperty('request_limit');
            expect(planDetails).toHaveProperty('price');
            expect(planDetails).toHaveProperty('valid');
            expect(planDetails).toHaveProperty('project_limit');
            expect(planDetails).toHaveProperty('tps');
            expect(planDetails).toHaveProperty('url');
            expect(planDetails).toHaveProperty('domain_whitelist_limit');
            expect(planDetails).toHaveProperty('team_member_limit');
            expect(planDetails).toHaveProperty('watchtower_limit');
            expect(planDetails).toHaveProperty('scout_enabled');
            expect(planDetails).toHaveProperty('scout_request_limit');
            expect(planDetails).toHaveProperty('scout_subscription_limit');
            expect(planDetails).toHaveProperty('rest_depth_limit');

            // Validate plan usage
            expect(subscription).toHaveProperty('plan_usage');
            const planUsage = subscription.plan_usage;

            // Validate current plan usage
            expect(planUsage).toHaveProperty('plan');
            expect(planUsage.plan).toHaveProperty('requests_date_start');
            expect(planUsage.plan).toHaveProperty('requests_used');
            expect(planUsage.plan).toHaveProperty('daily_average_requests_used');
            expect(planUsage.plan).toHaveProperty('autoscale');
            expect(planUsage.plan).toHaveProperty('requests_over_limit');
            expect(planUsage.plan).toHaveProperty('requests_over_limit_cost');

            // Validate last cycle data
            expect(planUsage).toHaveProperty('last_cycle_data');
            expect(planUsage.last_cycle_data).toHaveProperty('requests_date_start');
            expect(planUsage.last_cycle_data).toHaveProperty('requests_used');
            expect(planUsage.last_cycle_data).toHaveProperty('requests_over_limit');
            expect(planUsage.last_cycle_data).toHaveProperty('daily_average_requests_used');
            expect(planUsage.last_cycle_data).toHaveProperty('requests_over_limit_cost');

            // Validate forecast
            expect(planUsage).toHaveProperty('forecast');
            expect(planUsage.forecast).toHaveProperty('current_cycle_usage');
            expect(planUsage.forecast).toHaveProperty('next_cycle_usage');

            console.log('User subscription retrieved successfully');
        });
    });

    describe('Arkhia Projects', () => {
        it('should create a new Arkhia project', async () => {
            // Generate unique project name with timestamp
            const timestamp = Date.now();
            const uniqueProjectName = `Arkhia playground ${timestamp}`;

            const newProject = {
                email: userEmail,
                name: uniqueProjectName,
                description: "Testing create project in QA",
                protocol: "Hedera"
            };

            const response = await apiClient.post('/project/create', newProject);

            expect(response.status).toBe(200);

            console.log(`Project created successfully with name: ${uniqueProjectName}`);

        });

        it('should retrieve list of Arkhia projects', async () => {
            const response = await apiClient.get('/project/list');

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('status', true);
            expect(response.data).toHaveProperty('response');
            expect(response.data.response).toHaveProperty('projects');
            expect(response.data.response).toHaveProperty('sharedProjects');

            // Validate projects array
            expect(Array.isArray(response.data.response.projects)).toBe(true);
            expect(Array.isArray(response.data.response.sharedProjects)).toBe(true);

            // Extract project ID from the first active project
            const activeProject = response.data.response.projects.find(project => project.active === true);

            if (activeProject) {
                createdProjectId = activeProject.id;
                console.log('Extracted active project ID for update test:', createdProjectId);
                console.log('Project name:', activeProject.name);

                // Validate project structure
                expect(activeProject).toHaveProperty('id');
                expect(activeProject).toHaveProperty('name');
                expect(activeProject).toHaveProperty('active', true);
                expect(activeProject).toHaveProperty('admin');
                expect(activeProject).toHaveProperty('created_at');
                expect(activeProject).toHaveProperty('protocol');
                expect(activeProject).toHaveProperty('layer_security_2');
                expect(activeProject).toHaveProperty('domain_whitelisting');
            } else {
                console.warn('No active projects found in the response');

            // Validate shared project structure if shared projects exist
            if (response.data.response.sharedProjects.length > 0) {
                const sharedProject = response.data.response.sharedProjects[0];
                expect(sharedProject).toHaveProperty('id');
                expect(sharedProject).toHaveProperty('name');
                expect(sharedProject).toHaveProperty('active');
                expect(sharedProject).toHaveProperty('admin');
                expect(sharedProject).toHaveProperty('created_at');
                expect(sharedProject).toHaveProperty('protocol');
                expect(sharedProject).toHaveProperty('layer_security_2');
                expect(sharedProject).toHaveProperty('domain_whitelisting');
            }
        }});

        it('should update an existing Arkhia project', async () => {

            if (!createdProjectId) {
                console.log('Skipping update test - no project ID available');
                return;
            }


            const timestamp = Date.now();
            const uniqueUpdatedName = `Arkhia Playground Updated ${timestamp}`;

            const updateData = {
                email: userEmail,
                id: createdProjectId,
                projectId: createdProjectId,
                newProjectName: uniqueUpdatedName,
                newProjectDescription: "Updated description for testing"
            };

            const response = await apiClient.post('/project/update', updateData);

            expect(response.status).toBe(200);

            console.log(`Project updated successfully with new name: ${uniqueUpdatedName}`);

        });

        it('should get Arkhia project details', async () => {
            if (!createdProjectId) {
                console.log('Skipping get details test - no project ID available');
                return;
            }

            const requestData = {
                projectId: createdProjectId
            };

            const response = await apiClient.post('/project/details', requestData);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('status', true);
            expect(response.data).toHaveProperty('response');

            const projectDetails = response.data.response;

            // Validate project basic info
            expect(projectDetails).toHaveProperty('id');
            expect(projectDetails).toHaveProperty('name');
            expect(projectDetails).toHaveProperty('active');
            expect(projectDetails).toHaveProperty('description');
            expect(projectDetails).toHaveProperty('api_key');
            expect(projectDetails).toHaveProperty('api_secret');

            // Validate network access
            expect(projectDetails).toHaveProperty('network_access');
            expect(Array.isArray(projectDetails.network_access)).toBe(true);

            if (projectDetails.network_access.length > 0) {
                const network = projectDetails.network_access[0];
                expect(network).toHaveProperty('base_url');
                expect(network).toHaveProperty('protocol_name');
                expect(network).toHaveProperty('network_name');
                expect(network).toHaveProperty('available_services');
                expect(Array.isArray(network.available_services)).toBe(true);

                if (network.available_services.length > 0) {
                    const service = network.available_services[0];
                    expect(service).toHaveProperty('id');
                    expect(service).toHaveProperty('name');
                    expect(service).toHaveProperty('url');
                }
            }

            // Validate project settings
            expect(projectDetails).toHaveProperty('projectSettings');
            expect(projectDetails.projectSettings).toHaveProperty('project_id');
            expect(projectDetails.projectSettings).toHaveProperty('historical_test_net');
            expect(projectDetails.projectSettings).toHaveProperty('layer_security_2');
            expect(projectDetails.projectSettings).toHaveProperty('domain_whitelisting');

            // Validate timestamps and ownership
            expect(projectDetails).toHaveProperty('created_at');
            expect(projectDetails).toHaveProperty('updated_at');
            expect(projectDetails).toHaveProperty('last_access');
            expect(projectDetails).toHaveProperty('role');
            expect(projectDetails).toHaveProperty('owner');
            expect(projectDetails).toHaveProperty('ownerEmail');

            console.log('Project details retrieved successfully');
        });

        it('should remove an Arkhia project', async () => {
            // Skip if no project ID was extracted
            if (!createdProjectId) {
                console.log('Skipping remove test - no project ID available');
                return;
            }

            const removeData = {
                email: userEmail,
                projectId: createdProjectId,
                password: userPassword
            };

            console.log('Removing project:', createdProjectId);

            const response = await apiClient.post('/project/remove', removeData);

            expect(response.status).toBe(200);

            console.log('Project removed successfully');

            // Clear the project ID after successful removal
            createdProjectId = null;

        });
    });

    // Cleanup after all tests
    afterAll(async () => {
        // Clean up: Remove the project if we have an ID
        if (createdProjectId && apiClient) {
            try {
                const removeData = {
                    email: userEmail,
                    projectId: createdProjectId,
                    password: userPassword
                };

                console.log('Cleaning up - removing project:', createdProjectId);

                const response = await apiClient.post('/project/remove', removeData);

                if (response.status === 200) {
                    console.log('Project removed successfully');
                } else {
                    console.log('Project removal returned status:', response.status);
                }
            } catch (error) {
                console.error('Failed to remove project during cleanup:', error.message);
                // Don't throw error in cleanup - just log it
            }
        }
    });
});

