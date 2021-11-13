const path = require("path");
// To optimize the size of the bundle. It comes out of the box in webpack 5.
// For images it is injected as b64 instead of seperate file in dist.
// const TerserPlugin = require("terser-webpack-plugin");
// This plugin will place the styles in seperate folder called styles.css instead of injecting it in style tag.
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// To clean dist folder before generating new bundles.
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// To change contenthash automatically in html file, whenever script file name is changed.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

// contenthash: creates a unique hash based on content, if content changes the hash changes.
// can be used for both scripts and styles.
// this is useful for browser caching.
// not required in development mode

// List of Webpack Plugins @ https://webpack.js.org/plugins/

module.exports = {
  // entry script.
  entry: "./src/index.js",
  output: {
    // Output filename.
    filename: "bundle.js",
    // Output path.
    path: path.resolve(__dirname, "./dist"),
    // publicPath is a required param in webpack 4.
    // need to specify either absolute or relative path.
    // in webpack 5 it defaults as publicPath: "auto"
    // which takes the path of src folder.
    // we can also specify a cdn url as a value.
    publicPath: "", // specify as "" when using html webpack plugin. else specify the path "/dist"
  },
  // development, production, none
  // development mode: does not minify code, sets process.env.
  mode: "development",
  // Development server configuration.
  devServer: {
    port: 9000, // where to serve
    static: {
      // what to serve.
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      // file that is going to act as entry point.
      index: "index.html",
      // to save the changes to disk.
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      // for static assets.
      {
        test: /\.(png|jpg|jpeg)$/,
        // asset/resource type generates a new file in the output directory
        // for each of your assets and exports the URL to that file.

        // Asset/inline module type generates a base64 representation of your asset
        // and injects that base64 string directly into your main JavaScript bundle.
        // useful, when there are many images on the page.
        // and we dont need to make multiple requests in this case.

        // just "asset".
        // If you are using this general asset type, Webpack will automatically choose between asset/resource and
        // asset/inline. Webpack will make this decision based on the size of each file.
        // If the file size is less than 8 kilobytes, this file will be treated as an inline asset.
        // And if the file size is more than 8 kilobytes, this file will be treated as a resource asset.
        // Of course, it's possible to change this magic number from 8 kilobytes to anything you want.

        // asset/source reads the content of the file into a JavaScript string
        // and injects that string directly into the JavaScript bundle as is.
        type: "asset/inline",
        parser: {
          dataURLCondition: {
            // Here we can specify the maximum size of the file
            // for which Webpack is going to treat as an inline type of asset
            maxSize: 3 * 1024, // 3kb
          },
        },
      },
      {
        test: /\.(txt)$/,
        type: "asset/source",
      },
      {
        test: /\.(css)$/,
        use: [
          // We use loaders when we need to import different files.
          // When we need to import css files, we use css-loader,
          // when we need to import xml files, we use xml-loader.
          // Reads the CSS and injects it.
          "style-loader",
          // Replace style loader with mini css extract.
          // MiniCssExtractPlugin.loader,
          // Reads CSS file and returns the contents.
          "css-loader",
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          // Order of import is important.
          // Reads the CSS and injects it in style tag.
          "style-loader",
          // Replace style loader with mini css extract.
          // MiniCssExtractPlugin.loader,
          // Reads CSS file and returns the contents.
          "css-loader",
          // It will convert our sass to css.
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        // This rule will be applicable to all JavaScript files except those located inside the node_modules folder.
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // env preset compiles EcmaScript 6, 7, 8, 9, 10 etc down to EcmaScript 5.
            presets: ["@babel/env"],
            // To make use of class properties in unsupported browsers.
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.(hbs)$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    // not needed in development as code minification takes time.
    // new TerserPlugin(),
    // not needed during development.
    // new MiniCssExtractPlugin({
    //   filename: "styles.css",
    // }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   // Other options: https://github.com/jantimon/html-webpack-plugin
    //   // Page Title
    //   title: "Hello World",
    //   // filename: "subfolder/custom_filename.html",
    //   // Meta Tags
    //   meta: {
    //     description: "Some description",
    //   },
    // }),
    // For Handlebars.
    new HtmlWebpackPlugin({
      title: "Some Title",
      template: "src/index.hbs",
      description: "Some Description",
    }),
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
