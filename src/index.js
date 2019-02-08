import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import { App } from './container';
import configureStore from './store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
