#!/bin/bash
cd /home/ec2-user/server
echo "Successfully in server folder"

cd /home/ec2-user/server/backend
echo "Successfully in backend folder"

python3 -m pip install --upgrade pip
# python3 -m pip install --no-cache-dir -r requirements.txt



# curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
# yum -y install nodejs npm

