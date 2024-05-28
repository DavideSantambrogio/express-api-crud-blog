const fs = require('fs');
const path = require('path');
const posts = require('../data/data.json');

// Funzione per ottenere tutti i post
exports.getPosts = (req, res) => {
    const initialPage = `<a href="/">Torna alla pagina iniziale</a>`;

    res.format({
        'application/json': function () {
            res.json(posts);
        },
        'text/html': function () {
            let html = initialPage + '<ul>';
            posts.forEach(post => {
                // Creazione del link per la visualizzazione del singolo post
                const postLink = `<a href="/posts/${post.slug}">${post.title}</a>`;
                html += `
                    <li>
                        <h2>${postLink}</h2>
                        <img src="/imgs/posts/${post.image}" alt="${post.title}" style="width:300px">
                        <p>${post.content}</p>
                        <p>Tags: ${post.tags.join(', ')}</p>                            
                    </li>`;
            });
            html += '</ul>';
            res.send(html);
        },
        default: function () {
            res.status(406).send('Not Acceptable');
        }
    });
};


// Funzione per visualizzare un singolo post
exports.getPostBySlug = (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);

    // Verifica se il post è stato trovato
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    post.image_url = `/imgs/posts/${post.image}`;


    res.format({
        'application/json': function () {
            res.json(post);
        },
        'text/html': function () {
            const html = `
                <a href="/posts">Torna alla lista dei post</a>
                <h2>${post.title}</h2>
                <a href="${post.image_url}" target="_blank">
                    <img src="/imgs/posts/${post.image}" alt="${post.title}" style="width:300px">
                </a>
                <p>${post.content}</p>
                <p>Tags: ${post.tags.join(', ')}</p>
                <a href="${post.image_url}" download>Download Image</a>
            `;
            res.send(html);
        },
        default: function () {
            res.status(406).send('Not Acceptable');
        }
    });
};

// Funzione per aggiungere un nuovo post
exports.addPost = (req, res) => {
    const { title, content, image, tags } = req.body;

    // Verifica che tutti i campi siano presenti nella richiesta
    if (!title || !content || !image || !tags) {
        return res.status(400).json({ error: 'Assicurati di fornire tutti i campi necessari: title, content, image e tags' });
    }

    // Crea un nuovo post
    const newPost = {
        title,
        content,
        image,
        tags
    };

    // Aggiungi il nuovo post all'array dei post
    posts.push(newPost);

    // Scrivi i dati aggiornati nel file data.json
    const dataFilePath = path.join(__dirname, '../data/data.json');
    fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2), (err) => {
        if (err) {
            console.error('Errore durante il salvataggio dei dati:', err);
            return res.status(500).json({ error: 'Errore durante il salvataggio dei dati' });
        }
        console.log('Dati salvati correttamente.');
        // Invia una risposta con il nuovo post aggiunto e lo status code 201 Created
        res.status(201).json(newPost);
    });
};

// Funzione per creare una pagina per la creazione di un nuovo post
exports.createPostPage = (req, res) => {
    const accept = req.headers.accept;

    if (accept && accept.includes('text/html')) {
        // Se la richiesta accetta HTML, restituisci una pagina HTML con un h1
        res.send('<h1>Creazione nuovo post</h1>');
    } else {
        // Altrimenti, restituisci un errore 406 per indicare che il tipo di risposta non è accettato
        res.status(406).send('Not Acceptable');
    }
};

// Funzione per scaricare l'immagine del post tramite lo slug
exports.downloadImageBySlug = (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);

    // Verifica se il post è stato trovato
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    // Percorso completo dell'immagine
    const imagePath = path.join(__dirname, `../public/imgs/posts/${post.image}`);

    // Invia il file come allegato
    res.download(imagePath, (err) => {
        if (err) {
            console.error('Errore durante il download dell\'immagine:', err);
            return res.status(500).json({ error: 'Errore durante il download dell\'immagine' });
        }
        console.log('Immagine scaricata correttamente.');
    });
};
