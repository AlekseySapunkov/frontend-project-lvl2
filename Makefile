install:
	install-deps
	chmod +x bin/*.js
	npm link

publish:
	npm publish --dry-run

install-deps:
	npm ci

make lint:
	npx eslint .
	
run:
	bin/gendiff.js

test:
	npm test

.PHONY: test