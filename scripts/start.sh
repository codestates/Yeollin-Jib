#!/bin/bash
cd /home/ubuntu/Yeollin-Jib/server/dist
authbind --deep pm2 start ./dist/index.js
