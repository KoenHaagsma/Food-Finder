// render html function
function render(html) {
    const rootDiv = document.getElementById('root');
    return (rootDiv.innerHTML = html);
}

export default render;
