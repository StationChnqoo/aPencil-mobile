import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {}

const Score: React.FC<MyProps> = props => {
  const {} = props;
  const {theme} = useCaches();
  return (
    <View style={styles.view}>
      <View style={x.Styles.rowCenter()}>
        <Text style={styles.name}>我的成绩</Text>
        <TouchableOpacity activeOpacity={x.Touchable.OPACITY}>
          <Image
            source={require('@root/assets/common/arrow_right.png')}
            style={{height: x.scale(16), width: x.scale(16), tintColor: '#666'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{height: 10}} />
      <View style={x.Styles.rowCenter()}>
        <Text style={styles.title}>全网排名</Text>
        <Text style={styles.message}>1 / 20000</Text>
      </View>
      <View style={{height: 10}} />
      <View style={x.Styles.rowCenter()}>
        <Text style={styles.title}>最快成绩</Text>
        <Text style={styles.message}>12分36秒 2024-08-25</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 12,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  name: {
    fontSize: x.scale(16),
    color: '#333',
    fontWeight: '500',
  },
  title: {
    fontSize: x.scale(14),
    color: '#333',
  },
  message: {
    fontSize: x.scale(14),
    color: '#666',
  },
});

export default Score;
