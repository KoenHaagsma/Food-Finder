// https://www.kirupa.com/html5/drag.htm

// Open content tab
const icons = document.querySelectorAll('.icon');
const content = document.querySelectorAll('.content-container');
const iconContainer = document.querySelector('.icon-container');
console.log(iconContainer);
icons.forEach((icon) => {
    icon.onclick = () => {
        [...contentArray] = content;
        contentArray[parseInt(icon.classList[icon.classList.length - 1]) - 1].classList.toggle(
            'content-container-shown',
        );
        iconContainer.classList.toggle('icon-container-shown');
    };
});

// Close content tab
const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach((button) => {
    button.onclick = () => {
        [...contentArray] = contentArray;
        contentArray[parseInt(button.classList[button.classList.length - 1]) - 1].classList.toggle(
            'content-container-shown',
        );
        iconContainer.classList.toggle('icon-container-shown');
    };
});
