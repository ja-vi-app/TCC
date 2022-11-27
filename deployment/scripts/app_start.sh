#!/bin/bash
cd /home/ec2-user/server/backend
echo "Successfully in frontend folder"
nohup python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8080 > app.log 2>&1 &
echo $! > app_pid.txt