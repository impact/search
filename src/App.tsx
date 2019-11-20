import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeScreen } from "./routes";
import { ImpactIndex, uniqueId } from "./data";
import { Classes, Dialog } from "@blueprintjs/core";

export interface AppProps {
    index: ImpactIndex;
}

export interface LibraryInfoProps {
    selected: string | null;
    setSelected: (v: string | null) => void;
    index: ImpactIndex;
}

const LibraryInfo = (props: LibraryInfoProps) => {
    const lib = props.index.libraries.find(lib => uniqueId(lib) === props.selected);
    return (
        <Dialog
            isOpen={props.selected !== null}
            icon="info-sign"
            onClose={() => props.setSelected(null)}
            title={lib ? lib.name : ""}
        >
            {lib && (
                <div className={Classes.DIALOG_BODY}>
                    <p>
                        <strong>{lib.description}</strong>
                    </p>
                    <p>
                        Palantir Foundry radically reimagines the way enterprises interact with data by amplifying and
                        extending the power of data integration. With Foundry, anyone can source, fuse, and transform
                        data into any shape they desire. Business analysts become data engineers — and leaders in their
                        organization’s data revolution.
                    </p>
                    <p>
                        Foundry’s back end includes a suite of best-in-class data integration capabilities: data
                        provenance, git-style versioning semantics, granular access controls, branching, transformation
                        authoring, and more. But these powers are not limited to the back-end IT shop.
                    </p>
                    <p>
                        In Foundry, tables, applications, reports, presentations, and spreadsheets operate as data
                        integrations in their own right. Access controls, transformation logic, and data quality flow
                        from original data source to intermediate analysis to presentation in real time. Every end
                        product created in Foundry becomes a new data source that other users can build upon. And the
                        enterprise data foundation goes where the business drives it.
                    </p>
                    <p>Start the revolution. Unleash the power of data integration with Palantir Foundry.</p>
                </div>
            )}
        </Dialog>
    );
};
const App = (props: AppProps) => {
    const [terms, setTerms] = React.useState("T");
    const [selected, setSelected] = React.useState<string | null>(null);
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <HomeScreen index={props.index} terms={terms} setTerms={setTerms} setSelected={setSelected} />
                    <LibraryInfo index={props.index} selected={selected} setSelected={setSelected} />
                </Route>
                <Route path="/libs">Libraries</Route>
            </Switch>
        </Router>
    );
};

export default App;
