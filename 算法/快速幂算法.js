/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// 递归版本
/**
 * 对于n次方，先求Math.floor(n / 2)次方
 * n / 2不为整则多乘一个x
*/
var myPow = function (x, n) {

  let inner = (x, n) => {
    if (n === 0) return 1
    if (n === 1) return x
    let y = inner(x, Math.floor(n / 2))
    return n % 2 === 0 ? y * y : y * y * x
  }


  return n >= 0 ? inner(x, n) : 1 / inner(x, -n)
};