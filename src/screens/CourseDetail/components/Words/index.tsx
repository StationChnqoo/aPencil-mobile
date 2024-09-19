import JPText from '@src/components/JPText';
import {Course, CourseWord, Word} from '@src/constants/Types';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  course: Course;
}

const Words: React.FC<MyProps> = props => {
  const {course} = props;
  const {theme, font} = useCaches();
  const [isShowEN, setIsShowEN] = useState(true);
  const [isShowCN, setIsShowCN] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [words, setWords] = useState<CourseWord[]>([]);

  useEffect(() => {
    setWords(
      isShuffle
        ? [...course.words].sort(() => Math.random() - 0.5)
        : [...course.words],
    );
  }, [course.words, isShuffle]);

  // console.log('Controller playing: ', playing);
  return (
    <View style={[styles.view]}>
      <Text style={styles.title}>单词和短句</Text>
      <View style={[x.Styles.rowCenter('flex-start')]}>
        <CheckedTag
          label={'打乱顺序'}
          checked={isShuffle}
          onPress={() => setIsShuffle(!isShuffle)}
          activeColor={theme}
        />
        <CheckedTag
          label={'中文翻译'}
          checked={isShowCN}
          onPress={() => setIsShowCN(!isShowCN)}
          activeColor={theme}
        />
        <CheckedTag
          label={'读音'}
          checked={isShowEN}
          onPress={() => setIsShowEN(!isShowEN)}
          activeColor={theme}
        />
      </View>
      <View style={{height: 6}} />
      <View style={styles.words}>
        {words.map((it, i) => (
          <TouchableOpacity
            key={i}
            style={styles.word}
            activeOpacity={x.Touchable.OPACITY}>
            <JPText style={styles.messageJP}>{it.jp}</JPText>
            {isShowCN && <Text style={styles.messageCN}>{it.cn}</Text>}
            {isShowEN && <Text style={styles.messageEN}>{it.en}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

interface CheckedTagProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  activeColor: string;
}

const CheckedTag = (props: CheckedTagProps) => {
  const {label, checked, onPress, activeColor} = props;
  const color = checked ? activeColor : '#999';
  return (
    <TouchableOpacity
      style={[styles.tag, {borderColor: color}]}
      activeOpacity={x.Touchable.OPACITY}
      onPress={onPress}>
      <Text style={[{color, fontSize: x.scale(12)}]}>{label}</Text>
      <Image
        source={require('../../assets/checked.png')}
        style={[
          styles.checkedIcon,
          {
            tintColor: color,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  words: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  word: {
    marginHorizontal: 6,
    marginVertical: 3,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#ccc',
    paddingVertical: x.scale(6),
    paddingHorizontal: 10,
  },
  messageCN: {
    color: '#666',
    fontSize: x.scale(12),
    marginTop: 5,
  },
  messageEN: {
    color: '#333',
    fontSize: x.scale(12),
    marginTop: 5,
  },
  messageJP: {
    fontSize: x.scale(14),
    color: '#111',
  },
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    position: 'relative',
    borderWidth: 1,
    marginHorizontal: 6,
  },
  checkedIcon: {
    height: x.scale(10),
    width: x.scale(10),
    position: 'absolute',
    bottom: -x.scale(4),
    right: -x.scale(4),
  },
  title: {
    fontWeight: '500',
    color: '#333',
    fontSize: x.scale(16),
    paddingHorizontal: 6,
    marginVertical: 6,
  },
});

export default Words;
