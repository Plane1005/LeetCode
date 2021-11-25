/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    if (!head.next) return null
    let fast = head
    first = false
    for (let i=0;i<n;i++){
        if (fast.next) fast = fast.next
        else first = true
    }
    if (first) return head.next
    let slow = head
    let node = slow
    while (fast.next){
        fast = fast.next
        slow = slow.next
    }
    if (n!=1) slow.next = slow.next.next
    else slow.next = null
    return node
};