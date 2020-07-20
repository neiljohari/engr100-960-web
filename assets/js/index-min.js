document.addEventListener("DOMContentLoaded", function () {
  window.innerWidth > 1024 &&
    openCard(
      document.querySelector(".MarketingCardDeck .MarketingCard").id,
      !0
    );
});
const debounce = (e, r, t) => {
  var a;
  return (...arguments) => {
    const d = this,
      i = arguments,
      n = t && !a;
    clearTimeout(a),
      (a = setTimeout(function () {
        (a = null), t || e.apply(d, ...i);
      }, r)),
      n && e.apply(d, i);
  };
};
let priorWidth = window.innerWidth;
function openCard(e, r = !1) {
  if (((card = document.getElementById(e)), window.innerWidth < 1024))
    card.parentElement
      .querySelectorAll(".MarketingCard_indicator")[0]
      .classList.toggle("MarketingCard_indicator___hidden");
  else {
    card.classList.remove("bounce"),
      (card.offsetWidth = card.offsetWidth),
      card.classList.add("bounce"),
      (cards = document.querySelectorAll(".MarketingCardDeck .MarketingCard"));
    for (let e = 0; e < cards.length; ++e)
      cards[e].className = cards[e].className.replace(
        " MarketingCard___active",
        ""
      );
    (peek = document.getElementsByClassName("MarketingPeek")[0]),
      (peekBody = peek.querySelector(
        ".MarketingPeek_body .MarketingPeek_text"
      )),
      (peekImg = peek.querySelector("img")),
      r || ((peekBody.style.opacity = 0), (peekImg.style.opacity = 0)),
      (peekBody.innerHTML = card.querySelector(
        ".MarketingCard_body .MarketingCard_text"
      ).innerHTML),
      (peekImg.src = card.querySelector("img").src),
      r ||
        setTimeout(function () {
          (peekBody.style.opacity = 1), (peekImg.style.opacity = 1);
        }, 300);
  }
  card.classList.toggle("MarketingCard___active");
}
window.addEventListener(
  "resize",
  debounce(
    function () {
      if (window.innerWidth != priorWidth) {
        if (
          ((priorWidth = window.innerWidth),
          (cards = document.querySelectorAll(
            ".MarketingCardDeck .MarketingCard"
          )),
          window.innerWidth < 1024)
        )
          for (let e = 0; e < cards.length; ++e)
            console.log(cards[e].classList),
              cards[e].classList.contains("MarketingCard___active")
                ? cards[e].parentElement
                    .querySelectorAll(".MarketingCard_indicator")[0]
                    .classList.add("MarketingCard_indicator___hidden")
                : cards[e].parentElement
                    .querySelectorAll(".MarketingCard_indicator")[0]
                    .classList.remove("MarketingCard_indicator___hidden");
        if (window.innerWidth > 1024) {
          desktopCard =
            document.querySelector(
              ".MarketingCardDeck .MarketingCard___active"
            ) || document.querySelector(".MarketingCardDeck .MarketingCard");
          for (let e = 0; e < cards.length; ++e)
            cards[e].className = cards[e].className.replace(
              " MarketingCard___active",
              ""
            );
          openCard(desktopCard.id, !0);
        }
      }
    },
    200,
    !1
  ),
  !1
);
