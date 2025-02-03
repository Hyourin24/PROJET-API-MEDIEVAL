import mongoose, { Document, Schema } from "mongoose"

export interface UserI extends Document {
    name: string;
    password: string;
    role: string;
}

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
})

export default mongoose.model<UserI>('User', UserSchema);