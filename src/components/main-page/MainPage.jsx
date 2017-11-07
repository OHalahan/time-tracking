import React, { Component } from 'react';

import Timer from './timer/Timer';
import MainTable from './main-table/MainTable';
import Chart from './chart/Chart';

import classnames from 'classnames';

import styles from './MainPage.scss';

class MainPage extends Component {
    render() {
        return (
            <div className={styles.mainContainer}>
                <Timer />
                <div className={styles.dataContainer}>
                    <MainTable />
                </div>
                <div className={
                    classnames(
                        styles.dataContainer,
                        styles.chartContainer
                    )}>
                    <Chart />
                </div>
            </div>
        )
    }
}

export default MainPage;