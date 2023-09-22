"use strict";

$(document).ready(function () {
  // When the page is loaded, hide certain elements by default
  $(".po-number").show();
  $(".form-repeater").hide();
  $(".sub-sub-asset").hide();

  // Add event listener for radio button changes
  $("input[name='poSelect']").change(function () {
    if ($("#available").is(":checked")) {
      $(".po-number").show();
    } else {
      $(".po-number").hide();
    }
  });

  $("#subSubAsset").change(function () {
    if ($(this).is(":checked")) {
      $(".sub-sub-asset").show();
    } else {
      $(".sub-sub-asset").hide();
    }
  });

  $("#assetType").change(function () {
    if ($(this).val() === "Set Items") {
      $(".form-repeater").show();
    } else {
      $(".form-repeater").hide();
    }
  });
});

// Initialize Flatpickr date pickers
(function () {
  var elements = document.querySelectorAll(
    "#assetReceiveDate, #assetUsedStartDate, #depreciationStartDate, #warrantyDate"
  );
  elements.forEach(function (element) {
    element.flatpickr({ monthSelectorType: "static" });
  });
})();

// Get DOM elements
const byAssetNameRadio = document.getElementById('byAssetName');
const byAssetCodeRadio = document.getElementById('byAssetCode');
const selectAssetName = document.getElementById('selectAssetName');
const selectAssetCode = document.getElementById('selectAssetCode');
const assetCodeForm = document.getElementById('assetCodeForm');
const assetNameForm = document.getElementById('assetNameForm');
const singleItemDiv = document.getElementById("singleItem");
const setItemsDiv = document.getElementById("setItems");
const assetTypeLabel = document.getElementById('valueAssetTypeReadOnly');

// Function to handle radio button changes
function handleRadioChange() {
  if (byAssetCodeRadio.checked) {
    selectAssetCode.style.display = 'block';
    assetCodeForm.style.display = 'none';
    selectAssetName.style.display = 'none';
    assetNameForm.style.display = 'flex';
    singleItemDiv.style.display = "none";
    setItemsDiv.style.display = "block";
    assetTypeLabel.textContent = 'Set Item';
  } else {
    selectAssetCode.style.display = 'none';
    assetCodeForm.style.display = 'flex';
    selectAssetName.style.display = 'block';
    assetNameForm.style.display = 'none';
    singleItemDiv.style.display = "block";
    setItemsDiv.style.display = "none";
    assetTypeLabel.textContent = 'Single Item';
  }
}

$('#assetName').one('select2:open', function(e) {
  $('input.select2-search__field').prop('placeholder', 'Search Asset Name...');
});

$('#assetCode').one('select2:open', function(e) {
  $('input.select2-search__field').prop('placeholder', 'Search Asset Code...');
});

const availableRadio = document.getElementById("available");
const notAvailableRadio = document.getElementById("notAvailable");
const poWarrantyForm = document.getElementById("poWarrantyForm");

function togglePoWarrantyForm() {
  if (availableRadio.checked) {
    poWarrantyForm.style.display = ""; // Show the form
  } else if (notAvailableRadio.checked) {
    poWarrantyForm.style.display = "none"; // Hide the form
  }
}

availableRadio.addEventListener("change", togglePoWarrantyForm);
notAvailableRadio.addEventListener("change", togglePoWarrantyForm);

togglePoWarrantyForm();