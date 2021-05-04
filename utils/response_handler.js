const normalizeResponse = (data, rest = {}) => ({
    data,
    ...rest
});

module.exports = {
    normalizeResponse,
};
