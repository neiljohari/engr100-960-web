// Load first card automatically for desktop
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 1024) {
    openCard(
      document.querySelector(".MarketingCardDeck .MarketingCard").id,
      true
    );
  }
});

// prevent rapid refiring of resize event
const debounce = (func, wait, immediate) => {
  var timeout;
  return (...arguments) => {
    const context = this,
      args = arguments;
    const later = function () {
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
window.addEventListener(
  "resize",
  debounce(
    function () {
      // prevent navbar hide/show on iOS from causing cards to collapse
      if (window.innerWidth == priorWidth) return;
      priorWidth = window.innerWidth;

      cards = document.querySelectorAll(".MarketingCardDeck .MarketingCard");

      // deactivate all cards
      if (window.innerWidth < 1024) {
        for (let i = 0; i < cards.length; ++i) {
          console.log(cards[i].classList);
          if (!cards[i].classList.contains("MarketingCard___active"))
            cards[i].parentElement
              .querySelectorAll(".MarketingCard_indicator")[0]
              .classList.remove("MarketingCard_indicator___hidden");
          else
            cards[i].parentElement
              .querySelectorAll(".MarketingCard_indicator")[0]
              .classList.add("MarketingCard_indicator___hidden");
        }
      }

      if (window.innerWidth > 1024) {
        // determine which card to carry over to desktop
        // default to first card
        desktopCard =
          document.querySelector(
            ".MarketingCardDeck .MarketingCard___active"
          ) || document.querySelector(".MarketingCardDeck .MarketingCard");

        // deactivate all cards
        for (let i = 0; i < cards.length; ++i) {
          cards[i].className = cards[i].className.replace(
            " MarketingCard___active",
            ""
          );
        }

        // immediately activate the chosen card
        openCard(desktopCard.id, true);
      }
    },
    200,
    false
  ),
  false
);

// generic click callback for landing page cards
function openCard(cardId, immediate = false) {
  card = document.getElementById(cardId);

  if (window.innerWidth < 1024) {
    // mobile version
    card.parentElement
      .querySelectorAll(".MarketingCard_indicator")[0]
      .classList.toggle("MarketingCard_indicator___hidden");
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
    cards = document.querySelectorAll(".MarketingCardDeck .MarketingCard");

    for (let i = 0; i < cards.length; ++i) {
      cards[i].className = cards[i].className.replace(
        " MarketingCard___active",
        ""
      );
    }

    peek = document.getElementsByClassName("MarketingPeek")[0];
    peekBody = peek.querySelector(".MarketingPeek_body .MarketingPeek_text");
    peekImg = peek.querySelector("img");

    // fade out
    if (!immediate) {
      peekBody.style.opacity = 0;
      peekImg.style.opacity = 0;
    }
    peekBody.innerHTML = card.querySelector(
      ".MarketingCard_body .MarketingCard_text"
    ).innerHTML;
    peekImg.src = card.querySelector("img").src;

    if (!immediate) {
      // wait for fade out transition
      setTimeout(function () {
        // fade in
        peekBody.style.opacity = 1;
        peekImg.style.opacity = 1;
      }, 300);
    }
  }

  card.classList.toggle("MarketingCard___active");
}
