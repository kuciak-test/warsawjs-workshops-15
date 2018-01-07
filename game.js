

document.addEventListener('DOMContentLoaded', function(){

    var resetButton = document.getElementById('reset-score');

    //słownik kolorów przypisanych graczom
    var playerClasses = {
        'playerA' : 'red',
        'playerB' : 'blue'
    };

    // wyniki gry per użytkownik
    var scores = {
        'playerA': 0,
        'playerB': 0
    }

    // słownik nazw użytkownika
    var names = {
        'playerA': 'Player named A',
        'playerB': 'Player named B'
    }


    var currentPlayer;

    // licznik wolnych pól, gdy zejdzie do zera koniec gry - brak rozstrzygnięcia
    var emptyFields;

   initGame();

   // obsługa resetowania wyników
   resetButton.addEventListener('click', function() {

       scores['playerA'] = 0;
       scores['playerB'] = 0;

       displayPlayerScore('playerA');
       displayPlayerScore('playerB');
   });

   // obsługa przycisków zmiany nazw graczy
   for (let player in names) {
       let renameButton = document.getElementById(`${player}-rename`);
       renameButton.innerText = `Rename ${names[player]}`;

       // ustawianie nazwy gracza przez użytkownika
       renameButton.addEventListener('click', function () {
           // zmieniamy nazwę gracza, ale tylko jak użytkownik podał nową nazwę
           tempName = prompt( `Rename ${names[player]} to:`);
           if (tempName != null) {
               names[player] = tempName;
           }
           renameButton.innerText = `Rename ${names[player]}`;
           displayRoundInformation();
           displayPlayerScore('playerA');
           displayPlayerScore('playerB');
       });

   }

   function displayPlayerScore(player) {
       var score = document.getElementById(`${player}-score`);

       score.innerHTML = `${names[player]} score: ${scores[player]}`;
   }

   function updatePlayerScore(player) {
       scores[player]++;
   }

   function displayRoundInformation() {
       var round = document.getElementById('round-info');

       round.className = playerClasses[currentPlayer];
       round.innerHTML = `Round for ${names[currentPlayer]}`;
   }

   function initGame() {

       var fields = document.querySelectorAll('.board > div');

       currentPlayer = 'playerA';
       emptyFields = 9;

       fields.forEach(field => field.addEventListener('click', fieldClickHandler));
       fields.forEach(field => field.removeAttribute('class'));

       displayRoundInformation();
       displayPlayerScore('playerA');
       displayPlayerScore('playerB');
   }

   function fieldClickHandler(){

       //console.log("fieldClickHandler: "+this.id, this);

       var playerClass = playerClasses[currentPlayer];
       this.classList.add(playerClass);

       emptyFields--;
       currentPlayer = currentPlayer === 'playerA' ? 'playerB' : 'playerA';

       displayRoundInformation();
       this.removeEventListener('click', fieldClickHandler);

       checkWinner();
   }

   function gameWin(wincolor) {
       setTimeout(() => {
           if (wincolor === 'red') {
               alert(`${names['playerA']} Wins!`);
               updatePlayerScore('playerA');
           }
           else {
               alert(`${names['playerB']} Wins!`);
               updatePlayerScore('playerB');
           }
           initGame();
       }, 100);
   }

   function checkWinner() {
       var fields = document.querySelectorAll('.board > div');

       /*

          +---+---+---+
          | 0 | 1 | 2 |
          +---+---+---+
          | 3 | 4 | 5 |
          +---+---+---+
          | 6 | 7 | 8 |
          +---+---+---+

       */

       // dwuwymiarowa tablica gry
       var matrix = [
           [fields[0].className, fields[1].className, fields[2].className],
           [fields[3].className, fields[4].className, fields[5].className],
           [fields[6].className, fields[7].className, fields[8].className]
       ];

       // wyszukanie zwycięstw pełnych linii w poziomie
       for (idx = 0; idx < 3; idx++) {
           //console.log('['+matrix[idx][0]+','+matrix[idx][1]+','+matrix[idx][2]+']');
           if (matrix[idx][0] === matrix[idx][1] &&
               matrix[idx][0] === matrix[idx][2] &&
               matrix[idx][0] != '') {

               gameWin(matrix[idx][0]);
               return;
           }
       }

       // wyszukanie zwycięstw pełnych linii w pionie
       for (idx = 0; idx < 3; idx++) {
           //console.log('['+matrix[0][idx]+','+matrix[1][idx]+','+matrix[2][idx]+']');
           if (matrix[0][idx] === matrix[1][idx] &&
               matrix[0][idx] === matrix[2][idx] &&
               matrix[0][idx] != '') {

               gameWin(matrix[0][idx]);
               return;
           }
       }

       // wyszukanie zwycięstw - przekątna pierwsza
       if (matrix[0][0] === matrix[1][1] &&
           matrix[0][0] === matrix[2][2] &&
           matrix[0][0] != '') {

           gameWin(matrix[0][0]);
           return;
       }

       // wyszukanie zwycięstw - przekątna druga
       if (matrix[0][2] === matrix[1][1] &&
           matrix[0][2] === matrix[2][0] &&
           matrix[0][2] != '') {

           gameWin(matrix[0][2]);
           return;
       }

       // koniec gry bez rozstrzygnięcia
       if (emptyFields === 0) {
           setTimeout(() => {
               alert('Tie');
               initGame();
           }, 100);
           return;
       }

   }

});