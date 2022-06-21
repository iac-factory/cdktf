/*
 * BSD 3-Clause License - Open Source
 */

import { TerraformAsset } from "cdktf";

const Abstract: Function["prototype"] & { new(): void } = function (this: Function): TerraformAsset {
    if ( !(this instanceof Abstract) ) {
        return new Abstract();
    }

    Object.setPrototypeOf(this, TerraformAsset.prototype);

    return this.prototype;
}

declare enum Types {
    FILE = 0,
    DIRECTORY = 1,
    ARCHIVE = 2
}

type Assets = {
    [ Value in keyof typeof Types]: typeof Types[Value];
}

export type File = Assets["FILE"];
export type Directory = Assets["DIRECTORY"];
export type Archive = Assets["ARCHIVE"];

export const Asset = new Proxy( TerraformAsset, {} );

export type Asset = typeof Asset;