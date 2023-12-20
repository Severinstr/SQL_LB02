const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'cantina',
  password: 'Mg?9502)*LDc',
  database: 'cantina_db',
});

connection.connect();

class CantinaModel {
  static getAllSpeiseplaene() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM speiseplan ORDER BY datum';
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getSpeiseplanById(speiseplanId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM speiseplan WHERE speiseplan_id = ${speiseplanId}`;
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getAllMenus(sortBy, sortOrder) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM menus ORDER BY ${sortBy} ${sortOrder}`;
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getTableColumns(tableName) {
    return new Promise((resolve, reject) => {
      const query = `SHOW COLUMNS FROM ${tableName}`;
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const columns = results.map((result) => result.Field);
          resolve(columns);
        }
      });
    });
  }

  static getMenuById(menuId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM menus WHERE menu_id = ${menuId}`;
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  static updateMenu(menuId, updatedData) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE menus SET gericht = "${updatedData.gericht}", beilage = "${updatedData.beilage}", preis = ${updatedData.preis}, zutaten = "${updatedData.zutaten}", kosten = ${updatedData.kosten}, vegetarisch = ${updatedData.vegetarisch}, vegan = ${updatedData.vegan}, halal = ${updatedData.halal} WHERE menu_id = ${menuId}`;
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static insertMenu(neueMenuDaten) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO menus (gericht, beilage, preis, zutaten, kosten, vegetarisch, vegan, halal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [
        neueMenuDaten.gericht,
        neueMenuDaten.beilage,
        neueMenuDaten.preis,
        neueMenuDaten.zutaten,
        neueMenuDaten.kosten,
        neueMenuDaten.vegetarisch,
        neueMenuDaten.vegan,
        neueMenuDaten.halal,
      ];

      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }


  static getMenusForWeek(weekStart) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT mo1, mo2, mo3, mo4, di1, di2, di3, di4, mi1, mi2, mi3, mi4, do1, do2, do3, do4, fr1, fr2, fr3, fr4 FROM speiseplan WHERE DATE_FORMAT(datum, "%Y-%m-%d") = ?';
      connection.query(query, [weekStart], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }



  static getWeeklyMenus() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT DISTINCT DATE_FORMAT(datum, "%Y-%m-%d") as week_start, archiviert FROM speiseplan';
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }


  static deleteWeek(weekStart) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM speiseplan WHERE DATE_FORMAT(datum, "%Y-%m-%d") = ?';
      connection.query(query, [weekStart], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }


  static archiveWeek(weekStart) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE speiseplan SET archiviert = NOT archiviert WHERE DATE_FORMAT(datum, "%Y-%m-%d") = ?';
      connection.query(query, [weekStart], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }




  static deleteMenu(menuId) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM menus WHERE menu_id = ${menuId}`;
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

  static isMenuUsedInSpeiseplan(menuId) {
    return new Promise((resolve, reject) => {
      const query =`SELECT COUNT(*) AS count FROM speiseplan WHERE mo1 = ${menuId} OR mo2 = ${menuId} OR mo3 = ${menuId} OR mo4 = ${menuId} OR di1 = ${menuId} OR di2 = ${menuId} OR di3 = ${menuId} OR di4 = ${menuId} OR mi1 = ${menuId} OR mi2 = ${menuId} OR mi3 = ${menuId} OR mi4 = ${menuId} OR do1 = ${menuId} OR do2 = ${menuId} OR do3 = ${menuId} OR do4 = ${menuId} OR fr1 = ${menuId} OR fr2 = ${menuId} OR fr3 = ${menuId} OR fr4 = ${menuId}`;

      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve( results[0].count > 0);
        }
      });
    });

}
}

module.exports = CantinaModel;
