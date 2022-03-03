import { fetchData } from '../modules/fetch.js';

const ManualInput = {
    render: async () => {
        const view = `
            <section class="section manual-input">
                <h1>Fill in product name/code</h1>
                <form id="product-form">
                    <label for="product-code">Product name/code</label><br>
                    <input type="text" id="product-code" name="product-code"><br><br>
                    <button type="submit" value="submit" form="product-form">Submit</button>
                </form>
                <section class="content"></section>
            </section>
        `;
        return view;
    },
    after_render: async () => {
        const productCodeURL = 'https://world.openfoodfacts.org/api/v0/product/';
        const productCategoryURL = 'https://world.openfoodfacts.org/category/';
        const contentList = document.querySelector('.content');
        const form = document.querySelector('#product-form');
        const errorMessage = `<p class="error">Something went wrong here, please try again</p>`;
        let counter = 1;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.classList.add('active');
            counter = 1;
            contentList.innerHTML = `
            <div class="loader">
                <img src='./images/Preloader_3.gif'>
                <p>Searching product...</p>
            </div>`;
            // Category search
            if (isNaN(event.target[0].value)) {
                fetchData(`${productCategoryURL}${event.target[0].value}/${counter}.json`)
                    .then((data) => {
                        console.log(data);
                        contentList.innerHTML = `
                        <p class="count">${data.count} products found</p>
                        <ul class="products">
                        ${data.products
                            .map(
                                (product) =>
                                    `<li class="list-item-li"><a href="/#/details/${product._id}" class="list-item">${product.product_name}</a></li>`,
                            )
                            .join('\n ')}
                        </ul>
                        <div class="loading-products">
                        </div>`;

                        // Lazy load more products if product count is greater than 24
                        if (data.count > 24) {
                            let observer = new IntersectionObserver(
                                (elements) => {
                                    const lastCard = elements[0];
                                    const productsList = document.querySelector('.products');
                                    const loadingContainer = document.querySelector('.loading-products');
                                    if (!lastCard.isIntersecting) return;
                                    loadNextPage();
                                    function loadNextPage() {
                                        loadingContainer.innerHTML = `
                                            <img src="./images/Preloader_3.gif">
                                            <p>Products are being loaded...</p>
                                        `;
                                        fetchData(`${productCategoryURL}${event.target[0].value}/${counter + 1}.json`)
                                            .then((data) => {
                                                observer.unobserve(lastCard.target);
                                                productsList.innerHTML += `
                                    ${data.products
                                        .map(
                                            (product) =>
                                                `<li class="list-item-li"><a class="list-item" href="/#/details/${product._id}">${product.product_name}</a></li>`,
                                        )
                                        .join('\n ')}
                                    `;
                                            })
                                            .then(() => {
                                                counter++;
                                                observer.observe(document.querySelector('.list-item-li:last-child'));
                                                loadingContainer.innerHTML = '';
                                            });
                                    }
                                },
                                { rootMargin: '500px 0px 0px 0px' },
                            );
                            observer.observe(document.querySelector('.list-item-li:last-child'));
                        }
                    })
                    .catch((error) => {
                        contentList.innerHTML = errorMessage;
                        console.error(error);
                    });
                // Product code search
            } else if (!isNaN(event.target[0].value)) {
                fetchData(`${productCodeURL}${event.target[0].value}`)
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        contentList.innerHTML = errorMessage;
                        console.error(error);
                    });
            } else {
                console.log(`couldn't find info with given parameters`);
            }
        });
    },
};

export default ManualInput;
