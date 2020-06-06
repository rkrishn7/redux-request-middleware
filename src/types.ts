import { Store } from "redux";
import { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosStatic } from "axios";

export interface Options {
    resolveToken: (store: Store) => string, // returns access token to dispatch requests
    appendToken?: (request: AxiosRequestConfig) => AxiosRequestConfig
};

export interface RequestAction {
    request: AxiosRequestConfig,
    auth: boolean,
    handleResponse?: (response: AxiosResponse) => void,
    handleError?: (error: AxiosError) => void,
    [propName: string] : any,
};