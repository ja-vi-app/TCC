#!/bin/bash
BACKEND_PID_FILE=app_pid.txt

cd /home/ec2-user/server/backend
echo "Successfully in backend folder"
if [ -f "$BACKEND_PID_FILE" ]; then
  echo "$BACKEND_PID_FILE does NOT exist."
  kill -9 `cat $BACKEND_PID_FILE`
  rm app_pid.txt
  echo "$BACKEND_PID_FILE removed!"
else
  echo "$BACKEND_PID_FILE does NOT exist."
fi

python3 -m pip install --upgrade pip
python3 -m pip install --no-cache-dir -r requirements.txt
