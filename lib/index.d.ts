import { Options } from "./types";
import { Store } from "redux";
export { Options, RequestAction } from "./types";
/**
 * Creates the request middleware with the specified options.
 * @param {Options} opts
 */
export declare function createRequestMiddleware(opts?: Options): (store: Store) => (next: any) => (action: any) => any;
