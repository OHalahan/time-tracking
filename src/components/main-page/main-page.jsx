import React, { Component } from 'react';

import Timer from './timer/timer';
import MainTable from './main-table/main-table';
import Chart from './chart/chart';

class MainPage extends Component {
    render() {
        return (
            <div>
                <Timer />
                <MainTable />
                <Chart />
            </div>
        )
    }
}

export default MainPage;