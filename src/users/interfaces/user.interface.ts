import { Document } from 'mongoose';

interface Telegram {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface User extends Document {
  readonly username: string;
  readonly email: string;
  readonly hash: string;
  readonly salt: string;
  readonly roles: string[];
  readonly telegram: Telegram;
}
