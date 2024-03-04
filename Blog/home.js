const postList = document.getElementById('post-list');

const posts = [
  {
    title: 'My First Blog Post',
    date: 'March 1, 2023',
    content: 'This is the content of my first blog post.',
  },
  {
    title: 'My Second Blog Post',
    date: 'March 3, 2023',
    content: 'This is the content of my second blog post.',
  },
];

posts.forEach((post) => {
  const listItem = document.createElement('li');
  const title = document.createElement('h3');
  const date = document.createElement('p');
  const content = document.createElement('p');

  title.textContent = post.title;
  date.textContent = post.date;
  content.textContent = post.content;

  listItem.appendChild(title);
  listItem.appendChild(date);
  listItem.appendChild(content);
  postList.appendChild(listItem);
});