module.exports = {
    getConviction: (a, y0, x, t) => {
        if (t === 0) {
            return 0;
        }
        let y = y0 + (x - y0) * (1 - 1 / (1 + (t / (10 * a))));
        return y;
    }
};
