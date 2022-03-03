import Utils from '../helpers/Utils.js';

let getProduct = async (id) => {
    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${id}`);
        const json = await response.json();
        console.log(json);
        return json;
    } catch (err) {
        console.error('Error getting documents', err);
    }
};

const Details = {
    render: async () => {
        let request = Utils.parseRequestURL();
        let product = await getProduct(request.id);
        console.log(product);
        console.log(product.product.ingredients);

        const view = `
            <section class="section details">
                <h1>Details</h1>
                <section class="content">
                    <h2>${product.product.generic_name}</h2>
                    <p>Ingredients</p>
                    <ul>
                    ${product.product.ingredients
                        .map((item) => `<li class="list-item-li">${item.text}</li>`)
                        .join('\n ')}
                    </ul>
                </section>
                <div class='link-container'><a href="/Food-Finder/#/"><img src="./images/arrow.png"></a></div> 
            </section>
        `;
        return view;
    },
    after_render: async () => {},
};

export default Details;
