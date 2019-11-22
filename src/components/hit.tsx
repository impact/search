import React from "react";
import { Library } from "../data";
import { Popover, Card, Icon, Classes } from "@blueprintjs/core";
import { LibraryReport } from "./library-report";

export interface HitProps {
    lib: Library;
    selected: string | null;
    setSelected: (v: string | null) => void;
}

export const Hit = (props: HitProps) => {
    return (
        <Card className={Classes.ELEVATION_2} interactive={true} style={{ margin: 4, padding: 10 }}>
            <Popover
                className="popover-inline"
                content={
                    <div style={{ width: "50vw", height: "100%", padding: 10 }}>
                        <LibraryReport lib={props.lib} />
                    </div>
                }
                target={
                    <div style={{ width: "100%" }}>
                        <span style={{ float: "right", margin: 0 }}>
                            <span style={{ marginRight: 5 }}>{props.lib.stars}</span>
                            <Icon style={{ marginRight: 5 }} icon="star" />
                        </span>
                        <h4 style={{ margin: 2 }}>{props.lib.name}</h4>
                    </div>
                }
            />
        </Card>
    );
};
