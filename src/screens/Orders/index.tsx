import React, {useState} from 'react';
import {FlatList, Platform, StatusBar, StyleSheet, View} from 'react-native';

import MarketItem from '@src/components/MarketItem';
import {RootStacksProp} from '..';
import Tabs from './components/Tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SafeArea from '@src/components/SafeArea';

interface MyProps {
  navigation?: RootStacksProp;
}

const OrdersScreen: React.FC<MyProps> = props => {
  const [tab, setTab] = useState(0);
  return (
    <SafeArea>
      <View style={{flex: 1}}>
        <Tabs index={tab} onTabPress={setTab} />
        <FlatList
          data={Array.from({length: 10}, _ => `${_}`)}
          renderItem={info => <MarketItem />}
        />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default OrdersScreen;
