/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
  // 中序遍历回文串解法失败
// var isSymmetric = function(root) {
//     if (!root) return true
//     let arr1 = []
//     let arr2 = []
//     frontTree(root.left,arr1,true)
//     frontTree(root.right,arr2,false)
//     // console.log(arr1,arr2)
//     if (arr1.toString() === arr2.toString() && arr1.length === arr2.length) {
//         return true
//     }else{
//         return false
//     }
// };

// var frontTree = function(root,arr,flag){
//     // if (root === null || root.left || root.right) {
//     //     flag ? arr.push("#") : arr.unshift("#")
//     // }
//     if (root.left) frontTree(root.left,arr,flag)
//     flag ? arr.push(root.val) : arr.unshift(root.val)
//     if (root.right) frontTree(root.right,arr,flag)
// }

function check(p: TreeNode | null,q: TreeNode | null): boolean{
    if (!p && !q) return true
    if (!p || !q) return false
    if (p.val === q.val && check(p.left,q.right) && check(q.right,p.left)){
        return true
    }
    return false
}

function isSymmetric(root: TreeNode | null): boolean {
    return check(root,root)
};