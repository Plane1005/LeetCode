function restoreIpAddresses(s: string): string[] {
    let ans = []
    if (s.length <= 3) return ans
    const insertPoint = (s: string, num: number) => {
        return s.substring(0,num) + "." + s.substring(num)
    }
    const dfs = (s: string, begin: number, num: number) => {
        if (num === 4){ 
            // console.log(s)
            if (begin === s.length) {
                ans.push(s)
                return 
            }
            else return 
        }
        if (num === 3){
            // console.log(s)
            if (s[begin] === '0') {
                dfs(s,begin+1,num+1)
                return 
            }
            else if (s.length - begin > 3) return
            else if ((parseInt(s.substring(begin)) >= 0 && parseInt(s.substring(begin)) <= 255)) {
                ans.push(s)
                return
            }
        }
        for (let i=1;i<=3;i++){
            if (parseInt(s.substring(begin,begin+i)) === 0) {
                dfs(insertPoint(s,begin+1),begin+2,num+1)
                break
            }
            if ((parseInt(s.substring(begin,begin+i)) > 0 && parseInt(s.substring(begin,begin+i)) <= 255)) dfs(insertPoint(s,begin+i),begin+i+1,num+1)
        }
    }
    dfs(s,0,0)
    return ans
};