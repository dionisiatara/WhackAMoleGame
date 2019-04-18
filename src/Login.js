import React from 'react';
import firebase from "./Firestore";

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            playerName: "",
            score: 0
        };
        this.updateInput = this.updateInput.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
    }

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
                    const playerRef = db.collection("Players").doc(inputName).set({
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

    render() {
        return (
            <div className="game-login">
                <form onSubmit={this.addPlayer}>
                    <input
                        type="text"
                        name="playerName"
                        placeholder="Player's name"
                        onChange={this.updateInput}
                        value={this.state.playerName}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;