import React, { useEffect } from "react";
import logo from "../impact-logo.svg";
import { InputGroup, ButtonGroup, Button, Icon } from "@blueprintjs/core";

import "./hover.css";
import { ImpactIndex, Library, uniqueId } from "../data";

export interface HomeProps {
    terms: string;
    setTerms: (v: string) => void;
    setSelected: (v: string) => void;
    index: ImpactIndex;
}

export interface HitProps {
    id: string;
    index: ImpactIndex;
    setSelected: (v: string) => void;
}

export const Hit = (props: HitProps) => {
    const lib = props.index.libraries.find(lib => uniqueId(lib) === props.id);
    if (!lib) return <p>Unknown library id {props.id}</p>;
    return (
        <div className="hover">
            <h4 style={{ margin: 2, padding: 2 }}>{lib.name}</h4>
            <p style={{ margin: 2, padding: 2 }}>{lib.description}</p>
        </div>
    );
};

export const ButtonHit = (props: HitProps) => {
    const lib = props.index.libraries.find(lib => uniqueId(lib) === props.id);
    if (!lib) return <p>Unknown library id {props.id}</p>;
    return (
        <Button
            text={
                <>
                    <p style={{ float: "right" }}>
                        <span style={{ marginRight: 10 }}>{lib.stars}</span>
                        <Icon icon="star" />
                    </p>
                    <h4 style={{ marginTop: 2 }}>{lib.name}</h4>
                    <p style={{ width: "100%" }}>{lib.description}</p>
                </>
            }
            onClick={() => {
                props.setSelected(props.id);
            }}
        />
    );
};

function match(term: string) {
    return (lib: Library, index: number): boolean => {
        return lib.name.startsWith(term);
    };
}

function searchResults(terms: string, index: ImpactIndex): string[] {
    //if (terms === "") return [];
    const results = index.libraries.filter(match(terms)).map(uniqueId);
    console.log(results);
    return results.slice(0, 10);
}

export const HomeScreen = (props: HomeProps) => {
    const [hits, setHits] = React.useState<string[]>([]);
    useEffect(() => {
        setHits(searchResults(props.terms, props.index));
    }, [props.terms, props.index]);

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img alt="Impact Logo" style={{ width: 400 }} src={logo}></img>
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

            {hits.length === 0 ? (
                props.terms && <p>No matching search results</p>
            ) : (
                <div
                    style={{
                        borderRadius: "5px",
                        border: "1px solid #eee",
                        marginTop: "10px",
                        width: "45vw",
                        minWidth: "20em",
                    }}
                >
                    {/* <div style={{ overflowY: "scroll" }}>
                        {hits.map(hit => (
                            <Hit key={hit} id={hit} index={props.index} />
                        ))}
                    </div> */}
                    <ButtonGroup vertical={true} style={{ width: "100%" }}>
                        {hits.map(hit => (
                            <ButtonHit key={hit} id={hit} index={props.index} setSelected={props.setSelected} />
                        ))}
                    </ButtonGroup>
                </div>
            )}
        </div>
    );
};
