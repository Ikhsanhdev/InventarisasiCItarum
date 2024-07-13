"use strict";
var dataTablePch;
var dataTablePda;
console.log("schema js");
var TabelSchema = (function () {
    var initData = function() {
        $('#length-station-table').change( function() { 
            dataTablePch.page.len( $(this).val() ).draw();
        });
    }
    var initDataTable = function () {
        dataTablePch = $("#PchCitarum-table").DataTable({
            processing: true,
            serverSide: true,
            dom: "tipr",
            order: [],
            ajax: {
                url: "/Schema/GetDataJaringanPch",
                type: "POST",
                dataType: "JSON",
            },
            columns: [
                { data: "nopos", name: "Nopos" },
                { data: "name", name: "Name" },
                { data: "ws", name: "Ws"},
                { data: "jenis", name: "Jenis" },
                { data: "das", name: "Das" },
                { data: "sungai", name: "Sungai" },
                { data: "desa", name: "Desa" },
                { data: "kec", name: "Kec" },
                { data: "kab", name: "Kab" },
                { data: "keterangan", name: "Keterangan" },
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
                url: '/data/datatable_locale_id.json',
                paginate: {
                    previous: "<i class='mdi mdi-chevron-left'>",
                    next: "<i class='mdi mdi-chevron-right'>"
                }
            },
            drawCallback: function () {
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
            }
        });
        dataTablePch.on('draw.dt', function () {
            var info = dataTablePch.page.info();
            dataTablePch.column(0, { search: 'applied', order: 'applied', page: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
        });
        
        dataTablePda = $("#PdaCitarum-table").DataTable({
            processing: true,
            serverSide: true,
            dom: "tipr",
            order: [],
            ajax: {
                url: "/Schema/GetDataJaringanPda",
                type: "POST",
                dataType: "JSON",
            },
            columns: [
                { data: "nopos", name: "Nopos" },
                { data: "name", name: "Name" },
                { data: "ws", name: "Ws"},
                { data: "jenis", name: "Jenis" },
                { data: "das", name: "Das" },
                { data: "sungai", name: "Sungai" },
                { data: "desa", name: "Desa" },
                { data: "kec", name: "Kec" },
                { data: "kab", name: "Kab" },
                { data: "keterangan", name: "Keterangan" },
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
                url: '/data/datatable_locale_id.json',
                paginate: {
                    previous: "<i class='mdi mdi-chevron-left'>",
                    next: "<i class='mdi mdi-chevron-right'>"
                }
            },
            drawCallback: function () {
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
            }
        });
        dataTablePda.on('draw.dt', function () {
            var info = dataTablePda.page.info();
            dataTablePda.column(0, { search: 'applied', order: 'applied', page: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
        });
    };
    return {
        //main function to initiate the module
        init: function () {
            initData();
            initDataTable();
        },
    };
})();

jQuery(document).ready(function () {
    TabelSchema.init();
});