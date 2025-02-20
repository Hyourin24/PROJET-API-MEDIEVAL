import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes";
import CommandesRoutes from "./routes/CommandesRoutes";
import ProduitsRoutes from "./routes/ProduitsRoutes";
import ClientRoutes from "./routes/ClientRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from './config/swagger';
import ExpressMongoSanitize from "express-mongo-sanitize";



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

// Appliquer express-mongo-sanitize sur les requêtes entrantes
app.use(ExpressMongoSanitize());

//TODO ajouter routes ici
app.use('/auth', UserRoutes)
app.use('/commandes', CommandesRoutes)
app.use('/produits', ProduitsRoutes)
app.use('/clients', ClientRoutes);
app.use('/dashboard', DashboardRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//app.listen indique au serveur d'écouter les requêtes HTTP arrivant sur le
//port indiqué
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});