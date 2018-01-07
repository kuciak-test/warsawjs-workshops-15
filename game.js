

document.addEventListener('DOMContentLoaded', function(){

    var resetButton = document.getElementById('reset-score');
    var playerClasses = {
        'playerA' : 'red',
        'playerB' : 'blue'
    };

    var scores = {
        'playerA': 0,
        'playerB': 0
    }

    var names = {
        'playerA': 'Player named A',
        'playerB': 'Player named B'
    }

    var currentPlayer;
    var emptyFields;

   initGame();

   resetButton.addEventListener('click', function() {

       scores['playerA'] = 0;
       scores['playerB'] = 0;

       displayPlayerScore('playerA');
       displayPlayerScore('playerB');
   });

   for (let player in names) {
       let renameButton = document.getElementById(`${player}-rename`);
       renameButton.innerText = `Rename ${names[player]}`;
       renameButton.addEventListener('click', function () {
           // zmieniamy nazwę gracza, ale tylko jak użytkownik podał nową nazwę
           tempName = prompt( `Rename ${player} to:`);
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

       //console.log("Hello "+this.id, this);

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
       var macierz = [
           [fields[0].className, fields[1].className, fields[2].className],
           [fields[3].className, fields[4].className, fields[5].className],
           [fields[6].className, fields[7].className, fields[8].className]
       ];

       for (idx = 0; idx < 3; idx++) {
           //console.log('['+macierz[idx][0]+','+macierz[idx][1]+','+macierz[idx][2]+']');
           if (macierz[idx][0] === macierz[idx][1] &&
               macierz[idx][0] === macierz[idx][2] &&
               macierz[idx][0] != '') {

               gameWin(macierz[idx][0]);
               return;
           }
       }

       for (idx = 0; idx < 3; idx++) {
           console.log('['+macierz[0][idx]+','+macierz[1][idx]+','+macierz[2][idx]+']');
           if (macierz[0][idx] === macierz[1][idx] &&
               macierz[0][idx] === macierz[2][idx] &&
               macierz[0][idx] != '') {

               gameWin(macierz[0][idx]);
               return;
           }
       }

       // przekątna pierwsza
       if (macierz[0][0] === macierz[1][1] &&
           macierz[0][0] === macierz[2][2] &&
           macierz[0][0] != '') {

           gameWin(macierz[0][0]);
           return;
       }

       // przekątna druga
       if (macierz[0][2] === macierz[1][1] &&
           macierz[0][2] === macierz[2][0] &&
           macierz[0][2] != '') {

           gameWin(macierz[0][2]);
           return;
       }

       if (emptyFields === 0) {
           setTimeout(() => {
               alert('Tie');
               initGame();
           }, 100);
           return;
       }

   }

});