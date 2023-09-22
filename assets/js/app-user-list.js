"use strict";
$(function () {
    let t, a;
    var e,
        s = $(".datatables-users"),
        i = $(".select2"),
        r = "master-data-company-manage-user-edit.html";
    i.length && (i = i).wrap('<div class="position-relative"></div>');
    s.length &&
        (e = s.DataTable({
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
                    searchable: !1,
                    orderable: !1,
                    render: function (e, t, a, n) {
                        return (
                            '<a href="' +
                            r +
                            '" class="me-2"><i class="mdi mdi-pencil-outline me-2"></i><span>Edit</span></a><a href="javascript:;" class="text-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmation"><i class="mdi mdi-delete-outline"></i><span>Delete</span></a></div>'
                        );
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
                    text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add User</span>',
                    className: "add-new btn btn-primary mx-3",
                    action: function () {
                        window.location.href = "./master-data-company-manage-user-add.html";
                    },
                },
            ],
            initComplete: function () {
                this.api()
                    .columns(3)
                    .every(function () {
                        var t = this,
                            a = $(
                                '<select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option></select>'
                            )
                                .appendTo(".user_role")
                                .on("change", function () {
                                    var e = $.fn.dataTable.util.escapeRegex($(this).val());
                                    t.search(e ? "^" + e + "$" : "", !0, !1).draw();
                                });
                        t.data()
                            .unique()
                            .sort()
                            .each(function (e, t) {
                                a.append('<option value="' + e + '">' + e + "</option>");
                            });
                    });
            },
        })),
        $(".datatables-users tbody").on("click", ".delete-record", function () {
            e.row($(this).parents("tr")).remove().draw();
        });
}),
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

        $("#createUser").submit(function (event) {
            event.preventDefault();
            var username = $("#fullName").val();
            var password = $("#password").val();
            var rePassword = $("#retypePassword").val();

            if (username && password && rePassword) {
                toastr.success("Berhasil Membuat User Baru", "Create Success!");
            } else {
                toastr.error("Gagal Membuat User Baru", "Create Error!");
            }
        });

        $("#updateUser").submit(function (event) {
            event.preventDefault();
            var username = $("#fullName").val();
            var password = $("#password").val();
            var rePassword = $("#retypePassword").val();

            if (username && password && rePassword) {
                toastr.success("Berhasil Memperbarui User", "Update Success!");
            } else {
                toastr.error("Gagal Memperbarui User", "Update Error!");
            }
        });

        $("#changePassword").submit(function (event) {
            event.preventDefault();
            var password = $("#password").val();
            var rePassword = $("#retypePassword").val();

            if (password && rePassword) {
                toastr.success(
                    "Berhasil Mengubah Password",
                    "Change Password Success!"
                );
            } else {
                toastr.error("Gagal Mengubah Password", "Change Password Error!");
            }
        });
    });
