// JSON.stringify(obj1)时，如果对象内的键值对的添加顺序不同，那么也会返回false，即使内容相同
// function findAnagrams(s: string, p: string): number[] {
//     let ans: number[] = []
//     let len = p.length
//     let obj2 = {}
//     for (let i=0;i<len;i++){
//         obj2[p[i]] = 1
//     }
//     let obj1 = {}
//     for (let i=0;i<s.length;i++){
//         if (i-(len-1)>0) delete obj1[s[i-(len-1)]]
//         obj1[s[i]] = obj1[s[i]] ? obj1[s[i]] +1 : 1
//         if (JSON.stringify(obj1)===JSON.stringify(obj2)) ans.push(i-(len-1))
//         console.log(obj1)
//     }
//     return ans
// };

function findAnagrams(s: string, p: string): number[] {
    let ans: number[] = []
    let len = p.length
    let obj1 = {}
    let obj2 = {}
    for (let i=0;i<len;i++){
        obj1[p[i]] = 0 // 初始化确定加入位置
        obj2[p[i]] = obj2[p[i]] ? obj2[p[i]] +1 : 1
    }
    for (let i=0;i<s.length;i++){
        if (obj2[s[i]]) obj1[s[i]] += 1
        if (JSON.stringify(obj1)===JSON.stringify(obj2)) ans.push(i-(len-1))
        if (i-(len-1)>=0) if (obj1[s[i-(len-1)]]) obj1[s[i-(len-1)]] -= 1
    }
    return ans
};