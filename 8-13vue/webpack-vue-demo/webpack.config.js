//引入path核心模块
const path = require('path');
//引入plugins插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
//引入vue-loder插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  //设置入口
  entry: './src/app.js',
  //设置输出
  output: {
    //设置输出目录
    path: path.join(__dirname, 'dist'),
    //设置输出文件
    filename: 'main.js'
  },
  // 配置dev-serve
  // devServer: {
  //   // 设置对外的公共路径，意味着资源就会放在这个公共路径中，其他人可以访问
  //   publicPath: '/dist'
  //   // contentBase: path.join(__dirname, 'dist'),
  //   // compress: true,
  //   // port: 9000 //不设置默认为8080
  // },
  // 下面添加对不同类型的文件支持
  module: {
    // 解析规则：说白了，就是什么类型的文件我应该调用那种loaer进行解析
    rules: [
      // 里面就是一个一个的具体的配置
      // 1.添加对css文件的加载器
      {
        // 正则表达式：说明所有以.css结尾的文件，都会use指定的loader进行解析处理
        test: /\.css$/i,
        // 1.底层调用loader的时候是从右到左
        // 2.css-loader：能够解析css文件，将代码转换为浏览器所能识别的代码
        // 3.style-loader：可以将解析后的代码自动的添加到页面中
        use: ['style-loader', 'css-loader'],
      },
      // 1.添加对less文件的加载器
      {
        // 正则表达式：说明所有以.less结尾的文件，都会use指定的loader进行解析处理
        test: /\.less$/,
        // 1.底层调用loader的时候是从右到左
        // 2.css-loader：能够解析css文件，将代码转换为浏览器所能识别的代码
        // 3.style-loader：可以将解析后的代码自动的添加到页面中
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      //添加对图片和字体图标的加载器
      {
        // png|jpg|gif:常见的图片资源
        // eot|svg|ttf|woff:字体图标或web字体的字体源文件
        test: /\.(png|jpg|gif|eot|svg|ttf|woff)/,
        use: [{
          loader: 'url-loader',
          options: {
            // limit表示如果图片大于50000byte，就以路径形式展示，小于的话就用base64格式展示
            limit: 50000
          }
        }]
      },
      //添加对vue文件的加载器
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
  },
  // 引入插件
  plugins: [
    new HtmlWebpackPlugin({
      //指定模版的源文件
      template: 'index.html',
      //将模版文件打包构建为目标文件
      filename: 'index.html',
      //指定js文件插入位置
      inject: 'body'
    }),
    new VueLoaderPlugin()
  ]
}