import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers/index';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainPage from './components/main-page/main-page';
import Info from './components/info/info';

const store = createStore(reducers);

const App = () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/:eventId" component={Info} />
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
    <App />, document.getElementById('root')
)