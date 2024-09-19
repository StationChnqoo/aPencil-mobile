import SafeArea from '@src/components/SafeArea';
import ToolBar from '@src/components/ToolBar';

import {RouteProp} from '@react-navigation/native';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import WebView from 'react-native-webview';
import {RootStacksParams, RootStacksProp} from '..';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'Webviewer'>;
}

const Webviewer: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme} = useCaches();
  const [progress, setProgress] = useState(0);
  const [isShowProgressBar, setIsShowProgressBar] = useState(false);

  // useFocusEffect(useCallback(() => {}, [sound]));

  return (
    <SafeArea isAvoidBottomSpace={true}>
      <ToolBar
        title={route.params.title}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      {isShowProgressBar ? (
        <ProgressBar
          progress={progress}
          width={x.WIDTH}
          useNativeDriver={true}
          height={1}
          borderRadius={0}
          color={theme}
        />
      ) : null}
      <View style={styles.view}>
        <WebView
          source={{uri: route.params.url}}
          style={{flex: 1}}
          allowFileAccess={false}
          automaticallyAdjustContentInsets={true}
          allowsBackForwardNavigationGestures={false}
          cacheEnabled={false}
          scalesPageToFit={true}
          geolocationEnabled={false}
          javaScriptEnabled={true}
          onLoadProgress={e => {
            setProgress(e.nativeEvent.progress);
          }}
          onLoadStart={() => setIsShowProgressBar(true)}
          onLoadEnd={() => setIsShowProgressBar(false)}
          pullToRefreshEnabled={false}
          javaScriptCanOpenWindowsAutomatically={false}
          setDisplayZoomControls={false}
        />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
});

export default Webviewer;
