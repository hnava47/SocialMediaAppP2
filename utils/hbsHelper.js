module.exports = {
    equals: (a, b) => {
        return a === b;
    },
    minus: (a, b) => {
        return a - b;
    },
    inList: (a, list, key) => {
        for (let i = 0; i < list.length; i++) {
            if (a === list[i][key]) {
                return list[i];
            }
        }
        return;
    }
};
