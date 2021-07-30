import Backtop from "../../../../components/backtop";'components/backtop';

var scrollContainer = document.querySelector('.index-layout');
var backEl = scrollContainer.querySelector('.backtotop');

new Backtop(backEl,window.innerHeight,scrollContainer);