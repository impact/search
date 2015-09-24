STATIC_DIR = ../impact.github.io

publish:
	(cd src; tsc)
	webpack
	cp index.html $(STATIC_DIR)
	cp dist/bundle.js $(STATIC_DIR)/dist
	cp -r css $(STATIC_DIR)
	cp -r img $(STATIC_DIR)
	cp -r bower_components/jquery $(STATIC_DIR)/bower_components
	cp -r bower_components/bootstrap $(STATIC_DIR)/bower_components
