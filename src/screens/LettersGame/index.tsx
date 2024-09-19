import SafeArea from '@src/components/SafeArea';
import ToolBar from '@src/components/ToolBar';

import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RootStacksProp} from '..';
import Play from './components/Play';
import Score from './components/Score';
import {useInterval} from 'ahooks';

interface MyProps {
  navigation?: RootStacksProp;
}

const LettersGame: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {theme} = useCaches();
  const [seconds, setSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [interval, setInterval] = useState<number | null | undefined>(
    undefined,
  );

  useInterval(() => {
    setSeconds(s => s + 1);
  }, interval);

  return (
    <SafeArea>
      <ToolBar
        title={'五十音默写大PK'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.view}>
          <Score />
          <View style={{height: 12}} />
          <Play
            seconds={seconds}
            playing={playing}
            onPlayPress={() => {
              if (playing) {
                setPlaying(false);
                setInterval(undefined);
              } else {
                setSeconds(0);
                setInterval(1000);
                setPlaying(true);
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: x.Color.PAGE,
  },
});

export default LettersGame;
