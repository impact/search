STATIC_DIR = ../impact.github.io

local:
	echo "export = '`git describe --tags`'" > src/lib/version.ts
	webpack

watch:
	echo "export = '`git describe --tags`'" > src/lib/version.ts
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
	-rm -f src/lib/*.js*
