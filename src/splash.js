import React from 'react';
import {Text, View, Image} from 'react-native';

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('./assets/logo.png')} />
    </View>
  );
};
export default Splash;
