#!/bin/bash

# cd /home/ec2-user/server/backend
# cd /home/ec2-user/
# nohup python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8080 > app.log 2>&1 &
# echo $! > app_pid.txt

cd /home/ec2-user/server/frontend
echo "Successfully in frontend folder"
# npm start
# pm2 start npm --name "covidapp" -- start
# pm2 startup
# pm2 save
# pm2 restart all