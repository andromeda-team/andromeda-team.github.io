#! Run this script using Python 3.x before merging a request/pushing if a navbar change was made or a new page created.

import os


def main():
    clean_up = bool(input('Would you like to include? [Hit enter to confirm / Anything else to clean up]'))

    html_files = [os.path.join(r, fn)
        for r, dr, fs in os.walk(os.getcwd()) 
        for fn in fs if fn.endswith('.html') and not fn.startswith('.')]
    
    for html_file in html_files:
        proccess_for = []

        with open(html_file, 'r') as file:
            lines = file.readlines()
            bounds = [-1] * 4
            for index, line in enumerate(lines):
                if f'INCLUDE navbar.html' in line:
                    proccess_for.append('navbar.html')
                    bounds[0] = index
                elif f'END INCLUDE navbar.html' in line:
                    bounds[2] = index
                elif f'INCLUDE tabs.html' in line:
                    proccess_for.append('tabs.html')
                    bounds[1] = index
                elif f'END INCLUDE tabs.html' in line:
                    bounds[3] = index
        
        if len(proccess_for) > 0:
            for index, proccess in enumerate(proccess_for):
                html_include(html_file, proccess, lines, [bounds[0 + index], bounds[2 + index]], clean_up);


def html_include(html_file, file, lines, bounds, clean_up: bool):
    with open(os.getcwd() + f'/assets/.{file}', 'r') as including:
        including_lines = including.readlines()
    
    with open(html_file, 'w') as file:
        for index, line in enumerate(lines):
            if index <= bounds[0] or index > bounds[1]:
                html_file.write(line)
                if not clean_up and f'INCLUDE {file}' in line:
                    for including_line in including_lines:
                        file.write(including_line)


if __name__ == '__main__':
    main()
