/*
 * BSD 3-Clause License - Open Source
 */

import { TerraformStack } from "cdktf";
import { Application }    from ".";

export const Stack = (name: string, source?: Application) => {
    const Instance = ( source ) ? source : new Application();
    const Composition = new Proxy( TerraformStack, {} );

    const Implementation = new ( class extends Composition {
        source = new Proxy( Instance, {} );

        constructor(name: string, scope: Construct = new Composition( Instance, name )) {
            super( scope, name );
        }
    } )( name );

    return { ... Implementation };
};

import type { Construct } from "constructs";

export default Stack;