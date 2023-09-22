"use strict";

$(function() {
  var s = $(".datatables-depreciation-view-items"),
    i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    s.DataTable({
      ajax: assetsPath + "json/list-depreciation-view-items.json",
      columns: [
        { data: "item_number" },
        { data: "acquisition_cost_usd" },
        { data: "net_book_value_usd" },
        { data: "depreciation_start_date" },
        { data: "action" }
      ],
      bLengthChange: false,
      bInfo: false,
      columnDefs: [
        {
          target: 1,
          render: function(e, t, a, n) {
            return (
              '<span class="d-flex gap-1">'+ a.acquisition_cost_usd + '<p class="text-danger mb-0">|</p>' + a.acquisition_cost_idr + '</span>'
            )
          }
        },
        {
          target: 2,
          render: function(e, t, a, n) {
            return (
              '<div>' + 
                '<span class="d-flex gap-1">'+ a.net_book_value_usd + '<p class="text-danger mb-0">|</p>' + a.net_book_value_idr + '</span>' +
                '<span class="d-flex gap-1 text-primary">'+ a.net_book_value_usd + '<p class="text-danger mb-0">|</p>' + a.net_book_value_idr + '</span>'
              + '</div>'
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
              '<a href="./asset-depreciation-view-items-depreciation.html" class="me-2"><i class="mdi mdi-chart-bell-curve me-2"></i><span>View Depreciation</span></a>'
            );
          }
        }
      ],
      order: [[0, "desc"]],
      // dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-12"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0 gap-3"<"w-300px"f>>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"<"w-300px"f>>><"table-responsive"t><"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "Show _MENU_",
        search: "",
        searchPlaceholder: "Search item number, po number",
        className: 'w-50',
      },
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
