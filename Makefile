publish:
	(cd src; make)

	cp index.html ../impact.github.io
	cp -r js ../impact.github.io
	cp -r css ../impact.github.io
	cp -r img ../impact.github.io
	cp -r bower_components ../impact.github.io
