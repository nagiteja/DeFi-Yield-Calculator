// Simplified Market Data Manager for testing
class MarketDataManager {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 30000;
        this.apis = {
            coingecko: 'https://api.coingecko.com/api/v3',
            defillama: 'https://api.llama.fi'
        };
        console.log('MarketDataManager constructor called');
    }

    // Simple test method
    test() {
        console.log('MarketDataManager test method called');
        return 'MarketDataManager is working!';
    }

    // Get token price (simplified)
    async getTokenPrice(tokenId) {
        try {
            const url = `${this.apis.coingecko}/simple/price?ids=${tokenId}&vs_currencies=usd&include_24hr_change=true`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data && data[tokenId]) {
                return {
                    price: data[tokenId].usd,
                    change24h: data[tokenId].usd_24h_change || 0
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching token price:', error);
            return null;
        }
    }

    // Get protocol data (simplified)
    async getProtocolData(protocol) {
        try {
            const url = `${this.apis.defillama}/protocol/${protocol}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data) {
                return {
                    tvl: data.tvl || 0,
                    apy: data.apy || 0
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching protocol data:', error);
            return null;
        }
    }

    // Get gas prices (simplified)
    async getGasPrices() {
        try {
            const url = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle';
            const response = await fetch(url);
            const data = await response.json();
            
            if (data && data.result === 'OK') {
                return {
                    safe: parseInt(data.result.SafeLow) || 20,
                    standard: parseInt(data.result.ProposeGasPrice) || 25,
                    fast: parseInt(data.result.FastGasPrice) || 30
                };
            }
            return { safe: 20, standard: 25, fast: 30 };
        } catch (error) {
            console.error('Error fetching gas prices:', error);
            return { safe: 20, standard: 25, fast: 30 };
        }
    }

    // Get yield opportunities (simplified)
    async getYieldFarmingOpportunities() {
        try {
            const url = `${this.apis.defillama}/yields`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data && data.data) {
                return data.data
                    .filter(item => item.apy > 5)
                    .sort((a, b) => b.apy - a.apy)
                    .slice(0, 10)
                    .map(item => ({
                        project: item.project || 'Unknown',
                        apy: item.apy || 0
                    }));
            }
            return [];
        } catch (error) {
            console.error('Error fetching yield opportunities:', error);
            return [];
        }
    }
}

// Export for browser
if (typeof window !== 'undefined') {
    window.MarketDataManager = MarketDataManager;
    console.log('MarketDataManager added to window object');
}
