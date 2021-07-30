//常量
import { HTTP_GET,CONTENT_TYPE_FORM_URLENCODED } from "./contans.js";
// 默认参数
const DEFAULTS = {
    method:HTTP_GET,
    //请求头携带的数据
    params:null,
    /* 都可能是这种
    {
        username:'alex',
        age:18
    }
    username='alex'&age=18 
    */
    // 请求体携带的数据
    data:null,

    //发送数据的格式
    ContentType:CONTENT_TYPE_FORM_URLENCODED,
    //接收数据的格式
    responseType:'',
    //超时时间
    timeOutTime:0,
    //跨域是否携带cookie
    withCredentials:false,


    // 方法
    success() {},
    httpCodeError() {},
    error() {},
    timeout() {},
    abort() {},
}

export default DEFAULTS;