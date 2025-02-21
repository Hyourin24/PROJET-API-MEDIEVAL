import UserSchema, { UserI } from '../DBSchema/UserSchema';
import { Request, Response } from "express";
import Clients, { ClientsI } from "../DBSchema/ClientsSchema";
import { compare } from 'bcryptjs';
import Commandes, { CommandesI } from '../DBSchema/CommandesSchema';
import exp from 'constants';
import ProduitsSchema from '../DBSchema/ProduitsSchema';


export async function createClient(req: Request, res: Response) {
    try {
    
        let { nom, adresse, email, historique, téléphone } = req.body;
        
        //Gestion des erreurs
        if (!nom || !adresse || !email || !téléphone) {
            res.status(400).send({ message: "Les champs nom, adresse, email et téléphone sont requis" })
            return
        }
        
        //Générer le client
        const client: ClientsI = new Clients({ nom, adresse, email, historique, téléphone, actif: true});
        //Sauvegarder le client dans la base de donnée
        const createdClient = await client.save()

        res.status(200).send({ message: "client créée avec succès", client: createdClient })

    } catch (err: any) {
        res.status(500).send({ message: err.message })
    }


}

export async function modifyClient(req:Request, res: Response){
    try{
        const {id}= req.params; 
        const {nom, adresse, email, téléphone, actif} = req.body;
          //Erreur si l'id n'est pas fourni
            if(!id){
                res.status(400).json({message:'ID requis'});
                return
            }
            //Recherche du client par son id et changement
            const updatedClient = await Clients.findByIdAndUpdate(
                id, 
                {completed:true}, 
                {new:true, runValidators:true}
            );

        const updatedClientData = {
            nom,
            adresse,
            email,
            téléphone
        };
        
        
        if(!updatedClient){
            res.status(404).json({message:'Client non trouvé'});
            return
        };

        if (actif !== undefined) {
            res.status(400).json({ message: 'Impossible de modifier "actif" sur cette route!' });
            return;
        }

        res.status(200).json({message:'Client mis à jour avec succès', data: updatedClientData});
    } catch(err:any)  {

        res.status(500).json({message:'Erreur interne', error:err.message})
    }
}

export async function modifyClientActif(req:Request, res: Response){
    try{
        //Recherche de l'id depuis le payload
        const userId = getUserIdFromPayload(req.headers.payload as string);

        const {id}= req.params; 
        const {actif} = req.body;
        

          if(!id){
            res.status(400).json({message:'ID requis'});
            return
          }
            //Recherche du client par son id et changement
        const updatedActif = await Clients.findByIdAndUpdate(
            id,
            {completed:true}, 
            {new:true, runValidators:true}
        );

        const updatedActifData = { actif };
        
        if(!updatedActif){
            res.status(404).json({message:'Actif requis'});
            return
        };
        res.status(200).json({message:'Actif mis à jour avec succès', data: updatedActifData});
    } catch(err:any)  {

        res.status(500).json({message:'Erreur interne', error:err.message})
    }
}  

export function getUserIdFromPayload(payloadJson: string): string | null {
    const payload = JSON.parse(payloadJson) || null;
    return payload.id || null
}

export function getClientIdFromPayload(payloadJson: string): string | null {
    const payload = JSON.parse(payloadJson) || null;
    return payload.id || null
}

export async function getAllClients(req: Request, res: Response) {
     try{
        const client = await Clients.find();

        res.status(200).send({message: "Liste des clients actifs" , client});
    }
    catch(err:any){
        res.status(500).send({message:err.message})
    }
}

export async function getAllActiveClients (req: Request, res: Response) {
    try{
        //Tri de tous les clients pour prendre les actifs
        const client = await Clients.find({actif: "true"});

        res.status(200).send({message: "Liste des clients actifs" , client});
    }
    catch(err:any){
        res.status(500).send({message:err.message})
    }

}



