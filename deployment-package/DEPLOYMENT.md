# Windows Server 2012 Deployment Guide

## Prerequisites

### 1. Install Node.js (v18.18+ or v20 LTS)
```powershell
# Download from: https://nodejs.org/
# Install Node.js 20.x LTS (recommended for Windows Server 2012)
```

### 2. Install PM2 (Process Manager)
```powershell
npm install -g pm2
npm install -g pm2-windows-startup

# Configure PM2 to start on boot
pm2-startup install
```

### 3. Install IIS URL Rewrite Module (Optional - for IIS reverse proxy)
- Download from: https://www.iis.net/downloads/microsoft/url-rewrite

---

## Deployment Steps

### Step 1: Prepare Production Environment

1. **Update `.env.production` file** with correct API endpoint:

```env
# Option A: If API is on same server (internal communication)
BASE_URL=http://localhost:8088

# Option B: If API needs to be accessible via public URL
BASE_URL=https://smkc.gov.in:8088

# Option C: If using server's internal IP
BASE_URL=http://YOUR_SERVER_IP:8088
```

2. **Update API keys** with production values (not TEST keys!)

### Step 2: Build the Application

```powershell
# Navigate to project directory
cd "C:\Users\ACER\Documents\Kamalakar\Duplicate VoterVerification\duplicate-voter-verification"

# Install dependencies
npm install

# Build for production
npm run build

# This creates optimized production build in .next folder
```

### Step 3: Test Production Build Locally

```powershell
# Set production environment
$env:NODE_ENV="production"

# Start production server on port 8089
npm start
# OR specify port explicitly:
# npm start -- -p 8089

# Test at: http://localhost:8089
```

### Step 4: Deploy with PM2

```powershell
# Start with PM2
pm2 start ecosystem.config.js

# View status
pm2 status

# View logs
pm2 logs voter-verification

# Save PM2 configuration (auto-start on reboot)
pm2 save
```

### Step 5: Configure Windows Firewall

```powershell
# Allow inbound traffic on port 8089
New-NetFirewallRule -DisplayName "Next.js Voter Verification" -Direction Inbound -LocalPort 8089 -Protocol TCP -Action Allow
```

---

## API Endpoint Configuration (CRITICAL)

### Problem: Client-Side API Calls
Your Next.js app makes API calls from **both**:
1. **Server-side** (during SSR/API routes) - can access localhost:8088 ✅
2. **Client-side** (browser JavaScript) - CANNOT access localhost:8088 ❌

### Solutions:

#### **Option 1: Next.js API Routes as Proxy (RECOMMENDED)**
Keep all API logic in Next.js API routes (`/api/*`). These already proxy to .NET API server-side.

✅ **Already implemented in your project!** 
- All API calls go through `/api/voters/*` routes
- These run server-side and can access `localhost:8088`
- Client browsers only talk to your Next.js server

**Action Required**: 
- Ensure `.env.production` has `BASE_URL=http://localhost:8088`
- No changes needed to API configuration!

#### **Option 2: Expose .NET API Publicly**
If you need direct API access:

1. Configure IIS or reverse proxy for API:
   ```
   https://smkc.gov.in:8088 → http://localhost:8088
   ```

2. Update `.env.production`:
   ```env
   BASE_URL=https://smkc.gov.in:8088
   ```

3. Configure CORS in .NET API to allow requests from:
   ```
   https://smkc.gov.in:8089
   ```

---

## IIS Reverse Proxy Configuration (Optional)

If you want to serve via IIS instead of direct Node.js:

### Install iisnode
```powershell
# Download from: https://github.com/Azure/iisnode/releases
```

### Create IIS Site
1. Open IIS Manager
2. Create new site: "VoterVerification"
3. Point to project directory
4. Set binding: `https://smkc.gov.in:8089`

### Configure web.config
Create `web.config` in project root:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^server.js\/debug[\/]?" />
        </rule>
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="server.js"/>
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin"/>
        </hiddenSegments>
      </requestFiltering>
    </security>
    <httpErrors existingResponse="PassThrough" />
  </system.webServer>
</configuration>
```

---

## SSL/HTTPS Configuration

Since you're using `https://smkc.gov.in:8089`:

### Option 1: IIS with SSL Certificate
1. Install SSL certificate in IIS for `smkc.gov.in`
2. Configure IIS binding for port 8089 with SSL
3. Use IIS as reverse proxy to Node.js (see above)

### Option 2: Node.js with HTTPS
Update `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'voter-verification',
    script: 'server.js', // Create custom HTTPS server
    // ... rest of config
  }]
};
```

Create `server.js`:
```javascript
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./ssl/private.key'),
  cert: fs.readFileSync('./ssl/certificate.crt'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(8089, (err) => {
    if (err) throw err;
    console.log('> Ready on https://smkc.gov.in:8089');
  });
});
```

---

## Monitoring & Maintenance

### PM2 Commands
```powershell
# View logs
pm2 logs voter-verification

# Restart application
pm2 restart voter-verification

# Stop application
pm2 stop voter-verification

# Monitor resources
pm2 monit

# List all processes
pm2 list
```

### Health Check
Create a simple monitoring script:

```powershell
# monitor.ps1
$url = "http://localhost:8089"
try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ Application is running" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ Application is down!" -ForegroundColor Red
    # Restart with PM2
    pm2 restart voter-verification
}
```

Schedule this with Task Scheduler to run every 5 minutes.

---

## Troubleshooting

### Application won't start
```powershell
# Check Node.js version
node -v  # Should be 18.18+ or 20.x

# Check for port conflicts
netstat -ano | findstr :8089

# View detailed logs
pm2 logs voter-verification --lines 100
```

### API connection fails
1. Verify .NET API is running: `http://localhost:8088`
2. Check `.env.production` BASE_URL setting
3. Check Windows Firewall rules
4. Test API endpoint from server:
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:8088/api/voters/unverified-count"
   ```

### Build errors
```powershell
# Clear cache and rebuild
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
npm install
npm run build
```

---

## Performance Optimization

### Enable Windows Server optimizations
```powershell
# Increase Node.js memory limit
$env:NODE_OPTIONS="--max-old-space-size=4096"

# Add to ecosystem.config.js:
node_args: '--max-old-space-size=4096'
```

### Enable caching
Update `next.config.ts`:
```typescript
async headers() {
  return [
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ],
    },
  ];
}
```

---

## Security Checklist

- [ ] Change API_KEY and SECRET_KEY from TEST values
- [ ] Use HTTPS (SSL certificate installed)
- [ ] Enable Windows Firewall
- [ ] Restrict API access (firewall rules for port 8088)
- [ ] Regular Windows Updates
- [ ] PM2 log rotation configured
- [ ] Backup strategy in place
- [ ] Monitor application logs

---

## Rollback Plan

Keep previous build:
```powershell
# Before deploying new version
Copy-Item -Recurse .next .next.backup

# To rollback
pm2 stop voter-verification
Remove-Item -Recurse .next
Rename-Item .next.backup .next
pm2 start ecosystem.config.js
```
