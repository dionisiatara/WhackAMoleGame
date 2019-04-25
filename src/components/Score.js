import React from 'react';

class Score extends React.Component {
    render() {
        return (
            <div>
                <h3>Score: {this.props.score}</h3>
            </div>
        );
    }
}

export default Score