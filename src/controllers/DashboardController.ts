import { Request, Response } from 'express';
import Commandes, { CommandesI } from '../DBSchema/CommandesSchema';
import ProduitsSchema,  {ProduitsI} from '../DBSchema/ProduitsSchema';


export async function getRevenue(req: Request, res: Response): Promise<void> {
    try {
        const commandes = await Commandes.find();
        const commandeId = req.params.id;
        const commande = await Commandes.findById(commandeId);
        
        if (!commande) {
            res.status(404).json({ message: "Commande introuvable" });
            return;
        }
    
            const { status } = commande; 
            let actualStatus: string = status
            let newStatus: string = "";
    
            if (actualStatus == "En attente" || actualStatus === "Expédiée" || actualStatus === "Livrée") {
                newStatus = "Annulée";
            }

        if (actualStatus == "En attente" || actualStatus === "Expédiée" || actualStatus === "Livrée") {
            newStatus = "Annulée";
        }
        if (!commandes) {
            res.status(404).json({ message: "Aucune commande" });
            return;
        }
        const revenuTotal = commandes.reduce((acc: number, commande: any) => acc + (commande.montantTotal || 0), 0);

        res.status(200).json({message: "Total des revenus de ce mois-ci", revenuTotal
});

    } catch (err: any) {
        res.status(500).json({ message: "Erreur interne", error: err.message });
    }
}

export async function getStock(req: Request, res: Response): Promise<void> {
    try {
        const stock = await ProduitsSchema.find({}, 'nom stock');
        if (!stock) {
            res.status(404).json({ message: "Aucun stock" });
            return;
        }

        res.status(200).json({message: "Total des revenus de ce mois-ci", stock});

    } catch (err: any) {
        res.status(500).json({ message: "Erreur interne", error: err.message });
    }
}


