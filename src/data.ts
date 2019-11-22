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

export function match(term: string) {
    return (lib: Library, index: number): boolean => {
        const name = lib.name.toLowerCase();
        if (term.length === 0) return false;
        return name.startsWith(term) || (term.length >= 3 && lib.description.toLowerCase().includes(term));
    };
}

export function searchResults(terms: string, index: ImpactIndex): Library[] {
    //if (terms === "") return [];
    const matches = index.libraries.filter(match(terms.toLowerCase()));
    matches.sort((x, y) => y.stars - x.stars);
    return matches;
}
