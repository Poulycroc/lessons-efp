const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware');
const db = require('../db');

// Créer un nouveau commentaire
router.post('/', verifyToken, async (req, res) => {
  const { postId, comment } = req.body;
  const author = req.user.uid;
  console.log({ postId, comment, author })

  const query = `
    INSERT INTO comments (post_id, content, author_id) VALUES (?, ?, ?);
  `;
  db.query(query, [postId, comment, author], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Erreur lors de la création du commentaire' });
    } else {
      res.status(201).json({ message: 'Commentaire créé avec succès' });
    }
  });
});

// Récupérer tous les commentaires pour un article spécifique
router.get('/post/:postId', async (req, res) => {
  const postId = req.params.postId;

  const query = `
    SELECT * FROM comments WHERE post_id = ?;
  `;
  db.query(query, [postId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération des commentaires' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Récupérer un commentaire par ID
router.get('/:id', async (req, res) => {
  const commentId = req.params.id;

  const query = `
    SELECT * FROM comments WHERE id = ?;
  `;
  db.query(query, [commentId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération du commentaire' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Mettre à jour un commentaire
router.put('/:id', verifyToken, async (req, res) => {
  const commentId = req.params.id;
  const { comment } = req.body;
  const author = req.user.uid;

  const query = `
    UPDATE comments SET comment = ? WHERE id = ? AND author = ?;
  `;
  db.query(query, [comment, commentId, author], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du commentaire' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Commentaire introuvable ou vous n'êtes pas l'auteur" });
    } else {
      res.status(200).json({ message: 'Commentaire mis à jour avec succès' });
    }
  });
});

// Supprimer un commentaire
router.delete('/:id', verifyToken, async (req, res) => {
  const commentId = req.params.id;
  const author = req.user.uid;

  const query = `
    DELETE FROM comments WHERE id = ? AND author = ?;
  `;
  db.query(query, [commentId, author], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Erreur lors de la suppression du commentaire' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Commentaire introuvable ou vous n'êtes pas l'auteur" });
    } else {
      res.status(200).json({ message: 'Commentaire supprimé avec succès' });
    }
  });
});

module.exports = router;
