#!/usr/bin/env bash

lando ssh -c "bundle check || bundle install --path vendor/bundle"
