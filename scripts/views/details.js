import Utils from '../helpers/Utils.js';
import { errorBlock } from './components/errorMessage.js';
import { prefix } from '../config/config.js';

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

        if (
            product.status === 0 ||
            product.product.ingredients === undefined ||
            product.product.ingredients.length === 0
        ) {
            const view = `${errorBlock}
            <a href="${prefix}manual"class="extra-button">Fill in product name/code</a>
            `;
            return view;
        } else {
            const view = `
            <section class="section details">
                <h1>Details</h1>
                <section class="content">
                    <h3>${product.product.brands}</h3>
                    <h2>${product.product.product_name}</h2>
                    <p>Ingredients</p>
                    <ul>
                    ${product.product.ingredients
                        .map((item) => `<li class="list-item-li">${item.text}</li>`)
                        .join('\n ')}
                    </ul>
                </section>
                <div class='link-container'><a href="${prefix}"><img src="./images/arrow.png"></a></div> 
            </section>`;
            return view;
        }
    },
    after_render: async () => {},
};

export default Details;
