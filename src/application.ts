/*
 * BSD 3-Clause License - Open Source
 */

import { App } from "cdktf";

export const Application = new Proxy(App, {});

Object.setPrototypeOf(Application.prototype, App);

export default Application;
