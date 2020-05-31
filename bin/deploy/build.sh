#!/bin/bash

cd www

if [ ! -e node_modules ]; then
  npm install --silent
fi

bundle check || bundle install --path ../vendor/bundle

npx gulp --production
