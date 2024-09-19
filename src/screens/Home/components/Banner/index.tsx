import x from '@src/constants/x';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {}

const Banner: React.FC<MyProps> = props => {
  const {} = props;
  return (
    <View style={styles.view}>
      <Image
        source={require('../../assets/demoBanner.jpg')}
        style={[x.Styles.FILL, styles.imageBG]}
        resizeMode={'stretch'}
      />
      <View style={[x.Styles.FILL, styles.viewMain]}>
        <View>
          <Text style={styles.textTitle}>学日语的大旗谁来扛</Text>
          <View style={{height: 10}} />
          <Text style={styles.textMessage}>重新定义货运布局，认准货趴窝</Text>
        </View>
        <View style={x.Styles.rowCenter()}>
          <View style={[styles.button, {paddingHorizontal: 12}]}>
            <Text style={styles.textButton}>1024人参与</Text>
          </View>
          <TouchableOpacity
            style={[styles.button, {width: x.scale(32)}]}
            activeOpacity={x.Touchable.OPACITY}
            onPress={() => {}}>
            <Image
              source={require('../../assets/more.png')}
              style={{
                height: x.scale(14),
                width: x.scale(14),
                tintColor: '#ff',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 12,
    marginHorizontal: 12,
    position: 'relative',
    height: x.WIDTH / 2.5,
  },
  imageBG: {
    borderRadius: 12,
  },
  viewMain: {
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
    padding: 16,
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: x.scale(16),
    fontWeight: '500',
    color: 'white',
  },
  textMessage: {
    fontSize: x.scale(12),
    fontWeight: 'medium',
    color: 'white',
  },
  button: {
    height: x.scale(32),
    borderRadius: x.scale(16),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: x.scale(14),
    color: '#333',
  },
});

export default Banner;
