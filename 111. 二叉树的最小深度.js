/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    function minDeep(root,deep){
        if (!root) return deep // 该节点为空 返回深度
        deep++ //节点不为空，增加深度
        if (!root.left && !root.right) return deep // 如果是叶子节点，也返回深度
        if (root.left) var left = minDeep(root.left,deep) 
        if (root.right) var right = minDeep(root.right,deep)
        return Math.min(left ? left : 9999999,right ? right : 99999999) // 寻找左右子树中存在且深度较小的子树
    }
    return minDeep(root,0)
};