import React from 'react';

class StartButton extends React.Component {

    render() {
        return (
            <button className="game-start-button" type="button" onClick={this.props.callBackFromStartButton}>
                Start Game
            </button>
        );
    }
}

export default StartButton