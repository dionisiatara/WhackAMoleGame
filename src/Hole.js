import React from 'react';

class Hole extends React.Component {
    render() {
        return (
            <div className="game-hole-area">
                <div className="game-mole"
                    style={{WebkitTransform: this.props.context[this.props.holeNumber]}}>
                    {/* add onClick */}
                </div>
                <div className="hole-location">
                </div>
            </div>
        );
    }
}

export default Hole