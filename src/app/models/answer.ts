import {UserProfile} from './user-profile';
import {Question} from './question';

export class Answer {
  id?: string;
  content: string;
  questionId: string;
  ownerId: string;

  question?: Question;
  userProfile?: UserProfile;
}
