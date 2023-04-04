const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware');
const db = require('../db');

// Créer un nouvel article
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const author_id = req.user.id; // assuming req.user contains the authenticated user object
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    // insert the new article into the database
    const result = await db.promise().query(
      'INSERT INTO articles (title, content, author_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [title, content, author_id, created_at, updated_at]
    );
    
    // return the ID of the newly created article
    const newArticleId = result[0].insertId;
    res.status(201).json({ id: newArticleId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Récupérer tous les articles
router.get('/', async (req, res) => {
  try {
    // retrieve all articles from the database
    const result = await db.promise().query('SELECT * FROM articles');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Récupérer un article par ID
router.get('/:id', async (req, res) => {
  try {
    const articleId = req.params.id;
    // retrieve the article with the specified ID from the database
    const result = await db.promise().query('SELECT * FROM articles WHERE id = ?', [articleId]);
    if (result[0].length === 0) {
      res.status(404).json({ message: 'Article not found' });
    } else {
      res.status(200).json(result[0][0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Récupérer tous les articles d'un auteur
router.get('/author/:id', async (req, res) => {
  const authorId = req.params.id;
  try {
    const [rows, fields] = await db.promise().query('SELECT * FROM posts WHERE author_id = ?', [authorId]);
    if (rows.length === 0) {
      return res.status(404).send('No posts found for this author');
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});

// Mettre à jour un article
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const articleId = req.params.id;
    const { title, content } = req.body;
    const updated_at = new Date().toISOString();

    // update the article with the specified ID in the database
    const result = await db.promise().query(
      'UPDATE articles SET title = ?, content = ?, updated_at = ? WHERE id = ?',
      [title, content, updated_at, articleId]
    );
    if (result[0].affectedRows === 0) {
      res.status(404).json({ message: 'Article not found' });
    } else {
      res.status(200).json({ message: 'Article updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Supprimer un article
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const [result] = await db.promise().query('DELETE FROM posts WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Post not found');
    }
    return res.status(200).send('Post deleted successfully');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
