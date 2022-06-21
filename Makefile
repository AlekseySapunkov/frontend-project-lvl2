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

.PHONY: test
