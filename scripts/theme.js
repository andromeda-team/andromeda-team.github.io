initial_state(document.getElementById('current_navbar'));
initial_state(document.getElementById('current_tab'));

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
    if (element == null) return

    element.classList.add('revealed');
    if (element.parentElement.tagName == 'label') {
        reveal_path(document.getElementById(element.parentElement.getAttribute('for')));
    }
}

function initial_state(container) {
    if (!container.value) return;

    [...container.parentElement.getElementsByClassName('button')].forEach((element) => {
        let href = element.getAttribute('href') || '';
        if (href.includes(container.value)) {
            element.classList.add('selected');
            if (element.parentElement.classList.contains('category_list')) {
                reveal_path(document.getElementById(element.parentElement.getAttribute('for')));
            }
        }
    });
}