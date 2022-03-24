[...document.getElementsByClassName('property')].forEach((property) => {
    property.addEventListener('change', () => {
        [...property.parentElement.parentElement.getElementsByClassName('insert')].forEach((insert) => {
            if (insert.dataset.var == property.getAttribute('id')) {
                insert.textContent = property.value;
            }
        });
    });
});

const search_docs = document.getElementById('search_docs');
const category_lists = [...document.getElementsByClassName('category_list')];

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

function clear_search_results(search_result) {
    if (search_result == null || search_result.tagName == 'HR') return
    clear_search_results(search_result.nextSibling);
    if (search_result.tagName == 'LABEL') return
    search_result.remove();
}