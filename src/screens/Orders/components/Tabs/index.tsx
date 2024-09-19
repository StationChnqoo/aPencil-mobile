import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  index: number;
  onTabPress: (tab: number) => void;
}

const Tabs: React.FC<MyProps> = props => {
  const {index, onTabPress} = props;
  const {theme} = useCaches();
  const [tabs, setTabs] = useState([
    '全部',
    '待支付',
    '进行中',
    '已完成',
    '已取消',
  ]);

  return (
    <View
      style={[
        styles.view,
        // {paddingTop: useSafeAreaInsets().top},
        x.Styles.CARD,
      ]}>
      {tabs.map((it, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={x.Touchable.OPACITY}
          onPress={() => {
            onTabPress(i);
          }}
          style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={[
                {},
                i == index
                  ? {fontSize: x.scale(16), fontWeight: '500', color: theme}
                  : {fontSize: x.scale(14), color: '#666'},
              ]}>
              {it}
            </Text>
            <View style={{height: 5}} />
            <View
              style={[
                styles.dot,
                {backgroundColor: i == index ? theme : 'white'},
              ]}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  dot: {
    width: 16,
    height: 4,
    borderRadius: 2,
  },
});

export default Tabs;
