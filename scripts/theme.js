initial_navbar_state(document.getElementById('current_navbar').value);


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

    [...document.getElementsByClassName(className)].forEach((element) => {
        let href = element.getAttribute('href') || '';
        if (href.includes(state)) {
            element.classList.add('selected');
            execute(element);
        }
    });
}

function initial_navbar_state(state) {
    initial_state(state, 'button', function (element) {
        if (element.parentElement.classList.contains('category_list')) {
            reveal_path(document.getElementById(element.parentElement.getAttribute('for')));
        }
    });
}