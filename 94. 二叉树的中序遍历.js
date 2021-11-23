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
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let num = []
    function middleTree(root){
        if (!root) return 
        if (root.left) middleTree(root.left)
        num.push(root.val)
        if (root.right) middleTree(root.right)
    }
    middleTree(root)
    return num
};