import mongoose, { Document, Schema } from "mongoose"

enum Role {
    Admin = "Admin",
    Employé = "Employé",
}

export interface UserI extends Document {
    name: string;
    hashedPassword: string;
    role: Role;
}

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    role: { type: Role, default: Role.Employé }
})


export default mongoose.model<UserI>('User', UserSchema);