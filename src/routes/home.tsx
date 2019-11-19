import React from "react";
import logo from "../impact-logo.svg";
import { InputGroup } from "@blueprintjs/core";

export interface HomeProps {
    terms: string;
    setTerms: (v: string) => void;
}

export const HomeScreen = (props: HomeProps) => {
    return (
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
                    onChange={(e: React.FormEvent<HTMLElement>) => props.setTerms((e.target as HTMLInputElement).value)}
                    placeholder="Search terms..."
                    value={props.terms}
                />
            </div>
        </div>
    );
};
