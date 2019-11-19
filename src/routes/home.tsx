import React from "react";
import logo from "../impact-logo.svg";
import { InputGroup, Card, Elevation, Button } from "@blueprintjs/core";

export interface HomeProps {
    terms: string;
    setTerms: (v: string) => void;
}

export interface HitProps {
    title: string;
    text: string;
}
export const Hit = (props: HitProps) => {
    return (
        <Card interactive={true} elevation={Elevation.TWO} style={{ padding: 2, margin: 2 }}>
            <h4 style={{ margin: 2, padding: 2 }}>{props.title}</h4>
            <p style={{ margin: 2, padding: 2 }}>{props.text}</p>
        </Card>
    );
};

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
            <div style={{ marginTop: "10px", width: "45vw", minWidth: "40em" }}>
                <Hit title="Buildings" text="A library of building components" />
                <Card interactive={true} elevation={Elevation.TWO} style={{ padding: 2, margin: 2 }}>
                    <h4 style={{ margin: 2, padding: 2 }}>Name</h4>
                    <p style={{ margin: 2, padding: 2 }}>Card content</p>
                </Card>
                <Card interactive={true} elevation={Elevation.TWO}>
                    <p>Card content</p>
                </Card>
            </div>
        </div>
    );
};
