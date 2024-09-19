import x from '@src/constants/x';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import Pdf from 'react-native-pdf';

interface MyProps {
  src: string;
}

const Pdfer: React.FC<MyProps> = props => {
  const {src} = props;

  return (
    <View style={styles.view}>
      {/* <Pdf source={{uri: src, cache: false}} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1},
});

export default Pdfer;
