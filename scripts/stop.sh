#!/bin/bash
cd /home/ubuntu/im-sprint-practice-deploy/server/dist
pm2 stop index.js 2> /dev/null || true
pm2 delete index.js 2> /dev/null || true