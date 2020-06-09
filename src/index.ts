import { Options, RequestAction } from "./types";
import { Store } from "redux";
import { warn } from "./utils";
import axios from "axios";

// Types
export {
    Options,
    RequestAction
} from "./types";

// Default options
const defaults : Options = {
    resolveToken: null,
};


/**
 * Creates the request middleware with the specified options.
 * @param {Options} opts 
 */
export function createRequestMiddleware(opts: Options = defaults) {

    return function(store : Store) {
        return (next : any) => (action : any) => {

            if(!action.request) {
                return next(action);
            }

            if(action.auth) {
                if(!opts.resolveToken) {
                    throw new TypeError(
                        `Error: You must provide an 
                        implementation for 'resolveToken'
                        in the options for createRequestMiddleware()
                        when sending requests that require authorization.`
                    );
                }

                // Add authorization header to request config
                let token = opts.resolveToken(store);

                if(opts.appendToken) {
                    action.request = opts.appendToken(action.request);
                } else {
                    // Default behavior
                    action.request.headers["authorization"] = "Bearer " + token;
                }
            }

            // Continue with callbacks
            if(action.handleResponse) {
                return axios(action.request).then(function(response) {
                    action.handleResponse(response);
                    return next(action);

                }).catch(function(error) {
                    if(!action.handleError) {
                        warn(`
                            Please provide a function for 'handleError'.
                            Invoking next middleware in chain.
                        `);

                        return next(action);
                    }
                    
                    action.handleError(error);
                    return next(action);

                });
            }

            return axios(action.request);
        };
    };
};