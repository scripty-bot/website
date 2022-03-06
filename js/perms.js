function x() {
  const permSetTable = document.getElementById("perm_sets");
  const permSetTableDisplay = permSetTable.style.display;
  const permSetButton = document.getElementById("perm_sets_btn");
  const permSetButtonInnerText = permSetButton.innerText;

  function permDisplayToggle() {
    if (permSetTableDisplay === "none") {
      permSetTableDisplay = null;
      permSetButtonInnerText = "Click here to hide them";
    } else {
      permSetTableDisplay = "none";
      permSetButtonInnerText = "Click here to show them";
    }
  }

  permSetButton.addEventListener("click", permDisplayToggle)
};
x();
