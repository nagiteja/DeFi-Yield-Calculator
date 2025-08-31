const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware - temporarily disabled for debugging
// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'"],
//             styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
//             fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
//             scriptSrc: ["'self'", "'unsafe-inline'"],
//             imgSrc: ["'self'", "data:", "https:"],
//             connectSrc: ["'self'", "https://api.coingecko.com", "https://api.llama.fi", "https://api.etherscan.io"]
//         }
//     }
// }));

// Basic security headers without CSP
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Ensure JavaScript files are served with correct headers
app.get('*.js', (req, res, next) => {
    res.setHeader('Content-Type', 'application/javascript');
    next();
});

app.get('*.css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    next();
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/demo', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo.html'));
});

// API health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'DeFi Yield Calculator',
        version: '1.0.0'
    });
});

// Debug endpoint to check if files exist
app.get('/api/debug/files', (req, res) => {
    const fs = require('fs');
    const files = [
        'index.html',
        'script.js',
        'market-data.js',
        'config.js'
    ];
    
    const fileStatus = files.map(file => ({
        file,
        exists: fs.existsSync(path.join(__dirname, file)),
        size: fs.existsSync(path.join(__dirname, file)) ? fs.statSync(path.join(__dirname, file)).size : 0
    }));
    
    res.json({
        files: fileStatus,
        directory: __dirname,
        timestamp: new Date().toISOString()
    });
});

// Test endpoint for JavaScript files
app.get('/api/test-js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.send('console.log("JavaScript test endpoint working!");');
});

// API endpoint for market data (optional - can be used for caching)
app.get('/api/market-data/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd&include_24hr_change=true`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch market data' });
    }
});

// Catch-all route for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 DeFi Yield Calculator server running on port ${PORT}`);
    console.log(`📱 Local: http://localhost:${PORT}`);
    console.log(`🌐 Railway: https://your-app-name.railway.app`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});
