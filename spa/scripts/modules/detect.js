const detect = {
    start: function (element) {
        let _scannerRunning = false;
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
                    console.log('Initialization finished. Ready to start');
                    Quagga.start();

                    _scannerRunning = true;

                    Quagga.onDetected((result) => {
                        code = result.codeResult.code;
                        Quagga.stop();
                        const forDelete = document.querySelector(element);
                        forDelete.remove();
                        console.log(code);
                        return code;
                    });
                },
            );
        } else {
            throw new Error('Not supported');
        }
    },
    stop: function (element) {
        Quagga.stop();
        const forDelete = document.querySelector(`${element} > video`);
        forDelete.remove();
        console.log('Stopped manually');
    },
};

export { detect };
