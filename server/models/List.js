const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Board = mongoose.model('Board');
const ListSchema = new Schema({
  name: {
    type: String,
    required: true,
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

ListSchema.statics.updateList = async function (id, input) {
  const List = this;
  try {
    const res = await List.findOneAndUpdate({ _id: id }, input, {
      new: true,
      rawResult: true,
    });
    const success = res.ok;
    const message = success ? 'list was updated' : `list failed to update`;
    const list = res.value;
    return {
      success,
      message,
      list,
    };
  } catch (error) {
    return {
      success: false,
      message: 'failed to update list. Double check list ID',
    };
  }
};

ListSchema.statics.deleteList = async function (id) {
  const List = this;
  try {
    const res = await List.deleteOne({ _id: id });
    const success = res.ok;
    const message = success ? 'list was deleted' : `list failed to delete`;
    return {
      success,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: 'failed to delete list. Double check list ID',
    };
  }
};

module.exports = mongoose.model('List', ListSchema);
