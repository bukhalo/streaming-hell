import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    index: true,
  },
  isBot: {
    type: Boolean,
    required: true,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  languageCode: {
    type: String,
    required: false,
  },
});
