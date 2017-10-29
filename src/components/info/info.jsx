import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

class Info extends Component {
    render() {
        const { events, match, history } = this.props;

        if (events.some(event => event.id === Number(match.params.eventId))) {
            return (
                <div> Matched </div>
            )
        }
        return (
            <div>
                <div>
                    There is no such task ¯\_(ツ)_/¯
                </div>
                <RaisedButton
                    label='go back'
                    onClick={() => history.goBack()}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        events: state.events
    }
}

export default connect(mapStateToProps)(Info);