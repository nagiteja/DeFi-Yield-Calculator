#!/bin/bash

# 🚀 Quick Deploy to Railway Script
# This script helps you deploy your DeFi Yield Calculator to Railway

echo "🚀 DeFi Yield Calculator - Railway Deployment"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if files are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    echo "   git add ."
    echo "   git commit -m 'Prepare for Railway deployment'"
    exit 1
fi

echo "✅ Repository is ready for deployment"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   git push -u origin main"
echo ""
echo "2. Go to https://railway.app"
echo "3. Sign in with GitHub"
echo "4. Click 'New Project'"
echo "5. Select 'Deploy from GitHub repo'"
echo "6. Choose your DeFi Yield Calculator repository"
echo "7. Click 'Deploy Now'"
echo ""
echo "⏱️  Deployment usually takes 2-5 minutes"
echo "🌐 Your app will be live at: https://your-project-name.railway.app"
echo ""
echo "📚 For detailed instructions, see RAILWAY_DEPLOYMENT.md"
echo ""
echo "�� Happy deploying!"
