import { home } from '../views/home.js';
import { manual } from '../views/manual.js';
import { details } from '../views/details.js';
import { scanner } from '../views/scanner.js';

const routes = {
    '/': home(),
    '/manual': manual,
    '/details': details,
    '/scanner': scanner,
};

export { routes };
