import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import Profile from './components/Profile';

interface MyProps {
  navigation?: RootStacksProp;
}

const My: React.FC<MyProps> = props => {
  const {navigation} = props;
  useEffect(() => {
    return function () {};
  }, []);

  const onProfilePress = (s: string) => {
    switch (s) {
      case 'settings':
        navigation.navigate('Settings');
        break;
      default:
        break;
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <ScrollView>
        <View style={{height: 12}} />
        {[<Profile onPress={onProfilePress} />].map((it, i) => (
          <View key={i} style={{marginBottom: 12}}>
            {it}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default My;
