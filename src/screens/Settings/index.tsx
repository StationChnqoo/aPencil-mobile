import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import SafeArea from '@src/components/SafeArea';
import ToolBar from '@src/components/ToolBar';
import {RootStacksProp} from '..';
import About from './components/About';
import Color from './components/Color';
import Font from './components/Font';
import Pdf from './components/Pdf';

interface MyProps {
  navigation?: RootStacksProp;
}

const Settings: React.FC<MyProps> = props => {
  const [tab, setTab] = useState(0);
  const {navigation} = props;

  return (
    <SafeArea isAvoidBottomSpace={true}>
      <ToolBar
        title={'设置'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{flex: 1}}>
          <Font />
          <Color />
          <Pdf />
          <About />
        </View>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default Settings;
