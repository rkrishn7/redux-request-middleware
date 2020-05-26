import { Store } from 'redux';

export interface Options {
    resolveToken: (store: Store) => string, // returns access token to dispatch requests
};

export interface Action {
    request: object,
    auth: boolean,
    [propName: string] : any,
};