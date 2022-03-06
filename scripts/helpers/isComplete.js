function isDataComplete(obj) {
    const requiredKeys = ['image_url', 'product_name', 'nutrition_grades'];
    for (const key of requiredKeys) {
        if (!(key in obj) || obj[key].length === 0) {
            return false;
        }
    }
    return true;
}

function isSingleKeyComplete(obj, key) {
    if (!(key in obj) || obj[key].length === 0) {
        return false;
    }
    return true;
}

export { isDataComplete, isSingleKeyComplete };
