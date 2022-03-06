import { isSingleKeyComplete } from '../../helpers/isComplete.js';
import { prefix } from '../../config/config.js';

const listItem = (product) => {
    let completeNutritionGrade = isSingleKeyComplete(product, 'nutrition_grades');
    let completeEnergy = isSingleKeyComplete(product, 'nutriscore_data');
    let completeImg = isSingleKeyComplete(product, 'image_url');
    const view = `<li class="list-item-li">
    <a href="${prefix}details/${product._id}" class="list-item">
        <div class="inside">
            <img src="${completeImg ? product.image_url : '../../../images/placeholder.png'}">
            <article class="details-products">
                <li>${product.product_name}</li>
                <li style="display: ${completeNutritionGrade ? 'block;' : 'none;'}"><b>Nutrition grade:</b> ${
        product.nutrition_grades
    }</li>
            <li style="font-weight: bold; color: #2fb668">${
                completeEnergy ? product.nutriscore_data.energy : '- '
            }kcal</li>
            </article>
        </div>
    </a>
</li>`;
    return view;
};

// For testing purposes
// <li>${product.popularity_key}</li>
export { listItem };
