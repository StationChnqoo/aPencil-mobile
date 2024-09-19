import axios, {AxiosInstance} from 'axios';
import * as AxiosLogger from 'axios-logger';
import md5 from 'blueimp-md5';
// import Config from 'react-native-config';

export default class Services {
  instance: AxiosInstance = null;
  constructor() {
    const time = Date.now();
    this.instance = axios.create({
      // baseURL: Config.SERVER,
      baseURL: 'http://192.168.0.101:3000/api/chnqoo-notebook',
      timeout: 10000,
      headers: {
        t: time,
        s: md5(`Chnqoo@t:${time}`),
      },
    });
    this.instance.interceptors.request.use(request => {
      return AxiosLogger.requestLogger(request, {
        prefixText: 'react-native/axios',
        dateFormat: 'yyyy-mm-dd HH:MM:ss',
        params: true,
        headers: true,
        method: true,
      });
    });
    this.instance.interceptors.response.use(response => {
      return response;
    });
  }

  /**
   * 2022/10/2
   * @param date
   * @returns
   */
  async selectBingWallpaper(date: string) {
    this.instance.defaults.baseURL = 'https://mouday.github.io';
    let result = await this.instance.get(`/wallpaper-database/${date}.json`);
    return result.data;
  }

  async selectJPLetters() {
    this.instance.defaults.baseURL = 'https://cloud.cctv3.net';
    let result = await this.instance.get('/jp-mobile/letters.json');
    return result.data;
  }

  async selectJPCourses() {
    this.instance.defaults.baseURL = 'https://cloud.cctv3.net';
    let result = await this.instance.get('/jp-mobile/course.json');
    return result.data;
  }
}
