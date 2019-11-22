import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeScreen } from "./routes";
import { ImpactIndex, uniqueId } from "./data";
import { Classes, Dialog, Icon, IconName, Tag } from "@blueprintjs/core";

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
    const link = (icon: IconName, href: string | undefined) =>
        href ? (
            <span>
                <a href={href}>
                    <Icon icon={icon} />
                </a>
            </span>
        ) : null;
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
                        <b>Versions</b>:{" "}
                        {Object.keys(lib.versions).map(version => (
                            <Tag intent="success">{version}</Tag>
                        ))}
                    </p>
                    <p>
                        {link("globe", lib.homepage)}
                        {link("envelope", lib.email)}
                    </p>
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
