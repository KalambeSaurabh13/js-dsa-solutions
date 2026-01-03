// Time complexity O(n)  Space complexity O(1)


/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for(price of prices){
        if(price<minPrice){
            minPrice = price
        }else{
            maxProfit = Math.max(maxProfit,price - minPrice)
        }
    }
    return maxProfit;
};
console.log(maxProfit([7,1,5,3,6,4])) // 5