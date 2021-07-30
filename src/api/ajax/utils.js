//工具函数
//序列化成名值对 即 urlencoded格式的数据
const serialize = params => {
    const result = [];
    //遍历参数
    for(const [key,value] of Object.entries(params)) {
        result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    // ['username=alex','age=18']
    return result.join('&');
};

//添加前面的标记 ? 或者 &
//www.imooc.com?words=js
//www.imooc.com?words=js&username=alex
const addData = (url,data) => {
    if(!data) return '';

    const mask = url.includes('?')?'&':'?';

    return `${mask}${data}`;
};

//序列化JSON数据
const serializeJSON = data => {
    return JSON.stringify(data);
}

export {serialize,addData,serializeJSON};