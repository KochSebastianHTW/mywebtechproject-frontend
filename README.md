[![CI](https://github.com/KochSebastianHTW/mywebtechproject-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/KochSebastianHTW/mywebtechproject-frontend/actions/workflows/ci.yml)

# mywebtechproject-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

---
# How to use the App?

## Board

* to-do Liste
* Übersicht über Karten

## Karten (Card)

* Eigenschaften
  * **Name:** großer Umriss des Ziels
    * obligatorisch
  * **Beschreibung:** genauere Aufschlüsselung
  * **Fälligkeitsdatum und -uhrzeit:** Zeit der spätesten Fertigstellung
    * obligatorisch
  * **Zustand:** offen, in Bearbeitung, fertig, im Archiv
    * obligatorisch
  * **Label:** Kategorisierung
* eine Karte kann ein Label haben

## Label

* Eigenschaften
  * **Name:** Bezeichnung
    * obligatorisch
  * **Farbe:** zur besseren Unterscheidung
    * obligatorisch
* ein Label kann mehreren Karten zugeordnet sein

## Funktion

1. zwischen Home, About und Board Seite wechseln
   * über die Navbar
2. neue Karte erstellen
   * unter den Karten des Zustandes OPEN auf den Button zum Erstellen einer Karte klicken
   * im geöffneten Fenster alle geforderten Informationen angeben (mind. Name und Datum)
   * "Create" Button lässt sich erst klicken, wenn alle obligatorischen Informationen angegeben wurden
   * solange bewegt sich der Button unter der Maus weg, wenn man ihn drücken möchte
   * Karte in Kategorie "OPEN" erstellt
3. Karte bearbeiten
   * auf beliebige Karte klicken
   * gewünschte Änderungen im geöffneten Fenster vornehmen
   * Änderungen speichern
4. Karte verschieben
   * beim Bearbeiten der Karte
   * im geöffneten Fenster unten die Kategorie (Register) auswählen
   * Änderungen speichern
5. Karte löschen
   * beim Bearbeiten der Karte
   * im geöffneten Fenster auf "Delete" drücken 
6. Label erstellen
   * unten rechts auf den Button "Labels" klicken
   * in der sich öffnenden Sidebar unten bei "neues Label erstellen" Namen eingeben und Farbe anpassen
   * neues Label speichern
7. Label bearbeiten
   * unten rechts auf den Button "Labels" klicken
   * aus den oben stehenden Labels auswählen und dann anpassen
   * im Anschluss speichern
8. Label löschen
   * beim Bearbeiten des Labels
   * neben dem "Save" Button auf den "Delete" Button klicken
