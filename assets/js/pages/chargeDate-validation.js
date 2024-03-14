function validateCheckbox() {
    var checkboxes = document.getElementsByName("chargeDate-btn");
    var isChecked = false;

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        isChecked = true;
        break;
      }
    }

    if (isChecked) {
      // At least one checkbox is checked, reset styles and hide error message
      document.getElementById("model-err").classList.remove("error-border");
      document.getElementById("errorText").style.display = "none";
    } else {
      // No checkbox is checked, set border style and show error message
      document.getElementById("model-err").classList.add("error-border");
      document.getElementById("errorText").style.display = "block";
    }
}