import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";



//Création serveur express
const app = express()

//chargement des variables d'environnement
dotenv.config()

//Définition du port du serveur
const PORT = process.env.PORT

//COnfig du serveur par défaut
app.use(express.json());

//connecter MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB connecté avec succès');
    } catch (err) {
        console.error('Erreur lors de la connexion à MongoDB:', err);
        process.exit(1);
    }
};

connectDB();

//TODO ajouter routes ici
app.use('/', authRoutes);



//app.listen indique au serveur d'écouter les requêtes HTTP arrivant sur le
//port indiqué
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});