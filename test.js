// 每个 Vue 实例都会代理其 data 对象里所有的属性：
var data = { a: 1 }
var vm = new Vue({
  data: data,
  created: function (){
  	console.log('a is:' + this.a);
  }
})
console.log(vm.a === data.a);
// -> true

// 设置属性也会影响到原始数据
vm.a = 2;
console.log(data.a);

// 反之亦然
data.a = 3;
console.log(vm.a);

var data1 = {a: 1};

var vm1 = new Vue({
	el: '#example',
	data: data1
});

console.log(vm1.$data === data1);
console.log(vm1.$el === document.getElementById('example'));

vm1.$watch('a',function(newVal, oldVal){
	console.log(newVal);
	console.log(oldVal);
})

var vm2 = new Vue({
	el: '#example2',
	data:{
		message: 'Hello'
	},
	computed:{
		reversedMessage: function (){
			return this.message.split('').reverse().join('');
		}
	}
});

// computed getter setter
var vm3 = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: {
    	get: function (){
      		return this.firstName + ' ' + this.lastName
    	},
    	set: function (newValue){
    		var name = newValue.split(' ');
    		this.firstName = name[0];
    		this.lastName = name[name.length - 1];
    	}
    }
  }
})
