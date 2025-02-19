import mongoose, { Document, Schema } from "mongoose"

enum Status {
    EnAttente = "En attente",
    Expédiée = "Expédiée",
    Livrée = "Livrée",
    Annulée= "Annulée",
}
const commandesStatus: Status = Status.EnAttente;

export interface CommandesI extends Document {
    clientId: string | null;
    création: Date;
    client: String[];
    status: Status;
    produitsAssociés: String[];
    quantités: Number;
    prixUnitaire: Number[];
    montantTotal: Number
}

const CommandesSchema = new Schema({
    clientId: { type: String},
    création: { type: Date },
    modification: { type: Date, default: Date.now },
    client: { type: [String], required: true},
    status: { type: String, enum: Object.values(Status), default: commandesStatus },
    produitsAssociés: { type: [String], required: true },
    quantités: { type: Number},
    prixUnitaire: { type: [Number], required: true },
    montantTotal: { type: Number }
})


export default mongoose.model<CommandesI>('Commandes', CommandesSchema);



