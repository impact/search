import React = require('react');
var GitHubForkRibbon = require('react-github-fork-ribbon');


class Component extends React.Component<{}, {}> {
	render() {
		var content =
      <GitHubForkRibbon href="https://github.com/impact/search"
                        target="_blank"
                        position="right">
        Fork me on GitHub
      </GitHubForkRibbon>;
		return content;
	}
}

export = Component;
