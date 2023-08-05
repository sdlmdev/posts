const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

const getPosts = async () => {
  const request = await fetch('http://localhost:3001/posts', {
    headers: {
      'Content-type': 'application/json',
    },
  });
  return checkResponse(request);
};

const createPost = async (data) => {
  const request = await fetch('http://localhost:3001/posts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
    }),
  });
  return checkResponse(request);
};

module.exports = {
  getPosts,
  createPost,
};
