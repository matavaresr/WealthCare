const path = require('path');

module.exports = {
  entry: './server.js', // Ruta a tu archivo principal de JS
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Directorio de salida
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
    ],
  },
  mode: 'production', // Modo de producción para optimización
};
