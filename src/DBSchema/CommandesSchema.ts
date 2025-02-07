import mongoose, { Document, Schema } from "mongoose"

enum Status {
    EnAttente = "En attente",
    Expédiée = "Expédiée",
    Livrée = "Livrée",
    Annulée= "Annulée",
}
const commandesStatus: Status = Status.EnAttente;

export interface CommandesI extends Document {
    création: Date;
    modification: Date;
    status: Status;
    produitsAssociés: String[];
    quantités: Number;
    prixUnitaire: Number[];
    montantTotal: Number
}

const CommandesSchema = new Schema({
    création: { type: Date },
    modification: { type: Date },
    status: { type: String, enum: Object.values(Status), default: commandesStatus },
    produitsAssociés: { type: [String], required: true },
    quantités: { type: Number, required: true},
    prixUnitaire: { type: [Number], required: true },
    montantTotal: { type: Number }
})


export default mongoose.model<CommandesI>('Commandes', CommandesSchema);



