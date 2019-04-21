import React from 'react';
import firebase from "./Firestore";

class Login extends React.Component {

    // constructor() {
    //     super();
        state = {
            playerName: "",
            score: 0
        };
        updateInput = this.updateInput.bind(this);
        addPlayer = this.addPlayer.bind(this);
    // }

    /**
     * Save the user's input with every change that is made.
     */
    updateInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /**
     * Add the player's name to the Firebase if it does not exist yet.
     * @param {*} e event
     */
    addPlayer(e) {
        // Stops the page from refreshing
        e.preventDefault();

        // Setup Firestore
        const db = firebase.firestore();
        // db.settings({
        //     timestampsInSnapshots: true
        // });
        
        // Get the player's name
        const inputName = this.state.playerName;

        // Check if player already exists
        db.collection("Players").doc(inputName).get()
            .then(doc => {
                if (!doc.exists) {
                    // Add the new player to the Firestore
                    db.collection("Players").doc(inputName).set({
                        playerName: inputName,
                        score: 0
                    });
                    console.log("A new player has been added.");
                } else {
                    console.log("Player already exists.");
                }
            });

        // Remove the user input from the input fields
        this.setState({
            playerName: "",
            score: 0
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log(e.target.value);
        // this.props.callBackFromLogin(e.target.value);
        // this.props.onSubmit(this.state.playerName);
        this.props.onSubmit();
    }

    onInput = (e) => {
        this.setState({
            playerName: e.target.value
        });
        this.props.callBackFromLogin(e.target.value);
    }

    render() {
        return (
            <div className="game-login">
                {/* <form onSubmit={this.addPlayer}> */}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="playerName"
                        placeholder="Player's name"
                        // onChange={this.updateInput}
                        onChange={this.onInput}
                        value={this.state.playerName}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;