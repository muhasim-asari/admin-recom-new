"use strict";

$(function() {
  var s = $(".datatables-depreciation-view-items-commercial"),
    i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    s.DataTable({
      ajax: assetsPath + "json/list-depreciation-view-items-depreciation.json",
      columns: [
        { data: "period" },
        { data: "acquisition_cost" },
        { data: "depreciation_value" },
        { data: "net_book_value" },
        { data: "action" }
      ],
      bLengthChange: false,
      bInfo: false,
      columnDefs: [
        {
          target: 0,
          render: function(data, type, row, meta) {
            var monthYear = data.split(' ');
            var month = monthYear[0];
            var year = monthYear[1];

            var blueMonths = [
              "SEP 2023",
            ];
        
            // Daftar bulan yang akan diubah menjadi merah
            var redMonths = [
              "OKT 2023",
              "NOV 2023",
              "DES 2023",
              "JAN 2024",
              "FEB 2024",
              "MAR 2024",
              "APR 2024",
              "MAY 2024",
              "JUN 2024",
              "JUL 2024",
              "JUL 2024"
            ];
        
            if (redMonths.includes(data)) {
              return '<span class="text-danger">' + data + '</span>';
            }else if (blueMonths.includes(data)) {
              return '<span class="text-primary">' + data + '</span>';
            } else {
              return '<span>' + data + '</span>';
            }
          }
        },
        {
          target: 3,
          render: function(e, t, a, n) {
            return (
              '<span class="idr"> ' + a.net_book_value + '</span>'
            )
          }
        },
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function(e, t, a, n) {
            return (
              '<a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editDepreciationValue" class="me-2"><i class="mdi mdi-pencil-outline me-2"></i><span>Edit Value</span></a>'
            );
          }
        }
      ],
      order: [[3, "desc"]],
      dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-12"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0 gap-3"<"w-300px"f>B>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "Show _MENU_",
        search: "",
        searchPlaceholder: "Search period",
      },
      buttons: [
        {
          text: '<span class="d-none d-sm-inline-block">Recalculate Depreciation</span>',
          className: "add-new btn btn-danger",
          action: function () {
            window.location.href = "./asset-depreciation-view-items-depreciation-recalculate.html";
          },
        },
      ]
    });
  }
});

$(document).ready(function() {
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
    hideMethod: "fadeOut"
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

  $("#createdPoData, #updatePoData").submit(handleFormSubmit);
});
