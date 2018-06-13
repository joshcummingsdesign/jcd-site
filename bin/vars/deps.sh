#!/bin/bash

source bin/vars/variables.sh

deps() {
  docker exec -it $JEKYLL_CONTAINER bash -c "source ~/.bashrc \
    && echo \
    && echo 'Running bundle install...' \
    && echo \
    && bundle install --path vendor/bundle \
    && echo \
    && echo '===========================' \
    && echo \
    && echo 'Running npm install...' \
    && echo \
    && npm install \
    && echo"
}
