/**
 * @param {string} s
 * @return {string}
 */
 // zero z two w four u six x eight e 
 // three h five f seven s 
 // one o nine i
var originalDigits = function(s) {
    let num = new Array(10).fill(0)
    map = new Map()
    for (let i=0;i<s.length;i++){
        map.set(s[i],(map.get(s[i])||0)+1)
    }
    num[0] = map.get('z') || 0
    num[2] = map.get('w') || 0
    num[4] = map.get('u') || 0
    num[6] = map.get('x') || 0
    num[8] = map.get('g') || 0
    num[1] = (map.get('o') || 0) - num[2] - num[0] - num[4]
    num[3] = (map.get('h') || 0) - num[8]
    num[5] = (map.get('f') || 0) - num[4]
    num[7] = (map.get('s') || 0) - num[6]
    num[9] = (map.get('i') || 0) - num[6] - num[8] - num[5]
    ans = ""
    for (let i=0;i<10;i++){
        // console.log(i,num[i])
        for (let j=0;j<num[i];j++) ans += i.toString()
    }
    return ans
};