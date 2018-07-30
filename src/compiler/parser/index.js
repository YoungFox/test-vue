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
            if(!root){
                root = element;
            }

            if(currentParent){
                currentParent.children.push(element);
                element.parent = currentParent;
            }

            currentParent = element;
            stack.push(element);
            console.log('ast',root);

        },

        text(text: string){
            const children = currentParent.children;
            if(text){
                children.push({
                    type: 2,
                    text
                });
            }
        },
        end(){
            const element = stack[stack.length - 1];   
            stack.pop();
            currentParent = element.parent;
        }
    });
}