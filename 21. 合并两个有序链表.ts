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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (!list1 || !list2){
        if (!list1) return list2
        return list1
    }
    let node = new ListNode()
    let ans = node
    while (list1 && list2){
        if (list1.val > list2.val){
            ans.val = list2.val
            list2 = list2.next
        }else{
            ans.val = list1.val
            list1 = list1.next
        }
        if (list1 && list2){
            let temp = new ListNode()
            ans.next = temp
            ans = ans.next
        }
    }
    ans.next = !list1 ? list2 : list1
    return node
};