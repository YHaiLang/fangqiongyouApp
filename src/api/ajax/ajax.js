//常量
import { HTTP_GET,CONTENT_TYPE_FORM_URLENCODED,CONTENT_TYPE_JSON } from "./contans.js";
// 工具函数
import { serialize, addData, serializeJSON } from "./utils.js";
// 默认参数
import DEFAULTS from "./default.js";

class Ajax {
    constructor(url,options) {
        this.url = url;
        this.options = Object.assign({},DEFAULTS,options);

        //初始化
        this.init();
    }
    //初始化
    init() {
        //初始化xhr对象
        const xhr = new XMLHttpRequest();
        this.xhr = xhr;
        //绑定响应处理程序
        this.bindEvent();

        //准备发送请求
        xhr.open(this.options.method,this.url+this.addParams(),true);

        //设置接收数据格式
        this.setResponseType();
        //设置跨域是否携带cookie
        this.setCredentials();
        //设置超时时间
        this.setTimeout();

        //发送请求
        this.sendData();
    }
    //绑定响应处理程序
    bindEvent() {
        //获取this上的xhr
        const xhr = this.xhr;
        //解构赋值，解构出要用的方法
        const {success,httpCodeError,error,timeout,abort} = this.options;
        //监听响应
        xhr.addEventListener('load',() => {
            if(this.ok()) {
                success(xhr.response,xhr);
            }else {
                httpCodeError(xhr.status,xhr);
            }
        },false);
        // 监听请求错误
        xhr.addEventListener('error',() => {
            error(xhr);
        },false)
        // 监听超时
        xhr.addEventListener('timeout',() => {
            timeout(xhr);
        },false)
        // 监听请求终止
        xhr.addEventListener('abort',() => {
            abort(xhr);
        },false)
    }
    //处理 HTTP 状态码
    ok() {
        //获取this上的xhr
        const xhr = this.xhr;

        return (xhr.status>=200 && xhr.status<300 || xhr.status===304);
    } 
    // 在地址上添加数据
    addParams() {
        const {params} = this.options;

        if(!params) return '';

        return addData(this.url,serialize(params));
    }

    //设置接收数据格式
    setResponseType() {
        this.xhr.responseType = this.options.responseType;
    }
    //设置跨域是否携带cookie
    setCredentials() {
        if(this.options.withCredentials) {
            this.xhr.withCredentials = true;
        }
    }
    //设置超时时间
    setTimeout() {
        if(this.options.timeOutTime>0) {
            this.xhr.timeout = this.options.timeOutTime;
        }
    }

    //发送请求
    sendData() {
        const xhr = this.xhr;
        if(!this.isSendData()) {
            return xhr.send(null);
        }

        let resultData = null;
        const { data } = this.options;

        //判断要传的是哪种格式的数据FormData uelencoded json
        if(this.isFormData()) {
            resultData = data;
        }else if(this.isUrlEncoded()) {
            //设置ContentType
            this.setRequestHeader(CONTENT_TYPE_FORM_URLENCODED);
            resultData = serialize(data);
        }else if(this.isJSON()) {
            //设置ContentType
            this.setRequestHeader(CONTENT_TYPE_JSON);
            resultData = serializeJSON(data);
        }else {
            this.setRequestHeader();
            resultData = data;
        }

        xhr.send(resultData);
    }
    //是否需要发送数据
    isSendData() {
        const {method,data} = this.options;

        if(!data) return false;
        if(method.toLowerCase() === HTTP_GET.toLowerCase()) {
            return false;
        }

        return true;
    }
    //判断是不是FormData格式的数据
    isFormData() {
        return this.options.data instanceof FormData;
    }
    //判断是不是要发送名值对格式的数据
    isUrlEncoded() {
        return this.options.ContentType.toLowerCase().includes(CONTENT_TYPE_FORM_URLENCODED);
    }
    //判断是不是要发送 JSON 格式的数据
    isJSON() {
        return this.options.ContentType.toLowerCase().includes(CONTENT_TYPE_JSON);
    }
    //设置Content-Type发送数据格式
    setRequestHeader(ContentType=this.options.ContentType) {
        this.xhr.setRequestHeader('Content-Type',ContentType);
    }
    //获取xhr对象
    getXHR() {
        return this.xhr;
    }
}

export default Ajax;