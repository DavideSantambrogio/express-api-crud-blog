const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// Rotte per l'entità post
router.get('/', postsController.getPosts);
router.post('/', postsController.addPost);

// Rotta per visualizzare la pagina di creazione di un nuovo post
router.get('/create', postsController.createPostPage);

// Rotte per la gestione dei singoli post
router.get('/:slug', postsController.getPostBySlug);

// Rotta per il download dell'immagine
router.get('/:slug/download', postsController.downloadImageBySlug); 

module.exports = router;
