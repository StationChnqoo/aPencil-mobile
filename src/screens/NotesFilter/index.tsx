import Button from '@src/components/Button';
import SafeArea from '@src/components/SafeArea';
import ToolBar from '@src/components/ToolBar';
import {NoteTag} from '@src/constants/Types';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RootStacksProp} from '..';
import Grouper from './components/Grouper';
import moment from 'moment';

interface MyProps {
  navigation?: RootStacksProp;
}

const NotesFilter: React.FC<MyProps> = props => {
  const {navigation} = props;
  const [tags, setTags] = useState<NoteTag[]>([]);
  const {theme} = useCaches();
  const [tagsMessage, setTagsMessage] = useState('');
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateIndex, setDateIndex] = useState(0);

  useEffect(() => {
    (async () => {
      init();
    })();
    return function () {};
  }, []);

  const init = async () => {
    setTags(
      ['理财', '生活', '学习'].map((it, i) => ({
        label: it,
        id: `${i}`,
        checked: false,
      })),
    );
  };

  const onTagPress = (index: number) => {
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
    <SafeArea isAvoidBottomSpace={true}>
      <View style={{flex: 1}}>
        <ToolBar
          title={'编辑搜索条件'}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={{height: 12}} />
          <View style={styles.view}>
            {/* <Text style={styles.textTitle}>筛选</Text> */}
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
            <View style={{height: 12}} />
            <View style={x.Styles.rowCenter('space-between')}>
              <Text style={styles.groupTitle}>日期</Text>
              <View style={[x.Styles.rowCenter('flex-start')]}>
                <TouchableOpacity
                  activeOpacity={x.Touchable.OPACITY}
                  style={styles.buttonDate}
                  onPress={() => {
                    setDateIndex(0);
                    setIsShowDatePicker(true);
                  }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: x.scale(14),
                    }}>
                    {moment(startDate).format('YYYY-MM-DD')}
                  </Text>
                </TouchableOpacity>
                <Text style={{color: '#999', marginHorizontal: 12}}>~</Text>
                <TouchableOpacity
                  activeOpacity={x.Touchable.OPACITY}
                  style={styles.buttonDate}
                  onPress={() => {
                    setDateIndex(1);
                    setIsShowDatePicker(true);
                  }}>
                  <Text style={{color: '#333', fontSize: x.scale(14)}}>
                    {moment(endDate).format('YYYY-MM-DD')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <Button
          title={'确认'}
          style={{
            backgroundColor: theme,
            margin: 12,
            height: x.scale(36),
            borderRadius: 12,
          }}
          textStyle={{color: '#fff', fontSize: x.scale(16)}}
          onPress={() => {
            setTimeout(() => {
              navigation.goBack();
            }, 1000);
          }}
        />
      </View>
      <DateTimePickerModal
        customHeaderIOS={() => (
          <View
            style={[x.Styles.rowCenter('center'), {paddingTop: x.scale(16)}]}>
            <Text style={{color: '#333', fontSize: x.scale(16)}}>请选择</Text>
          </View>
        )}
        locale={'zh'}
        isVisible={isShowDatePicker}
        mode={'date'}
        date={[startDate, endDate][dateIndex]}
        confirmTextIOS={'确认'}
        cancelTextIOS={'取消'}
        onConfirm={date => {
          setIsShowDatePicker(false);
          [setStartDate, setEndDate][dateIndex](date);
        }}
        onCancel={() => {
          setIsShowDatePicker(false);
        }}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    paddingHorizontal: x.scale(16),
    paddingVertical: x.scale(16),
    // flexDirection: 'row',
    // alignItems: 'center',
    borderRadius: 12,
    // height: x.HEIGHT * 0.58,
    marginHorizontal: 12,
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
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  buttonDate: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 6,
    // width: x.scale(90),
  },
  groupTitle: {fontSize: x.scale(16), color: '#333', fontWeight: '500'},
});
export default NotesFilter;
