/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (!head) return null
    let curr = head
    // newHead = head // 错误，会导致两个节点形成环
    newHead = null
    while (curr){
        temp = curr.next
        curr.next = newHead
        newHead = curr
        curr = temp
    }
    return newHead
};
