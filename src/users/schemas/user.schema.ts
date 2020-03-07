import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  hash: {
    type: String,
    required: false,
  },
  salt: {
    type: String,
    required: false,
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
