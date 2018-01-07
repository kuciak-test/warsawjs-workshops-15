

document.addEventListener('DOMContentLoaded', function(){

   initGame();

   function initGame() {

       var fields = document.querySelectorAll('.board > div');

       //fields.forEach(field => field.addEventListener('click', fieldClickHandler));
       fields.forEach(field => field.addEventListener('click', fieldClickHandler));
   }

   function fieldClickHandler(){

       console.log("Hello "+this.id, this);
       this.classList.add('red');
   }


});