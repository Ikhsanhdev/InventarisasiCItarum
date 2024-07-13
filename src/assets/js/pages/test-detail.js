"use strict";

var dataTelemetriAwlr;
var dataTelemetriArr;
const NOW_YEAR      = new Date().getFullYear();
const STATION_ID    = $("#station-id").val();
const STATION_TYPE  = $("#station-type").val();
const FIRST_TAB     = $(".tab-data")[0];
let URL;
let WAKTU;

$(document).ready(function(){
    FIRST_TAB.click();
});

$(".tab-data").on('click', function(){
    fetchData($(this).data("id"));
});

// Functions
function fetchData(fromData){
    let url = generateUrl(fromData);
    if(fromData == "data-pos") GetDataPos(url,STATION_ID);
    if(fromData == "data-telemetri") loadPartialView(fromData);
    if(fromData == "data-grafik") loadPartialView(fromData);
}

function generateUrl(fromData){
    switch(fromData){
        case "data-pos":
            return `/StationDetail/GetDataPos?StationId=${STATION_ID}`;
        case "data-telemetri":
            return `/StationDetail/GetDataTelemetri?StationId=${STATION_ID}`;
        case "data-grafik":
            return `/StationDetail/GetDataGrafik?StationId=${STATION_ID}`;
    }
}

function GetDataPos(url, id){
    getData(url,id).then(response => {
        var station = response.data;
        $("#pos-name").text(station.name);
        if(station.type == "AWLR"){
            $("#pos-desc").text("Pos Duga Air");
        }else if(station.type == "ARR"){
            $("#pos-desc").text("Pos Curah Hujan");
        }else{
            $("#pos-desc").text("-");
        }

        $("#detail_no_register").text(station.noRegister == null ? "-" : station.noRegister);
        $("#detail_elevation").text(station.elevation == null ? "-" : station.elevation);
        $("#detail_device_id").text(station.devices[0].deviceId == null ? "-" : station.devices[0].deviceId);
        $("#detail_device_merk").text(station.devices[0].brand.name == null ? "-" : station.devices[0].brand.name);
        $("#detail_wilayah_sungai").text(station.watershed == null ? "-" : station.watershed[0].riverArea.name);
        $("#detail_das").text(station.watershed == null ? "-" : station.watershed[0].name);
        $("#detail_built_by").text(station.builtBy == null ? "-" : station.builtBy);
        $("#detail_built_year").text(station.builtYear == null ? "-" : station.builtYear);
        $("#detail_renov_by").text(station.renovationBy == null ? "-" : station.renovationBy);
        $("#detail_renov_year").text(station.renovationYear == null ? "-" : station.renovationYear);
        $("#detail_note").text(station.note == null ? "-" : station.note);
        $("#detail_coordinate").text(`${station.latitude} , ${station.longitude}`);
        $("#detail_province").text(station.province == null ? "-" : station.province[0].name);
        $("#detail_district").text(station.district == null ? "-" : station.district[0].name);
        $("#detail_village").text(station.village == null ? "-" : station.village[0].name);
        $("#detail_city").text(station.regency == null ? "-" : station.regency[0].name);

    });
}

function loadDataGrafik(type,waktu,periode){
    $.ajax({
        url: `/StationDetail/GetDataGrafik?id=${STATION_ID}&waktu=${waktu}&periode=${periode}`, // Replace with your API endpoint
        type: "GET",
        dataType: "json",
        async : true,
        success: function(data) {
            generateGrafik(type,periode, data);  
        },
        error: function(xhr, status, error) {
            console.error("Error: " + status + " - " + error);
        }
    });
}

function generateGrafik(type, periode, data){

    let dataSeries = generateData(data.dataGrafik);
    let isPlotBands = data.dataTma == null == null ? false : true;
    let isGradasi = data.dataTma == null == null ? false : true;
    let maxSiaga = data.dataTma == null ? null : (data.dataSiaga.siaga1 > data.dataTma.tmaMax ? data.dataSiaga.siaga1 : data.dataTma.tmaMax);

    let formattedDate = '';

    let splitPeriode = periode.split("-");
    if(splitPeriode.length == 2){
        let date = moment(periode, 'YYYY-MM');
        formattedDate = date.locale('id').format('MMMM YYYY');
    }else{
        let date = moment(periode, 'YYYY-MM-DD');
        formattedDate = date.locale('id').format('DD MMMM YYYY');
    }

    if(type.toUpperCase() == "AWLR"){
            Highcharts.stockChart('container', {
            title: {
                text: 'Grafik Tinggi Muka Air'
            },
            subtitle: {
                text: `Per ${formattedDate}`
            },
            yAxis: {
                title: {
                    text: 'Tinggi Muka Air (m)'
                },
                max : null,
                min : null,
                opposite: false,
                labels:{
                    style:{
                        align: "left"
                    }
                },
                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,
                plotBands: !isPlotBands ? null : [{ // Light air
                    from: data.dataSiaga.siaga3,
                    to: (data.dataSiaga.siaga2 - 0.01),
                    color: 'rgba(255, 218, 79, 0.3)',
                    label: {
                        text: 'Siaga 3',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Light breeze
                    from: data.dataSiaga.siaga2,
                    to: (data.dataSiaga.siaga1 - 0.01),
                    color: 'rgba(255, 166, 0, 0.3)',
                    label: {
                        text: 'Siaga 2',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Gentle breeze
                    from: data.dataSiaga.siaga2,
                    to: maxSiaga,
                    color: 'rgba(239, 83, 80, 0.3)',
                    label: {
                        text: 'Siaga 1',
                        style: {
                            color: '#606060'
                        }
                    }
                },]
            },
            xAxis: {
                gapGridLineWidth: 0
            },
            plotOptions: {
                series: {
                    // Configure options for all series (e.g., lines, bars, etc.)
                    marker: {
                        enabled: true,
                        radius: 4,
                        symbol: 'circle'
                    },
                    lineWidth: 2,
                    animation: false // Disable animation for all series
                },
                line: {
                    // Configure options for line series specifically
                    
                    // You can add more line-specific options here
                }
            },

            series: [{
                name: 'TMA',
                type: 'area',
                data: dataSeries,
                lineColor: '#2B7FB4',
                tooltip: {
                    valueDecimals: 2
                },
                fillOpacity: 0.1,
                fillColor: !isGradasi ? Highcharts.getOptions().colors[0] : {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                threshold: null
            }]
        });
    }

    if(type.toUpperCase() == "ARR"){
        Highcharts.stockChart('container', {
                chart: {
                    alignTicks: false
                },

                rangeSelector: {
                    selected: 1
                },
                
                title: {
                    text: 'Grafik Curah Hujan'
                },

                subtitle: {
                    text: `Per ${formattedDate}`
                },
                
                yAxis : {
                    title: {
                        text: 'Curah Hujan (mm)'
                },
                    opposite: false,
                },
                series: [{
                    type: 'column',
                    name: 'CH',
                    data: dataSeries,
                    // dataGrouping: {
                    //     units: [[
                    //         'second', // unit name
                    //         [1] // allowed multiples
                    //     ], [
                    //         'month',
                    //         [1, 2, 3, 4, 6]
                    //     ]]
                    // }
                }]
            });
    }
   
}

function loadPartialView(fromData){
    $(".loading-spinner").css('display', 'block');
    let url = "";
    let idParent = "";
    switch(fromData){
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
        url: url, // Replace with your controller and action names
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            $(".loading-spinner").css('display', 'none');
            $(`#${idParent}`).html(data);  
        },
        error: function () {
            alert('An error occurred while loading the partial view.');
        }
    });
}

function loadDatePicker(dataParsial,waktu){
    debugger;
    if(dataParsial == "data-grafik"){
         $('#periode-grafik').datepicker('destroy');
         switch (waktu) {
            case "menit":
            case "jam"  :
                $("#periode-grafik").datepicker({
                format: "yyyy-mm-dd",
                    autoclose: true,
                    todayHighlight: true,
                    endDate: "{{ date('Y-m-d') }}",
                    orientation: "bottom",
                });
                $("#periode-grafik").datepicker("update", "{{ date('Y-m-d') }}");
                break;
            case "hari":
                $("#periode-grafik").datepicker({
                    format: "yyyy-mm",
                    viewMode: "months",
                    minViewMode: "months",
                    endDate: "{{ date('Y-m') }}",
                    autoclose: true,
                    todayHighlight: true,
                    orientation: "bottom"
                });
                $("#periode-grafik").datepicker("update", "{{ date('Y-m') }}");
                break;
            default:
                break;
        }
    }

    if(dataParsial == "data-telemetri"){
        $('#periode').datepicker('destroy');
        switch (waktu) {
            case "menit":
            case "jam"  :
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
                    orientation: "bottom"
                });
                $("#periode").datepicker("update", "{{ date('Y-m') }}");
                break;
            default:
                break;
        }

    }

}

function loadDataTelemetriAwlr(url){
     $("#table-telemetri").DataTable().destroy();
        dataTelemetriAwlr = $("#table-telemetri").DataTable({
            "dom": 'rti',
            paging : false,
            "order": [[0, "desc"]],
            ajax: {
                url: url,
                type: "POST",
                contentType: "application/json",
                dataType: "JSON",
                data: function (d) {
                    return JSON.stringify(d);
                }
            },
            columns: [
                {data: "tanggal"},
                {data: "jam", render: function(data,type,row){
                    if(data == "" || data == null || data == undefined) return "";
                    return data.replace(".",":");
                }},
                {data: "tma"},
                {   data : "perubahanStatus",
                    render: function(data,type,row){
                    // console.log(row.perubahanValue + " " + row.satuanPerubahan);
                    if(data == null || data == "" || data == "constant") return "";
                    
                    if(data == "decrease"){
                        return `<span><i class="mdi mdi-arrow-down-circle text-success font-weight-bold"
                                style="font-size: 15px;"></i> ${row.perubahanValue} ${row.satuanPerubahan}</span>`
                    }
                    if(data == "increase"){
                        return `<span><i class="mdi mdi-arrow-up-circle text-danger font-weight-bold"
                                style="font-size: 15px;"></i> ${row.perubahanValue} ${row.satuanPerubahan}</span>`
                    }
                }},
                {data: "debit"},
                {data: "status", render: function(data,type,row){
                    if(data == "" || data == null || data == undefined) return "";
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
                    
                }},
            ],
            
        });
}

function loadDataTelemetriArr(url,waktu){
    $("#table-telemetri").DataTable().destroy();
    if(waktu.toUpperCase() == "MENIT"){
        dataTelemetriArr = $("#table-telemetri").DataTable({
            "dom": 'rti',
            paging : false,
            "order": [[1, "desc"]],
            ajax: {
                url: url,
                type: "POST",
                contentType: "application/json",
                dataType: "JSON",
                data: function (d) {
                    return JSON.stringify(d);
                }
            },
            columns: [
                {data: null},
                {data: "tanggal"},
                {data: "jam", render: function(data,type,row){
                    if(data == "" || data == null || data == undefined) return "";
                    return data.split('.').join(":"); 
                }},
                {data: "ch"}, 
            ],
            
        });
    }

    if(waktu.toUpperCase() == "JAM"){
        dataTelemetriArr = $("#table-telemetri").DataTable({
            "dom": 'rti',
            paging : false,
            "order": [[1, "desc"]],
            ajax: {
                url: url,
                type: "POST",
                contentType: "application/json",
                dataType: "JSON",
                data: function (d) {
                    return JSON.stringify(d);
                }
            },
            columns: [
                {data: null},
                {data: "tanggal"},
                {data: "jam", render: function(data,type,row){
                    if(data == "" || data == null || data == undefined) return "";
                    return data.replace(".",":");
                }},
                {data: "ch", name: "ch"}, 
                {data: "intensitas", name: "intensitas"}, 
            ],
            
        });
    }

    if(waktu.toUpperCase() == "HARI"){
        dataTelemetriArr = $("#table-telemetri").DataTable({
            "dom": 'rti',
            paging : false,
            "order": [[1, "desc"]],
            ajax: {
                url: url,
                type: "POST",
                contentType: "application/json",
                dataType: "JSON",
                data: function (d) {
                    return JSON.stringify(d);
                }
            },
            columns: [
                {data: null},
                {data: "tanggal"},
                {data: "ch", name: "ch"}, 
                {data: "intensitas", name: "intensitas"}, 
            ],
            
        });
    }
    dataTelemetriArr.on('draw.dt', function () {
            var info = dataTelemetriArr.page.info();
            dataTelemetriArr.column(0, { search: 'applied', order: 'applied', page: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
    });
}

function generateData(data){
    if(data == undefined || data == null || data.length == 0) return [];
    let result = [];
    for (let index = 0; index < data.length; index++) {
        let temp = [];
        temp.push(new Date(data[index].date).getTime())
        temp.push(data[index].value);
        result.push(temp)
    }

    return result;
}

function loadPartialTableArr(waktu){
    let url = `/StationDetail/LoadPartialTableArr`;

    $.ajax({
        url: url, // Replace with your controller and action names
        type: 'GET',
        dataType: 'html',
        data : {
            waktu : waktu
        },
        success: function (data) {
            $(`#parent-table`).html(data);  
        },
        error: function () {
            alert('An error occurred while loading the partial view.');
        }
    });
}
// End Functions