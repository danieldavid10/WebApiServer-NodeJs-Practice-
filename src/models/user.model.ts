import { Schema, model, Document } from 'mongoose';

export type UserModel = Document & {
    UserName: string;
    Email: string;
    Phone: string;
    Image: string;
    Password: string;
    Active: boolean;
    CreateDate: Date;
};

const UserSchema = new Schema({
    UserName: { type: String, required: true },
    Email: { type: String, required: true, unique: true, lowercase: true },
    Phone: String,
    Image: String,
    Password: String,
    Active: { type: Boolean, default: true },
    CreateDate: { type: Date, default: Date.now() }
});

export default model<UserModel>('users', UserSchema);