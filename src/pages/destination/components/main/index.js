import './main.css';
import Tab from '../tab';
import Content from'../content';
import 'components/loading';
import {set,get} from 'utils/storage';

var tabEl = document.querySelector('.tab');
var contentLayout = document.querySelector('.content-layout');
var tabItems = tabEl.querySelectorAll('.tab-item');

var tab = new Tab(tabEl);
var content = new Content(contentLayout);

tabEl.addEventListener('click',ev => {
    const e = ev || window.event;
    const item = e.target;
    if(item.classList.contains('tab-item')) {
        const index = item.dataset.id - 1;

        let storageName = `destination_${index}`;
        const storageContent = get(storageName);

        if(storageContent) {
            tab.setActive(index);
            content.set(storageContent);
        }else {
            const tabData = tab.to(index);
            // 如果网速慢，就在数据真正加载完之前，先加载loading组件
            content.setLoading();
            tabData.then(data => {
                content.set(data);
                set(storageName,data);
            })
        }
    }
},false)


// 模拟点击
tabItems[0].click();