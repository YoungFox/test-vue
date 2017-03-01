# test-vue

在底层的实现上， Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，在应用状态改变时， Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。

模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。
你不应该在模板表达式中试图访问用户定义的全局变量。

计算属性是基于它的依赖缓存



debounce:某事件触发，会在一定间隔之后执行具体行为，如果持续触发事件，则此行为不会执行，直到事件停止超过一定间隔
throttle:只会算距离上次函数执行的间隔是否大于阈值，如冷却

input 中输入文字自动发送 ajax 请求进行自动补全： debounce
resize window 重新计算样式或布局：debounce
mouseleave 时隐藏二级菜单：debounce，并合理使用 cancel 方法
scroll 时更新样式，如随动效果：throttle