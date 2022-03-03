const Home = {
    render: async () => {
        const view = `
            <section class="section home">
                <h1>Food-Finder</h1>
                <div class="link_container">
                    <a href="/Food-Finder/#/scanner">Scan product</a>
                    <a href="/Food-Finder/#/manual">Fill in product code</a>
                </div>
            </section>
        `;
        return view;
    },
    after_render: async () => {},
};

export default Home;
