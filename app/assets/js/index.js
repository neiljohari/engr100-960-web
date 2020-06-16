function openCard(event, cardId) {
  card = document.getElementById(cardId);
    
  // -> removing the class
  card.classList.remove("bounce");
    
  // -> triggering reflow /* The actual magic */
  // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
  card.offsetWidth = card.offsetWidth;

  // -> and re-adding the class
  card.classList.add("bounce");

  if(window.innerWidth < 1024) {
    // mobile version
    card.parentElement.querySelectorAll('.card-indicator')[0].classList.toggle('hidden');
  } else {
    // desktop version 
    cards = document.querySelectorAll('.marketing-cards > ul .card');

    for(let i = 0 ; i < cards.length ; ++i) {
      cards[i].className = cards[i].className.replace(" active", "");
    }

    peek = document.getElementsByClassName('marketing-peek')[0];
    peekBody = peek.querySelectorAll('.card > .card-body')[0];

    // fade out
    peekBody.style.opacity = 0;

    // wait for fade out transition
    setTimeout(function(){ 
      // fade in
      peekBody.innerHTML = card.querySelectorAll(".card-body")[0].innerHTML;
      peekBody.style.opacity = 1;
    },300);

  }

  card.classList.toggle('active');
}


