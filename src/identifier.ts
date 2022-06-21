/***
 * ID Helper Function
 * ---
 *
 * @param {string} identifier - Unique, Per-Resource Identifier
 * @param {string} name - Stack or Construct Name
 *
 * @return {string}
 * @constructor
 */
export function ID(identifier: string, name: string) {
    return [ name, identifier ].join( "-" );
}