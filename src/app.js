const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const model = require('./models');

// Setze die View Engine auf "ejs"
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


// Route zum Löschen eines Menüs
app.post('/delete-menu', async (req, res) => {
  try {
    const menuIdToDelete = req.body.menuId;
    // Überprüfen, ob das Menü in einem Speiseplan verwendet wird
    const isUsedInSpeiseplan = await model.isMenuUsedInSpeiseplan(menuIdToDelete);

    if (isUsedInSpeiseplan) {
      return res.status(400).send('Das Menü kann nicht gelöscht werden, da es noch in einem Speiseplan verwendet wird.');
    }

    // Menü löschen, wenn es nicht in einem Speiseplan verwendet wird
    await model.deleteMenu(menuIdToDelete);
    res.redirect('/menus');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

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

// Route zum Anzeigen des Menübearbeitungsformulars
app.get('/edit-menu', async (req, res) => {
  try {
    const menuIdToEdit = req.query.menuId;
    const menu = await model.getMenuById(menuIdToEdit);

    if (!menu) {
      return res.status(404).send('Menü nicht gefunden.');
    }

    res.render('editMenu', { menu });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route zum Verarbeiten des bearbeiteten Menüs
app.post('/edit-menu', async (req, res) => {
  try {
    const menuIdToEdit = req.body.menuId;
    const updatedData = {
      gericht: req.body.gericht,
      beilage: req.body.beilage,
      preis: req.body.preis,
      zutaten: req.body.zutaten,
      kosten: req.body.kosten,
      vegetarisch: req.body.vegetarisch === 'on',
      vegan: req.body.vegan === 'on',
      halal: req.body.halal === 'on',
    };

    await model.updateMenu(menuIdToEdit, updatedData);
    res.redirect('/menus');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
