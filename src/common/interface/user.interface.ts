export interface IUser extends Document {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
}
