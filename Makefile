THIS_FILE := $(lastword $(MAKEFILE_LIST))

all: help

start:
	@bin/tasks/start.sh

deps:
	@bin/tasks/run-deps.sh

remove-lock-files:
	@bin/tasks/remove-lock-files.sh

sync-lock-files:
	@bin/tasks/sync-lock-files.sh

update-deps:
	@$(MAKE) -f $(THIS_FILE) remove-lock-files
	@$(MAKE) -f $(THIS_FILE) deps
	@$(MAKE) -f $(THIS_FILE) sync-lock-files

check-deps:
	@bin/tasks/check-deps.sh

build-project:
	@bin/tasks/build-project.sh

build:
	@$(MAKE) -f $(THIS_FILE) check-deps
	@$(MAKE) -f $(THIS_FILE) build-project

build-prod:
	@bin/tasks/build-prod.sh

watch:
	@bin/tasks/watch.sh

test:
	@bin/tasks/test.sh

sync:
	@bin/tasks/sync.sh

medium:
	@bin/tasks/medium.sh

sbw:
	@$(MAKE) -f $(THIS_FILE) sync
	@$(MAKE) -f $(THIS_FILE) build
	@$(MAKE) -f $(THIS_FILE) watch

ssh:
	@bin/tasks/ssh.sh

rebuild:
	@bin/tasks/rebuild.sh

stop:
	@bin/tasks/stop.sh

restart:
	@bin/tasks/restart.sh

help:
	@echo "	make start"
	@echo "		- Start the containers"
	@echo "	make deps"
	@echo "		- Install project dependencies"
	@echo "	make update-deps"
	@echo "		- Update newly-added dependencies and generate lock files"
	@echo "	make build"
	@echo "		- Build the project"
	@echo "	make build-prod"
	@echo "		- Build the project with the production flag"
	@echo "	make watch"
	@echo "		- Serve the site on port 3000 and watch for changes"
	@echo "	make test"
	@echo "		- Run all tests"
	@echo "	make sync"
	@echo "		- Copy your www folder into the container"
	@echo "	make medium"
	@echo "		- Get latest medium posts and sync to local"
	@echo "	make sbw"
	@echo "		- Sync, Build, Watch"
	@echo "	make ssh"
	@echo "		- SSH into the container"
	@echo "	make rebuild"
	@echo "		- Rebuild and restart the container"
	@echo "	make stop"
	@echo "		- Stop the container"
	@echo "	make restart"
	@echo "		- Restart the container"

.PHONY: coffee start deps remove-lock-files sync-lock-files update-deps check-deps build-project build watch test sync medium sbw ssh ssh-prod rebuild stop restart
