import React, { Component } from 'react';
import { Text,
         View,
         Image,
         StatusBar,
         Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { emailChanged,
         passwordChanged,
         loginUser,
         loginUserViaFacebook } from '../actions';
import { CardSection,
         Spinner,
         Input } from './common';
import ButtonLogin from './ButtonLogin';
import FacebookLoginButton from './FacebookLoginButton';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.3);
  }

  componentDidMount() {
     this.spring();
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


  spring() {
    this.springValue.setValue(0.8);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1
      }
    ).start();
  }

  /*
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <ButtonLogin onPress={this.onButtonPress}>
        ENTRAR
      </ButtonLogin>
    );
  }
  */

  renderButton = () => (
    this.props.loading ?
      <Spinner size="large" /> :
      <ButtonLogin onPress={this.onButtonPress}>
        ENTRAR
      </ButtonLogin>
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

    return (
      <View style={containerStyle}>
          <StatusBar
             backgroundColor="black"
          />
          <Image source={require('../images/login-bg.jpg')} style={backgroundImageStyle}>

          <View style={containerLogoStyle}>
            <Animated.Image
              style={{ backgroundColor: 'transparent', alignSelf: 'center', transform: [{ scale: this.springValue }] }}
              source={require('../images/logo.png')}
            />
          </View>

          <View style={loginFormContainerStyle}>
            <CardSection>
              <Input
                placeholder="Usuário"
                onChangeText={this.onEmailChange}
                value={email}
              />
            </CardSection>

            <CardSection>
              <Input
                secureTextEntry
                placeholder="Senha"
                onChangeText={this.onPasswordChange}
                value={password}
              />
            </CardSection>

            <Text style={errorTextStyle}>
              {error}
            </Text>

            <CardSection>
              {this.renderButton()}
            </CardSection>

            <CardSection style={{ paddingTop: 10 }}>
              <FacebookLoginButton onPress={actions.loginUserViaFacebook}/>
            </CardSection>

          </View>

        </Image>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    backgroundColor: 'transparent'
  },
  containerStyle: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  containerLogoStyle: {
    flex: 3,
    backgroundColor: 'transparent',
    marginTop: 25
  },
  backgroundImageStyle: {
    flex: 1,
    width: null,
    height: null
  },
  loginFormContainerStyle: {
    flex: 5,
    backgroundColor: 'transparent',
    alignItems: 'center'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    emailChanged,
    passwordChanged,
    loginUser,
    loginUserViaFacebook
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
