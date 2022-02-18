import { fetchData } from './modules/fetch.js';
import { tempProduct } from './config/config.js';
import { Heading } from './components/elements/h1.js';
import { IngredientsList } from './components/Ingredients.js';
import { Scanner } from './components/Scanner.js';

const body = document.querySelector('body');
body.appendChild(Scanner());

// fetchData(tempProduct).then((data) => {
//     body.append(Heading(`${data.product.generic_name}`));
//     body.append(IngredientsList(data.product.ingredients));
// });
