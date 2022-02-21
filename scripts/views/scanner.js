import { detect } from '../modules/detect.js';
import { fetchData } from '../modules/fetch.js';

const Scanner = {
    render: async () => {
        const view = `
            <section class="section">
                <div class="container">
                    <button>Start scanning</button>
                    <button>Stop scanning</button>
                </div>
            </section>
        `;
        return view;
    },
    after_render: async () => {
        const buttons = document.querySelectorAll('button');
        const div = document.querySelector('.container');
        buttons[0].onclick = (event) => {
            event.preventDefault;
            detect.start(`.${div.className}`, (result) => {
                fetchData(result).then((data) => {
                    if (data.status === 1) {
                        console.log('Found!');
                        console.log(data);
                    } else if (data.status === 0) {
                        console.log('Not Found!');
                        console.log(data);
                    }
                });
            });
        };

        buttons[1].onclick = (event) => {
            event.preventDefault;
            detect.stop(`.${div.className}`);
        };
    },
};

export default Scanner;
