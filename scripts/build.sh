#!/usr/bin/env bash

set -e
trap "exit" INT

npm run prod

if [[ $CI == true ]]; then
  jekyll build
else
  lando ssh -c "jekyll build"
fi
