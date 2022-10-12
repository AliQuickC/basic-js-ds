const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
	constructor() {
		this.list = null;
	}

	goToEndList(list) {
		let x = list;
		while (1) {
			if (x.next === null) { return x; }
			else { x = x.next; }
		}
	}

	getUnderlyingList() {
		return this.list;
	}

	enqueue(value) {
		if (this.list === null) { this.list = new ListNode(value); }
		else {
			this.goToEndList(this.list).next = new ListNode(value);
		}
	}

	dequeue() {
		let x = this.list.value;
		this.list = this.list.next;
		return x;
	}
}

let ListNode = function (x) {
	this.value = x;
	this.next = null;
}

module.exports = {
	Queue
};
