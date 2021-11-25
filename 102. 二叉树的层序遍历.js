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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    let ans = []
    if (!root) return ans
    let num = 0
    ans.push([root.val])
    let queue = new ArrayQueue()
    if (root.left) {
        queue.push(root.left)
        num++
    }
    if (root.right) {
        queue.push(root.right)
        num++
    }
    while (queue.size()){
        here = []
        childNum = 0
        for (let i=0;i<num;i++){
            node = queue.pop()
            here.push(node.val)
            if (node.left) {
            queue.push(node.left)
            childNum++
            }
            if (node.right) {
            queue.push(node.right)
            childNum++
            }
        }
        num = childNum
        ans.push(here)
    }
    return ans
};

function ArrayQueue(){  
    var arr = [];  
        //入队操作  
    this.push = function(element){  
        arr.push(element);  
        return true;  
    }  
        //出队操作  
    this.pop = function(){  
        return arr.shift();  
    }  
        //获取队首  
    this.getFront = function(){  
        return arr[0];  
    }  
        //获取队尾  
    this.getRear = function(){  
        return arr[arr.length - 1]  
    }  
        //清空队列  
    this.clear = function(){  
        arr = [];  
    }  
        //获取队长  
    this.size = function(){  
        return arr.length;  
    }  
}