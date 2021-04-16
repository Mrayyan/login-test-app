import React from 'react';
import {View, Text, Button, Icon, BlurView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LogIn from './src/loginpage';
import SignUp from './src/signup';
import HomePage from './src/HomePage';
import store from './src/store';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

const App = ({signedInUser}) => {
  if (signedInUser.name.length == 0) {
    //User is not signed in
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={LogIn}
          />
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerTitle: '',
            }}
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerShown: false,
              headerLeft: null,
            }}
            name="WelcomePage"
            component={HomePage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    //User is signed in, open welcome page
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerShown: false,
              headerLeft: null,
            }}
            name="WelcomePage"
            component={HomePage}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={LogIn}
          />
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerTitle: '',
            }}
            name="SignUp"
            component={SignUp}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const mapStateToProps = state => {
  return {
    signedInUser: state.userReducer.signedInUser,
  };
};

export default connect(mapStateToProps)(App);
