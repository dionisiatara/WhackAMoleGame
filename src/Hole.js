import React from 'react';

class Hole extends React.Component {

    moleIsWhacked = () => {
        this.props.onClick(this.props.holeNumber);
        // console.log(this.props.holeNumber);
    }

    render() {
        return (
            <div className="game-hole-area">
                <div className="game-mole"
                    style={{WebkitTransform: this.props.context[this.props.holeNumber]}}
                    onClick={this.moleIsWhacked}>
                </div>
                <div className="hole-location">
                </div>
            </div>
        );
    }
}

export default Hole