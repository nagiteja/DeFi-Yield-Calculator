# DeFi Yield Calculator & Impermanent Loss Simulator

A lightweight, single-page web application for calculating net yields from DeFi strategies combining Uniswap liquidity provision and Aave staking, with comprehensive impermanent loss simulation and risk analysis.

## 🚀 Features

### Yield Calculator
- **Dual Strategy Calculation**: Combines Uniswap LP yields with Aave staking returns
- **APR to APY Conversion**: Automatic conversion with daily compounding
- **Fee Modeling**: Includes trading fees and gas cost calculations
- **Compounding Options**: Toggle between simple interest and compound interest
- **Flexible Timeframes**: Calculate yields for any period (days)
- **Real-time Results**: Instant calculation and display of all metrics

### Impermanent Loss Simulator
- **Price Path Analysis**: Simulate IL across different price change scenarios
- **Volatility Controls**: Adjustable price range and step granularity
- **Risk Assessment**: Identify high-risk scenarios and breakeven points
- **Visual Charts**: Bar chart visualization of IL vs price changes
- **Breakeven Analysis**: Calculate minimum yield needed to offset IL

## 🛠️ Technical Implementation

### Frontend
- **Pure HTML/CSS/JavaScript**: No build tools or dependencies required
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Modern UI**: Gradient backgrounds, smooth animations, and intuitive controls
- **Font Awesome Icons**: Professional iconography throughout the interface

### Calculations
- **APR to APY**: `APY = (1 + APR/365)^365 - 1`
- **Impermanent Loss**: `IL = 2√(price_ratio)/(1 + price_ratio) - 1`
- **Compounding**: Daily reinvestment simulation for accurate yield projections
- **Fee Deduction**: Proportional trading fees and fixed gas costs

## 📱 Usage

### Yield Calculator
1. Enter your initial capital amount
2. Set Uniswap LP APR and Aave staking APR
3. Choose your investment timeframe
4. Configure trading fees and gas costs
5. Enable/disable compounding as needed
6. Click "Calculate Yield" to see results

### IL Simulator
1. Set initial token price and LP value
2. Adjust simulation period and volatility
3. Use sliders to control price change range
4. Set number of price steps for granularity
5. Click "Simulate Impermanent Loss" to run analysis
6. Review results and interactive chart

## 📊 Output Metrics

### Yield Results
- **Total Yield**: Combined yield from both strategies
- **Total APY**: Annualized percentage yield
- **Individual Yields**: Breakdown by Uniswap and Aave
- **Net Yield**: Final yield after all fees
- **Portfolio Value**: Final investment value

### IL Simulation Results
- **Maximum IL**: Worst-case impermanent loss
- **Breakeven Yield**: Minimum yield needed to offset IL
- **Risk Scenarios**: Count of high-risk price movements
- **Average IL**: Mean impermanent loss across scenarios

## 🔧 Customization

The application is designed to be easily customizable:

- **APR Values**: Update default rates in the HTML inputs
- **Fee Structures**: Modify fee calculation logic in `script.js`
- **IL Formula**: Adjust impermanent loss calculation for different AMM types
- **UI Styling**: Modify CSS variables for custom color schemes
- **Chart Types**: Replace the simple chart with Chart.js or D3.js for advanced visualizations

## 🌐 Browser Compatibility

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile Support**: Responsive design for all screen sizes
- **No Dependencies**: Works offline without external CDN requirements

## 📈 Future Enhancements

- **Real-time Data**: Integration with DeFi APIs for live rates
- **Advanced Charts**: Interactive charts with zoom and pan
- **Portfolio Tracking**: Save and compare multiple scenarios
- **Risk Metrics**: VaR calculations and stress testing
- **Multi-chain Support**: Extend to other DeFi protocols

## 🚀 Getting Started

1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. No installation or build process required
4. Start calculating yields and simulating IL scenarios

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Enhanced charting capabilities
- Additional DeFi protocol support
- Improved mobile experience
- Performance optimizations
- Additional risk metrics

---

**Built with ❤️ for the DeFi community**