import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
import Setting from '../Setting';
import Config from 'react-native-config';

interface MyProps {}

const About: React.FC<MyProps> = props => {
  const {font, setFont, theme, setTheme} = useCaches();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      setItems([
        {label: '缓存路径', value: `${RNFS.DocumentDirectoryPath}`},
        {
          label: '缓存空间',
          value: await formartUseCached(),
        },
        {
          label: 'PACKAGE NAME',
          value: Config.APP_PACKAGE_NAME,
        },
      ]);
    })();
    return function () {};
  }, []);

  const formartUseCached = async () => {
    let result = await usedCached();
    let array = [
      `${result.folderCount}个文件夹`,
      `${result.fileCount}个文件`,
      `${(result.totalSize / 1024 / 1024).toFixed(2)}MB`,
    ];
    return array.join(' | ');
  };

  const usedCached = async () => {
    const tree = async (dir: string) => {
      // 读取文件夹下所有文件和子文件夹的列表
      const files = await RNFS.readDir(dir);
      let totalSize = 0;
      let fileCount = 0;
      let folderCount = 0;

      // 遍历文件或文件夹
      for (const file of files) {
        if (file.isFile()) {
          // 如果是文件，获取文件大小并累计
          const fileStats = await RNFS.stat(file.path);
          totalSize += fileStats.size;
          fileCount += 1; // 增加文件数量
        } else if (file.isDirectory()) {
          // 如果是文件夹，递归计算子文件夹
          const subFolderStats = await tree(file.path);
          totalSize += subFolderStats.totalSize;
          fileCount += subFolderStats.fileCount;
          folderCount += subFolderStats.folderCount + 1; // 增加文件夹数量
        }
      }
      return {totalSize, fileCount, folderCount};
    };
    return await tree(RNFS.DocumentDirectoryPath);
  };
  return (
    <Setting title={'关于'}>
      <View>
        {items.map((it, i) => (
          <View key={i} style={{marginTop: 6}}>
            <Text
              style={{color: '#333', fontSize: x.scale(16), fontWeight: '500'}}>
              {it.label}
            </Text>
            <View style={{height: 4}} />
            <Text
              style={{color: '#666', fontSize: x.scale(14)}}
              selectable={true}
              numberOfLines={2}>
              {it.value}
            </Text>
          </View>
        ))}
      </View>
    </Setting>
  );
};

const styles = StyleSheet.create({});

export default About;
