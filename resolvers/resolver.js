// resolvers/index.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Post = require('../models/post');

const resolvers = {
  getUsers: async () => {
    return await User.find();
  },
  getPosts: async () => {
    return await Post.find();
  },
  register: async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return user;
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id }, 'maai', { expiresIn: '7d' });
    return token;
  },
  createPost: async ({ content }, { user }) => {
    console.log(user);
    if (!user) {
      throw new Error('Authentication required');
    }
    console.log(user._id);
    const post = new Post({ content, author: user._id }); // Access user ID using user._id
    await post.save();
    return post;
  },
  
};

module.exports = resolvers;
