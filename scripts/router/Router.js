import Utils from '../helpers/Utils.js';
import Error404 from '../views/Error404.js';
import { routes } from './routes.js';

const router = async () => {
    const content = null || document.getElementById('page_container');

    let request = Utils.parseRequestURL();

    let parsedURL =
        (request.resource ? '/' + request.resource : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? '/' + request.verb : '');

    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    await page.after_render();
};

export default router;
