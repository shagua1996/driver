import axios from "axios";

const HTTP_K1 = "kemu1"; //科目1
const HTTP_K4 = "kemu4"; //科目4

// var CancelToken = axios.CancelToken;
// var source = CancelToken.source();

export default class Http {
  static common(path, page) {
    // let config = {
    //   cancelToken: source.token
    // };

    // // 请求拦截器
    // this.req_interceptors();
    // // 响应拦截器
    // this.res_interceptors();
    var obj = {
      key: this.key,
      size: 10,
      page: page
    };
    var data = {
      params: {
        url: `http://apicloud.mob.com/tiku/${path}/query`,
        param: obj
      }
    };
    return axios.get(this.proxy, data).catch(function(thrown) {
      if (axios.isCancel(thrown)) {
        return { code: 201, msg: thrown.message };
      } else {
        // 处理错误
        return { code: 202, msg: "未知异常" };
      }
    });
  }
  // 请求拦截器
  static req_interceptors() {
    // 添加请求拦截器
    axios.interceptors.request.use(
      function(config) {
        // 在发送请求之前做些什么
        // 设置取消请求的token
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        config.cancelToken = source.token;

        // 模拟没有登陆的情况
        // let isLogin = true;
        // if (!isLogin) source.cancel("当前账号还没有登陆");
        return config;
      },
      function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
  }
  // 响应拦截器
  static res_interceptors() {
    // 添加响应拦截器
    axios.interceptors.response.use(
      function(response) {
        // 对响应数据做点什么
        // return response.data;
        return response;
      },
      function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }
  // 请求城市列表
  static async k1(page, callback) {
    let result = await this.common(HTTP_K1, page);
    callback(result);
  }
  static async k4(page, callback) {
    let result = await this.common(HTTP_K4, page);
    callback(result);
  }
}
Http.proxy = "http://www.bestqingshan.top/demo/Juhe.php";
Http.key = "2a6bb26044286";
