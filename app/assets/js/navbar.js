window.onload = function () {
  if (localStorage.getItem("navLinksListOpen")) {
    var navLinksList = document.getElementById("navLinksList");
    navLinksList.classList.add("NavLinks_list___active");
  } else {
    var navLinksList = document.getElementById("navLinksList");
    navLinksList.classList.remove("NavLinks_list___active");
  }
};

function openNav() {
  var navLinksList = document.getElementById("navLinksList");
  if (navLinksList.classList.toggle("NavLinks_list___active")) {
    localStorage.setItem("navLinksListOpen", true);
  } else {
    localStorage.removeItem("navLinksListOpen");
  }
}
