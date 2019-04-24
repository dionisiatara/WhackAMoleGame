import React from 'react';

class Level extends React.Component {

    getLevelEasy = (e) => {
        this.props.callBackFromLevelButton(1000);
    }

    getLevelHard = (e) => {
        this.props.callBackFromLevelButton(600);
    }

    render() {
        return (
            <div>
                <button className="level-button" type="button" onClick={this.getLevelEasy}>
                    EASY
                </button>
                <button className="level-button" type="button" onClick={this.getLevelHard}>
                    HARD
                </button>
            </div>
        );
    }
}

export default Level