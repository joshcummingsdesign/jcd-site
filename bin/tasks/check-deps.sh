#!/bin/bash

source bin/vars/variables.sh
source bin/vars/deps.sh

echo
echo "Checking dependencies..."

# Create temp dir
mkdir -p bin/tmp
docker cp $JEKYLL_CONTAINER:/var/www/Gemfile.lock bin/tmp/
docker cp $JEKYLL_CONTAINER:/var/www/package-lock.json bin/tmp/

# If gems and modules are different
if ! cmp www/Gemfile.lock bin/tmp/Gemfile.lock >/dev/null 2>&1 && ! cmp www/package-lock.json bin/tmp/package-lock.json >/dev/null 2>&1; then
  docker exec -it $JEKYLL_CONTAINER bash -c "rm -rf /var/www/vendor /var/www/node_modules"
  docker cp www/Gemfile.lock $JEKYLL_CONTAINER:/var/www/
  docker cp www/package-lock.json $JEKYLL_CONTAINER:/var/www/
  deps

# If gems are different
elif ! cmp www/Gemfile.lock bin/tmp/Gemfile.lock >/dev/null 2>&1; then
  docker exec -it $JEKYLL_CONTAINER bash -c "/var/www/vendor"
  docker cp www/Gemfile.lock $JEKYLL_CONTAINER:/var/www/
  deps

# If modules are different
elif ! cmp www/package-lock.json bin/tmp/package-lock.json >/dev/null 2>&1; then
  docker exec -it $JEKYLL_CONTAINER bash -c "rm -rf /var/www/node_modules"
  docker cp www/package-lock.json $JEKYLL_CONTAINER:/var/www/
  deps
fi

# Remove temp dir
rm -rf bin/tmp
