module.exports = {
    getConviction: (a, D, y0, x, t) => {
        if (t === 0) {
            return 0;
        }
        let y = y0 + (x - y0) * (1 - 1 / (1 + (t / (10 * a))));
        return y;
    },

    getConviction_old: (a, D, y0, x, t) => {
        let y = y0 * a ** t + (x * (1 - a ** t)) / (1 - a);
        return y;
    }
};
