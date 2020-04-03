const mongoose = require('mongoose');
require('../models');
const { mongo_uri: db } = require('../config');

const bcrypt = require('bcryptjs');

const User = mongoose.model('User');
const Board = mongoose.model('Board');
const Card = mongoose.model('Card');

console.log('DB CONFIG', db);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

const seedDatabase = async () => {
  const hashedPassword = await bcrypt.hash('password', 10);
  const user = new User({
    email: 'demo@example.com',
    password: hashedPassword,
  });
  await user.save();

  const { Faker } = require('fakergem');
  const boards = [];
  for (let j = 0; j < 3; j++) {
    const board = new Board({ name: Faker.Book.title(), user: user._id });
    boards.push(await board.save());
  }

  const cards = [];
  for (let i = 0; i < 10; i++) {
    const randomBoard = boards[Math.floor(Math.random() * boards.length)];
    const card = new Card({
      title: Faker.Book.title(),
      board: randomBoard._id,
    });
    cards.push(await card.save());
  }

  mongoose.connection.close();
};

seedDatabase()
  .then(() => console.log('Successfully seeded database'))
  .catch((e) => console.log('An error occured while seeding', e));
