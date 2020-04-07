const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'List',
    },
  ],
});

BoardSchema.statics.createBoard = async function (name, user) {
  const Board = this;
  const board = new Board({ name: name, user: user });
  await board.save();

  const success = board._id !== '';
  if (success) {
    const u = await User.findById(user);
    u.boards.push(board._id);
    await u.save();
  }
  const message = success ? 'board was created' : `board was not created`;
  return {
    success,
    message,
    board,
  };
};

module.exports = mongoose.model('Board', BoardSchema);
