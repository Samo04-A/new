const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Middleware pentru a servi fișiere statice și a gestiona JSON
app.use(express.static('public'));
app.use(express.json());

// Endpoint pentru a primi datele din formular
app.post('/submit', (req, res) => {
  const { link, message } = req.body;

  // Scrie datele într-un fișier
  const data = `Link: ${link}\nMessage: ${message}\n\n`;
  fs.appendFileSync('data.txt', data);

  // Commit și push pe GitHub
  exec('git add data.txt && git commit -m "Adăugat link și mesaj" && git push', (err, stdout, stderr) => {
    if (err) {
      console.error(`Eroare la git: ${stderr}`);
      return res.status(500).send('Eroare la salvarea datelor!');
    }
    res.send('Datele au fost salvate și trimise pe GitHub!');
  });
});

// Pornire server
app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
