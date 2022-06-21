import Path     from "path";
import FS       from "fs";
import Archiver from "archiver";

/***
 * ZIP Artifact Compression
 * ---
 *
 * @param {string} source
 * @param destination
 * @returns {Promise<Set<string>>}
 *
 * @constructor
 */
export const Compression = async (source: string, destination: string = "archive.zip"): Promise<string> => {
    const zip = "nodejs.zip";

    // const internal = [ "nodejs", "node_modules" ].join( Path.sep );

    const archiver = async () => new Promise<string>( (resolve) => {
        const output = FS.createWriteStream( zip );

        const archive = Archiver.create( "zip", {
            zlib: { level: 9 }, comment: "AWS Lambda Function Node.js Archive", forceLocalTime: true
        } );

        output.on( "close", () => {
            /// console.log( "Total Byte(s)", "-", archive.pointer() );
        } );

        output.on( "end", () => {
            console.log( "Data Stream Successfully Drained" );
        } );

        archive.on( "warning", (error?: Interface.Exception) => {
            throw error;
        } );

        archive.on( "warning", (error: Interface.Exception) => {
            if ( error.code === "ENOENT" ) {
                process.stdout.write( "[Warning] Archive (Compression) Caught Exception" + " " + error + "\n" );
            } else {
                throw error;
            }
        } );

        archive.on( "error", (error: Interface.Exception) => {
            throw error;
        } );

        archive.on( "entry", (entry: Interface.Entry) => {
            /// ...
        } );

        archive.on( "data", (data: Interface.Data) => {
            /// ...
        } );

        archive.on( "progress", (listener: Interface.Listener) => {
            /// ...
        } );

        // Pipe Archive data -> File

        archive.pipe( output );

        archive.directory( source, destination );

        void archive.finalize().then( () => {
            if ( typeof output.path === "string" ) {
                resolve( Path.join( process.cwd(), output.path ) );
            }
        } );
    } );

    return archiver();
};

export default Compression;

export module Interface {
    export interface Entry {
        /** Sets the entry name including internal path */
        name: string;
        /** Sets the entry date */
        date?: Date | string | undefined;
        /** Sets the entry permissions */
        mode?: number | undefined;
        /**
         * Sets a path prefix for the entry name.
         * Useful when working with methods like `directory` or `glob`
         */
        prefix?: string | undefined;
        /**
         * Sets the fs stat data for this entry allowing
         * for reduction of fs stat calls when stat data is already known
         */
        stats?: FS.Stats | undefined;
    }

    export abstract class Exception extends Error {
        declare code: string;
        declare data: any;
        declare path?: any;
    }

    export type Data = Buffer;

    export interface Progress {
        entries: {
            total: number;
            processed: number;
        };
        fs: {
            totalBytes: number;
            processedBytes: number;
        };
    }

    export type Listener = (progress: Interface.Progress) => void;
}
