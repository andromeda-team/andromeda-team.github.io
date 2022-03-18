# ONLY WORKS IN PYTHON 3.9 AND NEWER

from pathlib import Path

HTML_PARSE_BLACKLIST = ("assets",)


def parse_html_files(): # Note: this function returns an iterator
    return (str(path) for path in Path(".").rglob("*.html") if not str(path).startswith(HTML_PARSE_BLACKLIST))


def include_html(path):
    lines_old = open(path, "r").readlines()
    lines_new = []
    append_lines = True

    for line in lines_old:

        if append_lines:
            if line.lstrip().startswith("<!-- INCLUDE"):
                append_lines = False
                include_name = line.strip().removeprefix("<!-- INCLUDE ").removesuffix(" -->").lower()
            lines_new.append(line)

        else:
            if line.lstrip().startswith("<!-- END INCLUDING"):
                lines_new.extend(open("assets/.{0}.html".format(include_name), "r").readlines())
                append_lines = True
                lines_new.append(line)

    open(path, "w").writelines(lines_new)


if __name__ == '__main__':
    if input('Would you like to run in INCLUDE mode? [Y/n] ').upper() == "Y":
        for path in parse_html_files():
            include_html(path)