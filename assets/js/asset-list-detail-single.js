"use strict";

$(function () {
    var s = $(".datatables-asset-list-detail"),
        i = $(".select2");

    if (i.length) {
        i.wrap('<div class="position-relative"></div>');
    }

    if (s.length) {
        s.DataTable({
            ajax: assetsPath + "json/list-asset-detail.json",
            columns: [
                { data: "item_number" },
                { data: "po_number" },
                { data: "serial_number" },
                { data: "pic" },
                { data: "tag" },
                { data: "action" }
            ],
            bLengthChange: false,
            bInfo: true,
            columnDefs: [
                {
                    target: 3,
                    render: function (e, t, a, n) {
                        return (
                            '<span>' + a.pic + '</span> <br> <a href="#" class="text-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-secondary" title="Gedung A > Lantai 2 > Ruang C"><span>'+ a.location + ' > ' + a.sublocation +' ...</span></a>'
                        )
                    }
                },
                {
                    targets: -1,
                    title: "Actions",
                    searchable: false,
                    orderable: false,
                    render: function (e, t, a, n) {
                        return '<a href="./asset-list-detail-single-item-print.html" class="text-primary"><i class="mdi mdi-printer-outline me-1"></i><span>Print Tag</span></a>';
                    }
                }
            ],
            order: [[2, "desc"]],
            dom:
                '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            language: {
                sLengthMenu: "Show _MENU_",
                search: "",
                searchPlaceholder: "Search item number, tag"
            },
            buttons: [
                {
                    text: '<span class="d-none d-sm-inline-block">Add Item Number</span>',
                    className: "add-new btn btn-primary mx-3",
                    action: function () {
                        window.location.href = "./asset-list-detail-add-asset-number-single-item.html";
                    },
                },
            ]
        });
    }

    $(".datatables-po-data tbody").on(
        "click",
        ".delete-record",
        function () {
            s.DataTable()
                .row($(this).parents("tr"))
                .remove()
                .draw();
        }
    );
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
