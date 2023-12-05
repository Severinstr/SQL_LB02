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
}

module.exports = CantinaModel;
