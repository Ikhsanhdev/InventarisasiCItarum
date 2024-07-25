"use strict";

var dataTableHistory;

var dataHistory = (function() {
    var initInput = function() {
        $(".parsley-validation").parsley();
        $("#search-history-table").keyup(function () {
            dataTableHistory.search($(this).val()).draw();
        });
        $("#length-history-table").change(function () {
            dataTableHistory.page.len($(this).val()).draw();
        });
    };

    var initDataTable = function() {
        dataTableHistory = $("#table-history").DataTable({
            processing: true,
            serverSide: true,
            dom: "tipr",
            order: [[2, "asc"]],
            ajax: {
                url: "/DebitBendung/GetDataAll",
                type: "POST",
                dataType: "JSON"
            },
            columns: [
                { data: null },
                { data: "tanggal", name: "Tanggal" },
                { 
                    data: "ketersediaanMin",
                    name: "KetersediaanMin",
                    render: function (data) {
                        return data ? `<span class="ketersediaan-color fw-semibold">${parseFloat(data).toFixed(2)}</span>` : '-';
                    }
                },
                { 
                    data: "ketersediaanMax",
                    name: "KetersediaanMax",
                    render: function (data) {
                        return data ? `<span class="ketersediaan-color fw-semibold">${parseFloat(data).toFixed(2)}</span>` : '-';
                    }
                },
                { 
                    data: "ketersediaanAvg",
                    name: "KetersediaanAvg",
                    render: function (data) {
                        return data ? `<span class="ketersediaan-color fw-semibold">${parseFloat(data).toFixed(2)}</span>` : '-';
                    }
                },
                { 
                    data: "kebutuhan",
                    name: "Kebutuhan",
                    render: function (data) {
                        return data ? `<span class="kebutuhan-color fw-semibold">${parseFloat(data).toFixed(2)}</span>` : '-';
                    }
                },
                { 
                    data: null,
                    render: function (data, type, row) {
                        const percent_avg_kebutuhan = row.ketersediaanAvg && row.kebutuhan ? (row.ketersediaanAvg / row.kebutuhan) * 100 : 0;
                        const status_percent = percent_avg_kebutuhan >= 100 ? 'text-success' : 'text-warning';
                        return `<span class="${status_percent} fw-semibold">${percent_avg_kebutuhan.toFixed(2)}%</span>`;
                    }
                }
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
                    targets: 1,
                    render: function (data) {
                      if (data === null) {
                        return "";
                      } else {
                        return (
                            moment(data).locale('id').format("D MMMM YYYY") +
                          ' <small class="text-muted">'
                        );
                      }
                    },
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

        dataTableHistory.on("draw.dt", function () {
            var info = dataTableHistory.page.info();
            dataTableHistory
              .column(0, { search: "applied", order: "applied", page: "applied" })
              .nodes()
              .each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
        });
    };

    return {
        init: function () {
            initInput();
            initDataTable();
        },
    };
})();

jQuery(document).ready(function () {
    dataHistory.init();
});