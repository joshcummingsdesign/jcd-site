module.exports = (gulp, exec, config, runSequence, sh) => {

  // Build jekyll
  gulp.task('jekyll-build', cb => sh(exec, 'bash -c "bundle exec jekyll build"', () => cb()));

  // Copy jekyll into html dir
  gulp.task('jekyll-copy', () => gulp.src([`${config.jekyll.dest}/**/*`, `${config.jekyll.dest}/**/.*`]).pipe(gulp.dest(config.project.dest)));

  // Watch jekyll
  gulp.task('jekyll-watch', cb => {
    runSequence('jekyll-build', 'jekyll-copy', 'reload', cb);
  });

  // Jekyll full build
  gulp.task('jekyll-full-build', cb => {
    runSequence('jekyll-build', 'jekyll-copy', cb);
  });
};
