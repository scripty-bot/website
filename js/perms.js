function x() {
  const permSetTable = document.getElementById("perm_sets");
  const permSetButton = document.getElementById("perm_sets_btn");
  let permSetTableDisplay = permSetTable.style.display;
  let permSetButtonInnerText = permSetButton.innerText;

  function permDisplayToggle() {
    if (permSetTableDisplay === "none") {
      permSetTableDisplay = null;
      permSetButtonInnerText = "Click here to hide them";
    } else {
      permSetTableDisplay = "none";
      permSetButtonInnerText = "Click here to show them";
    }
  }

  permSetButton.addEventListener("click", permDisplayToggle);
};
x();
