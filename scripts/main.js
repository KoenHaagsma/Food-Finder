// import { fetchData } from './modules/fetch.js';
// import { tempProduct } from './config/config.js';
// import { Heading } from './components/elements/h1.js';
// import { IngredientsList } from './components/Ingredients.js';
// import { Scanner } from './components/Scanner.js';
import { Router } from './router/Router.js';

// fetchData(3366321051983).then((data) => {
//     localStorage.setItem('data', JSON.stringify(data));
//     console.log(JSON.parse(localStorage.getItem('data')));
// });

// fetchData(tempProduct).then((data) => {
//     body.append(Heading(`${data.product.generic_name}`));
//     body.append(IngredientsList(data.product.ingredients));
// });

document.addEventListener('DOMContentLoaded', Router.init);
