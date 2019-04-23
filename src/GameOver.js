import React from 'react';
import Firebase from "./Firestore";

class GameOver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highScore: 0
        }
    }

    getHighestScore = () => {
        const db = Firebase.firestore();
        db.collection("Players").doc(this.props.playerName).get().then(doc => {
            if (doc.exists) {
                // return doc.data().highScore;
            //   var highestScore = doc.data().highScore;
              this.setState({
                highScore: doc.data().highScore
              });
            //   console.log("Getting highest score.");
            } else {
              // No such document
            }
          });
    }

    updateHighestScore = () => {
        const finalScore = this.props.finalScore;
        // const currentHighScore = this.state.highScore;
        const db = Firebase.firestore();

        db.collection("Players").doc(this.props.playerName).get().then(doc => {
            if (doc.exists) {
                if (finalScore > doc.data().highScore) {
                    db.collection("Players").doc(this.props.playerName).update({
                        highScore: finalScore
                    });
                }
            }
        });
    }

    getLeaderBoard = () => {
        const db = Firebase.firestore();
    }

    render() {
        return(
            <div>
                <h2>Game Over!</h2>
                <h3>Your final score: {this.props.finalScore}</h3>
                <h3>Your highest score: {this.state.highScore}</h3>
                <h2>Leaderboard</h2>
            </div>
        )
    }

    componentWillMount() {
        this.getHighestScore();
        this.updateHighestScore();
    }

    componentDidMount() {
        // this.updateHighestScore();
    }
}

export default GameOver