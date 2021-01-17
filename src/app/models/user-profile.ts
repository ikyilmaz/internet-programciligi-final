export class UserProfile {
  id?: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";

  userId: string;
}
