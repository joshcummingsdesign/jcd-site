#!/bin/bash

cd www

echo "Checking for vulnerabilities..."
echo
npx retire -n -p
echo
echo "==========================="
echo
echo "Validating html..."
echo
bundle exec htmlproofer ./html \
  --check-html \
  --url-ignore '/#.*/' \
  --disable-external
