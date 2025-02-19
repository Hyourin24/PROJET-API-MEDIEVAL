import mongoose, { Document, Schema } from "mongoose"

export interface ProduitsI extends Document {
    nom: String,
    description: String
    stock: Number
}

const ProduitsSchema = new Schema({
    nom: {type: String, require: true},
    description: {type: String, require: true},
    stock: {type: Number, require: true}
})


export default mongoose.model<ProduitsI>('Produits', ProduitsSchema);