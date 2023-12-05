const express = require('express');
const app = express();
const port = 3000;
const model = require('./models');

app.use(express.static('views'));

app.get('/speiseplaene', async (req, res) => {
  const speiseplaene = await model.getAllSpeiseplaene();
  res.send(speiseplaene);
});

app.get('/editSpeiseplan/:speiseplanId', async (req, res) => {
  const speiseplan = await model.getSpeiseplanById(req.params.speiseplanId);
  res.send(speiseplan);
});

app.get('/menus', async (req, res) => {
  const menus = await model.getAllMenus();
  res.send(menus);
});

app.get('/editMenu/:menuId', async (req, res) => {
  const menu = await model.getMenuById(req.params.menuId);
  res.send(menu);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
