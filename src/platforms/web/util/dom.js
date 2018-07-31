
export const domTools = {
    createElement: function (tagName) {
        const elm = document.createElement(tagName);
        if (tagName != 'select') {
            return elm;
        }
    },
    insertBefore(parentNode, newNode, referenceNode) {
        parentNode.insertBefore(newNode, referenceNode);
    },
    appendChild(node, child) {
        node.appendChild(child);
    }
};