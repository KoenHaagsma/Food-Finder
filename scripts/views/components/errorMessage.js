import { prefix } from '../../config/config.js';

const errorBlock = `
    <div class="error">
        <h2>Product not found or complete</h2>
        <img src="../images/Question.png">
        <p>This product is not found or the product found is not complete search again or scan again</p>
        <a href="${prefix}">Scannen</a>
    </div>`;

export { errorBlock };
