// (Un)Revealing the categories in navbar:
[...document.getElementsByClassName('category')].forEach((element, _) => {
    element.addEventListener('click', () => {
        if (element.classList.contains('revealed')) {
            element.classList.remove('revealed');
        } else {
            element.classList.add('revealed');
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
initial_navbar_state(document.getElementById('initial_navbar_state').value);