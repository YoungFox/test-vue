// 每个 Vue 实例都会代理其 data 对象里所有的属性：
var data = { a: 1 }
var vm = new Vue({
  data: data
})
console.log(vm.a === data.a);
// -> true

// 设置属性也会影响到原始数据
vm.a = 2;
console.log(data.a);

// 反之亦然
data.a = 3;
console.log(vm.a);