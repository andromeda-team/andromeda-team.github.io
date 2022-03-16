[...document.getElementsByClassName('category')].forEach((element, _) => {
    element.addEventListener('click', () => {
        if (element.classList.contains('revealed')) {
            element.classList.remove('revealed');
        } else {
            element.classList.add('revealed');
        }
    });
});