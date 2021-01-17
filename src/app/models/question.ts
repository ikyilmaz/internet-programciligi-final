import {UserProfile} from './user-profile';
import {Answer} from './answer';
import {Category} from './category';

export class Question {
  id?: string;
  content: string;
  ownerId: string;
  categoryId: string;

  userProfile?: UserProfile;
  answers?: Answer[];
  category?: Category;
}
