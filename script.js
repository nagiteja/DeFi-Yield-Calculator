// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Initialize range input displays
document.addEventListener('DOMContentLoaded', function() {
    // Set up range input displays
    const minPriceChange = document.getElementById('minPriceChange');
    const maxPriceChange = document.getElementById('maxPriceChange');
    const priceSteps = document.getElementById('priceSteps');
    
    minPriceChange.addEventListener('input', function() {
        document.getElementById('minPriceChangeValue').textContent = this.value + '%';
    });
    
    maxPriceChange.addEventListener('input', function() {
        document.getElementById('maxPriceChangeValue').textContent = this.value + '%';
    });
    
    priceSteps.addEventListener('input', function() {
        document.getElementById('priceStepsValue').textContent = this.value;
    });
});

// Yield Calculator Functions
function calculateYield() {
    // Get input values
    const initialCapital = parseFloat(document.getElementById('initialCapital').value);
    const uniswapAPR = parseFloat(document.getElementById('uniswapAPR').value);
    const aaveAPR = parseFloat(document.getElementById('aaveAPR').value);
    const timeframe = parseFloat(document.getElementById('timeframe').value);
    const uniswapFees = parseFloat(document.getElementById('uniswapFees').value);
    const gasFees = parseFloat(document.getElementById('gasFees').value);
    const compounding = document.getElementById('compounding').checked;
    
    // Validate inputs
    if (!validateInputs(initialCapital, uniswapAPR, aaveAPR, timeframe)) {
        return;
    }
    
    // Calculate yields
    const results = calculateTotalYield(
        initialCapital,
        uniswapAPR,
        aaveAPR,
        timeframe,
        uniswapFees,
        gasFees,
        compounding
    );
    
    // Display results
    displayYieldResults(results);
}

function validateInputs(initialCapital, uniswapAPR, aaveAPR, timeframe) {
    if (initialCapital <= 0) {
        alert('Initial capital must be greater than 0');
        return false;
    }
    if (uniswapAPR < 0 || aaveAPR < 0) {
        alert('APR values cannot be negative');
        return false;
    }
    if (timeframe <= 0) {
        alert('Timeframe must be greater than 0');
        return false;
    }
    return true;
}

function calculateTotalYield(initialCapital, uniswapAPR, aaveAPR, timeframe, uniswapFees, gasFees, compounding) {
    // Convert APR to APY
    const uniswapAPY = aprToApy(uniswapAPR);
    const aaveAPY = aprToApy(aaveAPR);
    
    // Calculate daily rates
    const uniswapDailyRate = Math.pow(1 + uniswapAPY / 100, 1/365) - 1;
    const aaveDailyRate = Math.pow(1 + aaveAPY / 100, 1/365) - 1;
    
    let uniswapYield = 0;
    let aaveYield = 0;
    let currentCapital = initialCapital;
    
    if (compounding) {
        // Compounding calculation
        for (let day = 1; day <= timeframe; day++) {
            const dailyUniswapYield = currentCapital * uniswapDailyRate;
            const dailyAaveYield = currentCapital * aaveDailyRate;
            
            uniswapYield += dailyUniswapYield;
            aaveYield += dailyAaveYield;
            
            // Reinvest daily
            currentCapital += dailyUniswapYield + dailyAaveYield;
        }
    } else {
        // Simple interest calculation
        const uniswapTimeRatio = timeframe / 365;
        const aaveTimeRatio = timeframe / 365;
        
        uniswapYield = initialCapital * (uniswapAPY / 100) * uniswapTimeRatio;
        aaveYield = initialCapital * (aaveAPY / 100) * aaveTimeRatio;
        currentCapital = initialCapital + uniswapYield + aaveYield;
    }
    
    // Calculate trading fees (assuming proportional to yield)
    const tradingFees = uniswapYield * (uniswapFees / 100);
    
    // Total yield before gas fees
    const totalYieldBeforeFees = uniswapYield + aaveYield;
    
    // Net yield after all fees
    const netYield = totalYieldBeforeFees - tradingFees - gasFees;
    
    // Calculate total APY
    const totalAPY = ((netYield / initialCapital) / (timeframe / 365)) * 100;
    
    return {
        totalYield: totalYieldBeforeFees,
        totalAPY: totalAPY,
        uniswapYield: uniswapYield,
        aaveYield: aaveYield,
        netYield: netYield,
        finalValue: initialCapital + netYield,
        tradingFees: tradingFees,
        gasFees: gasFees
    };
}

function aprToApy(apr) {
    // Convert APR to APY with daily compounding
    const dailyRate = apr / 100 / 365;
    return (Math.pow(1 + dailyRate, 365) - 1) * 100;
}

function displayYieldResults(results) {
    document.getElementById('totalYield').textContent = '$' + results.totalYield.toFixed(2);
    document.getElementById('totalAPY').textContent = results.totalAPY.toFixed(2) + '%';
    document.getElementById('uniswapYield').textContent = '$' + results.uniswapYield.toFixed(2);
    document.getElementById('aaveYield').textContent = '$' + results.aaveYield.toFixed(2);
    document.getElementById('netYield').textContent = '$' + results.netYield.toFixed(2);
    document.getElementById('finalValue').textContent = '$' + results.finalValue.toFixed(2);
    
    document.getElementById('yieldResults').style.display = 'block';
}

// Impermanent Loss Simulator Functions
function simulateIL() {
    // Get input values
    const initialPrice = parseFloat(document.getElementById('ilInitialPrice').value);
    const initialValue = parseFloat(document.getElementById('ilInitialValue').value);
    const timeframe = parseFloat(document.getElementById('ilTimeframe').value);
    const volatility = parseFloat(document.getElementById('ilVolatility').value);
    const minPriceChange = parseFloat(document.getElementById('minPriceChange').value);
    const maxPriceChange = parseFloat(document.getElementById('maxPriceChange').value);
    const priceSteps = parseInt(document.getElementById('priceSteps').value);
    
    // Validate inputs
    if (!validateILInputs(initialPrice, initialValue, timeframe, volatility)) {
        return;
    }
    
    // Run simulation
    const results = runILSimulation(
        initialPrice,
        initialValue,
        timeframe,
        volatility,
        minPriceChange,
        maxPriceChange,
        priceSteps
    );
    
    // Display results
    displayILResults(results);
    
    // Generate and display chart
    generateILChart(results);
}

function validateILInputs(initialPrice, initialValue, timeframe, volatility) {
    if (initialPrice <= 0) {
        alert('Initial token price must be greater than 0');
        return false;
    }
    if (initialValue <= 0) {
        alert('Initial LP value must be greater than 0');
        return false;
    }
    if (timeframe <= 0) {
        alert('Simulation period must be greater than 0');
        return false;
    }
    if (volatility < 0) {
        alert('Volatility cannot be negative');
        return false;
    }
    return true;
}

function runILSimulation(initialPrice, initialValue, timeframe, volatility, minPriceChange, maxPriceChange, priceSteps) {
    const results = {
        priceChanges: [],
        impermanentLosses: [],
        lpValues: [],
        holdValues: [],
        breakevenPoints: [],
        riskScenarios: 0
    };
    
    // Generate price change scenarios
    const priceChangeStep = (maxPriceChange - minPriceChange) / (priceSteps - 1);
    
    for (let i = 0; i < priceSteps; i++) {
        const priceChange = minPriceChange + (i * priceChangeStep);
        const newPrice = initialPrice * (1 + priceChange / 100);
        
        // Calculate impermanent loss
        const il = calculateImpermanentLoss(initialPrice, newPrice);
        
        // Calculate LP value after IL
        const lpValue = initialValue * (1 + il / 100);
        
        // Calculate hold value (if just held the tokens)
        const holdValue = initialValue * (1 + priceChange / 100);
        
        results.priceChanges.push(priceChange);
        results.impermanentLosses.push(il);
        results.lpValues.push(lpValue);
        results.holdValues.push(holdValue);
        
        // Find breakeven points (where LP value equals hold value)
        if (Math.abs(lpValue - holdValue) < 0.01) {
            results.breakevenPoints.push(priceChange);
        }
        
        // Count high risk scenarios (IL > 20%)
        if (il < -20) {
            results.riskScenarios++;
        }
    }
    
    // Calculate statistics
    results.maxIL = Math.min(...results.impermanentLosses);
    results.avgIL = results.impermanentLosses.reduce((a, b) => a + b, 0) / results.impermanentLosses.length;
    
    // Calculate breakeven yield needed
    const maxILAbs = Math.abs(results.maxIL);
    results.breakevenYield = maxILAbs + (volatility * 0.1); // Add volatility buffer
    
    return results;
}

function calculateImpermanentLoss(priceA, priceB) {
    // Impermanent Loss formula for AMM pools
    // IL = 2 * sqrt(price_ratio) / (1 + price_ratio) - 1
    
    const priceRatio = priceB / priceA;
    const sqrtPriceRatio = Math.sqrt(priceRatio);
    
    const il = (2 * sqrtPriceRatio) / (1 + priceRatio) - 1;
    return il * 100; // Convert to percentage
}

function displayILResults(results) {
    document.getElementById('maxIL').textContent = results.maxIL.toFixed(2) + '%';
    document.getElementById('breakevenYield').textContent = results.breakevenYield.toFixed(2) + '%';
    document.getElementById('riskScenarios').textContent = results.riskScenarios;
    document.getElementById('avgIL').textContent = results.avgIL.toFixed(2) + '%';
    
    document.getElementById('ilResults').style.display = 'block';
}

function generateILChart(results) {
    const chartContainer = document.querySelector('.chart-container');
    
    // Create a simple text-based chart for now
    // In a production app, you'd use Chart.js or D3.js
    let chartHTML = `
        <div style="width: 100%; height: 100%; overflow: auto;">
            <h4 style="margin-bottom: 15px; color: #667eea;">Impermanent Loss vs Price Change</h4>
            <div style="display: flex; align-items: flex-end; height: 300px; gap: 2px; padding: 20px 0;">
    `;
    
    const maxIL = Math.abs(Math.min(...results.impermanentLosses));
    const maxPriceChange = Math.max(...results.priceChanges);
    
    results.priceChanges.forEach((priceChange, index) => {
        const il = results.impermanentLosses[index];
        const height = (Math.abs(il) / maxIL) * 250;
        const color = il < 0 ? '#ff6b6b' : '#51cf66';
        
        chartHTML += `
            <div style="
                width: ${100 / results.priceChanges.length}%;
                height: ${height}px;
                background: ${color};
                border-radius: 2px;
                position: relative;
                min-width: 8px;
            " title="Price: ${priceChange.toFixed(1)}%, IL: ${il.toFixed(2)}%">
            </div>
        `;
    });
    
    chartHTML += `
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 12px; color: #666;">
                <span>${results.priceChanges[0].toFixed(1)}%</span>
                <span>Price Change</span>
                <span>${results.priceChanges[results.priceChanges.length - 1].toFixed(1)}%</span>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 10px;">
                <strong>Key Insights:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Maximum IL: ${results.maxIL.toFixed(2)}% at ${results.priceChanges[results.impermanentLosses.indexOf(results.maxIL)].toFixed(1)}% price change</li>
                    <li>Breakeven yield needed: ${results.breakevenYield.toFixed(2)}%</li>
                    <li>High risk scenarios: ${results.riskScenarios} (IL > 20%)</li>
                    <li>Average IL: ${results.avgIL.toFixed(2)}%</li>
                </ul>
            </div>
        </div>
    `;
    
    chartContainer.innerHTML = chartHTML;
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatPercentage(value) {
    return value.toFixed(2) + '%';
}

// Add some sample data for demonstration
function loadSampleData() {
    // This could be used to load real market data in the future
    console.log('DeFi Yield Calculator loaded successfully!');
    
    // Test MarketDataManager availability
    setTimeout(() => {
        if (typeof MarketDataManager !== 'undefined') {
            console.log('✅ MarketDataManager class is available');
            console.log('MarketDataManager prototype:', MarketDataManager.prototype);
        } else {
            console.error('❌ MarketDataManager class is NOT available');
            console.log('Window objects containing "Market":', Object.keys(window).filter(key => key.includes('Market')));
        }
    }, 1000);
}

// Market Data Integration
let marketDataManager;
let autoRefreshActive = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadSampleData();
    
    // Initialize market data manager with error handling
    try {
        if (typeof MarketDataManager !== 'undefined') {
            marketDataManager = new MarketDataManager();
            console.log('✅ Market Data Manager initialized successfully');
        } else {
            console.error('❌ MarketDataManager class not found');
            console.log('Available global objects:', Object.keys(window).filter(key => key.includes('Market')));
        }
    } catch (error) {
        console.error('❌ Failed to initialize Market Data Manager:', error);
    }
    
    // Add some helpful tooltips or info
    console.log('💡 Tip: Use the Yield Calculator to estimate returns from Uniswap LP + Aave staking');
    console.log('💡 Tip: Use the IL Simulator to understand impermanent loss risks at different price levels');
    console.log('💡 Tip: Use the Market Data tab to get real-time DeFi rates and prices');
});

// Market Data Functions
async function loadMarketData() {
    // Try to initialize if not already done
    if (!marketDataManager) {
        try {
            if (typeof MarketDataManager !== 'undefined') {
                marketDataManager = new MarketDataManager();
                console.log('✅ Market Data Manager initialized on demand');
            } else {
                throw new Error('MarketDataManager class not available');
            }
        } catch (error) {
            console.error('❌ Failed to initialize Market Data Manager:', error);
            alert('Market data manager not available. Please refresh the page and try again.');
            return;
        }
    }

    try {
        // Show loading state
        const btn = document.querySelector('button[onclick="loadMarketData()"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        btn.disabled = true;

        // Get selected token and protocol
        const selectedToken = document.getElementById('tokenSelect').value;
        const selectedProtocol = document.getElementById('protocolSelect').value;

        // Load data
        const tokenData = await marketDataManager.getTokenPrice(selectedToken);
        const protocolData = await marketDataManager.getProtocolData(selectedProtocol);
        const gasPrices = await marketDataManager.getGasPrices();
        const yieldOpportunities = await marketDataManager.getYieldFarmingOpportunities();

        // Display results
        displayMarketData(tokenData, protocolData, gasPrices, yieldOpportunities);

        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;

    } catch (error) {
        console.error('Failed to load market data:', error);
        alert('Failed to load market data. Please try again.');
        
        // Reset button
        const btn = document.querySelector('button[onclick="loadMarketData()"]');
        btn.innerHTML = '<i class="fas fa-sync-alt"></i> Load Market Data';
        btn.disabled = false;
    }
}

function displayMarketData(tokenData, protocolData, gasPrices, yieldOpportunities) {
    if (tokenData) {
        document.getElementById('tokenPrice').textContent = '$' + tokenData.price.toFixed(2);
        document.getElementById('priceChange24h').textContent = tokenData.change24h.toFixed(2) + '%';
    }

    if (protocolData) {
        document.getElementById('protocolAPY').textContent = (protocolData.apy || 0).toFixed(2) + '%';
        document.getElementById('protocolTVL').textContent = '$' + (protocolData.tvl / 1e9).toFixed(2) + 'B';
    }

    if (gasPrices) {
        document.getElementById('gasPrice').textContent = gasPrices.standard + ' Gwei';
    }

    document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();

    // Display yield opportunities
    if (yieldOpportunities && yieldOpportunities.length > 0) {
        let opportunitiesHTML = '<div style="max-height: 300px; overflow-y: auto;">';
        yieldOpportunities.slice(0, 10).forEach(opp => {
            opportunitiesHTML += `
                <div style="display: flex; justify-content: space-between; padding: 10px; background: white; margin: 5px 0; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <span><strong>${opp.project}</strong></span>
                    <span style="color: #667eea; font-weight: 600;">${opp.apy.toFixed(2)}% APY</span>
                </div>
            `;
        });
        opportunitiesHTML += '</div>';
        document.getElementById('yieldOpportunities').innerHTML = opportunitiesHTML;
    }

    document.getElementById('marketResults').style.display = 'block';
}

function toggleAutoRefresh() {
    const btn = document.getElementById('autoRefreshBtn');
    
    if (!autoRefreshActive) {
        // Start auto-refresh
        marketDataManager.startAutoRefresh((data) => {
            // Update UI with new data
            if (data.prices && data.prices.ethereum) {
                document.getElementById('tokenPrice').textContent = '$' + data.prices.ethereum.usd.toFixed(2);
                document.getElementById('priceChange24h').textContent = data.prices.ethereum.usd_24h_change.toFixed(2) + '%';
            }
            if (data.gasPrices) {
                document.getElementById('gasPrice').textContent = data.gasPrices.standard + ' Gwei';
            }
            document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();
        });
        
        btn.innerHTML = '<i class="fas fa-pause"></i> Stop Auto-Refresh';
        btn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
        autoRefreshActive = true;
    } else {
        // Stop auto-refresh
        marketDataManager.stopAutoRefresh();
        
        btn.innerHTML = '<i class="fas fa-play"></i> Start Auto-Refresh';
        btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        autoRefreshActive = false;
    }
}

// Enhanced yield calculator with real-time data
async function calculateYieldWithRealData() {
    if (!marketDataManager) {
        calculateYield(); // Fall back to manual input
        return;
    }

    try {
        // Get real-time yields
        const realYields = await marketDataManager.getRealTimeYields();
        
        // Update form with real data if available
        if (realYields['uniswap-v3']) {
            document.getElementById('uniswapAPR').value = realYields['uniswap-v3'].apy.toFixed(2);
        }
        if (realYields['aave-v3']) {
            document.getElementById('aaveAPR').value = realYields['aave-v3'].apy.toFixed(2);
        }

        // Get real-time gas prices for fee calculation
        const gasPrices = await marketDataManager.getGasPrices();
        if (gasPrices) {
            const gasCosts = marketDataManager.calculateGasCosts(gasPrices, 'standard');
            document.getElementById('gasFees').value = parseFloat(gasCosts.addLiquidity) + parseFloat(gasCosts.stake);
        }

        // Calculate yield with updated values
        calculateYield();
        
    } catch (error) {
        console.error('Failed to get real-time data:', error);
        calculateYield(); // Fall back to manual input
    }
}
