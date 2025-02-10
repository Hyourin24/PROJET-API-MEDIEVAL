import UserSchema, { UserI } from '../DBSchema/UserSchema';
import { Request, Response } from "express";
import Clients, { ClientsI } from "../DBSchema/ClientsSchema";
import { compare } from 'bcryptjs';


export async function createClient(req: Request, res: Response) {
    try {
    
        const { nom, adresse, email, téléphone } = req.body;

        if (!nom) {
            res.status(400).send({ message: "nom requis" })
            return
        }


        if (!adresse) {
            res.status(404).send({ message: "adresse requise" })
            return
        }

        if (!email) {
            res.status(404).send({ message: "email requis" })
            return
        }

        if (!téléphone) {
            res.status(404).send({ message: "téléphone requis" })
            return
        }

        const client: ClientsI = new Clients({ nom, adresse, email, téléphone, actif: true});

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
          if(!id){
            res.status(400).json({message:'ID requis'});
            return
          }
      
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
        
        const userId = getUserIdFromPayload(req.headers.payload as string);

        const {id}= req.params; 
        const {actif} = req.body;
        

          if(!id){
            res.status(400).json({message:'ID requis'});
            return
          }

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

        
        //if ( user.role !== "Admin") {
            //res.status(401).send({ message: "vous n'avez pas le droit de changer l'actif!" })
            //return
        //}

        res.status(200).json({message:'Actif mis à jour avec succès', data: updatedActifData});
    } catch(err:any)  {

        res.status(500).json({message:'Erreur interne', error:err.message})
    }
}  

export function getUserIdFromPayload(payloadJson: string): string | null {
    const payload = JSON.parse(payloadJson) || null;
    return payload.id || null
}

export async function getAllActiveClients (req: Request, res: Response) {
    try{
        const client = await Clients.find({actif: "true"});

        res.status(200).send({message: "Liste des clients actifs" , client});
    }
    catch(err:any){
        res.status(500).send({message:err.message})
    }

}