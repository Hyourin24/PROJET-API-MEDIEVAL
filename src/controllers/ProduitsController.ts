import { Request, Response } from 'express';
import ProduitsSchema, {ProduitsI} from '../DBSchema/ProduitsSchema';
import { getUserIdFromPayload } from '../utils/JWTUtils';
import User, { UserI } from '../DBSchema/UserSchema';
import Produits from '../DBSchema/ProduitsSchema';

export async function createProduit(req: Request, res: Response) {
    try {
        const { nom, description, stock } = req.body;

        if (!nom || !description || !stock) {
            res.status(400).send({ message: "Tous les champs doivent être complets" })
        }

        if (stock <= 0 || !Number.isInteger(stock)) {
            res.status(400).send({ message: "Le stock doit être un nombre entier positif et supérieur à 0" })
        }

        const newProduit: ProduitsI = new ProduitsSchema ({
            nom, 
            description,
            stock
        })
        const ProduitCrée = await newProduit.save()

        res.status(201).send({ message: "Produits créés avec succès", newProduit: ProduitCrée  })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

export async function getProduit(req: Request, res: Response) {
    try {
        const produits = await Produits.find();
        res.status(200).send({ message: 'Liste des produits: ', produits   })
    } catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}

export async function modifyProduit(req: Request, res: Response) {
    try {
        const { id } = req.params; 
        const { nom, description, stock } = req.body;
        if (!nom || !description || !stock) {
            res.status(400).json({ message: 'Les champds doivent être modifiés' })
        }

        if (stock <= 0 || !Number.isInteger(stock)) {
            res.status(400).send({ message: "Le stock doit être un nombre entier positif et supérieur à 0" })
        }
        //Mise à jour des champs
        const updatedUser = await Produits.findByIdAndUpdate(
            id, //ID de l'utilisateur à mettre à jour
            { completed: true}, //Champs à changer
            { new: true, runValidators: true } // Retourner le nouvel utilisateur et valider les données 
        ) 

        if (!updatedUser) {
            res.status(404).json({ message: 'Produit non trouvé' })
            return
        }
        updatedUser.nom = nom;
        updatedUser.description = description;
        updatedUser.stock = stock;
        const ProduitModifié = await updatedUser.save();
        res.status(200).json({ message: 'Produit mis à jour avec succès', updatedUser: ProduitModifié })

    } catch (err: any) {
        res.status(500).json({ message: 'Erreur interne', error: err.message })
    }
}

export async function deleteProduits(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params; 

        // Suppression du produit
        const deletedProduct = await Produits.findByIdAndDelete(id);

        if (!deletedProduct) {
           res.status(404).json({ message: 'Produit non trouvé' });
           return
        }

        res.status(200).json({ message: 'Produit effacé avec succès', deletedProduct });

    } catch (err: any) {
        res.status(500).json({ message: 'Erreur interne', error: err.message });
    }
}

/*export async function deleteProduits(req: Request, res: Response) {
    try {
        const { id } = req.params; 
        const { nom, description, stock } = req.body;
        //Mise à jour des champs
        const deletedUser = await Produits.findByIdAndDelete(
            id, //ID de l'utilisateur à mettre à jour
            { completed: true}, //Champs à changer
        ) 

        if (!deletedUser) {
            res.status(404).json({ message: 'Produit non trouvé' })
            return
        }
        deletedUser.nom = nom;
        deletedUser.description = description;
        deletedUser.stock = stock;
        const ProduitModifié = await deletedUser.save();
        res.status(200).json({ message: 'Produit effacé avec succès', updatedUser: ProduitModifié })

    } catch (err: any) {
        res.status(500).json({ message: 'Erreur interne', error: err.message })
    }
} */