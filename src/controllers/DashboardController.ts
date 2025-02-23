import { Request, Response } from 'express';
import Commandes, { CommandesI } from '../DBSchema/CommandesSchema';
import ProduitsSchema,  {ProduitsI} from '../DBSchema/ProduitsSchema';


export async function getRevenue(req: Request, res: Response): Promise<void> {
    try {
        //Recherche des commandes avec status "Annulée"
        const commandes = await Commandes.find({ status: { $ne: "Annulée" } }).exec();

    //Gestion des erreurs
        if (!commandes) {
            res.status(404).json({ message: "Aucune commande" });
            return;
        }
        //Calcul du revenu total en excluant les commandes annulées
        const revenuTotal = commandes.reduce((acc: number, commande: any) => acc + (commande.montantTotal || 0), 0);

        res.status(200).json({message: "Total des revenus de ce mois-ci", revenuTotal});
    } catch (err: any) {
        res.status(500).json({ message: "Erreur interne", error: err.message });
    }
}


export async function getStock(req: Request, res: Response): Promise<void> {
    try {
        //Recherche du stock par le nom
        const stock = await ProduitsSchema.find({}, 'nom stock');
        //Gestion d'erreur
        if (!stock) {
            res.status(404).json({ message: "Aucun stock" });
            return;
        }

        res.status(200).json({message: "Total des revenus de ce mois-ci", stock});

    } catch (err: any) {
        res.status(500).json({ message: "Erreur interne", error: err.message });
    }
}


