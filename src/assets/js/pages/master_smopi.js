"use strict";

var dataTableSmopi;

var dataSmopi = (function() {
    var initInput = function() {
        $(".parsley-validation").parsley();

        $("#search-ai-table").keyup(function () {
            dataTableSmopi.search($(this).val()).draw();
        });
        $("#length-ai-table").change(function () {
            dataTableSmopi.page.len($(this).val()).draw();
        });
    };

    var filterDataByDate = function(date) {
        if (dataTableSmopi) {
            dataTableSmopi.ajax.url("/Master/GetMasterDataSmopi?date=" + date).load();
        } else {
            console.error("dataTableSmopi is not initialized.");
        }
    };

    var initDataTable = function() {
        dataTableSmopi = $("#table-petak").DataTable({
            processing: true,
            serverSide: true,
            dom: "tipr",
            order: [[2, "asc"]],
            ajax: {
                url: "/Master/GetMasterDataSmopi",
                type: "POST",
                dataType: "JSON",
                data: function(d) {
                    d.date = $("#filter-date").val();
                }
            },
            columns: [
                { data: null },
                { data: "nama_petak", name: "nama_petak", className: "text-center" },
                { data: "jenis_bangunan", name: "jenis_bangunan", className: "text-center" },
                { data: "luas", name: "luas", className: "text-center"},
                { data: "kebutuhan", name: "kebutuhan", className: "text-center" },
                { data: "periode", name: "periode", className: "text-center" },
                { data: "bulan", name: "bulan", className: "text-center" },
                { data: "tahun", name: "tahun", className: "text-center" },
            ],
            columnDefs: [
                {
                  targets: 0,
                  searchable: false,
                  orderable: false,
                  width: "9%",
                  className: "text-center",
                }
            ],
            language: {
                paginate: {
                  previous: "<i class='mdi mdi-chevron-left'>",
                  next: "<i class='mdi mdi-chevron-right'>",
                },
            },
            drawCallback: function () {
                $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
            },
        });

        dataTableSmopi.on("draw.dt", function () {
            var info = dataTableSmopi.page.info();
            dataTableSmopi
              .column(0, { search: "applied", order: "applied", page: "applied" })
              .nodes()
              .each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
        });

        var today = new Date().toISOString().split('T')[0];
        $("#filter-date").val(today);
        filterDataByDate(today);
    };

    var initDateNavigation = function() {
        var currentDate = new Date($("#filter-date").val());

        function updateDateDisplay(date) {
            var formattedDate = date.toISOString().split('T')[0];
            $("#filter-date").val(formattedDate);
            filterDataByDate(formattedDate);
        }

        $("#btn-prev").click(function () {
            currentDate.setDate(currentDate.getDate() - 1); // Move date 1 day back
            updateDateDisplay(currentDate);
        });

        $("#btn-next").click(function () {
            currentDate.setDate(currentDate.getDate() + 1); // Move date 1 day forward
            updateDateDisplay(currentDate);
        });

        // Initial date setup
        updateDateDisplay(currentDate);
    };

    return {
        init: function () {
            initInput();
            initDataTable();
            initDateNavigation(); 
        },
    };
})();   

jQuery(document).ready(function () {
    dataSmopi.init();
});

function formatDate(dateString, type) {
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Parse the input date string
    const date = new Date(dateString);

    // Extract day, month, year, hour, and minute
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    // Format the date as "dd MMMM yyyy HH:mm"
    if (type === 'tanggal') {
        return `${day} ${month} ${year}`;
    } else if (type === 'update') {
        return `${day} ${month} ${year} ${hour}:${minute}`;
    }
}