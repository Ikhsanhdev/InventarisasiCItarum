"use strict";

var dataTelemetriAwlr;
var dataTelemetriArr;
const NOW_YEAR = new Date().getFullYear();
const STATION_ID = $("#station-id").val();
const STATION_TYPE = $("#station-type").val();
const FIRST_TAB = $(".tab-data")[0];
let URL;
let WAKTU;
var CHART;
var CHART_DEBIT;
const element = document.getElementById("data-telemetry-desc");

$(document).ready(function () {
  FIRST_TAB.click();
});

$(".tab-data").on("click", function () {
  fetchData($(this).data("id"));
});

// Functions
function fetchData(fromData) {
  let url = generateUrl(fromData);
  if (fromData == "data-pos") GetDataPos(url, STATION_ID);
  if (fromData == "data-telemetri") loadPartialView(fromData);
  if (fromData == "data-grafik") loadPartialView(fromData);
}

function generateUrl(fromData) {
  switch (fromData) {
    case "data-pos":
      return `/StationDetail/GetDataPos?StationId=${STATION_ID}`;
    case "data-telemetri":
      return `/StationDetail/GetDataTelemetri?StationId=${STATION_ID}`;
    case "data-grafik":
      return `/StationDetail/GetDataGrafik?StationId=${STATION_ID}`;
  }
}

function GetDataPos(url, id) {
  getData(url, id).then((response) => {
    var station = response.data.result;

    $("#pos-name").text(station.name);
    if (station.type == "AWLR") {
      $("#pos-desc").text("Pos Duga Air");
    } else if (station.type == "ARR") {
      $("#pos-desc").text("Pos Curah Hujan");
    } else {
      $("#pos-desc").text("-");
    }

    if (station.image == null) {
      station.image = "/images/default-image.png";
    } else {
      station.image = `/uploads/images/stations/${station.image}`;
    }

    $("#pos-image").attr("src", station.image);

    $("#detail_no_register").text(
      station.no_register == null ? "-" : station.no_register
    );
    $("#detail_elevation").text(
      station.elevation == null ? "-" : station.elevation
    );
    $("#detail_device_id").text(
      station.device_id == null ? "-" : station.device_id
    );
    $("#detail_device_merk").text(
      station.brand_name == null ? "-" : station.brand_name
    );
    $("#detail_wilayah_sungai").text(
      station.river_area_name == null ? "-" : station.river_area_name
    );
    $("#detail_das").text(
      station.watershedName == null ? "-" : station.watershedName
    );
    $("#detail_built_by").text(
      station.built_by == null ? "-" : station.built_by
    );
    $("#detail_built_year").text(
      station.built_year == null ? "-" : station.built_year
    );
    $("#detail_renov_by").text(
      station.renovation_by == null ? "-" : station.renovation_by
    );
    $("#detail_renov_year").text(
      station.renovation_by == null ? "-" : station.renovation_by
    );
    $("#detail_note").text(station.note == null ? "-" : station.note);
    $("#detail_coordinate").text(`${station.latitude} , ${station.longitude}`);
    $("#detail_province").text(
      station.province_name == null ? "-" : station.province_name
    );
    $("#detail_district").text(
      station.district_name == null ? "-" : station.district_name
    );
    $("#detail_village").text(
      station.village_name == null ? "-" : station.village_name
    );
    $("#detail_city").text(
      station.regency_name == null ? "-" : station.regency_name
    );
  });
}

function loadDataGrafik(type, waktu, periode) {
  $.ajax({
    url: `/StationDetail/GetDataGrafik?id=${STATION_ID}&waktu=${waktu}&periode=${periode}`,
    type: "GET",
    dataType: "json",
    async: true,

    success: function (data) {
      if (data.dataGrafik.length == 0) {
        const chart = document.getElementById("container");

        if (typeof Highcharts !== "undefined" && chart && CHART) {
          CHART.destroy();
          CHART = null;
        }

        const label = `<div class="text-center"> 
                                    <h5 class="text-secondary" id="not-exist-1">Data Grafik Tidak Tersedia</h5>
                                </div>`;
        if (!document.getElementById("not-exist-1")) {
          $("#container").append(label);
        }
        $("#label-grafik").hide();
      } else {
        $("#label-grafik").show();
        generateGrafik(
          type,
          periode,
          data,
          data.isElevasiExist,
          data.defaultElevation
        );
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function loadDataGrafikDebit(type, waktu, periode) {
  $.ajax({
    url: `/StationDetail/GetDataGrafik?id=${STATION_ID}&waktu=${waktu}&periode=${periode}`,
    type: "GET",
    dataType: "json",
    async: true,

    success: function (data) {
      if (type === "AWLR") {
        if (data.dataGrafikDebit.length == 0) {
          const chartDebit = document.getElementById("container");

          if (typeof Highcharts !== "undefined" && chartDebit && CHART_DEBIT) {
            CHART_DEBIT.destroy();
            CHART_DEBIT = null;
          }

          const label = `<div class="text-center">
                                    <h5 class="text-secondary" id="not-exist">Data Grafik Tidak Tersedia</h5>
                                </div>`;
          if (!document.getElementById("not-exist")) {
            $("#container-debit").append(label);
          }
        } else {
          generateGrafikDebit(
            type,
            periode,
            data,
            data.isElevasiExist,
            data.defaultElevation
          );
        }
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + status + " - " + error);
    },
  });
}

function generateGrafik(
  type,
  periode,
  data,
  iselevasiExsist,
  defaultEvelasiValue
) {
  let dataSeries = generateData(data.dataGrafik, iselevasiExsist);
  // let dataSeries2 = dataSeries.map(e => e.value + 2);
  // let isPlotBands = data.dataTma == null == null ? false : true;
  // let isGradasi = data.dataTma == null == null ? false : true;
  let maxSiaga =
    data.dataTma == null
      ? null
      : data.dataSiaga.siaga1 > data.dataTma.tmaMax
      ? data.dataSiaga.siaga1
      : data.dataTma.tmaMax;

  maxSiaga = maxSiaga == 0 ? 0.5 : maxSiaga + 1;
  //Elevasi

  console.log(data);

  let formattedDate = "";

  let splitPeriode = periode.split("-");
  if (splitPeriode.length == 2) {
    let date = moment(periode, "YYYY-MM");
    formattedDate = date.locale("id").format("MMMM YYYY");
  } else {
    let date = moment(periode, "YYYY-MM-DD");
    formattedDate = date.locale("id").format("DD MMMM YYYY");
  }

  if (type.toUpperCase() == "AWLR") {
    CHART = Highcharts.stockChart("container", {
      navigation: {
        buttonOptions: {
          enabled: false, // Disable zoom and pan buttons
        },
      },
      rangeSelector: {
        enabled: false, // Disable the range selector
      },
      title: {
        text: "Grafik Tinggi Muka Air",
      },
      subtitle: {
        text: `Per ${formattedDate}`,
      },
      yAxis: iselevasiExsist
        ? [
            {
              title: {
                text: "Tinggi Muka Air (m)",
              },
              max: maxSiaga,
              min: 0,
              opposite: false,
              plotLines: [
                {
                  value: data.dataSiaga.siaga3,
                  color: "yellow",
                  dashStyle: "shortdash",
                  width: 2,
                  label: {
                    text: "Siaga 3",
                  },
                },
                {
                  value: data.dataSiaga.siaga2,
                  color: "orange",
                  dashStyle: "shortdash",
                  width: 2,
                  label: {
                    text: "Siaga 2",
                  },
                },
                {
                  value: data.dataSiaga.siaga1,
                  color: "red",
                  dashStyle: "shortdash",
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
              max: defaultEvelasiValue + data.dataTma.tmaMax,
              min: defaultEvelasiValue + data.dataTma.tmaMin,
              opposite: true,
              showLastLabel: true,
              plotLines: [],
            },
          ]
        : {
            title: {
              text: "Tinggi Muka Air (m)",
            },
            max: maxSiaga,
            min: data.dataTma.tmaMin,
            opposite: false,
            plotLines: [
              {
                value: data.dataSiaga.siaga3,
                color: "yellow",
                dashStyle: "shortdash",
                width: 2,
                label: {
                  text: "Siaga 3",
                },
              },
              {
                value: data.dataSiaga.siaga2,
                color: "orange",
                dashStyle: "shortdash",
                width: 2,
                label: {
                  text: "Siaga 2",
                },
              },
              {
                value: data.dataSiaga.siaga1,
                color: "red",
                dashStyle: "shortdash",
                width: 2,
                label: {
                  text: "Siaga 1",
                },
              },
            ],
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

            if (iselevasiExsist) {
              s += "<br/>TMA         = " + y1 + " m";
              if (defaultEvelasiValue == null) {
                s += "<br/>Elevasi = -";
              } else {
                s += "<br/>Elevasi = " + (y1 + defaultEvelasiValue) + " Mdpl";
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
          type: "line",
          data: dataSeries,
          lineColor: Highcharts.getOptions().colors[0],
        },
      ],
    });
  }

  if (type.toUpperCase() == "ARR") {
    console.log(dataSeries);
    Highcharts.stockChart("container", {
      chart: {
        alignTicks: false,
      },
      rangeSelector: {
        selected: 1,
      },
      navigator: {
        enabled: false,
      },
      title: {
        text: "Grafik Curah Hujan",
      },
      subtitle: {
        text: `Per ${formattedDate}`,
      },
      xAxis: {
        type: "datetime",
        ccrosshair: true,
        title: {
          text: "Jam", // Set the title for the xAxis
        },
        labels: {
          format: "{value:%H}", // Format to display only hours
        },
        dateTimeLabelFormats: {
          hour: "%H", // Format for the tooltip
        },
        tickInterval: 3600 * 1000,
      },
      yAxis: {
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
          stacking: "normal",
          pointPadding: 0,
          groupPadding: 0,
          dataLabels: {
            enabled: false,
          },
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
              value: 20,
              color: "#FF7820", // Custom orange color
            },
            {
              color: "#F1556C", // Bootstrap danger color
            },
          ],
        },
      },
      tooltip: {
        formatter() {
          let s =
            "<b>" + Highcharts.dateFormat(" %e %B  %Y %H:%M", this.x) + "</b>";
          this.points.forEach((point) => {
            const y1 = point.y;
            s += "<br/>CH = " + point.y + " mm";
          });

          return s;
        },
      },
      series: [
        {
          type: "column",
          name: "CH",
          data: dataSeries.map((point) => ({
            x: point[0],
            y: point[1],
          })),
        },
      ],
    });
  }
}

function generateGrafikDebit(
  type,
  periode,
  data,
  iselevasiExsist,
  defaultEvelasiValue
) {
  let dataSeries = generateDataDebit(data.dataGrafikDebit, false);

  let formattedDate = "";

  let splitPeriode = periode.split("-");
  if (splitPeriode.length == 2) {
    let date = moment(periode, "YYYY-MM");
    formattedDate = date.locale("id").format("MMMM YYYY");
  } else {
    let date = moment(periode, "YYYY-MM-DD");
    formattedDate = date.locale("id").format("DD MMMM YYYY");
  }

  if (type.toUpperCase() == "AWLR") {
    CHART_DEBIT = Highcharts.stockChart("container-debit", {
      navigation: {
        buttonOptions: {
          enabled: false, // Disable zoom and pan buttons
        },
      },
      rangeSelector: {
        enabled: false, // Disable the range selector
      },
      title: {
        text: "Grafik Debit",
      },
      subtitle: {
        text: `Per ${formattedDate}`,
      },
      yAxis: {
        title: {
          text: "Debit (m3/s)",
        },
        max: maxSiaga,
        min: 0,
        opposite: false,
      },

      xAxis: {
        gapGridLineWidth: 0,
      },
      plotOptions: {
        series: {
          // Configure options for all series (e.g., lines, bars, etc.)
          marker: {
            enabled: true,
            radius: 4,
            symbol: "circle",
          },
          lineWidth: 2,
          animation: true, // Disable animation for all series
        },
      },
      tooltip: {
        formatter() {
          let s = "<b>" + Highcharts.dateFormat(" %e %b , %Y", this.x) + "</b>";
          this.points.forEach((point) => {
            const y1 = point.y; // Accessing the y1 value
            const y2 = point.point.y2; // Accessing the y2 value

            if (iselevasiExsist) {
              console.log(point);
              s += "<br/>TMA         = " + y1 + " m";
              if (defaultEvelasiValue == null) {
                s += "<br/>Elevasi = -";
              } else {
                s += "<br/>Elevasi = " + (y1 + defaultEvelasiValue) + " Mdpl";
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
          name: "Debit",
          type: "line",
          data: dataSeries,
          lineColor: Highcharts.getOptions().colors[0],
        },
      ],
    });
  }
}

function loadPartialView(fromData) {
  $(".loading-spinner").css("display", "block");
  let url = "";
  let idParent = "";
  switch (fromData) {
    case "data-pos":
      url = `/StationDetail/LoadPartialView?ToData=${fromData}&Type=${STATION_TYPE}`;
      break;
    case "data-telemetri":
      idParent = "tab-data-telemetri";
      url = `/StationDetail/LoadPartialView?ToData=${fromData}&Type=${STATION_TYPE}`;
      break;
    case "data-grafik":
      idParent = "tab-data-grafik";
      url = `/StationDetail/LoadPartialView?ToData=${fromData}&Type=${STATION_TYPE}`;
      break;
    default:
      break;
  }

  $.ajax({
    url: url,
    type: "GET",
    dataType: "html",
    success: function (data) {
      $(".loading-spinner").css("display", "none");
      $(`#${idParent}`).html(data);
    },
    error: function () {
      alert("An error occurred while loading the partial view.");
    },
  });
}

function loadDatePicker(dataParsial, waktu) {
  debugger;
  if (dataParsial == "data-grafik") {
    $("#periode-grafik").datepicker("destroy");
    $("#periode-akhir").datepicker("destroy");
    switch (waktu) {
      case "menit":
      case "jam":
        $("#periode-grafik")
          .datepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayHighlight: true,
            endDate: "{{ date('Y-m-d') }}",
            orientation: "bottom",
          })
          .on("changeDate", function (selected) {
            var minDate = new Date(selected.date.valueOf());
            console.log(minDate);
            $("#periode-akhir").datepicker("setStartDate", minDate);
          });
        $("#periode-akhir")
          .datepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayHighlight: true,
            endDate: "{{ date('Y-m-d') }}",
            orientation: "bottom",
            onSelect: function (selectedDate) {
              $("#periode-grafik").datepicker(
                "option",
                "maxDate",
                selectedDate
              );
            },
          })
          .on("changeDate", function (selected) {
            var maxDate = new Date(selected.date.valueOf());
            $("#periode-grafik").datepicker("setEndDate", maxDate);
          });
        $("#periode-grafik").datepicker("update", "{{ date('Y-m-d') }}");
        $("#periode-akhir").datepicker("update", "{{ date('Y-m-d') }}");
        break;
      case "hari":
        $("#periode-grafik").datepicker({
          format: "yyyy-mm",
          viewMode: "months",
          minViewMode: "months",
          endDate: "{{ date('Y-m') }}",
          autoclose: true,
          todayHighlight: true,
          orientation: "bottom",
        });
        $("#periode-grafik").datepicker("update", "{{ date('Y-m') }}");
        break;
      default:
        break;
    }
  }

  if (dataParsial == "data-telemetri") {
    $("#periode").datepicker("destroy");
    switch (waktu) {
      case "menit":
      case "jam":
        $("#periode").datepicker({
          format: "yyyy-mm-dd",
          autoclose: true,
          todayHighlight: true,
          endDate: "{{ date('Y-m-d') }}",
          orientation: "bottom",
        });
        $("#periode").datepicker("update", "{{ date('Y-m-d') }}");
        break;
      case "hari":
        $("#periode").datepicker({
          format: "yyyy-mm",
          viewMode: "months",
          minViewMode: "months",
          endDate: "{{ date('Y-m') }}",
          autoclose: true,
          todayHighlight: true,
          orientation: "bottom",
        });
        $("#periode").datepicker("update", "{{ date('Y-m') }}");
        break;
      default:
        break;
    }
  }
}

function loadDataTelemetriAwlr(url) {
  $("#table-telemetri").DataTable().destroy();
  dataTelemetriAwlr = $("#table-telemetri").DataTable({
    dom: "rti",
    paging: false,
    order: [[0, "desc"]],
    ajax: {
      url: url,
      type: "POST",
      contentType: "application/json",
      dataType: "JSON",
      data: function (d) {
        return JSON.stringify(d);
      },
    },
    columns: [
      {
        data: "tanggal",
        name: "tanggal",
        render: function (data, type, row) {
          console.log(data);
          return moment(data).locale("id").format("D MMMM YYYY");
        },
      },
      {
        data: "jam",
        render: function (data, type, row) {
          if (data == "" || data == null || data == undefined) return "";
          console.log(data);
          return moment(data).locale("id").format("HH:mm");
        },
      },
      { data: "tma" },

      {
        data: "perubahanStatus",
        render: function (data, type, row) {
          // console.log(row.perubahanValue + " " + row.satuanPerubahan);
          if (data == null || data == "" || data == "constant") return "";

          if (data == "decrease") {
            return `<span><i class="mdi mdi-arrow-down-circle text-success font-weight-bold"
                                style="font-size: 15px;"></i> ${row.perubahanValue} ${row.satuanPerubahan}</span>`;
          }
          if (data == "increase") {
            return `<span><i class="mdi mdi-arrow-up-circle text-danger font-weight-bold"
                                style="font-size: 15px;"></i> ${row.perubahanValue} ${row.satuanPerubahan}</span>`;
          }
        },
      },
      { data: "debit" },
      {
        data: "status",
        render: function (data, type, row) {
          if (data == "" || data == null || data == undefined) return "";
          switch (data) {
            case "Normal":
              return `<span class="badge bg-soft-success text-success">${data}</span>`;
              break;
            case "Siaga 1":
              return `<span class="badge bg-soft-danger text-danger">${data}</span>`;
            case "Siaga 2":
              return `<span class="badge bg-soft-success text-success">${data}</span>`;
            case "Siaga 3":
              return `<span class="badge bg-soft-warning text-warning">${data}</span>`;
            default:
              break;
          }
        },
      },
    ],
  });
}

function loadDataTelemetriArr(url, waktu) {
  $("#table-telemetri").DataTable().destroy();
  if (waktu.toUpperCase() == "MENIT") {
    dataTelemetriArr = $("#table-telemetri").DataTable({
      dom: "rti",
      paging: false,
      order: [[1, "desc"]],
      ajax: {
        url: url,
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: function (d) {
          return JSON.stringify(d);
        },
      },
      columns: [
        { data: null },
        {
          data: "tanggal",
          render: function (data, type, row) {
            console.log(data);
            return moment(data).locale("id").format("D MMMM YYYY");
          },
        },
        {
          data: "jam",
          render: function (data, type, row) {
            if (data == "" || data == null || data == undefined) return "";
            return moment(data).locale("id").format("HH:mm");
          },
        },
        { data: "ch" },
      ],
    });
  }

  if (waktu.toUpperCase() == "JAM") {
    dataTelemetriArr = $("#table-telemetri").DataTable({
      dom: "rti",
      paging: false,
      order: [[1, "desc"]],
      ajax: {
        url: url,
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: function (d) {
          return JSON.stringify(d);
        },
      },
      columns: [
        { data: null },
        {
          data: "tanggal",
          render: function (data, type, row) {
            return moment(data).locale("id").format("D MMMM YYYY");
          },
        },
        {
          data: "jam",
          render: function (data, type, row) {
            if (data == "" || data == null || data == undefined) return "";
            return moment(data).locale("id").format("HH:mm");
          },
        },
        { data: "ch", name: "ch" },
        { data: "intensitas", name: "intensitas" },
      ],
    });
  }

  if (waktu.toUpperCase() == "HARI") {
    dataTelemetriArr = $("#table-telemetri").DataTable({
      dom: "rti",
      paging: false,
      order: [[1, "desc"]],
      ajax: {
        url: url,
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: function (d) {
          return JSON.stringify(d);
        },
      },
      columns: [
        { data: null },
        {
          data: "datetimeOnly",
          render: function (data, type, row) {
            console.log(data);
            return moment(data).locale("id").format("D MMMM YYYY");
          },
        },
        { data: "ch", name: "ch" },
        { data: "intensitas", name: "intensitas" },
      ],
    });
  }
  dataTelemetriArr.on("draw.dt", function () {
    var info = dataTelemetriArr.page.info();
    dataTelemetriArr
      .column(0, { search: "applied", order: "applied", page: "applied" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + info.start;
      });
  });
}

function generateData(data, isElevasi) {
  if (data == undefined || data == null || data.length == 0) return [];
  let result = [];

  if (isElevasi) {
    result = data.map((item) => [item.millis, item.value, item.elevasi]);
  } else {
    result = data.map((item) => [item.millis, item.value]);
  }
  return result;
}

function generateDataGrafik(data, isElevasi) {
  if (data == undefined || data == null || data.length == 0) return [];
  let result = [];

  result = data.map((item) => [item.millis, item.debit]);
  return result;
}

function loadPartialTableArr(waktu) {
  let url = `/StationDetail/LoadPartialTableArr`;

  $.ajax({
    url: url, // Replace with your controller and action names
    type: "GET",
    dataType: "html",
    data: {
      waktu: waktu,
    },
    success: function (data) {
      $(`#parent-table`).html(data);
    },
    error: function () {
      alert("An error occurred while loading the partial view.");
    },
  });
}

function loadPartialTableAwlr(waktu) {
  let url = `/StationDetail/LoadPartialTableAwlr`;

  $.ajax({
    url: url, // Replace with your controller and action names
    type: "GET",
    dataType: "html",
    data: {
      waktu: waktu,
    },
    success: function (data) {
      $(`#parent-table`).html(data);
    },
    error: function () {
      alert("An error occurred while loading the partial view.");
    },
  });
}

function loadDataTelemetriAwlr(url, waktu) {
  $("#table-telemetri").DataTable().destroy();
  if (waktu.toUpperCase() == "MENIT" || waktu.toUpperCase() == "JAM") {
    dataTelemetriAwlr = $("#table-telemetri").DataTable({
      dom: "rti",
      paging: false,
      order: [[0, "desc"]],
      ajax: {
        url: url,
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: function (d) {
          return JSON.stringify(d);
        },
      },
      columns: [
        {
          data: "tanggal",
          name: "tanggal",
          className: "text-center",
          render: function (data, type, row) {
            console.log(data);
            return moment(data).locale("id").format("D MMMM YYYY");
          },
        },
        {
          data: "jam",
          name: "jam",
          className: "text-center",
          render: function (data, type, row) {
            if (data == "" || data == null || data == undefined) return "";
            console.log(data);
            return moment(data).locale("id").format("HH:mm");
          },
        },
        { data: "tma", className: "text-center" },
        {
          data: "elevasi",
          className: "text-center",
          render: function (data, type, row) {
            if (data == "" || data == null || data == undefined) return "";
            if (data <= 0) return data;
            return `+${data}`;
          },
        },
        {
          data: "perubahanStatus",
          className: "text-center",
          render: function (data, type, row) {
            // console.log(row.perubahanValue + " " + row.satuanPerubahan);
            if (data == null || data == "" || data == "constant") return "";

            if (data == "decrease") {
              return `<span><i class="mdi mdi-arrow-down-circle text-success font-weight-bold"
                                style="font-size: 15px;"></i> ${row.perubahanValue} ${row.satuanPerubahan}</span>`;
            }
            if (data == "increase") {
              return `<span><i class="mdi mdi-arrow-up-circle text-danger font-weight-bold"
                                style="font-size: 15px;"></i> ${row.perubahanValue} ${row.satuanPerubahan}</span>`;
            }
          },
        },
        { data: "debit", className: "text-center" },
        {
          data: "status",
          className: "text-center",
          render: function (data, type, row) {
            if (data == "" || data == null || data == undefined) return "";
            switch (data) {
              case "Normal":
                return `<span class="badge bg-soft-success text-success">${data}</span>`;
                break;
              case "Siaga 1":
                return `<span class="badge bg-soft-danger text-danger">${data}</span>`;
              case "Siaga 2":
                return `<span class="badge bg-soft-success text-success">${data}</span>`;
              case "Siaga 3":
                return `<span class="badge bg-soft-warning text-warning">${data}</span>`;
              default:
                break;
            }
          },
        },
      ],
    });
  }

  if (waktu.toUpperCase() == "HARI") {
    dataTelemetriAwlr = $("#table-telemetri").DataTable({
      dom: "rti",
      paging: false,
      order: [[0, "desc"]],
      ajax: {
        url: url,
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: function (d) {
          return JSON.stringify(d);
        },
      },

      columns: [
        { data: "tanggal" },
        { data: "average", name: "average", className: "text-center" },
        { data: "tmaMin", name: "tmaMin", className: "text-center" },
        { data: "tmaMax", name: "tmaMax", className: "text-center" },
      ],
    });
  }
}

// End Functionsp
