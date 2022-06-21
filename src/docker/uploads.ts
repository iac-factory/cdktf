import type { Reader }   from "..";

import Cryptography from "crypto";
import Path         from "path";
import FS           from "fs";

/***
 *
 * @param directory
 * @param {Reader.Descriptor[]} collection - {@param stateful
@link Reader.read}
 * @return {{sourceHash: string, file: string, source: string}[]}
 *
 * @example
 * const assets = new Asset( this, "node-modules", {
 *     path: "./node_modules",
 *     type: 1
 * } );
 *
 * const files = Reader.read( assets.fileName );
 *
 * const uploads = Uploads("/usr/share/application", files);
 *
 * @constructor
 */
export function Uploads(directory: string, collection: Reader.Descriptor[], stateful?: boolean) {
    return collection.filter( (element) => ( element.properties.file && !( element.name.includes( "map" ) ) ) ).map( (file) => {

        const hash = (stateful) ? Cryptography.createHash( "sha1" ) : null;
        const relative = Path.relative( process.cwd(), file.path );
        const buffer = FS.readFileSync( relative, { encoding: "base64" } );

        (stateful) && hash!.update( buffer );

        const checksum = (stateful) ? hash!.digest().toString( "base64" ) : undefined;

        const target = Path.join( directory, relative.replace( "build", "" ) );

        return {
            /**
             * Path to the file in the container where is upload goes to
             *
             * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/docker/r/container#file Container#file}
             */
            file: target,
            /**
             * A filename that references a file which will be uploaded as the object content. This allows for large file uploads that do not get stored in state. Conflicts with `content` & `content_base64`
             *
             * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/docker/r/container#source Container#source}
             */
            source: file.path,
            /**
             * If using `source`, this will force an update if the file content has updated but the filename has not.
             *
             * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/docker/r/container#source_hash Container#source_hash}
             */
            sourceHash: checksum
        };
    } );
}