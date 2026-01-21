// api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // On accepte seulement les méthodes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  // Configuration de Nodemailer (Gmail exemple)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // On utilise des variables d'environnement (voir Étape 4)
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // Tu reçois le mail sur ton propre compte
      subject: `Nouveau message Portfolio de ${name}`,
      text: `De: ${name} (${email})\n\nMessage:\n${message}`,
      html: `<p><strong>De:</strong> ${name} (${email})</p><p><strong>Message:</strong></p><p>${message}</p>`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi du mail.' });
  }
}