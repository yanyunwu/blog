

function ObjectFactory() {
    var obj = new Object();
    var Constroctor = Array.prototype.shift.call(arguments);
    obj.__proto__ = Constroctor.prototype;
    var ret =  Constroctor.apply(obj, arguments);
    return typeof ret === "object"?ret:obj;
}


function Fun(name){
    this.name = name
}

Fun.prototype.sayHello = function(){
    console.log('hello!');
}

var v = ObjectFactory(Fun, '小明');
console.log(v.name);
v.sayHello();