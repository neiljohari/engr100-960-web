// Load first card automatically for desktop
document.addEventListener("DOMContentLoaded", function() {
  if(window.innerWidth > 1024) {
    openCard(document.querySelector('.marketing-cards > ul > li > .card').id);
  }
});

// prevent rapid refiring of resize event
const debounce = (func, wait, immediate) => {
    var timeout;
    return (...arguments) => {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, ...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


// on resize, ensure cards are collapsed and on desktop the first is shown
let priorWidth = window.innerWidth;
window.addEventListener('resize', debounce(function() {
  // prevent navbar hide/show on iOS from causing cards to collapse
  if(window.innerWidth == priorWidth) return;
  priorWidth = window.innerWidth;

  cards = document.querySelectorAll('.marketing-cards > ul .card');

  // deactivate all cards
  for(let i = 0 ; i < cards.length ; ++i) {
    cards[i].className = cards[i].className.replace(" active", "");
    if(window.innerWidth < 1024) {
      // mobile version
      cards[i].parentElement.querySelectorAll('.card-indicator')[0].classList.remove('hidden');
    } 
  }

  if(window.innerWidth > 1024) {
    openCard(document.querySelector('.marketing-cards > ul > li > .card').id);
  }


}, 200, false), false);


// generic click callback for landing page cards
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


