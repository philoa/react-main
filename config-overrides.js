const {
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  adjustStyleLoaders,
} = require("customize-cra");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const { name } = require("./package");
//
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
/**
 * css-modules 模块化
 * @param {Object} cssOptions 样式配置项
 * @param {String} preProcessor loader依赖名称
 * @param {Object} lessOptions loader依赖配置项
 **/
const getStyleLoaders = (cssOptions, preProcessor, lessOptions) => {
  // 获取并使用css-loader
  const loaders = [
    require.resolve("style-loader"),
    {
      loader: require.resolve("css-loader"),
      options: cssOptions,
    },
  ];
  // 如果存在其他loader依赖项
  if (preProcessor) {
    // 将新依赖项，即less-loader，新增到整体中
    loaders.push({
      loader: require.resolve(preProcessor),
      options: lessOptions,
    });
  }
  return loaders;
};

module.exports = {
  webpack: function override(config, env) {
    //按需加载antd
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true, // true是less，如果不用less style的值可以写'css'
    });
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#1DA57A", // 全局主色
        "@link-color ": "#1DA57A", // 链接色
        "@success-color ": "#52c41a", // 成功色
        "@warning-color ": "#faad14", // 警告色
        "@error-color ": "#f5222d", // 错误色
        "@font-size-base ": "14px", // 主字号
        "@heading-color ": "rgba(0, 0, 0, 0.85)", // 标题色
        "@text-color ": "rgba(0, 0, 0, 0.65)", // 主文本色
        "@text-color-secondary ": "rgba(0, 0, 0, 0.45)", // 次文本色
        "@disabled-color ": "rgba(0, 0, 0, 0.25)", // 失效色
        "@border-radius-base ": "4px", // 组件/浮层圆角
        "@border-color-base ": "#d9d9d9", // 边框色
        "@box-shadow-base ": "0 2px 8px rgba(0, 0, 0, 0.15)", // 浮层阴影
      },
    });
    // 获取全局config配置
    const oneOf_loc = config.module.rules.findIndex((n) => n.oneOf);
    // 新增全局配置
    config.module.rules[oneOf_loc].oneOf = [
      {
        test: /\.module\.less$/, // 新增匹配规则
        use: getStyleLoaders(
          {
            importLoaders: 2, // 查询参数，用于配置css-loader之前有多少个loader，这里为2是应为需要postcss-loader和less-loader
            modules: {
              getLocalIdent: getCSSModuleLocalIdent,
              // 配置默认的样式名称规则
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
          "less-loader" // loader依赖名称
        ),
      },
      ...config.module.rules[oneOf_loc].oneOf,
    ];
    adjustStyleLoaders(({ use: [, css] }) => {
      css.options.sourceMap = true;
      css.options.modules = {
        getLocalIdent: (loaderContext, localIdentName, localName, options) => {
          // 处理antd 的样式
          if (loaderContext.resourcePath.includes("node_modules")) {
            return localName;
          }
        },
      };
    });
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = "umd";
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
    addWebpackPlugin(new LodashModuleReplacementPlugin());
    return config;
  },
};
