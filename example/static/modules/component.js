export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: null
        };

        this.makeRequest = this.makeRequest.bind(this);
    }

    makeRequest() {
        this.setState({
            response: "hello"
        });
    }

    render() {
        return (
            React.createElement("div", null, React.createElement("button", {
                onClick: this.makeRequest
              }, "send request to protected route"), 
              React.createElement("div", null, "response: ", this.state.response))
        );
    }
}