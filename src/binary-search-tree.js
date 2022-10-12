const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
	constructor() {
		this.rootNode = undefined;
	}

	findNode(data) { // find a node with a value - data
		return function find(node, parentNode) {
			if (node.data > data) {
				if (node.left === undefined) {
					return {
						node,
						parentNode
					};
				} else {
					return find(node.left, node);
				}
			} else if (node.data < data) {
				if (node.right === undefined) {
					return {
						node,
						parentNode
					};
				} else {
					return find(node.right, node);
				}
			} else {
				return {
					node,
					parentNode
				}; // node contains the required data
			}
		}
	}

	findMin(node, parentNode) { // find the node with the minimum value
		if (node.left === undefined) {
			return {
				node,
				parentNode
			};
		} else {
			return this.findMin(node.left, node);
		}
	}

	findMax(node, parentNode) { // find the node with the minimum value
		if (node.right === undefined) {
			return {
				node,
				parentNode
			};
		} else {
			return this.findMax(node.right, node);
		}
	}

	removeNode(node, parentNode) {
		// deleting a node without descendants
		if (node.left === undefined && node.right === undefined) {

			if (node === parentNode) { node = undefined; return; }

			if (parentNode.left && parentNode.left === node) {
				parentNode.left = undefined;
			} else { parentNode.right = undefined; }
			return;
		}

		// deleting a node with one child
		if (node.left === undefined) {
			if (node === parentNode) { this.rootNode = node.right; return; }

			if (parentNode.left && parentNode.left === node) {
				parentNode.left = node.right;	// node comes from the left branch of the parent node
			} else {
				parentNode.right = node.right;	// node comes from the right branch of the parent node
			}
		} else if (node.right === undefined) {
			if (node === parentNode) { this.rootNode = node.left; return; }

			if (parentNode.left && parentNode.left === node) {
				parentNode.left = node.left;		// node comes from the left branch of the parent node
			} else {
				parentNode.right = node.left;	// node comes from the right branch of the parent node
			}
		}
	}

	// -----------------------

	root() {
		return this.rootNode === undefined ? null : this.rootNode;
	}

	add(data) {
		if (this.rootNode === undefined) {
			this.rootNode = new Node(data);
			return null;
		}

		let a = this.findNode(data)(this.rootNode, this.rootNode).node;

		a.data > data ? a.left = new Node(data) : a.right = new Node(data);
	}

	has(data) {
		if (this.rootNode === undefined) {
			return false;
		}
		let a = this.findNode(data)(this.rootNode, this.rootNode).node;
		return a.data === data;
	}

	find(data) {
		let a = this.findNode(data)(this.rootNode, this.rootNode).node;
		return a.data === data ? a : null;
	}

	remove(data) {
		if (this.rootNode === undefined) { return false }

		let a = this.findNode(data)(this.rootNode, this.rootNode);
		let node = a.node;
		let parentNode = a.parentNode;

		// deleting a node with no children, or a node with one child
		if ((node.left === undefined && node.right === undefined) ||
			(node.left === undefined || node.right === undefined)) {
			this.removeNode(node, parentNode);
			return;
		}

		// deleting a node with two children
		// the minNode value of the right subtree is stored in the new node				
		let minNode = this.findMin(node.right, node);

		if (minNode.node.right === undefined) { // if the node with the minimum value has No right child
			node.data = minNode.node.data;

			minNode.parentNode.left === minNode.node;

			this.removeNode(minNode.node, minNode.parentNode);
		} else {	// if the node with the minimum value Has a right child
			node.data = minNode.node.data;

			if (node.right === minNode.node) {
				minNode.parentNode.right = minNode.node.right;
			} else {
				minNode.parentNode.left = minNode.node.right;
			}
		}
	}

	min() {
		if (this.rootNode === undefined) {
			return null;
		}

		let a = this.findMin(this.rootNode, this.rootNode)
		return a.node.data;
	}

	max() {
		if (this.rootNode === undefined) {
			return null;
		}

		let a = this.findMax(this.rootNode, this.rootNode)
		return a.node.data;
	}
}

let Node = function (data) {
	this.data = data;
	this.left = undefined;
	this.right = undefined;
}

module.exports = {
	BinarySearchTree
};