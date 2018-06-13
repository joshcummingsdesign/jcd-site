#!/bin/bash

source bin/vars/variables.sh

docker exec -it $JEKYLL_CONTAINER bash -c "source ~/.bashrc \
  && echo \
  && echo 'Starting the project watcher...' \
  && echo \
  && npx gulp watch"
