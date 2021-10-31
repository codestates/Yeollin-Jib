#!/bin/bash
cd /home/ubuntu/Yeollin-Jib/server
npm install
npm install -g typescript
npm install pm2@latest -g
sudo apt-get update
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown ubuntu /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80
npm run tsc
