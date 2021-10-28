#!/bin/bash
cd /home/ubuntu/im-sprint-practice-deploy/server
pm2 stop ./dist/index.js 2> /dev/null || true
pm2 delete ./dist/index.js 2> /dev/null || true
