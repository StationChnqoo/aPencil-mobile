import React, {useEffect} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import JPText from '@src/components/JPText';
import {Course} from '@src/constants/Types';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';

interface MyProps {
  navigation?: RootStacksProp;
}

const Words: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {theme, font, courses, words} = useCaches();

  useEffect(() => {
    console.log('Words: ', words.length);
    return function () {};
  }, []);
  const renderItem = (info: ListRenderItemInfo<Course>) => {
    const {index, item} = info;
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={x.Touchable.OPACITY}
        onPress={() => {
          navigation.navigate('CourseDetail', {course: item});
        }}>
        <View style={[x.Styles.rowCenter('space-between')]}>
          <Text
            style={{fontSize: x.scale(16), fontWeight: '500', color: '#333'}}>
            {item.title}
          </Text>
          <Text style={{fontSize: x.scale(16), color: theme}}>#{item.id}</Text>
        </View>
        <View style={{height: 10}} />
        <View style={{flexDirection: 'row'}}>
          <FastImage
            style={{width: x.scale(120), height: x.scale(80), borderRadius: 4}}
            source={{uri: item.thumbnails}}
          />
          <View style={{width: 10}} />
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
              <JPText style={{}}>{item.message.jp}</JPText>
              <View style={{height: 4}} />
              <Text style={{color: '#666', fontSize: x.scale(12)}}>
                {item.message.cn}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={{color: '#333', fontSize: x.scale(14)}}>
                {item.words.length}个单词
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <FlatList
        data={courses}
        initialNumToRender={10}
        keyExtractor={(item, index) => `${item.id}: ${index}`}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        ListHeaderComponent={() => <View style={{height: 12}} />}
        ListFooterComponent={() => <View style={{height: 12}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 12,
  },
});

export default Words;
