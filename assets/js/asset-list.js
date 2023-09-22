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
        { data: "created_date" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          responsivePriority: 2,
          targets: 0,
          render: function (e, t, row, n) {
	          var link = function (asset_code) {
              if (asset_code === "11-22-33-44-55-66-123-02") {
                return '<a href="./asset-list-detail-set.html">';
              }else{
                return '<a href="./asset-list-detail-single.html">';
              }
            };
            var iconHtml =
              row.id === 4
                ? '<div class="d-flex gap-1"><span class="badge rounded-pill wo-color text-dark" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="tooltip-danger" data-bs-original-title="W/O Tags">W/O Tags</span><span class="badge rounded-pill text-dark depreciation-color">Depreciation N/A</span></div>'
                : "";
            return (
              '<div class="d-flex gap-1 flex-column">' + link(row.asset_code) +
              row.asset_code +
              "</a>" +
              iconHtml + '</div>'
            );
          },
        },
        {
          target: 4,
          render: function (e, t, a, n) {
            return (
              '<span>' + a.created_by + '<br />' + a.created_date + '</span>'
            )
          }
        },
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function (e, t, a, n) {
            var link = function (asset_code) {
              if (a.asset_code === "11-22-33-44-55-66-123-02") {
                return '<a href="./asset-list-edit-set.html" class="text-primary">';
              } else {
                return '<a href="./asset-list-edit-single.html" class="text-primary">';
              }
            };
        
            var actionHtml = '<div class="d-flex gap-2">' + link(e) + '<i class="mdi mdi-pencil-outline me-1"></i><span>Edit</span></a><a href="javascript:;" class="text-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmation"><i class="mdi mdi-delete-outline me-1"></i><span>Delete</span></a>';
        
            return actionHtml;
          },
        },
      ],
      order: [[0, "asc"]],
      dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0 gap-3"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "Show _MENU_",
        search: "",
        searchPlaceholder: "Search asset code, asset name",
      },
      buttons: [
        {
          extend: "excel",
          text: '<i class="mdi mdi-export-variant me-1"></i>Export Excel',
          className: "btn btn-label-secondary",
          exportOptions: {
            columns: [1, 2, 3, 4, 5],
            format: {
              body: function (data, row, column, node) {
                var text = node.textContent || node.innerText;
                if (node.classList && node.classList.contains("user-name")) {
                  return node.lastChild.firstChild.textContent;
                } else {
                  return text;
                }
              },
            },
          },
          customize: function (xlsx) {
            var sheet = xlsx.xl.worksheets["sheet1.xml"];
            $('row c[r^="D"]', sheet).attr("s", "2");
          },
        },
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
