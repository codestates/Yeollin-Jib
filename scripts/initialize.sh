#!/bin/bash
cd /home/ubuntu/Yeollin-Jib/server
npm install
sudo apt install node-typescript
export NODE_OPTIONS="--max-old-space-size=2048"
npm run tsc
npm install pm2@latest -g
sudo apt-get update
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown ubuntu /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80
