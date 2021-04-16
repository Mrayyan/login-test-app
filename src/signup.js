import React, {useState, Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {add_user} from './actions/user';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import {Button, GooglePlayButton} from '@freakycoder/react-native-button';

class SignUp extends React.Component {
  constructor(navigation) {
    super(navigation);
    this.state = {
      name: '',
      email: '',
      pass: '',
      cPass: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handlecPassChange = this.handlecPassChange.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.openLogInScreen = this.openLogInScreen.bind(this);
  }

  handleNameChange = inputValue => {
    this.setState(state => ({
      ...state,
      name: inputValue,
    }));
  };

  handleEmailChange = inputValue => {
    this.setState(state => ({
      ...state,
      email: inputValue,
    }));
  };

  handlePassChange = inputValue => {
    this.setState(state => ({
      ...state,
      pass: inputValue,
    }));
  };

  handlecPassChange = inputValue => {
    this.setState(state => ({
      ...state,
      cPass: inputValue,
    }));
  };

  openLogInScreen = () => {
    this.props.navigation.goBack(null);
  };

  signUpUser = () => {
    const currentUserName = this.state.name;
    const currentUserEmail = this.state.email;
    const currentUserPass = this.state.pass;
    const currentUserCPass = this.state.cPass;

    if (
      currentUserName.length != 0 &&
      currentUserEmail.length != 0 &&
      currentUserPass.length != 0 &&
      currentUserCPass.length != 0
    ) {
      if (currentUserPass.match(currentUserCPass)) {
        this.props.add({
          name: this.state.name,
          email: this.state.email,
          pass: this.state.pass,
        });

        Alert.alert('Account Created', 'Please log in with your new account', [
          {text: 'Log in', onPress: () => this.openLogInScreen()},
        ]);
      } else {
        Alert.alert(
          'Passwords do not match',
          'Please re-confirm your password and try again',
        );
      }
    } else {
      Alert.alert(
        'Error occurred',
        'Please check all of your inputs and try again.',
      );
    }
  };

  render() {
    return (
      <ScrollView style={[styles.base_container]}>
        <View style={[styles.container]}>
          <Text style={{fontSize: 24, color: 'black', fontWeight: 'bold'}}>
            Create Account
          </Text>

          <View style={{margin: 8}} />
          <Fumi
            label={'Full Name'}
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            iconColor={'#ff738b'}
            iconSize={16}
            iconWidth={40}
            style={[styles.input_style]}
            inputPadding={16}
            onChangeText={this.handleNameChange}
          />
          <View style={{margin: 2}} />
          <Fumi
            label={'Email'}
            iconClass={FontAwesomeIcon}
            iconName={'envelope'}
            iconColor={'#ff738b'}
            iconSize={16}
            iconWidth={40}
            style={[styles.input_style]}
            inputPadding={16}
            onChangeText={this.handleEmailChange}
          />

          <View style={{margin: 2}} />
          <Fumi
            label={'Password'}
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            iconColor={'#ff738b'}
            iconSize={16}
            iconWidth={40}
            style={[styles.input_style]}
            inputPadding={16}
            onChangeText={this.handlePassChange}
          />

          <View style={{margin: 2}} />
          <Fumi
            label={'Confirm Password'}
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            iconColor={'#ff738b'}
            iconSize={16}
            iconWidth={40}
            style={[styles.input_style]}
            inputPadding={16}
            onChangeText={this.handlecPassChange}
          />

          <View style={{margin: 10}} />

          <View style={{alignItems: 'flex-end'}}>
            <Button
              gradient
              text="Sign Up"
              iconDisable
              textStyle={{color: '#fff'}}
              shadowColor="#ff738b"
              onPress={() => this.signUpUser()}
            />
          </View>

          <View style={{margin: 8}} />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 14, color: 'grey', marginEnd: 4}}>
              Already have an account?
            </Text>
            <Text
              style={{fontSize: 14, color: '#ff738b'}}
              onPress={() => this.props.navigation.goBack(null)}>
              Log in
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  base_container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
    marginTop: 64,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  input_style: {
    backgroundColor: '#fafafa',
    borderColor: 'black',
  },
});

const mapStateToProps = state => {
  return {
    users: state.userReducer.userList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: user => dispatch(add_user(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
