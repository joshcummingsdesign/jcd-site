module.exports = (gulp, config, plugins, stylish, browserSync, runSequence) => {
  gulp.task('scripts-lint', () => gulp
    .src(`${config.scripts.src}/${config.scripts.input}`)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish))
  );

  gulp.task('scripts-compile', () => gulp
    .src(config.scripts.src + config.scripts.pattern)
    .pipe(plugins.uglify())
    .pipe(plugins.concat(config.scripts.output))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.stream())
  );

  gulp.task('scripts', cb => {
    runSequence('scripts-lint', 'scripts-compile', cb);
  });
};
