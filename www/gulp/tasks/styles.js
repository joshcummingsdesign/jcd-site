module.exports = (gulp, config, browserSync, isProduction, plugins) => {
  gulp.task('styles', () => gulp
    .src(config.styles.src + config.styles.pattern)
    .pipe(plugins.plumber())
    .pipe(plugins.if(!isProduction, plugins.sourcemaps.init()))
    .pipe(plugins.sass()).on('error', plugins.sass.logError)
    .pipe(plugins.autoprefixer({browsers: ['last 2 versions']}))
    .pipe(plugins.if(isProduction, plugins.cssnano()))
    .pipe(plugins.if(!isProduction, plugins.sourcemaps.write()))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.stream())
  );
};
