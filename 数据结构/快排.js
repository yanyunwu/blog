
let nums = [2, 1, 3, 5, 7, 0, 3, 5, 5, 5]

function quickSort(nums, left = 0, right = nums.length - 1) {
  if (!nums.length || left >= right) return;
  let pivot = nums[left];
  let pIndex = left;
  let l = left, r = right
  while (l < r) {
    while (l < r && nums[r] >= pivot) r--
    nums[pIndex] = nums[r]
    pIndex = r
    while (l < r && nums[l] < pivot) l++
    nums[pIndex] = nums[l]
    pIndex = l
  }

  nums[pIndex] = pivot

  quickSort(nums, left, pIndex - 1)
  quickSort(nums, pIndex + 1, right)
}

quickSort(nums)
console.log(nums);