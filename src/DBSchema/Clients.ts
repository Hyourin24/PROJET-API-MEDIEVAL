import mongoose, { Document, Schema } from "mongoose"



export interface ClientsI extends Document {
    nom: string;
    adresse: string;
    email: string;
    téléphone: number;
    actif: boolean;
}

const ClientSchema = new Schema({
    nom: { type: String, required: true, unique: true },
    adresse: { type: String, required: true },
    email: { type: String, required: true },
    téléphone: {type: Number, required: true},
    actif: {type: Boolean, default: true}
})


export default mongoose.model<ClientsI>('Client', ClientSchema);