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
