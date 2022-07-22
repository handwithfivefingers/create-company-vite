### Using VITEJS

## Start Project

`npm run dev-f` Start Frontend
`npm run dev-s` Start Server

## Edit

bật terminal chạy các lệnh trước khi edit file:
    - git pull

## PUSH AUTODEPLOY

sau khi edit xong, chạy tuần tự các lệnh sau
    - git add .
    - git commit -m "nội dung fix"
    - git push

# TEST

### PM2

# Start all applications

pm2 start ecosystem.config.js

# Stop all

pm2 stop ecosystem.config.js

# Restart all

pm2 restart ecosystem.config.js

# Reload all

pm2 reload ecosystem.config.js

# Delete all

pm2 delete ecosystem.config.js
