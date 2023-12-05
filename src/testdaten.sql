-- Füge Testdaten in die Tabelle `menus` ein
INSERT INTO menus (gericht, beilage, preis, zutaten, kosten, vegetarisch, vegan, halal)
VALUES
  ('Spaghetti Bolognese', 'Salat', 12.99, 'Hackfleisch, Tomatensauce, Nudeln', 5.99, false, false, false),
  ('Vegetarische Pizza', 'Knoblauchbrot', 14.99, 'Tomaten, Mozzarella, Paprika, Pilze', 6.99, true, false, false),
  ('Linsensuppe', 'Baguette', 9.99, 'Linsen, Gemüsebrühe, Karotten', 4.99, true, true, false),
  ('Chicken Tikka Masala', 'Naan-Brot', 16.99, 'Hähnchen, Tomatensauce, Garam Masala', 7.99, false, false, false),
  ('Caesar Salad', 'Knoblauchbrot', 10.99, 'Römersalat, Hühnerbrust, Croutons, Parmesan', 4.99, false, false, false),
  ('Vegetarisches Sushi', 'Sojasoße', 13.99, 'Reis, Avocado, Gurke, Algen', 6.99, true, true, false),
  ('Rinderbraten mit Kartoffelbrei', 'Gemüse', 18.99, 'Rindfleisch, Kartoffeln, Gemüsebrühe', 8.99, false, false, false),
  ('Griechischer Salat', 'Olivenbrot', 11.99, 'Tomaten, Gurken, Feta, Oliven', 5.99, true, true, false),
  ('Thailändisches Grünes Curry', 'Jasminreis', 15.99, 'Hähnchen, grüne Currypaste, Kokosmilch', 7.99, false, false, false),
  ('Quinoa Bowl mit Gemüse', 'Avocado', 12.99, 'Quinoa, Brokkoli, Paprika, Tomaten', 6.99, true, true, false),
  ('Pizza Margherita', 'Oliven', 13.99, 'Tomaten, Mozzarella, Basilikum', 6.99, true, false, false),
  ('Risotto mit Pilzen', 'Parmesan', 14.99, 'Reis, Pilze, Gemüsebrühe', 7.99, true, false, false),
  ('Hühnersalat mit Erdnussdressing', 'Baguette', 11.99, 'Hähnchen, Römersalat, Erdnussbutter', 5.99, false, false, false),
  ('Gemüsecurry mit Basmatireis', 'Naan-Brot', 12.99, 'Gemüse, Currypaste, Kokosmilch', 6.99, true, true, false),
  ('Lachs mit Zitronen-Dill-Sauce', 'Kartoffelpüree', 17.99, 'Lachs, Zitrone, Dill', 8.99, false, false, false),
  ('Caprese Sandwich', 'Tomatensuppe', 10.99, 'Tomaten, Mozzarella, Basilikum', 4.99, true, false, false),
  ('Rote Linsen Dal mit Reis', 'Naan-Brot', 13.99, 'Rote Linsen, Tomaten, Gewürze', 6.99, true, true, false),
  ('Ceviche mit Avocado', 'Tortillachips', 15.99, 'Frischer Fisch, Limettensaft, Zwiebeln', 7.99, false, true, false),
  ('Vegetarische Lasagne', 'Knoblauchbrot', 14.99, 'Gemüse, Tomatensauce, Mozzarella', 6.99, true, false, false),
  ('Kürbisrisotto', 'Parmesan', 12.99, 'Kürbis, Risotto, Gemüsebrühe', 6.99, true, true, false),
  ('BBQ-Hühnerspieße mit Cole Slaw', 'Knoblauchbrot', 16.99, 'Hähnchen, BBQ-Sauce, Krautsalat', 7.99, false, false, false),
  ('Gebratene Nudeln mit Gemüse', 'Frühlingsrollen', 11.99, 'Nudeln, Gemüse, Sojasoße', 5.99, true, true, halal),
  ('Hühnchen-Parmesan', 'Tomatensuppe', 17.99, 'Hähnchen, Tomatensauce, Mozzarella', 8.99, false, false, false),
  ('Süßkartoffel-Curry', 'Naan-Brot', 13.99, 'Süßkartoffeln, Currypaste, Kokosmilch', 6.99, true, true, false),
  ('Spinat und Feta Quiche', 'Salat', 14.99, 'Spinat, Feta, Eier, Blätterteig', 6.99, true, false, false),
  ('Zitronen-Knoblauch-Hühnchen', 'Kartoffelpüree', 15.99, 'Hühnchen, Zitrone, Knoblauch', 7.99, false, false, false),
  ('Tomatenrisotto', 'Knoblauchbrot', 12.99, 'Tomaten, Risotto, Gemüsebrühe', 6.99, true, true, false),
  ('Bunter Gemüsesalat', 'Balsamico-Dressing', 10.99, 'Gemischtes Gemüse, Feldsalat, Tomaten', 4.99, true, true, false),
  ('Hähnchen-Curry mit Basmatireis', 'Naan-Brot', 16.99, 'Hähnchen, Currypaste, Kokosmilch', 7.99, false, false, false),
  ('Pasta Alfredo mit Broccoli', 'Salat', 14.99, 'Pasta, Alfredo-Sauce, Broccoli', 6.99, true, false, false),
  ('Gemüsesuppe mit Nudeln', 'Knoblauchbrot', 11.99, 'Gemüse, Nudeln, Gemüsebrühe', 5.99, true, true, false);


-- Füge Testdaten in die Tabelle `speiseplan` ein
INSERT INTO speiseplan (datum, archiviert, mo1, mo2, mo3, mo4, di1, di2, di3, di4, mi1, mi2, mi3, mi4, do1, do2, do3, do4, fr1, fr2, fr3, fr4)
VALUES
  ('2023-01-01', false, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20),
  ('2023-01-08', false, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21);


