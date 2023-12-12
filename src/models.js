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

  static getAllMenus() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM menus ORDER BY gericht';
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
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
