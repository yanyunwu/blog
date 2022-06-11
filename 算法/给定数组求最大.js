
/**
 * 字节面试题，求大佬们看看，数组A中给定可以使用的1~9的数，返回由A数组中的元素组成的小于n的最大数。
 * 例如A={1, 2, 4, 9}，x=2533，返回2499
 * 兄弟们这个题怎么做呀，或者给一下有没有力扣类似的题的链接
 * 作者：Damon
 * 链接：https://leetcode.cn/circle/discuss/fbhhev/
 * 来源：力扣（LeetCode）
 * 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/

let nums = [1, 2, 4, 9];
let max = 0;
let group = []

function getAll(group) {
  let len = group.length - 1;
  let all = 0
  for (let i of group) {
    all += i * 10 ** len--
  }
  return all
}

function test(nums, target) {


  let hs = function (index) {
    if (group.length) {
      let cur = getAll(group)
      if (cur > max && cur < target) max = cur
    }
    if (index >= nums.length) return;

    for (let i = 0; i < nums.length; i++) {
      // if (i === index) continue;
      group.push(nums[i])
      hs(index + 1)
      group.pop()
    }
  }

  hs(0)


  return max

}


console.log(test(nums, 2533));
// console.log(getAll([1, 2, 4, 9]));