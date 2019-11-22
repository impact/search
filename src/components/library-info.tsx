import React from "react";
import { ImpactIndex, uniqueId } from "../data";
import { Dialog } from "@blueprintjs/core";
import { LibraryReport } from "./library-report";

export interface LibraryInfoProps {
    selected: string | null;
    setSelected: (v: string | null) => void;
    index: ImpactIndex;
}

export const LibraryInfo = (props: LibraryInfoProps) => {
    const lib = props.index.libraries.find(lib => uniqueId(lib) === props.selected);

    return (
        <Dialog
            isOpen={props.selected !== null}
            icon="info-sign"
            onClose={() => props.setSelected(null)}
            title={lib ? lib.name : ""}
        >
            {lib && <LibraryReport lib={lib} />}
        </Dialog>
    );
};
