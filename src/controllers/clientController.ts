import { Request, Response } from "express";
import Clients, { ClientsI } from "../DBSchema/Clients";


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