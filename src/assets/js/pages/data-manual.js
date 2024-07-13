"use strict";

var datatableAwlr;
var datatableArr;

var DataManual = (function () {
  var initInput = function () {
    $(".parsley-validation").parsley();
    $("#search-awlr-table").keyup(function () {
      datatableAwlr.search($(this).val()).draw();
    });
    $("#length-awlr-table").change(function () {
      datatableAwlr.page.len($(this).val()).draw();
    });

    $("#search-arr-table").keyup(function () {
      datatableArr.search($(this).val()).draw();
    });
    $("#length-arr-table").change(function () {
      datatableArr.page.len($(this).val()).draw();
    });
  };

  var initDataTable = function () {
    datatableAwlr = $("#table-awlr").DataTable({
      processing: true,
      serverSide: true,
      dom: "tipr",
      order: [[1, "asc"]],
      ajax: {
        url: "/DataManual/GetDatatableAwlrStation",
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: function (d) {
          return JSON.stringify(d);
        },
      },
      columns: [
        { data: null },
        { data: "name", name: "name", sClass: "fw-semibold" },
        { data: "observerName", name: "observerName" },
        {
          sClass: "text-center fw-bold",
          render: function (data, type, row) {
            if (row.lastReadingAwlr != null) {
              return row.lastReadingAwlr.waterLevel;
            } else {
              return "";
            }
          },
        },
        {
          data: "LastReadingAwlr.ReadingAt",
          sClass: "text-center",
          render: function (data, type, row) {
            if (row.lastReadingAwlr != null) {
              return `${moment(row.lastReadingAwlr.readingAt).format(
                "DD-MMM-YYYY"
              )} <small class="text-muted">${moment(
                row.lastReadingAwlr.readingAt
              ).format("HH:mm")}</small>`;
            } else {
              return "";
            }
          },
        },
        {
          render: function (data, type, row) {
            return `<a type="button" class="btn btn-xs btn-info" href="/DataManual/Detail/${row.id}"><i class="mdi mdi-database me-1"></i> Lihat Data</a>`;
          },
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

    datatableAwlr.on("draw.dt", function () {
      var info = datatableAwlr.page.info();
      datatableAwlr
        .column(0, { search: "applied", order: "applied", page: "applied" })
        .nodes()
        .each(function (cell, i) {
          cell.innerHTML = i + 1 + info.start;
        });
    });

    datatableArr = $("#table-arr").DataTable({
      processing: true,
      serverSide: true,
      dom: "tipr",
      order: [[1, "asc"]],
      ajax: {
        url: "/DataManual/GetDatatableArrStation",
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: function (d) {
          return JSON.stringify(d);
        },
      },
      columns: [
        { data: null },
        { data: "name", name: "name", sClass: "fw-semibold" },
        { data: "observerName", name: "observerName" },
        {
          sClass: "text-center fw-bold",
          render: function (data, type, row) {
            if (row.lastReadingArr != null) {
              return row.lastReadingArr.rainfall;
            } else {
              return "";
            }
          },
        },
        {
          sClass: "text-center",
          render: function (data, type, row) {
            if (row.lastReadingArr != null) {
              return `${row.lastReadingArr.readingDate} <small class="text-muted">${row.lastReadingArr.readingHour}</small>`;
            } else {
              return "";
            }
          },
        },
        {
          render: function (data, type, row) {
            return `<a type="button" class="btn btn-xs btn-info" href="/DataManual/Detail/${row.id}"><i class="mdi mdi-database me-1"></i> Lihat Data</a>`;
          },
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
          targets: 4,
          orderable: false,
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

    datatableArr.on("draw.dt", function () {
      var info = datatableArr.page.info();
      datatableArr
        .column(0, { search: "applied", order: "applied", page: "applied" })
        .nodes()
        .each(function (cell, i) {
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
})();

jQuery(document).ready(function () {
  DataManual.init();
});
