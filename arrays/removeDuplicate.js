/**
 * @param {number[]} nums
 * @return {number}
 */
// Time complexity O(n)  Space complexity O(1)
var removeDuplicates = function(nums) {
    let slow = 0;
    for(let fast = 0; fast<nums.length; fast++){
        if(nums[fast]!==nums[fast-1]){
            nums[slow]= nums[fast];
            slow++
        }
    }
    return slow
};
console.log(removeDuplicates([1,1,2])) // 2