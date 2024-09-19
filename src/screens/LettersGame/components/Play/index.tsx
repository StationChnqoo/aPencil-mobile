import {Letter} from '@src/constants/Types';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ClickPanel from '../ClickPanel';
import PreviewPanel from '../PreviewPanel';
const SPACE = [36, 38, 46, 48];

interface MyProps {
  playing: boolean;
  seconds: number;
  onPlayPress: () => void;
}

const PREVIEW_CHARS = Array(50).fill('');

const Play: React.FC<MyProps> = props => {
  const {playing, seconds, onPlayPress} = props;
  const {theme, letters} = useCaches();
  const [index, setIndex] = useState(0);
  const [clickLetters, setClickLetters] = useState<Letter[]>([]);
  const [previewLetters, setPreviewLetters] = useState<string[]>(PREVIEW_CHARS);

  useEffect(() => {
    let datas = [...letters];
    setClickLetters(datas.slice(0, 46));
    return function () {};
  }, []);

  const onSmallLetterPress = (i: number) => {
    if (playing) {
      if (SPACE.includes(i)) {
      } else {
        setIndex(i);
        if (previewLetters[i]) {
          let _letters = [...previewLetters];
          _letters[i] = '';
          setPreviewLetters(_letters);
          updateClickLettersByPreviewLetters(_letters);
        }
      }
    } else {
      console.log('请开始开始PK ~');
    }
  };

  const updateClickLettersByPreviewLetters = (letters: string[]) => {
    // console.log('updateClickLettersByPreviewLetters: ', letters);
    let _letters = [...clickLetters];
    for (let i = 0; i < _letters.length; i++) {
      let l = _letters[i];
      if (_letters[i]) {
        l.checked = letters.find(it => it && l && it == l.hiragana.letter)
          ? true
          : false;
      }
    }
    setClickLetters(_letters);
  };

  const onBigLetterPress = (letter: Letter) => {
    if (playing) {
      let _letters = [...previewLetters];
      _letters[index] = letter.hiragana.letter;
      updateClickLettersByPreviewLetters(_letters);
      setPreviewLetters(_letters);
    } else {
      console.log('请开始开始PK ~');
    }
  };

  const resetLetters = () => {
    let _letters = [...clickLetters].map((it, i) => ({...it, checked: false}));
    setClickLetters(_letters);
    setPreviewLetters(PREVIEW_CHARS);
  };

  return (
    <View style={styles.view}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 6}}>
          <ClickPanel
            onPress={onBigLetterPress}
            letterChars={previewLetters}
            playing={playing}
            letters={clickLetters}
          />
        </View>
        <View style={styles.line} />
        <View style={{justifyContent: 'space-between', flex: 4}}>
          <Text style={{fontSize: x.scale(16), color: '#333'}}>预览</Text>
          <View style={{height: 5}} />
          <PreviewPanel
            letters={previewLetters}
            index={index}
            playing={playing}
            onPress={onSmallLetterPress}
          />
          <View style={{paddingHorizontal: 12}}>
            <View style={x.Styles.rowCenter('space-between')}>
              <Text style={{fontSize: x.scale(16), color: '#333'}}>时间：</Text>
              <Text style={{fontSize: x.scale(16), color: '#666'}}>
                {x.Time.HHmmss(seconds)}
              </Text>
            </View>
            <View style={{height: 10}} />
            <TouchableOpacity
              style={[
                styles.playButton,
                x.Styles.rowCenter('center'),
                {backgroundColor: theme},
              ]}
              activeOpacity={x.Touchable.OPACITY}
              onPress={() => {
                onPlayPress();
                resetLetters();
              }}>
              <Text style={styles.playText}>
                {playing ? '停止PK' : '开始PK'}
              </Text>
              <View style={{width: 8}} />
              <Image
                source={
                  playing
                    ? require('@root/assets/play/stop.png')
                    : require('@root/assets/play/start.png')
                }
                style={{
                  height: x.scale(18),
                  width: x.scale(18),
                  tintColor: '#fff',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  line: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: 12,
  },
});

export default Play;
