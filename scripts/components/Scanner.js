import { detect } from '../modules/detect.js';
import { fetchData } from '../modules/fetch.js';

export const Scanner = () => {
    const div = document.createElement('div');
    const buttonStart = document.createElement('button');
    const buttonStop = document.createElement('button');
    buttonStart.innerText = 'Start scanning';
    buttonStop.innerHTML = 'Stop scanning';

    div.className = 'container';
    div.appendChild(buttonStart);
    div.appendChild(buttonStop);

    buttonStart.onclick = (event) => {
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

    buttonStop.onclick = (event) => {
        event.preventDefault;
        detect.stop(`.${div.className}`);
    };

    return div;
};
