import Backtop from 'components/backtop';

var scrollContainer = document.querySelector('.content-layout');
var backtop = document.querySelector('.backtotop');

new Backtop(backtop,scrollContainer.offsetHeight,scrollContainer)