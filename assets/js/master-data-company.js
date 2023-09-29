"use strict";
$(function () {
    var e,
        s = $(".datatables-master-company"),
        i = $(".select2");
    i.length && (i = i).wrap('<div class="position-relative"></div>');
    s.length &&
        (e = s.DataTable({
            ajax: assetsPath + "json/list-company.json",
            columns: [
                { data: "company_name" },
                { data: "group_name" },
                { data: "phone_number" },
                { data: "website" },
                { data: "action" },
            ],
            bLengthChange: false,
            bInfo: true,
            columnDefs: [
                {
                    targets: -1,
                    title: "Actions",
                    searchable: !1,
                    orderable: !1,
                    render: function (e, t, a, n) {
                        return '<a href="./master-data-company-manage-user.html" class="text-secondary me-2"><i class="mdi mdi-account-outline me-2"></i><span>Manage User</span></a><a href="./master-data-company-edit.html" class="text-primary"><i class="mdi mdi-pencil-outline me-1"></i><span>Edit</span></a><a href="javascript:;" class="text-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmation"><i class="mdi mdi-delete-outline"></i><span>Delete</span></a></div>';
                    },
                },
            ],
            order: [[2, "desc"]],
            dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            language: {
                sLengthMenu: "Show _MENU_",
                search: "",
                searchPlaceholder: "Search..",
            },
            buttons: [
                {
                    text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Company</span>',
                    className: "add-new btn btn-primary mx-3",
                    action: function () {
                        window.location.href = "./master-data-company-add.html";
                    },
                },
            ],
        })),
        // Show Delete Confirmation
   $(".datatables-master-company tbody").on("click", ".delete-record", function () {

    var clickedRow = $(this).closest("tr");
    $("#deleteConfirmation").modal("show");

    $("#deleteConfirmation").data("clickedRow", clickedRow);
  });

  // Delete Data
  $("#deleteConfirmation").on("click", ".btn-confirm", function () {
    var clickedRow = $("#deleteConfirmation").data("clickedRow");
    
    var table = $(".datatables-master-company").DataTable();
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
            var companyName = $("#companyName").val();
            var groupName = $("#groupName").val();
            var phoneNumber = $("#phoneNumber").val();
            var fax = $("#fax").val();
            var emailCompany = $("#emailCompany").val();
            var website = $("#website").val();
            var address = $("#address").val();

            if (
                companyName &&
                groupName &&
                phoneNumber &&
                fax &&
                emailCompany &&
                website &&
                address
            ) {
                toastr.success("Berhasil Membuat Company Baru", "Create Success!");
            } else {
                toastr.error("Gagal Membuat Company Baru", "Create Error!");
            }
        }

        $("#createCompany").submit(handleFormSubmit);
        $("#updateCompany").submit(handleFormSubmit);
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
