import React, { Component, PropTypes } from 'react';
import { Text,
         View,
         Image,
         StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from 'skydreamer/actions';
import { CardSection,
         Spinner,
         Input } from 'skydreamer/common';
import ButtonCreateAccount from './ButtonCreateAccount';
import FacebookLoginButton from './FacebookLoginButton';

import ImgLoginBg from 'skydreamer/images/login-bg.jpg';
import ImgLogo from 'skydreamer/images/logo.png';

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    backgroundColor: 'transparent',
  },
  containerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  containerLogoStyle: {
    flex: 4,
    backgroundColor: 'transparent',
    marginTop: 25,
    flexDirection: 'column',
  },
  backgroundImageStyle: {
    flex: 1,
    width: null,
    height: null,
  },
  loginFormContainerStyle: {
    flex: 7,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
},
};

class LoginForm extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  
  onEmailChange = (text) => {
    this.props.actions.emailChanged(text);
  }

  onPasswordChange = (text) => {
    this.props.actions.passwordChanged(text);
  }

  onButtonPress = () => {
    const { email,
            password,
            actions } = this.props;
    actions.loginUser({ email, password });
  }

  renderButton = () => (
    this.props.loading ?
      <Spinner size="large" /> :
      <ButtonCreateAccount onPress={this.onButtonPress}>
        Create account
      </ButtonCreateAccount>
  );

  render() {
    const { errorTextStyle,
            containerStyle,
            backgroundImageStyle,
            loginFormContainerStyle,
            containerLogoStyle } = styles;

    const { email,
            password,
            error,
            actions } = this.props;

    //NOTE: letterSpacing works only on IOS, then we nee to use spaces between the letter

    return (
      <View style={containerStyle}>
        <StatusBar
          hidden
        />
        <Image source={ImgLoginBg} style={backgroundImageStyle}>

          <View style={containerLogoStyle}>
            <Image
              style={{ alignSelf: 'center', width: 70, height: 70 }}
              source={ImgLogo}
            />
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}>
              <Text
                style={{
                  fontSize: 45,
                  alignSelf: 'center',
                  color: 'white',
                  fontFamily: 'Poppins-SemiBold',
                  lineHeight: 65
                }}
              >
                SkyDreamer
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: 'Poppins-Regular'
                }}
              >
              G R O U P   T R A V E L L I N G
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'white',
                  lineHeight: 16,
                  fontFamily: 'Poppins-Regular'
                }}
              >
              T O  T H E  N E X T  L E V E L
              </Text>
            </View>
          </View>

          <View style={loginFormContainerStyle}>

            <Text style={errorTextStyle}>
              {error}
            </Text>

            <CardSection style={{ paddingTop: 10 }}>
              <FacebookLoginButton onPress={actions.loginUserViaFacebook} />
            </CardSection>

            <CardSection>
              {this.renderButton()}
            </CardSection>

          </View>

        </Image>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
