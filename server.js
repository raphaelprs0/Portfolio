const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware pour lire les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.'))); // Sert tes fichiers HTML/CSS

// Route pour traiter le formulaire
app.post('/contact', async (req, res) => {
    const { nom, email, message } = req.body;

    // Configuration du transporteur (Exemple avec Gmail)
    // Note : Pour Gmail, tu devras générer un "Mot de passe d'application" dans ton compte Google
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'raphaelpires68@gmail.com', // Ton email
            pass: 'bcxn mspn mzeb yqnt' // Ton mot de passe d'application (pas le vrai mdp)
        }
    });
    // Options de l'email
    let mailOptions = {
        from: email, // L'email de la personne qui te contacte
        to: 'raphaelpires68@gmail.com', // Où tu reçois le message
        subject: `Portfolio Contact: ${nom}`,
        text: `Tu as reçu un message de ${nom} (${email}) :\n\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send(`
            <script>
                alert('Message envoyé !');
                window.location.href = '/index.html';
            </script>
        `);
    } catch (error) {
        console.log(error);
        res.send("Erreur lors de l'envoi.");
    }
});

// Lancer le serveur
app.listen(3000, () => {
    console.log('Serveur lancé sur http://localhost:3000');
});