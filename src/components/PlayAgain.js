import React from 'react';

class PlayAgain extends React.Component {

    render() {
        return (
            <button className="play-again-button" type="button" onClick={this.props.callBackFromPlayAgainButton}>
                Play again?
            </button>
        );
    }
}

export default PlayAgain