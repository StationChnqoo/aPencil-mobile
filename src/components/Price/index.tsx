import x from '@src/constants/x';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MyProps {
  price: string;
  size?: number;
}

const Price: React.FC<MyProps> = props => {
  const {price, size} = props;

  return (
    <View style={styles.price}>
      <Text style={[styles.textPrice, {fontSize: size || x.scale(20)}]}>
        {price}
      </Text>
      <Text style={styles.textPriceExtra}>元</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  price: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  textPrice: {
    fontSize: x.scale(20),
    fontWeight: '500',
    color: '#ff5252',
    fontFamily: x.Fonts.DOSIS,
  },
  textPriceExtra: {
    fontSize: 12,
    color: '#ff5252',
  },
});

export default Price;
