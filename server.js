const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable All CORS Requests for development purposes
app.use(cors());

app.use(express.json());

app.post('/data.json', (req, res) => {
  fs.writeFile('data.json', JSON.stringify(req.body, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error writing to file');
    } else {
      res.status(200).send('Data written to file');
    }
  });
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
