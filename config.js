// Configuration file for API keys and settings
// Copy this file to config.local.js and add your actual API keys

const CONFIG = {
    // API Keys (Get these from respective services)
    apiKeys: {
        // CoinMarketCap Pro API (Optional - for premium data)
        coinmarketcap: 'YOUR_CMC_API_KEY_HERE',
        
        // Etherscan API (Optional - for gas prices and contract data)
        etherscan: 'YOUR_ETHERSCAN_API_KEY_HERE',
        
        // Infura/Alchemy (Optional - for blockchain data)
        infura: 'YOUR_INFURA_PROJECT_ID_HERE',
        alchemy: 'YOUR_ALCHEMY_API_KEY_HERE'
    },

    // API Rate Limits and Settings
    rateLimits: {
        coingecko: {
            requestsPerMinute: 50,
            requestsPerHour: 1000
        },
        defillama: {
            requestsPerMinute: 100,
            requestsPerHour: 5000
        },
        etherscan: {
            requestsPerMinute: 5,
            requestsPerHour: 100
        }
    },

    // Cache Settings
    cache: {
        defaultTimeout: 30000, // 30 seconds
        priceDataTimeout: 60000, // 1 minute for prices
        yieldDataTimeout: 300000, // 5 minutes for yields
        gasDataTimeout: 60000 // 1 minute for gas prices
    },

    // Default Token Settings
    defaultTokens: [
        { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
        { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
        { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin' },
        { id: 'dai', symbol: 'DAI', name: 'Dai' },
        { id: 'wrapped-bitcoin', symbol: 'WBTC', name: 'Wrapped Bitcoin' },
        { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
        { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
        { id: 'aave', symbol: 'AAVE', name: 'Aave' }
    ],

    // Default Protocol Settings
    defaultProtocols: [
        { id: 'uniswap-v3', name: 'Uniswap V3', category: 'DEX' },
        { id: 'aave-v3', name: 'Aave V3', category: 'Lending' },
        { id: 'compound-v3', name: 'Compound V3', category: 'Lending' },
        { id: 'curve', name: 'Curve', category: 'DEX' },
        { id: 'balancer', name: 'Balancer', category: 'DEX' },
        { id: 'yearn-finance', name: 'Yearn Finance', category: 'Yield Aggregator' },
        { id: 'convex-finance', name: 'Convex Finance', category: 'Yield Aggregator' }
    ],

    // Gas Price Settings
    gasSettings: {
        defaultEthPrice: 2000, // USD per ETH
        gasLimits: {
            swap: 150000,
            addLiquidity: 200000,
            removeLiquidity: 150000,
            stake: 100000,
            unstake: 80000,
            approve: 50000,
            transfer: 21000
        }
    },

    // UI Settings
    ui: {
        autoRefreshInterval: 30000, // 30 seconds
        maxYieldOpportunities: 20,
        chartUpdateInterval: 5000, // 5 seconds for real-time charts
        showNotifications: true,
        theme: 'auto' // 'auto', 'light', 'dark'
    },

    // Error Handling
    errorHandling: {
        maxRetries: 3,
        retryDelay: 1000, // 1 second
        showUserErrors: true,
        logErrors: true
    },

    // Development Settings
    development: {
        debugMode: false,
        mockData: false,
        logApiCalls: false,
        testMode: false
    }
};

// Environment-specific overrides
if (typeof window !== 'undefined') {
    // Browser environment
    window.CONFIG = CONFIG;
} else if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = CONFIG;
}

// Local configuration override (create config.local.js to override)
if (typeof window !== 'undefined' && window.LOCAL_CONFIG) {
    Object.assign(CONFIG, window.LOCAL_CONFIG);
}

// Usage Examples:
/*
// Get API key
const cmcKey = CONFIG.apiKeys.coinmarketcap;

// Get cache timeout
const cacheTimeout = CONFIG.cache.priceDataTimeout;

// Get gas limits
const swapGasLimit = CONFIG.gasSettings.gasLimits.swap;

// Check if debug mode is enabled
if (CONFIG.development.debugMode) {
    console.log('Debug mode enabled');
}
*/
