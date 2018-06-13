#!/bin/bash

source bin/vars/variables.sh

docker exec -it $JEKYLL_CONTAINER bash -c "source ~/.bashrc \
  && echo \
  && echo 'Getting latest Medium posts...' \
  && echo \
  && npx gulp medium"

echo
echo "Syncing posts to local..."
docker cp $JEKYLL_CONTAINER:/var/www/src/templates/_includes/posts.html ./www/src/templates/_includes/
echo "Sync complete!"
echo
