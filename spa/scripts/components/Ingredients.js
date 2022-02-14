import { ListItem } from './elements/listItem.js';

export const IngredientsList = (ingredients) => {
    const ul = document.createElement('ul');
    ingredients.forEach((item, index) => {
        const elem = ListItem(`${ingredients[index].id.slice(3)}`);
        ul.appendChild(elem);
    });

    return ul;
};
