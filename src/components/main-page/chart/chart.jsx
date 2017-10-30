import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

import styles from './chart-material';

class Chart extends Component {
    renderIntervals() {
        const { intervals } = this.props;
        return (
            intervals.map((interval, index) => {
                return (
                    { hour: index, seconds: interval }
                )
            })
        );
    }

    // Values are in seconds. Divide by 60 to display in minutes
    scaleLabel = val => {
        return Math.round(val / 60);
    }

    render() {
        return (
            <ResponsiveContainer width={styles.width} aspect={3.0 / 1.0}>
                <BarChart data={this.renderIntervals()} margin={styles.margin}>
                    <YAxis dataKey="seconds" domain={[0, 3600]} tickFormatter={this.scaleLabel} />
                    <XAxis dataKey="hour" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={this.scaleLabel} />
                    <Legend />
                    <Bar dataKey="seconds" name="Minutes in hour" fill={styles.color} />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        intervals: state.intervals
    }
}

export default connect(mapStateToProps)(Chart);