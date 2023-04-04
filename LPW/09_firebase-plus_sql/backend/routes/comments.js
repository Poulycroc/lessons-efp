const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware');
const db = require('../db');

// Créer un nouveau commentaire
router.post('/', verifyToken, async (req, res) => {
// ...
});

// Récupérer tous les commentaires pour un article spécifique
router.get('/post/:postId', async (req, res) => {
// ...
});

// Récupérer un commentaire par ID
router.get('/:id', async (req, res) => {
// ...
});

// Mettre à jour un commentaire
router.put('/:id', verifyToken, async (req, res) => {
// ...
});

// Supprimer un commentaire
router.delete('/:id', verifyToken, async (req, res) => {
// ...
});

module.exports = router;
