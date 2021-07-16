const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send('it works');
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
