"use strict";

var dataTableAwlr;
var dataTableArr;
var dataTableWqms;
var dataTableAws;
var dataTableVnotch;

var TabelMonitoring = (function () {
  var initDataTable = function () {

    dataTableAwlr = $("#awlr-table").DataTable({
        processing: true,
        serverSide: true,
        paging: false,
        searching: false,
        ordering: false,
        info: false,
        ajax: {
            url: "/Home/GetDatatableMvAwlrLastReading",
            type: "POST",
            dataType: "JSON"
        },
        columns: [
            { data: null},
            { 
                data: "name",
                name: "name",
                render: function (data, type, row) {   
                    return `<a href="/Station/Detail/${row.slug}" target="_blank" class="text-blue fw-semibold">${data}</a>`;
                } 
            },
            // {
            //     data: null,
            //     name: null,
            //     render: function (data, type, row) {
            //         if(data != null) {
            //             return `<div class="d-flex align-items-center">
            //                 <span class="me-1">${row.brandName}</span>
            //                 <span class="badge badge-soft-secondary border-secondary border rounded-1 font-11">${row.deviceId}</span>
            //             </div>`;
            //         }

            //         return '-';
            //     } 
            // },
            { 
                data: "readingAt",
                name: "readingAt",
                className: "text-center",
                render: function (data, type, row) {
                    if(data != null) {
                        return `${moment(data).locale('id').format("D MMMM YYYY")}`;
                    }

                    return '-';
                } 
            },
            { 
                data: "readingAt",
                name: "readingAt",
                className: "text-center",
                render: function (data, type, row) {
                    if(data != null) {
                        return `${moment(data).locale('id').format("HH:mm")}`;
                    }

                    return '-';
                } 
            },
            { 
                data: "waterLevel",
                name: "waterLevel",
                className: "text-center",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).removeClass("bg-normal");
                    $(td).removeClass("bg-siaga3");
                    $(td).removeClass("bg-siaga2");
                    $(td).removeClass("bg-siaga1");
                    $(td).removeClass("bg-nostatus");

                    if(rowData.unitSensor != 'cmdpl' && rowData.unitSensor != 'mdpl') {
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
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    if((row.unitSensor == 'cmdpl' || row.unitSensor == 'mdpl') && data == row.waterLevelElevation) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data} ${row.unitDisplay}</span>`;
                } 
            },
            { 
                data: "waterLevelElevation",
                name: "waterLevelElevation",
                className: "text-center",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).removeClass("bg-normal");
                    $(td).removeClass("bg-siaga3");
                    $(td).removeClass("bg-siaga2");
                    $(td).removeClass("bg-siaga1");
                    $(td).removeClass("bg-nostatus");

                    if(rowData.unitSensor == 'cmdpl' || rowData.unitSensor == 'mdpl') {
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
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data}</span>`;
                } 
            },
            { 
                data: "changeStatus",
                name: "changeStatus",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == 'constant') {
                        return ``;
                    } else if(data == 'increase') {
                        return `<div class="d-flex justify-content-center align-items-center">
                            <i class="mdi mdi-arrow-up-circle text-danger font-16 me-1"></i>
                            <small class="text-danger">${row.changeValue}</small>
                        </div>`;
                    } else if(data == 'decrease') {
                        return `<div class="d-flex justify-content-center align-items-center">
                            <i class="mdi mdi-arrow-down-circle text-success font-16 me-1"></i>
                            <small class="text-success">${row.changeValue}</small>
                        </div>`;
                    }

                    return '';
                } 
            },
            { 
                data: "debit",
                name: "debit",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="fw-semibold">${data}</span>`;
                } 
            },
            { data: "battery", name: "battery", className: "text-center" }
            // { 
            //     data: "warningStatus",
            //     name: "warningStatus",
            //     className: "text-center",
            //     render: function (data, type, row) {
            //         if(data == 'Siaga 3') {
            //             return `<span class="badge rounded-1 shadow-sm font-12" style="background-color: rgba(226,206,6, .35);color: rgba(226,206,6);padding: 0.4rem 0.6rem;">Waspada</span>`;
            //         } else if(data == 'Siaga 2') {
            //             return `<span class="badge rounded-1 shadow-sm font-12" style="background-color: rgba(255, 166, 0, .35);color: rgba(255, 166, 0);padding: 0.4rem 0.6rem;">Siaga</span>`;
            //         } else if(data == 'Siaga 1') {
            //             return `<span class="badge bg-soft-danger text-danger rounded-1 shadow-sm font-12" style="padding: 0.4rem 0.6rem;">Awas</span>`;
            //         } else {
            //             return `<span class="badge badge-soft-secondary rounded-1 shadow-sm font-12" style="padding: 0.4rem 0.6rem;">Tanpa Status</span>`;
            //         }

            //         return '-';
            //     } 
            // }
        ],
        columnDefs: [
            {
                targets: 0,
                searchable: false,
                orderable: false,
                width: '6%',
                className: "text-center",
            }
        ],
        language: {
            url: '/data/datatable_locale_id.json'
        }
    });

    dataTableAwlr.on("draw.dt", function () {
      var info = dataTableAwlr.page.info();
      dataTableAwlr
        .column(0, { search: "applied", order: "applied", page: "applied" })
        .nodes()
        .each(function (cell, i) {
          cell.innerHTML = i + 1 + info.start;
        });
    });

    dataTableArr = $("#arr-table").DataTable({
        processing: true,
        serverSide: true,
        paging: false,
        searching: false,
        ordering: false,
        info: false,
        scrollX: false,
        ajax: {
            url: "/Home/GetDatatableMvArrLastReading",
            type: "POST",
            dataType: "JSON"
        },
        columns: [
            { data: null},
            { 
                data: "name",
                name: "name",
                render: function (data, type, row) {   
                    return `<a href="/Station/Detail/${row.slug}" target="_blank" class="text-blue fw-semibold">${data}</a>`;
                } 
            },
            // {
            //     data: null,
            //     name: null,
            //     render: function (data, type, row) {
            //         if(data != null) {
            //             return `<div class="d-flex align-items-center">
            //                 <span class="me-1">${row.brandName}</span>
            //                 <span class="badge badge-soft-secondary border-secondary border rounded-1 font-11">${row.deviceId}</span>
            //             </div>`;
            //         }

            //         return '-';
            //     } 
            // },
            { 
                data: "readingAt",
                name: "readingAt",
                className: "text-center text-nowrap",
                render: function (data, type, row) {
                    if(data != null) {
                        return `${moment(data).locale('id').format("D MMMM YYYY")}`;
                    }

                    return '-';
                } 
            },
            { 
                data: "readingAt",
                name: "readingAt",
                className: "text-center",
                render: function (data, type, row) {
                    if(data != null) {
                        return `${moment(data).locale('id').format("HH:mm")}`;
                    }

                    return '-';
                } 
            },
            { 
                data: "rainfallLastHour",
                name: "rainfallLastHour",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data}</span>`;
                } 
            },
            { 
                data: "intensityLastHour",
                name: "intensityLastHour",
                className: "text-center text-nowrap",
                createdCell: function(td, cellData, rowData, row, col) {
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
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    // return `<div class="d-flex flex-column align-items-center"><img src="/images/arr/${getIntensityIcon(data)}" alt="${data}" class="avatar-xs">
                    // <a href="javascript:void(0);" class="text-body font-13">${data}</a></div>`;
                    return `<span class="text-dark fw-semibold">${data}</span>`;
                } 
            },
            { 
                data: "rainfallLastDay",
                name: "rainfallLastDay",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data}</span>`;
                } 
            },
            { 
                data: "intensityLastDay",
                name: "intensityLastDay",
                className: "text-center text-nowrap",
                createdCell: function(td, cellData, rowData, row, col) {
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
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    // return `<div class="d-flex flex-column align-items-center"><img src="/images/arr/${getIntensityIcon(data)}" alt="${data}" class="avatar-xs">
                    // <a href="javascript:void(0);" class="text-body font-13">${data}</a></div>`;
                    return `<span class="text-dark fw-semibold">${data}</span>`;
                } 
            },
            { 
                data: "battery",
                name: "battery",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return data;
                } 
            }
        ],
        columnDefs: [
            {
                targets: 0,
                searchable: false,
                orderable: false,
                width: '6%',
                className: "text-center",
            }
        ],
        language: {
            url: '/data/datatable_locale_id.json'
        }
    });

    dataTableArr.on("draw.dt", function () {
        var info = dataTableArr.page.info();
        dataTableArr
          .column(0, { search: "applied", order: "applied", page: "applied" })
          .nodes()
          .each(function (cell, i) {
            cell.innerHTML = i + 1 + info.start;
          });
    });

    dataTableWqms = $("#wqms-table").DataTable({
        processing: true,
        serverSide: true,
        paging: false,
        searching: false,
        ordering: false,
        info: false,
        scrollX: false,
        ajax: {
            url: "/Home/GetDatatableMvWqmsLastReading",
            type: "POST",
            dataType: "JSON"
        },
        columns: [
            { data: null},
            { 
                data: "name",
                name: "name",
                render: function (data, type, row) {   
                    return `<a href="/Station/Detail/${row.slug}" target="_blank" class="text-blue fw-semibold">${data}</a>`;
                } 
            },
            { 
                data: "readingAt",
                name: "readingAt",
                className: "text-center text-nowrap",
                render: function (data, type, row) {
                    if(data != null) {
                        return `${moment(data).locale('id').format("D MMMM YYYY")}`;
                    }

                    return '-';
                } 
            },
            { 
                data: "readingAt",
                name: "readingAt",
                className: "text-center",
                render: function (data, type, row) {
                    if(data != null) {
                        return `${moment(data).locale('id').format("HH:mm")}`;
                    }

                    return '-';
                } 
            },
            { 
                data: "temperature",
                name: "temperature",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return data;
                } 
            },
            { 
                data: "ph",
                name: "ph",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return data;
                } 
            },
            { 
                data: "orp",
                name: "orp",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return data;
                } 
            },
            { 
                data: "turbidity",
                name: "turbidity",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return data;
                } 
            },
            { 
                data: "battery",
                name: "battery",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return data;
                } 
            }
        ],
        columnDefs: [
            {
                targets: 0,
                searchable: false,
                orderable: false,
                width: '6%',
                className: "text-center",
            }
        ],
        language: {
            url: '/data/datatable_locale_id.json'
        }
    });

    dataTableWqms.on("draw.dt", function () {
        var info = dataTableWqms.page.info();
        dataTableWqms
          .column(0, { search: "applied", order: "applied", page: "applied" })
          .nodes()
          .each(function (cell, i) {
            cell.innerHTML = i + 1 + info.start;
          });
    });

    dataTableAws = $("#aws-table").DataTable({
        processing: true,
        serverSide: true,
        paging: false,
        searching: false,
        ordering: false,
        info: false,
        scrollX: false,
        ajax: {
            url: "/Home/GetDatatableMvAwsLastReading",
            type: "POST",
            dataType: "JSON"
        },
        columns: [
            { data: null},
            { 
                data: "name",
                name: "name",
                className: "text-nowrap",
                render: function (data, type, row) {   
                    return `<a href="/Station/Detail/${row.slug}" target="_blank" class="text-blue fw-semibold">${data}</a>`;
                } 
            },
            { 
                data: "readingAt",
                name: "readingAt",
                className: "text-center text-nowrap",
                render: function (data, type, row) {
                    if(data != null) {
                        return `${moment(data).locale('id').format("D MMMM YYYY")}`;
                    }

                    return '-';
                } 
            },
            { 
                data: "readingAt",
                name: "readingAt",
                className: "text-center text-nowrap",
                render: function (data, type, row) {
                    if(data != null) {
                        return `${moment(data).locale('id').format("HH:mm")}`;
                    }

                    return '-';
                } 
            },
            { 
                data: "humidity",
                name: "humidity",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data}%</span><br/><small class="text-muted">${row.humidityStatus}</small>`;
                } 
            },
            { 
                data: "intensityLastHour",
                name: "intensityLastHour",
                className: "text-center text-nowrap",
                createdCell: function(td, cellData, rowData, row, col) {
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
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${row.rainfallLastHour}</span><br/><small style="color: #555555;font-weight:500;">${data}</small>`;
                } 
            },
            { 
                data: "pressure",
                name: "pressure",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data}</span>`;
                } 
            },
            { 
                data: "solarRadiation",
                name: "solarRadiation",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data}</span>`;
                } 
            },
            { 
                data: "temperature",
                name: "temperature",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data}</span>`;
                } 
            },
            { 
                data: "windDirection",
                name: "windDirection",
                className: "text-center text-nowrap",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data}&deg;</span><br/>
                    <small class="d-flex justify-content-center align-items-center text-muted">
                        <span style="transform: rotate(${data}deg);"><i class="mdi mdi-navigation"></i></span>
                        <span class="ms-1">${row.windDirectionStatus}</span>
                    </small>`;
                } 
            },
            { 
                data: "windSpeed",
                name: "windSpeed",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data}</span>`;
                } 
            },
            { 
                data: "evaporation",
                name: "evaporation",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data}</span>`;
                } 
            },
            { 
                data: "battery",
                name: "battery",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data}</span>`;
                } 
            }
        ],
        columnDefs: [
            {
                targets: 0,
                searchable: false,
                orderable: false,
                width: '6%',
                className: "text-center",
            }
        ],
        language: {
            url: '/data/datatable_locale_id.json'
        }
    });

    dataTableAws.on("draw.dt", function () {
        var info = dataTableAws.page.info();
        dataTableAws
          .column(0, { search: "applied", order: "applied", page: "applied" })
          .nodes()
          .each(function (cell, i) {
            cell.innerHTML = i + 1 + info.start;
          });
    });

    dataTableVnotch = $("#vnotch-table").DataTable({
        processing: true,
        serverSide: true,
        paging: false,
        searching: false,
        ordering: false,
        info: false,
        ajax: {
            url: "/Home/GetDatatableMvVnotchLastReading",
            type: "POST",
            dataType: "JSON"
        },
        columns: [
            { data: null},
            { 
                data: "name",
                name: "name",
                render: function (data, type, row) {   
                    return `<a href="/Station/Detail/${row.slug}" target="_blank" class="text-blue fw-semibold">${data}</a>`;
                } 
            },
            { 
                data: "readingAt",
                name: "readingAt",
                className: "text-center",
                render: function (data, type, row) {
                    if(data != null) {
                        return `${moment(data).locale('id').format("D MMMM YYYY")}`;
                    }

                    return '-';
                } 
            },
            { 
                data: "readingAt",
                name: "readingAt",
                className: "text-center",
                render: function (data, type, row) {
                    if(data != null) {
                        return `${moment(data).locale('id').format("HH:mm")}`;
                    }

                    return '-';
                } 
            },
            { 
                data: "waterLevel",
                name: "waterLevel",
                className: "text-center",
                render: function (data, type, row) {
                    return `<span class="text-dark fw-semibold">${data} ${row.unitDisplay}</span>`;
                } 
            },
            { 
                data: "changeStatus",
                name: "changeStatus",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == 'constant') {
                        return ``;
                    } else if(data == 'increase') {
                        return `<div class="d-flex justify-content-center align-items-center">
                            <i class="mdi mdi-arrow-up-circle text-danger font-16 me-1"></i>
                            <small class="text-danger">${row.changeValue}</small>
                        </div>`;
                    } else if(data == 'decrease') {
                        return `<div class="d-flex justify-content-center align-items-center">
                            <i class="mdi mdi-arrow-down-circle text-success font-16 me-1"></i>
                            <small class="text-success">${row.changeValue}</small>
                        </div>`;
                    }

                    return '';
                } 
            },
            { 
                data: "debit",
                name: "debit",
                className: "text-center",
                render: function (data, type, row) {
                    if(data == null) {
                        return '-';
                    }

                    return `<span class="text-dark fw-semibold">${data} ${row.unitDebit}</span>`;
                } 
            },
            { data: "battery", name: "battery", className: "text-center" }
        ],
        columnDefs: [
            {
                targets: 0,
                searchable: false,
                orderable: false,
                width: '6%',
                className: "text-center",
            }
        ],
        language: {
            url: '/data/datatable_locale_id.json'
        }
    });

    dataTableVnotch.on("draw.dt", function () {
      var info = dataTableVnotch.page.info();
      dataTableVnotch
        .column(0, { search: "applied", order: "applied", page: "applied" })
        .nodes()
        .each(function (cell, i) {
          cell.innerHTML = i + 1 + info.start;
        });
    });

    setInterval(loadLastReading, 300000);
  };

  return {
    //main function to initiate the module
    init: function () {
      initDataTable();
    },
  };
})();

jQuery(document).ready(function () {
  TabelMonitoring.init();
});

function loadLastReading() {
    dataTableAwlr.ajax.reload();
    dataTableArr.ajax.reload();
    // datatableAwlrArr.ajax.reload();
    // datatableAws.ajax.reload();
}

function getIntensityIcon(status) {

    let timeOfDay = 'pagi';

    let momentjs = moment();
    momentjs.locale('id');

    momentjs.tz("Asia/Jakarta");

    let currentHour = momentjs.hours();

    if (currentHour >= 5 && currentHour < 10) {
        timeOfDay = 'pagi';
    } else if (currentHour >= 10 && currentHour < 17) {
        timeOfDay = 'siang';
    } else if (currentHour >= 17 && currentHour < 19) {
        timeOfDay = 'sore';
    } else {
        timeOfDay = 'malam';
    }

    let icon = 'berawan.png';

    switch (status) {
        case 'Berawan':
            icon = `berawan-${timeOfDay}.png`;
            break;

        case 'Hujan Ringan':
            icon = 'hujan-ringan.png';
            break;

        case 'Hujan Sedang':
            icon = 'hujan-sedang.png';
            break;

        case 'Hujan Lebat':
            icon = 'hujan-lebat.png';
            break;

        case 'Hujan Sangat Lebat':
            icon = 'hujan-sangat-lebat.png';
            break;
    }

    return icon;
}
