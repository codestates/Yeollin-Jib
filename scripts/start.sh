#!/bin/bash
cd /home/ubuntu/Yeollin-Jib/server
authbind --deep pm2 start ./dist/index.js
