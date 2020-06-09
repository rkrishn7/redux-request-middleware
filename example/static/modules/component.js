import {
    setRefreshToken,
    setAccessToken
} from "./store.js";

class Main extends React.Component {

    static #ORIGIN = "http://localhost:3000/api/";

    constructor(props) {
        super(props);

        this.state = {
            response: null,
            error: "None"
        };

        this.makeRequest = this.makeRequest.bind(this);
    }

    makeRequest() {
        console.log('hello');
        fetch(Main.#ORIGIN + 'protected/', {
            headers: {
                "Authorization" : "Bearer sdsdf"
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState((state) => {
                return (json.error) ? {
                    ...state,
                    error: json.error
                } : {
                    ...state,
                    response: "OK"
                };
            });
        })
    }

    getAccessToken() {

    }

    render() {
        return (
            React.createElement("div", null, React.createElement("button", {
                onClick: this.makeRequest
              }, "send request to protected route"), React.createElement("div", null, "Response: ", this.state.response), 
              React.createElement("button", {
                onClick: () => {}
              }, "Get access token"), 
              React.createElement("div", null, "Error: ", this.state.error),
              React.createElement("div", null, "Access Token: ", this.props.access))
        );
    }
}

function mapStateToProps(state) {
    return {
        access: state.access,
        refresh: state.refresh,
    };
}

export default ReactRedux.connect(mapStateToProps)(Main);