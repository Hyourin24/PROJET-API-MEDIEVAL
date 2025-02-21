import { Request, Response } from 'express';
import Produits, {ProduitsI} from '../DBSchema/ProduitsSchema';
import Clients, {ClientsI} from '../DBSchema/ClientsSchema'
import { getUserIdFromPayload } from '../utils/JWTUtils';
import User, { UserI } from '../DBSchema/UserSchema';
import Commandes, { CommandesI } from '../DBSchema/CommandesSchema';
import mongoose from 'mongoose';
import ProduitsSchema from '../DBSchema/ProduitsSchema';

export async function createCommande(req: Request, res: Response): Promise<void> {
    try {
        //Reprise de l'id de l'utilisateur
        const userId = getUserIdFromPayload(req.headers.payload as string);
        const user: UserI | null = await User.findById(userId);
        
        //Message d'erreur si l'utilisateur n'existe pas
        if (!user) {
            res.status(404).send({ message: "Utilisateur introuvable" });
            return;
        }

        let { produitsAssociés, client, quantités, prixUnitaire, montantTotal } = req.body;

        // Vérification des champs obligatoires
        if (!produitsAssociés || !client || !quantités || !prixUnitaire) {
            res.status(400).send({ message: "Les champs produitsAssociés, client, quantités et prixUnitaire sont obligatoires" });
            return;
        }

        // Récupération des produits et des clients
        const produitsDetails = await Produits.find({ _id: { $in: produitsAssociés } });
        const clientDétails = await Clients.find({ _id: client });
        let produitsStock: number[] = produitsDetails.map((produit: any) => produit.stock);
        
        // Mise à jour du stock
        for (let i = 0; i < produitsStock[i]; i++) {
            if (produitsStock < quantités[i]) {
                res.status(400).send({ message: `Stock insuffisant pour le produit ${produitsDetails[i].nom}` });
                return;
            }
            produitsStock[i] -= quantités[i];
            await Produits.findByIdAndUpdate(produitsDetails[i]._id, { stock: produitsStock[i] });
        }
        // Calcul du montant total
        const montant = prixUnitaire.reduce((acc: number, prix: number) => acc + prix, 0);

        // Création de la commande
        const creationDate = new Date();

        const newCommande = new Commandes({
            création: creationDate,
            client: clientDétails.map(client => client._id),
            status: "En attente",
            produitsAssociés: produitsDetails.map(prod => prod._id),
            quantités,
            prixUnitaire,
            montantTotal: montant
        });
        
        //Sauvegarde de la commande
        let commandeCrée = await newCommande.save();

        // Ajout de la commande à l'historique du client
        if (clientDétails.length > 0) {
            clientDétails[0].historique.push(commandeCrée.id);
            await clientDétails[0].save();
        }

        res.status(201).json({ message: "La commande a été créée avec succès", commande: commandeCrée });

    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}



export async function getClientsCommande(req: Request, res: Response) {
    try {
        //Obtention de l'id des user
        const userId = getUserIdFromPayload(req.headers.payload as string);
        const { commandesId } = req.params;
        const client: ClientsI | null = await Clients.findById(userId);

        //Message d'erreur si l'utilisateur n'existe pas
        if (!client) {
            res.status(404).send({ message: "utilisateur introuvable" })
            return
        }
        //Obtention de l'id de la commande
        const commande: CommandesI | null = await Commandes.findById(commandesId);

        //Message d'erreur si la commande n'existe pas
        if (commande === null) {
            res.status(404).send({ message: "Commande pas trouvée" })
            return
        }
        //Message d'erreur si l'id de la commande ne correspond pas à l'utilisateur
        if (commande.clientId !== userId) {
            res.status(401).send({ message: "Pas d'autorisation pour aller vers cette commande" })
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
        
        //Message d'erreur si la commande n'existe pas
        if (!commande) {
            res.status(404).json({ message: "Commande introuvable" });
            return;
        }
        
        //Création des statuts depuis le schéma. Mise en place d'un statut actuel et d'un nouveau statut car sinon, vs code boude
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
        //Udpate du statut avec findByIdAndUpdate
        const updatedCommande = await Commandes.findByIdAndUpdate(
            commandeId,
            { status: newStatus },
            { new: true }
        );

        //Mise à jour de la date de modification
        let { modification } = req.body
        let modificationNow: Date = new Date(); 
        modification = modificationNow

        res.status(200).json({ message: "Statut mis à jour avec succès", commande: updatedCommande, modification  });

    } catch (err: any) {
        res.status(500).json({ message: "Erreur interne", error: err.message });
    }
}

export async function modifyCancelStatus(req: Request, res: Response): Promise<void> {
    try {
        const commandeId = req.params.id;
        const commande = await Commandes.findById(commandeId);
        
        //Message d'erreur si la commande n'existe pas
        if (!commande) {
            res.status(404).json({ message: "Commande introuvable" });
            return;
        }
        
        //Reprise du statut actuel et création du nouveau statut
        const { status } = commande; 
        let actualStatus: string = status
        let newStatus: string = "";
        
        //Mise en place des conditions pour le statut annulé
        if (actualStatus == "En attente" || actualStatus === "Expédiée" || actualStatus === "Livrée") {
            newStatus = "Annulée";
        } else if (actualStatus == "Annulée") {
            res.status(400).json({ message: "Le statut est déjà annulé, débile" });
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

        res.status(200).json({message: "Statut mis à jour avec succès", commande: updatedCommande});

    } catch (err: any) {
        res.status(500).json({ message: "Erreur interne", error: err.message });
    }
}

export async function getRevenue(req: Request, res: Response): Promise<void> {
    try {
        const commandes = await Commandes.find();

        //Erreur si y'a pas commande
        if (!commandes) {
            res.status(404).json({ message: "Aucune commande" });
            return;
        }
        //Calcul du revenu total avec reduce
        const revenuTotal = commandes.reduce((acc: number, commande: any) => acc + (commande.montantTotal || 0), 0);

        res.status(200).json({message: "Total des revenus de ce mois-ci", revenuTotal});

    } catch (err: any) {
        res.status(500).json({ message: "Erreur interne", error: err.message });
    }
}
