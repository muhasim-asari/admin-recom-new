"use strict";

$(function () {
  var s = $(".datatables-asset-registration"),
    i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    s.DataTable({
      ajax: assetsPath + "json/list-asset.json",
      columns: [
        { data: "asset_code" },
        { data: "asset_name" },
        { data: "asset_group" },
        { data: "quantity" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          target: 3,
          render: function (e, t, a, n) {
            return (
              '<span>' + a.required + ' / ' + a.quantity + '</span>'
            )
          }
        },
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function (e, t, a, n) {

            return '<a href="./asset-w-o-tags-setup-tag.html" class="text-primary"><i class="mdi mdi-line-scan me-1"></i> Set Up tag</a>';
          },
        },
      ],
      order: [[0, "asc"]],
      dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0 gap-3"<"w-300px"f>>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "Show _MENU_",
        search: "",
        searchPlaceholder: "Search asset code, asset name",
      },
      buttons: [
      ],
    });
  }

  // Show Delete Confirmation
  $(".datatables-asset-registration tbody").on("click", ".delete-record", function () {

    var clickedRow = $(this).closest("tr");
    $("#deleteConfirmation").modal("show");

    $("#deleteConfirmation").data("clickedRow", clickedRow);
  });

  // Delete Data
  $("#deleteConfirmation").on("click", ".btn-confirm", function () {
    var clickedRow = $("#deleteConfirmation").data("clickedRow");

    var table = $(".datatables-asset-registration").DataTable();
    table.row(clickedRow).remove().draw();

    $("#deleteConfirmation").modal("hide");
  });
});

$(document).ready(function () {
  toastr.options = {
    closeButton: true,
    debug: false,
    progressBar: true,
    positionClass: "toast-top-right",
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    var employeeName = $("#poNumber").val();

    if (employeeName) {
      toastr.success("Berhasil Membuat PO Data Baru", "Create Success!");
    } else {
      toastr.error("Gagal Membuat PO Data Baru", "Create Error!");
    }
  }

  $("#createdAssetRegistration, #updateAssetRegistration").submit(
    handleFormSubmit
  );
});