import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

interface MyProps {
  style?: StyleProp<TextStyle>;
  children: string;
}

const JPText = (props: MyProps) => {
  const {font} = useCaches();
  const {style, children} = props;
  return (
    <Text
      style={[
        styles.text,
        {
          fontFamily: font,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#333',
    fontSize: x.scale(14),
    includeFontPadding: false,
  },
});

export default JPText;
