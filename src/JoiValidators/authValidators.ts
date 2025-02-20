import Joi from "joi";

export const loginSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required()
   });

   // Définition du schéma de validation pour l'inscription
   export const registerSchema = Joi.object({
       name: Joi.string().min(3).max(30).required()
       .messages({
       'string.empty': 'Le nom est requis.',
       'string.min': 'Le nom doit contenir au moins 3 caractères.',
       'string.max': 'Le nom ne peut pas dépasser 30 caractères.'
       }),
       password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[!@#$%^&*])(?=.*\d)/) // Au moins un caractère spécial et un chiffre
    .required()
    .messages({
    'string.empty' : 'Le mot de passe est requis.' ,
    'string.min': 'Le mot de passe doit contenir au moins 8 caractères.' ,
    'string.pattern.base' : 'Le mot de passe doit contenir au moins un chiffre et un caractère spécial.'
    })
    
   });
   