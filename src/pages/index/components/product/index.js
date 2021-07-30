import './product.css';
import render from './items.art';
import { getData,getDataDelay } from 'api/getData';

const url = 'https://www.imooc.com/api/mall-wepApp/index/product?icode=J74F7D3A73EDF1571';

const productListEl = document.querySelector('.product-list');

getData(url).then(data => {
    productListEl.innerHTML = render({
        items:data
    })
}).catch(err => {
    console.log(err);
})
