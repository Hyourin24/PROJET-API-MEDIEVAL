
import mongoose, { Document, Schema } from "mongoose"

enum Role {
    Admin = "Admin",
    Employé = "Employé",
}

const userRoles: Role = Role.Employé;

export interface UserI extends Document {
    name: string;
    hashedPassword: string;
    role: Role;
}

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: userRoles }
})


export default mongoose.model<UserI>('User', UserSchema);