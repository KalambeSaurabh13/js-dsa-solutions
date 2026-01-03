// Brut force  Time complexity O(n^2)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for(let i = 0; i<nums.length;i++){
    for(let j= i+1; j<nums.length; j++){
        if(nums[i]+nums[j]===target){
            return [i,j]
        }
    }
  }
};


// hash map approach  Time complexity O(n) Space complexity O(n)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = new Map();
  for(let i = 0; i<nums.length;i++){
    const need = target - nums[i];
    if(map.has(need)){
      return [map.get(need),i];
    }
    map.set(nums[i],i);
  }
};

console.log(twoSum([2,7,11,15],9)) // [0,1]
// let map = new Map();
// map.set('a',1)
// map.set('b',2)
// console.log(map.has('a')) // true
// console.log(map.get('b')) // 2
// console.log(map) // Map(2) { 'a' => 1, 'b' => 2 }
// console.log(map.size) // 2
// console.log(map.delete('a')) // true
// console.log(map) // Map(1) { 'b' => 2 }
// console.log(map.clear());
// console.log(map) // Map(0) {}
