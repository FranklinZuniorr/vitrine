import mongoose, { Document, Schema } from 'mongoose';

export interface IUserModel extends Document {
  email: string,
  name: string,
  password: string,
  pix: string,
  socialNetwork?: string,
  tickets: number,
  validateRefreshToken: string,
  validToken: string,
};

const UserModelSchema: Schema<IUserModel> = new Schema<IUserModel>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  pix: { type: String, required: true },
  socialNetwork: { type: String, required: false },
  tickets: { type: Number, required: false },
  validateRefreshToken: { type: String, required: false },
  validToken: { type: String, required: false },
});

const UserModel = mongoose.model<IUserModel>('User', UserModelSchema);

export default UserModel;
