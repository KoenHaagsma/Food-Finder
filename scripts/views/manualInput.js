import { fetchData } from '../modules/fetch.js';
import { errorBlock } from './components/errorMessage.js';
import { listItem } from './components/listItem.js';
import { isDataComplete } from '../helpers/isComplete.js';
import { prefix } from '../config/config.js';
import { renderElementAndClean, renderElement, cleanElement } from '../modules/renderElement.js';
import { loaderProducts, loaderSearching } from './components/loaderMessage.js';

const ManualInput = {
    render: async () => {
        const view = `
            <section class="section manual-input">
                <h1>Fill in product name or code</h1>
                <form id="product-form">
                    <input placeholder="Product code/name" type="text" id="product-code" name="product-code">
                    <button type="submit" value="submit" id="product-submit" form="product-form">Search</button>
                </form>
                <div class="sort-container"></div>
                <section class="content"></section>
                <div class='link-container'><a href="${prefix}scanner">Scan product</a></div> 
            </section>
        `;
        return view;
    },
    after_render: async () => {
        const productCodeURL = 'https://world.openfoodfacts.org/api/v0/product/';
        const productCategoryURL = 'https://world.openfoodfacts.org/category/';
        const contentList = document.querySelector('.content');
        const form = document.querySelector('#product-form');
        let code;
        const header = document.querySelector('h1');
        let counter = 1;
        let productCount = 0;

        // Form event
        form.addEventListener('submit', (event) => {
            const sortButton = '<div class="sort-button">Sort items based on popularity</div>';
            const sortContainer = document.querySelector('.sort-container');

            event.preventDefault();
            productCount = 0;
            header.classList.add('active');
            counter = 1;
            code = event.target[0].value;

            renderElementAndClean(contentList, loaderSearching, 'afterbegin');

            // Add sort button only when something has already been fetched once
            renderElementAndClean(sortContainer, sortButton, 'afterbegin');
            if (sortContainer) {
                const div = document.querySelector('.sort-button');
                div.addEventListener('click', (event) => {
                    event.preventDefault();
                    sortAndShowProducts();
                });
            }

            // Category search
            if (isNaN(event.target[0].value)) {
                fetchData(`${productCategoryURL}${event.target[0].value}/${counter}.json`)
                    .then((data) => {
                        // Cancel if product is not complete or empty or not found
                        if (data.status === 0 || data.count === 0 || data.products.length === 0) {
                            const sortContainer = document.querySelector('.sort-container');
                            renderElementAndClean(contentList, errorBlock, 'afterbegin');
                            cleanElement(sortContainer);
                            return;
                        }

                        const newProducts = data.products;

                        // Only sorts the first 24 products because of pagination
                        newProducts.sort((a, b) => {
                            return b.popularity_key - a.popularity_key;
                        });

                        let filteredProducts = newProducts.filter((product) => {
                            return isDataComplete(product);
                        });

                        if (filteredProducts.length === 0) {
                            filteredProducts = newProducts;
                        }

                        productCount += filteredProducts.length;

                        let productsList = `
                            <p class="count">${productCount} valid products found</p>
                            <ul class="products">
                                ${filteredProducts.map((product) => listItem(product)).join('\n ')}
                            </ul>
                            <div class="loading-products">
                            </div>`;

                        renderElementAndClean(contentList, productsList, 'afterbegin');

                        // Lazy load more products if product count is greater than 24 because of pagination
                        if (data.count > 24) {
                            let observer = new IntersectionObserver(
                                (elements) => {
                                    const lastCard = elements[0];

                                    if (!lastCard.isIntersecting) return;

                                    loadNextPage(event, observer, lastCard);
                                },
                                { rootMargin: '500px 0px 0px 0px' },
                            );
                            observer.observe(document.querySelector('.list-item-li:last-child'));
                        }
                    })
                    .catch((error) => {
                        renderElementAndClean(contentList, errorBlock, 'afterbegin');
                        console.error(error);
                    });

                // Product code search
            } else if (!isNaN(event.target[0].value)) {
                fetchData(`${productCodeURL}${event.target[0].value}`)
                    .then((data) => {
                        if (data.status === 0 || data.count === 0 || data.product.completeness === 0) {
                            const sortContainer = document.querySelector('.sort-container');
                            renderElementAndClean(contentList, errorBlock, 'afterbegin');
                            cleanElement(sortContainer);
                            return;
                        }
                        location.href = `${prefix}details/${data.product._id}`;
                    })
                    .catch((error) => {
                        const sortContainer = document.querySelector('.sort-container');
                        renderElementAndClean(contentList, errorBlock, 'afterbegin');
                        cleanElement(sortContainer);
                        console.error(error);
                    });
            } else {
                console.log(`couldn't find info with given parameters`);
                renderElementAndClean(contentList, errorBlock, 'afterbegin');
            }
        });

        // Sort products based on popularity score
        function sortAndShowProducts() {
            let fetchCount;
            fetchCount = 0;

            renderElementAndClean(contentList, loaderProducts, 'afterbegin');

            // Message because this can take a while to process
            const message = document.querySelector('.message');
            setTimeout(() => {
                renderElement(message, 'This can take a while...', 'beforeend');
            }, 5000);

            fetchData(`${productCategoryURL}${code}/${counter}.json`)
                .then((data) => {
                    fetchCount = Math.ceil(data.count / data.page_count);
                })
                .then(() => {
                    const sortContainer = document.querySelector('.sort-container');
                    if (fetchCount >= 1000) {
                        const fetchError = `
                        <div class="error">
                            <h2>We did not allow that many fetches</h2>
                            <img src="../images/Uitroepteken.svg">
                            <p>If you want to sort this you have to do more than 1000 requests we do not allow that.</p>
                        </div>`;

                        renderElementAndClean(contentList, fetchError, 'afterbegin');
                        cleanElement(sortContainer);
                        return;
                    }

                    let allProducts = [];
                    let promises = [];
                    for (let i = 1; i <= fetchCount; i++) {
                        promises.push(fetchData(`${productCategoryURL}${code}/${i}.json`));
                    }
                    Promise.all(promises)
                        .then((data) => {
                            for (let i = 0; i < data.length; i++) {
                                allProducts.push(data[i].products);
                            }
                            const flatProducts = allProducts.flat();

                            let filteredProducts = flatProducts.filter((product) => {
                                return isDataComplete(product);
                            });

                            if (filteredProducts.length === 0) {
                                filteredProducts = flatProducts;
                            }

                            filteredProducts.sort((a, b) => {
                                return b.popularity_key - a.popularity_key;
                            });

                            let sliceCount = 0;
                            productCount = filteredProducts.length;

                            if (filteredProducts.length === 0) {
                                renderElementAndClean(contentList, errorBlock, 'afterbegin');
                                cleanElement(sortContainer);
                                return;
                            }

                            let products = `
                            <p class="count">${productCount} valid products found</p>
                            <ul class="products">
                                ${filteredProducts
                                    .slice(sliceCount * 24, (sliceCount + 1) * 24 - 1)
                                    .map((product) => listItem(product))
                                    .join('\n ')}
                            </ul>
                            <div class="loading-products">
                            </div>`;
                            renderElementAndClean(contentList, products, 'afterbegin');

                            // Lazy load all sorted and filtered products
                            if (productCount > 24) {
                                let observer = new IntersectionObserver(
                                    (elements) => {
                                        const lastCard = elements[0];
                                        if (!lastCard.isIntersecting) return;
                                        loadNextPageSorted(observer, sliceCount, lastCard, filteredProducts);
                                    },
                                    { rootMargin: '500px 0px 0px 0px' },
                                );
                                observer.observe(document.querySelector('.list-item-li:last-child'));
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            renderElementAndClean(contentList, errorBlock, 'afterbegin');
                            cleanElement(sortContainer);
                        });
                });
        }
        function loadNextPageSorted(observer, sliceCount, lastCard, filteredProducts) {
            const productsList = document.querySelector('.products');
            const loadingContainer = document.querySelector('.loading-products');
            const lastChild = document.querySelector('.list-item-li:last-child');

            renderElementAndClean(loadingContainer, `<div class="skeleton"></div>`, 'beforeend');

            sliceCount++;

            observer.unobserve(lastCard.target);

            let slicedProducts = `${filteredProducts
                .slice(sliceCount * 24, (sliceCount + 1) * 24 - 1)
                .map((product) => listItem(product))
                .join('\n ')}`;
            renderElement(productsList, slicedProducts, 'beforeend');

            observer.observe(lastChild);
            cleanElement(loadingContainer);
        }

        function loadNextPage(event, observer, lastCard) {
            const productsList = document.querySelector('.products');
            const loadingContainer = document.querySelector('.loading-products');
            renderElement(loadingContainer, `<div class="skeleton"></div>`, 'beforeend');
            fetchData(`${productCategoryURL}${event.target[0].value}/${counter + 1}.json`)
                .then((data) => {
                    observer.unobserve(lastCard.target);
                    const newProducts = data.products;

                    // Only sorts the first 24 products because of pagination
                    newProducts.sort((a, b) => {
                        return b.popularity_key - a.popularity_key;
                    });

                    const count = document.querySelector('.count');

                    let filteredProducts = newProducts.filter((product) => {
                        return isDataComplete(product);
                    });

                    productCount += filteredProducts.length;
                    renderElementAndClean(count, `${productCount} valid products found`, 'afterbegin');

                    if (filteredProducts.length === 0) {
                        filteredProducts = newProducts;
                    }

                    let productsLi = `${filteredProducts.map((product) => listItem(product)).join('\n ')}`;
                    renderElement(productsList, productsLi, 'beforeend');
                })
                .then(() => {
                    counter++;
                    observer.observe(document.querySelector('.list-item-li:last-child'));
                    cleanElement(loadingContainer);
                });
        }
    },
};

export default ManualInput;
