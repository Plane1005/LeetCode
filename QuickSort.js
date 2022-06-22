Array.prototype.jetSort = function () {
	function _sort(arr, left, right) {
		if (left >= right) return
		let i = left,
			j = right,
			temp = arr[left]
		while (i < j) {
			while (arr[j] > temp && i < j) {
				j--
			}
			arr[i] = arr[j]
			while (arr[i] < temp && i < j) {
				i++
			}
			arr[j] = arr[i]
		}
		arr[i] = temp
		_sort(arr, left, i - 1)
		_sort(arr, i + 1, right)
	}
	if (this.length > 1) _sort(this, 0, this.length - 1)
}

arr = [2, 3, 1, 4, 8, 7, 9, 6]
arr.jetSort()
console.log(arr);
