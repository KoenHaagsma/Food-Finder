import { prefix } from '../config/config.js';

const errorPage = {
    render: async () => {
        const view = `
            <section class="section errorpage">
                <h1>Product is not found</h1>
                <a href="${prefix}manual">Fill in product / product code instead</a>
                <a href="${prefix}">Back to homepage</a>
            </section>
        `;
        return view;
    },
    after_render: async () => {},
};

export default errorPage;
