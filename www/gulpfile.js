// Node modules
const argv         = require('minimist')(process.argv.slice(2));
const browserSync  = require('browser-sync').create();
const del          = require('del');
const exec         = require('child_process').exec;
const gulp         = require('gulp');
const stylish      = require('jshint-stylish');
const runSequence  = require('run-sequence');

// Autoload gulp plugins from npm
const plugins = require('gulp-load-plugins')({
  overridePattern: false,
  camelize: true,
  pattern: ['gulp-*', 'gulp.*']
});

// Configuration
const config = require('./gulp/config');
const isProduction = argv.production;

// Gulp utilities
const sh = require('./gulp/utilities/sh');

// Gulp tasks
require('./gulp/tasks/reload')(gulp, browserSync);
require('./gulp/tasks/clean')(gulp, config, del);
require('./gulp/tasks/scripts')(gulp, config, plugins, stylish, browserSync, runSequence);
require('./gulp/tasks/styles')(gulp, config, browserSync, isProduction, plugins);
require('./gulp/tasks/images')(gulp, config, plugins, runSequence);
require('./gulp/tasks/jekyll')(gulp, exec, config, runSequence, sh);
require('./gulp/tasks/medium')(gulp, exec, sh);

// Serve the app and start watching
gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: config.server.public
    },
    open: false
  });
  plugins.watch(config.jekyll.watch, () => gulp.start('jekyll-watch'));
  plugins.watch(config.scripts.watch, () => gulp.start('scripts'));
  plugins.watch(config.styles.src, () => gulp.start('styles'));
  plugins.watch(config.images.src, () => gulp.start('images-watch'));
});

// The default gulp task which compiles everything
gulp.task('default', (cb) => {
  runSequence(
    'clean',
    'styles',
    ['scripts', 'images'],
    'jekyll-full-build',
    cb
  );
});
