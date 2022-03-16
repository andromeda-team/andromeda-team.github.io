const nav_categories = [...document.getElementsByClassName('nav_category')];
const nav = document.getElementsByTagName("nav")[0];

nav_categories.forEach((element) => {
    element.addEventListener('click', () => {
        if (element.classList.contains('inactive')) {
            element.classList.remove('inactive');
            [...nav.children].forEach((el) => {
                if (el != element) {
                    el.classList.add('hidden');
                }
            });
        } else {
            element.classList.add('inactive');
            [...nav.children].forEach((el) => {
                if (el != element) {
                    el.classList.remove('hidden');
                }
            });
        }
    });
});