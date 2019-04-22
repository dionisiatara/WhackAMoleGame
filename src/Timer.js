import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seconds: 0
        };
    }

    render() {
        const {seconds} = this.state;
        return (
            <div>
                <h3>Time Left: {seconds}</h3>
            </div>
        );
    }

    componentDidMount() {
        const {startCount} = this.props;
        this.setState({
            seconds: startCount
        });
        this.myInterval = setInterval( () => {
            this.setState({
                seconds: this.state.seconds - 1
            }, function() {
                this.props.callBackFromTimer(this.state.seconds);
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }
}

export default Timer