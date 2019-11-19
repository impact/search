import React from "react";
import logo from "../impact-logo.svg";
import { InputGroup, Card, Elevation, Button } from "@blueprintjs/core";

export interface HomeProps {
    terms: string;
    setTerms: (v: string) => void;
}

export interface HitProps {
    first?: boolean;
    last?: boolean;
    title: string;
    text: string;
}

const firstStyle: React.CSSProperties = {
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
};

const lastStyle: React.CSSProperties = {
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
};

export const Hit = (props: HitProps) => {
    const style = props.first ? firstStyle : props.last ? lastStyle : {};
    return (
        <div style={{ ...style, boxSizing: "border-box", width: "100%", border: "1px solid #cccccc" }}>
            <h4 style={{ margin: 2, padding: 2 }}>{props.title}</h4>
            <p style={{ margin: 2, padding: 2 }}>{props.text}</p>
        </div>
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
            <div style={{ marginTop: "10px", width: "45vw", minWidth: "20em" }}>
                <Hit first={true} title="Buildings" text="A library of building components" />
                <Hit title="Next" text="More text" />
                <Hit last={true} title="Vehicle Dynamics" text="A library about vehicle dynamics" />
            </div>
        </div>
    );
};
