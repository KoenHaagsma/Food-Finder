// https://www.kirupa.com/html5/drag.htm

// Open content tab
const icons = document.querySelectorAll('.icon');
const content = document.querySelectorAll('.content-container');
icons.forEach((icon) => {
    icon.onclick = () => {
        [...contentArray] = content;
        contentArray[parseInt(icon.classList[icon.classList.length - 1]) - 1].classList.toggle(
            'content-container-shown',
        );
    };
});
