import { prefix } from '../config/config.js';

const Error404 = {
    render: async () => {
        const view = `
            <section class="section error404">
                <img src="../../images/Question.png">
                <h1>Pagina niet gevonden</h1>
                <a href="${prefix}">Back to homepage</a>
            </section>
        `;
        return view;
    },
    after_render: async () => {},
};

export default Error404;
