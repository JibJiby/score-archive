import path from 'path'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import Dotenv from 'dotenv-webpack'

// 'devServer' 인자를 인식하지 못하는 문제.
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

const isDevelopment = process.env.NODE_ENV !== 'production'

//  파이어 베이스
// https://firebase.google.com/docs/web/module-bundling

const config: Configuration = {
  name: 'score-archive',
  mode: isDevelopment ? 'development' : 'production',
  devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // 바벨이 처리할 확장자 목록.
    alias: {
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
      '@styles': path.resolve(__dirname, 'styles'),
      '@reducers': path.resolve(__dirname, 'reducers'),
      '@store': path.resolve(__dirname, 'store'),
      '@actions': path.resolve(__dirname, 'actions'),
    },
  },
  entry: {
    // key 값이 output의 [name]으로 들어감
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
            // css props
            '@emotion/babel-preset-css-prop',
          ],
          env: {
            development: {
              plugins: [['@emotion', { sourceMap: true }], require.resolve('react-refresh/babel')],
            },
            production: {
              plugins: ['@emotion'],
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: {
      //   files: "./src/**/*",
      // },
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: isDevelopment ? 'development' : 'production',
    }),
    // new HtmlWebpackPlugin({
    //   template: './index.html',
    // }),
    // .env 적용하기 위해
    new Dotenv(),
  ],
  output: {
    // 참고
    // http://daplus.net/javascript-webpack%EC%9D%98-publicpath%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%84%ED%95%A9%EB%8B%88%EA%B9%8C/
    // https://firebase.google.com/docs/web/module-bundling
    path: path.join(__dirname, 'dist'), // 모든 출력 파일을 저장할 경로 (절대 경로)
    filename: '[name].js', // entry의 app 값이 [name]으로 들어감.
    publicPath: '/dist/', // 번들 파일 업로드.  Dev 서버일 때는 index.html의 "/dist"/app.js 와 동일해야함. 직접 html 열때는 ./dist/app.js 로.
    clean: true,
  },
  devServer: {
    historyApiFallback: true, // react router할 때 필요한 설정. 사기쳐주는 설정. spa이기 때문에 'localhost/login 이나 /signup 모두 localhost/로 간다. 이것밖에 없으니까. 있는 것처럼 행동하는게 이 기능.
    port: 3000,
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
    proxy: {
      '/api/': {
        target: 'http://localhost:3005',
        changeOrigin: true,
      },
    },
  },
}

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new ReactRefreshWebpackPlugin())
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }))
}
if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true })) // 압축
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }))
}

export default config
