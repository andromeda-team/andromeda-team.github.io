# ONLY WORKS IN PYTHON 3.9 AND NEWER

import os
from pathlib import Path
import itertools

HTML_PARSE_BLACKLIST = ('OLD')
html_files = []


def parse_html_files():  # Note: this function returns an iterator
    return (str(path) for path in Path(".").rglob("*.html") if not str(path).startswith(HTML_PARSE_BLACKLIST))


def include_html(path, include_mode=True):
    global html_files

    lines_old = open(path, "r").readlines()
    lines_new = []
    append_lines = True

    for line in lines_old:

        if append_lines:
            if line.lstrip().startswith("<!-- INCLUDE"):
                append_lines = False
                include_path = line.strip().removeprefix("<!-- INCLUDE ").removesuffix(" -->").lower()
                if include_mode:
                    spaces_amount = len(tuple(itertools.takewhile(lambda x: x == " ", line)))
            lines_new.append(line)

        else:
            if line.lstrip().startswith("<!-- END INCLUDING " + include_path):
                if include_mode:
                    if include_path in html_files:
                        include_html(include_path)
                    lines_new.extend((" " * spaces_amount + i for i in open(include_path).readlines()))
                append_lines = True
                lines_new.append(line)

    open(path, "w").writelines(lines_new)
    html_files.remove(path)


if __name__ == "__main__":
    option = input("[i] - INCLUDE mode\n[p] - PURGE mode\n[c] - CANCEL\nSelect mode: [i/p/c] ").lower()
    if option == "i" or option == "p":
        html_files = list(parse_html_files())
        while len(html_files) > 0:
            include_html(html_files[0], option == "i")
