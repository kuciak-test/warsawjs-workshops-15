

document.addEventListener('DOMContentLoaded', function(){

    var playerClasses = {
        'playerA' : 'red',
        'playerB' : 'blue'
    };

    var currentPlayer;
    var emptyFields;

   initGame();

   function initGame() {

       var fields = document.querySelectorAll('.board > div');

       currentPlayer = 'playerA';
       emptyFields = 9;
       //fields.forEach(field => field.addEventListener('click', fieldClickHandler));
       fields.forEach(field => field.addEventListener('click', fieldClickHandler));
   }

   function fieldClickHandler(){

       console.log("Hello "+this.id, this);

       var playerClass = playerClasses[currentPlayer];
       this.classList.add(playerClass);

       emptyFields--;
       currentPlayer = currentPlayer === 'playerA' ? 'playerB' : 'playerA';

       this.removeEventListener('click', fieldClickHandler);

       /*
       if (emptyFields === 0) {
           alert('End of the Game!');
       }*/
       checkWinner();
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

               alert(macierz[idx][0] + ' wins!');
               return;
           }
       }

       for (idx = 0; idx < 3; idx++) {
           console.log('['+macierz[0][idx]+','+macierz[1][idx]+','+macierz[2][idx]+']');
           if (macierz[0][idx] === macierz[1][idx] &&
               macierz[0][idx] === macierz[2][idx] &&
               macierz[0][idx] != '') {

               alert(macierz[0][idx] + ' wins!');
               return;
           }
       }

       // przekątna pierwsza
       if (macierz[0][0] === macierz[1][1] &&
           macierz[0][0] === macierz[2][2] &&
           macierz[0][0] != '') {

           alert(macierz[0][0] + ' wins!');
       }

       // przekątna druga
       if (macierz[0][2] === macierz[1][1] &&
           macierz[0][2] === macierz[2][0] &&
           macierz[0][2] != '') {

           alert(macierz[0][2] + ' wins!');
       }

       if (emptyFields === 0) {
           alert('Tie');
           return;
       }

   }

});