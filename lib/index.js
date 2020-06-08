import { warn } from "./utils";
import axios from "axios";
// Default options
var defaults = {
    resolveToken: null,
};
/**
 * Creates the request middleware with the specified options.
 * @param {Options} opts
 */
export function createRequestMiddleware(opts) {
    if (opts === void 0) { opts = defaults; }
    return function (store) {
        return function (next) { return function (action) {
            if (action.auth) {
                if (!opts.resolveToken) {
                    throw new TypeError("Error: You must provide an \n                        implementation for 'resolveToken'\n                        in the options for createRequestMiddleware()\n                        when sending requests that require authorization.");
                }
                // Add authorization header to request config
                var token = opts.resolveToken(store);
                if (opts.appendToken) {
                    action.request = opts.appendToken(action.request);
                }
                else {
                    // Default behavior
                    action.request.headers["authorization"] = "Bearer " + token;
                }
            }
            // Continue with callbacks
            if (action.handleResponse) {
                return axios(action.request).then(function (response) {
                    action.handleResponse(response);
                    return next(action);
                }).catch(function (error) {
                    if (!action.handleError) {
                        warn("\n                            Please provide a function for 'handleError'.\n                            Invoking next middleware in chain.\n                        ");
                        return next(action);
                    }
                    action.handleError(error);
                    return next(action);
                });
            }
            return axios(action.request);
        }; };
    };
}
;
