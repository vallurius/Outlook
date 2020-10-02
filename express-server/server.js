const express = require('express');
const app = express();
var cors = require('cors');

const port = 3003;

app.use(cors());

app.all('/api/*/:fileName', (req, res) => {
  const methodName = req.method.toLowerCase();
  const response = require(`./mocks/${methodName}_${req.params.fileName}.json`);
  res.json(response);
});

app.post('/:fileName', (req, res) => {
  const methodName = req.method.toLowerCase();
  const response = require(`./mocks/${methodName}_${req.params.fileName}.json`);
  res.json(response);
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
