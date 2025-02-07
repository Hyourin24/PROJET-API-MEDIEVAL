import { Request, Response } from 'express';
import Produits, {ProduitsI} from '../DBSchema/ProduitsSchema';
import { getUserIdFromPayload } from '../utils/JWTUtils';
import User, { UserI } from '../DBSchema/UserSchema';
import Commandes from '../DBSchema/CommandesSchema';

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

        let { produitsAssociés, quantités, prixUnitaire, montantTotal } = req.body;
        const produitsDetails = await Produits.find({ _id: { $in: produitsAssociés } });
        produitsAssociés = produitsDetails
        // const quantitéDétail = await produitsAssociés.findById({produitsAssocié })
        // quantités = quantitéDétail

        // if (!Array.isArray(produitsAssociés) || !Array.isArray(prixUnitaire)) {
        //     res.status(400).send({ message: "Les champs produitsAssociés et prixUnitaire doivent être des tableaux." });
        //     return;
        // }
        // const montant = prixUnitaire.reduce((total, prix, index) => {
        //     return total + (prix * quantités[index]);
        // }, 0);

        const newCommande = new Commandes({
            création: new Date(),
            modification: new Date(),
            status: "En attente",
            produitsAssociés: produitsDetails,
            quantités,
            prixUnitaire,
            // montantTotal: montant
        });

        let commandeCrée = await newCommande.save();
        res.status(201).json({
            message: "La commande a été créée avec succès", newCommande: commandeCrée
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export async function getUserCommande (req: Request, res: Response): Promise<void> {
//   try {
    
//     const user = req.headers.user ? JSON.parse(req.headers.user as string) : null;

//     if (!user) {
//       res.status(401).json({ message: "Utilisateur non authentifié" });
//       return;
//     }

    
//     const userId = user.id;

   
//     if (!userId) {
//       res.status(400).json({ message: "ID utilisateur manquant dans le token" });
//       return;
//     }

    
//     const playlists = await PlaylistSchema.find({ userId });

    
//     if (playlists.length === 0) {
//       res.status(404).json({ message: "Aucun playlist trouvé pour cet utilisateur" });
//       return;
//     }

    
//     res.status(200).json(playlists);
//     return;

//   } catch (err: any) {
//     console.error("Erreur lors de la récupération des playlists utilisateur :", err);
//     res.status(500).json({ message: "Erreur interne du serveur" });
//     return;
//   }
// }
}