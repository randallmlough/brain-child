module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongo_uri: process.env.MONGO_URI,
  secretOrKey: process.env.JWT_SECRET,
};
