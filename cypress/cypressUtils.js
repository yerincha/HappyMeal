const utils = {};

utils.getElementById = (name) => {
    return `[id='${name}']`;
}

utils.getElementByType = (name) => {
    return `[type='${name}']`;
}

utils.getElementByDataTestId = (name) => {
    return `[data-testid='${name}']`;
}

utils.getElementByName = (name) => {
    return `[name='${name}']`;
}

export default utils;
