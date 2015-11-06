STATIC_DIR = ../impact.github.io

deps:
	bower install
	npm install
	tsd reinstall

local:
	echo "export = '`git describe --tags`'" > src/ui/version.ts
	webpack

watch: deps
	echo "export = '`git describe --tags`'" > src/ui/version.ts
	webpack-dev-server --watch

publish: local
	cp index.html $(STATIC_DIR)
	cp dist/bundle.js $(STATIC_DIR)/dist
	cp -r css $(STATIC_DIR)
	cp -r img $(STATIC_DIR)
	cp -r bower_components/jquery $(STATIC_DIR)/bower_components
	cp -r bower_components/bootstrap $(STATIC_DIR)/bower_components

clean:
	-rm -f dist/*
	-rm -rf build/*
	-rm -f src/entry.js*
	-rm -f src/lib/*.js* src/lib/version.ts

distclean: clean
	-rm -rf node_modules
	-rm -rf bower_components
	-rm -rf js
	-rm -rf typings
