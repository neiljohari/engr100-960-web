function staffSearch() {
  let search = document.getElementById("staffSearch").value.toUpperCase();

  function filter(el) {
    if (
      el.innerHTML
        .replace(/(<([^>]+)>)/gi, " ") // strip html tags
        .toUpperCase()
        .indexOf(search) > -1
    ) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  }

  Array.from(document.getElementById("faculty").children).forEach((el) =>
    filter(el)
  );

  Array.from(document.getElementById("ias").children).forEach((el) =>
    filter(el)
  );
}
