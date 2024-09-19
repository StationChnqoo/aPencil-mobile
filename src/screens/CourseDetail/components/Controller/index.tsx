import Slider from '@react-native-community/slider';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  duration: number;
  onPlayPress: () => void;
  onSeek: (n: number) => void;
  progress: number;
  playing: boolean;
  downloading: boolean;
}

const Controller: React.FC<MyProps> = props => {
  const {duration, onPlayPress, progress, onSeek, playing, downloading} = props;
  const {theme} = useCaches();

  // console.log('Controller playing: ', playing);
  return (
    <View style={[styles.view, x.Styles.CARD]}>
      <View style={[x.Styles.rowCenter('space-between')]}>
        <View style={{flex: 1}}>
          <Slider
            // style={{width: 200, height: 40}}
            disabled={duration == 0 || downloading}
            style={{margin: 0, padding: 0}}
            minimumValue={0}
            value={progress}
            maximumValue={duration}
            minimumTrackTintColor="#999"
            maximumTrackTintColor={theme}
            onSlidingComplete={onSeek}
            thumbTintColor={theme}
          />
        </View>
        <View style={[x.Styles.rowCenter('center'), {width: x.scale(90)}]}>
          <Text style={{fontSize: x.scale(12), color: '#333'}}>
            {`${
              downloading
                ? `正在缓存 ${
                    duration == 0 ? 0 : Math.floor((progress / duration) * 100)
                  }%`
                : `${x.Time.HHmmss(progress)} / ${x.Time.HHmmss(duration)}`
            }`}
          </Text>
        </View>
        <View style={{width: 12}} />
        <TouchableOpacity
          disabled={duration == 0 || downloading}
          activeOpacity={x.Touchable.OPACITY}
          onPress={onPlayPress}>
          <Image
            key={`${playing}`}
            source={
              playing
                ? require('@root/assets/play/pause.png')
                : require('@root/assets/play/start.png')
            }
            style={{
              height: x.scale(24),
              width: x.scale(24),
              tintColor: duration == 0 || downloading ? '#ccc' : theme,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 32,
    justifyContent: 'center',
    height: x.scale(44),
  },
});

export default Controller;
