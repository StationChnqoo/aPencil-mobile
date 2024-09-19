import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import x from '@src/constants/x';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import RNFS from 'react-native-fs';
import ProgressBar from 'react-native-progress/Bar';
import {useCaches} from '@src/stores';
import JPText from '@src/components/JPText';

interface MyProps {
  navigation?: RootStacksProp;
}

const Welcome: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {theme, setCourses, setLetters, setWords} = useCaches();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const [downloadTasks, setDownloadTasks] = useState([
    {
      key: 'letters',
      name: 'letters.json',
      title: '五十音图资源',
      message: '',
      src: 'https://cloud.cctv3.net/jp-mobile/letters.json',
      hash: '',
    },
    {
      key: 'courses',
      name: 'courses.json',
      title: 'NHK课程资源',
      message: '',
      src: 'https://cloud.cctv3.net/jp-mobile/courses.json',
      hash: '',
    },
    {
      key: 'words',
      name: 'words.json',
      title: '《日语词汇手册》',
      message:
        '上海市教育考试院：https://www.shmeea.edu.cn/download/20211206/04.pdf',
      src: 'https://cloud.cctv3.net/jp-mobile/words.json',
      hash: '',
    },
  ]);

  const setUseCaches = async (task: any) => {
    let s = await RNFS.readFile(`${RNFS.DocumentDirectoryPath}/${task.name}`);
    let datas = JSON.parse(s || '[]');
    switch (task.key) {
      case 'letters':
        setLetters(datas);
        break;
      case 'courses':
        setCourses(datas);
        break;
      case 'words':
        setWords(datas);
      default:
        break;
    }
  };

  const checkCacheDatas = async () => {
    for (let i = 0; i < downloadTasks.length; i++) {
      let task = downloadTasks[i];
      let file = `${RNFS.DocumentDirectoryPath}/${task.name}`;
      setStep(i);
      setProgress(0);
      if (await RNFS.exists(file)) {
        setProgress(1);
      } else {
        let promise = await RNFS.downloadFile({
          fromUrl: task.src,
          toFile: file,
          begin(result) {
            setProgress(0);
          },
          progress(result) {
            setProgress(result.bytesWritten / result.contentLength);
          },
        }).promise;
        if (promise.statusCode == 200) {
          setProgress(1);
        }
      }
      await setUseCaches(task);
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (loading) {
      checkCacheDatas();
    } else {
      navigation.replace('Main');
    }
    return function () {};
  }, [loading]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{fontSize: x.scale(24), color: '#333', fontWeight: '500'}}>
            学日语的大旗谁来扛
          </Text>
          <View style={{height: 16}} />
          <JPText style={{color: '#666', fontSize: x.scale(16)}}>
            日本語学習の旗を掲げるのは誰だ？
          </JPText>
          <View style={{height: 32}} />
          <Image
            source={require('./assets/welcome.jpg')}
            resizeMode={'stretch'}
            style={{
              width: x.WIDTH * 0.618,
              height: x.WIDTH * 0.618 * 0.6,
              borderRadius: 12,
            }}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#333', fontSize: x.scale(14)}}>{`正在加载（${
            step + 1
          }/${downloadTasks.length}）`}</Text>
          <View style={{height: 6}} />
          <Text
            style={{
              color: '#666',
              fontSize: x.scale(14),
            }}>{`${downloadTasks[step].title}`}</Text>
          <View style={{height: 32}} />
          <View style={x.Styles.rowCenter('space-between')}>
            <ProgressBar
              progress={progress}
              color={theme}
              useNativeDriver={true}
              width={x.WIDTH * 0.618}
              minimumValue={0}
              maximumValue={0}
            />
            {/* <View style={{width: 12}} />
            <Text style={{color: '#999', fontSize: x.scale(12)}}>
              {(progress * 100).toFixed(2)}%
            </Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Welcome;
