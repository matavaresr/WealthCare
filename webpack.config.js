const path = require('path');

module.exports = {
  entry: './src/index.js', // Ruta a tu archivo principal de JS
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Directorio de salida
  },
  mode: 'production', // Modo de producción para optimización
};
