var webpack = require('webpack');
var ExtractPlugin = require('extract-text-webpack-plugin');
var production = process.env.NODE_ENV === 'production';

var plugins = [
    new ExtractPlugin('bundle.css'), // <=== where should content be piped
    new webpack.optimize.CommonsChunkPlugin({
        name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    }),

    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "Tether": 'tether',
        "window.Tether": "tether"
    })

];


if (production) {
    plugins = plugins.concat([

        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle:   true,
            compress: {
                warnings: false, // Suppress uglification warnings
            },
        }),


    ]);
}



module.exports = {
    entry:  './src',
    output: {
        path:     'builds',
        filename: 'bundle.js',
    },
    plugins: plugins,
    module: {
        loaders: [
            {
                test:   /\.js/,
                loader: 'babel',
                include: __dirname + '/src',
            },
            {
                test:   /\.scss/,
                loader: ExtractPlugin.extract('style', 'css!sass?outputStyle=compressed'),
            },
            { test: /\.css$/, loader: ExtractPlugin.extract('style', 'css?outputStyle=compressed!sass') },
            {
                test:   /\.html/,
                loader: 'html',
            },
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2" },
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file', exclude: /node_modules/}
        ],
    }
};