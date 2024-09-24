import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import x from '@src/constants/x';

interface MyProps {
  onSearchPress: () => void;
  onFilterPress: () => void;
  filters: any[];
}

const SearchBar: React.FC<MyProps> = props => {
  const {onSearchPress, onFilterPress, filters} = props;
  const color = filters.length == 0 ? '#333' : x.Color.BLUE;

  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={{flexDirection: 'row', flex: 1}}
        activeOpacity={x.Touchable.OPACITY}
        onPress={onSearchPress}>
        <View
          style={styles.textInput}
          // value={text}
          // onChangeText={onChange}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('./assets/zoom.png')}
              style={{
                height: x.scale(18),
                width: x.scale(18),
                tintColor: '#999',
              }}
            />
            <View style={{width: 4}} />
            <Text style={styles.textHint}>请输入关键字搜索</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.viewLine} />
            <Text style={styles.textHint}>搜索</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{width: 12}} />
      <TouchableOpacity
        onPress={onFilterPress}
        style={{flexDirection: 'row', alignItems: 'baseline'}}
        activeOpacity={x.Touchable.OPACITY}>
        <Text
          style={{
            fontSize: x.scale(14),
            color,
          }}>
          筛选
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          {filters.length > 0 ? (
            <Text
              style={{
                fontSize: x.scale(12),
                color,
              }}>
              {filters.length}
            </Text>
          ) : null}

          <Image
            source={require('@root/assets/common/arrow_bottom_right.png')}
            style={{
              height: x.scale(6),
              width: x.scale(6),
              marginLeft: 2,
              tintColor: color,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: x.scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    fontSize: x.scale(16),
    borderWidth: 1,
    borderRadius: x.scale(10),
    // paddingVertical: Platform.select({android: 1, ios: 4}),
    // paddingVertical: 0,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    borderColor: '#eee',
    height: x.scale(36),
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textHint: {
    fontSize: x.scale(16),
    color: '#999',
  },
  viewLine: {
    width: 1,
    backgroundColor: '#ccc',
    height: x.scale(24),
    marginHorizontal: 12,
  },
});

export default SearchBar;
