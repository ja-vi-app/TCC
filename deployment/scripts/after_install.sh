#!/bin/bash
cd /home/ec2-user/server
echo "Successfully in server folder"

cp -R /home/ec2-user/server/build/* /var/www/html
# npm install
# npm install --save react react-dom react-scripts react-particles-js
# npm install pm2 -g