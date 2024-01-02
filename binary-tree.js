/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    //Base case if tree is empty, return 0 for depth
    if (!this.root) return 0;

    let toVisitQueue = [{ node: this.root, depth: 1 }];

    while (toVisitQueue.length > 0) {
      let { node, depth } = toVisitQueue.shift();

      // Check if the node is a leaf (no left or right children)
      if (!node.left && !node.right) {
        return depth;
      }

      // Otherwise, add children to queue and increase depth by 1
      if (node.left) {
        toVisitQueue.push({ node: node.left, depth: depth + 1 });
      }
      if (node.right) {
        toVisitQueue.push({ node: node.right, depth: depth + 1 });
      }
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    // Base case if tree is empty , return 0
    if (!this.root) return 0;

    let toVisitStack = [{ node: this.root, depth: 1 }];
    let maxDepth = 0;

    while (toVisitStack.length) {
      let { node, depth } = toVisitStack.pop();

      if (!node.left && !node.right) {
        maxDepth = Math.max(maxDepth, depth);
      }

      if (node.left) {
        toVisitStack.push({ node: node.left, depth: depth + 1 });
      }
      if (node.right) {
        toVisitStack.push({ node: node.right, depth: depth + 1 });
      }
    }

    return maxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxSum = 0;

    function findMaxPath(node) {
      if (!node) return 0;

      let leftMax = Math.max(0, findMaxPath(node.left));
      let rightMax = Math.max(0, findMaxPath(node.right));

      let localMax = node.val + leftMax + rightMax;

      maxSum = Math.max(maxSum, localMax);

      return node.val + Math.max(leftMax, rightMax);
    }

    findMaxPath(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let smallestValueAboveLowerBound = null;
    function traverse(node) {
      if (node === null) {
        return;
      }
      if (
        node.val > lowerBound &&
        (smallestValueAboveLowerBound === null ||
          node.val < smallestValueAboveLowerBound)
      ) {
        smallestValueAboveLowerBound = node.val;
      }

      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return smallestValueAboveLowerBound;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {}

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {}

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {}

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
