"use strict";

var dataTableReport;
let periode;
let TYPE = "AWLR";
let posName = {
  AWLR: "POS DUGA AIR",
  ARR: "POS CURAH HUJAN",
  AWS: "POS KLIMATOLOGI",
  WQMS: "POS KUALITAS AIR",
  AWLR_ARR: "POS DUGA AIR & CURAH HUJAN",
  "V-Notch": "Pos V-Notch Weir",
};

function generateDownloadButton(stationId, stationType) {
  let buttonDownload = `<div class="button-list d-flex">
                           <button onclick="downloadData(this,event);" type="button" class="btn btn-success waves-effect waves-light btn-sm" data-id="${stationId}" data-type="${stationType}" data-file="excel"><i class="fe-download me-1"></i> Excel</button>
                            <button onclick="downloadData(this,event);"  type="button" class="btn btn-danger waves-effect waves-light btn-sm" data-id="${stationId}" data-type="${stationType}" data-file="pdf"><i class="fe-download me-1"></i> Pdf</button>
                        </div>`;
  return buttonDownload;
}


var DataReport = (function () {
  var initInput = function () {
    // $("#periode")
    //   .datepicker({
    //     format: "MM yyyy", // Set the date format to display only the month and year
    //     startView: "months", // Set the default view to months
    //     minViewMode: "months", // Set the minimum view mode to months
    //     beforeShowMonth: function (date) {
    //       // Disable months beyond the current month
    //       return date.valueOf() <= new Date().valueOf();
    //     },
    //     autoclose: true,
    //     altFormat: "yyyy-mm",
    //     altField: "#get-periode",
    //   })
    //   .on("changeDate", function (e) {
    //     // Format the actual value as yyyy-mm
    //     var formattedDate =
    //       e.date.getFullYear() +
    //       "-" +
    //       ("0" + (e.date.getMonth() + 1)).slice(-2);
    //     // Set the actual value to a hidden input
    //     $("#get-periode").val(formattedDate);
    //   });
    // // Set the default date to the current month
    // $("#periode").datepicker("setDate", new Date());

    $("#search-station-table").keyup(function () {
      dataTableReport.search($(this).val()).draw();
    });
    $("#length-station-table").change(function () {
      dataTableReport.page.len($(this).val()).draw();
    });

    $("#type").selectize();
    TYPE = $("#type").val();
  };

  var initDataTable = function () {
    dataTableReport = $("#table-report").DataTable({
      processing: true,
      serverSide: true,
      paging: false,
      dom: "rti",
      order: [[2, "asc"]],
      ajax: {
        url: "/DownloadData/GetDatatableStation?type=" + TYPE,
        type: "POST",
        dataType: "JSON",
      },
      columns: [
        { data: null },
        { data: "name", name: "Name" },
        {
          data: "type",
          name: "Type",
          render: function (data, type, row) {
            let pos = posName[data];
            console.log(pos);
            return posName[data];
          },
        },
        {
          render: function (data, type, row) {
            if (row.type == "AWLR" || row.type == "V-Notch") {
              // return `<button onclick="downloadData(this,event);" type="button" class="btn btn-xs btn-blue me-1" data-id="${row.id}" data-type="${row.type}"><i class="fe-download me-1"></i> Download</button>`;
              return generateDownloadButton(row.id, row.type,'btn-blue');
            }

            if (row.type == "AWLR_ARR") {
              // return `<button onclick="downloadData(this,event);" type="button" class="btn btn-xs btn-warning me-1" data-id="${row.id}" data-type="${row.type}"><i class="fe-download me-1"></i> Download</button>`;
              return generateDownloadButton(row.id, row.type,'btn-warning');
            }

            if (row.type == "ARR") {
              // return `<button onclick="downloadData(this,event);" type="button" class="btn btn-xs btn-success me-1" data-id="${row.id}" data-type="${row.type}"><i class="fe-download me-1"></i> Download</button>`;
              return generateDownloadButton(row.id, row.type,'btn-success');
            }
            if (row.type == "AWS") {
              // return `<button onclick="downloadData(this,event);" type="button" class="btn btn-xs btn-danger me-1" data-id="${row.id}" data-type="${row.type}"><i class="fe-download me-1"></i> Download</button>`;
              return generateDownloadButton(row.id, row.type,'btn-danger');
            }
            if (row.type == "WQMS") {
              // return `<button onclick="downloadData(this,event);" type="button" class="btn btn-xs btn-primary me-1" data-id="${row.id}" data-type="${row.type}"><i class="fe-download me-1"></i> Download</button>`;
              return generateDownloadButton(row.id, row.type,'btn-primary');
            }

            return `<button onclick="downloadData(this,event);" type="button" class="btn btn-xs btn-info me-1" data-id="${row.id}" data-type="${row.type}"><i class="fe-download me-1"></i> Download</button>`;
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
  $("#periode").trigger("change");
  $("#type").selectize();
  $("#selectTime").selectize();
  generateDatePicker($("#selectTime").val());
  DataReport.init();
});

$("#periode").on("change", function () {
  periode = monthYearToYM($(this).val());
});

function monthYearToYM(monthYearStr) {
    // Split the input string into month and year
    const [month, year] = monthYearStr.split(' ');
    
    // Convert month name to its numerical representation
    const monthIndex = new Date(Date.parse(month + ' 1, ' + year)).getMonth() + 1;
    
    // Format month index to two digits
    const formattedMonth = monthIndex < 10 ? '0' + monthIndex : monthIndex;
    
    return year + '-' + formattedMonth;
}

function allMonthsToYM(monthYearStr) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const year = monthYearStr.split(' ')[1];
    const yearMonths = months.map(month => monthYearToYM(month + ' ' + year));
    return yearMonths;
}


$("#selectTime").on("change", function () {
  const value = $(this).val();
  const posType = $("#type").val();
  if (value == "year") {
    //showMessage("info", "Informasi", "Data yang terunduh hanya Data Per Jam!");
  }
  generateDatePicker(value);
});

$("#type").on("change", function () {
  dataTableReport.destroy();
  TYPE = $(this).val();
  var selectize = $('#selectTime')[0].selectize;
  
  if (TYPE != "ARR" && TYPE != "AWLR") {
    selectize.setValue("month");
    generateDatePicker($("#selectTime").val());
    selectize.disable("month");
  } else {
    selectize.enable();
    generateDatePicker($("#selectTime").val());
  }

  

  DataReport.init();
  dataTableReport.ajax.reload();
});

function downloadData(input, evt) {
  evt.preventDefault();
  periode = $("#get-periode").val();
  const stationId = $(input).data("id");
  const type = $(input).data("type");
  const choosenFile = $(input).data("file");
  const selectedTime = $("#selectTime").val();

  const typePos = ["ARR", "AWLR", "AWS", "AWLR_ARR", "V-Notch"];

  // if (choosenFile == "pdf") {
  //   showMessage("info", "Mohon Maaf", "Fitur Download Data Pdf Sedang Dalam Pengembangan. Silahkan Download Excel!");
  //   return;
  // }

  if (selectedTime == 'year') {
    const p = $("#periode").val();
    if (p == "" || p == null) {
      showMessage("error", "Error", "Periode Wajib Diisi");
      return;
    }
    periode = p;
  }

  if (type != "ARR" && type != "AWLR") {
    showMessage("info", "Mohon Maaf", "Fitur Sedang Dalam Pengembangan");
    return;
  }

  if (typePos.includes(type)) {
    if (selectedTime == 'year') {
      periode = $("#periode").val();
    } else {
      periode = monthYearToYM($("#periode").val());
    }
    const url = `/DownloadData/Download?stationid=${stationId}&type=${type}&periode=${periode}&file_type=${choosenFile}`;
    window.open(url, "_blank");
  } else {
    showMessage("info", "Mohon Maaf", "Fitur Sedang Dalam Pengembangan");
    return;
  }

}

function searchData(input, event) {
  event.preventDefault();
  console.log($("#search-report-table").val());
  dataTableReport.ajax.reload();
}

function generateDatePicker(time) {
  $("#periode").datepicker("destroy");
  
  if (time == 'month') {
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
        let t = convertTimestampToYearAndMonth(e.timeStamp)
        const str_month = t.month > 9 ? t.month : `0${t.month}`; 
        
        var formattedDate = `${t.year}-${str_month}`
        // Set the actual value to a hidden input
        $("#get-periode").val(formattedDate);
      });
  } else {
    $("#periode").datepicker({
    format: "yyyy", // Show only the year
    startView: "years", // Set the default view to years
    minViewMode: "years", // Set the minimum view mode to years
    autoclose: true,
    endDate: new Date(), // Set the maximum selectable year to the current year
    beforeShowYear: function(date){
        // Disable years beyond the current year
        return date.getFullYear() <= new Date().getFullYear();
    },
    altField: "#get-periode",
    altFormat: "yyyy", // Set the format for the alternative field (hidden input)
    })
      .on("changeDate", function (e) {
        let t = convertTimestampToYearAndMonth(e.timeStamp)
        $("#get-periode").val(t.year);
    });
  }
  // Set the default date to the current month
  $("#periode").datepicker("setDate", new Date());
}

function convertTimestampToYearAndMonth(timestamp) {
    // Create a new Date object using the timestamp (in milliseconds)
    var date = new Date(timestamp); // Multiply by 1000 to convert seconds to milliseconds

    // Extract the year and month from the Date object
    var year = date.getFullYear();
    // Month is zero-based, so we add 1 to get the correct month
    var month = date.getMonth() + 1;

    // Return the year and month as an object
    return {
        year: year,
        month: month
    };
}
