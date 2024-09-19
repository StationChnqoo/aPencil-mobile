import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  onSearchPress: () => void;
  onMessagePress: () => void;
}

const Toolbar: React.FC<MyProps> = props => {
  const {onSearchPress, onMessagePress} = props;
  const {theme} = useCaches();
  return (
    <View style={[styles.view, x.Styles.CARD]}>
      <View style={styles.viewMain}>
        <Image
          source={require('../assets/location.png')}
          style={{height: x.scale(20), width: x.scale(20), tintColor: theme}}
        />
        <View style={{width: 10}} />
        <View style={{flex: 1}}>
          <Text style={{color: '#666', fontSize: x.scale(12)}}>
            广东省深圳市
          </Text>
          <View style={{height: 4}} />
          <Text
            style={{color: '#333', fontSize: x.scale(14), fontWeight: '500'}}
            numberOfLines={1}
            ellipsizeMode={'middle'}>
            坂田街道坂雪岗大道方向
          </Text>
        </View>
      </View>
      <View style={{width: 12}} />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={x.Touchable.OPACITY}
          onPress={onSearchPress}>
          <Image
            source={require('../assets/search.png')}
            style={{height: x.scale(18), width: x.scale(18), tintColor: theme}}
          />
        </TouchableOpacity>
        <View style={{width: 12}} />
        <TouchableOpacity
          activeOpacity={x.Touchable.OPACITY}
          onPress={onSearchPress}>
          <Image
            source={require('../assets/message.png')}
            style={{height: x.scale(18), width: x.scale(18), tintColor: theme}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  viewMain: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
});

export default Toolbar;
