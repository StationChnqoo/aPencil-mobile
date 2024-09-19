import SafeArea from '@src/components/SafeArea';
import ToolBar from '@src/components/ToolBar';

import {RouteProp} from '@react-navigation/native';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import WebView from 'react-native-webview';
import {RootStacksParams, RootStacksProp} from '..';
import PdfRendererView from 'react-native-pdf-renderer';
import md5 from 'md5';
import RNFS from 'react-native-fs';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'Webviewer'>;
}

const PdfViewer: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme} = useCaches();
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(true);
  // useFocusEffect(useCallback(() => {}, [sound]));

  const filePathBuilder = () => {
    let hash = md5(route.params.url);
    console.log('filePathBuilder: ', route.params.url);
    return `${RNFS.DocumentDirectoryPath}/${hash}.pdf`;
  };

  useEffect(() => {
    (async () => {
      if (await RNFS.exists(filePathBuilder())) {
        setProgress(1);
        setDownloading(false);
      } else {
        let promise = await RNFS.downloadFile({
          fromUrl: route.params.url,
          toFile: filePathBuilder(),
          begin: result => {},
          progress: result => {
            setProgress(result.bytesWritten / result.contentLength);
          },
        }).promise;
        if (promise.statusCode == 200) {
          setProgress(1);
          setDownloading(false);
        }
      }
    })();
    return function () {};
  }, [route.params.url]);

  return (
    <SafeArea isAvoidBottomSpace={true}>
      <ToolBar
        title={route.params.title}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      {downloading ? (
        <ProgressBar
          progress={progress}
          width={x.WIDTH}
          useNativeDriver={true}
          height={4}
          borderRadius={0}
          color={theme}
        />
      ) : null}
      <View style={styles.view}>
        {downloading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#333', fontSize: x.scale(14)}}>{`正在下载${(
              progress * 100
            ).toFixed(2)}%`}</Text>
          </View>
        ) : (
          <PdfRendererView
            style={{flex: 1}}
            source={`file://${filePathBuilder()}`}
          />
        )}
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: x.Color.PAGE,
    position: 'relative',
  },
});

export default PdfViewer;
