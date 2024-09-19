import Button from '@src/components/Button';
import {useCaches} from '@src/stores';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  onClosePress: () => void;
}

const SuggestTips: React.FC<MyProps> = props => {
  const {onClosePress} = props;
  const {theme} = useCaches();
  return (
    <View style={styles.view}>
      <TouchableOpacity
        activeOpacity={0.9}
        hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
        onPress={onClosePress}>
        <Image
          source={require('@root/assets/common/close.png')}
          style={styles.imageClose}
        />
      </TouchableOpacity>
      <View style={{width: 8}} />
      <Image
        source={require('../../assets/suggest.png')}
        style={styles.imageIcon}
      />
      <View style={{width: 8}} />
      <Text style={styles.text}>您对日语通还满意吗😊？</Text>
      <Button
        title={'去评价'}
        onPress={() => {}}
        style={[styles.viewButton, {borderColor: theme}]}
        textStyle={{color: theme}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  imageIcon: {
    height: 24,
    width: 24,
  },
  imageClose: {
    height: 10,
    width: 10,
    tintColor: '#666',
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  viewButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
});

export default SuggestTips;
