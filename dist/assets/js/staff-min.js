function staffSearch() {
  let e = document.getElementById("staffSearch").value.toUpperCase();
  function t(t) {
    t.innerHTML
      .replace(/(<([^>]+)>)/gi, " ")
      .toUpperCase()
      .indexOf(e) > -1
      ? (t.style.display = "")
      : (t.style.display = "none");
  }
  Array.from(document.getElementById("faculty").children).forEach((e) => t(e)),
    Array.from(document.getElementById("ias").children).forEach((e) => t(e));
}
