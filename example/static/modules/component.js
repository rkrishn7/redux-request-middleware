import {
    setAccessToken,
    getInitialAccessToken
} from "./store.js";

class Main extends React.Component {

    static #ORIGIN = "http://localhost:3000/api/";

    componentDidMount() {
        // Simulate login, retrieve access token
        
        this.props.simulateLogin().then((response) => {

            if(response.statusText === "OK")
                this.props.updateAccess(response.data.access)
            else
                this.setState((state) => ({
                    ...state,
                    error: "Unable to retrieve initial access token"
                }));
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            response: null,
            error: "None"
        };

        this.makeRequest = this.makeRequest.bind(this);
    }

    makeRequest() {
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
        });
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

function mapDispatchToProps(dispatch) {
    return {
        simulateLogin: () => dispatch(getInitialAccessToken()),
        updateAccess: (value) => dispatch(setAccessToken(value))
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Main);