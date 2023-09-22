"use strict";

$(function () {
  var s = $(".datatables-asset-list-detail"),
    i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    s.DataTable({
      ajax: assetsPath + "json/list-asset-detail.json",
      columns: [
        { data: "item_number" },
        { data: "po_number" },
        { data: "serial_number" },
        { data: "pic" },
        { data: "acquisition_cost" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          target: 0,
          render: function (e, t, a, n) {
            return (
                '<a href="javascript:;" class="text-primary" data-bs-toggle="modal" data-bs-target="#popUpDetail"><span>'+ a.item_number + '</span></a>'
            )
          }
        },
        {
          target: 3,
          render: function (e, t, a, n) {
              return (
                  '<span>' + a.pic + '</span> <br> <a href="#" class="text-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-secondary" data-bs-original-title="tes"><span>'+ a.location + ' > ' + a.sublocation +' ...</span></a>'
              )
          }
        },    
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function (e, t, a, n) {
            return '<a href="./asset-list-edit-single-edit-item.html" class="text-primary"><i class="mdi mdi-pencil-outline me-1"></i><span>Edit Item</span></a>';
          },
        },
      ],
      order: [[2, "desc"]],
      dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "Show _MENU_",
        search: "",
        searchPlaceholder: "Search item number, PO Number",
      },
      buttons: [
      ],
    });
  }
});

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
    "#assetReceiveDate, #assetUsedStartDate, #depreciationStartDate, #warrantyDate"
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

$("#poNumber").one("select2:open", function (e) {
  $("input.select2-search__field").prop("placeholder", "Search PO Number...");
});

(function () {
  var elements = document.querySelectorAll(
    "#assetReceiveDate, #assetUsedStartDate, #depreciationStartDate, #warrantyDate"
  );
  elements.forEach(function (element) {
    element.flatpickr({ monthSelectorType: "static" });
  });
})();