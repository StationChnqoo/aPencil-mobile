import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import SafeArea from '@src/components/SafeArea';
import {RootStacksProp} from '..';
import Banner from './components/Banner';
import HomeLetters from './components/Letters';
import SuggestTips from './components/SuggestTips';

interface MyProps {
  navigation?: RootStacksProp;
}

const Home: React.FC<MyProps> = props => {
  const {navigation} = props;
  return (
    <SafeArea>
      <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
        {/* <Toolbar onSearchPress={() => {}} onMessagePress={() => {}} /> */}
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{height: 12}} />
          {[
            <Banner />,
            <HomeLetters navigation={navigation} />,
            <SuggestTips onClosePress={() => {}} />,
          ].map((it, i) => (
            <View key={i} style={{marginBottom: 12}}>
              {it}
            </View>
          ))}
        </ScrollView>
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

export default Home;
