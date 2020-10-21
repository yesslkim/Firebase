const path = require('path'); // node 라이브러리에서 패스라는 모듈을 가져오는 것.(absolute path용)

module.exports = {
  entry: './src/index.js', //상대주소 기입
  output: {
    path: path.resolve(__dirname, 'dist/assets'), //폴더이름은 기입 ㄴㄴ
    filename: 'bundle.js'
  },
  devServer: {
    contentBase:  path.resolve(__dirname, 'dist'), // absolute path for bundle.js to have server
    publicPath: '/assets/' // path in my folder
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          preset: ['@babel/preset-env']
        }
      }
    }]
  }
};

//웹팩이 어떻게 진행될껀지? 알려주는 객체. 
//절대주소기입 . 문제점 : 다른사람이 내 파일을 보려면 다시 바꿔야됨 . 그래서 절대주소에 사용할 수 있는게 __dirname 
// 웹팩을 실행하면 어디서 시작하는지 알수 있게됨!!