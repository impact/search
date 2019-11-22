import React from "react";
import { IconName, Icon } from "@blueprintjs/core";

export interface IconLinkProps {
    icon: IconName;
    href: string | undefined;
}

export const IconLink = (props: IconLinkProps) => {
    return props.href ? (
        <span>
            <a href={props.href}>
                <Icon icon={props.icon} />
            </a>
        </span>
    ) : null;
};
