const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretOrKey } = require('../config');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32,
  },
  // todo: implement later
  // boards: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Board"
  //   }
  // ]
});

UserSchema.statics.login = async function (email, password) {
  const User = this;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    user.token = 'Bearer ' + jwt.sign({ _id: user._id }, secretOrKey);
    user.loggedIn = true;
    return user;
  }
  return null;
};

UserSchema.statics.signUp = async function (email, password) {
  const User = this;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return new Error('user exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email: email,
    password: hashedPassword,
  });
  await user.save();

  const token = jwt.sign({ _id: user._id }, secretOrKey);

  user.token = 'Bearer ' + token;
  await user.save();

  return user;
};

module.exports = mongoose.model('User', UserSchema);
