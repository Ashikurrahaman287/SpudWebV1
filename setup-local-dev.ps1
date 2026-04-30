#!/usr/bin/env pwsh
# Quick setup script for local development - PowerShell version

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  SpudBlocks Local Dev Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check for Node.js
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js not found. Please install Node.js 24+" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check for pnpm
try {
    $pnpmVersion = pnpm --version
    Write-Host "✓ pnpm found: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "Installing pnpm globally..." -ForegroundColor Yellow
    npm install -g pnpm@latest
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Installing Dependencies" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

Push-Location
cd "$PSScriptRoot"

Write-Host "Running: pnpm install --ignore-scripts" -ForegroundColor Yellow
pnpm install --ignore-scripts

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Environment Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Create .env files if they don't exist
$frontendEnv = "artifacts\spudblocks\.env.local"
if (-not (Test-Path $frontendEnv)) {
    Write-Host "Creating .env.local for frontend..." -ForegroundColor Yellow
    @"
VITE_API_URL=http://localhost:8080
VITE_ADMIN_PASSWORD=spudblocks2024
"@ | Set-Content $frontendEnv
    Write-Host "✓ Created $frontendEnv" -ForegroundColor Green
}

$apiEnv = "artifacts\api-server\.env.local"
if (-not (Test-Path $apiEnv)) {
    Write-Host "Creating .env.local for API server..." -ForegroundColor Yellow
    @"
DATABASE_URL=postgresql://postgres:password@localhost:5432/spudblocks
ADMIN_PASSWORD=spudblocks2024
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
PORT=8080
"@ | Set-Content $apiEnv
    Write-Host "✓ Created $apiEnv" -ForegroundColor Green
}

Pop-Location

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start local development:" -ForegroundColor Cyan
Write-Host ""
Write-Host "TERMINAL 1 (Frontend):" -ForegroundColor Yellow
Write-Host "  `$env:PORT = '5173'" -ForegroundColor White
Write-Host "  cd artifacts\spudblocks" -ForegroundColor White
Write-Host "  npx vite --host 0.0.0.0" -ForegroundColor White
Write-Host "  → Open: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "TERMINAL 2 (API Server - requires Database):" -ForegroundColor Yellow
Write-Host "  cd artifacts\api-server" -ForegroundColor White
Write-Host "  pnpm run dev" -ForegroundColor White
Write-Host "  → Runs at: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "For Vercel deployment guide, see: VERCEL_PRODUCTION_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
