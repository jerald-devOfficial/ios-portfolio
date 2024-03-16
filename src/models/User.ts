import mongoose, { Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  authType: string;
  googleId: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    authType: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () {
        // @ts-ignore
        return this.authType === 'LOCAL';
      },
    },
    googleId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = (mongoose.models.User ||
  model('User', userSchema)) as Model<IUser>;
