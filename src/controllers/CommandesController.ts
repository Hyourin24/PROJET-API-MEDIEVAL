import { Request, Response } from 'express';
import CommandesSchema, {CommandesI} from '../DBSchema/Commandes';
import { getUserIdFromPayload } from '../utils/JWTUtils';
import User, { UserI } from '../DBSchema/User';

export async function createCommande(req:Request, res:Response){
    try{
        const userId = getUserIdFromPayload(req.headers.payload as string);
        const user: UserI | null = await User.findById(userId);

        if (!user) {
            res.status(404).send({ message: "utilisateur introuvable" })
            return
        }

        const { produitsAssociés, prixUnitaire } = req.body;
        const quantités = produitsAssociés.map(() => 1); 

         if (!Array.isArray(produitsAssociés) || !Array.isArray(quantités) || !Array.isArray(prixUnitaire)) {
            res.status(400).send({ message: "Les champs produitsAssociés, quantités et prixUnitaire doivent être des tableaux." });
            return;
        }
        const montantTotal = prixUnitaire.reduce((total, prix, index) => {
            return total + (prix * quantités[index]);
        }, 0);
        const produitsAvecQuantités = produitsAssociés.reduce((acc: Record<string, number>, produitId: string, index: number) => {
            acc[produitId] = quantités[index];
            return acc;
        }, {});

        const newCommande: CommandesI = new CommandesSchema({
            création: new Date(),
            modification: new Date(),
            status: "En attente",
            produitsAssociés: Object.keys(produitsAvecQuantités),
            quantités: Object.values(produitsAvecQuantités),
            prixUnitaire,
            montantTotal
        });
        const CommandeCrée = await newCommande.save()
        res.status(200).send({ message: "La commande a été créée avec succès", newCommande: CommandeCrée })
    }catch(err:any){
        res.status(500).json({message: err.message});
    }
}