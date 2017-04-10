var webpack = require('webpack');
var ExtractPlugin = require('extract-text-webpack-plugin');
var production = process.env.NODE_ENV === 'production';
var CleanPlugin = require('clean-webpack-plugin');
var path = require('path');

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
        "window.jQuery": "jquery",
        "Tether": 'tether',
        "window.Tether": "tether",
        Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
        Button: "exports-loader?Button!bootstrap/js/dist/button",
        Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
        Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
        Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
        Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
        Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
        Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
        Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),

    new webpack.HotModuleReplacementPlugin(),

];


if (production) {
    plugins = plugins.concat([

        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 5200, // ~50kb
        }),

        // Cleanup the builds/ folder before
        // compiling our final assets
        new CleanPlugin('builds'),

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
        path:           "builds",
        publicPath:     "/builds/",
        filename:       production ? '[name]-[hash].js' : 'bundle.js',
        chunkFilename: '[name]-[chunkhash].js',
    },
    plugins: plugins,
    devServer: {
        hot: true,
        inline: true,
        open: true,
        port: 9090,
        host: "0.0.0.0"
    },
    devtool: 'source-map',
    module: {
        loaders: [

            {
                test:   /\.js/,
                loader: 'babel',
                include: __dirname + '/src',
            },
            {
                test:   /\.scss/,
                loader: ExtractPlugin.extract('style', production ?  'css!sass?outputStyle=compressed' : 'css?sourceMap!sass?sourceMap'),
            },
            {
                test: /\.css$/,
                loader: ExtractPlugin.extract('style', production ?  'css!sass?outputStyle=compressed' : 'css?sourceMap!sass?sourceMap')
            },
            {
                test:   /\.html/,
                loader: 'html',
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff2"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot)$/,
                loader: 'file',
                exclude: /node_modules/
            },
            {
                test: /bootstrap\/dist\/js\/umd\//,
                loader: 'imports'
            }
        ],
    }
};

/*
 loader: ExtractPlugin.extract({
    fallback: 'style-loader',
     use: [

        {
            loader: "css-loader",
            options: {
                sourceMap: true
            }
        }
        "less-loader"
        ]
     })
 */
