/*
 * BSD 3-Clause License - Open Source
 */

import { TerraformOutput } from "cdktf";

const Abstract: Function["prototype"] & { new(): void } = function (this: Function): TerraformOutput {
    if ( !(this instanceof Abstract) ) {
        return new Abstract();
    }

    Object.setPrototypeOf(this, TerraformOutput.prototype);

    return this.prototype;
}

export const Output = new Proxy( TerraformOutput, {} );

export type Output = typeof Output;