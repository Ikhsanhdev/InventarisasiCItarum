"use strict";

var dataTableRekomendasi;

var dataRekomendasi = (function() {
    var initInput = function() {
        $(".parsley-validation").parsley();

        $("#search-ai-table").keyup(function () {
            dataTableRekomendasi.search($(this).val()).draw();
        });
        $("#length-ai-table").change(function () {
            dataTableRekomendasi.page.len($(this).val()).draw();
        });
    };

    var filterDataByDate = function(date) {
        if (dataTableRekomendasi) {
            dataTableRekomendasi.ajax.url("/Master/GetDataRekomendasi?date=" + date).load();
        } else {
            console.error("dataTableRekomendasi is not initialized.");
        }
    };

    var initDataTable = function() {
        dataTableRekomendasi = $("#table-ai").DataTable({
            processing: true,
            serverSide: true,
            dom: "tipr",
            order: [[2, "asc"]],
            ajax: {
                url: "/Master/GetDataRekomendasi",
                type: "POST",
                dataType: "JSON",
                data: function(d) {
                    d.date = $("#filter-date").val();
                }
            },
            columns: [
                { data: null },
                { data: "tanggal", name: "Tanggal" },
                { data: "namaPetak", name: "NamaPetak" },
                { data: "luas", name: "Luas" },
                { data: "debitRekomendasi", name: "DebitRekomendasi" },
                { data: "location", name: "Location" },
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

        dataTableRekomendasi.on("draw.dt", function () {
            var info = dataTableRekomendasi.page.info();
            dataTableRekomendasi
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
    dataRekomendasi.init();
});