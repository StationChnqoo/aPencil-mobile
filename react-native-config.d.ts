declare module 'react-native-config' {
  export interface NativeConfig {
    APP_NAME?: string;
    APP_PACKAGE_NAME?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
