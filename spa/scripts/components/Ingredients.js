import { ListItem } from './elements/listItem.js';
import { HeadingTwo } from './elements/h2.js';

export const IngredientsList = (ingredients) => {
    const section = document.createElement('section');
    const subTitle = document.createElement('h2');
    const ul = document.createElement('ul');
    ingredients.forEach((item, index) => {
        const elem = ListItem(`${ingredients[index].id.slice(3)}`);
        ul.appendChild(elem);
    });

    return section.appendChild(ul);
};
