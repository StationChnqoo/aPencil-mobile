import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MyProps {
  children: React.ReactNode;
  isAvoidBottomSpace?: boolean;
}

const SafeArea: React.FC<MyProps> = props => {
  const {children, isAvoidBottomSpace} = props;
  const STATUS_BAR_HEIGHT = Platform.select({
    android: StatusBar.currentHeight,
    ios: useSafeAreaInsets().top,
  });
  const BOTTOM_SPACE_HEIGHT = useSafeAreaInsets().bottom;

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: STATUS_BAR_HEIGHT,
          backgroundColor: '#fff',
          width: '100%',
        }}
      />
      {children}
      {isAvoidBottomSpace ? (
        <View
          style={{
            height: BOTTOM_SPACE_HEIGHT,
            width: '100%',
            backgroundColor: '#fff',
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default SafeArea;
