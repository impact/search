import React from "react";
import { HomeScreen } from "./routes";
import { ImpactIndex } from "./data";

export interface AppProps {
    index: ImpactIndex;
}

const App = (props: AppProps) => {
    const [terms, setTerms] = React.useState("T");
    const [selected, setSelected] = React.useState<string | null>(null);
    return (
        <div>
            <HomeScreen
                index={props.index}
                terms={terms}
                setTerms={setTerms}
                selected={selected}
                setSelected={setSelected}
            />
        </div>
    );
};

export default App;
