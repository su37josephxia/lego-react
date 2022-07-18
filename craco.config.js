// * 配置完成后记得重启下
const CracoLessPlugin = require("craco-less");
const path = require('path')
module.exports = {
  webpack: {
    alias: {
    },
    // 以下代码！！！  与alias或babel同级
    configure:(webpackConfig,{env,paths}) => {
      // 修改build的生成文件名称
      paths.appBuild = 'docs';
      webpackConfig.output ={
        ...webpackConfig.output,
        path:path.resolve(__dirname,'docs'),
        publicPath:'./'
      }
      return webpackConfig;
    },
  },


  babel: {
    //用来支持装饰器
    plugins: [["@babel/plugin-proposal-decorators", {legacy: true}]],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {javascriptEnabled: true},
        },
        modifyLessRule: function() {
          return {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
              {loader: "style-loader"},
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[local]_[hash:base64:6]",
                  },
                },
              },
              {loader: "less-loader"},
            ],
          };
        },
      },
    },
  ],
};
