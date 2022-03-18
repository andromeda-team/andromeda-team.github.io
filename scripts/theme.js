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


// Initial navbar state:
function initial_navbar_state(state) {
    if (!state) return;
    [...document.getElementsByTagName('nav')[0].getElementsByClassName('button')].forEach((button) => {
        let href = button.href || '';
        if (href.includes(state)) {
            button.classList.add('focus');
            reveal_path(document.getElementById(button.parentElement.getAttribute('for')));
        }
    });
}
initial_navbar_state(document.getElementById('current_page').value);