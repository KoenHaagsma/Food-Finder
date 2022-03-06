import { fetchData } from '../modules/fetch.js';
import { errorBlock } from './components/errorMessage.js';
import { listItem } from './components/listItem.js';
import { isDataComplete } from '../helpers/isComplete.js';
import { prefix } from '../config/config.js';

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
                <div class='link-container'><a href="${prefix}"><img src="./images/camera.png"></a></div> 
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
            productCount = 0;
            event.preventDefault();
            header.classList.add('active');
            counter = 1;
            code = event.target[0].value;
            contentList.innerHTML = `
            <div class="loader">
                <img src='./images/Preloader_3.gif'>
                <p>Searching product...</p>
            </div>`;

            // Add sort button only when something has already been fetched once
            const sortContainer = document.querySelector('.sort-container');
            sortContainer.innerHTML = '<div class="WIPDIV">Sort items based on popularity</div>';
            if (sortContainer) {
                const div = document.querySelector('.WIPDIV');
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
                            console.log(`data.status, data.count, data.completness triggerd higher`);
                            contentList.innerHTML = errorBlock;
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
                        contentList.innerHTML = `
                        <p class="count">${productCount} valid products found</p>
                        <ul class="products">
                            ${filteredProducts.map((product) => listItem(product)).join('\n ')}
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
                                                count.innerHTML = `${productCount} valid products found`;
                                                if (filteredProducts.length === 0) {
                                                    filteredProducts = newProducts;
                                                }

                                                productsList.innerHTML += `
                                                ${filteredProducts.map((product) => listItem(product)).join('\n ')}`;
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
                        console.log(error);
                        contentList.innerHTML = errorBlock;
                    });

                // Product code search
            } else if (!isNaN(event.target[0].value)) {
                fetchData(`${productCodeURL}${event.target[0].value}`)
                    .then((data) => {
                        if (data.status === 0 || data.count === 0 || data.product.completeness === 0) {
                            console.log(`data.status, data.count, data.completness triggerd lower`);
                            contentList.innerHTML = errorBlock;
                            return;
                        }
                        location.href = `${prefix}details/${data.product._id}`;
                    })
                    .catch((error) => {
                        console.log(error);
                        contentList.innerHTML = errorBlock;
                    });
            } else {
                console.log(`couldn't find info with given parameters`);
            }
        });

        function sortAndShowProducts() {
            let fetchCount;
            fetchCount = 0;

            contentList.innerHTML = `
                <div class="loader">
                    <img src='./images/Preloader_3.gif'>
                    <p class="message"></p>
                    <p>Sorting products...</p>
                </div>`;

            // Message because this can take a while to process
            const message = document.querySelector('.message');
            setTimeout(() => {
                message.innerHTML = 'This can take a while...';
            }, 5000);

            fetchData(`${productCategoryURL}${code}/${counter}.json`)
                .then((data) => {
                    fetchCount = Math.ceil(data.count / data.page_count);
                })
                .then(() => {
                    if (fetchCount >= 1000) {
                        contentList.innerHTML = `
                                <div class="error">
                                    <h2>We did not allow that many fetches</h2>
                                    <img src="../images/Uitroepteken.svg">
                                    <p>If you want to sort this you have to do more than 1000 requests we do not allow that.</p>
                                </div>`;
                        sortContainer.innerHTML = '';
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
                                contentList.innerHTML = errorBlock;
                                sortContainer.innerHTML = '';
                                return;
                            }

                            contentList.innerHTML = `
                            <p class="count">${productCount} valid products found</p>
                            <ul class="products">
                                ${filteredProducts
                                    .slice(sliceCount * 24, (sliceCount + 1) * 24 - 1)
                                    .map((product) => listItem(product))
                                    .join('\n ')}
                            </ul>
                            <div class="loading-products">
                            </div>`;

                            // Lazy load all sorted and filtered products
                            if (productCount > 24) {
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
                                            sliceCount++;
                                            observer.unobserve(lastCard.target);
                                            productsList.innerHTML += `${filteredProducts
                                                .slice(sliceCount * 24, (sliceCount + 1) * 24 - 1)
                                                .map((product) => listItem(product))
                                                .join('\n ')}`;
                                            observer.observe(document.querySelector('.list-item-li:last-child'));
                                            loadingContainer.innerHTML = '';
                                        }
                                    },
                                    { rootMargin: '500px 0px 0px 0px' },
                                );
                                observer.observe(document.querySelector('.list-item-li:last-child'));
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            contentList.innerHTML = errorBlock;
                            sortContainer.innerHTML = '';
                        });
                });
        }
    },
};

export default ManualInput;
