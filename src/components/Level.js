import React from 'react';

import constants from '../lib/constants';

class Level extends React.Component {

    /**
     * Call back to main App.js
     */
    getLevelEasy = (e) => {
        this.props.callBackFromLevelButton(constants.GAME_LEVEL_EASY);
    }

    /**
     * Call back to main App.js
     */
    getLevelHard = (e) => {
        this.props.callBackFromLevelButton(constants.GAME_LEVEL_HARD);
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