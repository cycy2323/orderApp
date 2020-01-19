const path = require('path');

export default {
  "proxy": {
    "/apis":{
        "target": "https://wd9777183800mbsljr.wilddogio.com/",
        "changeOrigin": true,
        "pathRewrite": {"^/apis": ""}
    }
  },
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
  ],
  alias: {
    Assets: path.resolve(__dirname, './src/assets')
  },
  publicPath: '/'
};
