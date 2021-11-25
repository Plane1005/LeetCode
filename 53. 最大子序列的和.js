/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let max = nums[0]
    let dp = new Array(nums.length).fill(0)
    dp[0] = max
    for (let i=1;i<dp.length;i++){
        dp[i] = Math.max((dp[i-1]+nums[i]),nums[i])
        max = Math.max(dp[i],max)
    }
    return max
};