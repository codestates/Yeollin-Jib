#!/bin/bash
cd /home/ubuntu/Yeollin-Jib/server
pm2 stop ./distindex.js 2> /dev/null || true
pm2 delete ./distindex.js 2> /dev/null || true
