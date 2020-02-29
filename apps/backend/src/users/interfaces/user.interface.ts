import { Document } from 'mongoose';

interface Telegram {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface User extends Document {
  readonly telegram: Telegram;
}
