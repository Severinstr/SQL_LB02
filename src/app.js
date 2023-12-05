const express = require('express');
const app = express();
const port = 3000;
const model = require('./models');

// Setze die View Engine auf "ejs"
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/speiseplaene', async (req, res) => {
  const speiseplaene = await model.getAllSpeiseplaene();
  res.send(speiseplaene);
});

app.get('/editSpeiseplan/:speiseplanId', async (req, res) => {
  const speiseplan = await model.getSpeiseplanById(req.params.speiseplanId);
  res.send(speiseplan);
});

app.get('/menus', async (req, res) => {
  try {
    const menus = await model.getAllMenus();
    res.render('menus', { menus });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/editMenu/:menuId', async (req, res) => {
  const menu = await model.getMenuById(req.params.menuId);
  res.send(menu);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
