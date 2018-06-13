#!/bin/bash

source bin/vars/variables.sh

echo "Removing old lock files..."
docker exec -it $JEKYLL_CONTAINER bash -c "\
  rm -rf Gemfile.lock package-lock.json"
echo
echo "==========================="
echo
