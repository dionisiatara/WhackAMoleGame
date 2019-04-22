// App.js
import React, { Component } from 'react';
import './App.css';
import Login from './Login.js';
import firebase from "./Firestore";
import StartButton from './StartButton';
import Hole from './Hole';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
        playerName: "",
        score: 0,
        currentScore: 0,
        hasLoggedIn: false,
        startButtonIsClicked: false,
        gameHasStarted: false,
        lastMole: '',

        // Moles
        1:'translate(0, 60%)',
        2:'translate(0, 60%)',
        3:'translate(0, 60%)',
        4:'translate(0, 60%)',
        5:'translate(0, 60%)'
    };
    this.getPlayer = this.getPlayer.bind(this);
    //this.displayPlayerName = this.displayPlayerName.bind(this);
  }

  /**
   * Call back to Login.js to get the player's name from the form.
   */
  loginCallBack = (dataFromChild) => {
    this.setState({
      playerName: dataFromChild
    });
  }

  /**
   * Call back to StartButton.js to update the state.
   */
  startButtonCallBack = () => {
    this.setState({
      startButtonIsClicked: true
    }, function() {
      console.log("startButtonIsClicked = " + this.state.startButtonIsClicked);
      this.startGame();
    });
  }

  /**
   * Get the player's name from Login Component and add it to Firestore if does not exist yet.
   */
  getPlayer() {
    // Setup Firestore
    const db = firebase.firestore();

    // Get the player's name
    const inputName = this.state.playerName;
    // console.log(inputName);
    
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

    // Update the login state
    this.setState({
      hasLoggedIn: true
    }, function() {
      console.log("hasLoggedIn = " + this.state.hasLoggedIn);
    });
  }

  /**
   * Create the holes for the mole.
   */
  createHoles() {
    var holes = [];
    for (let i = 1; i <= 5; i++) {
      var holeObject = <Hole context={this.state} holeNumber={i} key={i}/>
      holes.push(holeObject);
    }

    // Place the holes on the game board.
    return (
      <div className="game-board">
        {holes}
      </div>
    );
  }

  /**
   * Start the game.
   */
  startGame() {
    if (this.state.gameHasStarted) {
      return;
    }
    this.setState({
      gameHasStarted: true,
      score: 0
    }, function() {
      console.log("gameHasStarted = " + this.state.gameHasStarted);
      this.showMoles();
    });
  }

  /**
   * Show the mole in different holes.
   */
  showMoles() {
    // for (let i = 1; i <= 5; i++) {
    //   this.setState({
    //     [i]: 'translate(0, 5%)'
    //   }, function() {
    //     console.log("Mole " + i);
    //   });
    // }
    let currentMole = Math.floor(Math.random() * 5) + 1; // returns a random integer from 1 to 5
    this.setState({
      [currentMole]: 'translate(0, 5%)',
      lastMole: [currentMole]
    });
  }

  /**
   * --- RENDER ---
   */
  render() {
    const hasLoggedIn = this.state.hasLoggedIn;
    const gameHasStarted = this.state.gameHasStarted;
    let button;
    let text;

    // Check if the player has logged in
    if (hasLoggedIn) {
      if (gameHasStarted) {
        // text = <h2>Show something</h2>
      } else {
        button = <StartButton context={this} callBackFromStartButton={this.startButtonCallBack}/>
        text = <h2 className="welcome-message">Welcome, {this.state.playerName}!</h2>
      }
    } else {
      button = <Login onSubmit={this.getPlayer} context={this} callBackFromLogin={this.loginCallBack}/>
    }

    return (
      <div className="main-area">
        <div className="game">
          <h1 className="game-title">Whack a Mole!</h1>
          {text} {button}
          {this.createHoles()}
          {/* {this.startGame()} */}
        </div>
      </div>
    );
  }
}

export default App;