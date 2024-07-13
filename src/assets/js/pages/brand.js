"use strict";

var dataTableBrand;

var DataBrand = function () {

    var initInput = function(){
        $('.parsley-validation').parsley();
        $('#search-station-table').keyup(function(){
            dataTableBrand.search($(this).val()).draw() ;
        });
        $('#length-station-table').change( function() {
            dataTableBrand.page.len( $(this).val() ).draw();
        });
    }

    var initDataTable = function () {

        dataTableBrand = $("#table-brand").DataTable({
            processing: true,
            serverSide: true,
            dom: 'tipr',
            "order": [[1, "asc"]],
            ajax: {
                url: "/Brand/GetdataTableBrand",
                type: "POST",
                contentType: "application/json",
                dataType: "JSON",
                data: function (d) {
                    return JSON.stringify(d);
                }
            },
            columns: [
                { data: null},
                { data: "name", name: "name" },
                { data: "api", name: "api" },
                { data: "timezone", name: "timezone" },
                {
                    render: function (data, type, row) {

                        return `<button type="button" class="btn btn-xs btn-success me-1" data-id="${row.id}" onclick="createEdit(this, event)"><i class="mdi mdi-square-edit-outline me-1"></i>Edit</button>
                         <button type="button" class="btn btn-xs btn-danger" data-id="${row.id}" onclick="deleteWq(this, event)"><i class="mdi mdi-delete me-1"></i>Delete</button>`;
                    }
                }
            ],
            columnDefs: [
                {
                    targets: 0,
                    searchable: false,
                    orderable: false,
                    width: '9%',
                    className: "text-center",
                },
                {
                    targets: 4,
                    render: function (data) {
                        if(data === null) {
                            return '';
                        } else {
                            return moment(data).format('DD-MMM-YYYY');
                        }
                    },
                },
                {
                    targets: -1,
                    searchable: false,
                    orderable: false,
                    width: '18%',
                    className: "text-center"
                },
            ],
            "language": {
                "paginate": {
                    "previous": "<i class='mdi mdi-chevron-left'>",
                    "next": "<i class='mdi mdi-chevron-right'>"
                }
            },
            "drawCallback": function () {
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
            }
        });

        dataTableBrand.on('draw.dt', function () {
            var info = dataTableBrand.page.info();
            dataTableBrand.column(0, { search: 'applied', order: 'applied', page: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
        });
    };

    return {
        //main function to initiate the module
        init: function () {
            initInput();
            initDataTable();
        },

    };

}();

jQuery(document).ready(function () {
    console.log("dari brand.js");
    DataBrand.init();
});