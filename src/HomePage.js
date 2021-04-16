import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  BackHandler,
} from 'react-native';

import {connect} from 'react-redux';
import {sign_out} from './actions/user';
import {StackActions, NavigationActions} from 'react-navigation';
import {Button, GooglePlayButton} from '@freakycoder/react-native-button';

class HomePage extends React.Component {
  constructor(navigation) {
    super(navigation);
    this.state = {
      name: '',
      pass: '',
    };

    this.signOutUser = this.signOutUser.bind(this);
  }

  signOutUser = () => {
    this.props.navigation.navigate('Home');

    this.props.sign_out();
  };

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    return true;
  };

  render() {
    return (
      <ScrollView style={[styles.base_container]}>
        <View style={[styles.container]}>
          <Text style={{fontSize: 28, color: 'black', fontWeight: 'bold'}}>
            Welcome back, {this.props.signedInUser.name}!
          </Text>

          <View style={{margin: 8}} />
          <Text style={{fontSize: 14, color: 'grey'}}>
            Your Email: {this.props.signedInUser.email}
          </Text>

          <View style={{margin: 2}} />
          <Text style={{fontSize: 14, color: 'grey'}}>
            Your Pass: {this.props.signedInUser.pass}
          </Text>

          <View
            style={{
              marginTop: 64,
              alignContent: 'center',
              padding: 14,
              alignContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <Button
                gradient
                text="Sign Out"
                iconDisable
                textStyle={{color: '#fff'}}
                shadowColor="#ff738b"
                onPress={() => this.signOutUser()}
              />
            </View>
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
});

const mapStateToProps = state => {
  return {
    users: state.userReducer.userList,
    signedInUser: state.userReducer.signedInUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sign_out: user => dispatch(sign_out(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
