#!/usr/bin/env bash

set -e
trap "exit" INT

echo "Validating html..."
echo
if [[ $CI == true ]]; then
  bundle exec htmlproofer ./_site \
    --check-html \
    --url-ignore '/#.*/' \
    --disable-external
else
  lando ssh -c "bundle exec htmlproofer ./_site \
    --check-html \
    --url-ignore '/#.*/' \
    --disable-external"
fi
