module.exports = (ctx) => ({
    parser: ctx.sugar ? 'sugarss' : false,
    map: ctx.env === 'development' ? ctx.map : false,
    from: ctx.from,
    to: ctx.to,
    plugins: {
        'postcss-import': {},
        'postcss-import': {},
        'postcss-nested': {},
        cssnano: ctx.env === 'production' ? {} : false
    }
})