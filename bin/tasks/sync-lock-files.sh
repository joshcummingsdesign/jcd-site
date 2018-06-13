#!/bin/bash

source bin/vars/variables.sh

echo "Syncing lock files to local..."
docker cp $JEKYLL_CONTAINER:/var/www/Gemfile.lock www/
docker cp $JEKYLL_CONTAINER:/var/www/package-lock.json www/
echo "Sync complete!"
