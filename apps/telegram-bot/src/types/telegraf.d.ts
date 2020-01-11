import { ContextMessageUpdate } from 'telegraf';

declare module 'telegraf/typings' {
  interface ContextMessageUpdate {
    mixpanel: any;
  }
}
