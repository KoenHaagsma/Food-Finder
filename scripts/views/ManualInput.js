const ManualInput = {
    render: async () => {
        const view = `
            <section class="section manual-input">
                <h1> Fill in product code </h1>
                <form id="product-form">
                    <label for="product-code">Product code</label><br><br>
                    <input type="text" id="product-code" name="product-code"><br><br>
                    <button type="submit" value="submit" form="product-form">Submit</button>
                </form>
            </section>
        `;
        return view;
    },
    after_render: async () => {},
};

export default ManualInput;
