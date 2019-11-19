import React from "react";
import logo from "./impact-logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FormGroup, InputGroup } from "@blueprintjs/core";

const App: React.FC = () => {
    const [terms, setTerms] = React.useState("");
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img style={{ width: 400 }} src={logo}></img>
                        <p
                            style={{
                                fontSize: "200%",
                                fontWeight: 300,
                                fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
                            }}
                        >
                            The Modelica Search Engine
                        </p>
                        <div>
                            <InputGroup
                                fill={false}
                                autoFocus={true}
                                style={{ maxWidth: "20em", width: "100%" }}
                                leftIcon="search"
                                onChange={(e: React.FormEvent<HTMLElement>) =>
                                    setTerms((e.target as HTMLInputElement).value)
                                }
                                placeholder="Search terms..."
                                value={terms}
                            />
                        </div>
                    </div>
                </Route>
                <Route path="/libs">Libraries</Route>
            </Switch>
        </Router>
    );
};

export default App;
