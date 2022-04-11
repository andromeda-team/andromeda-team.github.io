import { queryAndRun, queryAndAddListener, formatLine } from "./shortcuts.js";

//  Fix for mobile devices, so body tag never overflows
function setViewportUpdates() {
    function update() {
        document.documentElement.style.setProperty('height', `${window.innerHeight}px`);
        if (window.innerWidth > 960) document.body.classList.add('sidebar-triggered');
        else document.body.classList.remove('sidebar-triggered');
    }

    window.addEventListener('resize', _ => {
        update();
    });
    update();
}
setViewportUpdates();


// Defaults
queryAndRun('.js-defaults', (element) => {
    if (document.URL.includes(element.dataset.href || element.href)) {
        element.classList.add('focus');
        if (element.parentElement.tagName.toLowerCase() == 'label') element.parentElement.previousElementSibling.classList.add('directory-triggered');
    }
});


// Links to articles:
queryAndRun('article', (element) => {
    let header = element.getElementsByTagName('h1');
    if (header[0]) {
        let link = document.createElement('a');
        link.href = '#' + element.id;
        var icon;
        queryAndRun('aside', (aside) => {
            icon = aside.lastElementChild.cloneNode(true);
            icon.style.removeProperty('display');
        });
        link.appendChild(icon);
        header[0].insertBefore(link, header[0].children[0]);
    }
});


// Sidebar triggers
queryAndAddListener('.js-sidebar-trigger', 'click', (element, _) => {
    let classes = document.body.classList;
    if (classes.contains('sidebar-triggered')) classes.remove('sidebar-triggered');
    else classes.add('sidebar-triggered');
});

document.body.addEventListener('click', event => {
    if (document.body.classList.contains('sidebar-triggered') && window.innerWidth < 800 && event.clientX > 288) {
        document.body.classList.remove('sidebar-triggered');
    }
});


// Sidebar directories
queryAndAddListener('.directory', 'click', (element, _) => {
    if (element.classList.contains('directory-triggered')) {
        element.classList.remove('directory-triggered');
        element.parentElement.classList.remove('directory-triggered');
    }
    else {
        element.classList.add('directory-triggered');
        element.parentElement.classList.add('directory-triggered');
    }
});


// Main page tabs
queryAndRun('header', (header) => {
    let children = [...header.children];

    let anchor = document.URL.split('#')[1] || '';
    if (anchor) open_tab(anchor.slice(-1));
    else open_tab(0);

    function open_tab(id) {
        for (let i = 0; i < children.length; i++) {
            if (i == Number(id  )) children[i].classList.add('focus');
            else children[i].classList.remove('focus');
        }

        [...document.querySelector('main').children].forEach(child => {
            if (child.dataset.tab) {
                if (child.dataset.tab == String(id)) child.style.removeProperty('display');
                else child.style.setProperty('display', 'none');
            }
        });
    }

    queryAndAddListener('button', 'click', (button) => {
        open_tab(button.dataset.tab);
    }, header);
}, document.querySelector('main'));


// Workspace
queryAndRun('.workspace', (workspace) => {
    let section = workspace.querySelector('section');

    function open_file(file) {
        queryAndRun('div', (code) => {
            if (code.dataset.name == file) code.style.removeProperty('display');
            else code.style.setProperty('display', 'none');
            if (!code.classList.contains('formatted')) {
                [...code.children].forEach(child => child.innerHTML = formatLine(child.innerHTML));
            }
        }, section);
    }

    function get_variable(variable) {
        return workspace.getAttribute('data-' + variable);
    }

    function set_variable(variable, value) {
        workspace.setAttribute('data-' + variable, value);
        queryAndRun('u', insert => {
            if (insert.dataset.var == variable) insert.textContent = value;
        }, workspace);
    }

    open_file(workspace.querySelector('select').value);

    queryAndRun('select', (select) => {
        select.addEventListener('change', _ => open_file(select.value));
    }, workspace);

    queryAndRun('input', input => {
        input.setAttribute('placeholder', get_variable(input.dataset.set));
        input.addEventListener('input', _ => {
            input.value = input.value.toLowerCase().replace(' ', '');
            if (input.value) set_variable(input.dataset.set, input.value);
            else set_variable(input.dataset.set, input.getAttribute('placeholder'));
        });
    }, section.lastElementChild);

    queryAndRun('u', insert => {
        insert.textContent = get_variable(insert.dataset.var);
    }, workspace);
});