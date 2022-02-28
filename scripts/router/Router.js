import Utils from '../helpers/Utils.js';
import Error404 from '../views/Error404.js';
import Home from '../views/Home.js';
import ManualInput from '../views/ManualInput.js';
import Details from '../views/Details.js';
import Scanner from '../views/Scanner.js';

const routes = {
    '/': Home,
    '/manual': ManualInput,
    '/details': Details,
    '/scanner': Scanner,
};

// https://github.com/rishavs/vanillajs-spa
const router = async () => {
    // Lazy load elements
    const content = null || document.getElementById('page_container');

    let request = Utils.parseRequestURL();
    console.log(request);

    let parsedURL =
        (request.resource ? '/' + request.resource : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? '/' + request.verb : '');

    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    await page.after_render();
};

export default router;
