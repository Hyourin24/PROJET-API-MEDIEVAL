import { Request, Response } from "express";
import Clients, { ClientsI } from "../DBSchema/Clients";
import { getClientIdFromPayload } from "../utils/JWTUtils";


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
            id, //ID de l'utilisateur à mettre à jour
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


        
        //réponse réussie
        res.status(200).json({message:'Client mis à jour avec succès', data: updatedClientData});
    } catch(err:any)  {
        //Gestion des erreurs
        res.status(500).json({message:'Erreur interne', error:err.message})
    }
}