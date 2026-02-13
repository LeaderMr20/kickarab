@echo off
REM Deploy KickArab to Railway
REM This script automates the deployment process

echo ===================================
echo KickArab - Deploy to Railway
echo ===================================
echo.

echo Step 1: Login to Railway...
railway login

echo.
echo Step 2: Initializing project...
railway init

echo.
echo Step 3: Adding Node.js plugin...
railway add

echo.
echo Step 4: Setting environment variables...
set /p API_KEY="Enter your Football API Key: "
railway variables set FOOTBALL_API_KEY=%API_KEY%
railway variables set NODE_ENV=production

echo.
echo Step 5: Deploying...
railway up

echo.
echo ===================================
echo Deployment Complete!
echo ===================================
echo.
echo Your project URL:
railway logs
