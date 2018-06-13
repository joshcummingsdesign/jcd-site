#!/bin/bash

source bin/vars/variables.sh

docker exec -it $JEKYLL_CONTAINER bash -c "source ~/.bashrc \
  && echo 'Checking for vulnerabilities...' \
  && echo \
  && npx retire -n -p \
  && echo \
  && echo '===========================' \
  && echo \
  && echo 'Validating JavaScript...' \
  && echo \
  && npx gulp scripts-lint \
  && echo \
  && echo '===========================' \
  && echo \
  && echo 'Validating html...' \
  && echo \
  && bundle exec htmlproofer ./html \
    --check-html \
    --url-ignore '/#.*/' \
    --disable-external"
