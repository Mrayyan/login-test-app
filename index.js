/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import Splash from './src/splash';
import {PersistGate} from 'redux-persist/integration/react';

const {store, persistor} = configureStore();

class ReduxLoginInApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 1000);
  }

  setTimePassed() {
    this.setState({timePassed: true});
  }

  render() {
    if (!this.state.timePassed) {
      return <Splash />;
    } else {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      );
    }
  }
}

AppRegistry.registerComponent(appName, () => ReduxLoginInApp);
