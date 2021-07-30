import './content.css';

import render from './content.art';
import loadingRender from 'components/loading/loading.art';


// 封装接收数据的类
class Content {
    constructor(el) {
        this.el = el;
    }
    // 接收数据，并填充到内容区
    set(data) {
        this.el.innerHTML = render({
            contents:data
        })
    }
    // 点击过程中的loading组件，防止因网速慢出现类似卡顿的现象
    setLoading() {
        this.el.innerHTML = loadingRender();
    }
    
}

export default Content;