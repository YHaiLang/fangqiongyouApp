import './nav.css';
// 获取arttemplate模板
import render from './nav.art';
// 引入封装的ajax
import {getData,getDataDelay} from 'api/getData';

// 获取DOM节点
var navEl = document.querySelector('.nav-layout');
// 请求地址
var url = 'https://www.imooc.com/api/mall-wepApp/index/nav';

getData(url).then(data => {
    navEl.innerHTML = render({
        items:data
    })
}).catch(err => {
    console.log(err);
})
