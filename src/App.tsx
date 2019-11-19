import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeScreen } from "./routes";

const App: React.FC = () => {
    const [terms, setTerms] = React.useState("");
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <HomeScreen terms={terms} setTerms={setTerms} />
                </Route>
                <Route path="/libs">Libraries</Route>
            </Switch>
        </Router>
    );
};

export default App;
