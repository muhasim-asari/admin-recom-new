"use strict";

$(function () {
    var s = $(".datatables-asset-depreciation-n-a"),
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
                { data: "action" }
            ],
            bLengthChange: false,
            bInfo: true,
            columnDefs: [
                // {
                //     responsivePriority: 2,
                //     targets: 0,
                //     render: function (e, t, a, n) {
                //         return '<a href="./admin-management-asset-list-detail-update.html">' + a.asset_code + '</a>';
                //     }
                // },
                {
                    responsivePriority: 2,
                    targets: 0,
                    render: function (e, t, row, n) {
                        var link = function (asset_code) {
                            if (asset_code === "11-22-33-44-55-66-123-02") {
                                return '<a href="../asset-list/asset-list-detail-set.html">';
                            } else {
                                return '<a href="../asset-list/asset-list-detail-single.html">';
                            }
                        };
                        var iconHtml =
                            row.id === 1
                                ? '<div class="d-flex gap-1"><span class="badge rounded-pill text-dark depreciation-color">Depreciation N/A</span></div>'
                                : "";
                        var iconHtml2 =
                            row.id === 2
                                ? '<div class="d-flex gap-1"><span class="badge rounded-pill text-dark depreciation-color">Depreciation N/A</span></div>'
                                : "";
                        return (
                            '<div class="d-flex gap-1 flex-column">' + link(row.asset_code) +
                            row.asset_code +
                            "</a>" +
                            iconHtml + 
                            iconHtml2 + '</div>'
                        );
                    },
                },
                {
                    targets: -1,
                    title: "Actions",
                    searchable: false,
                    orderable: false,
                    render: function (e, t, row, n) {
                        var link = function (asset_code) {
                            if (asset_code === "11-22-33-44-55-66-123-01") {
                                return '<a href="./asset-depreciation-setup.html" class="text-secondary"><i class="mdi mdi-application-cog-outline me-1"></i><span>Setup Depreciation</span></a>';
                            } else if (asset_code === "11-22-33-44-55-66-123-02") {
                                return '<a href="./asset-depreciation-setup.html" class="text-secondary"><i class="mdi mdi-application-cog-outline me-1"></i><span>Setup Depreciation</span></a>';
                            } else {
                                return '<a href="./asset-depreciation-view-items.html" class="text-primary"><i class="mdi mdi-newspaper-variant-outline me-2"></i><span>View Items</span></a>';

                            }
                        };

                        return link(row.asset_code);

                    }
                }
            ]
        });
    }
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

    $("#createdAssetRegistration, #updateAssetRegistration").submit(handleFormSubmit);
});

