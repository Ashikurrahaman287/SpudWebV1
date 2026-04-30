@echo off
REM Quick setup script for local development
REM Windows batch script

echo.
echo ====================================
echo  SpudBlocks Local Dev Setup
echo ====================================
echo.

REM Check for Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found. Please install Node.js 24+
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found: 
node --version

REM Check for pnpm
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo Installing pnpm globally...
    call npm install -g pnpm@latest
)

echo ✓ pnpm found: 
pnpm --version

echo.
echo ====================================
echo  Installing Dependencies
echo ====================================
echo.

cd /d "%~dp0"
call pnpm install --ignore-scripts

echo.
echo ====================================
echo  Environment Setup
echo ====================================
echo.

REM Check if .env files exist
if not exist "artifacts\spudblocks\.env.local" (
    echo Creating .env.local for frontend...
    (
        echo VITE_API_URL=http://localhost:8080
        echo VITE_ADMIN_PASSWORD=spudblocks2024
    ) > "artifacts\spudblocks\.env.local"
    echo ✓ Created artifacts\spudblocks\.env.local
)

if not exist "artifacts\api-server\.env.local" (
    echo Creating .env.local for API server...
    (
        echo DATABASE_URL=postgresql://postgres:password@localhost:5432/spudblocks
        echo ADMIN_PASSWORD=spudblocks2024
        echo CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
        echo PORT=8080
    ) > "artifacts\api-server\.env.local"
    echo ✓ Created artifacts\api-server\.env.local
)

echo.
echo ====================================
echo  Setup Complete!
echo ====================================
echo.
echo To start local development:
echo.
echo TERMINAL 1 (Frontend):
echo   cd artifacts\spudblocks
echo   set PORT=5173
echo   npx vite --host 0.0.0.0
echo   Then open: http://localhost:5173
echo.
echo TERMINAL 2 (API Server - requires Database):
echo   cd artifacts\api-server
echo   pnpm run dev
echo   Runs at: http://localhost:8080
echo.
echo For Vercel deployment guide, see: VERCEL_PRODUCTION_GUIDE.md
echo.
pause
