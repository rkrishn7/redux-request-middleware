import { Store } from 'redux';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface Options {
    resolveToken: (store: Store) => string, // returns access token to dispatch requests
    authAsBearerToken?: boolean,
};

export interface RequestAction {
    request: AxiosRequestConfig,
    auth: boolean,
    handleResponse?: (response: AxiosResponse) => void,
    handleError?: (error: AxiosError) => void,
    [propName: string] : any,
};