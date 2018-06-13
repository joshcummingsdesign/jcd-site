#!/bin/bash

source bin/vars/variables.sh

echo "Syncing local files into docker container..."

docker exec -it $JEKYLL_CONTAINER bash -c "\
  mkdir -p tmp \
  && mv Gemfile.lock package-lock.json tmp/ \
  && find . -maxdepth 1 -type d \
    -not -name . \
    -not -name .. \
    -not -name tmp \
    -not -name node_modules \
    -not -name vendor \
    -exec rm -r {} + \
  && find . -maxdepth 1 -type f -delete"

docker cp www $JEKYLL_CONTAINER:/var/

docker exec -it $JEKYLL_CONTAINER bash -c "\
  mv tmp/* ./ \
  && rm -rf tmp"

echo "Sync complete!"
