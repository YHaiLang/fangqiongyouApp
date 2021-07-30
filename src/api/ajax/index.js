//导入常量
import {
    ERROR_HTTP_CODE,
    ERROR_HTTP_CODE_TEXT,
    ERROR_REQUEST,
    ERROR_REQUEST_TEXT,
    ERROR_TIMEOUT,
    ERROR_TIMEOUT_TEXT,
    ERROR_ABORT,
    ERROR_ABORT_TEXT} from './contans.js';
//导入ajax主类
import Ajax from './ajax.js';

//使用promise改造ajax
const ajax = (url,options) => {
    // return new Ajax(url,options).getXHR();
    let xhr;
    const p = new Promise((resolve,reject) => {
        xhr = new Ajax(url,{
            ...options,
            ...{
                success(response){
                    resolve(response);
                },
                httpCodeError(status) {
                    reject({
                        type:ERROR_HTTP_CODE,
                        text:`${ERROR_HTTP_CODE_TEXT}${status}`
                    });
                },
                error() {
                    reject({
                        type:ERROR_REQUEST,
                        text:ERROR_REQUEST_TEXT
                    })
                },
                timeout() {
                    reject({
                        type:ERROR_TIMEOUT,
                        text:ERROR_TIMEOUT_TEXT
                    })
                },
                abort() {
                    reject({
                        type:ERROR_ABORT,
                        text:ERROR_ABORT_TEXT
                    })
                }
            }
        }).getXHR();
    });
    p.xhr = xhr;
    return p;
}
const get = (url,options) => {
    return ajax(url,{...options,method:'GET'});
}
const getJSON = (url,options) => {
    return ajax(url,{...options,method:'GET',responseType:'json'});
}
const post = (url,options) => {
    return ajax(url,{...options,method:'POST'});
}

export {ajax, get, getJSON, post};