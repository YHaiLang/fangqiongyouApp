import './backtop.css';
import 'iconfonts/iconfont.css';

// 常量
var CHANGED_CLASS = 'back-hiden';
// 状态
var INIT = 'init';
var CHANGED = 'changed';

// 将功能封装成一个类，方便复用
// 需要接收的参数：
// 具体操作的DOM；滚动的临界点；卷动的DOM；监听卷动事件的DOM
class Backtop {
    constructor(el, point, scrollContainer, event = scrollContainer) {
        // 处理参数
        this.el = el;
        this.point = point;
        this.scrollContainer = scrollContainer;
        this.event = event;

        // 设置初始状态
        this.setState(INIT);

        // 绑定事件
        this.bindEvent();
    }
    // 事件处理函数
    bindEvent() {
        // 事件监听
        this.event.addEventListener('scroll', () => {
            // 条件判断，添加和移除类名
            if (this.needChange()) {
                // console.log('changed');
                this.setState(CHANGED);
                this.change();
            } else if (this.needReset()) {
                // console.log('reset');
                this.setState(INIT);
                this.reset();
            }
        }, false);

        this.el.onclick = () => {
            this.scrollTo();
        }
    }
    scrollTo(top=0,left=0) {
        this.scrollContainer.scrollTo({
            top,
            behavior:'smooth'
        })
    }
    // 重置
    reset() {
        this.el.classList.add(CHANGED_CLASS);
    }
    // 是否需要重置
    needReset() {
        return this.state == CHANGED && this.scrollContainer.scrollTop <= this.point;
    }
    // 变化
    change() {
        this.el.classList.remove(CHANGED_CLASS);
    }
    // 是否需要变化
    needChange() {
        return this.state == INIT && this.scrollContainer.scrollTop > this.point;
    }
    // 设置状态
    setState(state) {
        this.state = state;
    }
}

export default Backtop;