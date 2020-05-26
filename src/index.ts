import { Options, Action } from './types';
import { Store } from 'redux';

// Types
export {
    Options,
    Action
} from './types';

export function createRequestMiddleware(opts: Options) {

    return function(store : Store) {
        return (next : any) => (action : Action) => {

        };
    };
};