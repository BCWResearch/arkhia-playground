const EndpointMonitorHandler = require('./cron-job/endpointChecker');
const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

(async () => {
    try {
        // Start the endpoint monitoring job
        await EndpointMonitorHandler.startScheduledJobs();
        console.log('Endpoint monitoring started successfully');

        // Start an Express server to keep the container running
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start endpoint monitoring:', error);
        process.exit(1);
    }
})();