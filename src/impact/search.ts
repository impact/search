import { ImpactIndex, Library } from './Index';

function match(t: string, lib: Library): boolean {
	var inname = lib.name.toLowerCase().indexOf(t)>-1;
	var indesc = lib.description.toLowerCase().indexOf(t)>-1;

	return inname || indesc;
}

// This function takes a given search term (as a string) and an index structure
// and returns a list of libraries that match the search term.
export function computeResults(term: string, index: ImpactIndex): Library[] {
	var results: Library[] = [];
	var sf = (a: Library, b: Library) => b.stars - a.stars;

	if (index==null) return results;
	if (term=="" || term==null) return results;

	if (term=="*") {
		results = index.libraries.sort(sf);
		return results;
	}

	// If we have an index and a term, compute results
	var terms = term.toLowerCase().trim().split(/[ ]+/)

	index.libraries.forEach((lib: Library) => {
		var matches = true;
		terms.forEach((t: string) => {
			if (!match(t, lib)) {
				matches = false;
			}
		})
		if (matches) {
			results.push(lib);
		}
	});

	results.sort(sf);
	return results;
}
