import { Request, Response } from 'express';
import Produits, {ProduitsI} from '../DBSchema/Produits';
import { getUserIdFromPayload } from '../utils/JWTUtils';
import User, { UserI } from '../DBSchema/User';
import Commandes from '../DBSchema/Commandes';

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

        const { produitsAssociés, quantités, prixUnitaire } = req.body;

        // Vérifier que tous les produits existent
        const produits = await Produits.find({ _id: { $in: produitsAssociés } });
        if (!Array.isArray(produitsAssociés) ||  !Array.isArray(prixUnitaire)) {
            res.status(400).send({ message: "Les champs produitsAssociés et prixUnitaire doivent être des tableaux." });
            return;
        }

        // Calcul du montant total
        const montantTotal = produitsAssociés.reduce((total, index) => {
            return total + (prixUnitaire[index] * quantités[index]);
        }, 0);

        // Création de la commande
        const newCommande = new Commandes({
            création: new Date(),
            modification: new Date(),
            status: "En attente",
            produitsAssociés,
            quantités,
            prixUnitaire,
            montantTotal
        });

       const CommandeCrée = await newCommande.save()

        // Récupération des produits avec leurs noms
        const produitsDetails = await Produits.find({ _id: { $in: produitsAssociés } }, "_id nom");

        res.status(201).json({
            message: "La commande a été créée avec succès", newCommande: CommandeCrée
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}
