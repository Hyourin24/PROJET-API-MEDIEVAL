import { Request, Response } from 'express';
import Produits, {ProduitsI} from '../DBSchema/ProduitsSchema';
import Clients, {ClientsI} from '../DBSchema/ClientsSchema'
import { getUserIdFromPayload } from '../utils/JWTUtils';
import User, { UserI } from '../DBSchema/UserSchema';
import Commandes, { CommandesI } from '../DBSchema/CommandesSchema';
import mongoose from 'mongoose';

// export async function createCommande(req:Request, res:Response){
//     try{
//         const userId = getUserIdFromPayload(req.headers.payload as string);
//         const user: UserI | null = await User.findById(userId);

//         if (!user) {
//             res.status(404).send({ message: "utilisateur introuvable" })
//             return
//         }

//         const { produitsAssociés, prixUnitaire } = req.body;
//         let produitsid = ProduitsSchema.name;
//         produitsid = produitsAssociés

//         if (produitsAssociés !== produitsid) {
//             res.status(400).send({message: "Le produit entré n'existe pas"})
//         }
//         const quantités = produitsAssociés.map(() => 1); 

//          if (!Array.isArray(produitsAssociés) || !Array.isArray(quantités) || !Array.isArray(prixUnitaire)) {
//             res.status(400).send({ message: "Les champs produitsAssociés, quantités et prixUnitaire doivent être des tableaux." });
//             return;
//         }
//         const montantTotal = prixUnitaire.reduce((total, prix, index) => {
//             return total + (prix * quantités[index]);
//         }, 0);
//         const produitsAvecQuantités = produitsAssociés.reduce((acc: Record<string, number>, produitId: string, index: number) => {
//             acc[produitId] = quantités[index];
//             return acc;
//         }, {});

//         const newCommande: CommandesI = new CommandesSchema({
//             création: new Date(),
//             modification: new Date(),
//             status: "En attente",
//             produitsAssociés: Object.keys(produitsAvecQuantités),
//             quantités: Object.values(produitsAvecQuantités),
//             prixUnitaire,
//             montantTotal
//         });
//         const CommandeCrée = await newCommande.save()
//         res.status(200).send({ message: "La commande a été créée avec succès", newCommande: CommandeCrée })
//     }catch(err:any){
//         res.status(500).json({message: err.message});
//     }
// }


export async function createCommande(req: Request, res: Response): Promise<void> {
    try {
        const userId = getUserIdFromPayload(req.headers.payload as string);
        const user: UserI | null = await User.findById(userId);

        if (!user) {
            res.status(404).send({ message: "Utilisateur introuvable" });
            return;
        }

        let { produitsAssociés, quantités, prixUnitaire, montantTotal, client } = req.body;
        const produitsDetails = await Produits.find({ _id: { $in: produitsAssociés } });
        const clientDétails = await Clients.find({_id: { $in: client }});
        const calcul = Array.isArray(produitsAssociés);
        produitsAssociés.reduce((total: number, produit: { prix: any; }) => {
        if (!produit || typeof produit !== "object") {
            console.warn("Produit invalide détecté:", produit);
            return total; 
        }

        const prix = Number(produit.prix);
        if (isNaN(prix)) {
            console.warn("Prix invalide détecté pour le produit:", produit);
            return total; 
        }

        return total + prix; 
    }, 0)
        const newCommande = new Commandes({
            création: new Date(),
            modification: new Date(),
            client: clientDétails, 
            status: "En attente",
            produitsAssociés: produitsDetails,
            quantités,
            prixUnitaire,
            montantTotal: calcul
        });

        let commandeCrée = await newCommande.save();
        clientDétails[0].historique.push(commandeCrée.id)
        await clientDétails[0].save();
        res.status(201).json({
            message: "La commande a été créée avec succès", commande: commandeCrée, client: clientDétails
        });

    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export async function getClientsCommande(req: Request, res: Response) {
    try {
        const userId = getUserIdFromPayload(req.headers.payload as string);
        const { commandesId } = req.params;
        const client: ClientsI | null = await Clients.findById(userId);
        if (!client) {
            res.status(404).send({ message: "utilisateur introuvable" })
            return
        }
        const commande: CommandesI | null = await Commandes.findById(commandesId);
        if (commande === null) {
            res.status(404).send({ message: "playlist not found" })
            return
        }
        if (commande.clientId !== userId) {
            res.status(401).send({ message: "you have no right to touch this playlist" })
            return
        }
        res.status(200).send({ message: 'commandes trouvées', commande, client})
    } catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export async function modifyStatus(req: Request, res: Response): Promise<void> {
    try {
        const commandeId = req.params.id;
        const commande = await Commandes.findById(commandeId);

        if (!commande) {
            res.status(404).json({ message: "Commande introuvable" });
            return;
        }

        const { status } = commande; 
        let actualStatus: string = status
        let newStatus: string = "";

        if (actualStatus == "En attente") {
            newStatus = "Expédiée";
        } else if (actualStatus == "Expédiée") {
            newStatus = "Livrée";
        } else if (actualStatus == "Livrée") {
            res.status(400).json({ message: "Impossible de changer le statut, déjà livré" });
            return;
        } else {
            res.status(400).json({ message: "Status inconnu ou invalide" });
            return;
        }
        const updatedCommande = await Commandes.findByIdAndUpdate(
            commandeId,
            { status: newStatus },
            { new: true }
        );

        res.status(200).json({
            message: "Statut mis à jour avec succès",
            commande: updatedCommande
        });

    } catch (err: any) {
        res.status(500).json({ message: "Erreur interne", error: err.message });
    }
}

