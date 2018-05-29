const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports ={
    entry: './src/RenderHome.js',
    /*devtool: 'cheap-module-eval-source-map',*/
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ReactBundle.js',
        chunkFilename: '[id]_React.js',
        publicPath: ''
    },
    resolve:{
        extensions: ['.js', '.jsx'],
        alias: {          
           'react': path.resolve(__dirname, './node_modules/react'),
          'react-dom': path.resolve(__dirname, './node_modules/react-dom'),      
        }  
    }, 
    externals: {      
        // Don't bundle react or react-dom      
        react: {          
            commonjs: "react",          
            commonjs2: "react",          
            amd: "React",          
            root: "React"      
        },      
        "react-dom": {          
            commonjs: "react-dom",          
            commonjs2: "react-dom",          
            amd: "ReactDOM",          
            root: "ReactDOM"      
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
                exclude: /node_modules/,
                use: [
                    { loader : 'style-loader' },
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
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif|jpe?g)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
              } 
        ]
    },
    plugins:[
      new HtmlWebpackPlugin (
          {
              template: __dirname + '/src/index.html',
              filename: 'index.html',
              inject: 'body'
          }
      ) 
    ]
}