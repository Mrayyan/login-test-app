import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';

import {connect} from 'react-redux';
import {log_in} from './actions/user';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import {Button, GooglePlayButton} from '@freakycoder/react-native-button';

class LogIn extends React.Component {
  constructor(navigation) {
    super(navigation);
    this.state = {
      email: '',
      pass: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.openSignUpScreen = this.openSignUpScreen.bind(this);
    this.openHomeScreen = this.openHomeScreen.bind(this);
  }

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

  logInUser = () => {
    const userEmail = this.state.email;
    const userPass = this.state.pass;

    var allUsersList = this.props.users;
    var allUsersCount = allUsersList.length;

    if (userEmail.length == 0 || userPass.length == 0) {
      Alert.alert(
        'Invalid inputs',
        'Please re-confirm your email/password and try again',
      );
    } else {
      var foundUser = false;

      for (let i = 0; i < allUsersCount; i++) {
        var currentUser = allUsersList[i];
        var currentUserEmail = currentUser.email;
        var currentUserPass = currentUser.pass;
        var currentUserName = currentUser.name;

        if (
          currentUserEmail.match(userEmail) &&
          currentUserPass.match(userPass)
        ) {
          foundUser = true;
          this.props.sign_in({
            name: currentUserName,
            email: currentUserEmail,
            pass: currentUserPass,
          });

          this.openHomeScreen();
        }
      }
      if (!foundUser) {
        Alert.alert(
          'Account not found',
          'Please re-confirm your email/password or create an account.',
        );
      }
    }
  };

  openSignUpScreen = () => {
    this.props.navigation.navigate('SignUp');
  };

  openHomeScreen = () => {
    this.props.navigation.navigate('WelcomePage');
  };

  render() {
    return (
      <ScrollView style={[styles.base_container]}>
        <View style={[styles.container]}>
          <Text style={{fontSize: 28, color: 'black', fontWeight: 'bold'}}>
            Login
          </Text>

          <View style={{margin: 2}} />
          <Text style={{fontSize: 14, color: 'grey'}}>
            Please sign in to continue
          </Text>

          <View style={{margin: 12}} />

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

          <View style={{margin: 24}} />

          <View style={{alignItems: 'flex-end'}}>
            <Button
              gradient
              text="Login"
              iconDisable
              textStyle={{color: '#fff'}}
              shadowColor="#ff738b"
              onPress={() => this.logInUser()}
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
              Don't have an account?
            </Text>
            <Text
              style={{fontSize: 14, color: '#ff738b'}}
              onPress={() => this.openSignUpScreen()}>
              Sign up
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
    signedInUser: state.userReducer.signedInUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sign_in: user => dispatch(log_in(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
