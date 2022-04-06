[...document.getElementsByClassName('property')].forEach((property) => {
    property.addEventListener('input', () => {insert_var(property, false)});
    insert_var(property, true);
});

function insert_var(property, is_placeholder) {
    let value = (is_placeholder) ? property.getAttribute('placeholder') : property.value;
    [...property.parentElement.parentElement.getElementsByClassName('insert')].forEach((insert) => {
        if (insert.dataset.var == property.getAttribute('id')) {
            insert.textContent = value;
        }
    });
}

const search_docs = document.getElementById('search_docs');
const category_lists = [...document.getElementsByClassName('category_list')];

if (search_docs) {
    search_docs.addEventListener('input', () => {
        clear_search_results(search_docs.nextSibling);
        if (!search_docs.value) {
            category_lists.forEach((list) => list.classList.remove('dimmed'));
        } else {
            category_lists.forEach((list) => list.classList.add('dimmed'));
            [...search_docs.parentElement.getElementsByTagName('a')].forEach((button) => {
                if (button.children[1].textContent.toLowerCase().includes(search_docs.value.toLowerCase())) {
                    search_docs.nextSibling.after(button.cloneNode(true));
                }
            });
        }
    });
}

function clear_search_results(search_result) {
    if (search_result == null || search_result.tagName == 'HR') return
    clear_search_results(search_result.nextSibling);
    if (search_result.tagName == 'LABEL') return
    search_result.remove();
}

[...document.getElementsByClassName('code-block')].forEach(code_block => {
    [...code_block.children].forEach(line => {
        line.innerHTML = format(line.innerHTML)
    });
});

function format(line) {
    if (line.includes('#')) {
        return line;
    }

    let output = line;

    // if (output.includes('data ')) {
    //     output = output.replace('data ', '<span class="format-command">data </span>');

    //     output = output.replace('modify ', '<span class="format-command">modify </span>');
    //     output = output.replace('get ', '<span class="format-command">get </span>');
    //     output = output.replace('merge ', '<span class="format-command">merge </span>');
    //     output = output.replace('remove ', '<span class="format-command">merge </span>');

    //     output = output.replace('entity ', '<span class="format-arg">entity </span>');
    //     output = output.replace('block ', '<span class="format-arg">block </span>');
    //     output = output.replace('storage ', '<span class="format-arg">storage </span>');

    //     output = output.replace('set from ', '<span class="format-command">set from </span>');
    //     output = output.replace('set value ', '<span class="format-command">set value </span>');
    //     output = output.replace('append value ', '<span class="format-command">append value </span>');
    //     output = output.replace('append from ', '<span class="format-command">append from </span>');
    // }

    // if (output.includes('execute ')) {
    //     output = output.replace('execute ', '<span class="format-command">execute </span>');
    //     output = output.replace('run ', '<span class="format-command">run </span>');
    //     output = output.replace('if ', '<span class="format-command">if </span>');
    //     output = output.replace('unless ', '<span class="format-command">unless </span>');
    //     output = output.replace('store ', '<span class="format-command">store </span>');
    //     output = output.replace('result ', '<span class="format-command">result </span>');
    //     output = output.replace('score ', '<span class="format-arg">score </span>');
    //     output = output.replace('data ', '<span class="format-arg">data </span>');
    //     output = output.replace('matches ', '<span class="format-selector">matches </span>');
    // }

    // if (output.includes('function ')) {
    //     output = output.replace('function ', '<span class="format-command">function </span>');
    // }
    // if (output.includes('tag ')) {
    //     output = output.replace('tag ', '<span class="format-command">tag </span>');
    //     output = output.replace('add ', '<span class="format-arg">add </span>');
    //     output = output.replace('remove ', '<span class="format-arg">remove </span>');
    // }
    // if (output.includes('scoreboard ')) {
    //     output = output.replace('scoreboard ', '<span class="format-command">scoreboard </span>');
    //     output = output.replace('players ', '<span class="format-command">players </span>');
    //     output = output.replace('remove ', '<span class="format-command">remove </span>');
    //     output = output.replace('set ', '<span class="format-command">set </span>');
    //     output = output.replace('add ', '<span class="format-command">add </span>');
    // }

    return output;
}