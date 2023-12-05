-- Erstelle die Datenbank
CREATE DATABASE IF NOT EXISTS cantina_db;

-- Verwende die erstellte Datenbank
USE cantina_db;

-- Benutzer erstellen und Benutzer setzen
CREATE USER 'cantina'@'localhost' IDENTIFIED BY 'Mg?9502)*LDc';
ALTER USER 'cantina'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Mg?9502)*LDc';
GRANT ALL ON cantina_db.* TO 'cantina'@'localhost';
FLUSH PRIVILEGES;

-- Erstelle die Tabelle `speiseplan`
CREATE TABLE IF NOT EXISTS speiseplan (
  speiseplan_id INT AUTO_INCREMENT PRIMARY KEY,
  datum DATE,
  archiviert BOOLEAN,
  mo1 INT,
  mo2 INT,
  mo3 INT,
  mo4 INT,
  di1 INT,
  di2 INT,
  di3 INT,
  di4 INT,
  mi1 INT,
  mi2 INT,
  mi3 INT,
  mi4 INT,
  do1 INT,
  do2 INT,
  do3 INT,
  do4 INT,
  fr1 INT,
  fr2 INT,
  fr3 INT,
  fr4 INT
);

-- Erstelle die Tabelle `menus`
CREATE TABLE IF NOT EXISTS menus (
  menu_id INT AUTO_INCREMENT PRIMARY KEY,
  gericht VARCHAR(255),
  beilage VARCHAR(255),
  preis DECIMAL(10, 2),
  zutaten TEXT,
  kosten DECIMAL(10, 2),
  vegetarisch BOOLEAN,
  vegan BOOLEAN,
  halal BOOLEAN
);

-- Füge Beziehungen zwischen speiseplan und menus hinzu
ALTER TABLE speiseplan
  ADD CONSTRAINT fk_mo1 FOREIGN KEY (mo1) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_mo2 FOREIGN KEY (mo2) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_mo3 FOREIGN KEY (mo3) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_mo4 FOREIGN KEY (mo4) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_di1 FOREIGN KEY (di1) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_di2 FOREIGN KEY (di2) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_di3 FOREIGN KEY (di3) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_di4 FOREIGN KEY (di4) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_mi1 FOREIGN KEY (mi1) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_mi2 FOREIGN KEY (mi2) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_mi3 FOREIGN KEY (mi3) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_mi4 FOREIGN KEY (mi4) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_do1 FOREIGN KEY (do1) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_do2 FOREIGN KEY (do2) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_do3 FOREIGN KEY (do3) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_do4 FOREIGN KEY (do4) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_fr1 FOREIGN KEY (fr1) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_fr2 FOREIGN KEY (fr2) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_fr3 FOREIGN KEY (fr3) REFERENCES menus (menu_id),
  ADD CONSTRAINT fk_fr4 FOREIGN KEY (fr4) REFERENCES menus (menu_id);
