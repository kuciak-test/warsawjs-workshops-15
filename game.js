

document.addEventListener('DOMContentLoaded', function(){

    var playerClasses = {
        'playerA' : 'red',
        'playerB' : 'blue'
    };

    var currentPlayer;

   initGame();

   function initGame() {

       var fields = document.querySelectorAll('.board > div');

       currentPlayer = 'playerA';
       //fields.forEach(field => field.addEventListener('click', fieldClickHandler));
       fields.forEach(field => field.addEventListener('click', fieldClickHandler));
   }

   function fieldClickHandler(){

       console.log("Hello "+this.id, this);

       var playerClass = playerClasses[currentPlayer];
       this.classList.add(playerClass);

       currentPlayer = currentPlayer === 'playerA' ? 'playerB' : 'playerA';

       this.removeEventListener('click', fieldClickHandler);
   }


});