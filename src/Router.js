///-----------------------------------------------------------------
///   Class:          Chat.js
///   Description:    Render Chat Component
///   Author:         Guilherme Borges Bastos       Date: 28/02/2017
///   Notes:
///   Revision History:
///   Name:             Date:        Description:
///   Guilherme Bastos  07/03/17     Add InternalChat Component
///-----------------------------------------------------------------

import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { View, AsyncStorage } from 'react-native';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import InternalChat from './components/pages/Chat/Internal';

class RouterComponent extends Component {

  state = { logged: false, loading: true, token: '' };

  componentWillMount() {
   AsyncStorage.getItem('token')
   .then((value) => {
       if (value != null) {
         this.setState({
           logged: true,
           loading: false,
           token: value
         });
       } else {
         AsyncStorage.getItem('fb_name')
         .then((value) => {
           console.log("fb_name value@Router", value);
           if (value != null) {
             this.setState({
               logged: true,
               loading: false,
               token: null,
               fb_name: value
             });
           } else {
             this.setState({
               logged: false,
               loading: false,
               token: null,
               fb_name: null
             });
           }
         })
       }
     }
   );
 }

  render() {
    console.log('---------- RouterComponent -------------');
    console.log(this.state.token);
    console.log(this.state);

    if (this.state.loading) {
      return <View />;
    }

    return (
      <Router key='root'>
        <Scene key="login" component={LoginForm} hideNavBar hideTabBar initial={!this.state.logged} />
        <Scene key="chat" component={Main} hideNavBar hideTabBar initial={this.state.logged} />
        <Scene key="internalChat" component={InternalChat} hideNavBar hideTabBar />
      </Router>
    );
  }
}

export default RouterComponent;
