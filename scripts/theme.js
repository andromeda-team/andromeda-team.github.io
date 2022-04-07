const sidebar_trigger = [...document.getElementsByClassName('sidebar_trigger')];
const sidebar = document.getElementsByTagName('aside')[0];
const navbar = document.getElementsByTagName('nav')[0];
const main = document.getElementsByTagName('main')[0];

if (sidebar_trigger && sidebar && navbar && main) {
    function hide() {
        sidebar.classList.remove('triggered');
        navbar.classList.remove('triggered');
    }

    function show() {
        sidebar.classList.add('triggered');
        navbar.classList.add('triggered');
    }

    let screen_condition = (window.innerWidth > 61 * 16);
    function update() {
        if (screen_condition) { show(); }
        else hide();
    }

    sidebar_trigger.forEach(trigger => {
        trigger.addEventListener('click', (_) => {
            if (!sidebar.classList.contains('triggered')) {
                show();
            } else {
                hide();
            }
        });
    });

    main.addEventListener('click', (_) => { if (!screen_condition) hide() });

    update();
    window.addEventListener('resize', (_) => {
        screen_condition = (window.innerWidth > 61 * 16);
        update();
    });
}


const set_nav = document.getElementById('set_nav');
if (set_nav && navbar) {
    [...navbar.getElementsByTagName('div')[0].children].forEach(tab => {
        if (tab.getAttribute('href').includes(set_nav.value)) {
            tab.classList.add('focus');
        }
    });
}

const set_aside = document.getElementById('set_aside');
if (set_aside && sidebar) {
    function open_path(element) {
        try {
            element.parentElement.previousSibling.previousSibling.classList.add('unfolded');
            element.parentElement.previousSibling.previousSibling.parentElement.classList.add('unfolded');
        } catch (e) {
            
        }
    }

    [...sidebar.getElementsByTagName('a')].forEach(link => {
        if (link.getAttribute('href').includes(set_aside.value)) {
            link.classList.add('focus');
            open_path(link);
        }
    });
}


const sidebar_searchbar = document.getElementById('sidebar_searchbar');
if (sidebar_searchbar) {
    function purge(element) {
        element.style.setProperty('display', 'none');
        if (
            element.nextElementSibling.tagName.toLowerCase() == 'a' ||
            element.nextElementSibling.tagName.toLowerCase() == 'button'
        ) purge(element.nextElementSibling);
    }

    function return_links() {
        button.classList.remove('focus');

        [...sidebar.getElementsByTagName('a')].forEach(link => {
            link.style.removeProperty('display');
        });

        [...sidebar.getElementsByTagName('button')].forEach(link => {
            link.style.removeProperty('display');
        });
    }

    let button = sidebar_searchbar.nextElementSibling.getElementsByTagName('button')[0];

    sidebar_searchbar.addEventListener('input', (_) => {
        if (sidebar_searchbar.value) {
            button.classList.add('focus');

            purge(sidebar_searchbar.nextElementSibling.nextElementSibling);

            [...sidebar.getElementsByTagName('a')].forEach(link => {
                let contents = link.textContent || link.innerText;
                if (contents.toLowerCase().includes(sidebar_searchbar.value)) {
                    link.style.removeProperty('display');
                }
            });
            
        } else return_links();

        button.addEventListener('click', (_) => {
            sidebar_searchbar.value = '';
            button.classList.remove('focus');
            return_links();
        });
    });
}


const directories = [...document.getElementsByClassName('directory')];
if (directories) {
    directories.forEach(directory => {
        directory.addEventListener('click', (_) => {
            if (!directory.classList.contains('unfolded')) {
                directory.classList.add('unfolded');
                directory.parentElement.classList.add('unfolded');
            } else {
                directory.classList.remove('unfolded');
                directory.parentElement.classList.remove('unfolded');
            }
        });
    });
}

const main_tabs = main.getElementsByTagName('header');
if (main_tabs[0]) {   
    function open_tab(tab_id) {
        [...main.children].forEach(child => {
            if (child.dataset.tab) {
                if (child.dataset.tab != String(tab_id)) child.style.setProperty('display', 'none');
                else child.style.removeProperty('display');
            }
        });
    }

    open_tab(0);

    [...main_tabs[0].children].forEach(tab => {
        tab.addEventListener('click', (_) => {
            open_tab(tab.dataset.set);
            [...main_tabs[0].children].forEach(t => {t.classList.remove('focus')});
            tab.classList.add('focus');
        });
    });
}


const algorithms = main.getElementsByClassName('algorithm');
if (algorithms) {
    [...algorithms].forEach(algorithm => {
        let header = algorithm.children[0];
        let filetree = algorithm.children[1];
        let code = algorithm.children[2];

        // Updating variables
        function update_variables() {
            [...algorithm.getElementsByTagName('u')].forEach(insert => {
                insert.textContent = algorithm.getAttribute('data-' + insert.dataset.get);
            });
        }
        update_variables();

        [...code.lastElementChild.getElementsByTagName('input')].forEach(input_setter => {
            input_setter.addEventListener('input', (_) => {
                algorithm.setAttribute('data-' + input_setter.dataset.set, input_setter.value);
                update_variables();
            });
            input_setter.setAttribute('placeholder', algorithm.getAttribute('data-' + input_setter.dataset.set));
        });


        //  Opening file:
        function open_file(id) {
            [...filetree.children].forEach(file => file.classList.remove('focus'));
            filetree.children[Number(id)].classList.add('focus');

            let contents = filetree.children[Number(id)].children[1].textContent || filetree.children[Number(id)].children[1].innerHTML;
            header.innerHTML = header.innerHTML.replace(/(\w| )*\.mcfunction/, contents + '.mcfunction')

            for (let i = 0; i < code.childElementCount; i++) {
                if (i == Number(id)) code.children[i].style.removeProperty('display');
                else code.children[i].style.setProperty('display', 'none');
            }
        }

        for (let i = 0; i < filetree.childElementCount; i++) {
            filetree.children[i].addEventListener('click', (_) => open_file(i));
        }

        open_file(0);


        // Formatting
        function format(line) {
            function apply_formatting(string, name) {
                return '<span class="format-' + name + '">' + string + '</span>';
            }

            function format_by_array(input, array, formatting)  {
                let output = input;
                array.forEach(word => {
                    output = output.replace(word + ' ', apply_formatting(word + ' ', formatting));
                });
                return output;
            }

            if (line.includes('# ')) line = apply_formatting(line, 'comment');
            else {
                line = format_by_array(line, [
                    'data', 'modify', 'get', 'merge', 'storage',
                    'entity', 'block', 'set', 'get', 'from',
                    'value', 'execute', 'if', 'score', 'matches',
                    'run', 'function', 'scoreboard', 'players', 'objectives', 'remove', 'add', 'set'
                ], 'command')
                line = format_by_array(line, ['@s', '@e', '@a', '@r', '@p'], 'selector')
                line = line.replace('minecraft:', apply_formatting('minecraft:', 'selector'))
            }

            return line;
        }

        [...code.children].forEach(file => {
            [...file.children].forEach(line => {
                let cross_file_link = line.getElementsByTagName('a');
                if (cross_file_link[0]) {
                    cross_file_link[0].addEventListener('click', (_) => {
                        console.log('HI');
                    });
                }

                line.innerHTML = format(line.innerHTML);
            });
        });
    });
}