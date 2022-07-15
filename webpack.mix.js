const mix = require('laravel-mix');
require('dotenv').config();

/*----------  Config  ----------*/

const isProd = process.env.NODE_ENV === 'production';
const localUrl = !isProd && process.env.LOCAL_URL;

mix.webpackConfig({
  externals: {
    jquery: 'jQuery',
  },
});

/*----------  Options  ----------*/

mix.options({
  processCssUrls: false,
  terser: {
    extractComments: false,
  },
});

/*----------  Output  ----------*/

mix.setPublicPath('assets');

/*----------  BrowserSync  ----------*/

if (!isProd) {
  mix.browserSync({
    proxy: localUrl,
    files: ['**/*'],
    watchOptions: {
      ignored: ['vendor', 'assets', '_site'],
    },
  });
}

/*----------  Sass  ----------*/

mix.sass('src/styles/main.scss', 'assets/styles').sourceMaps(!isProd, 'inline-source-map').version();

/*----------  JavaScript  ----------*/

mix.js('src/js/main.js', 'assets/js').sourceMaps(!isProd, 'inline-source-map').version();
mix.copyDirectory('src/js/vendor', 'assets/js/vendor');

/*----------  Images  ----------*/

mix.copyDirectory('src/images', 'assets/images');
