"use strict";

var dataTableForecast;

var dataForecast = (function() {
    var initInputForecast = function() {
        $(".parsley-validation").parsley();

        $("#search-forecast-table").keyup(function () {
            dataTableForecast.search($(this).val()).draw();
        });
        $("#length-forecast-table").change(function () {
            dataTableForecast.page.len($(this).val()).draw();
        });
    };

    var initDataTableForecast = function() {
        dataTableForecast = $("#table-forecast").DataTable({
            processing: true,
            serverSide: true,
            dom: "tipr",
            order: [[2, "asc"]],
            ajax: {
                url: "/Master/GetDataForecast",
                type: "POST",
                dataType: "JSON",
            },
            columns: [
                { data: null },
                {
                    data: "tanggal",
                    name: "Tanggal",
                    render: function (data) {
                        var date = formatDate(data, 'tanggal');
                        return date;
                    }
                },
                {
                    data: "ketersediaanMin",
                    name: "KetersediaanMin",
                    render: function (data) {
                        return data ? `<span class="ketersediaan-color fw-semibold text-center d-block">${parseFloat(data).toFixed(2)}</span>` : '<span class="text-center d-block">-</span>';
                    }
                },
                {
                    data: "ketersediaanMax",
                    name: "KetersediaanMax",
                    render: function (data) {
                        return data ? `<span class="ketersediaan-color fw-semibold text-center d-block">${parseFloat(data).toFixed(2)}</span>` : '<span class="text-center d-block">-</span>';
                    }
                },
                {
                    data: "ketersediaanAvg",
                    name: "KetersediaanAvg",
                    render: function (data) {
                        return data ? `<span class="ketersediaan-color fw-semibold text-center d-block">${parseFloat(data).toFixed(2)}</span>` : '<span class="text-center d-block">-</span>';
                    }
                },
                {
                    data: "updatedAt",
                    name: "UpdatedAt",
                    render: function (data) {
                        var date = formatDate(data, 'update');
                        return date;
                    }
                },
            ],
            columnDefs: [
                {
                  targets: 0,
                  searchable: false,
                  orderable: false,
                  width: "9%",
                  className: "text-center",
                },
                {
                  targets: -1,
                  searchable: false,
                  orderable: false,
                  width: "18%",
                  className: "text-center",
                },
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

        dataTableForecast.on("draw.dt", function () {
            var info = dataTableForecast.page.info();
            dataTableForecast
              .column(0, { search: "applied", order: "applied", page: "applied" })
              .nodes()
              .each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
        });
    };

    return {
        init: function () {
            initInputForecast();
            initDataTableForecast();
        },
    };
})();

jQuery(document).ready(function () {
    dataForecast.init();
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