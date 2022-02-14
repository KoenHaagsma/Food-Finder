import { fetchData } from './modules/fetch.js';
import { tempProduct } from './config/config.js';
import { Heading } from './components/elements/h1.js';
import { IngredientsList } from './components/Ingredients.js';

let body = document.querySelector('body');

fetchData(tempProduct).then((data) => {
    body.append(Heading(`${data.product.generic_name}`));
    body.append(IngredientsList(data.product.ingredients));
});
