const Error404 = {
    render: async () => {
        const view = `
            <section class="section">
                <h1>404 Error</h1>
                <a href="/Food-Finder/#/">Back to homepage</a>
            </section>
        `;
        return view;
    },
    after_render: async () => {},
};

export default Error404;
