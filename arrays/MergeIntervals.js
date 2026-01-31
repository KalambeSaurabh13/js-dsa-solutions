// Merget Intervals
//  time complexity: O(n log n) Space complexity: O(n)
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let result = [];

    for (let interval of intervals) {
        if (!result.length || result[result.length - 1][1] < interval[0]) {
            result.push(interval);
        } else {
            result[result.length - 1][1] = Math.max(result[result.length - 1][1], interval[1])
        }
    }
    return result;

};
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]])) // [[1,6],[8,10],[15,18]]
console.log(merge([[1, 4], [4, 5]])) // [[1,5]]