import {
    setAccessToken,
    getInitialAccessToken,
    sendAuthRequest
} from "./store.js";

class Main extends React.Component {

    componentDidMount() {
        // Simulate login, retrieve access token
        
        this.props.simulateLogin().catch((err) => {
            this.setState((state) => ({
                ...state,
                error: err.message
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
        this.props.sendAuthRequest().then((data) => {
            this.setState((state) => ({
                ...state,
                response: data
            }));
        });
    }

    render() {
        return (
            React.createElement("div", null, React.createElement("button", {
                onClick: this.props.makeRequest
              }, "send request to protected route"), React.createElement("div", null, "Response: ", this.state.response), 
              React.createElement("button", {
                onClick: () => {}
              }, "Get access token"), 
              React.createElement("div", null, "Error: ", this.state.error),
              React.createElement("div", null, "Access Token: ", this.props.access),
              React.createElement("div", null, "Refresh Token: ", this.props.refresh)
            )
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
        updateAccess: (value) => dispatch(setAccessToken(value)),
        sendAuthRequest: () => dispatch(sendAuthRequest())
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Main);