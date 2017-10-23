import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import { addEvent, toggleTimer } from '../actions';

const TIME_START = '00:00:00';

class Timer extends Component {
    constructor() {
        super();
        this.state = {
            action: '',
            timePassed: TIME_START,
            taskName: ''
        }

        this.counterLink = null;   
    }

    componentWillMount() {
        this.setLabel();
    }

    setLabel() { 
        this.setState({
            action: this.props.store.timer.running ? 'stop' : 'start'
        });
    }

    startCounter() {
        this.counterLink = setInterval(() => {
            let diff = moment(moment(new Date()).diff(this.props.store.timer.start)).utc().format('HH:mm:ss');
            this.setState({
                timePassed: diff
            })}, 1000);
    }

    stopCounter() {
        clearInterval(this.counterLink);
        this.setState({
            timePassed: TIME_START,
            taskName: ''
        })
    }

    toggleState() {
        const { timer } = this.props.store;
        this.props.toggleTimer();
        this.setLabel();
        
        if (!timer.running) {
            this.props.addEvent(
                this.state.taskName,
                timer.start,
                timer.stop,
                this.state.timePassed
            );
            this.stopCounter();
        } else {
            this.startCounter();
        }
    }


    render() {
        const style = {
            height: 200,
            width: 200,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block'
        };
        return ( 
            <div>
                <TextField
                    floatingLabelText="Task name"
                    value={this.state.taskName}
                    onChange={event => this.setState({ taskName: event.target.value })}
                />
                <Paper style={style} zDepth={1} circle={true}>
                    { this.state.timePassed }
                </Paper>
                <RaisedButton 
                    onClick={() => this.toggleState()}
                    label={this.state.action}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        store: state
    }
}

export default connect(mapStateToProps, { addEvent, toggleTimer })(Timer);