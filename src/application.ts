/*
 * BSD 3-Clause License - Open Source
 */

import { App } from "cdktf";

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

export type Application = typeof Application;