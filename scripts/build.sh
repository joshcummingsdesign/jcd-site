#!/usr/bin/env bash

set -e
trap "exit" INT

if [ ! -e node_modules ]; then
  npm install --silent
  npm run prod
fi

if [[ $CI == true ]]; then
  bundle check || bundle install --path vendor/bundle
  jekyll build
else
  lando ssh -c "bundle check || bundle install --path vendor/bundle"
  lando ssh -c "jekyll build"
fi
