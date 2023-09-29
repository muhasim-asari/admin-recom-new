"use strict";

$(function () {
  // Memilih elemen-elemen yang diperlukan
  var selectpickerElements = $(".selectpicker");
  var select2Elements = $(".select2");
  var select2Icons = $(".select2-icons");

  // Fungsi untuk menghasilkan tampilan item Select2 dengan ikon jika tersedia
  function formatSelect2Item(item) {
    return item.id
      ? `<i class="${$(item.element).data("icon")} me-2"></i>${item.text}`
      : item.text;
  }

  // Inisialisasi Selectpicker jika ada elemen
  if (selectpickerElements.length) {
    selectpickerElements.selectpicker();
  }

  // Inisialisasi Select2
  if (select2Elements.length) {
    select2Elements.each(function () {
      var element = $(this);
      select2Focus(element);
      element.wrap('<div class="position-relative"></div>').select2({
        placeholder: "Select value",
        dropdownParent: element.parent(),
      });
    });
  }

  // Inisialisasi Select2 dengan ikon jika ada elemen
  if (select2Icons.length) {
    select2Focus(select2Icons);
    select2Icons.wrap('<div class="position-relative"></div>').select2({
      templateResult: formatSelect2Item,
      templateSelection: formatSelect2Item,
      escapeMarkup: function (markup) {
        return markup;
      },
    });
  }
});

(function () {
  const dropzoneTemplate = `<div class="dz-preview dz-file-preview w-100 m-0">
    <div class="dz-details">
      <div class="dz-thumbnail w-100" style="box-sizing: border-box;">
        <img data-dz-thumbnail>
        <span class="dz-nopreview">No preview</span>
        <div class="dz-success-mark"></div>
        <div class="dz-error-mark"></div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
        <div class="progress">
          <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
        </div>
      </div>
      <div class="dz-filename" data-dz-name></div>
      <div class="dz-size" data-dz-size></div>
    </div>
  </div>`;

  new Dropzone("#uploadImage", {
    previewTemplate: dropzoneTemplate,
    parallelUploads: 1,
    maxFilesize: 1,
    addRemoveLinks: true,
  });
})();

$(document).ready(function () {
  // Saat halaman selesai dimuat, sembunyikan po-number secara default
  $(".form-repeater").hide();
  $(".sub-sub-asset").hide();

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

(function () {
  var elements = document.querySelectorAll(
    "#assetReceiveDate, #assetUsedStartDate, #depreciationStartDate, #warrantyDate, #depreciationStartDate"
  );
  elements.forEach(function (element) {
    element.flatpickr({ monthSelectorType: "static" });
  });
})();

const assetTypeSelect = document.getElementById("assetType");
const singleItemDiv = document.getElementById("singleItem");
const setItemsDiv = document.getElementById("setItems");
const formSetItems = document.getElementById("formSetItems");

assetTypeSelect.addEventListener("change", function () {
  const selectedValue = assetTypeSelect.value;

  if (selectedValue === "Single Item") {
    singleItemDiv.style.display = "block";
    setItemsDiv.style.display = "none";
    formSetItems.style.display = "none";
  } else if (selectedValue === "Set Items") {
    singleItemDiv.style.display = "none";
    setItemsDiv.style.display = "block";
    formSetItems.style.display = "block";
  }
});

const locationNameSelect = document.getElementById("locationName");
const subLocationSelect = document.getElementById("formSubLocation");
const subSubLocationSelect = document.getElementById("formSubSubLocation");

subLocationSelect.style.display = "none";
subSubLocationSelect.style.display = "none";

locationNameSelect.addEventListener("change", function() {
  const selectedValue = locationNameSelect.value;

  if (selectedValue === "") {
    subLocationSelect.style.display = "none";
    subSubLocationSelect.style.display = "none";
  } else {
    subLocationSelect.style.display = "block";
  }
});

subLocationSelect.addEventListener("change", function() {
  const selectedValue = subLocationSelect.value;

  if (selectedValue === "") {
    subSubLocationSelect.style.display = "none";
  } else {
    subSubLocationSelect.style.display = "block";
  }
});

$("#poNumber").one("select2:open", function (e) {
  $("input.select2-search__field").prop("placeholder", "Search PO Number...");
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