import x from '@src/constants/x';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface MyProps {}

const Toolbar: React.FC<MyProps> = props => {
  const {} = props;
  return (
    <View style={styles.view}>
      <View style={[x.Styles.rowCenter()]}>
        <Image
          source={{uri: 'https://blog.cctv3.net/i.jpg'}}
          style={{
            height: x.scale(48),
            width: x.scale(48),
            borderRadius: x.scale(24),
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 12,
    marginHorizontal: 12,
    backgroundColor: 'white',
    padding: 12,
  },
  imageBG: {
    borderRadius: 12,
  },
});

export default Toolbar;
