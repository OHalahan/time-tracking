import React, { Component } from 'react';

import Timer from './timer/timer';
import MainTable from './main-table/main-table';
import Chart from './chart/chart';

import classnames from 'classnames';

import styles from './main-page.scss';

class MainPage extends Component {
    render() {
        return (
            <div className={styles['main-container']}>
                <Timer />
                <div className={styles['data-container']}>
                    <MainTable />
                </div>
                <div className={
                    classnames(
                        styles['data-container'], 
                        styles['chart-container']
                    )}>
                    <Chart />
                </div>
            </div>
        )
    }
}

export default MainPage;