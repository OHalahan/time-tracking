import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { addEvent, startTimer, stopTimer } from '../actions';

const TIME_START = '00:00:00';

class Timer extends Component {
    constructor() {
        super();
        this.state = {
            action: '',
            timePassed: TIME_START,
            taskName: '',
            showDialog: false
        }

        this.counterLink = null;
    }

    componentWillMount() {
        const running = this.props.store.timer.running;
        this.setLabel(running);
        if (running) { this.startCounter() };
    }

    componentWillReceiveProps(newProps) {
        const currTimer = this.props.store.timer;
        const newTimer = newProps.store.timer;

        if (newTimer.running !== currTimer.running) {
            this.setLabel(newProps.store.timer.running);
            // Q: Is there any other way to check that Timer has been stopped and then trigger event
            if (!newTimer.running && newTimer.stop !== currTimer.stop) {
                this.props.addEvent(
                    this.state.taskName,
                    newTimer.start,
                    newTimer.stop,
                    this.state.timePassed
                );
            }
        }

    }

    handleClose() {
        this.setState({
            showDialog: false
        });
    }

    setLabel(running) {
        this.setState({
            action: running ? 'stop' : 'start'
        });
    }

    startCounter() {
        this.counterLink = setInterval(() => {
            let diff = moment(moment(new Date()).diff(this.props.store.timer.start)).utc().format('HH:mm:ss');
            this.setState({
                timePassed: diff
            })
        }, 1000);
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
        if (timer.running && !this.state.taskName) {
            this.setState({
                showDialog: true
            });
        } else {
            if (timer.running) {
                this.props.stopTimer();
                this.stopCounter();
            } else {
                this.props.startTimer();
                this.startCounter();
            }
        }
    }


    render() {
        const dialogActions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={() => this.handleClose()}
            />
        ];
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
                    errorText={this.state.taskName ? '' : 'Task name is required'}
                />
                <Paper style={style} zDepth={1} circle={true}>
                    {this.state.timePassed}
                </Paper>
                <RaisedButton
                    onClick={() => this.toggleState()}
                    label={this.state.action}
                />
                <Dialog
                    title="No task name"
                    actions={dialogActions}
                    modal={false}
                    open={this.state.showDialog}
                    onRequestClose={() => this.handleClose()}
                >
                    Task name is empty. Please, fill in the task name before stopping the timer.
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        store: state
    }
}

export default connect(mapStateToProps, { addEvent, startTimer, stopTimer })(Timer);