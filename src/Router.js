/**
 * @Class:             Chat.js
 * @Description:       Render Chat Component
 * @Author:            Guilherme Borges Bastos     @Date: 28/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Guilherme Bastos    07/03/17    Add InternalChat Component
 */
import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { View, AsyncStorage } from 'react-native';
import firebase from 'firebase';

import LoginForm from './components/LoginForm';
import Main from './components/Main';
import InternalChat from './components/pages/Chat/Internal';

class RouterComponent extends Component {
  state = { logged: false, loading: true, token: '' };

  componentWillMount() {
    this.subscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({ logged: true, loading: false });
      } else {
        // No user is signed in.
        this.setState({ logged: false, loading: false });
      }
    });
  }

  render() {

    return (
      this.state.loading ?
        <View /> :
        <Router key="root">
          <Scene
            key="login"
            component={LoginForm}
            hideNavBar
            hideTabBar
            initial={!this.state.logged}
          />
          <Scene
            key="main"
            component={Main}
            hideNavBar
            hideTabBar
            initial={this.state.logged}
          />
          <Scene
            key="internalChat"
            component={InternalChat}
            hideNavBar
            hideTabBar
          />
        </Router>
    );
  }
}

export default RouterComponent;
