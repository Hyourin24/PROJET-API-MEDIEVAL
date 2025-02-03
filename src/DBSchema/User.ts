import mongoose, { Document, Schema } from "mongoose"

enum Role {
    Admin = "Admin",
    User = "User",
}

export interface UserI extends Document {
    name: string;
    password: string;
    userRole: Role;
}

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Role, required: true }
})

export default mongoose.model<UserI>('User', UserSchema);