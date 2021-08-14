let mainLevel = 1;
let subLevel = 1;
let currentQuestion = '';
let wrong = 0;

// Zum Start werden die Counter Aktualisiert und die erste reihe an zufallszahlen generiert
SetCounter(); // Aktualisiert die Counter
ShowToGuess(); // Generiert die erste zufallszahl

// Event Listener welcher eine Funktion zum überprüfen der Usereingabe ausführt

// Dem Form Element wird eine eventlistener hinzugefügt welcher auf ein submit wartet
// Als Parameter wird hier das "submit" event übergeben
document.getElementById('form').addEventListener('submit', (event) => {
  let userInput = document.getElementById('_input').value;
  event.preventDefault(); // prevent.Default sorgt dafür dass das formular beim submit nicht die Seite neu lädt

  if (currentQuestion == userInput) {
    // Prüft ob die eingabe des Users der zu erratenen Zahl entspricht
    if (subLevel < 3) {
      ++subLevel; // wenn das Sub Level unter 3 ist, steigt man ein Sub Level auf
    } else if (subLevel == 3) {
      ++mainLevel; // Wenn das Sub Level gleich 3 entspricht, steigt man ein Main Level auf und das Sub Level wird zurück gesetzt
      subLevel = 1;
    }
    SetCounter(); // Damit die neuen Daten angezeigt werden werden mit der SetCounter Funktion, der Text der HTML Elemente mit den neuen daten ersetzt
    document.getElementById('_input').value = ''; // Input wird durch einen leeren String ersetzt damit eine Neue Usereingabe erfolgen kann
    ShowToGuess(true); // Zeigt die zu erratende Zahl direkt nach dem Submit Event (ENTER drücken) aufgrund des "true" Parameter
  } else {
    wrong++; // Bei falscher eingabe geht die Anzahl der falschen eingaben hoch
    document.getElementById('_input').value = ''; // Setzt den input auf einen leeren string
    SetCounter(); // Aktualisiert die Anzeige
    if (wrong === 3) {
      // Bei 3 Falschen eingaben ist das Spiel vorbei
      document.getElementById('form').style.display = 'none'; // Blendet die eingabe aus
      document.getElementById('lostTitle').style.display = 'block'; // Blendet die "Verlieren Nachricht" ein
      document.getElementById('guess').innerHTML = 'XXXXXX'; // Ersetzt die Anzeige mit der zu erratenen Zahl mit "XXXXXX"
      return; // Das return sorgt dafür dass der Codeblock unterhalb des IF Statements nicht ausgeführt wird
    }
    ShowToGuess(true); // Zeigt die zu erratende Zahl direkt nach dem Submit Event (ENTER drücken) aufgrund des "true" Parameter
  }
});

// Funktionen =================================================================================================

// Generiert eine zufahlszahl in relation zum Level und blendet diese auf der DOM an
function generator() {
  let numberToGuess = ''; // Erstellt eine Variable mit der zu erratenen Zahl
  for (let index = 0; index < mainLevel + 1; index++) {
    // erstellt eine Zufallszahl mit der Anzahl an ziffern der summe des Main Levels + 1
    let random = Math.round(Math.random() * (9 - 0)).toString(); // Generiert eine Ziffer zwischen 0 und 9 und wandelt diese in einen String um
    numberToGuess = numberToGuess + random; // Hängt die Zufallsziffer und hängt diese hinter den String
    currentQuestion = numberToGuess; // Macht die zu erratene zu einer Globalen variable
  }
  document.getElementById('guess').innerHTML = numberToGuess; // Zeigt die zu erratende Zahl in der DOM an
}

// Zeigt die zu erratende Zahl an in relation zum Level (Höheres Level = Mehr Zeit)
function ShowToGuess(short) {
  time =
    100 * Math.min(mainLevel + 2, 5) + 400 * Math.max(mainLevel + 2 - 5, 0); // Berechnet auf Basis des Levels die Zeit in der die zu erratende Zahl Sichtbar ist
  setTimeout(
    () => {
      generator(); // führt entweder nach 0ms oder nach "time" ms die Generator Funktion aus
      setTimeout(() => {
        let string = '';
        for (let index = 0; index < mainLevel + 1; index++) {
          // Die for schleife erstellt einen String aus '·' welche mit der Ziffernanzahl der zu erratenen Zahl übereinstimmt
          string = string + '·';
        }
        document.getElementById('guess').innerHTML = string; // Tauscht den generierten string mit dem Feld der zu erratenen Zahl aus
        //console.log(currentQuestion); ( Die Zeile auskommentieren damit die zu erratene Zahl in der Konsole angezeigt wird )
      }, time);
    },
    short ? 0 : time // Bestimmt die Zeit nach wie vielen sekunden der codeblock ausgeführt wirt
    // Der Ternary Operator bestimmt die Sekunden (bei true => 0ms, bei false => time variable)
  );
}

// Funktion zum aktualisieren der Lebens & Level Anzeige
function SetCounter() {
  document.getElementById('levelCounter').innerHTML = `${
    mainLevel + ' | ' + subLevel
  }`; // Aktualisiert die Levelanzeige

  document.getElementById('wrongCounter').innerHTML = `Wrong: ${
    wrong + '/' + 3
  }`; // Aktualisiert die Anzeige für die Falschen eingaben
}

// Restart Funktion setzt alle Variablen auf ihre Standartwerte und startet ein neues Spiel
function Restart() {
  // Standartwerte werden gesetzt
  mainLevel = 1;
  subLevel = 1;
  currentQuestion = '';
  wrong = 0;
  lives = 3;

  document.getElementById('form').style.display = 'block'; // Blendet das Inputfeld wieder an
  document.getElementById('lostTitle').style.display = 'none'; // Blendet die Verlieren Nachricht ein

  // Löst eine neues Spiel aus
  SetCounter();
  ShowToGuess(true);
}
