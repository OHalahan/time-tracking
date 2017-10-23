import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { connect } from 'react-redux';

import { deleteEvent } from '../actions';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class MainTable extends Component {

    deleteEvent(id) {
        this.props.deleteEvent(id);
    }

    renderEvents() {
        const { events } = this.props.store;
        return (
            events.map(event => {
                return (
                    <TableRow key={event.id}>
                        <TableRowColumn>{event.id}</TableRowColumn>
                        <TableRowColumn>{event.name}</TableRowColumn>
                        <TableRowColumn>{moment(event.start).format('HH:mm:ss')}</TableRowColumn>
                        <TableRowColumn>{moment(event.stop).format('HH:mm:ss')}</TableRowColumn>
                        <TableRowColumn>{event.spent}</TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label='info'
                                onClick={() => this.context.router.history.push(`/${event.id}`)}
                            />
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton
                                label='delete'
                                onClick={() => this.deleteEvent(event)}
                            />
                        </TableRowColumn>
                    </TableRow>
                )
            })
        );
    }

    render() {
        return (
            <Table>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>#</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Time start</TableHeaderColumn>
                        <TableHeaderColumn>Time end</TableHeaderColumn>
                        <TableHeaderColumn>Time spent</TableHeaderColumn>
                        <TableHeaderColumn></TableHeaderColumn>
                        <TableHeaderColumn></TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.renderEvents()}
                </TableBody>
            </Table>
        )
    }
}

MainTable.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        store: state
    }
}

export default connect(mapStateToProps, { deleteEvent })(MainTable);