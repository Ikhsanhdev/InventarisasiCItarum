"use strict";

var dataTableReport;
let periode;
let TYPE = "AWLR";
var DataReport = (function () {
  var initInput = function () {
    $("#periode")
      .datepicker({
        format: "MM yyyy", // Set the date format to display only the month and year
        startView: "months", // Set the default view to months
        minViewMode: "months", // Set the minimum view mode to months
        beforeShowMonth: function (date) {
          // Disable months beyond the current month
          return date.valueOf() <= new Date().valueOf();
        },
        autoclose: true,
        altFormat: "yyyy-mm",
        altField: "#get-periode",
      })
      .on("changeDate", function (e) {
        // Format the actual value as yyyy-mm
        var formattedDate =
          e.date.getFullYear() +
          "-" +
          ("0" + (e.date.getMonth() + 1)).slice(-2);
        // Set the actual value to a hidden input
        $("#get-periode").val(formattedDate);
      });
    // Set the default date to the current month
    $("#periode").datepicker("setDate", new Date());

    $("#search-station-table").keyup(function () {
      dataTableReport.search($(this).val()).draw();
    });
    $("#length-station-table").change(function () {
      dataTableReport.page.len($(this).val()).draw();
    });

    $("#type").selectize();
  };

  var initDataTable = function () {
    dataTableReport = $("#table-report").DataTable({
      processing: true,
      serverSide: true,
      paging: false,
      dom: "rti",
      order: [[2, "asc"]],
      ajax: {
        url: "/Report/GetdataTableReport?type=" + TYPE,
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: function (d) {
          return JSON.stringify(d);
        },
      },
      columns: [
        { data: null },
        { data: "name", name: "name" },
        {
          data: "type",
          name: "type",
          render: function (data, type, row) {
            if (data == "ARR") {
              return "POS CURAH HUJAN";
            } else {
              return "POS DUGA AIR";
            }
          },
        },
        {
          render: function (data, type, row) {
            if (row.type == "AWLR") {
              return `<button onclick="downloadData(this,event);" type="button" class="btn btn-xs btn-blue me-1" data-id="${row.id}" data-type="${row.type}"><i class="fe-download me-1"></i> Download</button>`;
            } else {
              return `<button onclick="downloadData(this,event);" type="button" class="btn btn-xs btn-success me-1" data-id="${row.id}" data-type="${row.type}"><i class="fe-download me-1"></i> Download</button>`;
            }
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

    dataTableReport.on("draw.dt", function () {
      var info = dataTableReport.page.info();
      dataTableReport
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
  DataReport.init();
  $("#periode").trigger("change");
  $("#type").selectize();
});

$("#periode").on("change", function () {
  periode = $("#get-periode").val();
});

$("#type").on("change", function () {
  dataTableReport.destroy();
  TYPE = $(this).val();
  DataReport.init();
  dataTableReport.ajax.reload();
});

function downloadData(input, evt) {
  evt.preventDefault();
  periode = $("#get-periode").val();
  const stationId = $(input).data("id");
  const type = $(input).data("type");
  const url = `/Report/DownloadData?stationid=${stationId}&type=${type}&periode=${periode}`;
  window.open(url, "_blank");
}

function searchData(input, event) {
  event.preventDefault();
  console.log($("#search-report-table").val());
  dataTableReport.ajax.reload();
}
