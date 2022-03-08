import { prefix } from '../config/config.js';

const Home = {
    render: async () => {
        const view = `
            <section class="section home">
                <h1>Food-Finder</h1>
                <div class="link_container">
                    <a href="${prefix}scanner">Scan product</a>
                    <a href="${prefix}manual">Fill in product code</a>
                </div>
            </section>
        `;
        return view;
    },
    after_render: async () => {},
};

export default Home;
