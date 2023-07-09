const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/send',
    createProxyMiddleware({
      target: 'https://pizzaland-server.onrender.com',
      changeOrigin: true,
    })
  );
};
