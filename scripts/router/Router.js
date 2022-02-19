import { routes } from './routes.js';

const rootDiv = document.getElementById('root');
const Router = {
    init: function () {
        rootDiv.innerHTML = routes[window.location.pathname];
        window.onpopstate = () => {
            rootDiv.innerHTML = routes[window.location.pathname];
        };
    },
    navigate: function (pathname) {
        window.history.pushState({}, pathname, window.location.origin + pathname);
        rootDiv.innerHTML = routes[pathname];
    },
};

export { Router };
