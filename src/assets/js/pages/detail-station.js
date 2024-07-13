"use strict";

const NOW_YEAR = new Date().getFullYear();
const STATION_ID = stationId;
const STATION_TYPE = stationType;
const UNIT_DISPLAY = $("#unit-display").val();

const UNIT_SENSOR =
  $("#unit-sensor").val() == null ? "" : $("#unit-sensor").val();
const IS_ONLY_MDPL = UNIT_SENSOR.includes("pl");
const STATION_NAME = $("#station-name").val();
const WATERSHED_NAME = $("#watershed-name").val();
const wQSensors = ["temperature", "ph", "orp", "turbidity", "baterai"];
const TIME_ZONE = $("#time-zone").val();
let sensorNames = [];
let dynamicVariable = {};
$("#arr-telemetry-info").fadeOut(250);
$("#awlr-telemetry-info").fadeOut(250);

const vNotchGarfikConfig = {
  tma: {
    unit: "cm",
    color: "#00008B",
    name: "Tinggi Muka Air",
  },
  debit: {
    unit: "L/s",
    color: "#2E8B57",
    name: "Debit",
  },
  battery: {
    unit: "V",
    color: "#FFA500",
    name: "baterai",
  },
};

const piezometerGarfikConfig = {
  tma: {
    unit: UNIT_DISPLAY,
    color: "#00008B",
    name: "Tinggi Muka Air",
  },
  battery: {
    unit: "V",
    color: "#FFA500",
    name: "baterai",
  },
};

const awsSensors = {
  humidity: {
    unit: "%",
    color: "#00008B",
    sensorName: "Kelembaban",
  },
  pressure: {
    unit: "MB",
    color: "#2E8B57",
    sensorName: "Tekanan",
  },
  rainfall: {
    unit: "mm",
    color: "#FFA500",
    sensorName: "Curah Hujan",
  },
  solarRadiation: {
    unit: "W/s<sup>2</sup>",
    color: "#8B0000",
    sensorName: "Radiasi Matahari",
  },
  temperature: {
    unit: "&degC",
    color: "#3498db",
    sensorName: "Suhu",
  },
  windDirection: {
    unit: "&deg",
    color: "#696969",
    sensorName: "Arah Angin",
  },
  windSpeed: {
    unit: "Km/j",
    color: "#A9A9A9",
    sensorName: "Kecepatan Angin",
  },
  evaporation: {
    unit: "mm",
    color: "#4682B4",
    sensorName: "Penguapan",
  },
  battery: {
    unit: "V",
    color: "#FFA500",
    sensorName: "Baterai",
  },
};

if (STATION_TYPE == "AWS") {
  sensorNames = $("#sensor-name").val().split(",");
}

let dynamicVariableName = [];

var GRAFIK_ARR;
var GRAFIK_AWLR;
var GARIFK_BATTERY;
var GARIFK_DEBIT;
var GARIFK_CH_HARIAN;
var GARIFK_PER_DAS;
var GRAFIK_ELEVATION;
var GRAFIK_SENSOR_WQ;
var GRAFIK_VNOTCH;
var GRAFIK_WIND_DIRECTION;
var GRAFIK_AWLR_ARR_TMA_CH;
var GRAFIK_AWLR_ARR_CH_DAY;
var GRAFIK_AWLR_ARR_DEBIT;
var GRAFIK_AWLR_ARR_BATTERY;
var GRAFIK_PIEZOMETER;

let READING_TABLE;
let selected_time = "minute";
let filter_date;
let dynamicValues = [];

let countClickTabTelemetri = 0;

let momentjs = moment();
momentjs.locale("id");
switch (TIME_ZONE) {
  case "WITA":
    momentjs.tz("Asia/Makassar");
    break;
  case "WIT":
    momentjs.tz("Asia/Jayapura");
    break;
  default:
    momentjs.tz("Asia/Jakarta");
    break;
}

$(document).ready(function () {
  if (IS_ONLY_MDPL) {
    $("#grafik-title").text(`GRAFIK MUKA AIR`);
    $("#tab-title-awlr").text("Grafik Muka Air");
  }

  redrawCustomMarkers();
  // Initial values
  let filter_date = $("#periode").val();
  let selected_time = $("#waktu").val();

  //initialize ddatePicker ID manual config
  $.fn.datepicker.dates["id"] = {
    days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    daysShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    daysMin: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    months: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    monthsShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    today: "Hari Ini",
    clear: "Clear",
    format: "yyyy-mm-dd",
    titleFormat: "MM yyyy" /* Leverages the same syntax as ‘format’ */,
    weekStart: 0,
  };

  flatpickr("#periode-grafik", {
    defaultDate: "today",
    maxDate: "today",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d F Y",
    locale: "id",
  });
  flatpickr("#periode-battery", {
    defaultDate: "today",
    maxDate: "today",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d F Y",
    locale: "id",
  });

  flatpickr("#periode-debit", {
    defaultDate: "today",
    maxDate: "today",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d F Y",
    locale: "id",
  });

  flatpickr("#periode-grafik-per-das", {
    defaultDate: "today",
    maxDate: "today",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d F Y",
    locale: "id",
  });

  // Handle change event for #waktu
  $("#waktu").on("change", function () {
    selected_time = $(this).val();
    filter_date = $("#periode").val();
    loadDatePicker("periode", selected_time, filter_date);

    // Reinitialize DataTable
    generateDataTable(
      STATION_TYPE,
      "table-telemetri",
      selected_time,
      filter_date
    );
  });

  $("#waktu-grafik").on("change", function () {
    selected_time = $(this).val();
    filter_date = $("#periode-grafik").val();
    loadDatePicker("waktu-grafik", selected_time, filter_date);
  });

  function isValidDateFormat(dateString) {
    var regex =
      /^(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{2})$/;
    return regex.test(dateString);
  }

  // Handle change event for #periode
  $("#periode").on("change", function () {
    filter_date = $(this).val();
    selected_time = $("#waktu").val();

    if (!isValidDateFormat(filter_date)) {
      generateDataTable(
        STATION_TYPE,
        "table-telemetri",
        selected_time,
        filter_date
      );
    }
  });
  // Handle change event for #periode
  $("#periode-grafik").on("change", function () {
    let periode = $(this).val();
    selected_time = "hour";

    if (STATION_TYPE == "AWLR" || STATION_TYPE == "V-Notch") {
      selected_time = "minute";
    }
    loadGrafik(selected_time, periode);
  });

  $("#periode-battery").on("change", function () {
    let periode = $(this).val();
    selected_time = "hour";
    if (STATION_TYPE == "AWLR") {
      selected_time = "minute";
    }
    loadGrafikBattery(selected_time, periode);
  });

  $("#periode-debit").on("change", function () {
    let periode = $(this).val();
    selected_time = "minute";
    loadGrafikDebit(selected_time, periode);
  });

  $("#periode-ch-harian").on("change", function () {
    let periode = $(this).val();
    selected_time = "day";
    loadGrafikChHarian(selected_time, periode);
  });

  $("#periode-grafik-per-das").on("change", function () {
    filter_date = moment($(this).val()).format("YYYY-MM-DD");
    loadGrafikTmaPerDAS(filter_date);
  });

  $("#periode-temperature").on("change", function () {
    filter_date = moment($(this).val()).format("YYYY-MM-DD");
    loadGrafikWaterQuality("temperature", filter_date);
  });
  $("#periode-ph").on("change", function () {
    filter_date = moment($(this).val()).format("YYYY-MM-DD");
    loadGrafikWaterQuality("ph", filter_date);
  });
  $("#periode-orp").on("change", function () {
    filter_date = moment($(this).val()).format("YYYY-MM-DD");
    loadGrafikWaterQuality("orp", filter_date);
  });
  $("#periode-turbidity").on("change", function () {
    filter_date = moment($(this).val()).format("YYYY-MM-DD");
    loadGrafikWaterQuality("turbidity", filter_date);
  });
  $("#periode-baterai").on("change", function () {
    filter_date = moment($(this).val()).format("YYYY-MM-DD");
    loadGrafikWaterQuality("baterai", filter_date);
  });
  $("#periode-humidity").on("change", function () {
    filter_date = moment($(this).val()).format("YYYY-MM-DD");
    loadGrafikAWS("humidity", filter_date);
  });
  
  $("#periode-tma-ch-awlr-arr").on('change', function () {
    filter_date = moment($(this).val()).format("YYYY-MM-DD");
    loadGrafikAwlrArrTmaCh("", filter_date);
  });

  $("#periode-debit-awlr-arr").on('change', function () {
    filter_date = moment($(this).val()).format("YYYY-MM-DD");
    //loadGrafikAwlrArrDebit("", filter_date);
    loadGrafikDebitAwlrArr("", filter_date);
  });

  $("#periode-ch-harian-awlr-arr").on('change', function () {
    filter_date = moment($(this).val()).format("YYYY-MM-DD");
    loadGrafikChHarianAwlrArr('', filter_date);
  });

  $("#periode-battery-awlr-arr").on('change', function () {
    filter_date = moment($(this).val()).format("YYYY-MM-DD");
    //loadGrafikAwlrArrBattery("", filter_date);
    loadGrafikBatteryAwlrArr('', filter_date);
  });

  Object.entries(awsSensors).forEach(([sensor, unit]) => {
    $(`#periode-${sensor}-aws`).on("change", function () {
      filter_date = moment($(this).val()).format("YYYY-MM-DD");
      loadGrafikAWS(sensor, filter_date);
    });
    dynamicValues.push({ [`${sensor}-aws`]: undefined });
  });

  Object.entries(vNotchGarfikConfig).forEach(([column, unit]) => {
    $(`#periode-${column}-vnotch`).on("change", function () {
      filter_date = moment($(this).val()).format("YYYY-MM-DD");
      loadGrafikVNotch(column, filter_date);
    });
  });

  Object.entries(piezometerGarfikConfig).forEach(([column, unit]) => {
    $(`#periode-${column}-piezometer`).on("change", function () {
      filter_date = moment($(this).val()).format("YYYY-MM-DD");
      loadGrafikPiezometer(column, filter_date);
    });
  });
});

$("#tab-tma-per-das").on("click", function () {
  flatpickr("#periode-grafik-per-das", {
    defaultDate: "today",
    maxDate: "today",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d F Y",
    locale: "id",
  });
  filter_date = moment(new Date()).format("YYYY-MM-DD");
  loadGrafikTmaPerDAS(filter_date);
});

$("#tab-info").on("click", function () {
  $("#arr-telemetry-info").fadeOut(150);
  $("#awlr-telemetry-info").fadeOut(150);
});

$("#tab-telemetri").on("click", function () {
  if (STATION_TYPE == "ARR" && $("#waktu").val() != "minute") {
    $("#arr-telemetry-info").fadeIn(250);
  }
  if (STATION_TYPE == "AWLR" && $("#waktu").val() != "day") {
    $("#awlr-telemetry-info").fadeIn(250);
  }
  if (STATION_TYPE == "AWS" && $("#waktu").val() != "minute") {
    $("#arr-telemetry-info").fadeIn(250);
  }

  if (STATION_TYPE == "AWLR_ARR" && $("#waktu").val() == "minute") {
    $("#awlr-telemetry-info").fadeIn(250);
    $("#arr-telemetry-info").fadeOut(250);
  } else if (STATION_TYPE == "AWLR_ARR" && $("#waktu").val() == "day") {
    $("#awlr-telemetry-info").fadeOut(150);
    $("#arr-telemetry-info").fadeIn(250);
  } else {
    $("#awlr-telemetry-info").fadeIn(250);
    $("#arr-telemetry-info").fadeIn(250);
  }
  
  if (countClickTabTelemetri > 0) {
    return;
  }

  countClickTabTelemetri++;
  momentjs = moment(new Date());
  filter_date = momentjs.format("DD MMMM YYYY");
  selected_time = $("#waktu").val() == undefined ? "minute" : $("#waktu").val();

  if (STATION_TYPE == "ARR") {
    let isBetween12And7Am = checkIsCurrentTimeBefore7AM();

    isBetween12And7Am = true;
    if (isBetween12And7Am) {
      const currDate = new Date();
      const prevDate = `${currDate.getFullYear()}-${
        currDate.getMonth() + 1
      }-${currDate.getDate()}`;
      momentjs = moment(prevDate);
      filter_date = momentjs.format("DD MMMM YYYY");
    }
    loadDatePicker("periode", selected_time, filter_date);
  } else {
    loadDatePicker("periode", selected_time, filter_date);
  }

  generateDataTable(
    STATION_TYPE,
    "table-telemetri",
    selected_time,
    filter_date
  );
});

let countClickTabGrafik = 0;
$("#tab-graphic").on("click", function () {
  $("#arr-telemetry-info").fadeOut(150);
  $("#awlr-telemetry-info").fadeOut(150);

  if (countClickTabGrafik > 0) {
    return;
  }

  countClickTabGrafik++;

  filter_date = moment(new Date()).format("YYYY-MM-DD");

  if (STATION_TYPE == "AWS") {
    sensorNames.forEach((sensor) => {
      flatpickr(`#periode-${sensor}-aws`, {
        maxDate: "today",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d F Y",
        locale: "id",
      }).setDate(filter_date);
      loadGrafikAWS(sensor, filter_date);
    });
    return;
  }
  if (STATION_TYPE == "WQMS") {
    wQSensors.forEach((sensor) => {
      flatpickr(`#periode-${sensor}`, {
        maxDate: "today",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d F Y",
        locale: "id",
      }).setDate(filter_date);

      loadGrafikWaterQuality(sensor, filter_date);
    });
    return;
  }
  if (STATION_TYPE == "V-Notch") {
    Object.entries(vNotchGarfikConfig).forEach(([column, unit]) => {
      flatpickr(`#periode-${column}-vnotch`, {
        maxDate: "today",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d F Y",
        locale: "id",
      }).setDate(filter_date);
      loadGrafikVNotch(column, filter_date);
    });

    return;
  }

  if (STATION_TYPE == "Piezometer") {
    Object.entries(piezometerGarfikConfig).forEach(([column, unit]) => {
      flatpickr(`#periode-${column}-piezometer`, {
        maxDate: "today",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d F Y",
        locale: "id",
      }).setDate(filter_date);
      loadGrafikPiezometer(column, filter_date);
    });

    return;
  }

  if (STATION_TYPE == "AWLR_ARR") {
   flatpickr(`#periode-tma-ch-awlr-arr`, {
     maxDate: "today",
     dateFormat: "Y-m-d",
     altInput: true,
     altFormat: "d F Y",
     locale: "id",
   }).setDate(filter_date);
    
  flatpickr(`#periode-ch-harian-awlr-arr`, {
     maxDate: "today",
     dateFormat: "Y-m-d",
     altInput: true,
     altFormat: "d F Y",
     locale: "id",
  }).setDate(filter_date);
    
   flatpickr(`#periode-debit-awlr-arr`, {
     maxDate: "today",
     dateFormat: "Y-m-d",
     altInput: true,
     altFormat: "d F Y",
     locale: "id",
   }).setDate(filter_date);
  
   flatpickr(`#periode-battery-awlr-arr`, {
     maxDate: "today",
     dateFormat: "Y-m-d",
     altInput: true,
     altFormat: "d F Y",
     locale: "id",
   }).setDate(filter_date);
   loadGrafikAwlrArrTmaCh('hour', filter_date);
   loadGrafikDebitAwlrArr('hour', filter_date);
   loadGrafikBatteryAwlrArr('hour', filter_date);
   loadGrafikChHarianAwlrArr('hour', filter_date);
   return;
  }


  flatpickr("#periode-grafik", {
    maxDate: "today",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d F Y",
    locale: "id",
  }).setDate(filter_date);

  flatpickr("#periode-battery", {
    maxDate: "today",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d F Y",
    locale: "id",
  }).setDate(filter_date);

  selected_time = "hour";

  if (STATION_TYPE == "AWLR") {
    selected_time = "minute";
    flatpickr("#periode-debit", {
      maxDate: "today",
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d F Y",
      locale: "id",
    }).setDate(filter_date);
    flatpickr("#periode-grafik-per-das", {
      maxDate: "today",
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d F Y",
      locale: "id",
    }).setDate(filter_date);
    loadGrafikDebit(selected_time, filter_date);
    loadGrafikTmaPerDAS(filter_date);
  }

  if (STATION_TYPE == "ARR") {
    selected_time = "hour";
    filter_date = moment(new Date()).format("YYYY-MM-DD");
    loadDatePicker("periode-ch-harian", "day", filter_date);
    loadGrafikChHarian(selected_time, filter_date);
  }
  loadGrafik(selected_time, filter_date);
  loadGrafikBattery(selected_time, filter_date);
});

$(".link-wqms").on("click", function () {
  const sensor = $(this).data("id");
  filter_date = moment(new Date()).format("YYYY-MM-DD");
  flatpickr(`#periode-${sensor}`, {
    maxDate: "today",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d F Y",
    locale: "id",
  }).setDate(filter_date);
  loadGrafikWaterQuality(sensor, filter_date);
});

function loadDatePicker(id, waktu, filter_date) {
  $(`#${id}`).datepicker("destroy");
  filter_date = moment(new Date()).format("YYYY-MM-DD");
  switch (waktu) {
    case "day":
      $(`#${id}`).datepicker({
        format: "MM yyyy",
        viewMode: "months",
        minViewMode: "months",
        endDate: "{{ date('MM Y') }}",
        autoclose: true,
        todayHighlight: true,
        orientation: "bottom",
        altFormat: "yyyy-MM",
        // language: "id", // Use the 'id' code for Bahasa Indonesia
      });
      $(`#${id}`).datepicker("setDate", filter_date);
      $(`#${id}`).datepicker("update", "{{ date('MM Y') }}");
      break;
    default:
      $(`#${id}`).datepicker({
        format: "d MM yyyy",
        autoclose: true,
        todayHighlight: true,
        endDate: "{{ date('d M Y') }}",
        orientation: "bottom",
        altFormat: "yyyy-mm-dd",
        // language: "id",
      });
      $(`#${id}`).datepicker("setDate", filter_date);
      $(`#${id}`).datepicker("update", "{{ date('d M Y') }}");
      break;
  }
}

/* -------- Function untuk Generate DataTable ARR/ AWLR ------------- */

function capitalizeFirstLetter(str) {
  // Check if the string is not empty
  if (str.length === 0) {
    return "";
  }

  // Capitalize the first character and concatenate it with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function checkIsCurrentTimeBefore7AM() {
  // Get the current date and time
  var currentDate = new Date();

  // Get the current hour and minute
  var currentHour = currentDate.getHours();
  var currentMinute = currentDate.getMinutes();

  // Check if the current time is between 12:00 AM and 6:59 AM
  if (currentHour >= 0 && currentHour < 7) {
    return true;
  } else {
    return false;
  }
}

function generateDataTable(typePos, idTable, timeCategory, filterDate) {
  let COLUMNS = [];
  let COLUMNDEF = [];

  if ($.fn.DataTable.isDataTable("#" + idTable)) {
    $("#" + idTable)
      .DataTable()
      .clear()
      .destroy();
  }

  let HEADER_ROW;

  if (typePos == "ARR") {
    switch (timeCategory) {
      case "minute":
        $("#arr-telemetry-info").fadeOut(250);
        COLUMNS = [
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "rainfall",
            name: "Rainfall",
            render: function (data) {
              console.log(data);
              return `<strong>${data}</strong>`;
            },
          },
        ];
        COLUMNDEF = [
          {
            targets: [2],
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
        ];
        HEADER_ROW = `<tr>
                        <th>Tanggal</th>
                        <th>Jam</th>
                        <th>CH <small class="text-muted">(mm)</small> </th>
                      </tr>`;
        break;
      case "hour":
        $("#arr-telemetry-info").fadeIn(250);
        HEADER_ROW = `<tr>
                        <th>Tanggal</th>
                        <th>Jam</th>
                        <th>CH <small class="text-muted">(mm)</small></th>
                        <th>Intensitas</th>
                      </tr>`;

        COLUMNS = [
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "rainfall",
            name: "Rainfall",
            render: function (data) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "intensity",
            name: "Intensity",
            createdCell: function (td, cellData, rowData, row, col) {
              switch (cellData) {
                case "Berawan":
                  $(td).addClass("bg-berawan");
                  break;

                case "Hujan Ringan":
                  $(td).addClass("bg-hujan-ringan");
                  break;

                case "Hujan Sedang":
                  $(td).addClass("bg-hujan-sedang");
                  break;

                case "Hujan Lebat":
                  $(td).addClass("bg-hujan-lebat");
                  break;
                case "Hujan Sangat Lebat":
                  $(td).addClass("bg-hujan-sangat-lebat");
                  break;
              }
            },
            render: function (data) {
              return `<strong>${data}</strong>`;
            },
          },
        ];
        COLUMNDEF = [
          {
            targets: [2, 3],
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
        ];

        break;
      case "day":
        $("#arr-telemetry-info").fadeIn(250);
        HEADER_ROW = `<tr>
                        <th>Tanggal</th>
                        <th>CH <small class="text-muted">(mm)</small></th>
                        <th>Intensitas</th>
                      </tr>`;
        COLUMNS = [
          {
            data: "readingDateOnly",
            name: "ReadingDateOnly",
            render: function (data, type, row) {
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "rainfall",
            name: "Rainfall",
            render: function (data) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "intensity",
            name: "Intensity",
            createdCell: function (td, cellData, rowData, row, col) {
              switch (cellData) {
                case "Berawan":
                  $(td).addClass("bg-berawan");
                  break;

                case "Hujan Ringan":
                  $(td).addClass("bg-hujan-ringan");
                  break;

                case "Hujan Sedang":
                  $(td).addClass("bg-hujan-sedang");
                  break;

                case "Hujan Lebat":
                  $(td).addClass("bg-hujan-lebat");
                  break;
                case "Hujan Sangat Lebat":
                  $(td).addClass("bg-hujan-sangat-lebat");
                  break;
              }
            },
            render: function (data) {
              return `<strong>${data}</strong>`;
            },
          },
        ];
        COLUMNDEF = [
          {
            targets: [1, 2],
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
        ];
        break;
      default:
        break;
    }

    $(`#${idTable} thead`).html(HEADER_ROW);
    $(`#${idTable}`).DataTable({
      dom: "rti",
      paging: false,
      ordering: false,
      processing: true,
      serverSide: true,
      ajax: {
        url: URL,
        type: "POST",
        data: {
          stationId: STATION_ID,
          filterDate: filterDate,
          selectedTime: timeCategory,
          stationType: STATION_TYPE,
        },
      },
      columnDefs: COLUMNDEF,
      columns: COLUMNS,
      language: {
        emptyTable: function() {
            if (STATION_TYPE === 'ARR' && filterDate === moment().format('YYYY-MM-DD') && moment().format('HH') < '07') {
                return `Data yang tersedia dimulai pada tanggal ${moment(filterDate).format('D MMMM YYYY')} pukul 07:00 Pagi`;
            } else {
                return 'No data available';
            }
        }
      }
    });
  }
  if (typePos == "AWLR") {
    switch (timeCategory) {
      case "day":
        $("#awlr-telemetry-info").fadeOut(250);
        COLUMNS = [
          {
            data: "readingDateOnly",
            name: "ReadingDateOnly",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          { data: "waterLevelAvg", name: "WaterLevelAvg" },
          { data: "waterLevelMin", name: "WaterLevelMin" },
          { data: "waterLevelMax", name: "WaterLevelMax" },
        ];

        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3] }];

        if (IS_ONLY_MDPL) {
          HEADER_ROW = `<tr>
                        <th>Tanggal</th>
                        <th>Elevasi Rerata (${UNIT_DISPLAY})</th>
                        <th>Elevasi Minimum (${UNIT_DISPLAY})</th>
                        <th>Elevasi Maksimum (${UNIT_DISPLAY})</th>
                      </tr>`;
        } else {
          HEADER_ROW = `<tr>
                        <th>Tanggal</th>
                        <th>TMA Rerata (${UNIT_DISPLAY})</th>
                        <th>TMA Minimum (${UNIT_DISPLAY})</th>
                        <th>TMA Maksimum (${UNIT_DISPLAY})</th>
                      </tr>`;
        }
        
        break;
      case "hour":
        $("#awlr-telemetry-info").fadeIn(250);
        COLUMNS = [
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "waterLevel",
            name: "WaterLevel",
            createdCell: function (td, cellData, rowData, row, col) {
              if (IS_ONLY_MDPL) {
                return;
              }

              $(td).removeClass("bg-normal");
              $(td).removeClass("bg-siaga3");
              $(td).removeClass("bg-siaga2");
              $(td).removeClass("bg-siaga1");
              $(td).removeClass("bg-nostatus");

              if (
                rowData.unitSensor != "cmdpl" &&
                rowData.unitSensor != "mdpl"
              ) {
                switch (rowData.warningStatus) {
                  case "Normal":
                    $(td).addClass("bg-normal");
                    break;

                  case "Siaga 3":
                    $(td).addClass("bg-siaga3");
                    break;

                  case "Siaga 2":
                    $(td).addClass("bg-siaga2");
                    break;

                  case "Siaga 1":
                    $(td).addClass("bg-siaga1");
                    break;
                  default:
                    $(td).addClass("bg-nostatus");
                    break;
                }
              }
            },
            render: function (data) {
              if (IS_ONLY_MDPL) {
                return null;
              }
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "waterLevelElevation",
            name: "WaterLevelelevation",
            createdCell: function (td, cellData, rowData, row, col) {
              if (!IS_ONLY_MDPL) {
                return;
              }

              $(td).removeClass("bg-normal");
              $(td).removeClass("bg-siaga3");
              $(td).removeClass("bg-siaga2");
              $(td).removeClass("bg-siaga1");
              $(td).removeClass("bg-nostatus");

              if (
                rowData.unitSensor != "cmdpl" &&
                rowData.unitSensor != "mdpl"
              ) {
                switch (rowData.warningStatus) {
                  case "Normal":
                    $(td).addClass("bg-normal");
                    break;

                  case "Siaga 3":
                    $(td).addClass("bg-siaga3");
                    break;

                  case "Siaga 2":
                    $(td).addClass("bg-siaga2");
                    break;

                  case "Siaga 1":
                    $(td).addClass("bg-siaga1");
                    break;
                  default:
                    $(td).addClass("bg-nostatus");
                    break;
                }
              }
            },
            render: function (data) {
              if (data == null) {
                return "";
              }
              return `<strong>${data}</strong>`;
            },
            render: function (data) {
              if (data == null) {
                return "";
              }
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "changeStatus",
            name: "ChangeStatus",
            render: function (data, type, row) {
              if (data == null || data == "" || data == "constant") return "";
              if (data == "decrease") {
                return `<span><i class="mdi mdi-arrow-down-circle text-success font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue} m</span>`;
              }
              if (data == "increase") {
                return `<span><i class="mdi mdi-arrow-up-circle text-danger font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue} m</span>`;
              }
            },
          },
          { data: "debit", name: "Debit" },
          {
            data: "warningStatus",
            name: "WarningStatus",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              switch (data) {
                case "Normal":
                  return `<span class="badge bg-soft-success text-success">${data}</span>`;
                case "Siaga 1":
                  return `<span class="badge bg-soft-danger text-danger">${data}</span>`;
                case "Siaga 2":
                  return `<span class="badge bg-soft-orage" style="background:#FFA600;">${data}</span>`;
                case "Siaga 3":
                  return `<span class="badge bg-soft-warning text-warning">${data}</span>`;
                default:
                  break;
              }
            },
          },
        ];
        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3, 4, 5, 6] }];
        HEADER_ROW = `<tr>
                      <th>Tanggal</th>
                      <th>Jam</th>
                      <th>TMA ${UNIT_DISPLAY == "mdpl" ? "" : `(${UNIT_DISPLAY})`}</th>
                      <th>Elevasi (${
                        UNIT_DISPLAY == "m" ? "mdpl" : UNIT_DISPLAY == "cm" ? "mdpl" : UNIT_DISPLAY
                      })</th>
                      <th>Perubahan</th>
                      <th>Debit (m3/s)</th>
                      <th>Status</th>
                    </tr>`;
        break;
      default:
        $("#awlr-telemetry-info").fadeIn(250);
        COLUMNS = [
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "waterLevel",
            name: "WaterLevel",
            createdCell: function (td, cellData, rowData, row, col) {
              if (IS_ONLY_MDPL) {
                return;
              }

              $(td).removeClass("bg-normal");
              $(td).removeClass("bg-siaga3");
              $(td).removeClass("bg-siaga2");
              $(td).removeClass("bg-siaga1");
              $(td).removeClass("bg-nostatus");

              if (
                rowData.unitSensor != "cmdpl" &&
                rowData.unitSensor != "mdpl"
              ) {
                switch (rowData.warningStatus) {
                  case "Normal":
                    $(td).addClass("bg-normal");
                    break;

                  case "Siaga 3":
                    $(td).addClass("bg-siaga3");
                    break;

                  case "Siaga 2":
                    $(td).addClass("bg-siaga2");
                    break;

                  case "Siaga 1":
                    $(td).addClass("bg-siaga1");
                    break;
                  default:
                    $(td).addClass("bg-nostatus");
                    break;
                }
              }
            },
            render: function (data) {
              if (IS_ONLY_MDPL) {
                return null;
              }
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "waterLevelElevation",
            name: "WaterLevelelevation",
            createdCell: function (td, cellData, rowData, row, col) {
              if (!IS_ONLY_MDPL) {
                return;
              }

              $(td).removeClass("bg-normal");
              $(td).removeClass("bg-siaga3");
              $(td).removeClass("bg-siaga2");
              $(td).removeClass("bg-siaga1");
              $(td).removeClass("bg-nostatus");

              if (
                rowData.unitSensor != "cmdpl" &&
                rowData.unitSensor != "mdpl"
              ) {
                switch (rowData.warningStatus) {
                  case "Normal":
                    $(td).addClass("bg-normal");
                    break;

                  case "Siaga 3":
                    $(td).addClass("bg-siaga3");
                    break;

                  case "Siaga 2":
                    $(td).addClass("bg-siaga2");
                    break;

                  case "Siaga 1":
                    $(td).addClass("bg-siaga1");
                    break;
                  default:
                    $(td).addClass("bg-nostatus");
                    break;
                }
              }
            },
            render: function (data) {
              if (data == null) {
                return "";
              }
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "changeStatus",
            name: "ChangeStatus",
            render: function (data, type, row) {
              if (data == null || data == "" || data == "constant") return "";
              if (data == "decrease") {
                return `<span><i class="mdi mdi-arrow-down-circle text-success font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue} </span>`;
              }
              if (data == "increase") {
                return `<span><i class="mdi mdi-arrow-up-circle text-danger font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue} </span>`;
              }
            },
          },
          { data: "debit", name: "Debit" },
          {
            data: "warningStatus",
            name: "WarningStatus",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              switch (data) {
                case "Normal":
                  return `<span class="badge bg-soft-success text-success">${data}</span>`;
                case "Siaga 1":
                  return `<span class="badge bg-soft-danger text-danger">${data}</span>`;
                case "Siaga 2":
                  return `<span class="badge text-orange" style="background:#FFA600;">${data}</span>`;
                case "Siaga 3":
                  return `<span class="badge bg-soft-warning text-warning">${data}</span>`;
                default:
                  break;
              }
            },
          },
        ];
        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3, 4, 5, 6] }];
        HEADER_ROW = `<tr>
                      <th>Tanggal</th>
                      <th>Jam</th>
                      <th>TMA ${UNIT_DISPLAY == "mdpl" ? "" : `(${UNIT_DISPLAY})`}</th>
                      <th>Elevasi (${
                        UNIT_DISPLAY == "m" ? "mdpl" : UNIT_DISPLAY == "cm" ? "mdpl" : UNIT_DISPLAY
                      })</th>
                      <th>Perubahan</th>
                      <th>Debit (m3/s)</th>
                      <th>Status</th>
                    </tr>`;
    }

    $(`#${idTable} thead`).html(HEADER_ROW);
    $(`#${idTable}`).DataTable({
      dom: "rti",
      paging: false,
      ordering: false,
      processing: true,
      serverSide: true,
      ajax: {
        url: URL,
        type: "POST",
        data: {
          stationId: STATION_ID,
          filterDate: filterDate,
          selectedTime: timeCategory,
          stationType: STATION_TYPE,
        },
      },
      columnDefs: COLUMNDEF,
      columns: COLUMNS,
    });
  }
  if (typePos == "WQMS") {
    switch (timeCategory) {
      case "day":
        COLUMNS = [
          {
            data: "readingDateOnly",
            name: "ReadingDateOnly",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "temperatureAvg",
            name: "TemperatureAvg",
            render: function (data) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "phAvg",
            name: "PhAvg",
            render: function (data) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "orpAvg",
            name: "OrpAvg",
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "turbidityAvg",
            name: "TurbidityAvg",
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "batteryAvg",
            name: "BatteryAvg",
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
        ];

        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3] }];

        HEADER_ROW = ` <tr>
                        <th rowspan="2" class="text-center" style="vertical-align: middle">Tanggal</th>
                        <th colspan="5" class="text-center">Rerata</th>
                      </tr>
                      <tr>
                        <th>Suhu (&degC)</th>
                        <th>pH</th>
                        <th>ORP (mV)</th>
                        <th>Turbidity (NTU)</th>
                        <th>Baterai (V)</th>
                    </tr>`;
        break;
      case "hour":
        COLUMNS = [
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "temperature",
            name: "Temperature",
            render: function (data) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "ph",
            name: "Ph",
            render: function (data) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "orp",
            name: "Orp",
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "turbidity",
            name: "Turbidity",
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "battery",
            name: "Battery",
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
        ];
        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3, 4, 5, 6] }];
        HEADER_ROW = `<tr>
                      <th>Tanggal</th>
                      <th>Jam</th>
                      <th>Suhu (&degC)</th>
                      <th>pH</th>
                      <th>ORP (mV)</th>
                      <th>Turbidity (NTU)</th>
                      <th>Baterai (V)</th>
                    </tr>`;
        break;
      default:
        COLUMNS = [
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "temperature",
            name: "Temperature",
            render: function (data) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "ph",
            name: "Ph",
            render: function (data) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "orp",
            name: "Orp",
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "turbidity",
            name: "Turbidity",
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "battery",
            name: "Battery",
            render: function (data, type, row) {
              return `<strong>${data}</strong>`;
            },
          },
        ];
        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3, 4, 5, 6] }];
        HEADER_ROW = `<tr>
                      <th>Tanggal</th>
                      <th>Jam</th>
                      <th>Suhu (&degC)</th>
                      <th>pH</th>
                      <th>ORP (mV)</th>
                      <th>Turbidity (NTU)</th>
                      <th>Baterai (V)</th>
                    </tr>`;
        break;
    }

    $(`#${idTable} thead`).html(HEADER_ROW);
    $(`#${idTable}`).DataTable({
      dom: "rti",
      paging: false,
      ordering: false,
      processing: true,
      serverSide: true,
      ajax: {
        url: URL,
        type: "POST",
        data: {
          stationId: STATION_ID,
          filterDate: filterDate,
          selectedTime: timeCategory,
          stationType: STATION_TYPE,
        },
      },
      columnDefs: COLUMNDEF,
      columns: COLUMNS,
    });
  }
  if (typePos == "AWS") {
    let flag = 0;
    switch (timeCategory) {
      case "minute":
        $("#arr-telemetry-info").fadeOut(150);
        COLUMNS = [
          {
            data: "readingAt",
            name: "ReadingAt",
            className: "text-center text-nowrap",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("HH:mm");
            },
          },
        ];

        HEADER_ROW = `<tr>
                        <th class="text-center" style="vertical-align: middle">Tanggal</th>
                        <th class="text-center" style="vertical-align: middle">Jam</th>
                        `;

        sensorNames.forEach((sensor) => {
          let obj = awsSensors[sensor];
          COLUMNS.push({
            data: sensor,
            name: capitalizeFirstLetter(sensor),
            render: function (data, type, row) {
          
              switch (sensor) {
                case "humidity":
                  return `<span class="text-dark fw-semibold">${data}%</span><br/><small class="text-muted">${row.humidityStatus}</small>`;
                case "windDirection":
                  return `<span class="text-dark fw-semibold">${data}&deg;</span><br/>
                    <small class="d-flex justify-content-center align-items-center text-muted">
                        <span style="transform: rotate(${data}deg);"><i class="mdi mdi-navigation"></i></span>
                        <span class="ms-1">${row.windDirectionStatus}</span>
                    </small>`;
                default:
                  return `<strong>${data}</strong>`;
              }
            },
          });

          HEADER_ROW += `<th class="text-center" style="vertical-align: middle">${capitalizeFirstLetter(
            awsSensors[sensor].sensorName
          )} </br> <small class="text-muted">(${obj.unit})</small></th>`;
        });

        HEADER_ROW += "</tr>";

        break;
      case "day":
        $("#arr-telemetry-info").fadeIn(150);
        COLUMNS = [
          {
            data: "readingDateOnly",
            name: "ReadingDateOnly",
            className: "text-center text-nowrap",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
        ];

        HEADER_ROW = `<tr>
                        <th class="text-center" style="vertical-align: middle">Tanggal</th>
                        `;

        sensorNames.forEach((sensor) => {
          let obj = awsSensors[sensor];
          if (sensor == "rainfall") {
            COLUMNS.push({
              data: sensor,
              name: capitalizeFirstLetter(sensor),
              createdCell: function (td, cellData, rowData, row, col) {
                $("#arr-telemetry-info").fadeIn(250);
                switch (rowData.intensity) {
                  case "Berawan":
                    $(td).addClass("bg-berawan");
                    break;

                  case "Hujan Ringan":
                    $(td).addClass("bg-hujan-ringan");
                    break;

                  case "Hujan Sedang":
                    $(td).addClass("bg-hujan-sedang");
                    break;

                  case "Hujan Lebat":
                    $(td).addClass("bg-hujan-lebat");
                    break;
                  case "Hujan Sangat Lebat":
                    $(td).addClass("bg-hujan-sangat-lebat");
                    break;
                }
              },
              render: function (data, type, row) {
                // if (data == "" || data == null || data == undefined)
                //   return "<b>-</b>";
                return `<span class="text-dark fw-semibold">${data}</span><br/><small style="color: #555555;font-weight:500;">${row.intensity}</small>`;
              },
            });
          } else {

            let colName = sensor + "Avg";

            if (sensor != "battery") {
               COLUMNS.push({
              data: colName,
              name: capitalizeFirstLetter(colName),
              render: function (data, type, row) {
                if (data == "" || data == null || data == undefined)
                  return "<b>-</b>";

                switch (sensor) {
                  case "humidity":
                    return `<span class="text-dark fw-semibold">${data}%</span><br/><small class="text-muted">${row.humidityStatus}</small>`;
                  case "windDirection":
                    return `<span class="text-dark fw-semibold">${data}&deg;</span><br/>
                    <small class="d-flex justify-content-center align-items-center text-muted">
                        <span style="transform: rotate(${data}deg);"><i class="mdi mdi-navigation"></i></span>
                        <span class="ms-1">${row.windDirectionStatus}</span>
                    </small>`;
                  default:
                    return `<strong>${data}</strong>`;
                }
              },
            });
            }

           
          }

          if (sensor != "battery") {
              HEADER_ROW += `<th class="text-center" style="vertical-align: middle">${capitalizeFirstLetter(
              awsSensors[sensor].sensorName
            )} </br> <small class="text-muted">(${obj.unit})</small></th>`;
          }
         
        });

        HEADER_ROW += "</tr>";

        break;
      default:
        $("#arr-telemetry-info").fadeIn(150);
        COLUMNS = [
          {
            data: "readingHour",
            name: "ReadingHour",
            className: "text-center text-nowrap",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("HH:mm");
            },
          },
        ];

        HEADER_ROW = `<tr>
                        <th class="text-center" style="vertical-align: middle">Tanggal</th>
                        <th class="text-center" style="vertical-align: middle">Jam</th>
                        `;

        sensorNames.forEach((sensor) => {
          let obj = awsSensors[sensor];
          if (sensor == "rainfall") {
            COLUMNS.push({
              data: sensor,
              name: capitalizeFirstLetter(sensor),
              createdCell: function (td, cellData, rowData, row, col) {
                $("#arr-telemetry-info").fadeIn(250);
                switch (rowData.intensity) {
                  case "Berawan":
                    $(td).addClass("bg-berawan");
                    break;

                  case "Hujan Ringan":
                    $(td).addClass("bg-hujan-ringan");
                    break;

                  case "Hujan Sedang":
                    $(td).addClass("bg-hujan-sedang");
                    break;

                  case "Hujan Lebat":
                    $(td).addClass("bg-hujan-lebat");
                    break;
                  case "Hujan Sangat Lebat":
                    $(td).addClass("bg-hujan-sangat-lebat");
                    break;
                }
              },
              render: function (data, type, row) {
                // if (data == "" || data == null || data == undefined)
                //   return "<b>-</b>";
                return `<span class="text-dark fw-semibold">${data}</span><br/><small style="color: #555555;font-weight:500;">${row.intensity}</small>`;
              },
            });
          } else {
            COLUMNS.push({
              data: sensor,
              name: capitalizeFirstLetter(sensor),
              render: function (data, type, row) {
                if (data == "" || data == null || data == undefined)
                  return "<b>-</b>";

                switch (sensor) {
                  case "humidity":
                    return `<span class="text-dark fw-semibold">${data}%</span><br/><small class="text-muted">${row.humidityStatus}</small>`;
                  case "windDirection":
                    return `<span class="text-dark fw-semibold">${data}&deg;</span><br/>
                    <small class="d-flex justify-content-center align-items-center text-muted">
                        <span style="transform: rotate(${data}deg);"><i class="mdi mdi-navigation"></i></span>
                        <span class="ms-1">${row.windDirectionStatus}</span>
                    </small>`;
                  default:
                    return `<strong>${data}</strong>`;
                }
              },
            });
          }

          HEADER_ROW += `<th class="text-center" style="vertical-align: middle">${capitalizeFirstLetter(
            awsSensors[sensor].sensorName
          )} </br> <small class="text-muted">(${obj.unit})</small></th>`;
        });

        HEADER_ROW += "</tr>";

        break;
    }

    $(`#${idTable} thead`).html(HEADER_ROW);
    $(`#${idTable}`).DataTable({
      dom: "rti",
      paging: false,
      ordering: false,
      processing: true,
      serverSide: true,
      scrollX: false,
      ajax: {
        url: URL,
        type: "POST",
        data: {
          stationId: STATION_ID,
          filterDate: filterDate,
          selectedTime: timeCategory,
          stationType: STATION_TYPE,
        },
      },
      columnDefs: COLUMNDEF,
      columns: COLUMNS,
      language: {
        emptyTable: function () {
            const currentHour = parseInt(moment().format('HH'));
            if ( filterDate === moment().format('YYYY-MM-DD') && currentHour < 7) {
                return `Data yang tersedia pada tanggal ${moment(filterDate).format('D MMMM YYYY')} dimulai pukul 07:00 Pagi`;
            } else {
                return 'No data available';
            }
        }
      }
    });
  }
  if (typePos == "V-Notch") {
    switch (timeCategory) {
      case "day":
        COLUMNS = [
          {
            data: "readingDateOnly",
            name: "ReadingDateOnly",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "waterLevelAvg",
            name: "WaterLevelAvg",
            render: function (data) {
              return `<strong>${data} cm</strong>`;
            },
          },
          {
            data: "waterLevelMin",
            name: "WaterLevelMin",
            render: function (data) {
              return `<strong>${data} cm</strong>`;
            },
          },
          {
            data: "waterLevelMax",
            name: "WaterLevelMax",
            render: function (data) {
              return `<strong>${data} cm</strong>`;
            },
          },
          {
            data: "debitAvg",
            name: "DebitAvg",
            render: function (data) {
              return `<strong>${data} L/s</strong>`;
            },
          },
          {
            data: "debitMin",
            name: "DebitMin",
            render: function (data) {
              return `<strong>${data} L/s</strong>`;
            },
          },
          {
            data: "debitMax",
            name: "DebitMax",
            render: function (data) {
              return `<strong>${data} L/s</strong>`;
            },
          },
        ];

        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3, 4, 5, 6] }];

        HEADER_ROW = ` <tr>
                      <th>Tanggal</th>
                      <th>TMA Rerata</th>
                      <th>TMA Minimum</th>
                      <th>TMA Maksimum</th>
                      <th>Debit Rerata</th>
                      <th>Debit Minimum</th>
                      <th>TMA Maksimum</th>
                    </tr>`;
        break;
      case "hour":
        COLUMNS = [
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "waterLevel",
            name: "WaterLevel",
            render: function (data) {
              if (IS_ONLY_MDPL) {
                return null;
              }
              return `<strong>${data} cm</strong>`;
            },
          },
          {
            data: "changeStatus",
            name: "ChangeStatus",
            render: function (data, type, row) {
              if (data == null || data == "" || data == "constant") return "";
              if (data == "decrease") {
                return `<span><i class="mdi mdi-arrow-down-circle text-success font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue} </span>`;
              }
              if (data == "increase") {
                return `<span><i class="mdi mdi-arrow-up-circle text-danger font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue} </span>`;
              }
            },
          },
          {
            data: "debit",
            name: "Debit",
            render: function (data) {
              if (data == null) {
                return "";
              }
              return `<strong>${data} L/s</strong>`;
            },
          },

          {
            data: "battery",
            name: "Battery",
            render: function (data, type, row) {
              if (data == null) {
                return "";
              }
              return `<strong>${data}</strong>`;
            },
          },
        ];
        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3, 4, 5] }];
        HEADER_ROW = `<tr>
                      <th>Tanggal</th>
                      <th>Jam</th>
                      <th>TMA</th>
                      <th>Perubahan </th>
                      <th>Debit</th>
                      <th>Baterai (V)</th>
                    </tr>`;
        break;
      default:
        COLUMNS = [
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "waterLevel",
            name: "WaterLevel",
            render: function (data) {
              if (IS_ONLY_MDPL) {
                return null;
              }
              return `<strong>${data} cm</strong>`;
            },
          },
          {
            data: "changeStatus",
            name: "ChangeStatus",
            render: function (data, type, row) {
              if (data == null || data == "" || data == "constant") return "";
              if (data == "decrease") {
                return `<span><i class="mdi mdi-arrow-down-circle text-success font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue}</span>`;
              }
              if (data == "increase") {
                return `<span><i class="mdi mdi-arrow-up-circle text-danger font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue}</span>`;
              }
            },
          },
          {
            data: "debit",
            name: "Debit",
            render: function (data) {
              if (data == null) {
                return "";
              }
              return `<strong>${data} L/s</strong>`;
            },
          },
          {
            data: "battery",
            name: "Battery",
            render: function (data, type, row) {
              if (data == null) {
                return "";
              }
              return `<strong>${data}</strong>`;
            },
          },
        ];
        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3, 4, 5] }];
        HEADER_ROW = `<tr>
                      <th>Tanggal</th>
                      <th>Jam</th>
                      <th>TMA</th>
                      <th>Perubahan </th>
                      <th>Debit</th>
                      <th>Baterai (V)</th>
                    </tr>`;
        break;
    }

    $(`#${idTable} thead`).html(HEADER_ROW);
    $(`#${idTable}`).DataTable({
      dom: "rti",
      paging: false,
      ordering: false,
      processing: true,
      serverSide: true,
      ajax: {
        url: URL,
        type: "POST",
        data: {
          stationId: STATION_ID,
          filterDate: filterDate,
          selectedTime: timeCategory,
          stationType: STATION_TYPE,
        },
      },
      columnDefs: COLUMNDEF,
      columns: COLUMNS,
    });
  }
  if (typePos == "Piezometer") {
    switch (timeCategory) {
      case "day":
        COLUMNS = [
          {
            data: "readingDateOnly",
            name: "ReadingDateOnly",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "-";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "waterLevelAvg",
            name: "WaterLevelAvg",
            render: function (data) {
              return `<strong>${data} ${UNIT_DISPLAY}</strong>`;
            },
          },
          {
            data: "waterLevelMin",
            name: "WaterLevelMin",
            render: function (data) {
              return `<strong>${data} ${UNIT_DISPLAY}</strong>`;
            },
          },
          {
            data: "waterLevelMax",
            name: "WaterLevelMax",
            render: function (data) {
              return `<strong>${data} ${UNIT_DISPLAY}</strong>`;
            },
          },
          
        ];

        COLUMNDEF = [{ className: "dt-center", targets: [0, 1, 2, 3] }];

        HEADER_ROW = ` <tr>
                        <th>Tanggal</th>
                        <th>TMA Rerata</th>
                        <th>TMA Minimum</th>
                        <th>TMA Maksimum</th>
                      </tr>`;
        break;
      case "hour":
        COLUMNS = [
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "-";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "-";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "waterLevel",
            name: "WaterLevel",
            render: function (data) {
              if (IS_ONLY_MDPL) {
                return null;
              }
              return `<strong>${data} ${UNIT_DISPLAY}</strong>`;
            },
          },
          {
            data: "changeStatus",
            name: "ChangeStatus",
            render: function (data, type, row) {
              if (data == null || data == "" || data == "constant") return "-";
              if (data == "decrease") {
                return `<span><i class="mdi mdi-arrow-down-circle text-success font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue} </span>`;
              }
              if (data == "increase") {
                return `<span><i class="mdi mdi-arrow-up-circle text-danger font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue} </span>`;
              }
            },
          },
          
          {
            data: "battery",
            name: "Battery",
            render: function (data, type, row) {
              if (data == null) {
                return "";
              }
              return `<strong>${data}</strong>`;
            },
          },
        ];
        COLUMNDEF = [{ className: "dt-center", targets: [0, 1, 2, 3, 4] }];
        HEADER_ROW = `<tr>
                      <th>Tanggal</th>
                      <th>Jam</th>
                      <th>TMA (${UNIT_DISPLAY})</th>
                      <th>Perubahan </th>
                      <th>Baterai (V)</th>
                    </tr>`;
        break;
      default:
        COLUMNS = [
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "-";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "-";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "waterLevel",
            name: "WaterLevel",
            render: function (data) {
              if (IS_ONLY_MDPL) {
                return null;
              }
              return `<strong>${data} ${UNIT_DISPLAY}</strong>`;
            },
          },
          {
            data: "changeStatus",
            name: "ChangeStatus",
            render: function (data, type, row) {
              if (data == null || data == "" || data == "constant") return "-";
              if (data == "decrease") {
                return `<span><i class="mdi mdi-arrow-down-circle text-success font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue}</span>`;
              }
              if (data == "increase") {
                return `<span><i class="mdi mdi-arrow-up-circle text-danger font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue}</span>`;
              }
            },
          },
  
          {
            data: "battery",
            name: "Battery",
            render: function (data, type, row) {
              if (data == null) {
                return "-";
              }
              return `<strong>${data}</strong>`;
            },
          },
        ];
        COLUMNDEF = [{ className: "dt-center", targets: [0, 1, 2, 3, 4] }];
        HEADER_ROW = `<tr>
                      <th>Tanggal</th>
                      <th>Jam</th>
                      <th>TMA (${UNIT_DISPLAY})</th>
                      <th>Perubahan </th>
                      <th>Baterai (V)</th>
                    </tr>`;
        break;
    }

    $(`#${idTable} thead`).html(HEADER_ROW);
    $(`#${idTable}`).DataTable({
      dom: "rti",
      paging: false,
      ordering: false,
      processing: true,
      serverSide: true,
      ajax: {
        url: URL,
        type: "POST",
        data: {
          stationId: STATION_ID,
          filterDate: filterDate,
          selectedTime: timeCategory,
          stationType: STATION_TYPE,
        },
      },
      columnDefs: COLUMNDEF,
      columns: COLUMNS,
    });
  }
  if (typePos == "AWLR_ARR") {
    switch (timeCategory) {
      case "day":
        $("#awlr-telemetry-info").fadeOut(100);
        $("#arr-telemetry-info").fadeIn(250);
         COLUMNS = [
           {
             data: "readingDateOnly",
             name: "readingDateOnly",
             render: function (data, type, row) {
               if (data == "" || data == null || data == undefined) return "";
               return moment(data).locale("id").format("D MMMM YYYY");
             },
           },
           {
             data: "waterLevelAvg",
             name: "WaterLevelAvg",
             render: function (data) {
               if (IS_ONLY_MDPL) {
                 return "-";
               }
               return `<strong>${data}</strong>`;
             },
           },
           {
             data: "waterLevelMin",
             name: "WaterLevelMin",
             render: function (data) {
               if (IS_ONLY_MDPL) {
                 return "-";
               }
               return `<strong>${data}</strong>`;
             },
           },
           {
             data: "waterLevelMax",
             name: "WaterLevelMax",
             render: function (data) {
               if (IS_ONLY_MDPL) {
                 return "-";
               }
               return `<strong>${data}</strong>`;
             },
           },
           {
             data: "rainfall",
             name: "Rainfall",
             render: function (data) {
               if (data == null) {
                 return "-";
               }
               return `<strong>${data}</strong>`;
             },
           },
           {
             data: "intensity",
             name: "Intensity",
             createdCell: function (td, cellData, rowData, row, col) {
               generateStyleRainfall(td, cellData, rowData, row, col);
             },
             render: function (data) {
               if (data == null) {
                 return "-";
               }
               return `<strong>${data}</strong>`;
             },
           }
         ];
        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3, 4, 5] }];
        HEADER_ROW = `<tr>
                        <th rowspan="2">Tanggal</th>
                        <th colspan="3">Tinggi Muka Air</th>
                        <th colspan="2">Curah Hujan</th>
                      </tr>
                      <tr>
                        <th>TMA Rerata (m)</th>
                        <th>TMA Minimum (m)</th>
                        <th>TMA Maksimum (m)</th>
                        <th>CH (mm)</th>
                        <th>Intensitas</th>
                      </tr>`;
        break;
      case "hour":
        $("#awlr-telemetry-info").fadeIn(250);
        $("#arr-telemetry-info").fadeIn(250);
        COLUMNS = [
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingHour",
            name: "ReadingHour",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "waterLevel",
            name: "WaterLevel",
            createdCell: function (td, cellData, rowData, row, col) {
              generateStyleWaterLevel(td, cellData, rowData, row, col);
            },
            render: function (data) {
              if (IS_ONLY_MDPL) {
                return "-";
              }
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "changeStatus",
            name: "ChangeStatus",
            render: function (data, type, row) {
              if (data == null || data == "" || data == "constant") return "-";
              if (data == "decrease") {
                return `<span><i class="mdi mdi-arrow-down-circle text-success font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue} </span>`;
              }
              if (data == "increase") {
                return `<span><i class="mdi mdi-arrow-up-circle text-danger font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue} </span>`;
              }
            },
          },
          {
            data: "debit",
            name: "Debit",
            render: function (data) {
              if (data == null) {
                return "-";
              }
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "rainfall",
            name: "Rainfall",
            render: function (data) {
              if (data == null) {
                return "-";
              }
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "intensity",
            name: "Intensity",
            createdCell: function (td, cellData, rowData, row, col) {
              generateStyleRainfall(td, cellData, rowData, row, col);
            },
            render: function (data) {
              if (data == null) {
                return "-";
              }
              return `<strong>${data}</strong>`;
            },
          },

          {
            data: "battery",
            name: "Battery",
            render: function (data, type, row) {
              if (data == null) {
                return "-";
              }
              return `<strong>${data}</strong>`;
            },
          },
        ];
        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3, 4, 5] }];
        HEADER_ROW = `<tr>
                        <th rowspan="2">Tanggal</th>
                        <th rowspan="2">Jam</th>
                        <th colspan="3">Tinggi Muka Air</th>
                        <th colspan="2">Curah Hujan</th>
                        <th rowspan="2">Baterai (V)</th>
                      </tr>
                      <tr>
                        <th>TMA (${UNIT_DISPLAY})</th>
                        <th>Perubahan</th>
                        <th>Debit</th>
                        <th>CH (mm)</th>
                        <th>Intensitas</th>
                      </tr>`;
        break;
      default:
        $("#awlr-telemetry-info").fadeIn(250);
        $("#arr-telemetry-info").fadeOut(200);
        COLUMNS = [
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "";
              return moment(data).locale("id").format("D MMMM YYYY");
            },
          },
          {
            data: "readingAt",
            name: "ReadingAt",
            render: function (data, type, row) {
              if (data == "" || data == null || data == undefined) return "-";
              return moment(data).locale("id").format("HH:mm");
            },
          },
          {
            data: "waterLevel",
            name: "WaterLevel",
            createdCell: function (td, cellData, rowData, row, col) {
              generateStyleWaterLevel(td, cellData, rowData, row, col);
            },
            render: function (data) {
              if (IS_ONLY_MDPL) {
                return "-";
              }
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "changeStatus",
            name: "ChangeStatus",
            render: function (data, type, row) {
              if (data == null || data == "" || data == "constant") return "-";
              if (data == "decrease") {
                return `<span><i class="mdi mdi-arrow-down-circle text-success font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue}</span>`;
              }
              if (data == "increase") {
                return `<span><i class="mdi mdi-arrow-up-circle text-danger font-weight-bold"
                                style="font-size: 15px;"></i> ${row.changeValue}</span>`;
              }
            },
          },
          {
            data: "debit",
            name: "Debit",
            render: function (data) {
              if (data == null) {
                return "-";
              }
              return `<strong>${data} L/s</strong>`;
            },
          },
          {
            data: "rainfall",
            name: "Rainfall",
            render: function (data) {
              if (data == null) {
                return "-";
              }
              return `<strong>${data}</strong>`;
            },
          },
          {
            data: "battery",
            name: "Battery",
            render: function (data, type, row) {
              if (data == null) {
                return "-";
              }
              return `<strong>${data}</strong>`;
            },
          },
        ];
        COLUMNDEF = [{ className: "dt-center", targets: [1, 2, 3, 4, 5] }];
        HEADER_ROW = `<tr>
                        <th rowspan="2">Tanggal</th>
                        <th rowspan="2">Jam</th>
                        <th colspan="3">Tinggi Muka Air</th>
                        <th>Curah Hujan</th>
                        <th rowspan="2">Baterai (V)</th>
                      </tr>
                      <tr>
                        <th>TMA (${UNIT_DISPLAY})</th>
                        <th>Perubahan</th>
                        <th>Debit</th>
                        <th>CH (mm)</th>
                      </tr>`;
        break;
    }

    $(`#${idTable} thead`).html(HEADER_ROW);
    $(`#${idTable}`).DataTable({
      dom: "rti",
      paging: false,
      ordering: false,
      processing: true,
      serverSide: true,
      ajax: {
        url: URL,
        type: "POST",
        data: {
          stationId: STATION_ID,
          filterDate: filterDate,
          selectedTime: timeCategory,
          stationType: STATION_TYPE,
        },
      },
      columnDefs: COLUMNDEF,
      columns: COLUMNS,
    });
  }
}
/* -------- END Function untuk Generate DataTable ARR / AWLR / WQMS ----------*/

/* -------- Function untuk Generate Grafik ARR/ AWLR ------------- */
function loadGrafik(timeCategory, filterDate) {
  let URL = "/Station/GetDataGrafikArr";
  if (STATION_TYPE == "AWLR") {
    URL = "/Station/GetDataGrafikAwlr";
  }
  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      selectedTime: timeCategory,
      stationType: STATION_TYPE,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-grafik"> 
                                    <h5 class="text-secondary" id="not-exist-1">Loading ...</h5>
                                </div>`;
      if (!document.getElementById("not-exist-1")) {
        $("#container").append(label);
      }
    },
    success: function (data) {
      $("#info-no-grafik").remove();
      if (data.dataGrafik.length == 0) {
        const chart = document.getElementById("container");

        if (typeof Highcharts !== "undefined" && chart && GRAFIK_ARR) {
          GRAFIK_ARR.destroy();
          GRAFIK_ARR = null;
        }
        if (typeof Highcharts !== "undefined" && chart && GRAFIK_AWLR) {
          GRAFIK_AWLR.destroy();
          GRAFIK_AWLR = null;
        }

        const label = `<div class="text-center" id="info-no-grafik"> 
                                    <h5 class="text-secondary" id="not-exist-1">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById("not-exist-1")) {
          $("#container").append(label);
        }
        if (STATION_TYPE == "ARR") {
          $("#label-grafik").hide();
        }

        return;
      } else {
        if (document.getElementById("info-no-grafik")) {
          $("#info-no-grafik").remove();
        }
        if (STATION_TYPE == "ARR") {
          generateGrafikArr(filterDate, data);
          $("#label-grafik").fadeIn(250);
        }
        if (STATION_TYPE == "AWLR") {
          if (IS_ONLY_MDPL) {
            generateGrafikElevation(filterDate, data);
          } else {
            generateGrafikAwlr(filterDate, data);
          }
        }
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadGrafikAwlrArrTmaCh(timeCategory, filterDate) {
  let URL = "/Station/GetDataGrafikAwlrArr";
  
  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      selectedTime: timeCategory,
      stationType: STATION_TYPE,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-grafik-awlr-arr"> 
                                    <h5 class="text-secondary" id="not-exist-1-awlr-arr">Loading ...</h5>
                                </div>`;
      if (!document.getElementById("not-exist-1-awlr-arr")) {
        $("#container-tma-ch-awlr-arr").append(label);
      }
    },
    success: function (data) {
      $("#info-no-grafik-awlr-arr").remove();
      if (data.dataGrafik.length == 0) {
        const chart = document.getElementById("container-tma-ch-awlr-arr");

        if (typeof Highcharts !== "undefined" && chart && GRAFIK_AWLR_ARR_TMA_CH) {
          GRAFIK_AWLR_ARR_TMA_CH.destroy();
          GRAFIK_AWLR_ARR_TMA_CH = null;
        }
       
        const label = `<div class="text-center" id="info-no-grafik-awlr-arr"> 
                                    <h5 class="text-secondary" id="not-exist-1-awlr-arr">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById("not-exist-1-awlr-arr")) {
          $("#container-tma-ch-awlr-arr").append(label);
        }

        return;
      } else {
        if (document.getElementById("info-no-grafik-awlr-arr")) {
          $("#info-no-grafik-awlr-arr").remove();
        }
        generateGrafikAwlrArrTmaCh(filterDate,data);
       
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadGrafikWaterQuality(sensor, filterDate) {
  let URL = "/Station/GetDataGrafikBySensor";
  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      sensor: sensor,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-${sensor}"> 
                                    <h5 class="text-secondary" id="not-exist-${sensor}">Loading ...</h5>
                                </div>`;
      if (!document.getElementById(`not-exist-${sensor}`)) {
        $(`#container-${sensor}`).append(label);
      }
    },
    success: function (data) {
      $(`#info-no-${sensor}`).remove();

      if (data.length == 0) {
        const chart = document.getElementById("container-battery");

        if (typeof Highcharts !== "undefined" && chart && GRAFIK_SENSOR_WQ) {
          GRAFIK_SENSOR_WQ.destroy();
          GRAFIK_SENSOR_WQ = null;
        }

        const label = `<div class="text-center" id="info-no-${sensor}"> 
                                    <h5 class="text-secondary" id="not-exist-${sensor}">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById(`not-exist-${sensor}`)) {
          $(`#container-${sensor}`).append(label);
        }
      } else {
        generateGrafikWqBySensor(sensor, filterDate, data);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}
// Function to get value and index by key
function getValueAndIndexByKey(array, key) {
  // Iterate over the array
  for (let i = 0; i < array.length; i++) {
    // Check if the current object has the specified key
    if (key in array[i]) {
      // Return an object containing both the value and index
      return { value: array[i][key], index: i };
    }
  }
  // Return null if key is not found in any object
  return null;
}

function loadGrafikAWS(sensor, filterDate) {
  let URL = "/Station/GetDataGrafikAWSBySensor";
  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      sensor: sensor,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-${sensor}"> 
                                    <h5 class="text-secondary" id="not-exist-${sensor}">Loading ...</h5>
                                </div>`;
      if (!document.getElementById(`not-exist-${sensor}`)) {
        $(`#container-${sensor}-aws`).append(label);
      }
    },
    success: function (data) {
      $(`#info-no-${sensor}`).remove();

      if (data.length == 0) {
        const chart = document.getElementById(`container-${sensor}-aws`);

        let index = getValueAndIndexByKey(dynamicValues, `${sensor}-aws`).index;

        if (sensor == "windDirection") {
          if (
            typeof Highcharts !== "undefined" &&
            chart &&
            GRAFIK_WIND_DIRECTION
          ) {
            GRAFIK_WIND_DIRECTION.destroy();
            GRAFIK_WIND_DIRECTION = null;
          }
        } else {
          if (
            typeof Highcharts !== "undefined" &&
            chart &&
            dynamicValues[index][`${sensor}-aws`]
          ) {
            dynamicValues[index][`${sensor}-aws`].destroy();
            dynamicValues[index][`${sensor}-aws`] = null;
          }
        }

        const label = `<div class="text-center" id="info-no-${sensor}"> 
                                    <h5 class="text-secondary" id="not-exist-${sensor}">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById(`not-exist-${sensor}`)) {
          $(`#container-${sensor}-aws`).append(label);
        }
      } else {
        if (sensor == "windDirection") {
          generateSensorWindDirection(filterDate, data);
        } else {
          generateGrafikAWSBySensor(sensor, filterDate, data);
        }
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadGrafikVNotch(column, filterDate) {
  let URL = "/Station/GetDataGrafikVNotchByColumn";
  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      column: column,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-${column}-vnotch"> 
                                    <h5 class="text-secondary" id="not-exist-${column}-vnotch">Loading ...</h5>
                                </div>`;
      if (!document.getElementById(`not-exist-${column}-vnotch`)) {
        $(`#container-${column}-vnotch`).append(label);
      }
    },
    success: function (data) {
      $(`#info-no-${column}-vnotch`).remove();

      if (data.length == 0) {
        const chart = document.getElementById(`#container-${column}-vnotch`);

        if (typeof Highcharts !== "undefined" && chart && GRAFIK_VNOTCH) {
          GRAFIK_VNOTCH.destroy();
          GRAFIK_VNOTCH = null;
        }

        const label = `<div class="text-center" id="info-no-${column}-vnotch"> 
                                    <h5 class="text-secondary" id="not-exist-${column}-vnotch">Loading ...</h5>
                                </div>`;
        if (!document.getElementById(`not-exist-${column}-vnotch`)) {
          $(`#container-${column}-vnotch`).append(label);
        }
      } else {
        generateGrafikVNotchByColumn(column, filterDate, data);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadGrafikPiezometer(column, filterDate) {
  let URL = "/Station/GetDataGrafikPiezometerByColumn";
  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      column: column,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-${column}-piezometer"> 
                                    <h5 class="text-secondary" id="not-exist-${column}-piezometer">Loading ...</h5>
                                </div>`;
      if (!document.getElementById(`not-exist-${column}-piezometer`)) {
        $(`#container-${column}-piezometer`).append(label);
      }
    },
    success: function (data) {
      $(`#info-no-${column}-piezometer`).remove();

      if (data.length == 0) {
        const chart = document.getElementById(`#container-${column}-piezometer`);

        if (typeof Highcharts !== "undefined" && chart && GRAFIK_PIEZOMETER) {
          GRAFIK_PIEZOMETER.destroy();
          GRAFIK_PIEZOMETER = null;
        }

        const label = `<div class="text-center" id="info-no-${column}-piezometer"> 
                                    <h5 class="text-secondary" id="not-exist-${column}-piezometer">Loading ...</h5>
                                </div>`;
        if (!document.getElementById(`not-exist-${column}-piezometer`)) {
          $(`#container-${column}-piezometer`).append(label);
        }
      } else {
        generateGrafikPiezometerByColumn(column, filterDate, data);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadGrafikBattery(timeCategory, filterDate) {
  let URL = "/Station/GetDataGrafikArr";
  if (STATION_TYPE == "AWLR") {
    URL = "/Station/GetDataGrafikAwlr";
  }
  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      selectedTime: timeCategory,
      stationType: STATION_TYPE,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-grafik-battery"> 
                                    <h5 class="text-secondary" id="not-exist-2">Loading ...</h5>
                                </div>`;
      if (!document.getElementById("not-exist-2")) {
        $("#container-battery").append(label);
      }
    },
    success: function (data) {
      $("#info-no-grafik-battery").remove();
      if (data.dataGrafikBattery.length == 0) {
        const chart = document.getElementById("container-battery");

        if (typeof Highcharts !== "undefined" && chart && GARIFK_BATTERY) {
          GARIFK_BATTERY.destroy();
          GARIFK_BATTERY = null;
        }

        const label = `<div class="text-center" id="info-no-grafik-battery"> 
                                    <h5 class="text-secondary" id="not-exist-2">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById("not-exist-2")) {
          $("#container-battery").append(label);
        }
        return;
      } else {
        if (document.getElementById("info-no-grafik-battery")) {
          $("#info-no-grafik-battery").remove();
        }
        generateGrafikBattery(filterDate, data);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadGrafikBatteryAwlrArr(timeCategory, filterDate) {
  let URL = "/Station/GetDataGrafikBatteryAwlrArr";
  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      selectedTime: timeCategory,
      stationType: STATION_TYPE,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-grafik-battery-awlr-arr"> 
                                    <h5 class="text-secondary" id="not-exist-2">Loading ...</h5>
                                </div>`;
      if (!document.getElementById("not-exist-2")) {
        $("#container-battery-awlr-arr").append(label);
      }
    },
    success: function (data) {
      $("#info-no-grafik-battery-awlr-arr").remove();
      if (data.length == 0) {
        const chart = document.getElementById("container-battery-awlr-arr");

        if (typeof Highcharts !== "undefined" && chart && GARIFK_BATTERY) {
          GARIFK_BATTERY.destroy();
          GARIFK_BATTERY = null;
        }

        const label = `<div class="text-center" id="info-no-grafik-battery-awlr-arr"> 
                                    <h5 class="text-secondary" id="not-exist-2">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById("not-exist-2")) {
          $("#container-battery-awlr-arr").append(label);
        }
        return;
      } else {
        if (document.getElementById("info-no-grafik-battery-awlr-arr")) {
          $("#info-no-grafik-battery-awlr-arr").remove();
        }
        generateGrafikBatteryAwlrArr(filterDate, data);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadGrafikDebit(timeCategory, filterDate) {
  let URL = "/Station/GetDataGrafikAwlr";

  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      selectedTime: timeCategory,
      stationType: STATION_TYPE,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-grafik-debit"> 
                                    <h5 class="text-secondary" id="not-exist-3">Loading ...</h5>
                                </div>`;
      if (!document.getElementById("not-exist-3")) {
        $("#container-debit").append(label);
      }
    },
    success: function (data) {
      $("#info-no-grafik-debit").remove();
      if (data.dataGrafikDebit.length == 0) {
        const chart = document.getElementById("container-debit");

        if (typeof Highcharts !== "undefined" && chart && GARIFK_DEBIT) {
          GARIFK_DEBIT.destroy();
          GARIFK_DEBIT = null;
        }

        const label = `<div class="text-center" id="info-no-grafik-debit"> 
                                    <h5 class="text-secondary" id="not-exist-3">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById("not-exist-3")) {
          $("#container-debit").append(label);
        }
        return;
      } else {
        if (document.getElementById("info-no-grafik-debit")) {
          $("#info-no-grafik-debit").remove();
        }
        generateGrafikDebit(filterDate, data);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadGrafikDebitAwlrArr(timeCategory, filterDate) {
  let URL = "/Station/GetDataGrafikDebitAwlrArr";

  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      selectedTime: timeCategory,
      stationType: STATION_TYPE,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-grafik-debit-awlr-arr"> 
                                    <h5 class="text-secondary" id="not-exist-3">Loading ...</h5>
                                </div>`;
      if (!document.getElementById("not-exist-3")) {
        $("#container-debit-awlr-arr").append(label);
      }
    },
    success: function (data) {
      $("#info-no-grafik-debit-awlr-arr").remove();
      if (data.length == 0) {
        const chart = document.getElementById("container-debit-awlr-arr");

        if (typeof Highcharts !== "undefined" && chart && GARIFK_DEBIT) {
          GARIFK_DEBIT.destroy();
          GARIFK_DEBIT = null;
        }

        const label = `<div class="text-center" id="info-no-grafik-debit-awlr-arr"> 
                                    <h5 class="text-secondary" id="not-exist-3">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById("not-exist-3")) {
          $("#container-debit-awlr-arr").append(label);
        }
        return;
      } else {
        if (document.getElementById("info-no-grafik-debit-awlr-arr")) {
          $("#info-no-grafik-debit-awlr-arr").remove();
        }
        generateGrafikDebitAwlrArr(filterDate, data);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadGrafikTmaPerDAS(filterDate) {
  let URL = "/Station/GetDataGrafikAwlrPerDas";

  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-grafik-per-das"> 
                                    <h5 class="text-secondary" id="not-exist-5">Loading ...</h5>
                                </div>`;
      if (!document.getElementById("not-exist-5")) {
        $("#container-per-das").append(label);
      }
    },
    success: function (data) {
      $("#info-no-grafik-per-das").remove();

      if (data.length == 0) {
        const chart = document.getElementById("container-per-das");

        if (typeof Highcharts !== "undefined" && chart && GARIFK_PER_DAS) {
          GARIFK_PER_DAS.destroy();
          GARIFK_PER_DAS = null;
        }

        const label = `<div class="text-center" id="info-no-grafik-per-das"> 
                                    <h5 class="text-secondary" id="not-exist-5">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById("not-exist-5")) {
          $("#container-per-das").append(label);
        }
        return;
      } else {
        if (document.getElementById("info-no-grafik-per-das")) {
          $("#info-no-grafik-per-das").remove();
        }
        generateGrafikAwlrPerDAS(data, filterDate);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadGrafikChHarian(timeCategory, filterDate) {
  let URL = "/Station/GetDataGrafikArrDay";
  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      selectedTime: timeCategory,
      stationType: STATION_TYPE,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-grafik-ch-harian"> 
                                    <h5 class="text-secondary" id="not-exist-4">Loading ...</h5>
                                </div>`;
      if (!document.getElementById("not-exist-4")) {
        $("#container-ch-harian").append(label);
      }
    },
    success: function (data) {
      $("#info-no-grafik-ch-harian").remove();
      if (data.dataGrafik.length == 0) {
        const chart = document.getElementById("container-ch-harian");

        if (typeof Highcharts !== "undefined" && chart && GARIFK_CH_HARIAN) {
          GARIFK_CH_HARIAN.destroy();
          GARIFK_CH_HARIAN = null;
        }

        const label = `<div class="text-center" id="info-no-grafik-ch-harian"> 
                                    <h5 class="text-secondary" id="not-exist-4">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById("not-exist-4")) {
          $("#container-ch-harian").append(label);
        }
        $("#label-grafik-ch-harian").fadeOut(100);
        return;
      } else {
        if (document.getElementById("info-no-grafik-ch-harian")) {
          $("#info-no-grafik-ch-harian").remove();
        }
        $("#label-grafik-ch-harian").fadeIn(250);
        generateGrafikArrHarian(filterDate, data);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadGrafikChHarianAwlrArr(timeCategory, filterDate) {
  let URL = "/Station/GetDataGrafikChDayAwlrArr";
  $.ajax({
    url: URL,
    type: "POST",
    data: {
      stationId: STATION_ID,
      filterDate: filterDate,
      selectedTime: timeCategory,
      stationType: STATION_TYPE,
    },
    beforeSend: function () {
      const label = `<div class="text-center" id="info-no-grafik-ch-harian-awlr-arr"> 
                                    <h5 class="text-secondary" id="not-exist-4">Loading ...</h5>
                                </div>`;
      if (!document.getElementById("not-exist-4")) {
        $("#container-ch-harian-awlr-arr").append(label);
      }
    },
    success: function (data) {
      $("#info-no-grafik-ch-harian-awlr-arr").remove();
      if (data.length == 0) {
        const chart = document.getElementById("container-ch-harian-awlr-arr");

        if (typeof Highcharts !== "undefined" && chart && GARIFK_CH_HARIAN) {
          GARIFK_CH_HARIAN.destroy();
          GARIFK_CH_HARIAN = null;
        }

        const label = `<div class="text-center" id="info-no-grafik-ch-harian-awlr-arr"> 
                                    <h5 class="text-secondary" id="not-exist-4">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById("not-exist-4")) {
          $("#container-ch-harian-awlr-arr").append(label);
        }
        $("#label-grafik-ch-harian-awlr-arr").fadeOut(100);
        return;
      } else {
        if (document.getElementById("info-no-grafik-ch-harian-awlr-arr")) {
          $("#info-no-grafik-ch-harian-awlr-arr").remove();
        }
        $("#label-grafik-ch-harian-awlr-arr").fadeIn(250);
        generateGrafikArrHarianAwlrArr(filterDate, data);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function generateGrafikArr(periode, data) {
  let DATA_SERIES_ARR = generateDataSeriesGrafik(data.dataGrafik);
  let formattedDate = "";
  let date = moment(periode, "YYYY-MM-DD");
  formattedDate = date.locale("id").format("DD MMMM YYYY");

  /* Initialisasi Grafik dan render Grafik*/
  GRAFIK_ARR = Highcharts.stockChart("container", {
    chart: {
      alignTicks: false,
      alignTicks: false,
      zoomType: "none",
      zoomType: "xy", // Enable zoomType to 'xy' for other functionalities
      panning: false,
      pinchType: false,
    },
    rangeSelector: {
      selected: 1,
    },
    navigator: {
      enabled: false,
    },
    title: {
      text: `<div class="text-center"><b>Grafik Curah Hujan Jam - Jaman</b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    xAxis: {
      type: "datetime",
      crosshair: true,
      title: {
        text: "Jam", // Set the title for the xAxis
      },
      labels: {
        format: "{value:%H}",
      },
      dateTimeLabelFormats: {
        hour: "%H", // Format for the tooltip
      },
      tickInterval: 3600 * 1000,
      scrollbar: {
        enabled: false,
      },
    },
    yAxis: {
      min: 0,

      title: {
        text: "Curah Hujan (mm)",
      },
      stackLabels: {
        style: {
          color: "#000000",
          fontWeight: "bold",
        },
        enabled: true,
        verticalAlign: "top",
      },
      opposite: false,
    },
    plotOptions: {
      column: {
        borderWidth: 1,
        stacking: "normal",
        pointPadding: 0,
        groupPadding: 0,
        dataLabels: {
          enabled: false,
        },
        dataGrouping: {
          enabled: false,
        },
        zones: [
          {
            value: 0,
            borderColor: "#4b5157",
            color: "#CCCCCC66", // Bootstrap primary color
          },
          {
            value: 5,
            borderColor: "#0581a1",
            color: "#39A6F599", // Bootstrap success color
          },
          {
            value: 10,
            borderColor: "#a87f05",
            color: "#F7B84B99", // Bootstrap warning color
          },
          {
            value: 20,
            borderColor: "#a34d15",
            color: "#F2832399", // Custom orange color
          },
          {
            borderColor: "#b3253a",
            color: "#EF535099", // Bootstrap danger color
          },
        ],
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat("%e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          s += "<br/>CH         = " + point.y + " mm";
          if (point.y > 0 && point.y <= 5) {
            s += "<br/>Intensitas = Hujan Ringan";
          } else if (point.y > 5 && point.y <= 10) {
            s += "<br/>Intensitas = Hujan Sedang";
          } else if (point.y > 10 && point.y <= 20) {
            s += "<br/>Intensitas = Hujan Lebat";
          } else if (point.y > 20) {
            s += "<br/>Intensitas = Hujan Sangat Lebat";
          } else {
            s += "<br/>Intensitas = Berawan";
          }
        });

        return s;
      },
    },
    series: [
      {
        type: "column",
        name: "CH",
        data: DATA_SERIES_ARR.map((point) => ({
          x: point[0],
          y: point[1],
        })),
      },
    ],
  });
}

function generateGrafikArrHarian(periode, data) {
  let DATA_SERIES_ARR_DAY = generateDataSeriesGrafik(data.dataGrafik);
  let formattedDate = "";
  let testDate = new Date(periode);
  let date = moment(testDate, "YYYY-MM");
  formattedDate = date.locale("id").format("MMMM YYYY");

  /* Initialisasi Grafik dan render Grafik*/
  GARIFK_CH_HARIAN = Highcharts.stockChart("container-ch-harian", {
    chart: {
      alignTicks: false,
      zoomType: "none",
      zoomType: "xy", // Enable zoomType to 'xy' for other functionalities
      panning: false,
      pinchType: false,
    },
    rangeSelector: {
      selected: 1,
    },
    navigator: {
      enabled: false,
    },
    title: {
      text: `<div class="text-center"><b>Grafik Curah Hujan Harian</b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    xAxis: {
      type: "datetime",
      crosshair: true,
      title: {
        text: "Tanggal", // Set the title for the xAxis
      },
      labels: {
        format: "{value:%d}", // Display day on the labels
      },
      dateTimeLabelFormats: {
        day: "%e %b", // Format for the tooltip (show day and month)
      },
      tickInterval: 24 * 3600 * 1000, // Set the tick interval to one day
    },
    yAxis: {
      title: {
        text: "Curah Hujan (mm)",
      },
      formatter: function () {
        if (this.value === null || this.value === "") {
          return "-";
        }
        return this.value;
      },
      stackLabels: {
        style: {
          color: "#000000",
          fontWeight: "bold",
        },
        enabled: true,
        verticalAlign: "top",
      },
      opposite: false,
    },
    plotOptions: {
      series: {
        pointFormatter: function () {
          return this.y !== null && this.y !== "" ? this.y : "-";
        },
      },
      column: {
        borderWidth: 1,
        //borderColor: "#000000",
        stacking: "normal",
        pointPadding: 0,
        groupPadding: 0,
        dataLabels: {
          enabled: false,
        },
        dataGrouping: {
          enabled: false,
        },
        zones: [
          {
            value: 0,
            borderColor: "#4b5157",
            color: "#CCCCCC66", // Bootstrap primary color
          },
          {
            value: 20,
            borderColor: "#0581a1",
            color: "#39A6F599", // Bootstrap success color
          },
          {
            value: 50,
            borderColor: "#a87f05",
            color: "#F7B84B99", // Bootstrap warning color
          },
          {
            value: 100,
            borderColor: "#a34d15",
            color: "#F2832399", // Custom orange color
          },
          {
            borderColor: "#b3253a",
            color: "#EF535099", // Bootstrap danger color
          },
        ],
      },
    },
    tooltip: {
      formatter() {
        let s = "<b>" + Highcharts.dateFormat("%e %B", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          s += "<br/>CH         = " + point.y + " mm";
          if (point.y > 5 && point.y <= 20) {
            s += "<br/>Intensitas = Hujan Ringan";
          } else if (point.y > 20 && point.y <= 50) {
            s += "<br/>Intensitas = Hujan Sedang";
          } else if (point.y > 50 && point.y <= 100) {
            s += "<br/>Intensitas = Hujan Lebat";
          } else if (point.y > 100) {
            s += "<br/>Intensitas = Hujan Sangat Lebat";
          } else {
            s += "<br/>Intensitas = Berawan";
          }
        });

        return s;
      },
    },
    series: [
      {
        type: "column",
        name: "CH",
        data: DATA_SERIES_ARR_DAY.map((point) => ({
          x: point[0],
          y: point[1],
        })),
      },
    ],
  });
}

function generateGrafikArrHarianAwlrArr(periode, data) {
  let DATA_SERIES_ARR_DAY = generateDataSeriesGrafik(data, false,false);
  let formattedDate = "";
  let testDate = new Date(periode);
  let date = moment(testDate, "YYYY-MM");
  formattedDate = date.locale("id").format("MMMM YYYY");

  /* Initialisasi Grafik dan render Grafik*/
  GARIFK_CH_HARIAN = Highcharts.stockChart("container-ch-harian-awlr-arr", {
    chart: {
      alignTicks: false,
      zoomType: "none",
      zoomType: "xy", // Enable zoomType to 'xy' for other functionalities
      panning: false,
      pinchType: false,
    },
    rangeSelector: {
      selected: 1,
    },
    navigator: {
      enabled: false,
    },
    title: {
      text: `<div class="text-center"><b>Grafik Curah Hujan Harian</b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    xAxis: {
      type: "datetime",
      crosshair: true,
      title: {
        text: "Tanggal", // Set the title for the xAxis
      },
      labels: {
        format: "{value:%d}", // Display day on the labels
      },
      dateTimeLabelFormats: {
        day: "%e %b", // Format for the tooltip (show day and month)
      },
      tickInterval: 24 * 3600 * 1000, // Set the tick interval to one day
    },
    yAxis: {
      title: {
        text: "Curah Hujan (mm)",
      },
      formatter: function () {
        if (this.value === null || this.value === "") {
          return "-";
        }
        return this.value;
      },
      stackLabels: {
        style: {
          color: "#000000",
          fontWeight: "bold",
        },
        enabled: true,
        verticalAlign: "top",
      },
      opposite: false,
    },
    plotOptions: {
      series: {
        pointFormatter: function () {
          return this.y !== null && this.y !== "" ? this.y : "-";
        },
      },
      column: {
        borderWidth: 1,
        //borderColor: "#000000",
        stacking: "normal",
        pointPadding: 0,
        groupPadding: 0,
        dataLabels: {
          enabled: false,
        },
        dataGrouping: {
          enabled: false,
        },
        zones: [
          {
            value: 0,
            borderColor: "#4b5157",
            color: "#CCCCCC66", // Bootstrap primary color
          },
          {
            value: 20,
            borderColor: "#0581a1",
            color: "#39A6F599", // Bootstrap success color
          },
          {
            value: 50,
            borderColor: "#a87f05",
            color: "#F7B84B99", // Bootstrap warning color
          },
          {
            value: 100,
            borderColor: "#a34d15",
            color: "#F2832399", // Custom orange color
          },
          {
            borderColor: "#b3253a",
            color: "#EF535099", // Bootstrap danger color
          },
        ],
      },
    },
    tooltip: {
      formatter() {
        let s = "<b>" + Highcharts.dateFormat("%e %B", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          s += "<br/>CH         = " + point.y + " mm";
          if (point.y > 5 && point.y <= 20) {
            s += "<br/>Intensitas = Hujan Ringan";
          } else if (point.y > 20 && point.y <= 50) {
            s += "<br/>Intensitas = Hujan Sedang";
          } else if (point.y > 50 && point.y <= 100) {
            s += "<br/>Intensitas = Hujan Lebat";
          } else if (point.y > 100) {
            s += "<br/>Intensitas = Hujan Sangat Lebat";
          } else {
            s += "<br/>Intensitas = Berawan";
          }
        });

        return s;
      },
    },
    series: [
      {
        type: "column",
        name: "CH",
        data: DATA_SERIES_ARR_DAY.map((point) => ({
          x: point[0],
          y: point[1],
        })),
      },
    ],
  });
}

function generateGrafikAwlr(periode, data) {
  let DATA_SERIES_AWLR = generateDataSeriesGrafik(
    data.dataGrafik,
    false
  );

  let maxSiaga = 0;
  let tmaMax = 0;
  let tmaMin = 0;
  let siaga1 = 0;
  let siaga2 = 0;
  let siaga3 = 0;
  let yMax = 0;
  let yMin = 0;

  if (data.dataTma != null) {
    tmaMax = data.dataTma.tmaMax;
    tmaMin = data.dataTma.tmaMin;
  }

  if (data.dataSiaga.siaga1 != null) {
    siaga1 = data.dataSiaga.siaga1;
    siaga2 = data.dataSiaga.siaga2;
    siaga3 = data.dataSiaga.siaga3;

    if (tmaMax != undefined) {
      yMax = tmaMax;
      yMin =
        tmaMin > siaga1
          ? siaga1
          : tmaMin > siaga2
          ? siaga2
          : tmaMin > siaga3
          ? siaga3
          : tmaMin;
    }
  } else {
    yMax = tmaMax < 1 ? tmaMax + 0.01 : tmaMax + 0.5;
    yMin = tmaMin;
  }

  let formattedDate = "";

  let splitPeriode = periode.split("-");
  if (splitPeriode.length == 2) {
    let date = moment(periode, "YYYY-MM");
    formattedDate = date.locale("id").format("MMMM YYYY");
  } else {
    let date = moment(periode, "YYYY-MM-DD");
    formattedDate = date.locale("id").format("DD MMMM YYYY");
  }

  GRAFIK_AWLR = Highcharts.stockChart("container", {
    navigation: {
      buttonOptions: {
        enabled: false, // Disable zoom and pan buttons
      },
    },
    rangeSelector: {
      enabled: false, // Disable the range selector
    },
    title: {
      text: false
        ? `<div class="text-center"><b>Grafik Muka Air</b></br><b>${STATION_NAME}</b></div>`
        : `<div class="text-center"><b>Grafik Tinggi Muka Air</b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    yAxis: false
      ? [
          {
            title: {
              text: "Tinggi Muka Air (m)",
            },
            max:
              data.dataTma.tmaMax < data.dataSiaga.siaga3
                ? data.dataSiaga.siaga3
                : maxSiaga,
            min: data.dataTma.tmaMin,
            opposite: false,
            plotLines: [
              {
                value: data.dataSiaga.siaga3,
                color: "yellow",
                dashStyle: "solid",
                width: 10,
                label: {
                  text: "Siaga 3",
                },
              },
              {
                value: data.dataSiaga.siaga2,
                color: "orange",
                dashStyle: "solid",
                width: 10,
                label: {
                  text: "Siaga 2",
                },
              },
              {
                value: data.dataSiaga.siaga1,
                color: "red",
                dashStyle: "solid",
                width: 2,
                label: {
                  text: "Siaga 1",
                },
              },
            ],
          },
          {
            title: {
              text: "Elevasi (Mdpl)",
            },
            max: data.defaultElevation + data.dataTma.tmaMax,
            min: data.defaultElevation + data.dataTma.tmaMin,
            opposite: true,
            showLastLabel: true,
            plotLines: [],
          },
        ]
      : {
          title: {
            text: "Tinggi Muka Air (m)",
          },
          max: yMax,
          min: yMin,
          opposite: false,
          plotLines:
            siaga1 != 0
              ? [
                  {
                    value: siaga3,
                    color: "yellow",
                    dashStyle: "shortdash",
                    width: 2,
                    label: {
                      text: "Siaga 3",
                      style: {
                        fontWeight: "bold",
                      },
                    },
                    zIndex: 5,
                  },
                  {
                    value: siaga2,
                    color: "orange",
                    dashStyle: "shortdash",
                    width: 2,
                    label: {
                      text: "Siaga 2",
                      style: {
                        fontWeight: "bold",
                      },
                    },
                    zIndex: 5,
                  },
                  {
                    value: siaga1,
                    color: "red",
                    dashStyle: "shortdash",
                    width: 2,
                    label: {
                      text: "Siaga 1",
                      style: {
                        fontWeight: "bold",
                      },
                    },
                    zIndex: 5,
                  },
                ]
              : [],
        },

    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M}", // Format for the tooltip
        dateTimeLabelFormats: {
          hour: "%H:%M", // Format for the x-axis labels
        },
      },
    },
    plotOptions: {
      // areaspline: {
      //   zones: [
      //     {
      //       color: "#00F",
      //       value: 0,
      //     },
      //     {
      //       color: "#03C",
      //       value: 2,
      //     },
      //   ],
      // },
      series: {
        // Configure options for all series (e.g., lines, bars, etc.)
        marker: {
          enabled: true,
          radius: 2,
          symbol: "circle",
        },
        lineWidth: 1,
        animation: true, // Disable animation for all series
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          const y2 = point.point.y2; // Accessing the y2 value

          if (false) {
            s += "<br/>TMA         = " + y1 + " m";
            if (data.defaultElevation == null) {
              s += "<br/>Elevasi = -";
            } else {
              s += "<br/>Elevasi = " + (y1 + data.defaultElevation) + " Mdpl";
            }
          } else {
            s += "<br/>TMA = " + point.y + " m";
          }
        });

        return s;
      },
    },

    series: [
      {
        name: "TMA",
        type: "areaspline",
        threshold: null,
        data: DATA_SERIES_AWLR,
        lineColor: Highcharts.getOptions().colors[0],
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
      },
    ],
  });
}

function generateGrafikAwlrArrTmaCh(periode, data) {
  console.log(data);



  let DATA_SERIES_AWLR = generateDataSeriesGrafik(
    data.dataGrafik,
    data.isElevasiExsist,
    false
  );

  let DATA_SERIES_ARR = generateDataSeriesGrafik(
    data.dataGrafikArr,
    false,
    false
  );


  let maxSiaga = 0;
  let tmaMax = 0;
  let tmaMin = 0;
  let siaga1 = 0;
  let siaga2 = 0;
  let siaga3 = 0;
  let yMax = 0;
  let yMin = 0;

  if (data.dataTma != null) {
    tmaMax = data.dataTma.tmaMax;
    tmaMin = data.dataTma.tmaMin;
  }

  if (data.dataSiaga.siaga1 != null) {
    siaga1 = data.dataSiaga.siaga1;
    siaga2 = data.dataSiaga.siaga2;
    siaga3 = data.dataSiaga.siaga3;

    if (tmaMax != undefined) {
      yMax = tmaMax;
      yMin =
        tmaMin > siaga1
          ? siaga1
          : tmaMin > siaga2
          ? siaga2
          : tmaMin > siaga3
          ? siaga3
          : tmaMin;
    }
  } else {
    yMax = tmaMax < 1 ? tmaMax + 0.01 : tmaMax + 0.5;
    yMin = tmaMin;
  }


  let formattedDate = "";

  let splitPeriode = periode.split("-");
  if (splitPeriode.length == 2) {
    let date = moment(periode, "YYYY-MM");
    formattedDate = date.locale("id").format("MMMM YYYY");
  } else {
    let date = moment(periode, "YYYY-MM-DD");
    formattedDate = date.locale("id").format("DD MMMM YYYY");
  }

  GRAFIK_AWLR_ARR_TMA_CH = Highcharts.stockChart("container-tma-ch-awlr-arr", {
    navigation: {
      buttonOptions: {
        enabled: false, // Disable zoom and pan buttons
      },
    },
    rangeSelector: {
      enabled: false, // Disable the range selector
    },
    title: {
      text: false
        ? `<div class="text-center"><b>Grafik Muka Air</b></br><b>${STATION_NAME}</b></div>`
        : `<div class="text-center"><b>Grafik Tinggi Muka Air</b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    yAxis: data.isElevasiExsist
      ? [
          {
            title: {
              text: "Tinggi Muka Air (m)",
            },
            max:
              data.dataTma.tmaMax < data.dataSiaga.siaga3
                ? data.dataSiaga.siaga3
                : maxSiaga,
            min: data.dataTma.tmaMin,
            opposite: false,
            plotLines: [
              {
                value: data.dataSiaga.siaga3,
                color: "yellow",
                dashStyle: "solid",
                width: 10,
                label: {
                  text: "Siaga 3",
                },
              },
              {
                value: data.dataSiaga.siaga2,
                color: "orange",
                dashStyle: "solid",
                width: 10,
                label: {
                  text: "Siaga 2",
                },
              },
              {
                value: data.dataSiaga.siaga1,
                color: "red",
                dashStyle: "solid",
                width: 2,
                label: {
                  text: "Siaga 1",
                },
              },
            ],
          },
          {
            title: {
              text: "Elevasi (Mdpl)",
            },
            max: data.defaultElevation + data.dataTma.tmaMax,
            min: data.defaultElevation + data.dataTma.tmaMin,
            opposite: true,
            showLastLabel: true,
            plotLines: [],
          },
        ]
      : [{
          title: {
            text: "Tinggi Muka Air (m)",
          },
          max: yMax,
          min: yMin,
          opposite: false,
          plotLines:
            siaga1 != 0
              ? [
                  {
                    value: siaga3,
                    color: "yellow",
                    dashStyle: "shortdash",
                    width: 2,
                    label: {
                      text: "Siaga 3",
                      style: {
                        fontWeight: "bold",
                      },
                    },
                    zIndex: 5,
                  },
                  {
                    value: siaga2,
                    color: "orange",
                    dashStyle: "shortdash",
                    width: 2,
                    label: {
                      text: "Siaga 2",
                      style: {
                        fontWeight: "bold",
                      },
                    },
                    zIndex: 5,
                  },
                  {
                    value: siaga1,
                    color: "red",
                    dashStyle: "shortdash",
                    width: 2,
                    label: {
                      text: "Siaga 1",
                      style: {
                        fontWeight: "bold",
                      },
                    },
                    zIndex: 5,
                  },
                ]
              : [],
      },
      {
            title: {
              text: null,
            },
            labels: {
              enabled: false, // Disable labels for the yAxis
            },
             // Set your desired min value
            opposite: true,
            showLastLabel: true,
            reversed: true, // Reverse the order of the yAxis for the column series
            plotLines: [],
        },
      ],

    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M}", // Format for the tooltip
        dateTimeLabelFormats: {
          hour: "%H:%M", // Format for the x-axis labels
        },
      },
    },
    plotOptions: {
      column: {
        stacking: "normal", // Use stacking to limit the height of columns
        dataLabels: {
          enabled: true,
          color: "black",
          verticalAlign: "bottom", // Align the data label to the top of the column
          y:0, // Offset to position the data label precisely on top
          style: {
            textOutline: "none", // Disable text outline for better visibility
          },
          formatter: function () {
            return `${this.y} mm`; // Display the y-value on top of the column
          },
        },
        inverted: true, // Invert the column series
        zones: [
          {
            value: 0,
            color: "#6C757D", // Bootstrap primary color
          },
          {
            value: 5,
            color: "#1ABC9C", // Bootstrap success color
          },
          {
            value: 10,
            color: "#FFC008", // Bootstrap warning color
          },
          {
            value: 15,
            color: "#FF7820", // Custom orange color
          },
          {
            color: "#F1556C", // Bootstrap danger color
          },
        ],
      },
      // areaspline: {
      //   zones: [
      //     {
      //       color: "#00F",
      //       value: 0,
      //     },
      //     {
      //       color: "#03C",
      //       value: 2,
      //     },
      //   ],
      // },
      series: {
        // Configure options for all series (e.g., lines, bars, etc.)
        marker: {
          enabled: true,
          radius: 2,
          symbol: "circle",
        },
        lineWidth: 1,
        animation: true, // Disable animation for all series
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          const y2 = point.point.y2; // Accessing the y2 value

          const seriesType = point.series.options.type;

          if (data.isElevasiExsist) {
            s += "<br/>TMA         = " + y1 + " m";
            if (data.defaultElevation == null) {
              s += "<br/>Elevasi = -";
            } else {
              s += "<br/>Elevasi = " + (y1 + data.defaultElevation) + " Mdpl";
            }
          } else {
            if (seriesType == "areaspline") {
              s += "<br/>TMA = " + point.y + " m";
            } else {
              s += "<br/>CH = " + point.y + " mm";
            }
            
          }
        });

        return s;
      },
    },

    series: [
      {
        name: "TMA",
        type: "areaspline",
        threshold: null,
        data: DATA_SERIES_AWLR,
        lineColor: Highcharts.getOptions().colors[0],
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
      },
      {
        name: "Curah Hujan",
        type: "column",
        data: DATA_SERIES_ARR,
        yAxis: data.isElevasiExsist ? 2 : 1,
        // yAxis: 0, // No need to specify a separate yAxis for the column series
      },
    ],
  });
}

function generateGrafikBattery(periode, data) {
  let DATA_SERIES_BATTERY = generateDataSeriesGrafik(data.dataGrafikBattery);

  let formattedDate = "";
  let date = moment(periode, "YYYY-MM-DD");
  formattedDate = date.locale("id").format("DD MMMM YYYY");

  /* Initialisasi Grafik dan render Grafik Battery*/
  GARIFK_BATTERY = Highcharts.stockChart("container-battery", {
    navigation: {
      buttonOptions: {
        enabled: false, // Disable zoom and pan buttons
      },
    },
    rangeSelector: {
      enabled: false, // Disable the range selector
    },
    title: {
      text: `<div class="text-center"><b>Grafik Baterai</b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    yAxis: {
      title: {
        text: "Voltase (V)",
      },
      opposite: false,
    },

    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M}", // Format for the tooltip
        dateTimeLabelFormats: {
          hour: "%H:%M", // Format for the x-axis labels
        },
      },
    },
    plotOptions: {
      series: {
        // Configure options for all series (e.g., lines, bars, etc.)
        marker: {
          enabled: true,
          radius: 2,
          symbol: "circle",
          fillColor: "#FF8000",
        },
        lineWidth: 1,
        animation: true, // Disable animation for all series
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          const y2 = point.point.y2; // Accessing the y2 value
          s += "<br/>Voltase         = " + y1 + " V";
        });

        return s;
      },
    },

    series: [
      {
        name: "Battery",
        type: "line",
        data: DATA_SERIES_BATTERY,
        lineColor: "#FF8000",
      },
    ],
  });
}

function generateGrafikBatteryAwlrArr(periode, data) {
  let DATA_SERIES_BATTERY = generateDataSeriesGrafik(data,false,false);

  let formattedDate = "";
  let date = moment(periode, "YYYY-MM-DD");
  formattedDate = date.locale("id").format("DD MMMM YYYY");

  /* Initialisasi Grafik dan render Grafik Battery*/
  GARIFK_BATTERY = Highcharts.stockChart("container-battery-awlr-arr", {
    navigation: {
      buttonOptions: {
        enabled: false, // Disable zoom and pan buttons
      },
    },
    rangeSelector: {
      enabled: false, // Disable the range selector
    },
    title: {
      text: `<div class="text-center"><b>Grafik Baterai</b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    yAxis: {
      title: {
        text: "Voltase (V)",
      },
      opposite: false,
    },

    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M}", // Format for the tooltip
        dateTimeLabelFormats: {
          hour: "%H:%M", // Format for the x-axis labels
        },
      },
    },
    plotOptions: {
      series: {
        // Configure options for all series (e.g., lines, bars, etc.)
        marker: {
          enabled: true,
          radius: 2,
          symbol: "circle",
          fillColor: "#FF8000",
        },
        lineWidth: 1,
        animation: true, // Disable animation for all series
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          const y2 = point.point.y2; // Accessing the y2 value
          s += "<br/>Voltase         = " + y1 + " V";
        });

        return s;
      },
    },

    series: [
      {
        name: "Battery",
        type: "line",
        data: DATA_SERIES_BATTERY,
        lineColor: "#FF8000",
      },
    ],
  });
}

function generateGrafikDebit(periode, data) {
  let DATA_SERIES_DEBIT = generateDataSeriesGrafik(data.dataGrafikDebit);

  let formattedDate = "";
  let date = moment(periode, "YYYY-MM-DD");
  formattedDate = date.locale("id").format("DD MMMM YYYY");

  /* Initialisasi Grafik dan render Grafik Battery*/
  GARIFK_DEBIT = Highcharts.stockChart("container-debit", {
    navigation: {
      buttonOptions: {
        enabled: false, // Disable zoom and pan buttons
      },
    },
    rangeSelector: {
      enabled: false, // Disable the range selector
    },
    title: {
      text: `<div class="text-center"><b>Grafik Debit</b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    yAxis: {
      title: {
        text: "Debit (m3/s)",
      },
      opposite: false,
    },

    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M}", // Format for the tooltip
        dateTimeLabelFormats: {
          hour: "%H:%M", // Format for the x-axis labels
        },
      },
    },
    plotOptions: {
      series: {
        // Configure options for all series (e.g., lines, bars, etc.)
        marker: {
          enabled: true,
          radius: 2,
          symbol: "circle",
          fillColor: "#FF8000",
        },
        lineWidth: 1,
        animation: true, // Disable animation for all series
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          const y2 = point.point.y2; // Accessing the y2 value
          s += "<br/>Debit         = " + y1 + " m3/s";
        });

        return s;
      },
    },

    series: [
      {
        name: "Debit",
        type: "line",
        data: DATA_SERIES_DEBIT,
        lineColor: "#FF8000",
      },
    ],
  });
}

function generateGrafikDebitAwlrArr(periode, data) {
  let DATA_SERIES_DEBIT = generateDataSeriesGrafik(data);

  let formattedDate = "";
  let date = moment(periode, "YYYY-MM-DD");
  formattedDate = date.locale("id").format("DD MMMM YYYY");

  /* Initialisasi Grafik dan render Grafik Battery*/
  GARIFK_DEBIT = Highcharts.stockChart("container-debit-awlr-arr", {
    navigation: {
      buttonOptions: {
        enabled: false, // Disable zoom and pan buttons
      },
    },
    rangeSelector: {
      enabled: false, // Disable the range selector
    },
    title: {
      text: `<div class="text-center"><b>Grafik Debit</b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    yAxis: {
      title: {
        text: "Debit (m3/s)",
      },
      opposite: false,
    },

    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M}", // Format for the tooltip
        dateTimeLabelFormats: {
          hour: "%H:%M", // Format for the x-axis labels
        },
      },
    },
    plotOptions: {
      series: {
        // Configure options for all series (e.g., lines, bars, etc.)
        marker: {
          enabled: true,
          radius: 2,
          symbol: "circle",
          fillColor: "#FF8000",
        },
        lineWidth: 1,
        animation: true, // Disable animation for all series
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          const y2 = point.point.y2; // Accessing the y2 value
          s += "<br/>Debit         = " + y1 + " m3/s";
        });

        return s;
      },
    },

    series: [
      {
        name: "Debit",
        type: "line",
        data: DATA_SERIES_DEBIT,
        lineColor: "#FF8000",
      },
    ],
  });
}

function generateGrafikAwlrPerDAS(data, periode) {
  var dataSeries = data.map((item) => {
    return {
      name: item.name,
      type: item.type,
      data: item.data.map((point) => [point.millis, point.value]),
    };
  });

  let formattedDate = "";

  let splitPeriode = periode.split("-");
  if (splitPeriode.length == 2) {
    let date = moment(new Date(), "YYYY-MM");
    formattedDate = date.locale("id").format("MMMM YYYY");
  } else {
    let date = moment(new Date(periode), "YYYY-MM-DD");
    formattedDate = date.locale("id").format("DD MMMM YYYY");
  }

  GARIFK_PER_DAS = Highcharts.stockChart("container-per-das", {
    title: {
      text: `Grafik TMA Per ${WATERSHED_NAME}`,
    },
    subtitle: {
      text: `<p>Per ${formattedDate} </p>`,
    },
    rangeSelector: {
      enabled: false,
    },

    legend: {
      enabled: true, // Display the legend,
    },

    yAxis: {
      title: {
        text: "Tinggi Muka Air (m)",
      },
      labels: {},
      plotLines: [
        {
          value: 0,
          width: 2,
          color: "silver",
        },
      ],
    },

    // plotOptions: {
    //   series: {
    //     compare: "percent",
    //     showInNavigator: true,
    //   },
    // },

    tooltip: {
      pointFormat:
        '<span style="color:{series.color}"><b>{series.name}</b></span> <br/>TMA    : <b>{point.y:.2f} m</b><br/>Waktu: <b>{point.x:%d %B %Y %H:%M} WIB</b><br/>',
      split: true,
    },
    series: dataSeries,
  });
}

function generateGrafikElevation(periode, data) {
  let DATA_SERIES_ELEVATION = generateDataSeriesGrafik(data.dataGrafik);

  let maxSiaga = 0;
  let tmaMax = 0;
  let tmaMin = 0;
  let siaga1 = 0;
  let siaga2 = 0;
  let siaga3 = 0;
  let yMax = 0;
  let yMin = 0;

  if (data.dataTma != null) {
    tmaMax = data.dataTma.tmaMax;
    tmaMin = data.dataTma.tmaMin;
  }

  if (data.dataSiaga.siaga1 != null) {
    siaga1 = data.dataSiaga.siaga1;
    siaga2 = data.dataSiaga.siaga2;
    siaga3 = data.dataSiaga.siaga3;

    if (tmaMax != undefined) {
      yMax = tmaMax;
      yMin =
        tmaMin > siaga1
          ? siaga1
          : tmaMin > siaga2
          ? siaga2
          : tmaMin > siaga3
          ? siaga3
          : tmaMin;
    }
  } else {
    yMax = tmaMax < 1 ? tmaMax + 0.01 : tmaMax + 0.5;
    yMin = tmaMin;
  }

  let formattedDate = "";
  let date = moment(periode, "YYYY-MM-DD");
  formattedDate = date.locale("id").format("DD MMMM YYYY");

  /* Initialisasi Grafik dan render Grafik Battery*/
  GRAFIK_AWLR = Highcharts.stockChart("container", {
    chart: {
      marginRight: 80,
    },
    navigation: {
      buttonOptions: {
        enabled: false, // Disable zoom and pan buttons
      },
    },
    rangeSelector: {
      enabled: false, // Disable the range selector
    },
    title: {
      text: `<div class="text-center"><b>Grafik Muka Air</b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    yAxis: [
      {
        // Primary y-axis (left)
        title: {
          text: "Tinggi Muka Air (m)",
        },
        opposite: false,
      },
      {
        max: yMax,
        min: yMin,
        // Secondary y-axis (right)
        title: {
          text: `Elevasi Muka Air (${UNIT_DISPLAY})`,
          offset: 50,
        },
        showLastLabel: true,
        labels: {
          align: "right", // Align the label to the right
          x: 40, // Adjust the label position to the right of the title
          //y: 16, // Adjust the vertical position of the label
          width: "100%",
        },
        opposite: true,
        plotLines:
          siaga1 != 0
            ? [
                {
                  value: siaga3,
                  color: "yellow",
                  dashStyle: "shortdash",
                  width: 2,
                  label: {
                    text: "Siaga 3",
                    style: {
                      fontWeight: "bold",
                    },
                  },
                  zIndex: 5,
                },
                {
                  value: siaga2,
                  color: "orange",
                  dashStyle: "shortdash",
                  width: 2,
                  label: {
                    text: "Siaga 2",
                    style: {
                      fontWeight: "bold",
                    },
                  },
                  zIndex: 5,
                },
                {
                  value: siaga1,
                  color: "red",
                  dashStyle: "shortdash",
                  width: 2,
                  label: {
                    text: "Siaga 1",
                    style: {
                      fontWeight: "bold",
                    },
                  },
                  zIndex: 5,
                },
              ]
            : [],
      },
    ],

    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M}", // Format for the tooltip
        dateTimeLabelFormats: {
          hour: "%H:%M", // Format for the x-axis labels
        },
      },
    },
    plotOptions: {
      series: {
        // Configure options for all series (e.g., lines, bars, etc.)
        marker: {
          enabled: true,
          radius: 2,
          symbol: "circle",
        },
        lineWidth: 1,
        animation: true, // Disable animation for all series
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          const y2 = point.point.y2; // Accessing the y2 value
          s += "<br/>TMA         = " + " - ";
          s += "<br/>EMA         = " + y1 + " " + UNIT_DISPLAY;
        });

        return s;
      },
    },

    series: [
      {
        name: "TMA",
        yAxis: 0,
        type: "areaspline",
        threshold: null,
        data: [],
        lineColor: Highcharts.getOptions().colors[0],
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
      },
      {
        name: "EMA",
        yAxis: 1,
        type: "areaspline",
        threshold: null,
        data: DATA_SERIES_ELEVATION,
        lineColor: Highcharts.getOptions().colors[0],
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
      },
    ],
  });
}

function generateGrafikWqBySensor(sensor, periode, data) {
  const DATA_SERIES_SENSOR = generateDataSeriesGrafik(data);

  let formattedDate = "";
  let date = moment(periode, "YYYY-MM-DD");
  formattedDate = date.locale("id").format("DD MMMM YYYY");
  let colorLine = "#3498db";
  let title = "";
  let unit = "";
  let yAxisTitle = "";

  switch (sensor) {
    case "temperature":
      title = `<div class="text-center"><b>Grafik Suhu</b></br><b>${STATION_NAME}</b></div>`;
      colorLine = "#3498db";
      unit = "&degC";
      yAxisTitle = `${
        sensor.charAt(0).toUpperCase() + sensor.slice(1)
      } (${unit})`;
      break;
    case "ph":
      title = `<div class="text-center"><b>Grafik pH</b></br><b>${STATION_NAME}</b></div>`;
      colorLine = "#00796B";
      yAxisTitle = `pH`;
      break;
    case "orp":
      title = `<div class="text-center"><b>Grafik ORP</b></br><b>${STATION_NAME}</b></div>`;
      colorLine = "#2ecc71";
      unit = "mV";
      yAxisTitle = `${
        sensor.charAt(0).toUpperCase() + sensor.slice(1)
      } (${unit})`;
      break;
    case "turbidity":
      title = `<div class="text-center"><b>Grafik Turbidity</b></br><b>${STATION_NAME}</b></div>`;
      colorLine = "#2980b9";
      unit = "NTU";
      yAxisTitle = `${
        sensor.charAt(0).toUpperCase() + sensor.slice(1)
      } (${unit})`;
      break;
    default:
      title = `<div class="text-center"><b>Grafik Baterai</b></br><b>${STATION_NAME}</b></div>`;
      colorLine = "#FF9800";
      unit = "Volt";
      yAxisTitle = `${
        sensor.charAt(0).toUpperCase() + sensor.slice(1)
      } (${unit})`;
      break;
  }

  GRAFIK_SENSOR_WQ = Highcharts.stockChart(`container-${sensor}`, {
    navigation: {
      buttonOptions: {
        enabled: false, // Disable zoom and pan buttons
      },
    },
    rangeSelector: {
      enabled: false, // Disable the range selector
    },
    title: {
      text: title,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    yAxis: {
      title: {
        text: yAxisTitle,
        useHTML: true,
      },
      opposite: false,
    },

    // xAxis: {
    //   type: "datetime",
    //   labels: {
    //     format: "{value:%H:%M}", // Format for the tooltip
    //     dateTimeLabelFormats: {
    //       hour: "%H:%M", // Format for the x-axis labels
    //     },
    //   },
    // },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M}",
      },
    },

    plotOptions: {
      series: {
        // Configure options for all series (e.g., lines, bars, etc.)
        marker: {
          enabled: true,
          radius: 2,
          symbol: "circle",
          fillColor: colorLine,
        },
        lineWidth: 1,
        animation: true, // Disable animation for all series
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          const y2 = point.point.y2; // Accessing the y2 value
          s +=
            ` <br/>${
              sensor.charAt(0).toUpperCase() + sensor.slice(1)
            }         =   ` +
            y1 +
            " " +
            unit;
        });

        return s;
      },
    },

    series: [
      {
        name: "Battery",
        type: "line",
        data: DATA_SERIES_SENSOR,
        lineColor: colorLine,
      },
    ],
  });
}

function generateGrafikVNotchByColumn(column, periode, data) {
  const DATA_SERIES_SENSOR = generateDataSeriesGrafik(data);

  let formattedDate = "";
  let date = moment(periode, "YYYY-MM-DD");
  formattedDate = date.locale("id").format("DD MMMM YYYY");
  let colorLine = "#3498db";
  let title = "";
  let unit = "";
  let yAxisTitle = "";

  Object.entries(vNotchGarfikConfig).forEach(([columnX, obj]) => {
    if (columnX == column) {
      title = `<div class="text-center"><b>Grafik ${obj.name}</b></br><b>${STATION_NAME}</b></div>`;
      colorLine = obj.color;
      unit = obj.unit;
      yAxisTitle = `${obj.name} (${unit})`;
    }
  });

  GRAFIK_VNOTCH = Highcharts.stockChart(`container-${column}-vnotch`, {
    navigation: {
      buttonOptions: {
        enabled: false, // Disable zoom and pan buttons
      },
    },
    rangeSelector: {
      enabled: false, // Disable the range selector
    },
    title: {
      text: title,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    yAxis: {
      title: {
        text: yAxisTitle,
        useHTML: true,
      },
      opposite: false,
    },

    // xAxis: {
    //   type: "datetime",
    //   labels: {
    //     format: "{value:%H:%M}", // Format for the tooltip
    //     dateTimeLabelFormats: {
    //       hour: "%H:%M", // Format for the x-axis labels
    //     },
    //   },
    // },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M}",
      },
    },

    plotOptions: {
      series: {
        // Configure options for all series (e.g., lines, bars, etc.)
        marker: {
          enabled: true,
          radius: 2,
          symbol: "circle",
          fillColor: colorLine,
        },
        lineWidth: 1,
        animation: true, // Disable animation for all series
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          const y2 = point.point.y2; // Accessing the y2 value
          s +=
            ` <br/>${
              column.charAt(0).toUpperCase() + column.slice(1)
            }         =   ` +
            y1 +
            " " +
            unit;
        });

        return s;
      },
    },

    series: [
      {
        name: "Battery",
        type: "line",
        data: DATA_SERIES_SENSOR,
        lineColor: colorLine,
      },
    ],
  });
}

function generateGrafikPiezometerByColumn(column, periode, data) {
  const DATA_SERIES_SENSOR = generateDataSeriesGrafik(data);

  let formattedDate = "";
  let date = moment(periode, "YYYY-MM-DD");
  formattedDate = date.locale("id").format("DD MMMM YYYY");
  let colorLine = "#3498db";
  let title = "";
  let unit = "";
  let yAxisTitle = "";

  Object.entries(piezometerGarfikConfig).forEach(([columnX, obj]) => {
    if (columnX == column) {
      title = `<div class="text-center"><b>Grafik ${obj.name}</b></br><b>${STATION_NAME}</b></div>`;
      colorLine = obj.color;
      unit = obj.unit;
      yAxisTitle = `${obj.name} (${unit})`;
    }
  });

  GRAFIK_PIEZOMETER = Highcharts.stockChart(`container-${column}-piezometer`, {
    navigation: {
      buttonOptions: {
        enabled: false, // Disable zoom and pan buttons
      },
    },
    rangeSelector: {
      enabled: false, // Disable the range selector
    },
    title: {
      text: title,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    yAxis: {
      title: {
        text: yAxisTitle,
        useHTML: true,
      },
      opposite: false,
    },

    // xAxis: {
    //   type: "datetime",
    //   labels: {
    //     format: "{value:%H:%M}", // Format for the tooltip
    //     dateTimeLabelFormats: {
    //       hour: "%H:%M", // Format for the x-axis labels
    //     },
    //   },
    // },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M}",
      },
    },

    plotOptions: {
      series: {
        // Configure options for all series (e.g., lines, bars, etc.)
        marker: {
          enabled: true,
          radius: 2,
          symbol: "circle",
          fillColor: colorLine,
        },
        lineWidth: 1,
        animation: true, // Disable animation for all series
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          const y2 = point.point.y2; // Accessing the y2 value
          s +=
            ` <br/>${
              column.charAt(0).toUpperCase() + column.slice(1)
            }         =   ` +
            y1 +
            " " +
            unit;
        });

        return s;
      },
    },

    series: [
      {
        name: "Battery",
        type: "line",
        data: DATA_SERIES_SENSOR,
        lineColor: colorLine,
      },
    ],
  });
}

// Initial redraw of custom markers

function generateGrafikAWSBySensor(sensor, periode, data) {
  const DATA_SERIES_SENSOR = generateDataSeriesGrafik(data);

  let formattedDate = "";
  let date = moment(periode, "YYYY-MM-DD");
  formattedDate = date.locale("id").format("DD MMMM YYYY");
  let colorLine = "#3498db";
  let title = "";
  let unit = "";
  let yAxisTitle = "";

  sensorNames.forEach((e) => {
    if (e == sensor) {
      let obj = awsSensors[e];
      title = `<div class="text-center"><b>Grafik ${obj.sensorName}</b></br><b>${STATION_NAME}</b></div>`;
      colorLine = obj.color;
      unit = obj.unit;
      yAxisTitle = `${obj.sensorName} (${unit})`;
    }
  });

  let index = getValueAndIndexByKey(dynamicValues, `${sensor}-aws`).index;
  // console.log(dynamicValues[index][`${sensor}-aws`]);

  if (sensor == "rainfall") {
    
    dynamicValues[index][`${sensor}-aws`] = Highcharts.stockChart(`container-${sensor}-aws`, {
    chart: {
      alignTicks: false,
      alignTicks: false,
      zoomType: "none",
      zoomType: "xy", // Enable zoomType to 'xy' for other functionalities
      panning: false,
      pinchType: false,
    },
    rangeSelector: {
      selected: 1,
    },
    navigator: {
      enabled: false,
    },
    title: {
      text: `<div class="text-center"><b>Grafik Curah Hujan Jam - Jaman</b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    xAxis: {
      type: "datetime",
      crosshair: true,
      title: {
        text: "Jam", // Set the title for the xAxis
      },
      labels: {
        format: "{value:%H}",
      },
      dateTimeLabelFormats: {
        hour: "%H", // Format for the tooltip
      },
      tickInterval: 3600 * 1000,
      scrollbar: {
        enabled: false,
      },
    },
    yAxis: {
      min: 0,

      title: {
        text: "Curah Hujan (mm)",
      },
      stackLabels: {
        style: {
          color: "#000000",
          fontWeight: "bold",
        },
        enabled: true,
        verticalAlign: "top",
      },
      opposite: false,
    },
    plotOptions: {
      column: {
        borderWidth: 1,
        stacking: "normal",
        pointPadding: 0,
        groupPadding: 0,
        dataLabels: {
          enabled: false,
        },
        dataGrouping: {
          enabled: false,
        },
        zones: [
          {
            value: 0,
            borderColor: "#4b5157",
            color: "#CCCCCC66", // Bootstrap primary color
          },
          {
            value: 5,
            borderColor: "#0581a1",
            color: "#39A6F599", // Bootstrap success color
          },
          {
            value: 10,
            borderColor: "#a87f05",
            color: "#F7B84B99", // Bootstrap warning color
          },
          {
            value: 20,
            borderColor: "#a34d15",
            color: "#F2832399", // Custom orange color
          },
          {
            borderColor: "#b3253a",
            color: "#EF535099", // Bootstrap danger color
          },
        ],
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat("%e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          s += "<br/>CH         = " + point.y + " mm";
          if (point.y > 0 && point.y <= 5) {
            s += "<br/>Intensitas = Hujan Ringan";
          } else if (point.y > 5 && point.y <= 10) {
            s += "<br/>Intensitas = Hujan Sedang";
          } else if (point.y > 10 && point.y <= 20) {
            s += "<br/>Intensitas = Hujan Lebat";
          } else if (point.y > 20) {
            s += "<br/>Intensitas = Hujan Sangat Lebat";
          } else {
            s += "<br/>Intensitas = Berawan";
          }
        });

        return s;
      },
    },
    series: [
      {
        type: "column",
        name: "CH",
        data: DATA_SERIES_SENSOR.map((point) => ({
          x: point[0],
          y: point[1],
        })),
      },
    ],
  });
  }

  if (sensor != "windDirection" && sensor !="rainfall") {
    dynamicValues[index][`${sensor}-aws`] = Highcharts.stockChart(
      `container-${sensor}-aws`,
      {
        navigation: {
          buttonOptions: {
            enabled: false, // Disable zoom and pan buttons
          },
        },
        rangeSelector: {
          enabled: false, // Disable the range selector
        },
        title: {
          text: title,
          useHTML: true,
        },
        subtitle: {
          text: `Per ${formattedDate}`,
        },
        yAxis: {
          title: {
            text: yAxisTitle,
            useHTML: true,
          },
          opposite: false,
        },
        xAxis: {
          type: "datetime",
          labels: {
            format: "{value:%H:%M}",
          },
        },

        plotOptions: {
          series: {
            // Configure options for all series (e.g., lines, bars, etc.)
            marker: {
              enabled: true,
              radius: 2,
              symbol: "circle",
              fillColor: colorLine,
            },
            lineWidth: 1,
            animation: true, // Disable animation for all series
          },
        },
        tooltip: {
          formatter() {
            let s =
              "<b>" +
              Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) +
              "</b>";
            this.points.forEach((point) => {
              const y1 = point.y; // Accessing the y1 value
              const y2 = point.point.y2; // Accessing the y2 value
              s +=
                ` <br/>${
                  sensor.charAt(0).toUpperCase() + sensor.slice(1)
                }         =   ` +
                y1 +
                " " +
                unit;
            });

            return s;
          },
        },

        series: [
          {
            name: sensor,
            type: "line",
            data: DATA_SERIES_SENSOR,
            lineColor: colorLine,
          },
        ],
      }
    );
  }
}

function generateDataSeriesGrafik(
  data,
  isElevasiExsist = false,
  isHasDescription = false
) {
  if (data == undefined || data == null || data.length == 0) return [];
  let result = [];

  if (isHasDescription) {
    result = data.map((item) => [
      item.millis,
      item.value != null ? Math.round(item.value * 100) / 100 : item.value,
      item.description
    ]);

    return result;
  }

  if (isElevasiExsist) {
    result = data.map((item) => [
      item.millis,
      item.value != null ? Math.round(item.value * 100) / 100 : item.value,
      item.elevasi != null ? Math.round(item.value * 100) / 100 : item.elevasi,
    ]);
  } else {
    result = data.map((item) => [
      item.millis,
      item.value != null ? Math.round(item.value * 100) / 100 : item.value,
    ]);
  }
  return result;
}

function generateDataSeriesGrafikAwlrArr(
  data,
  dataFrom,
  isElevasiExsist = false,
  isHasDescription = false
) {
  if (data == undefined || data == null || data.length == 0) return [];
  let result = [];

  if (isHasDescription) {
    result = data.map((item) => [
      item.millis,
      item.value != null ? Math.round(item.value * 100) / 100 : item.value,
      item.description
    ]);

    return result;
  }

  if (isElevasiExsist) {
    result = data.map((item) => [
      item.millis,
      item.value != null ? Math.round(item.value * 100) / 100 : item.value,
      item.elevasi != null ? Math.round(item.value * 100) / 100 : item.elevasi,
    ]);
  } else {
    if (dataFrom == "awlr") {
      result = data.map((item) => [
      item.millis,
      item.value != null ? Math.round(item.awlr * 100) / 100 : item.awlr,
    ]);
    } else {
      result = data.map((item) => [
      item.millis,
      item.value != null ? Math.round(item.arr * 100) / 100 : item.arr,
    ]);
    }
    
  }
  return result;
}

function generateAwsHeader(isRainfall, sensor) {
  if (isRainfall) {
  }
}
/* -------- END Function untuk Generate Grafik ARR/ AWLR --------- */
function generateSensorWindDirection(periode, data) {
  const DATA_SENSOR = generateDataSeriesGrafik(data, false, true);
 
  let formattedDate = "";
  let date = moment(periode, "YYYY-MM-DD");
  formattedDate = date.locale("id").format("DD MMMM YYYY");

  let imageUrl = $("#base-image").data("image-url");
  let container = document.getElementById("container-windDirection-aws");

  GRAFIK_WIND_DIRECTION = Highcharts.stockChart(container, {
    chart: {
      type: "line",
      events: {
        load: function () {
          // Show the custom marker containers on chart load
          document.querySelectorAll(".customMarker").forEach(function (marker) {
            marker.style.display = "block";
          });
        },
        redraw: function () {
          // Redraw the custom marker containers on chart redraw
          redrawCustomMarkers();
        },
      },
    },
    navigation: {
      buttonOptions: {
        enabled: false, // Disable zoom and pan buttons
      },
    },
    rangeSelector: {
      enabled: false, // Disable the range selector
    },
    title: {
      text: `<div class="text-center"><b>Grafik Arah Angin </b></br><b>${STATION_NAME}</b></div>`,
      useHTML: true,
    },
    subtitle: {
      text: `Per ${formattedDate}`,
    },
    yAxis: {
      title: {
        text: `Arah Angin (&deg)`,
        useHTML: true,
      },
      opposite: false,
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M}",
      },
    },
    plotOptions: {
      series: {
        // Configure options for all series (e.g., lines, bars, etc.)
        marker: {
          enabled: false,
          radius: 2,
          symbol: "circle",
        },
        lineWidth: 1,
        animation: true, // Disable animation for all series
      },
    },
    tooltip: {
      formatter() {
        let s =
          "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
        this.points.forEach((point) => {
          const y1 = point.y; // Accessing the y1 value
          const y2 = point.point.options.windDirection;
          
          s += ` <br/> Arah Angin: ` + y1 + "&deg " + `(${y2})`;
        });
        return s;
      },
    },
    series: [
      {
        name: "Arah Angin",
        type: "line",
        data: DATA_SENSOR.map((point) => ({
          x: point[0],
          y: point[1],
          windDirection: point[2],
        })),
        // lineColor: colorLine,
      },
    ],
  });

  redrawCustomMarkers(imageUrl);
}

// Function to redraw custom markers
function redrawCustomMarkers(img) {
  
  if (GRAFIK_WIND_DIRECTION == undefined) return;
  let points = GRAFIK_WIND_DIRECTION.series[0].points;
  let container = document.getElementById("container-windDirection-aws");

  // Remove existing custom markers
  container.querySelectorAll(".customMarker").forEach(function (marker) {
    marker.parentNode.removeChild(marker);
  });

  // Create and position new custom markers
  points.forEach(function (point) {
    let x = GRAFIK_WIND_DIRECTION.xAxis[0].toPixels(point.x);
    let y = GRAFIK_WIND_DIRECTION.yAxis[0].toPixels(point.y);

    // Create a new marker container
    // Create a new marker container (image tag)
    let marker = document.createElement("img");
    marker.className = "customMarker";
    marker.src = baseUrl; // Sample image source
    marker.style.position = "absolute";
    marker.style.width = "15px";
    marker.style.height = "15px";
    marker.style.left = x + "px"; // Adjusting for marker width
    marker.style.top = y - 7.5 + "px"; // Adjusting for marker height
    marker.style.transform = "rotate(" + point.y + "deg)"; // Rotate based on y-value
    // Append the marker container to the chart container
    container.appendChild(marker);
  });
}

function generateStyleWaterLevel(td, cellData, rowData, row, col) {
  if (IS_ONLY_MDPL) {
    return;
  }

  $(td).removeClass("bg-normal");
  $(td).removeClass("bg-siaga3");
  $(td).removeClass("bg-siaga2");
  $(td).removeClass("bg-siaga1");
  $(td).removeClass("bg-nostatus");

  if (rowData.unitSensor != "cmdpl" && rowData.unitSensor != "mdpl") {
    switch (rowData.warningStatus) {
      case "Normal":
        $(td).addClass("bg-normal");
        break;

      case "Siaga 3":
        $(td).addClass("bg-siaga3");
        break;

      case "Siaga 2":
        $(td).addClass("bg-siaga2");
        break;

      case "Siaga 1":
        $(td).addClass("bg-siaga1");
        break;
      default:
        $(td).addClass("bg-nostatus");
        break;
    }
  }
}

function generateStyleRainfall(td, cellData, rowData, row, col) {
  switch (cellData) {
    case "Berawan":
      $(td).addClass("bg-berawan");
      break;

    case "Hujan Ringan":
      $(td).addClass("bg-hujan-ringan");
      break;

    case "Hujan Sedang":
      $(td).addClass("bg-hujan-sedang");
      break;

    case "Hujan Lebat":
      $(td).addClass("bg-hujan-lebat");
      break;
    case "Hujan Sangat Lebat":
      $(td).addClass("bg-hujan-sangat-lebat");
      break;
  }
}
