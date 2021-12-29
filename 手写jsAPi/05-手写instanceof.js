// 手写instanceof
function Instanceof(A, B) {
    let pro = B.prototype;
    A = A.__proto__;
    // A = Object.getPrototypeOf(A); // ES6推荐
    while (true) {
        if (!A) return false;
        if (A === pro) return true;
        A = A.__proto__;
    }
}