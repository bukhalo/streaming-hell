import { Document } from 'mongoose';

export interface User extends Document {
  userId: string;
  isBot: boolean;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
}
