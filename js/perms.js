function x() {
  const permSetTable = document.getElementById("perm_sets");
  const permSetButton = document.getElementById("perm_sets_btn");
  let permSetTableDisplay = permSetTable.style.display;
  let permSetButtonInnerText = permSetButton.innerText;

  function permDisplayToggle() {
    let permSetButtonInnerTextUpdate = "Click here to show them";
    let permSetTableDisplayUpdate = "none";
    if (permSetTable.style.display === "none") {
      permSetTableDisplayUpdate = null;
      permSetButtonInnerTextUpdate.replace(/show/i, "hide");
    }
    permSetTable.style.display = permSetTableDisplayUpdate;
    permSetButton.innerText = permSetButtonInnerTextUpdate;
  }

  permSetButton.addEventListener("click", permDisplayToggle);
};
x();
