import React, { Component } from 'react';
import { Text, View, Image, StatusBar, Animated } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { CardSection, Spinner, Input } from './common';
import ButtonLogin from './ButtonLogin';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.3);
  }

  componentDidMount() {
     this.spring();
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
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

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <ButtonLogin onPress={this.onButtonPress.bind(this)}>
        ENTRAR
      </ButtonLogin>
    );
  }


  render() {
    const { errorTextStyle,
            containerStyle,
            backgroundImageStyle,
            loginFormContainerStyle,
            containerLogoStyle } = styles;

    const facebookLogin = (
          <Icon.Button name="facebook" backgroundColor="#3b5998">
            <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white' }}>Login with Facebook</Text>
          </Icon.Button>
        );

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
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </CardSection>

            <CardSection>
              <Input
                secureTextEntry
                placeholder="Senha"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </CardSection>

            <Text style={errorTextStyle}>
              {this.props.error}
            </Text>

            <CardSection>
              {this.renderButton()}
            </CardSection>

            <CardSection style={{ paddingTop: 10 }}>
              {facebookLogin}
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

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
