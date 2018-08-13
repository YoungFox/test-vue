// @flow
import { parseHTML } from './html-parser';
import { parseText } from './text-parser';
import { addHandler } from '../helpers';
const onReg = /^@|^v-on:/;


export function createASTElement(tag: string, attrs: Array<any>, parent: ASTElement): ASTElement {
    return {
        type: 1,
        tag,
        attrsList: attrs,
        parent,
        children: []
    };
}

function processAttrs(el) {
    let list = el.attrsList;

    for (let i of list) {
        let match = i.name.match(onReg);
        if (match) {
            addHandler(el, i.name.replace(match[0],''), i.value);
        }
    }
}

export function parse(template): any {
    const stack = [];
    let currentParent = null;
    let root;

    parseHTML(template, {
        start(tag, attrs) {
            let element = createASTElement(tag, attrs);
            if (!root) {
                root = element;
            }

            if (currentParent) {
                currentParent.children.push(element);
                element.parent = currentParent;
            }
            processAttrs(element);
            currentParent = element;
            stack.push(element);
        },

        text(text: string) {
            const children = currentParent.children;

            // 提取表达式
            let { expression } = parseText(text);

            if (expression) {
                children.push({
                    type: 2,
                    text,
                    expression
                });

            } else if (text != ' ') {
                children.push({
                    type: 3,
                    text
                });
            }
        },
        end() {
            const element = stack[stack.length - 1];
            stack.pop();
            currentParent = element.parent;
        }
    });
    return root;
}