import Button from '@src/components/Button';
import JPText from '@src/components/JPText';
import {Course} from '@src/constants/Types';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

interface MyProps {
  onPdfPreviewPress: () => void;
  course: Course;
}

const Cover: React.FC<MyProps> = props => {
  const {onPdfPreviewPress, course} = props;
  const {theme} = useCaches();

  // console.log('Controller playing: ', playing);
  return (
    <View style={[styles.view]}>
      <FastImage
        resizeMode={'cover'}
        source={{uri: course.thumbnails}}
        style={{
          width: x.WIDTH - 24,
          height: (x.WIDTH - 24) / 2.5,
          borderRadius: 12,
        }}
      />
      <View style={styles.viewCover}>
        <View>
          <Text style={styles.title}>{course.title}</Text>
          <View style={{height: 5}} />
          <JPText style={styles.message}>{course.message.jp}</JPText>
          <View style={{height: 5}} />
          <Text style={styles.message}>{course.message.cn}</Text>
        </View>
        <View style={x.Styles.rowCenter('flex-end')}>
          <Button
            title={'阅读教材'}
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 12,
              borderRadius: 12,
              paddingVertical: 6,
            }}
            textStyle={{color: '#333', fontSize: x.scale(14)}}
            onPress={onPdfPreviewPress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    borderRadius: 32,
    position: 'relative',
    width: x.WIDTH - 24,
    height: (x.WIDTH - 24) / 2.5,
  },
  viewCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: x.scale(16),
    color: '#fff',
    fontWeight: '500',
  },
  message: {
    fontSize: x.scale(14),
    color: '#fff',
    fontWeight: '500',
  },
});

export default Cover;
