#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🛑 Stopping PM2 processes for Loud Spectrum v1...${NC}"

# Stop the PM2 process
pm2 stop loud-spectrum-v1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PM2 process stopped successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  No PM2 process found or already stopped${NC}"
fi

# Delete the PM2 process
pm2 delete loud-spectrum-v1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PM2 process deleted successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  No PM2 process found or already deleted${NC}"
fi

echo -e "${GREEN}📊 Current PM2 Status:${NC}"
pm2 status

echo -e "${GREEN}✅ PM2 cleanup completed!${NC}"