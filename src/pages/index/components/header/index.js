// 公共的头部样式和功能,封装的一个类
import Header from 'components/header';
// 引入子组件
import 'components/searchbox';

var indexScrollEl = document.getElementById('index-page');
var headerEl = document.querySelector('.header');

new Header(headerEl,0,indexScrollEl);