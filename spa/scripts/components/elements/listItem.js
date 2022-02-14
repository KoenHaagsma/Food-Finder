export const ListItem = (el) => {
    const elem = document.createElement('li');
    const node = document.createTextNode(el);

    elem.appendChild(node);
    return elem;
};
