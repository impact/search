/// <reference path="../../typings/node/node.d.ts"/>

var sha1: (x: string) => string = require('sha1');

//import sha1 = require("sha1");

export interface Dependency {
	name: string;
	version: string;
}

export interface Version {
	version: string;
	tarball_url: string;
	zipball_url: string;
	path: string;
	isfile: boolean;
	dependencies: Array<Dependency>;
	sha: string;
}

export function libhash(lib: Library): string {
	var str = lib.uri+" "+lib.name;
	return sha1(str);
}

export function findLibrary(index: ImpactIndex, hash: string): Library {
	var found: Library = null;
	index.libraries.forEach((lib: Library) => {
		var h = libhash(lib);
		if (h==hash) {
			found = lib;
		}
	});
	return found;
}

export interface Library {
	name: string;
	uri: string;
	versions: { [version: string]: Version };
	owner_uri: string;
	email: string;
	homepage: string;
	repository_uri: string;
	repository_format: string;
	description: string;
	stars: number;
}

export interface ImpactIndex {
	version: string;
	libraries: Array<Library>;
}
