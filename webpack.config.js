const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "umd",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.sass?$/,
        exclude: /node_modules/,
        use: [
          { 
            loader: "style-loader" 
          }, 
          { 
            loader: "css-loader" 
          }, 
          { 
            loader: "sass-loader" 
          }
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "../dev/report.html",
      openAnalyzer: false,
    }),
  ],
  devtool: "eval",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
  },
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false
  }
};
