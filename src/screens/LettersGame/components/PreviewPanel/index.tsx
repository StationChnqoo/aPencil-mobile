import JPText from '@src/components/JPText';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const SPACE = [36, 38, 46, 48];

interface MyProps {
  playing: boolean;
  letters: string[];
  index: number;
  onPress: (i: number) => void;
}

const PreviewPanel: React.FC<MyProps> = props => {
  const {playing, letters, index, onPress} = props;
  const {theme, font} = useCaches();

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flex: 6,
      }}>
      {letters.map((it, i) => (
        <TouchableOpacity
          disabled={SPACE.includes(i)}
          activeOpacity={x.Touchable.OPACITY}
          key={i}
          style={[
            styles.letterSmall,
            index == i ? {backgroundColor: theme} : {},
            SPACE.includes(i) ? {backgroundColor: '#ccc'} : {},
          ]}
          onPress={() => {
            onPress(i);
          }}>
          <JPText
            style={{
              fontSize: x.scale(16),
              color: index == i ? 'white' : '#333',
            }}>
            {it}
          </JPText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  playText: {
    fontSize: x.scale(14),
    color: '#fff',
    fontWeight: '500',
  },
  playButton: {
    paddingHorizontal: 16,
    borderRadius: 5,
    height: x.scale(32),
  },
  title: {
    fontSize: x.scale(14),
    color: '#333',
  },
  message: {
    fontSize: x.scale(14),
    color: '#666',
  },
  letterBig: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#eee',
    height: ((x.WIDTH - 24 * 3) * 0.6) / 5 - 2,
    width: ((x.WIDTH - 24 * 3) * 0.6) / 5 - 2,
    marginVertical: 2,
    justifyContent: 'center',
  },
  letterSmall: {
    alignItems: 'center',
    width: ((x.WIDTH - 24 * 3) * 0.4) / 5 - 2,
    height: ((x.WIDTH - 24 * 3) * 0.4) / 5 - 2,
    borderWidth: 1,
    marginVertical: 2,
    borderColor: '#999',
    borderRadius: 4,
    justifyContent: 'center',
  },
});

export default PreviewPanel;
