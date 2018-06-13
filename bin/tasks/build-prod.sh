#!/bin/bash

source bin/vars/variables.sh

docker exec -it $JEKYLL_CONTAINER bash -c "source ~/.bashrc \
  && echo \
  && echo 'Building the project with the --production flag...' \
  && echo \
  && npx gulp --production"
