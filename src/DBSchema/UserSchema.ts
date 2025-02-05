import mongoose, { Document, Schema } from "mongoose"

enum Role {
    Admin = "Admin",
    Employé = "Employé",
}

const userRole: Role= Role.Employé;

export interface UserI extends Document {
    name: string;
    hashedPassword: string;
    role: Role;
}

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, enum:Object.values(Role), default: userRole }
})


export default mongoose.model<UserI>('User', UserSchema);