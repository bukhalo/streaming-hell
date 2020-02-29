import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
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
