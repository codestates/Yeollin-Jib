#!/bin/bash
cd /home/ubuntu/Yeollin-Jib/server
pm2 stop ./dist/index.js 2> /dev/null || true
pm2 delete ./dist/index.js 2> /dev/null || true
