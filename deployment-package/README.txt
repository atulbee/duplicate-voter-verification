# Deployment Instructions

1. Copy this entire folder to your Windows Server 2012

2. Install Node.js 20.x LTS if not already installed:
   https://nodejs.org/

3. Install PM2 globally:
   npm install -g pm2
   npm install -g pm2-windows-startup
   pm2-startup install

4. Edit .env.production file with your production settings:
   - Update BASE_URL if needed
   - Change API_KEY and SECRET_KEY from TEST values

5. Start the application:
   pm2 start ecosystem.config.js
   pm2 save

6. Configure Windows Firewall:
   New-NetFirewallRule -DisplayName NextJsVoterVerification -Direction Inbound -LocalPort 8089 -Protocol TCP -Action Allow

7. Access your application at:
   http://localhost:8089
   or
   https://smkc.gov.in:8089 (after SSL setup)

For detailed instructions, see DEPLOYMENT.md

## Troubleshooting

If application will not start:
- Check Node.js version: node -v (should be 18.18+ or 20.x)
- View logs: pm2 logs voter-verification
- Check port: netstat -ano | findstr :8089

## PM2 Commands

- View status: pm2 status
- View logs: pm2 logs voter-verification
- Restart: pm2 restart voter-verification
- Stop: pm2 stop voter-verification
- Monitor: pm2 monit
