// @flow
import { makeMap } from 'shared/util';

const isPlainTextElement = makeMap('script,style,textarea', true);

const attribute = /^.+?(?=\/?>)/;

const ncname = '[a-zA-Z_][\\w\\-\\.]*';
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

export function parseHTML(html, options) {
    // return makeMap('script,style');
    console.log(html);
    let last, lastTag;
    let index = 0;
    let stack = [];

    while (html) {
        last = html;

        if (!isPlainTextElement(last)) {
            let textEnd = html.indexOf('<');

            if (textEnd === 0) {
                const startTagMatch = parseStartTag();
                // console.log(startTagMatch);
                handleStartTag(startTagMatch);
            }
        }
        break;
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
                // console.log(attr);
                // break;
            }

            if(end){

                advance(end[0].length);
                match.end = index;
                return match;
            }
        }
    }
    function handleStartTag(match) {
        let tagName = match.tagName;
        stack.push({ tagName: tagName });
        lastTag = tagName;

        if(options.start){
            options.start(tagName);
        }

    }
}

