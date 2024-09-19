import React, {createContext, useEffect} from 'react';
import {AppRegistry, Platform, StatusBar, View} from 'react-native';
import {name as appName} from './app.json';
import Screens from './src/screens';
import {useCaches} from './src/stores';

const StoreContext = createContext();

const aPencil = () => {
  useEffect(() => {
    console.log(`StatusBar height: ${Platform.OS} ${StatusBar.currentHeight}`);
  }, []);

  return (
    <StoreContext.Provider value={useCaches}>
      <View style={{flex: 1}}>
        {/* <StatusBar
          translucent={true}
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
        /> */}
        <View style={{flex: 1, position: 'relative'}}>
          <Screens />
        </View>
      </View>
    </StoreContext.Provider>
  );
};

AppRegistry.registerComponent(appName, () => aPencil);
