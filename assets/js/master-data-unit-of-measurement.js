"use strict";
$(function () {
  var e,
    s = $(".datatables-master-unit-of-measurement"),
    i = $(".select2");
  i.length && (i = i).wrap('<div class="position-relative"></div>');
  s.length &&
    (e = s.DataTable({
      ajax: assetsPath + "json/list-unit-of-measurement.json",
      columns: [
        { data: "unit_of_measurement_name" },
        { data: "abbreviation" },
        { data: "status" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          target: 2,
          render: function ( data, type, row, meta ) {
            var getStatusColor = function (status) {
              switch (status) {
                case "Active":
                  return "text-primary";
                case "Inactive":
                  return "text-danger";
                default:
                  return "";
              }
            };

            return (
              "<span class='" + getStatusColor(row.status) + " fw-normal'>" + row.status + "</span>"
            )

          },
        },
        {
          targets: -1,
          title: "Actions",
          render: function (e, t, a, n) {
            return '<div class="d-flex gap-2"><a href="./master-data-unit-of-measurement-edit.html" class="text-primary"><i class="mdi mdi-pencil-outline me-1"></i><span>Edit</span></a><a href="javascript:;" class="text-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmation"><i class="mdi mdi-delete-outline me-1"></i><span>Delete</span></a>';
          },
        },
      ],
      order: [[2, "desc"]],
      dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0 gap-3"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "Show _MENU_",
        search: "",
        searchPlaceholder: "Search..",
      },
      buttons: [
        {
          extend: "collection",
          className: "btn btn-label-secondary dropdown-toggle",
          text: '<i class="mdi mdi-microsoft-excel me-1"></i> <span class="d-none d-sm-inline-block">Excel</span>',
          buttons: [
            {
              extend: "excel",
              text: '<i class="mdi mdi-export-variant me-1" ></i>Export Excel',
              className: "dropdown-item",
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
                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                $('row c[r^="D"]', sheet).attr('s', '2');
              },
            },
            {
              extend: "excel",
              text: '<i class="mdi mdi-import me-1" ></i>Import Excel',
              className: "dropdown-item",
              action: function (e, dt, button, config) {
                alert("Import Excel logic goes here");
              },
            },
          ],
        },
        {
          text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Unit Of Measurement</span>',
          className: "add-new btn btn-primary mx-3",
          action: function () {
            window.location.href = "./master-data-unit-of-measurement-add.html";
          },
        },
      ],
    })),
   // Show Delete Confirmation
   $(".datatables-master-unit-of-measurement tbody").on("click", ".delete-record", function () {

    var clickedRow = $(this).closest("tr");
    $("#deleteConfirmation").modal("show");

    $("#deleteConfirmation").data("clickedRow", clickedRow);
  });

  // Delete Data
  $("#deleteConfirmation").on("click", ".btn-confirm", function () {
    var clickedRow = $("#deleteConfirmation").data("clickedRow");
    
    var table = $(".datatables-master-unit-of-measurement").DataTable();
    table.row(clickedRow).remove().draw();

    $("#deleteConfirmation").modal("hide");
  });
}),
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
      var assetGroupName = $("#locationName").val();
      var description = $("#description").val();

      if (assetGroupName && description ) {
        toastr.success("Berhasil Membuat Location Baru", "Create Success!");
      } else {
        toastr.error("Gagal Membuat Location Baru", "Create Error!");
      }
    }

    $("#createLocation").submit(handleFormSubmit);
    $("#updateLocation").submit(handleFormSubmit);
  });