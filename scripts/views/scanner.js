import { detect } from '../modules/detect.js';
import { fetchData } from '../modules/fetch.js';

const Scanner = {
    render: async () => {
        const view = `
            <section class="section scanner">
                <h1>Scan the product barcode</h1>
                <div class="container">
                    <section class="loading-container">
                        <img src="./images/Preloader_3.gif">
                        <p>Scanner is loading...</p>
                    </section>
                </div>
                <div class="link_container">
                    <button>Stop scanning</button>
                    <a href="/Food-Finder/#/manual">Can't scan product? Fill in code</a>
                </div>
            </section>
        `;
        return view;
    },
    after_render: async () => {
        const buttons = document.querySelectorAll('button');
        const div = document.querySelector('.container');
        const url = 'https://world.openfoodfacts.org/api/v0/product/';
        detect.start(`.${div.className}`, (result) => {
            fetchData(url, result).then((data) => {
                if (data.status === 1) {
                    console.log('Found!');
                    console.log(data);
                } else if (data.status === 0) {
                    console.log('Not Found!');
                    console.log(data);
                }
            });
        });

        buttons[0].onclick = (event) => {
            event.preventDefault;
            detect.stop(`.${div.className}`);
            location.href = '/Food-Finder/#/';
        };
    },
};

export default Scanner;
