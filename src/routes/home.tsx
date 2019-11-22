import React, { useEffect } from "react";
import logo from "../impact-logo.svg";
import { InputGroup, ButtonGroup, Button, Icon, Collapse, Card } from "@blueprintjs/core";

import "./hover.css";
import { ImpactIndex, Library, uniqueId } from "../data";
import { LibraryReport } from "../components/library-report";

export interface HitProps {
    lib: Library;
    selected: string | null;
    setSelected: (v: string | null) => void;
}

export const Hit = (props: HitProps) => {
    return (
        <div className="hover">
            <h4 style={{ margin: 2, padding: 2 }}>{props.lib.name}</h4>
            <p style={{ margin: 2, padding: 2 }}>{props.lib.description}</p>
        </div>
    );
};

function truncate(str: string): string {
    if (str.length > 200) return str.slice(0, 197) + "...";
    return str;
}

export const CardHit = (props: HitProps) => {
    return (
        <Card onMouseEnter={() => props.setSelected(uniqueId(props.lib))} onMouseLeave={() => props.setSelected(null)}>
            <p style={{ float: "right" }}>
                <span style={{ marginRight: 10 }}>{props.lib.stars}</span>
                <Icon icon="star" />
            </p>
            <h4 style={{ marginTop: 2 }}>{props.lib.name}</h4>
            <Collapse isOpen={uniqueId(props.lib) === props.selected}>
                <LibraryReport lib={props.lib} />
            </Collapse>
        </Card>
    );
};

export const ButtonHit = (props: HitProps) => {
    return (
        <Button
            text={
                <>
                    <p style={{ float: "right" }}>
                        <span style={{ marginRight: 10 }}>{props.lib.stars}</span>
                        <Icon icon="star" />
                    </p>
                    <h4 style={{ marginTop: 2 }}>{props.lib.name}</h4>
                    <p style={{ width: "100%" }}>
                        <span>{truncate(props.lib.description)}</span>
                    </p>
                    <Collapse isOpen={uniqueId(props.lib) === props.selected}>
                        <LibraryReport lib={props.lib} />
                    </Collapse>
                </>
            }
            onClick={() => {
                const uid = uniqueId(props.lib);
                uid === props.selected ? props.setSelected(null) : props.setSelected(uid);
            }}
        />
    );
};

function match(term: string) {
    return (lib: Library, index: number): boolean => {
        return lib.name.startsWith(term);
    };
}

function searchResults(terms: string, index: ImpactIndex): Library[] {
    //if (terms === "") return [];
    return index.libraries.filter(match(terms));
}

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
                                <CardHit
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
