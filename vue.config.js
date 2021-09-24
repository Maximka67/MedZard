module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:9898',
          changeOrigin: true,
          logLevel: 'debug',
          secure: false
          // pathRewrite: {'^/api' : ''}
        },
        }
      }
    }