Per il nostro blog, concentriamoci sul creare 2 rotte:
- [x] / [POST] - rotta store del crud che riceverà dei dati e creerà un nuovo post. Questa dovrà riceve i dati in formato application/x-www-urlencoded e dovrà ritornare un redirect nel caso di richiesta html, altrimenti di default il json dell’elemento appena creato
- [x] /:slug [DELETE] - rotta destroy del crud che dovrà, attraverso un middleware, ritornare un 404 nel caso non sia stato trovato un post corrispondente. Ritornare un redirect nel caso di richiesta html, altrimenti di default del testo con scritto “post eliminato”
- [] Aggiungiamo un middleware globale per gestire gli errori.
- [x] Tutte le funzioni delle rotte dovranno essere scritte nel controller - dedicato.
- [] Testare le rotte tramite Postman.
Bonus
- [x] Tramite una funzione, salvare l'array dei post nel file .json
- [x] nella funzione store permettere di passare i dati nel formato multipart/form-data tramite multer
- [x] permettere di eseguire l'upload dell'immagine principale del post.
Buon Lavoro