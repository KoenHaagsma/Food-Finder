import Utils from '../helpers/Utils.js';
import { errorBlock } from './components/errorMessage.js';
import { prefix } from '../config/config.js';
import { isSingleKeyComplete } from '../helpers/isComplete.js';

let getProduct = async (id) => {
    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${id}`);
        const json = await response.json();
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
            let completeNutritionGrade = isSingleKeyComplete(product.product, 'nutrition_grades');
            const view = `
            <section class="section details">
                <section class="content">
                    <div class="img-container">
                    <img src="${product.product.image_url}">
                    <p style="display: ${completeNutritionGrade ? 'block;' : 'none;'}"><b>${
                product.product.nutrition_grades
            }</b></p>
                    
                    </div>
                    <div class="details-container">
                        <h1>${product.product.brands}</h1>
                        <h2>${product.product.quantity}</h2>
                        <div class="nutriments-container">
                            <article>
                                <p>${product.product.nutriments.energy}</p>
                                <p>Kcal</p>
                            </article>
                            <article>
                                <p>${product.product.nutriments.fat}${product.product.nutriments.fat_unit}</p>
                                <p>Fat</p>
                            </article>
                            <article>
                                <p>${product.product.nutriments.proteins}${product.product.nutriments.proteins_unit}</p>
                                <p>Eiwitten</p>
                            </article>
                            <article>
                                <p>${product.product.nutriments.sugars}${product.product.nutriments.sugars_unit}</p>
                                <p>Sugars</p>
                            </article>
                        </div>
                    </div>

                </section>
                <section class="rest-details">
                    <h3>Values</h3>
                    <ul>
                        ${Object.entries(product.product.nutrient_levels)
                            .map(
                                ([key, value]) =>
                                    `<li class="nutrients-li">
                                        <span>${key}</span>
                                        <span>${value}</span>
                                    </li>`,
                            )
                            .join('\n ')}
                    </ul>
                </section>
                <div class='link-container'><a href="${prefix}">Scan again</a></div> 
            </section>`;
            return view;
        }
    },
    after_render: async () => {},
};

// Temp storage
//<h3>Per ${product.product.nutrition_data_per}</h3>

export default Details;
