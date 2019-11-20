export interface Dependency {
    name: string;
    version: string;
}

export interface LibraryVersion {
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
    versions: { [version: string]: LibraryVersion };
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

export function uniqueId(lib: Library) {
    return `${lib.name}/${encodeURIComponent(lib.uri)}`;
}
