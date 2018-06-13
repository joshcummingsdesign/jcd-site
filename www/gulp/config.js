module.exports = (() => {

  // PROJECT
  const project = {
    src: './src',
    dest: './html',
    assets: './html/assets'
  };

  // JEKYLL
  const jekyll = {
    dest: './_site',
    watch: [
      '_config.yml',
      '*.html',
      `${project.src}/**/*.html`
    ]
  };

  // SCRIPTS
  const scripts = {
    src: `${project.src}/scripts`,
    dest: `${project.assets}/scripts`,
    watch: [`${project.src}/scripts`],
    pattern: '/**/*.js',
    input: 'main.js',
    output: 'main.js'
  };

  // STYLES
  const styles = {
    src: `${project.src}/styles`,
    dest: `${project.assets}/styles`,
    pattern: '/**/*.{sass,scss}'
  };

  // IMAGES
  const images = {
    src:  `${project.src}/images`,
    dest: `${project.assets}/images`,
    pattern: '/**/*.{gif,ico,jpeg,jpg,png,svg,webp}'
  };

  // SERVER
  const server = {
    public: './html'
  };

  return {
    project: project,
    jekyll: jekyll,
    scripts: scripts,
    styles: styles,
    images: images,
    server: server
  };

})();
