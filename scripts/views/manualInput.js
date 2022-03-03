import { fetchData } from '../modules/fetch.js';

const ManualInput = {
    render: async () => {
        const view = `
            <section class="section manual-input">
                <h1>Fill in product name/code</h1>
                <form id="product-form">
                    <label for="product-code">Product name or code</label>
                    <input type="text" id="product-code" name="product-code">
                    <button type="submit" value="submit" id="product-submit" form="product-form">Search</button>
                </form>
                <section class="content"></section>
                <div class='link-container'><a href="/Food-Finder/#/scanner"><img src="./images/camera.png"></a></div> 
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

        // Form event
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
                        // Cancel if product is not complete or empty or not found
                        if (data.status === 0 || data.count === 0 || data.products.length === 0) {
                            contentList.innerHTML = `
                            <p class="error">Product not complete or not found</p>
                            `;
                            return;
                        }
                        contentList.innerHTML = `
                        <p class="count">${data.count} products found</p>
                        <ul class="products">
                        ${data.products
                            .map(
                                (product) =>
                                    `<li class="list-item-li"><a href="/Food-Finder/#/details/${product._id}" class="list-item">${product.product_name}</a></li>`,
                            )
                            .join('\n ')}
                        </ul>
                        <div class="loading-products">
                        </div>`;
                        // Lazy load more products if product count is greater than 24 because of pagination
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
                                            <div class="skeleton"></div>
                                        `;
                                        fetchData(`${productCategoryURL}${event.target[0].value}/${counter + 1}.json`)
                                            .then((data) => {
                                                observer.unobserve(lastCard.target);
                                                productsList.innerHTML += `
                                    ${data.products
                                        .map(
                                            (product) =>
                                                `<li class="list-item-li"><a class="list-item" href="/Food-Finder/#/details/${product._id}">${product.product_name}</a><span>Details &bsp</span></li>`,
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
                        if (data.status === 0 || data.count === 0 || data.product.completeness === 0) {
                            contentList.innerHTML = `
                            <p class="error">Product not complete or found</p>
                            `;
                            return;
                        }
                        location.href = `/Food-Finder/#/details/${data.product._id}`;
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
