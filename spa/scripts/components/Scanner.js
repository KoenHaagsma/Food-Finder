import { detect } from '../modules/detect.js';

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
            console.log(result);
        });
    };

    buttonStop.onclick = (event) => {
        event.preventDefault;
        detect.stop(`.${div.className}`);
    };

    return div;
};
