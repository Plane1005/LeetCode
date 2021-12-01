function maxPower(s: string): number {
    if (s.length === 1) return 1
    let arr = []
    let ans = 1
    arr[0] = 1
    for (let i=1;i<s.length;i++){
        arr[i] = s[i] === s[i-1] ? arr[i-1]+1 : 1
        ans = Math.max(ans,arr[i])
    }
    return ans
};