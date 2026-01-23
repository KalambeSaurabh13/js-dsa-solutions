// SubArray Sum Equals K

// time complexity: O(n) Space complexity: O(n)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let map  = new Map();
    map.set(0,1);
    let sum = 0, count=0;
    for(let num of nums){
        sum = sum + num;
        if(map.has(sum-k)){
            count+= map.get(sum-k)
        }
        map.set(sum, (map.get(sum)||0)+1);
    }
    return count
};

console.log(subarraySum([1,1,1],2)) // 2
console.log(subarraySum([1,2,3],3)) // 2