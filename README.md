## JP Mobile

### 打包/运行命令

如果脚本写到了`package.json`，直接运行`npm run run:ios:bate`

#### Android 打包

```bash
cd android && ENVFILE=.env.staging ./gradlew assembleDebug && cd ..
ENVFILE=.env.rc ./gradlew assembleRelease
```

#### iOS 运行

https://medium.com/armenotech/configure-environment-variables-with-react-native-config-for-ios-and-android-7079c0842d8b

暂时命令应该是搞定不了，只能指定`Scheme` ...

```bash
chmod +x ios-cache-cleaner.sh
```

```bash
./ios-cache-cleaner.sh && react-native run-ios --scheme JP-Bate
```
