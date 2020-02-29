import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  telegram: {
    userID: {
      type: Number,
      index: true,
    },
    isBot: Boolean,
    languageCode: String,
    firstName: String,
    lastName: String,
    username: String,
  },
});
