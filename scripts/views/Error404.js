const Error404 = {
    render: async () => {
        const view = `
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `;
        return view;
    },
    after_render: async () => {},
};
// test

export default Error404;
