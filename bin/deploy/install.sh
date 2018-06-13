#!/bin/bash

cd www

if [ ! -e node_modules ]; then
  echo "Installing node modules..."
  echo
  npm install --silent
  echo
  echo "==========================="
  echo
fi

bundle check || bundle install --path ../vendor/bundle
