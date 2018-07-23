import { inBrowser } from './env';

export let mark;
export let measure;

if (process.env.NODE_ENV !== 'production') {
    const perf = inBrowser && window.performance;


    if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
        mark = tag => perf.mark(tag);

        measure = (name, startTag, endTag) => {
            perf.measure(name, startTag, endTag);
            console.log(perf.getEntries());

            // placeholder 哪里用到了？
            perf.clearMarks(startTag);
            perf.clearMarks(endTag);
            perf.clearMeasures(name);

        };
    }
}