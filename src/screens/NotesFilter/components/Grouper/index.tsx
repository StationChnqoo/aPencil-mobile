import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import x from '@src/constants/x';

interface MyProps {
  isOpen?: boolean;
  title: string;
  message?: string;
  children?: React.ReactElement;
}

const Grouper: React.FC<MyProps> = props => {
  const {isOpen, children, title, message = ''} = props;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(isOpen);
    return function () {};
  }, [isOpen]);
  return (
    <View style={{marginVertical: 6}}>
      <View style={x.Styles.rowCenter('space-between')}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={x.Styles.rowCenter()}
          activeOpacity={x.Touchable.OPACITY}
          hitSlop={x.Touchable.hitlop(12)}
          onPress={() => {
            setOpen(!open);
          }}>
          <Text style={{color: '#666', fontSize: x.scale(14)}}>{message}</Text>
          <View style={{width: 6}} />
          <Image
            key={`${open}`}
            source={
              open
                ? require('@root/assets/common/arrow_up.png')
                : require('@root/assets/common/arrow_right.png')
            }
            style={{
              height: x.scale(14),
              width: x.scale(14),
              tintColor: '#666',
            }}
          />
        </TouchableOpacity>
      </View>
      {open ? <View style={{marginTop: 6}}>{children}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: x.scale(16),
    color: '#333',
    fontWeight: '500',
  },
});

export default Grouper;
