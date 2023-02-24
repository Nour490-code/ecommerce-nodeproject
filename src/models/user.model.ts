import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import User from '../schemas/user.model';
export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}
export interface UserInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  profileImg: string;
  isActive: boolean;
  isVerified: boolean;
  address: string;
}
export interface UserDocument extends UserInput, mongoose.Document {
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
export default class UserStore {
  async index(): Promise<UserInput[]> {
    console.log('here');
    const users: UserInput[] = await User.find();
    console.log(users);
    return users;
  }
  async show(id: string): Promise<UserInput | null> {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid user id');
    }
    const user: UserInput | null = await User.findById(new ObjectId(id));
    if (!user) throw new Error('User not found');
    return user as UserInput;
  }
  async create(user: UserInput): Promise<UserDocument> {
    const newUser = await User.create(user);
    return newUser as UserDocument;
  }
}
