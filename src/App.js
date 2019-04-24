import React, { Component } from 'react';
import './App.css';
import Login from './Login.js';
import Firebase from "./Firestore";
import StartButton from './StartButton';
import Hole from './Hole';
import Timer from './Timer';
import Score from './Score';
import GameOver from './GameOver';
import PlayAgain from './PlayAgain';
import Level from './Level';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
        playerName: "",
        score: 0, // high score
        currentScore: 0,
        hasLoggedIn: false,
        startButtonIsClicked: false,
        gameHasStarted: false,
        gameHasEnded: false,
        levelIsPicked: false,
        levelPicked: 0,
        activeMole: 0,
        lastMole: 0,
        timer: 5,

        // Moles
        1:'translate(0, 60%)',
        2:'translate(0, 60%)',
        3:'translate(0, 60%)',
        4:'translate(0, 60%)',
        5:'translate(0, 60%)'
    };
    this.getPlayer = this.getPlayer.bind(this);
    this.whackMole = this.whackMole.bind(this);
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
      this.startGame();
    });
  }

  /**
   * Call back to Level.js to get the level picked.
   */
  levelCallBack = (dataFromChild) => {
    this.setState({
      levelIsPicked: true,
      levelPicked: dataFromChild
    });
  }

  /**
   * Call back to Timer.js to get the current timer.
   */
  timerCallBack = (dataFromChild) => {
    this.setState({
      timer: dataFromChild
    });
  }

  /**
   * Call back to PlayAgain.js
   */
  playAgainCallBack = () => {
    this.setState({
      hasLoggedIn: true,
      gameHasStarted: false,
      gameHasEnded: false,
      startButtonIsClicked: true,
      currentScore: 0,
      timer: 5
    }, function() {
      this.startGame();
    });
  }


  /**
   * Get the player's name from Login Component and add it to Firestore if does not exist yet.
   */
  getPlayer() {
    // Setup Firestore
    const db = Firebase.firestore();

    // Get the player's name
    const inputName = this.state.playerName;
    
    // Check if player already exists
    db.collection("Players").doc(inputName).get()
    .then(doc => {
        if (!doc.exists) {
            // Add the new player to the Firestore
            db.collection("Players").doc(inputName).set({
              playerName: inputName,
              highScore: 0
            })
            .then(function() {
              console.log("A new player has been added.");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        } else {
            console.log("Player already exists.");
        }
    }).catch(error => {
      // Error getting document
    })

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
      var holeObject = <Hole context={this.state} holeNumber={i} key={i} onClick={this.whackMole}/>
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
    });

    const interval = setInterval( () => {
        this.showMoles();
        if (this.state.timer === 0) {
          window.clearInterval(interval);
          this.clearMoles();
          this.setState({
            gameHasStarted: false,
            gameHasEnded: true,
            activeMole: 0
          });
        }
    }, this.state.levelPicked); 
  }

  /**
   * Show the mole in different holes.
   */
  showMoles() {
    // Clear the previous mole, if any, before displaying the next one
    this.clearMoles();
    let currentMole = Math.floor(Math.random() * 5) + 1; // returns a random integer from 1 to 5
    if (this.state.lastMole === currentMole) {
      this.showMoles();
      return;
    }
    this.setState({
      [currentMole]: 'translate(0, 5%)',
      lastMole: currentMole,
      activeMole: currentMole
    });
  }

  /**
   * Clear the previous moles.
   */
  clearMoles() {
    for (let i = 1; i <= 5; i++) {
      this.setState({
        [i]: 'translate(0, 60%)'
      });
    }
  }

  /**
   * Mole is whacked, add 1 point to the score.
   */
  whackMole(holeNumber) {
    if (holeNumber === this.state.activeMole) {
      console.log("MATCH");
      this.setState({
        currentScore: this.state.currentScore + 1
      });
    }
  }

  /**
   * --- RENDER ---
   */
  render() {
    const hasLoggedIn = this.state.hasLoggedIn;
    const gameHasStarted = this.state.gameHasStarted;
    const gameHasEnded = this.state.gameHasEnded;
    const levelIsPicked = this.state.levelIsPicked;
    const highScore = this.state.score;
    let button, welcomeText, timer, startGame, scoreTab, gameOver, playAgain, pickLevel;

    // Check if the player has logged in
    if (hasLoggedIn && !gameHasEnded) {
      if (!levelIsPicked) {
        pickLevel = <Level context={this} callBackFromLevelButton={this.levelCallBack}/>
      } else if (gameHasStarted) {
        timer = <Timer context={this} callBackFromTimer={this.timerCallBack} startCount={this.state.timer}/>
        startGame = this.createHoles();
        scoreTab = <Score context={this} score={this.state.currentScore}/>;
      } else {
        button = <StartButton context={this} callBackFromStartButton={this.startButtonCallBack}/>
        welcomeText = <h2 className="welcome-message">Welcome, {this.state.playerName}!</h2>
      }
    } else if (gameHasEnded) {
      gameOver = <GameOver context={this} finalScore={this.state.currentScore} playerName={this.state.playerName}
                    highScore={highScore}/>
      playAgain = <PlayAgain context={this} callBackFromPlayAgainButton={this.playAgainCallBack}/>
    } else {
      button = <Login onSubmit={this.getPlayer} context={this} callBackFromLogin={this.loginCallBack}/>
    }

    return (
      <div className="main-area">
        <div className="game">
          <h1 className="game-title">Whack a Mole!</h1>
          {welcomeText} {pickLevel} {button} {timer}
          {startGame} {scoreTab}
          {gameOver}
          {playAgain}
        </div>
      </div>
    );
  }
}

export default App;