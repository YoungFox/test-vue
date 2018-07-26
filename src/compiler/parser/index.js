// @flow
import { parseHTML } from './html-parser';

export function createASTElement(tag: string, attrs: Array<any>, parent: ASTElement): ASTElement {
    return {
        type: 1,
        tag,
        attrsList: attrs,
        parent,
        children: []
    };
}

export function parse(template): any {
    const stack = [];
    let currentParent = null;
    let root;

    return parseHTML(template, {
        start(tag) {
            let element = createASTElement(tag);
            console.log(element);

            if(!root){
                root = element;
            }

            if(currentParent){
                currentParent.children.push(element);
                element.parent = currentParent;
            }

            currentParent = element;
            stack.push(element);
            console.log('ast',stack);

        }
    });
}