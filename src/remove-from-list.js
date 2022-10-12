const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList(l, k) {
	let list = l;
	let x = l;
	let pre;
	while (1) {
		if (x.value === k) {
			if (x === list) { list = x.next; } // элемент первый в списке
			else { pre.next = x.next; }             // затираем элемент

			if (x.next === null) { return list; } // список закончился
			else { x = x.next; }                   // переход к следующему элементу
		} else {
			if (x.next === null) { return list; } // список закончился
			else {
				pre = x;
				x = x.next;
			}
		}
	}
}

module.exports = {
	removeKFromList
};
