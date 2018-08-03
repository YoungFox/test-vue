
export const domTools = {
    createElement(tagName) {
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
    },
    parentNode(node){
        return node.parentNode;
    },
    removeChild(parent, child){
        parent.removeChild(child);
    },
    createTextNode(text){
        const elm = document.createTextNode(text);
        return elm;
    },
    setTextContent(node, text){
        //textContent 不会触发重排，厉害
        node.textContent = text;
    },
    nextSibling(node){
        return node.nextSibling();
    }
};