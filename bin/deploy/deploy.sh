#!/bin/bash

source bin/vars/variables.sh

echo "Deploying site..."
sudo apt-get update && sudo apt-get install rsync
ssh-keyscan -H $PROD_IP >> ~/.ssh/known_hosts
rsync -azq --partial --exclude plugin-generator --delete www/html/ $PROD_USER@$PROD_IP:$PROD_PATH
