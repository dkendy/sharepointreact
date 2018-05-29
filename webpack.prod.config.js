const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const DedupePlugin = new webpack.optimize.DedupePlugin();
const CommonChunksPlugin = new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' });

     

module.exports ={
    entry: { 
                vendor: [require.resolve('./polyfills'),'jquery','axios', 'react', 'react-dom','date-fns','redux',
                         'react-redux','redux-saga','react-js-pagination', 'react-intl',
                         'prop-types','react-router-dom','react-slick', 'slick-carousel'], 
                Home: './src/RenderHome.js',  
                Master: './src/RenderMaster.js',

    },
    /*devtool: 'cheap-module-eval-source-map',*/
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id]_React.js',
        publicPath: ''
    },
    
    resolve:{
        extensions: ['.js', '.jsx'],
        alias: {          
           'react': path.resolve(__dirname, './node_modules/react'),
           'react-dom': path.resolve(__dirname, './node_modules/react-dom')        
        }  
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, 
            {
                test: /\.css$/,
                 
                use: [
  
                    {loader: 'css-loader',
                        options:{
                            importLoaders: 1,
                            module: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }        
                    },
                    {
                        loader: 'postcss-loader',
                        options :{
                            ident: 'postcss',
                            plugins : () => [
                                    autoprefixer({
                                        browsers:[
                                            "> 1%",
                                            "last 2 version"
                                        ]
                                    })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader?limit=8000&name=images/[name].[ext]'
            } 
             
        ] 
    },
    plugins:[
     
      new webpack.optimize.UglifyJsPlugin(),
      DedupePlugin,
      new webpack.optimize.CommonsChunkPlugin({name:'vendor'}) 
    ]
}