"use strict";
$(function () {
  var e,
    s = $(".datatables-master-group"),
    i = $(".select2");
  i.length && (i = i).wrap('<div class="position-relative"></div>');
  s.length &&
    (e = s.DataTable({
      ajax: assetsPath + "json/list-group.json",
      columns: [
        { data: "group_name" },
        { data: "website" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          targets: -1,
          title: "Actions",
          render: function (e, t, a, n) {
            return '<div class="d-flex gap-2"><a href="./master-data-group-edit.html" class="text-primary"><i class="mdi mdi-pencil-outline me-1"></i><span>Edit</span></a><a href="javascript:;" class="text-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmation"><i class="mdi mdi-delete-outline me-1"></i><span>Delete</span></a>';
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
          text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Group</span>',
          className: "add-new btn btn-primary",
          action: function () {
            window.location.href = "./master-data-group-add.html";
          },
        },
      ],
    })),
    // Show Delete Confirmation
    $(".datatables-master-group tbody").on(
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

    var table = $(".datatables-master-group").DataTable();
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

("use strict");
!(function () {
  var a = `<div class="dz-preview dz-file-preview">
  <div class="dz-details">
    <div class="dz-thumbnail">
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
  new Dropzone("#logo", {
    previewTemplate: a,
    parallelUploads: 1,
    maxFilesize: 5,
    addRemoveLinks: !0,
    maxFiles: 1,
  });
})();
