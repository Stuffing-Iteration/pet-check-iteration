const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dirname } = require('path');


module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        port: '8080',
        host: 'localhost',
        static: {
            directory: path.resolve(__dirname, 'client'),
            publicPath: '/'
        },
        liveReload: true,
        proxy: {
            context: ['/api'],
            target: 'https://localhost8080/',
            router: () => 'https://locahost:3000',
            secure: false,
            changeOrigin: true,
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s?css$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Webpack App',
        template: './index.html'
    })],
}