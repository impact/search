import React, { useEffect } from "react";
import logo from "../impact-logo.svg";
import { InputGroup, ButtonGroup } from "@blueprintjs/core";

import "./hover.css";
import { ImpactIndex, Library, uniqueId, searchResults } from "../data";
import { Hit } from "../components";

export interface HomeProps {
    terms: string;
    setTerms: (v: string) => void;
    selected: string | null;
    setSelected: (v: string | null) => void;
    index: ImpactIndex;
}

export const HomeScreen = (props: HomeProps) => {
    const [hits, setHits] = React.useState<Library[]>([]);
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
                        marginBottom: 50,
                    }}
                >
                    {/* <div style={{ overflowY: "scroll" }}>
                        {hits.map(hit => (
                            <Hit key={hit} id={hit} index={props.index} />
                        ))}
                    </div> */}
                    <ButtonGroup vertical={true} style={{ width: "100%" }}>
                        {hits.map(lib => {
                            return (
                                <Hit
                                    key={uniqueId(lib)}
                                    lib={lib}
                                    selected={props.selected}
                                    setSelected={props.setSelected}
                                />
                            );
                        })}
                    </ButtonGroup>
                </div>
            )}
        </div>
    );
};
