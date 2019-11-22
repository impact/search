import React from "react";
import { Library } from "../data";
import { Classes, Tag } from "@blueprintjs/core";
import { IconLink } from ".";

export interface LibraryReportProps {
    lib: Library;
}

export const LibraryReport = (props: LibraryReportProps) => (
    <div className={Classes.DIALOG_BODY}>
        <p>
            <strong>{props.lib.description}</strong>
        </p>
        <p>
            <b>Versions</b>:{" "}
            {Object.keys(props.lib.versions).map(version => (
                <Tag intent="success">{version}</Tag>
            ))}
        </p>
        <p>
            <IconLink icon="globe" href={props.lib.homepage} />
            <IconLink icon="envelope" href={props.lib.email} />
        </p>
    </div>
);
