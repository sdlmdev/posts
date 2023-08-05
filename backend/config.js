const {
  NODE_ENV,
  JWT_SECRET,
  MONGODB_URI,
  PORT,
} = process.env;

const config = {
  MONGODB_URI: NODE_ENV === 'prodaction' && MONGODB_URI ? MONGODB_URI : 'mongodb://localhost:27017/postsdb',
  PORT: NODE_ENV === 'prodaction' && PORT ? PORT : 3001,
  JWT_SECRET: NODE_ENV === 'prodaction' && JWT_SECRET ? JWT_SECRET : 'dev-secret',
};

module.exports = config;
