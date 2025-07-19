#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Setting up PM2 for Loud Spectrum v1...${NC}"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}❌ PM2 is not installed. Installing PM2 globally...${NC}"
    npm install -g pm2
    echo -e "${GREEN}✅ PM2 installed successfully!${NC}"
fi

# Kill any process running on port 3000
echo -e "${YELLOW}🔍 Checking for processes on port 3000...${NC}"
PORT_PID=$(lsof -ti:3000)

if [ ! -z "$PORT_PID" ]; then
    echo -e "${YELLOW}⚠️  Found process(es) running on port 3000. Killing them...${NC}"
    kill -9 $PORT_PID
    echo -e "${GREEN}✅ Killed process(es) on port 3000${NC}"
else
    echo -e "${GREEN}✅ Port 3000 is free${NC}"
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Build the application
echo -e "${YELLOW}🔨 Building the application...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
else
    echo -e "${RED}❌ Build failed! Please check the errors above.${NC}"
    exit 1
fi

# Stop existing PM2 processes for this app
echo -e "${YELLOW}🛑 Stopping existing PM2 processes...${NC}"
pm2 stop loud-spectrum-v1 2>/dev/null || true
pm2 delete loud-spectrum-v1 2>/dev/null || true

# Start the application with PM2
echo -e "${YELLOW}🚀 Starting application with PM2...${NC}"
pm2 start ecosystem.config.js --env production

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Application started successfully with PM2!${NC}"
    echo -e "${GREEN}📊 PM2 Status:${NC}"
    pm2 status
    echo -e "${GREEN}📝 Logs:${NC}"
    echo -e "  - Error logs: ${YELLOW}pm2 logs loud-spectrum-v1 --err${NC}"
    echo -e "  - Output logs: ${YELLOW}pm2 logs loud-spectrum-v1 --out${NC}"
    echo -e "  - All logs: ${YELLOW}pm2 logs loud-spectrum-v1${NC}"
    echo -e "${GREEN}🌐 Your app should be running at: http://localhost:3000${NC}"
else
    echo -e "${RED}❌ Failed to start application with PM2!${NC}"
    exit 1
fi