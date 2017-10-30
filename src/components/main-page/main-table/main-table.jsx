import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { connect } from 'react-redux';

import { deleteEvent } from '../../../actions';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './main-table-material';

class MainTable extends Component {

    deleteEvent(id) {
        this.props.deleteEvent(id);
    }

    renderEvents() {
        const { events } = this.props;
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
                                labelColor={styles.buttonStyle.color}
                                onClick={() => this.context.router.history.push(`/${event.id}`)}
                            />
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton
                                labelColor={styles.buttonStyle.color}
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
            <Table height={styles.height} fixedHeader={true}>
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
                <TableBody displayRowCheckbox={false} style={styles.bodyStyle}>
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
        events: state.events
    }
}

export default connect(mapStateToProps, { deleteEvent })(MainTable);