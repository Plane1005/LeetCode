function findNthDigit(n: number): number {
    if (n<=9) return n
    let len = 1
    while (n >= len * 9 * Math.pow(10,len-1)){
        n -= len * 9 * Math.pow(10,len-1)
        len++
    }
    let add = (n-1)/len
    let rem = (n-1)%len
    let num = (Math.pow(10,len-1) + add).toString()
    return parseInt(num[rem])
};