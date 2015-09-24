/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../typings/react-router/react-router.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/semver/semver.d.ts" />
/// <reference path="./Index.tsx" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function SortLibrary(a, b) {
    return b.stars - a.stars;
}
/*
function SortVersion(a: Version, b: Version) {
    if (semver.gt(a, b)) return 1;
    if (semver.lt(a, b)) return -1;
    return 0;
}
*/
var ImpactState = (function () {
    function ImpactState(term, index) {
        var _this = this;
        this.term = term;
        this.index = index;
        // TODO: Compute results
        this.results = [];
        // If we have an index and a term, compute results
        if (index != null && term != "" && term != null) {
            var t = term.toLowerCase();
            this.index.libraries.forEach(function (lib) {
                var inname = lib.name.toLowerCase().indexOf(t) > -1;
                var indesc = lib.description.toLowerCase().indexOf(t) > -1;
                if (inname || indesc) {
                    _this.results.push(lib);
                }
            });
            this.results.sort(SortLibrary);
        }
    }
    return ImpactState;
})();
var Impact = (function (_super) {
    __extends(Impact, _super);
    function Impact() {
        _super.call(this);
        this.state = new ImpactState("", null);
    }
    Impact.Mount = function (node) {
        var routes = (React.createElement(Route, {"name": "root", "path": "/", "handler": Impact}));
        var html = React.createElement(Impact, null);
        React.render(html, node);
    };
    Impact.prototype.componentDidMount = function () {
        var _this = this;
        // TODO: Make a prop
        var source = "http://impact.github.io/impact_index.json";
        $.get(source, function (result) {
            _this.setState(new ImpactState(_this.state.term, result));
        });
    };
    Impact.prototype.handleChange = function (event) {
        var term = event.target.value;
        this.setState(new ImpactState(term, this.state.index));
    };
    Impact.prototype.render = function () {
        var term = this.state.term;
        var relems = this.state.results.map(function (result) {
            var key = result.name;
            return React.createElement(Result, {"key": key, "library": result});
        });
        var logo = React.createElement("div", {"className": "col-lg-10 col-lg-offset-1 centered"}, React.createElement("img", {"id": "logo", "src": "img/logo_glossy.svg"}));
        var content = React.createElement("div", {"className": "input-group"}, React.createElement("input", {"type": "text", "className": "form-control", "value": term, "placeholder": "Search for...", "onChange": this.handleChange.bind(this)}), React.createElement("span", {"className": "input-group-btn"}, React.createElement("button", {"className": "btn btn-default", "type": "button"}, React.createElement("span", {"className": "glyphicon glyphicon-search"}))));
        if (this.state.index == null) {
            content = React.createElement("img", {"width": "50%", "src": "img/spinner.svg"});
        }
        return (React.createElement("div", {"className": "container-fluid"}, React.createElement("div", {"className": "row"}, logo, React.createElement("div", {"className": "col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-12 centered"}, content)), React.createElement("div", {"className": "list-group col-lg-6 col-lg-offset-3 rgroup col-md-12"}, relems)));
    };
    return Impact;
})(React.Component);
//# sourceMappingURL=Impact.js.map