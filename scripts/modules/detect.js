import Utils from '../helpers/Utils.js';
let _scannerRunning = false;

const detect = {
    start: function (element, callback) {
        let code;

        if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
            Quagga.init(
                {
                    inputStream: {
                        name: 'Live',
                        type: 'LiveStream',
                        target: document.querySelector(element),
                    },
                    decoder: {
                        readers: ['code_128_reader', 'ean_reader'],
                    },
                },
                function (err) {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    Quagga.start();

                    _scannerRunning = true;
                    if (_scannerRunning) {
                        document.querySelector('.loading-container').style.display = 'none';
                    }

                    Quagga.onDetected((result) => {
                        code = result.codeResult.code;
                        // Custom callback by Robert Spier
                        callback(code);
                        detect.stop(`${element}`);
                    });
                },
            );
        } else {
            throw new Error('Not supported');
        }
    },
    stop: function (element) {
        Quagga.stop();
        const videoDelete = document.querySelector(`${element} > video`);
        const canvasDelete = document.querySelector(`${element} > canvas`);
        if (videoDelete) {
            videoDelete.remove();
        }
        if (canvasDelete) {
            canvasDelete.remove();
        }
        _scannerRunning = false;
    },
};

export { detect };
