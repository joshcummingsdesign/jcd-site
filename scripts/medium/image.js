const randomImage = 'https://picsum.photos/1024/500';

/**
 * Given an HTML string, pull the first src
 * from the first image.
 *
 * @param {string} content
 * @return {?string}
 */
const getImageUrlFromContent = (content) => {
  let url = content.match(/<img(.*?)src="(.*?)"/);
  url = url.length ? url[0].match(/src="(.*?)"/)[0] : null;
  return url.replace('src=', '').replace(/['"]+/g, '');
};

/**
 * Returns a random image from lorem picsum.
 *
 * @return {string}
 */
const getRandomImage = () => {
  return 'https://picsum.photos/1024/500';
};

module.exports = {
  getImageUrlFromContent,
  getRandomImage,
};
