[...document.getElementsByClassName('property')].forEach((property) => {
    property.addEventListener('change', () => {
        [...property.parentElement.parentElement.getElementsByClassName('insert')].forEach((insert) => {
            if (insert.dataset.var == property.getAttribute('id')) {
                insert.textContent = property.value;
            }
        });
    });
});