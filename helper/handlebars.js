module.exports = {
    equals: (a, b) => a === b,
    inList: (a, list, key) => {
        for (let i = 0; i < list.length; i++) {
            if (a === list[i].key) {
                return true;
            }
        }
    }
};
