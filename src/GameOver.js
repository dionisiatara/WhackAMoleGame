import React from 'react';
import Firebase from './Firestore';

class GameOver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highScore: 0,
            list: []
        }
    }

    getHighestScore = () => {
        const db = Firebase.firestore();
        db.collection("Players").doc(this.props.playerName).get().then(doc => {
            if (doc.exists) {
              this.setState({
                highScore: doc.data().highScore
              });
            } else {
              // No such document
            }
          });
    }

    updateHighestScore = () => {
        const finalScore = this.props.finalScore;
        const db = Firebase.firestore();

        db.collection("Players").doc(this.props.playerName).get().then(doc => {
            if (doc.exists) {
                if (finalScore > doc.data().highScore) {
                    db.collection("Players").doc(this.props.playerName).update({
                        highScore: finalScore
                    });
                }
                this.getHighestScore();
            }
        });
    }

    getLeaderBoard = () => {
        const db = Firebase.firestore();
        var scoreBoard = this.state.list;
        db.collection("Players").orderBy("highScore", "desc").limit(5).get().then(snapshot => {
            snapshot.forEach(item => {
                scoreBoard.push(item.data().playerName + " " + item.data().highScore)
            });
            this.setState({ list: scoreBoard })
        });
    }

    render() {
        return(
            <div className="game-over">
                <h2>Game Over!</h2>
                <h3>Your final score: {this.props.finalScore}</h3>
                <h3>Your highest score: {this.state.highScore}</h3>
                <h2>Leaderboard (Top 5)</h2>
                <div className="score-board">
                    <ul>
                        {this.state.list.map(d => <li> <h4>{d}</h4></li>)}
                    </ul>
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.updateHighestScore();
        this.getHighestScore();
        this.getLeaderBoard();
    }
}

export default GameOver