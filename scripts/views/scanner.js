import { detect } from '../modules/detect.js';
import { fetchData } from '../modules/fetch.js';
import { prefix } from '../config/config.js';

const Scanner = {
    render: async () => {
        const view = `
            <section class="section scanner">
                <div class="header-container">
                    <h1>Food finder</h1>
                    <p>Scan het product</p>
                </div>
                <div class="container">
                    <section class="loading-container">
                        <img src="./images/Preloader_3.gif">
                        <p>Scanner is loading...</p>
                    </section>
                </div>
                <div class="link_container">
                    <button>Code invoeren</button>
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
            fetchData(`${url}${result}`).then((data) => {
                if (data.status === 1) {
                    console.log('Found!');
                    location.href = `${prefix}details/${result}`;
                } else if (data.status === 0) {
                    console.log('Not Found!');
                    location.href = `${prefix}error`;
                }
            });
        });

        buttons[0].onclick = (event) => {
            event.preventDefault;
            detect.stop(`.${div.className}`);
            location.href = `${prefix}manual`;
        };
    },
};

export default Scanner;
