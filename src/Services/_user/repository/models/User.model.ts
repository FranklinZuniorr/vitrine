import mongoose, { Document, Schema } from 'mongoose';

export interface IUserModel extends Document {
  email: string,
  password: string,
  tickets: number,
  validateRefreshToken: string,
  validToken: string,
  forgetPasswordKey: string;
};

const UserModelSchema: Schema<IUserModel> = new Schema<IUserModel>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  tickets: { type: Number, required: false },
  validateRefreshToken: { type: String, required: false },
  validToken: { type: String, required: false },
  forgetPasswordKey: { type: String, required: true },
});

const UserModel = mongoose.model<IUserModel>('User', UserModelSchema);

export default UserModel;
