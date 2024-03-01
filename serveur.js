const express = require('express');



// Initialisation de l'application Express
const app = express();

// Configuration de body-parser pour traiter les données JSON
app.use(express.json())
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
const generateMain = require("./getIndex.js")
app.use('/public',express.static('public'))

//main page
app.get('/',async (req, res) => {
    const main = await generateMain();
    res.send(main);
})



// Port d'écoute du serveur
const port = process.env.PORT || 10003;
app.listen(port, () => {
    console.log(`serveur démarré : http://localhost:${port}`)
});
