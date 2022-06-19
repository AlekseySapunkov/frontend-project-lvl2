install:
	npm ci
	chmod +x bin/*.js
	npm link

publish:
	npm publish --dry-run

make lint:
	npx eslint .