/*
 * BSD 3-Clause License - Open Source
 */

import { App } from "cdktf";
import Events  from "events";

interface Element {
    id?: string;
}

interface Node extends Element {
    name?: string;
    parent?: Node;
    children?: Node[];
    metadata?: object;
}

const Properties = new WeakMap();
const Abstract: Function["prototype"] & { new(): void } = function (this: Function): App {
    if ( !(this instanceof Abstract) ) {
        return new Abstract();
    }

    Object.setPrototypeOf(this, App.prototype);

    return this.prototype;
}

const Internal = new App({
    stackTraces: true,
    skipValidation: false
});

export const Application = new Proxy( Internal, {} );

// Object.setPrototypeOf( Application, App );

// /*** Deconstruct Private + Protected Attributes */
// export type Application = App & { source: ( ( {
//     [Property in keyof App]: App[Property]
// } & typeof Application & typeof App ) ) & {
//     source: { synth: App["synth"] }
// } }