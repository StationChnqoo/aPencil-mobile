import Button from '@src/components/Button';
import JPText from '@src/components/JPText';
import {Letter} from '@src/constants/Types';

import x from '@src/constants/x';
import {RootStacksProp} from '@src/screens';
import {useCaches} from '@src/stores';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import FastImage from 'react-native-fast-image';

interface MyProps {
  navigation?: RootStacksProp;
}

const HomeLetters: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {theme, font, letters} = useCaches();
  const [myLetters, setMyLetters] = useState<Letter[]>([]);
  const [index, setIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isPreview, setIsPreview] = useState(true);
  const [isRecite, setIsRecite] = useState(false);

  useEffect(() => {
    setIndex(0);
    let datas: Letter[] = [...letters];
    let initLetters = lettersFormatter(datas.slice(0, 46));
    let shuffleLetters = lettersFormatter(
      [...datas.slice(0, 46)].sort((a, b) => Math.random() - 0.5),
    );
    setMyLetters(isShuffle ? shuffleLetters : initLetters);
    return function () {};
  }, [isShuffle]);

  const lettersFormatter = (letters: any[]) => {
    let _letters = [...letters];
    let space = [36, 38, 46, 48];
    for (let i = 0; i < space.length; i++) {
      _letters.splice(space[i], 0, null);
    }
    return _letters;
  };
  return (
    <View style={styles.view}>
      <View
        style={[x.Styles.rowCenter('space-between'), {paddingHorizontal: 12}]}>
        <Text
          style={{
            fontSize: x.scale(16),
            fontWeight: '500',
            color: '#333',
          }}>
          五十音图
        </Text>
        <TouchableOpacity
          activeOpacity={x.Touchable.OPACITY}
          onPress={() => {
            navigation.navigate('LettersGame');
          }}>
          <Text style={{fontSize: x.scale(14), color: theme}}>练习 →</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 6}} />
      <View style={{flexDirection: 'row'}}>
        <View style={[x.Styles.rowCenter('center'), {width: '100%'}]}>
          <View
            style={{
              flexDirection: 'column',
              flexWrap: 'wrap-reverse',
              height: x.scale(35 * 5) + 4 * 5, // 高度设置为适合你的屏幕
              alignItems: 'flex-end', // 使得列从右向左排列
            }}>
            {myLetters.map((it, i) => (
              <TouchableOpacity
                activeOpacity={x.Touchable.OPACITY}
                key={i}
                style={[
                  styles.letterContainer,
                  {
                    borderColor: index == i ? theme : 'white',
                  },
                ]}
                onPress={() => setIndex(it == null ? index : i)}>
                {it ? (
                  <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    {isRecite ? (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}>
                        <JPText
                          style={{
                            fontSize: x.scale(18),
                          }}>
                          {it.hiragana.letter}
                        </JPText>
                        <JPText
                          style={{
                            color: '#666',
                            fontSize: x.scale(10),
                          }}>
                          {it.katakana.letter}
                        </JPText>
                      </View>
                    ) : (
                      <FastImage
                        source={{uri: it.hiragana.src}}
                        style={{
                          width: x.scale(30),
                          height: x.scale(35),
                        }}
                      />
                    )}
                  </View>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={{height: 12}} />
      <View>
        {myLetters?.[index] ? (
          <View style={{justifyContent: 'space-between'}}>
            <View style={[x.Styles.rowCenter('space-between')]}>
              <View style={[x.Styles.rowCenter()]}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: '#999'}}>平假名</Text>
                  <Image
                    style={[
                      {
                        width: x.scale(90),
                        height: x.scale(90),
                      },
                      isPreview ? {} : {tintColor: '#eee'},
                    ]}
                    source={{uri: myLetters[index].hiragana.detailSrc}}
                  />
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: '#999'}}>片假名</Text>
                  <Image
                    style={[
                      {width: x.scale(90), height: x.scale(90)},
                      isPreview ? {} : {tintColor: '#eee'},
                    ]}
                    source={{uri: myLetters[index].katakana.detailSrc}}
                  />
                </View>
              </View>
              <View>
                <Line
                  theme={theme}
                  isChecked={isShuffle}
                  title={'打乱顺序'}
                  onPress={() => setIsShuffle(!isShuffle)}
                />
                <View style={{height: 12}} />
                <Line
                  theme={theme}
                  isChecked={isRecite}
                  title={'背诵模式'}
                  onPress={() => setIsRecite(!isRecite)}
                />
                <View style={{height: 12}} />
                <Line
                  theme={theme}
                  isChecked={isPreview}
                  title={'开启预览'}
                  onPress={() => setIsPreview(!isPreview)}
                />
                {/* <FillButton
                title={'默写大PK'}
                onPress={() => {
                  navigation.navigate('LettersGame');
                }}
                theme={theme}
              /> */}
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

interface FillButtonProps {
  theme: string;
  onPress: () => void;
  title: string;
}
const FillButton = (props: FillButtonProps) => {
  return (
    <Button
      title={props.title}
      onPress={props.onPress}
      textStyle={{color: 'white', fontSize: x.scale(14)}}
      style={{
        backgroundColor: props.theme,
        marginHorizontal: 12,
        height: x.scale(36),
        borderRadius: 5,
      }}
    />
  );
};

interface LineProps {
  title: string;
  theme: string;
  isChecked: boolean;
  onPress: (isChecked: boolean) => void;
}

const Line = (props: LineProps) => {
  const {title, theme, isChecked, onPress} = props;
  return (
    <View
      style={[x.Styles.rowCenter('space-between'), {paddingHorizontal: 12}]}>
      <Text style={{color: '#333', fontSize: x.scale(14)}}>{title}</Text>
      <View style={{width: 12}} />
      <BouncyCheckbox
        size={x.scale(24)}
        disableText={true}
        fillColor={theme}
        unFillColor="#FFFFFF"
        isChecked={isChecked}
        onPress={props.onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingVertical: 12,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  letterContainer: {
    width: x.scale(30),
    height: x.scale(35),
    marginHorizontal: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    marginVertical: 2,
  },
});

export default HomeLetters;
