/**
 * @param {number[]} nums
 * @return {number}
 */
// Time complexity O(n)  Space complexity O(1)
var maxSubArray = function(nums) {
    let currentSum = nums[0];
    let maxSum = nums[0];

    for(let i = 1; i<nums.length; i++){
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
};
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])) // 6