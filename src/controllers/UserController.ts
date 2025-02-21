import { Request, Response } from 'express';
import { hashPassword, verifyPassword } from '../utils/pwdUtils';
import UserSchema, {UserI} from '../DBSchema/UserSchema';
import { generateToken } from '../utils/JWTUtils';
import { loginSchema, registerSchema } from '../JoiValidators/authValidators';
import { validateSchema } from '../utils/joiUtils';

export async function register(req:Request, res:Response){
    try{
        const { name, password } = validateSchema(req, registerSchema);
        //Erreur si les champs sont vides
        if(!name || !password ){
            res.status(400).send('Le champs name et password sont incomplets.');
            return 
        }
        
        //Génération du mdp hashé
        const hashedPassword= await hashPassword(password);
        //Création de l'utilisateur avec le role Employé
        const newUser:UserI= new UserSchema({name,hashedPassword, role:'Employé'});
        //Sauvegarde de l'utilisateur
        const savedUser= await newUser.save();
        savedUser.hashedPassword = '';

        //Génération du token
        const token = generateToken({id: savedUser._id});
    
        res.status(201).json({message: 'Utilisateur créé avec succès',data: savedUser});
    
    } catch(err:any){
        if(err.code===11000){
            res.status(400).json({message: 'Cet Email est déjà utilisé'});
            return 
        }
        res.status(500).json({message: 'Erreur interne', error: err.message});
    }
}

export async function login(req:Request, res:Response){
    try {
        const { name, password } = validateSchema(req, loginSchema);
        //Recherche de l'utilisateur par son nom
         const user= await  UserSchema.findOne({name});

         //Erreur si nom pas trouvé
        if(!user){
            res.status(404).json({message: 'Utilisateur non trouvé'});
            return 
        }
        //Vérification du mot de passe hashé selon l'utilisateur
        const isPasswordValid= await verifyPassword(password,user.hashedPassword);
        
        
        if(!isPasswordValid){
            res.status(401).json({message: 'Mot de passe incorrect'});
            return 
        }
        const token = generateToken({id:user._id});

        res.cookie('jwt',token,{httpOnly:true, sameSite:'strict'});
        res.status(200).json({message: 'Connexion réussie'});

    }catch(error:any){
        res.status(500).json({message: error.message});
    }
}