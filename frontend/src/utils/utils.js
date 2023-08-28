export const getPages = (posts, chunkSize) => {
  const result = [];

  for (let i = 0; i < posts.length; i += chunkSize) {
    result.push(posts.slice(i, i + chunkSize));
    console.log(result);
  }

  return result;
};
