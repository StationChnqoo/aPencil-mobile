import JPText from '@src/components/JPText';
import {Letter} from '@src/constants/Types';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  playing: boolean;
  onPress: (lettter: Letter) => void;
  letterChars: string[];
  letters: Letter[];
}

const ClickPanel: React.FC<MyProps> = props => {
  const {playing, onPress, letters} = props;
  const {theme, font} = useCaches();
  const [myLetters, setMyLetters] = useState<Letter[]>([]);

  useEffect(() => {
    const lettersFormatter = (letters: any[]) => {
      let _letters = [...letters];
      let space = [36, 38, 46, 48];
      for (let i = 0; i < space.length; i++) {
        _letters.splice(space[i], 0, null);
      }
      return _letters;
    };
    if (playing) {
      if (myLetters.length == 0) {
        setMyLetters(
          lettersFormatter([...letters].sort(() => Math.random() - 0.5)),
        );
      }
    } else {
      setMyLetters([]);
    }
    return function () {};
  }, [playing, letters]);
  return (
    <View style={styles.view}>
      <Text style={{fontSize: x.scale(16), color: '#333'}}>请选择</Text>
      <View style={{height: 5}} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {myLetters.map((it, i) => (
          <TouchableOpacity
            disabled={it ? it?.checked : true}
            activeOpacity={x.Touchable.OPACITY}
            key={i}
            style={styles.letterBig}
            onPress={() => onPress(it)}>
            {it ? (
              <JPText
                style={{
                  fontSize: x.scale(20),
                  color: it.checked ? '#ccc' : '#333',
                }}>
                {it.hiragana.letter}
              </JPText>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {},
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

export default ClickPanel;
