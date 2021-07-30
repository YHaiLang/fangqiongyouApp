import './tab.css';

import {getData,getDataDelay} from 'api/getData';

// 接口
const url = 'https://www.imooc.com/api/mall-wepApp/destination/content';

// 实现设置激活样式和发送请求的类
class Tab {
    constructor(el) {
        this.elEls = el.querySelectorAll('.tab-item');
    }
    // 根据传入的索引，设置激活样式
    setActive(index) {
        for(let item of this.elEls) {
            item.classList.remove('tab-item-active');
        }
        this.elEls[index].classList.add('tab-item-active');
    }

    // 发送请求
    to(index) {
        // 判断前面是不是已经发送了请求
        if(this.dataPromise && this.dataPromise.xhr) {
            this.dataPromise.xhr.abort();
        }
        // 先激活状态
        this.setActive(index);

        this.dataPromise = getData(`${url}/${this.elEls[index].dataset.id}`);
        // 发送请求，因为是promise,可以直接返回
        return this.dataPromise;
    }
}

export default Tab;