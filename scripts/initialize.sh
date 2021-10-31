#!/bin/bash
cd /home/ubuntu/Yeollin-Jib/server
export NODE_OPTIONS="--max-old-space-size=2048"
npm install
npm install -g typescript
npm install pm2@latest -g
npm run tsc
sudo apt-get update
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown ubuntu /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80
