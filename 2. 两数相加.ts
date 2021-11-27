/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if (!l1 && !l2) return null
    let addOne: number = 0
    let ans: ListNode = new ListNode()
    let next: ListNode = new ListNode()
    ans.next = next
    while (l1 || l2){
        let val: number = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + addOne
        addOne = 0
        if (val >= 10) {
            val-=10
            addOne = 1
        }
        next.val = val
        l1 = l1?.next
        l2 = l2?.next
        if (l1 || l2) {
            next.next = new ListNode()
            next = next.next
        }
    }
    if (addOne) {
        next.next = new ListNode(1)
    }
    return ans.next
};