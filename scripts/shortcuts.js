export function queryAndRun(selector, run, parent = document) {
    parent = (!parent) ? document : parent;
    let elements = parent.querySelectorAll(selector);
    if (!elements) return;

    if ([...elements]) [...elements].forEach(element => run(element));
    else run(elements);
}

export function queryAndAddListener(selector, event, run, parent = document) {
    queryAndRun(selector, (element) => {
        element.addEventListener(event, e => run(element, e))
    }, parent);
}

export function formatLine(line) {
    if (!line) return line;
    if (line == '<br>') return line;

    function apply_formatting(line, formatting) {
        return `<span class="format-${formatting}">${line}</span>`
    }

    if (line.includes('# ')) return(apply_formatting(line, 'comment'));
    else {
        ['data', 'modify', 'get', 'merge', 'storage',
        'entity', 'block', 'set', 'get', 'from',
        'value', 'execute', 'if', 'score', 'matches',
        'run', 'function', 'scoreboard', 'players', 'objectives', 'remove', 'add', 'set'].forEach(format => {
            if (line.includes(format + ' ')) line = line.replace(format + ' ', apply_formatting(format + ' ', 'command'));
        });

        ['@s', '@e', '@a', '@r', '@p', '#Counter'].forEach(format => {
            if (line.includes(format + ' ')) line = line.replace(format + ' ', apply_formatting(format + ' ', 'selector'));
        });

        return line;
    }
}