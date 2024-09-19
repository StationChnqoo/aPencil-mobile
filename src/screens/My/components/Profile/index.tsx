import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

interface MyProps {
  onPress: (s: string) => void;
}

const Profile: React.FC<MyProps> = props => {
  const {onPress} = props;
  const menus = [
    {icon: require('../../assets/service.png'), name: '客服', value: 'service'},
    {icon: require('../../assets/setting.png'), name: '设置', value: 'settings'},
  ];
  const {theme} = useCaches();
  return (
    <View style={styles.view}>
      <View style={[x.Styles.rowCenter()]}>
        <View style={{position: 'relative'}}>
          <FastImage
            source={{uri: 'https://blog.cctv3.net/i.jpg'}}
            style={{
              height: x.scale(48),
              width: x.scale(48),
              borderRadius: x.scale(24),
            }}
          />
          {/* <Image
            source={require('../assets/id.png')}
            style={[styles.imageId, {tintColor: 'orange'}]}
          /> */}
        </View>

        <View style={{width: 12}} />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            height: x.scale(48),
            paddingVertical: 4,
          }}>
          <View>
            <View style={x.Styles.rowCenter('flex-start')}>
              <Text style={styles.name}>陈桥驿站</Text>
              <View style={{width: 4}} />
              <Image
                source={require('../../assets/id.png')}
                style={[styles.imageId, {tintColor: '#fbca26'}]}
              />
            </View>
          </View>
          <TouchableOpacity
            style={x.Styles.rowCenter('flex-start')}
            activeOpacity={x.Touchable.OPACITY}
            onPress={() => {}}>
            <Text style={{color: '#999', fontSize: x.scale(12)}}>
              查看个人主页
            </Text>
            <Image
              source={require('@root/assets/common/arrow_right.png')}
              style={{
                height: x.scale(12),
                width: x.scale(12),
                tintColor: '#999',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={x.Styles.rowCenter()}>
          {menus.map((it, i) => (
            <TouchableOpacity
              onPress={() => {
                onPress(it.value);
              }}
              key={i}
              style={{marginLeft: 12}}
              activeOpacity={x.Touchable.OPACITY}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={it.icon}
                  style={{
                    height: x.scale(24),
                    width: x.scale(24),
                    tintColor: theme,
                  }}
                />
                <View style={{height: 6}} />
                <Text style={{fontSize: x.scale(10), color: theme}}>
                  {it.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 12,
    marginHorizontal: 12,
    backgroundColor: 'white',
    padding: 12,
  },
  name: {
    fontWeight: '500',
    color: '#333',
    fontSize: x.scale(16),
  },
  statusTag: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  imageId: {
    height: x.scale(16),
    width: x.scale(16),
  },
});

export default Profile;
