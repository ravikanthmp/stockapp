const HtmlWebpackPlugin = require("html-webpack-plugin");
path = require('path');
module.exports = {
    entry : './app/index.js',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : 'index_bundle.js',
        publicPath: '/'
    },
    module : {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }],
                            ['@babel/preset-react']
                        ],
                        "plugins": [["@babel/plugin-proposal-class-properties", { "loose": true }]]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['svg-inline-loader'],
            }
        ]
    },
    mode : process.env.NODE_ENV === 'development'? 'development' : 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template : 'app/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
}