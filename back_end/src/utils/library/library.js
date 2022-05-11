export function getToLowerValues(object) {
    return Object.values(object).reduce((accumulator, value) => {
        accumulator[value] = object[value.toLowerCase()];
        return accumulator;
    }, {});
}

export function getCapitalizedString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function toJSON(singleRowDataPacket) {
    return JSON.parse(JSON.stringify(singleRowDataPacket));
}

export function toJSONArray(singleRowDataPacket) {
    return Object.values(JSON.parse(JSON.stringify(singleRowDataPacket)));
}