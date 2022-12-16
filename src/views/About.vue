<template>
  <div id="aboutPage" class="justify-content-between">
    <h1 id="title"> How to use the App?</h1>
    <h4>Board</h4>
    <p>to-do Liste<br>Übersicht über Karten</p>
    <h4>Karten (Card)</h4>
    <h6> Eigenschaften</h6>
    <p>Name großer Umriss des Ziels
      * obligatorisch
      * **Beschreibung:** genauere Aufschlüsselung
      * **Fälligkeitsdatum und -uhrzeit:** Zeit der spätesten Fertigstellung
      * obligatorisch
      * **Zustand:** offen, in Bearbeitung, fertig, im Archiv
      * obligatorisch
      * **Label:** Kategorisierung
      * eine Karte kann ein Label haben</p>
    <h4>Label</h4>
    <h6>Eigenschaften</h6>
    <p>* **Name:** Bezeichnung
      * obligatorisch
      * **Farbe:** zur besseren Unterscheidung
      * obligatorisch
      * ein Label kann mehreren Karten zugeordnet sein</p>
    <h4>Funktion</h4>
    <p>1. zwischen Home, About und Board Seite wechseln
      * über die Navbar
      2. neue Karte erstellen
      * unter den Karten des Zustandes OPEN auf den Button zum Erstellen einer Karte klicken
      * im geöffneten Fenster alle geforderten Informationen angeben
      * Karte in OPEN erstellt
      3. Karte bearbeiten
      * auf beliebige Karte klicken
      * gewünschte Änderungen im geöffneten Fenster vornehmen
      * Änderungen speichern oder Fenster schließen
      4. Karte verschieben
      * beim Bearbeiten der Karte
      * im geöffneten Fenster unten den Zustand auswählen
      * Änderungen speichern oder Fenster schließen
      5. Karte löschen
      * ???
      6. Label erstellen
      * unten rechts auf den Button "Labels" klicken
      * in der sich öffnenden Sidebar unten bei "neues Label erstellen" Namen eingeben und Farbe anpassen
      * neues Label speichern
      7. Label bearbeiten
      * unten rechts auf den Button "Labels" klicken
      * aus den oben stehenden Labels auswählen und dann anpassen
      * im Anschluss speichern
      8. Label löschen
      beim Bearbeiten neben dem "Save" Button auf den "Delete" Button klicken</p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'About'
}
</script>

<style scoped>
#aboutPage {
  max-height: calc(100vh - 70px);
  overflow-y: auto;
  position: absolute;
  top: 60px;
}
#title {
  font-weight: bolder;
}
</style>
