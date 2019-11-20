import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "@blueprintjs/core/lib/css/blueprint.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./index.css";

import { ImpactIndex } from "./data";

async function startup() {
    const resp = await fetch("https://impact.github.io/impact_index.json");
    const data: ImpactIndex = await resp.json();
    ReactDOM.render(<App index={data} />, document.getElementById("root"));
}

startup().catch(e => console.error(e));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
