import { getJSON } from "./ajax";

const getData = (url,options) => {
    const ajaxPromise = getJSON(url,{
        timeOutTime:30000,
        ...options
    });

    const resultPromise = ajaxPromise.then(response => {
        //通常获取的数据
        /* {
            code:200,
            data:……
        } */
        if(response.code !== 200) {
            throw new Error('HTTP状态码异常'+response.code);
        }

        return response.data;
    }).catch(err => {
        console.log(err);
    });

    resultPromise.xhr = ajaxPromise.xhr;
    return resultPromise;
}

const delay = ms => {
    return new Promise(resolve => {
        setTimeout(resolve,ms);
    });
}

const getDataDelay = (url,options) => {
    return delay(2000).then(() => {
        return getData(url,options);
    })
}

export { getData, getDataDelay };