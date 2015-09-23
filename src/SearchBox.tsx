/// <reference path="../typings/react/react-global.d.ts" />

class SearchBoxData {
	constructor(public term: string) { }
}

interface NoAttributes {
}

class SearchBox extends React.Component<{}, SearchBoxData> {
    constructor() {
		super();
		this.state = new SearchBoxData("");
    }

    showComponent() {
        React.render((<SearchBox />), document.getElementById('content'));
    }

	render() {
		return (
				<div>
				<span>Hello</span>
				</div>
		);
	}
}
