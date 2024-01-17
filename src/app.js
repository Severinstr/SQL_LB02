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
    const sortBy = req.query.sortBy || 'gericht';
    const sortOrder = req.query.sortOrder || 'asc';
    res.redirect(`/menus?sortBy=${sortBy}&sortOrder=${sortOrder}`);
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
    const sortBy = req.query.sortBy || 'gericht';
    const sortOrder = req.query.sortOrder || 'asc';

    const menus = await model.getAllMenus(sortBy, sortOrder);
    const columns = await model.getTableColumns('menus');

    res.render('menus', { menus, columns, sortBy, sortOrder });
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


// Neue Route zum Anzeigen des Formulars zum Erstellen eines neuen Menüs
app.get('/create-menu', (req, res) => {
  res.render('createMenu');
});

// Neue Route zum Verarbeiten des erstellten Menüs
app.post('/create-menu', async (req, res) => {
  try {
    const newMenuData = {
      gericht: req.body.gericht,
      beilage: req.body.beilage,
      preis: req.body.preis,
      zutaten: req.body.zutaten,
      kosten: req.body.kosten,
      vegetarisch: req.body.vegetarisch === 'on',
      vegan: req.body.vegan === 'on',
      halal: req.body.halal === 'on',
    };

    // Fügen Sie das neue Menü zur Datenbank hinzu
    const newMenuId = await model.insertMenu(newMenuData);

    res.redirect(`/menus?sortBy=menu_id&sortOrder=desc`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});






// Route für die Speiseplan-Seite
app.get('/', async (req, res) => {
  try {
    const archivierteAnzeigen = req.query.archivierteAnzeigen;
    const weeklyMenus = await model.getWeeklySpeiseplane(archivierteAnzeigen);
    res.render('speiseplaene', { weeklyMenus, archivierteAnzeigen });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route zum Löschen einer Woche
app.post('/delete-week', async (req, res) => {
  try {
    const weekStart = req.body.weekStart;
    await model.deleteWeek(weekStart);

    const archivierteAnzeigen = req.query.archivierteAnzeigen;
    res.redirect(`/?archivierteAnzeigen=${archivierteAnzeigen}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route zum Archivieren einer Woche
app.post('/archive-week', async (req, res) => {
  try {
    const weekStart = req.body.weekStart;
    const weekArchived = await model.archiveWeek(weekStart);
    const archivierteAnzeigen = req.query.archivierteAnzeigen;
    res.redirect(`/?archivierteAnzeigen=${archivierteAnzeigen}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Route für die Edit-Speiseplan-Seite
app.get('/edit-speiseplan', async (req, res) => {
  try {
    const weekStart = req.query.weekStart;
    const menus = await model.getMenusForWeek(weekStart);
    const allMenus = await model.getAllMenus('gericht', 'asc');

    res.render('editSpeiseplan', { weekStart, menus, allMenus });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Route für das Aktualisieren des Speiseplans
app.post('/update-week', async (req, res) => {
  try {
    const weekStart = req.body.weekStart;
    const menus = {
      mo1: ( req.body.mo1 === '' ? null : req.body.mo1),
      mo2: ( req.body.mo2 === '' ? null : req.body.mo2),
      mo3: ( req.body.mo3 === '' ? null : req.body.mo3),
      mo4: ( req.body.mo4 === '' ? null : req.body.mo4),
      di1: ( req.body.di1 === '' ? null : req.body.di1),
      di2: ( req.body.di2 === '' ? null : req.body.di2),
      di3: ( req.body.di3 === '' ? null : req.body.di3),
      di4: ( req.body.di4 === '' ? null : req.body.di4),
      mi1: ( req.body.mi1 === '' ? null : req.body.mi1),
      mi2: ( req.body.mi2 === '' ? null : req.body.mi2),
      mi3: ( req.body.mi3 === '' ? null : req.body.mi3),
      mi4: ( req.body.mi4 === '' ? null : req.body.mi4),
      do1: ( req.body.do1 === '' ? null : req.body.do1),
      do2: ( req.body.do2 === '' ? null : req.body.do2),
      do3: ( req.body.do3 === '' ? null : req.body.do3),
      do4: ( req.body.do4 === '' ? null : req.body.do4),
      fr1: ( req.body.fr1 === '' ? null : req.body.fr1),
      fr2: ( req.body.fr2 === '' ? null : req.body.fr2),
      fr3: ( req.body.fr3 === '' ? null : req.body.fr3),
      fr4: ( req.body.fr4 === '' ? null : req.body.fr4),
    };

    await model.updateWeek(weekStart, menus);

    // Weiterleitung zur Speiseplan-Seite oder einer anderen gewünschten Seite
    res.redirect(`/edit-speiseplan?weekStart=${weekStart}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Neue Route zum Anzeigen des Formulars zum Erstellen eines neuen Speiseplan
app.get('/create-speiseplan', async (req, res) => {
  const allMenus = await model.getAllMenus('gericht', 'asc');
  res.render('createSpeiseplan', {allMenus });
});

// Neue Route zum Verarbeiten des erstellten Speiseplan
app.post('/create-speiseplan', async (req, res) => {
  try {
    const weekStart = req.body.weekStart;
    const menus = {
      mo1: ( req.body.mo1 === '' ? null : req.body.mo1),
      mo2: ( req.body.mo2 === '' ? null : req.body.mo2),
      mo3: ( req.body.mo3 === '' ? null : req.body.mo3),
      mo4: ( req.body.mo4 === '' ? null : req.body.mo4),
      di1: ( req.body.di1 === '' ? null : req.body.di1),
      di2: ( req.body.di2 === '' ? null : req.body.di2),
      di3: ( req.body.di3 === '' ? null : req.body.di3),
      di4: ( req.body.di4 === '' ? null : req.body.di4),
      mi1: ( req.body.mi1 === '' ? null : req.body.mi1),
      mi2: ( req.body.mi2 === '' ? null : req.body.mi2),
      mi3: ( req.body.mi3 === '' ? null : req.body.mi3),
      mi4: ( req.body.mi4 === '' ? null : req.body.mi4),
      do1: ( req.body.do1 === '' ? null : req.body.do1),
      do2: ( req.body.do2 === '' ? null : req.body.do2),
      do3: ( req.body.do3 === '' ? null : req.body.do3),
      do4: ( req.body.do4 === '' ? null : req.body.do4),
      fr1: ( req.body.fr1 === '' ? null : req.body.fr1),
      fr2: ( req.body.fr2 === '' ? null : req.body.fr2),
      fr3: ( req.body.fr3 === '' ? null : req.body.fr3),
      fr4: ( req.body.fr4 === '' ? null : req.body.fr4),
    };

    // Fügen Sie den neuen Speiseplan zur Datenbank hinzu
    const newSpeiseplanId = await model.insertSpeiseplan(weekStart,menus);

    res.redirect(`/`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});






