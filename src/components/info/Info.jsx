import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { saveEventName } from '../../actions';

import styles from './Info.scss';
import stylesMaterial from './InfoStyles';

class Info extends Component {
    constructor() {
        super();
        this.state = {
            realEvent: {},
            taskName: '',
            hasEvent: false,
            errorText: ''
        }
    }

    setEventsFromProps(props) {
        const { events, match } = props;
        let event = events.find(event => event.id === Number(match.params.eventId));
        this.setState({
            realEvent: event,
            taskName: event ? event.name : '',
            hasEvent: !!event
        });
    }

    componentWillMount() {
        this.setEventsFromProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.setEventsFromProps(newProps);
    }

    validateInput = () => {
        this.setState({
            errorText: this.state.taskName ? '' : 'Task name is required'
        });
    }

    saveName = () => {
        this.props.saveEventName(this.state.realEvent.id, this.state.taskName);
    }

    renderTaskInfo() {
        const { history } = this.props;
        return (
            <div className={styles.infoContainer}>
                <Paper className={styles.paper} zDepth={1}>
                    <TextField
                        floatingLabelText="Task name"
                        value={this.state.taskName}
                        onChange={event => this.setState({ taskName: event.target.value })}
                        errorText={this.state.errorText}
                        floatingLabelStyle={stylesMaterial.floatingLabelStyle}
                        underlineFocusStyle={stylesMaterial.underlineStyle}
                        onFocus={this.validateInput}
                        onBlur={this.validateInput}
                    />
                    <TextField
                        disabled={true}
                        defaultValue={moment(this.state.realEvent.start).format('HH:mm:ss')}
                        floatingLabelText="Time start"
                    />
                    <TextField
                        disabled={true}
                        defaultValue={moment(this.state.realEvent.stop).format('HH:mm:ss')}
                        floatingLabelText="Time end"
                    />
                    <TextField
                        disabled={true}
                        defaultValue={this.state.realEvent.spent}
                        floatingLabelText="Time spent"
                    />
                    <div className={styles.buttonContainer}>
                        <FlatButton
                            style={stylesMaterial.buttonStyle}
                            label="back"
                            primary={true}
                            onClick={() => history.goBack()}
                        />
                        <RaisedButton
                            style={stylesMaterial.buttonStyle}
                            backgroundColor={stylesMaterial.buttonStyle.color}
                            labelColor={stylesMaterial.raisedLabelColor}
                            label='save'
                            onClick={this.saveName}
                            disabled={!this.state.taskName || this.state.taskName === this.state.realEvent.name}
                        />
                    </div>
                </Paper>
            </div>
        )
    }

    renderNoTask() {
        const { history } = this.props;
        return (
            <div>
                <div className={styles.infoContainer}>
                    <Paper className={styles.paper} zDepth={1}>
                        <div>
                            There is no such task ¯\_(ツ)_/¯
                        </div>
                        <RaisedButton
                            style={stylesMaterial.buttonStyle}
                            label='back'
                            onClick={() => history.goBack()}
                        />
                    </Paper>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.hasEvent) {
            return this.renderTaskInfo();
        }
        return this.renderNoTask();
    }
}

function mapStateToProps(state) {
    return {
        events: state.events
    }
}

export default connect(mapStateToProps, { saveEventName })(Info);