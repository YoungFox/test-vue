// @flow
import { makeMap } from 'shared/util';

const isPlainTextElement = makeMap('script,style,textarea', true);

const attribute = /^.+?(?=\/?>)/;

const ncname = '[a-zA-Z_][\\w\\-\\.]*';
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

export function parseHTML(html: string, options: Object) {
    // return makeMap('script,style');
    let last, lastTag;
    let index = 0;
    let stack = [];
    while (html) {
        last = html;
        if (!isPlainTextElement(last)) {
            let textEnd = html.indexOf('<');

            if (textEnd === 0) {
                const startTagMatch = parseStartTag();
                if (startTagMatch) {
                    handleStartTag(startTagMatch);
                }

                const endTagMatch = parserEndTag();

                if (endTagMatch) {
                    let { tagName, start, end } = endTagMatch;

                    handleEndTag(tagName, start, end);
                }
            }

            if (textEnd > 0) {
                let text;
                text = html.substring(0, textEnd);
                advance(textEnd);

                if(text && options.text){
                    options.text(text);
                }
            }
        }
    }



    function advance(n) {
        index += n;
        html = html.substring(n);
    }

    function parseStartTag(): Object {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                start: index,
                attrs: []
            };
            advance(start[0].length);
            let end, attr;

            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length);
            }

            if (end) {
                advance(end[0].length);
                match.end = index;
                return match;
            }
        }
    }

    function handleStartTag(match) {
        let tagName = match.tagName;
        stack.push({ tagName });
        lastTag = tagName;

        if (options.start) {
            options.start(tagName);
        }

    }

    function parserEndTag(): Object {
        const end = html.match(endTag);
        if (end) {
            let match = {
                tagName: end[1],
                start: index
            };
            advance(end[0].length);
            match.end = index;
            return match;
        }
    }

    function handleEndTag(tagName, start, end) {
        let pos;
        if (tagName) {
            for (pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos].tagName === tagName) {

                    break;
                } else {
                    console.log(`${stack[pos].tagName}未闭合`);
                }
            }
        } else {
            pos = 0;
        }

        stack.length = pos;
        // lastTag = pos && stack[pos - 1];

        if(options.end){
            options.end();
        }
    }
}

