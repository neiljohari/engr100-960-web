function openNav() {
  document
    .getElementById("navLinksList")
    .classList.toggle("NavLinks_list___active")
    ? localStorage.setItem("navLinksListOpen", !0)
    : localStorage.removeItem("navLinksListOpen");
}
window.onload = function () {
  localStorage.getItem("navLinksListOpen")
    ? document
        .getElementById("navLinksList")
        .classList.add("NavLinks_list___active")
    : document
        .getElementById("navLinksList")
        .classList.remove("NavLinks_list___active");
};
