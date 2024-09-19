import x from '@src/constants/x';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Setting from '../Setting';
import {useCaches} from '@src/stores';
import JPText from '@src/components/JPText';

interface MyProps {}

const modes = [
  {title: '本地模式', message: '稳定、功能简单、数据缓存在本地'},
  {title: '远程模式', message: '不稳定、功能丰富、预览服务搭建在国外'},
];

const Pdf: React.FC<MyProps> = props => {
  const {font, setPdfMode, pdfMode, theme} = useCaches();
  return (
    <Setting title={'Pdf预览'}>
      <View style={{}}>
        {modes.map((it, i) => (
          <TouchableOpacity
            key={i}
            style={{marginTop: 6}}
            activeOpacity={x.Touchable.OPACITY}
            onPress={() => setPdfMode(i)}>
            <Text style={styles.title}>{it.title}</Text>
            <View style={x.Styles.rowCenter('space-between')}>
              <Text key={`${i}`} style={[styles.message]}>
                {it.message}
              </Text>
              <View style={{width: 12}} />
              <Image
                source={
                  i == pdfMode
                    ? require('@root/assets/common/radio_checked.png')
                    : require('@root/assets/common/radio_unchecked.png')
                }
                style={{
                  height: x.scale(20),
                  width: x.scale(20),
                  tintColor: i == pdfMode ? theme : '#999',
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

export default Pdf;
