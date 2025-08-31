# 🚀 Deploy DeFi Yield Calculator on Railway.com

This guide will walk you through deploying your DeFi Yield Calculator on Railway.com, a modern platform for deploying web applications.

## 📋 **Prerequisites**

- **GitHub Account**: Your code should be in a GitHub repository
- **Railway Account**: Sign up at [railway.app](https://railway.app)
- **Node.js**: Version 16 or higher (Railway will handle this automatically)

## 🛠️ **Local Setup (Optional)**

Before deploying, you can test locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or start production server
npm start
```

Your app will be available at `http://localhost:3000`

## 🚀 **Deployment Steps**

### **Step 1: Prepare Your Repository**

Make sure your repository contains these files:
- ✅ `index.html` - Main application
- ✅ `script.js` - JavaScript logic
- ✅ `market-data.js` - Market data integration
- ✅ `config.js` - Configuration
- ✅ `package.json` - Node.js dependencies
- ✅ `server.js` - Express server
- ✅ `railway.json` - Railway configuration

### **Step 2: Connect to Railway**

1. **Go to [railway.app](https://railway.app)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your DeFi Yield Calculator repository**

### **Step 3: Configure Deployment**

Railway will automatically detect it's a Node.js app and use the `package.json`:

- **Build Command**: `npm install` (automatic)
- **Start Command**: `npm start` (from package.json)
- **Port**: Railway will set `PORT` environment variable

### **Step 4: Deploy**

1. **Click "Deploy Now"**
2. **Wait for build to complete** (usually 2-5 minutes)
3. **Your app will be live!** 🎉

## 🔧 **Configuration Options**

### **Environment Variables (Optional)**

You can add these in Railway dashboard:

```bash
# API Keys (if you want to use premium APIs)
COINMARKETCAP_API_KEY=your_key_here
ETHERSCAN_API_KEY=your_key_here

# App Configuration
NODE_ENV=production
PORT=3000
```

### **Custom Domain (Optional)**

1. **Go to your project in Railway**
2. **Click "Settings" tab**
3. **Add custom domain** (e.g., `calculator.yourdomain.com`)
4. **Update DNS records** as instructed

## 📱 **What Gets Deployed**

### **Frontend Files**
- `index.html` - Main calculator interface
- `demo.html` - Demo page
- `script.js` - Core functionality
- `market-data.js` - Real-time data integration
- `config.js` - Configuration settings

### **Backend Server**
- `server.js` - Express.js server
- `package.json` - Dependencies
- Static file serving
- API endpoints
- Security headers

### **Features Available**
- ✅ **Yield Calculator** with real-time data
- ✅ **Impermanent Loss Simulator**
- ✅ **Market Data Dashboard**
- ✅ **Responsive design** for all devices
- ✅ **API health monitoring**
- ✅ **Security headers** and CORS

## 🌐 **Accessing Your Deployed App**

### **Railway URL**
Your app will be available at:
```
https://your-project-name.railway.app
```

### **Health Check**
Monitor your app's health at:
```
https://your-project-name.railway.app/api/health
```

## 📊 **Monitoring & Analytics**

### **Railway Dashboard**
- **Real-time logs** and deployment status
- **Resource usage** (CPU, memory, bandwidth)
- **Deployment history** and rollbacks
- **Custom metrics** and alerts

### **Built-in Monitoring**
- **Health checks** every 30 seconds
- **Automatic restarts** on failures
- **Performance metrics** and uptime

## 🔒 **Security Features**

### **Automatic Security**
- **HTTPS** enabled by default
- **Security headers** via Helmet.js
- **CORS** protection
- **Content Security Policy**

### **API Protection**
- **Rate limiting** (configurable)
- **Input validation**
- **Error handling** without exposing internals

## 🚨 **Troubleshooting**

### **Common Issues**

#### **Build Fails**
```bash
# Check package.json dependencies
npm install --production

# Verify Node.js version
node --version  # Should be >= 16
```

#### **App Won't Start**
```bash
# Check server.js syntax
node server.js

# Verify port configuration
echo $PORT
```

#### **Market Data Not Loading**
- Check browser console for CORS errors
- Verify API endpoints are accessible
- Check Railway logs for server errors

### **Debug Commands**

```bash
# View Railway logs
railway logs

# Check app status
railway status

# Restart deployment
railway up
```

## 📈 **Scaling Options**

### **Automatic Scaling**
- **Horizontal scaling** based on traffic
- **Load balancing** across instances
- **Auto-scaling** during peak usage

### **Manual Scaling**
- **Instance count** adjustment
- **Resource allocation** (CPU/memory)
- **Geographic distribution**

## 💰 **Cost Optimization**

### **Free Tier**
- **500 hours/month** free
- **Perfect for personal projects**
- **Automatic sleep** when not in use

### **Paid Plans**
- **Always-on** instances
- **Custom domains** and SSL
- **Advanced monitoring**

## 🔄 **Continuous Deployment**

### **Auto-Deploy**
- **GitHub integration** for automatic deploys
- **Branch-based** deployments
- **Preview environments** for PRs

### **Manual Deploy**
```bash
# Deploy from CLI
railway up

# Deploy specific branch
railway up --branch feature-branch
```

## 📚 **Additional Resources**

### **Railway Documentation**
- [Getting Started](https://docs.railway.app/)
- [Deployment Guide](https://docs.railway.app/deploy/deployments)
- [Environment Variables](https://docs.railway.app/deploy/environment-variables)

### **Node.js Resources**
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

## 🎯 **Next Steps After Deployment**

1. **Test all features** on the live site
2. **Set up monitoring** and alerts
3. **Configure custom domain** (optional)
4. **Set up CI/CD** for automatic deployments
5. **Monitor performance** and optimize

## 🚀 **Your App is Live!**

Once deployed, your DeFi Yield Calculator will be:
- **Accessible worldwide** 24/7
- **Automatically scaled** based on traffic
- **Monitored and maintained** by Railway
- **Secure and fast** with global CDN

**Share your deployed app with the DeFi community!** 🌟

---

**Need help?** Check Railway's documentation or reach out to their support team.
