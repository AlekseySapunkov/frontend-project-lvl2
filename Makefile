install:
	npm ci
	chmod +x bin/*.js
	npm link

publish:
	npm publish --dry-run

make lint:
	npx eslint .
	
run:
	bin/gendiff.js

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
