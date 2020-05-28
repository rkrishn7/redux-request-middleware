import { Options, RequestAction } from './types';
import { Store } from 'redux';
import axios from 'axios';

// Shorthand

const warn  = console.warn;
const error = console.error;

// Types
export {
    Options,
    RequestAction
} from './types';

// Default options
const defaults : Options = {
    resolveToken: null,
    authAsBearerToken: true,
};

export function createRequestMiddleware(opts: Options = defaults) {

    /*
        The function returned here doesn't invoke the next piece
        of middleware in the chain, so it should be placed at the end.

        The reasoning behind this is to make request actions dispatched
        with this middleware chainable.

        Ex:

        dispatch({
            requestInstance: axios.create({ ... }),
            auth: true,
        }).then((response) => {
            ...
        });
    */

    return function(store : Store) {
        return (next : any) => (action : RequestAction) => {

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
                action.request.headers['Authorization'] = 'Bearer ' + token;
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