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
                { data: "tanggal", name: "Tanggal" },
                { data: "ketersediaanMin", name: "ketersediaanMin" },
                { data: "ketersediaanMax", name: "ketersediaanMax" },
                { data: "ketersediaanAvg", name: "KetersediaanAvg" },
                { data: "updatedAt", name: "UpdatedAt" },
                // {
                //   className: "text-nowrap",
                //   render: function (data, type, row) {
                //     return `<button type="button" class="btn btn-xs btn-success me-1 rounded-2" data-id="${row.id}" onclick="createEditPetak(this, event)"><i class="mdi mdi-square-edit-outline me-1"></i>Edit</button>
                //                     <button type="button" class="btn btn-xs btn-danger rounded-2" data-id="${row.id}" onclick="deletePetak(this, event)"><i class="mdi mdi-delete me-1"></i>Delete</button>`;
                //   },
                // },
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