import { PostImage } from './PostImage';
import { User } from './User';

export type Post = {
  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: PostImage[];
};
