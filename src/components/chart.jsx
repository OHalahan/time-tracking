import React, { Component } from 'react';

import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class Chart extends Component {
    renderIntervals() {
        const { intervals } = this.props.store;
        return (
            intervals.map((interval, index) => {
                return (
                    { hour: index, seconds: interval }
                )
            })
        );
    }

    // Values are in seconds. Divide by 60 to display in minutes
    scaleLabel(val) {
        return Math.round(val / 60);
    }

    render() {
        return (
            <BarChart width={1080} height={400} data={this.renderIntervals()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <YAxis dataKey="seconds" domain={[0, 3600]} tickFormatter={label => this.scaleLabel(label)} />
                <XAxis dataKey="hour" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip formatter={label => this.scaleLabel(label)} />
                <Legend />
                <Bar dataKey="seconds" name="Minutes in hour" fill="#8884d8" />
            </BarChart>
        )
    }
}

function mapStateToProps(state) {
    return {
        store: state
    }
}

export default connect(mapStateToProps, {})(Chart);