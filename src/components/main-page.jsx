import React, { Component } from 'react';

import Timer from './timer';
import MainTable from './main-table';
import Chart from './chart';

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