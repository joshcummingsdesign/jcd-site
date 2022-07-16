require('dotenv').config();
const fs = require('fs').promises;
const { parse } = require('rss-to-json');
const { getFormattedDate } = require('./date');
const { getImageUrlFromContent, getRandomImage } = require('./image');
const { renderPosts } = require('./template');

const userName = process.env.MEDIUM_USER_NAME;

const apiUrl = (endpoint) => `https://medium.com${endpoint}`;

const getPosts = async (userName) => {
  return await parse(apiUrl(`/feed/${userName}`));
};

const getPostsMarkup = async () => {
  const posts = await getPosts(userName).then((res) =>
    res.items.map((post) => ({
      title: post.title,
      date: getFormattedDate(new Date(post.created)),
      link: post.link.substring(0, post.link.indexOf('?')),
      image: getImageUrlFromContent(post.content) || getRandomImage(),
    }))
  );

  return renderPosts(posts);
};

const writePostsToFile = async () => {
  const posts = await getPostsMarkup();
  await fs.writeFile('./src/templates/_includes/posts.html', posts);
  console.log('Blog posts written to _includes/posts.html');
};

writePostsToFile();
