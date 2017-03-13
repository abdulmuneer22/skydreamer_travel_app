import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Router from './Router';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
