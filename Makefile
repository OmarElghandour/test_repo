.PHONY: help
.DEFAULT_GOAL = help

dc = docker-compose
de = $(dc) exec
composer = $(de) php memory_limit=1 /usr/local/bin/composer

## —— Docker 🐳  ———————————————————————————————————————————————————————————————
.PHONY: start
start:	## Installation du projet
	$(dc) up -d
	$(de) php bash -c 'composer install'
	$(de) php bash -c 'npm install && npm run dev'

.PHONY: build
build:	## Lancer les containers docker au start du projet
	$(dc) up -d
	$(dc) exec php bash -c 'composer install'
	$(dc) exec php bash -c 'npm install && npm run build'
	$(dc) exec php bash -c 'bin/console d:m:m && bin/console d:f:l'

.PHONY: dev
dev:	## start container
	$(dc) up -d

.PHONY: in-dc
in-dc:	## connexion container php
	$(de) php bash

.PHONY: delete
delete:	## delete container
	$(dc) down
	$(dc) kill
	$(dc) rm


## —— Others 🛠️️ ———————————————————————————————————————————————————————————————
help: ## listing command
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
