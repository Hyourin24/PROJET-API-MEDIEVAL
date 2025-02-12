import { Router } from "express";
import { createProduit, getProduit, modifyProduit, deleteProduits } from "../controllers/ProduitsController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";



   const router = Router();

   /**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new product
 *     tags: [Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: The name of the product
 *                 example: 'Produit A'
 *               description:
 *                 type: string
 *                 description: A description of the product
 *                 example: 'Description du produit A'
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the product
 *                 example: 100
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produits créés avec succès'
 *                 newProduit:
 *                   $ref: '#/components/schemas/Produit'
 *       400:
 *         description: Bad request (missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Tous les champs doivent être complets'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erreur interne'
 *                 error:
 *                   type: string
 *                   example: 'Internal error message'
 *     security:
 *       - bearToken: []
 * 
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *           example: 'Produit A'
 *         description:
 *           type: string
 *           example: 'Description du produit A'
 *         stock:
 *           type: integer
 *           example: 100
 *         _id:
 *           type: string
 *           example: '607d1b1f1f1f1f1f1f1f1f1f'
 *         createdAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 */
   router.post('/create',verifyTokenMiddleware, createProduit);

   /**
 * @swagger
 * /get:
 *   get:
 *     summary: Get all products
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Liste des produits: '
 *                 produits:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Produit'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erreur interne'
 *                 error:
 *                   type: string
 *                   example: 'Internal error message'
 *     security:
 *       - bearToken: []
 * 
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: '607d1b1f1f1f1f1f1f1f1f1f'
 *         nom:
 *           type: string
 *           example: 'Produit A'
 *         description:
 *           type: string
 *           example: 'Description du produit A'
 *         stock:
 *           type: integer
 *           example: 100
 *         createdAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 */

// Modify Produit route
/**
 * @swagger
 * /modify/{id}:
 *   put:
 *     summary: Modify an existing product
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: The name of the product
 *                 example: 'Produit A'
 *               description:
 *                 type: string
 *                 description: A description of the product
 *                 example: 'Updated description of Produit A'
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the product
 *                 example: 150
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit mis à jour avec succès'
 *                 updatedUser:
 *                   $ref: '#/components/schemas/Produit'
 *       400:
 *         description: Bad request (missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Les champs doivent être modifiés'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit non trouvé'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erreur interne'
 *                 error:
 *                   type: string
 *                   example: 'Internal error message'
 *     security:
 *       - bearToken: []
 */
   router.get('/get', verifyTokenMiddleware, getProduit)

   /**
 * @swagger
 * /put/{id}:
 *   put:
 *     summary: Modify an existing product
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: The name of the product
 *                 example: 'Produit A'
 *               description:
 *                 type: string
 *                 description: A description of the product
 *                 example: 'Updated description of Produit A'
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the product
 *                 example: 150
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit mis à jour avec succès'
 *                 updatedUser:
 *                   $ref: '#/components/schemas/Produit'
 *       400:
 *         description: Bad request (missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Les champs doivent être modifiés'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit non trouvé'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erreur interne'
 *                 error:
 *                   type: string
 *                   example: 'Internal error message'
 *     security:
 *       - bearToken: []
 * 
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: '607d1b1f1f1f1f1f1f1f1f1f'
 *         nom:
 *           type: string
 *           example: 'Produit A'
 *         description:
 *           type: string
 *           example: 'Description du produit A'
 *         stock:
 *           type: integer
 *           example: 100
 *         createdAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 */
   router.put('/put/:id', verifyTokenMiddleware, modifyProduit)

   /**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit effacé avec succès'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit non trouvé'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erreur interne'
 *                 error:
 *                   type: string
 *                   example: 'Internal error message'
 *     security:
 *       - bearToken: []
 * 
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: '607d1b1f1f1f1f1f1f1f1f1f'
 *         nom:
 *           type: string
 *           example: 'Produit A'
 *         description:
 *           type: string
 *           example: 'Description du produit A'
 *         stock:
 *           type: integer
 *           example: 100
 *         createdAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 */

   router.delete('/delete/:id', verifyTokenMiddleware, deleteProduits)

   
export default router;