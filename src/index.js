import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import {getStore} from 'redux/storeConfig';

(async function () {
  const store = await getStore();
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
          </Switch>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
