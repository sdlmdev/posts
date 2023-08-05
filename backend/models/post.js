const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'user',
  // },
}, {
  versionKey: false,
});

module.exports = mongoose.model('Post', postSchema);
