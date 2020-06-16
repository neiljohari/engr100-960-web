// Load first card automatically
document.addEventListener("DOMContentLoaded", function() {
  openCard(document.querySelector('.marketing-cards > ul > li > .card').id);
});

function openCard(cardId) {

  card = document.getElementById(cardId);

  if(window.innerWidth < 1024) {
    // mobile version
    card.parentElement.querySelectorAll('.card-indicator')[0].classList.toggle('hidden');
  } else {
    // desktop version 
      
    // -> removing the class
    card.classList.remove("bounce");
      
    // -> triggering reflow /* The actual magic */
    // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
    card.offsetWidth = card.offsetWidth;

    // -> and re-adding the class
    card.classList.add("bounce");


    // active selection
    cards = document.querySelectorAll('.marketing-cards > ul .card');

    for(let i = 0 ; i < cards.length ; ++i) {
      cards[i].className = cards[i].className.replace(" active", "");
    }

    peek = document.getElementsByClassName('marketing-peek')[0];
    peekBody = peek.querySelector('.card > .container > .card-body');


    peekImg = peek.querySelector('.card > img');

    console.log(peekImg);

    // fade out
    peekBody.style.opacity = 0;
    peekImg.style.opacity = 0;

    // wait for fade out transition
    setTimeout(function(){ 
      // fade in
      peekBody.innerHTML = card.querySelector(".card-body").innerHTML;
      peekBody.style.opacity = 1;

      peekImg.src = card.querySelector('img').src;
      peekImg.style.opacity = 1;
    },300);

  }

  card.classList.toggle('active');
}


