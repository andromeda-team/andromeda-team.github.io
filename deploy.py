#! Run this script using Python 3.x before merging a request/pushing if a navbar change was made or a new page created.

from time import sleep
import os

def deploy(include_mode: True):
    # Include the navbar into other HTML files:
    html_files = [os.path.join(r, fn)
        for r, _, fs in os.walk(os.getcwd()) 
        for fn in fs if fn.endswith('.html')]

    for html_file in html_files:
        if not html_file.endswith(('navbar.html', 'tabs.html')):
            include_html(html_file, include_mode, 'navbar')
            include_html(html_file, include_mode, 'tabs')


def include_html(html_file, include_mode, string):
    capitalized = string.upper()
    with open(html_file, 'r') as file:
            lines = file.readlines()
            bounds = [-1] * 2
            for index, line in enumerate(lines):
                if f'<!-- INCLUDE {capitalized} -->' in line:
                    bounds[0] = index
                elif f'<!-- END INCLUDING {capitalized} -->' in line:
                    bounds[1] = index

    with open(os.getcwd() + f'/assets/{string}.html', 'r') as navbar:
        navbar_lines = navbar.readlines()

    with open(html_file, 'w') as file:
        for index, line in enumerate(lines):
            if index <= bounds[0] or index > bounds[1]:
                file.write(line)
                if include_mode and f'<!-- INCLUDE {capitalized} -->' in line:
                    for navbar_line in navbar_lines:
                        file.write(navbar_line)


if __name__ == '__main__':
    deploy(True if input('Would you like to run in INCLUDE mode? [Y/n] ').capitalize() == 'Y' else False)
