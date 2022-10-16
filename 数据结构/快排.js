
let nums = [2, 1, 3, 5, 7, 0, 3, 5, 5, 5]

function quickSort(q, l = 0, r = q.length - 1) {
  if (l >= r) return;
  let p = q[l], i = l - 1, j = r + 1;

  while (i < j) {
    do i++; while (q[i] < p);
    do j--; while (q[j] > p);
    if (i < j) [q[i], q[j]] = [q[j], q[i]];
  }

  quickSort(q, l, j);
  quickSort(q, j + 1, r);
}

quickSort2(nums)

console.log(nums)


function quickSort2(nums, l = 0, r = nums.length - 1) {
  if (l >= r) return;

  let p = nums[l], i = l - 1, j = r + 1

  while (i < j) {
    do i++; while (nums[i] < p);
    do j--; while (nums[j] > p);
    if (i < j) [nums[i], nums[j]] = [nums[j], nums[i]]
  }

  quickSort2(nums, l, j)
  quickSort2(nums, j + 1, r)
}