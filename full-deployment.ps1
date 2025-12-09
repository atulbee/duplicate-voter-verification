# Complete Deployment Script for Voter Verification System
# For Windows Server 2012 R2 with Node.js compatibility fixes

param(
    [string]$DeploymentPath = "C:\voterverification",
    [string]$SourcePackage = "C:\deployment-source"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Voter Verification Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Prerequisites
Write-Host "[1/7] Checking prerequisites..." -ForegroundColor Yellow

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: Must run as Administrator" -ForegroundColor Red
    exit 1
}

$nodeVersion = $null
try {
    $nodeVersion = node --version 2>$null
}
catch {
    # Node command not found
}

if (-not $nodeVersion) {
    Write-Host "ERROR: Node.js not installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "INSTALLATION REQUIRED:" -ForegroundColor Yellow
    Write-Host "1. Download Node.js v20.18.2 (LTS) from:" -ForegroundColor White
    Write-Host "   https://nodejs.org/dist/v20.18.2/node-v20.18.2-x64.msi" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "2. Run the installer and accept all defaults" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Restart PowerShell after installation" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Verify with: node --version" -ForegroundColor White
    Write-Host ""
    Write-Host "5. Run this script again" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Check Node.js version (Next.js 16 requires Node >= 20.9.0)
$nodeMajorVersion = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
if ($nodeMajorVersion -lt 20) {
    Write-Host "ERROR: Node.js version too old" -ForegroundColor Red
    Write-Host "  Current: $nodeVersion" -ForegroundColor Yellow
    Write-Host "  Required: v20.9.0 or higher" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "UPGRADE REQUIRED:" -ForegroundColor Yellow
    Write-Host "1. Download Node.js v20.18.2 (LTS) from:" -ForegroundColor White
    Write-Host "   https://nodejs.org/dist/v20.18.2/node-v20.18.2-x64.msi" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "2. Run the installer (it will upgrade existing installation)" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Restart PowerShell" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Verify with: node --version" -ForegroundColor White
    Write-Host ""
    Write-Host "5. Run this script again" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "  Node.js: $nodeVersion" -ForegroundColor Green

$pm2Installed = Get-Command pm2 -ErrorAction SilentlyContinue
if (-not $pm2Installed) {
    Write-Host "  Installing PM2..." -ForegroundColor Yellow
    npm install -g pm2
    Write-Host "  PM2 installed" -ForegroundColor Green
} else {
    Write-Host "  PM2 found" -ForegroundColor Green
}

# Step 2: Compatibility fixes
Write-Host ""
Write-Host "[2/7] Applying compatibility fixes..." -ForegroundColor Yellow
npm config set ignore-scripts false
npm config set engine-strict false
Write-Host "  Configured npm" -ForegroundColor Green

# Step 3: Stop existing app
Write-Host ""
Write-Host "[3/7] Stopping existing application..." -ForegroundColor Yellow
pm2 delete voter-verification 2>$null
Write-Host "  Ready for deployment" -ForegroundColor Green

# Step 4: Prepare directory
Write-Host ""
Write-Host "[4/7] Preparing deployment directory..." -ForegroundColor Yellow
if (Test-Path $DeploymentPath) {
    $backupPath = "$DeploymentPath-backup-$(Get-Date -Format 'yyyyMMddHHmmss')"
    Move-Item $DeploymentPath $backupPath -Force
    Write-Host "  Backed up to: $backupPath" -ForegroundColor Green
}
New-Item -ItemType Directory -Path $DeploymentPath -Force | Out-Null
Write-Host "  Created: $DeploymentPath" -ForegroundColor Green

# Step 5: Copy files
Write-Host ""
Write-Host "[5/7] Copying files..." -ForegroundColor Yellow
if (-not (Test-Path $SourcePackage)) {
    Write-Host "ERROR: Source not found: $SourcePackage" -ForegroundColor Red
    exit 1
}
Copy-Item -Path "$SourcePackage\*" -Destination $DeploymentPath -Recurse -Force
Write-Host "  Files copied" -ForegroundColor Green

# Step 6: Install dependencies
Write-Host ""
Write-Host "[6/7] Installing dependencies..." -ForegroundColor Yellow
Set-Location $DeploymentPath
$env:NODE_ENV = "production"
$packageJson = Get-Content ".\package.json" | ConvertFrom-Json
$depCount = ($packageJson.dependencies.PSObject.Properties | Measure-Object).Count
Write-Host "  Installing $depCount packages..." -ForegroundColor Cyan
npm install --production --legacy-peer-deps --no-audit --no-fund
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm install failed" -ForegroundColor Red
    exit 1
}
Write-Host "  Dependencies installed" -ForegroundColor Green

# Step 7: Start application
Write-Host ""
Write-Host "[7/7] Starting application..." -ForegroundColor Yellow
pm2 start ecosystem.config.js
pm2 save
Start-Sleep -Seconds 2
Write-Host "  Application started" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "URLs:" -ForegroundColor Cyan
Write-Host "  Local:  http://localhost:8443" -ForegroundColor White
Write-Host "  Public: https://smkc.gov.in:8443" -ForegroundColor White
Write-Host ""
pm2 list
