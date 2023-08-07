import { User } from './user.model';

export interface Post {
  title: string;
  id: number;
  body: string;
  userId: number;
  user?: User;
}
