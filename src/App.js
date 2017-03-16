import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDcz_GnSEJzuW915_N9ibq2sTObuOF1b1g",
      authDomain: "skydreamer-6cb0d.firebaseapp.com",
      databaseURL: "https://skydreamer-6cb0d.firebaseio.com",
      storageBucket: "skydreamer-6cb0d.appspot.com",
      messagingSenderId: "321890545274"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
