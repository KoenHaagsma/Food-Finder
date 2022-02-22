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
                        readers: ['code_128_reader', 'ean_reader', 'ean_8_reader'],
                    },
                },
                function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    Quagga.start();

                    _scannerRunning = true;

                    Quagga.onDetected((result) => {
                        code = result.codeResult.code;
                        console.log(code);
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
        console.log('Stopped');
        _scannerRunning = false;
    },
};

export { detect };
