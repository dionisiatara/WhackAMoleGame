import React from 'react';

import constants from '../lib/constants';

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

    /**
     * Executed after the first render.
     * Used with delayed execution such as setTimeout or setInterval.
     */
    componentDidMount() {
        const {startCount} = this.props;
        this.setState({
            seconds: startCount
        });
        this.myTimeOut = setTimeout( () => {
            this.myInterval = setInterval( () => {
                this.setState({
                    seconds: this.state.seconds - 1
                }, function() {
                    this.props.callBackFromTimer(this.state.seconds);
                });
            }, constants.TIMER_INTERVAL);
        }, constants.TIMER_TIMEOUT);
        
    }

    /**
     * Invoked immediately before a component is unmounted and destroyed.
     * Perform cleanup in this method, such as invalidating timers.
     */
    componentWillUnmount() {
        clearInterval(this.myInterval);
        clearTimeout(this.myTimeOut);
    }
}

export default Timer