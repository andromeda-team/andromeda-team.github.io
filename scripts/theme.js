initial_navbar_state(document.getElementById('current_navbar').value);
initial_tab_state(document.getElementById('current_tab').value);


[...document.getElementsByClassName('category')].forEach((category) => {
    category.addEventListener('click', () => {
        if (category.classList.contains('revealed')) {
            category.classList.remove('revealed');
        } else {
            category.classList.add('revealed');
        }
    });
});

function reveal_path(element) {
    element.classList.add('revealed');
    if (element.parentElement.tagName == 'label') {
        reveal_path(document.getElementById(element.parentElement.getAttribute('for')));
    }
}

function initial_state(state, className, execute) {
    if (!state) return;
    let nav = document.getElementsByTagName('nav')[0];
    if (!nav) return;

    [...nav.getElementsByClassName(className)].forEach((element) => {
        let href = element.href || '';
        if (href.includes(state)) {
            element.classList.add('selected');
            execute(element);
        }
    });
}

function initial_navbar_state(state) {
    initial_state(state, 'button', function (element) {
        reveal_path(document.getElementById(element.parentElement.getAttribute('for')));
    });
}

function initial_tab_state(state) {
    initial_state(state, 'tab', function(_) {});
}