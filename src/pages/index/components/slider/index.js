import './slider.css';
import 'swiper/swiper-bundle.min.css';
import Swiper from 'swiper/swiper-bundle.min';
import config,{SWIPER_CLASS, URL} from './config';

import render from './slider.art';
import {getData, getDataDelay} from 'api/getData';

const url = URL;

getData(url).then(data => {
    document.querySelector('.slider-layout').innerHTML = render({
        ...config,
        ...{
            imgs:data
        }
    });
    new Swiper (SWIPER_CLASS, config);   
}).catch(err => {
    console.log(err);
})

     