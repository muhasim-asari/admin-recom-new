"use strict";

$(function () {
  let e;
  var r = "master-data-branch-manage-user-edit.html";

  var s = $(".datatables-users");
  var i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    e = s.DataTable({
      ajax: assetsPath + "json/list-manage-user.json",
      columns: [
        { data: "name" },
        { data: "email" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: false,
      columnDefs: [
        {
          targets: -1,
          title: "Actions",
          render: function (data, type, row, meta) {
            return (
              '<a href="' +
              r +
              '" class="me-2"><i class="mdi mdi-pencil-outline me-2"></i><span>Edit</span></a><a href="javascript:;" class="text-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmation"><i class="mdi mdi-delete-outline"></i><span>Delete</span></a></div>'
            );
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
          text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add User</span>',
          className: "add-new btn btn-primary",
          action: function () {
            window.location.href = "./master-data-branch-manage-user-add.html";
          },
        },
      ],
    });

    // Show Delete Confirmation
    $(".datatables-users tbody").on("click", ".delete-record", function () {

      var clickedRow = $(this).closest("tr");
      $("#deleteConfirmation").modal("show");

      $("#deleteConfirmation").data("clickedRow", clickedRow);
    });

    // Delete Data
    $("#deleteConfirmation").on("click", ".btn-confirm", function () {
      var clickedRow = $("#deleteConfirmation").data("clickedRow");
      
      var table = $(".datatables-users").DataTable();
      table.row(clickedRow).remove().draw();

      $("#deleteConfirmation").modal("hide");
    });
  }

  $(document).ready(function () {
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    $("#createUser, #updateUser").submit(function (event) {
      event.preventDefault();
      var username = $("#fullName").val();
      var password = $("#password").val();
      var rePassword = $("#retypePassword").val();

      if (username && password && rePassword) {
        toastr.success("Operasi berhasil", "Success!");
      } else {
        toastr.error("Operasi gagal", "Error!");
      }
    });
  });
});
