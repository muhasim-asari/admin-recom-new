"use strict";
$(function () {
  var e,
    s = $(".datatables-maintenance-group")
  s.length &&
    (e = s.DataTable({
      ajax: assetsPath + "json/list-maintenance-group.json",
      columns: [
        { data: "code" },
        { data: "maintenance_group_name" },
        { data: "period" },
        { data: "description" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          targets: -1,
          title: "Actions",
          render: function (e, t, a, n) {
            return '<div class="d-flex gap-2"><a href="./maintenance-group-edit.html" class="text-primary"><i class="mdi mdi-pencil-outline me-1"></i><span>Edit</span></a><a href="javascript:;" class="text-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmation"><i class="mdi mdi-delete-outline me-1"></i><span>Delete</span></a>';
          },
        },
      ],
      order: [[2, "desc"]],
      dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0 gap-3"<"w-300px"f>B>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "Show _MENU_",
        search: "",
        searchPlaceholder: "Search maintenance group name..",
      },
      buttons: [
        {
          text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Maintenance Group</span>',
          className: "add-new btn btn-primary",
          action: function () {
            window.location.href = "./maintenance-group-add.html";
          },
        },
      ],
    })),
    // Show Delete Confirmation
    $(".datatables-maintenance-group tbody").on(
      "click",
      ".delete-record",
      function () {
        var clickedRow = $(this).closest("tr");
        $("#deleteConfirmation").modal("show");

        $("#deleteConfirmation").data("clickedRow", clickedRow);
      }
    );

  // Delete Data
  $("#deleteConfirmation").on("click", ".btn-confirm", function () {
    var clickedRow = $("#deleteConfirmation").data("clickedRow");

    var table = $(".datatables-maintenance-group").DataTable();
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
      var groupName = $("#groupName").val();
      var website = $("#website").val();
      var groupLogo = $("#groupLogo").val();

      if (groupName && website) {
        toastr.success("Berhasil Membuat Group Baru", "Create Success!");
      } else {
        toastr.error("Gagal Membuat Group Baru", "Create Error!");
      }
    }

    $("#createGroup").submit(handleFormSubmit);
    $("#updateGroup").submit(handleFormSubmit);
  });
