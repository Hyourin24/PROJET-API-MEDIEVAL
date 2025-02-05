import { Request, Response } from 'express';
import ProduitsSchema, {ProduitsI} from '../DBSchema/Produits';
import { getUserIdFromPayload } from '../utils/JWTUtils';
import User, { UserI } from '../DBSchema/User';
import Produits from '../DBSchema/Produits';

export async function createProduit(req: Request, res: Response) {
    try {
        const { nom, description, stock } = req.body;

        if (!nom || !description || !stock) {
            res.status(400).send({ message: "Tous les champs doivent être complets" })
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
        if (!id) {
            res.status(400).json({ message: 'ID requis!' })
            return
        }
        if (!nom || !description || !stock) {
            res.status(400).json({ message: 'Les champds doivent être modifiés' })
        }
        //Mise à jour des champs
        const updatedUser = await Produits.findByIdAndUpdate(
            id, //ID de l'utilisateur à mettre à jour
            { completed: true}, //Champs à changer
            { new: true, runValidators: true } // Retourner le nouvel utilisateur et valider les données 
        ) 

        const updatedUserData = {
            nom,
            description,
            stock
        }
        if (!updatedUser) {
            res.status(404).json({ message: 'Produit non trouvé' })
            return
        }
        res.status(200).json({ message: 'Produit mis à jour avec succès', data: updatedUserData })

    } catch (err: any) {
        res.status(500).json({ message: 'Erreur interne', error: err.message })
    }
}