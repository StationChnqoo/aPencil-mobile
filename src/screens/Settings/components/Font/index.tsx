import x from '@src/constants/x';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Setting from '../Setting';
import {useCaches} from '@src/stores';
import JPText from '@src/components/JPText';

interface MyProps {}

const fonts = [
  {label: '印刷体', value: x.Fonts.NotoSansJP},
  {label: '手写体', value: x.Fonts.NotoSerifJP},
];

const Font: React.FC<MyProps> = props => {
  const {font, setFont, theme} = useCaches();
  return (
    <Setting title={'字体'}>
      <View style={{}}>
        {fonts.map((it, i) => (
          <TouchableOpacity
            key={i}
            style={{marginTop: 6}}
            activeOpacity={x.Touchable.OPACITY}
            onPress={() => setFont(it.value)}>
            <Text style={styles.title}>{it.label}</Text>
            <View style={x.Styles.rowCenter('space-between')}>
              <JPText
                key={`${i}`}
                style={[
                  styles.message,
                  {
                    fontFamily: it.value,
                    color: font == it.value ? theme : '#666',
                  },
                ]}>
                日本國民は、正義と秩序を基調とする國際平和を誠實に希求し、國權の發動たる戰爭と、武力による威嚇又は武力の行使は、國際紛爭を解決する手段としては、永久にこれを放棄する
              </JPText>
              <View style={{width: 12}} />
              <Image
                source={
                  font == it.value
                    ? require('@root/assets/common/radio_checked.png')
                    : require('@root/assets/common/radio_unchecked.png')
                }
                style={{
                  height: x.scale(20),
                  width: x.scale(20),
                  tintColor: font == it.value ? theme : '#999',
                }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Setting>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: x.scale(16),
    color: '#333',
    fontWeight: '500',
  },
  message: {
    fontSize: x.scale(12),
    color: '#666',
    flex: 1,
  },
});

export default Font;
