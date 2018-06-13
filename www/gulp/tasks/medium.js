module.exports = (gulp, exec, sh) => {
  gulp.task('medium', cb => sh(exec, 'bash -c "node ./medium.js"', () => cb()));
};
