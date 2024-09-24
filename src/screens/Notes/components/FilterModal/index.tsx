import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BottomSheet from '@src/components/BottomSheet';
import x from '@src/constants/x';
import Grouper from '../Grouper';
import Button from '@src/components/Button';
import {NoteTag} from '@src/constants/Types';
import {useCaches} from '@src/stores';
import DateTimePicker from '@react-native-community/datetimepicker';

interface MyProps {
  show: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<MyProps> = props => {
  const {onClose, show} = props;
  const [tags, setTags] = useState<NoteTag[]>([]);
  const {theme} = useCaches();
  const [tagsMessage, setTagsMessage] = useState('');

  const init = async () => {
    setTags(
      ['理财', '生活', '学习'].map((it, i) => ({
        label: it,
        id: `${i}`,
        checked: false,
      })),
    );
  };

  const onTagPress = (index: i) => {
    let datas = [...tags];
    datas[index].checked = !datas[index].checked;
    setTags([...datas]);
  };

  useEffect(() => {
    let count = tags.filter(it => it.checked).length;
    setTagsMessage(count == 0 ? '请选择' : `已选择${count}个标签`);
    return function () {};
  }, [tags]);
  return (
    <BottomSheet show={show} onClose={onClose} onShow={init}>
      <View style={styles.view}>
        <Text style={styles.textTitle}>筛选</Text>
        <ScrollView>
          <Grouper title={'标签'} message={tagsMessage} isOpen={true}>
            <View style={styles.tags}>
              {tags.map((it, i) => (
                <View key={i} style={{marginVertical: 2, marginRight: 6}}>
                  <Button
                    title={it.label}
                    onPress={() => {
                      onTagPress(i);
                    }}
                    style={[
                      styles.tag,
                      {borderColor: it.checked ? theme : '#ccc'},
                    ]}
                    textStyle={[
                      {fontSize: x.scale(14)},
                      {color: it.checked ? theme : '#ccc'},
                    ]}
                  />
                </View>
              ))}
            </View>
          </Grouper>
          <Grouper title={'时间'} message={tagsMessage} isOpen={true}>
            <TouchableOpacity
              onPress={() => {
                DateTimePicker;
              }}>
              <Text>选择开始时间</Text>
              {/* <DateTimePicker
                display={'spinner'}
                testID="dateTimePicker"
                value={new Date()}
                mode={'date'}
                // is24Hour={true}
                onChange={undefined}
              /> */}
            </TouchableOpacity>
          </Grouper>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    paddingHorizontal: x.scale(16),
    paddingVertical: x.scale(16),
    // flexDirection: 'row',
    // alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: x.HEIGHT * 0.58,
  },
  textTitle: {
    fontSize: x.scale(18),
    color: '#333',
    fontWeight: '500',
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tag: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
});

export default FilterModal;
