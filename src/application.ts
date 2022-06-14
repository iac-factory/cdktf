/*
 * BSD 3-Clause License - Open Source
 */

import { App } from "cdktf";

export const Application = new Proxy( App, {} );

Object.setPrototypeOf( Application.prototype, App );

/*** Deconstruct Private + Protected Attributes */
export type Application = App & { source: ( ( {
    [Property in keyof App]: App[Property]
} & typeof Application & typeof App ) ) & {
    source: { synth: App["synth"] }
} }