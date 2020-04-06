const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Board = mongoose.model('Board');
const ListSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Card',
    },
  ],
});

ListSchema.statics.createList = async function (name, board) {
  const List = this;
  const list = new List({ name: name, board: board });
  await list.save();

  const success = list._id !== '';
  if (success) {
    const b = await Board.findById(board);
    b.lists.push(list._id);
    await b.save();
  }
  const message = success ? 'list was created' : `list was not created`;
  return {
    success,
    message,
    list,
  };
};

module.exports = mongoose.model('List', ListSchema);
