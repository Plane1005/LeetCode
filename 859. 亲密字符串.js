/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var buddyStrings = function(s, goal) {
    if ((s.length !== goal.length) || (s.length ===1)) return false
    let flag = false
    let where = []
    for (i=0;i<s.length;i++){
        if (s[i] != goal[i])  where.push(i)
    }
    if (where.length === 2 && s[where[0]] === goal[where[1]] && s[where[1]] === goal[where[0]]) flag = true
    if (where.length === 0) flag = new Set(s.split('')).size < s.length
    return flag
};