// https://github.com/rishavs/vanillajs-spa
const Utils = {
    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    parseRequestURL: () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split('/');
        let request = {
            resource: null,
            id: null,
            verb: null,
        };
        // After first slash
        request.resource = r[1];
        // Slash after first slash
        request.id = r[2];
        // ???
        request.verb = r[3];

        return request;
    },

    sleep: (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },
};

export default Utils;
