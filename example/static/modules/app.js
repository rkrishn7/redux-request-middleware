import Main from './component.js';
import store from './store.js';

const App = () => (
    React.createElement(ReactRedux.Provider, {
    store: store
    }, React.createElement(Main, null))
);

ReactDOM.render(
    React.createElement(App, null),
    document.getElementById("root")
);