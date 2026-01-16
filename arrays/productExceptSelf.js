/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Time complexity O(n)  Space complexity O(1)
var productExceptSelf = function(nums) {
    let result = new Array(nums.length).fill(1);

    let left = 1;
    for(let i =0 ; i<nums.length; i++){
        result[i] = left;
        left = left * nums[i]
    }

    let right = 1;
    for( let i = nums.length-1; i>=0; i--){
        result[i] = right * result[i];
        right = right * nums[i]
    }
    return result;

};
console.log(productExceptSelf([1,2,3,4])) // [24,12,8,6]