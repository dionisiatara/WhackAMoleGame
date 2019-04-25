import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: "",
            error: ""
        };
    }
    
    /**
     * Call back to main App.js
     */
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.playerName) {
            this.props.onSubmit();
        } else {
            this.setState({
                error: "Please enter your name."
            })
        }
    }

    /**
     * Save the user's input with every change that is made.
     */
    onInput = (e) => {
        this.setState({
            playerName: e.target.value
        });
        this.props.callBackFromLogin(e.target.value);
    }

    render() {
        let errorText;
        if (this.state.error) {
            errorText = this.state.error;
        }

        return (
            <div className="game-login">
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="playerName"
                        placeholder="Player's name"
                        onChange={this.onInput}
                        value={this.state.playerName}
                    />
                    <button className="login-button" type="submit">Login</button>
                </form>
                <h5 className="error-message">{errorText}</h5>
            </div>
        );
    }
}

export default Login;