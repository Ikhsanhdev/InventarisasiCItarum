"use strict";

let markers;
var load_markers = [];
let contentPopup;
let markerIcon;
let popup;

var mapElement = $(document.getElementById('ts-map-hero'));
var mapDefaultZoom = parseInt(mapElement.attr("data-map-zoom"), 10);
var mapCenterLatitude = mapElement.attr("data-map-center-latitude");
var mapCenterLongitude = mapElement.attr("data-map-center-longitude");

var map = L.map('ts-map-hero', {maxZoom: 17}).setView([mapCenterLatitude,mapCenterLongitude], mapDefaultZoom);

// var stations = [
//     {
//         "name": "PDA BENDUNG KATULAMPA",
//         "latitude": -6.633366,
//         "longitude": 106.837020,
//         "tipe": 'AWLR',
//         "status": 'leaflet-marker-siaga-1',
//     },
//     {
//         "name": "PDA MT HARYONO",
//         "latitude": -6.242646,
//         "longitude": 106.862447,
//         "tipe": 'AWLR',
//         "status": 'normal',
//     },
//     {
//         "name": "PDA OUTLET BENDUNGAN SUKAMAHI",
//         "latitude": -6.301500,
//         "longitude": 106.762990,
//         "tipe": 'AWLR',
//         "status": 'leaflet-marker-normal',
//     },
//     {
//         "name": "PDA INLET BENDUNGAN SUKAMAHI",
//         "latitude": -6.301500,
//         "longitude": 106.762990,
//         "tipe": 'AWLR',
//         "status": 'leaflet-marker-siaga-3',
//     },
//     {
//         "name": "PDA MANGGARAI",
//         "latitude": -6.207630,
//         "longitude": 106.848490,
//         "tipe": 'AWLR',
//         "status": 'leaflet-marker-siaga-2',
//     },
//     {
//         "name": "PDA KAMPUNG KELAPA",
//         "latitude": -6.207630,
//         "longitude": 106.848490,
//         "tipe": 'AWLR',
//         "status": 'leaflet-marker-normal',
//     },
//     {
//         "name": "RENCANA ARR / Pos Curah Hujan 1",
//         "latitude": -6.687317,
//         "longitude": 106.937053,
//         "tipe": 'ARR'
//     },
//     {
//         "name": "RENCANA ARR / Pos Curah Hujan 2",
//         "latitude": -6.631972,
//         "longitude": 106.836236,
//         "tipe": 'ARR'
//     },
//     {
//         "name": "RENCANA ARR / Pos Curah Hujan 3",
//         "latitude": -6.513878,
//         "longitude": 106.805036,
//         "tipe": 'ARR'
//     },
//     {
//         "name": "RENCANA ARR / Pos Curah Hujan 4",
//         "latitude": -6.434878,
//         "longitude": 106.826269,
//         "tipe": 'ARR'
//     },
//     {
//         "name": "RENCANA ARR / Pos Curah Hujan 5",
//         "latitude": -6.334083,
//         "longitude": 106.847517,
//         "tipe": 'ARR'
//     },
//     {
//         "name": "RENCANA ARR / Pos Curah Hujan 6",
//         "latitude": -6.253772,
//         "longitude": 106.856439,
//         "tipe": 'ARR'
//     },
// ];

var RealtimeMonitoringSystem = function () {

    var initInput = function(){
        
    }

    var initMap = function () {
        $('#group-awlr, #group-arr').hide();
        $('#group-awlr-shimmer, #group-arr-shimmer').show();

        var gl = L.mapboxGL({
            accessToken: 'pk.eyJ1IjoiaGFuZHlhc3dhbiIsImEiOiJjbDY3YmNmcGgwODAxM2R0YjZzY3ZkN3M5In0.7aDstmvWZvOmZIwyPfMB4g',
            style: 'mapbox://styles/mapbox/streets-v11'
        }).addTo(map);
  
        map.removeControl(map.zoomControl);
  
        const legend = L.control({position: 'bottomright'});
  
        legend.onAdd = function (map) {
  
            const div = L.DomUtil.create('div', 'info legend');
            const labels = [];
            labels.push(`<div class="mb-1"><i class="das" style="background: #CD30B2;"></i> Batas DAS</div>`);
            labels.push(`<div class="mb-1"><i class="fas fa-water icon-round-legend round-pda-legend"></i> Pos Duga Air</div>`);
            labels.push(`<div class="mb-1"><i class="wi wi-sleet icon-round-legend round-pch-legend"></i> Pos Curah Hujan</div>`);
            // labels.push(`<div class="mb-1"><i class="wi wi-cloudy-gusts icon-round-legend round-aws-legend"></i> Pos Klimatologi</div>`);
  
            div.innerHTML = labels.join('');
            return div;
        };
  
        legend.addTo(map);
  
        var controlLayers = L.control.layers(null, null, {position:'bottomright'}).addTo(map);
  
        $.getJSON('/data/das_kapuas.json', function (geojson) {
            var geojsonLayer = L.geoJson(geojson, {
                style: function (feature) {
                    return {
                        'weight': 1,
                        'color': '#CD30B2',
                        'fillColor': 'transparent',
                        'fillOpacity': 0.2
                    }
                },
                onEachFeature: function (feature, layer) {
                    if(feature.properties.NAMA_DAS != null) {
                        layer.bindTooltip(feature.properties.NAMA_DAS, 
                        { 
                            direction: 'center',
                            permanent: false,
                            opacity: 0.75,
                            // sticky: true,
                            className: 'leaflet-tooltip-own'
                        }).openTooltip();

                        controlLayers.addOverlay(layer, feature.properties.NAMA_DAS);
                    }
                }
            }).addTo(map);
        });

        $.getJSON('data/sungai_kapuas.json', function (geojson) {
            var geojsonLayer = L.geoJson(geojson, {
                style: function (feature) {
                    return {
                        'weight': 0.8,
                        'color': '#28B0E7',
                        // 'color': '#0089F7',
                        // 'fillColor': '#F7CF5F',
                        // 'fillOpacity': 0.1
                    }
                },
                onEachFeature: function (feature, layer) {
                    if(feature.properties.NAMA_SUNGA != null) {
                        // controlLayers.addOverlay(layer, feature.properties.NAMA_SUNGA);
                    }
                }
            }).addTo(map);
        });
  
        L.control.zoom({
            position: 'bottomright'
        }).addTo(map);

        // markers = L.markerClusterGroup();

        // map.addLayer(markers);
    };

    var loadLastReading = function(){
        $.ajax({
            url: "Reading/GetLastReading",
            type: "GET",
            dataType: "JSON",
            beforeSend:function() {
                $('#group-awlr, #group-arr').fadeOut(300);
                $('#group-awlr-shimmer, #group-arr-shimmer').fadeIn(300);
            },
            success: function(stations) {
                $('#group-awlr-shimmer, #group-arr-shimmer').fadeOut(300);
                $('#group-awlr, #group-arr').fadeIn(300);
                // markers.clearLayers();
                if(stations.length > 0) {
                    var running_text = '';
                    var total_awlr = 0;
                    var total_arr = 0;
                    var total_aws = 0;
                    var i = 1;
                    $.each(stations, function (key, station) {
                        let reading_at = '';
                        let reading_date = '';
                        let reading_time = '';
    
                        let statusLevel = '';
                        let bg_awlr = 'bg-awlr-normal';
                        let water_level = '';
                        let unit = '';
                        let water_level_min = '';
                        let water_level_max = '';
                        let text_change_status = '';
    
                        let intensity = '';
                        let rainfall = '';
                        let rainfall_min = '';
                        let rainfall_max = '';
                        let show_intensity = ' <p>-</p>';

                        let awlr_level_class = '';

                        if(station.devices.length > 0) {
                    
                            contentPopup = '';
                            switch (station.type) {
                                case 'AWLR':
                                    
                                    if(station.devices[0].awlrLastReading != null) {
                                        if(station.devices[0].awlrLastReading.waterLevel != null) {
                                            water_level = station.devices[0].awlrLastReading.waterLevel;
                                        }

                                        if(station.devices[0].awlrLastReading.waterLevelMin != null) {
                                            water_level_min = station.devices[0].awlrLastReading.waterLevelMin;
                                        }

                                        if(station.devices[0].awlrLastReading.waterLevelMax != null) {
                                            water_level_max = station.devices[0].awlrLastReading.waterLevelMax;
                                        }

                                        if(station.devices[0].awlrLastReading.readingAt == null) {
                                            reading_at = `Data tidak tersedia`;
                                        } else {
                                            reading_date = moment(station.devices[0].awlrLastReading.readingAt).locale('id').format('dddd, D MMMM YYYY');
                                            reading_time = moment(station.devices[0].awlrLastReading.readingAt).locale('id').format('HH:mm');
                                            reading_at = `${reading_date} <span class="text-muted">${reading_time} WIB</span>`;
                                        }

                                        if(station.devices[0].awlrSetting != null) {
                                            if(station.devices[0].awlrSetting.siaga1 != null && station.devices[0].awlrSetting.siaga2 != null && station.devices[0].awlrSetting.siaga3 != null) {
                                                statusLevel = `<div class="progress-meter mb-2">
                                                    <div class="meter meter-normal meter-left" style="width: 25%;" title="Normal <br> < ${station.devices[0].awlrSetting.siaga3} m" tabindex="0" data-plugin="tippy" data-tippy-followCursor="true" data-tippy-arrow="true" data-tippy-animation="fade"><span class="meter-text">0</span></div>
                                                    <div class="meter meter-waspada meter-left" style="width: 25%;" title="Siaga 3 <br> ${station.devices[0].awlrSetting.siaga3} m - ${station.devices[0].awlrSetting.siaga2} m" tabindex="0" data-plugin="tippy" data-tippy-followCursor="true" data-tippy-arrow="true" data-tippy-animation="fade"><span class="meter-text">${station.devices[0].awlrSetting.siaga3} m</span></div>
                                                    <div class="meter meter-siaga meter-left" style="width: 25%;" title="Siaga 2 <br> ${station.devices[0].awlrSetting.siaga2} m - ${station.devices[0].awlrSetting.siaga1} m" tabindex="0" data-plugin="tippy" data-tippy-followCursor="true" data-tippy-arrow="true" data-tippy-animation="fade"><span class="meter-text">${station.devices[0].awlrSetting.siaga2} m</span></div>
                                                    <div class="meter meter-awas meter-left" style="width: 25%;" title="Siaga 1 <br> > ${station.devices[0].awlrSetting.siaga1} m" tabindex="0" data-plugin="tippy" data-tippy-followCursor="true" data-tippy-arrow="true" data-tippy-animation="fade"><span class="meter-text">${station.devices[0].awlrSetting.siaga1} m</span></div>
                                                </div>`;
                                            }
                                            
                                            if(station.devices[0].awlrSetting.unit == 'mdpl') {
                                                unit = 'Mdpl';
                                            } else {
                                                unit = station.devices[0].awlrSetting.unit;
                                            }
                                        }

                                        switch (station.devices[0].awlrLastReading.wlStatus) {
                                            case 'Normal':
                                                bg_awlr = 'bg-awlr-normal';
                                                awlr_level_class = '';
                                                break;
                                            case 'Siaga 3':
                                                bg_awlr = 'bg-awlr-siaga3';
                                                awlr_level_class = 'alert-siaga3';
                                                break;
                                            case 'Siaga 2':
                                                bg_awlr = 'bg-awlr-siaga2';
                                                awlr_level_class = 'alert-siaga2';
                                                break;
                                            case 'Siaga 1':
                                                bg_awlr = 'bg-awlr-siaga1';
                                                awlr_level_class = 'alert-siaga1';
                                                break;
                                            default:
                                                bg_awlr = 'bg-awlr-normal';
                                                awlr_level_class = '';
                                                break;
                                        }

                                        switch (station.devices[0].awlrLastReading.changeStatus) {
                                            case 'increase':
                                                text_change_status = `<p class="text-change-status">
                                                    <span class="font-10" style="margin-right: 1px;color: #ed413e;">▲</span>
                                                    <span class="fst-italic fw-bold font-12" style="color: #ed413e;"> +${station.devices[0].awlrLastReading.changeValue} ${unit}</span>
                                                </p>`;
                                                break;
                                            case 'decrease':
                                                text_change_status = `<p class="text-change-status">
                                                    <span class="font-10" style="color: #3B883E;margin-right: 1px;-webkit-transform: rotate(180deg);transform: rotate(180deg);display: inline-block;">▲</span>
                                                    <span class="fst-italic fw-bold font-12" style="color: #3B883E;">${station.devices[0].awlrLastReading.changeValue} ${unit}</span>
                                                </p>`;
                                                break;
                                        }

                                        var debit = '-';

                                        if(station.devices[0].awlrLastReading.debit != null) {
                                            debit = station.devices[0].awlrLastReading.debit;
                                        }

                                        // var contentAwlr = `<div class="card content-logger mb-2">
                                        //         <div class="row no-gutters">
                                        //             <div class="col-sm-3 content-sensor ${bg_awlr} d-flex text-center">
                                        //                 <div class="justify-content-center align-self-center w-100">
                                        //                     <h4>${icon_change_status} ${((water_level == '') ? '-' : water_level + ' m')}</h4>
                                        //                     <p class="text-change-status">${text_change_status}</p>
                                        //                 </div>
                                        //             </div>
                                        //             <div class="col-sm-9">
                                        //                 <div class="card-body content-station">
                                        //                     <div class="d-flex w-100 justify-content-between">
                                        //                         <h5 class="mb-1 mt-0 me-1">${station.name}</h5>
                                        //                         <span class="badge badge-outline-secondary mb-1" style="align-self: flex-start;">${station.device.brand.name} - ${station.device.device_id}</span>
                                        //                     </div>
                                        //                     <p class="card-text font-12">${reading_at}</small></p>
                                        //                     ${statusLevel}
                                        //                 </div>
                                        //             </div>
                                        //         </div>
                                        //     </div>`;

                                        var contentAwlr = `<div class="card content-logger mb-1">
                                            <div class="row no-gutters">
                                                <div class="col-sm-3 content-sensor ${bg_awlr} d-flex text-center">
                                                    <div class="justify-content-center align-self-center w-100">
                                                        <h4 class="font-16">${((water_level == '') ? '-' : water_level + ' ' + unit)}</h4>
                                                        ${text_change_status}
                                                    </div>
                                                </div>
                                                <div class="col-sm-9">
                                                    <div class="card-body content-station pt-2">
                                                        <div class="row">
                                                            <div class="col-9">
                                                                <h5 class="mb-1 mt-0 me-1">${station.name}</h5>
                                                                <span class="badge badge-outline-secondary mb-1" style="align-self: flex-start;">${station.devices[0].brand.name} - ${station.devices[0].deviceId}</span>
                                                                <p class="card-text">${reading_at}</p>
                                                                ${statusLevel}
                                                            </div>
                                                            <div class="col-3 text-center">
                                                                <div class="${getLevelStatusCircle(station.devices[0].awlrLastReading.wlStatus)}">
                                                                    <span style="display: block; font-size: 0.8rem; font-weight: 700;margin-bottom: 5px;"> ${debit}</span>
                                                                    <span style="display: block; font-size: 0.7rem; font-weight: 500;"> m<sup>3</sup>/s</span>
                                                                </div>
                                                                <span class="text-muted mt-1" style="display: block; font-size: 0.7rem; font-weight: 400;">Debit Air</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;

                                        var isExist = document.getElementById('awlr-' + station.id);

                                        if(isExist) {
                                            $('#awlr-' + station.id).html(contentAwlr);  
                                        } else {
                                            $('#group-awlr').append(
                                                `<div class="card-station" onclick="loadStationDetailCard(this, event)" id="awlr-${station.id}">
                                                    ${contentAwlr}
                                                </div>`
                                            );  
                                        }

                                        // tippy('[data-plugin="tippy"]');

                                        markerIcon = L.icon({
                                            iconUrl: '/assets/images/marker-awlr-icon.png',
                                            iconSize: [32, 43], // size of the icon
                                            popupAnchor: [0,-15]
                                        })

                                        contentPopup = `<div class="table-responsive mb-2">
                                            <table class="table table-sm mb-0">
                                                <thead class="table-light">
                                                    <tr>
                                                        <th>Sensor</th>
                                                        <th>Nilai</th>
                                                        <th>Min</th>
                                                        <th>Max</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><strong>Tinggi Muka Air</strong> (m)</td>
                                                        <td class="text-center fw-bold">${water_level}</td>
                                                        <td class="text-center fw-bold">${water_level_min}</td>
                                                        <td class="text-center fw-bold">${water_level_max}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>`;
                                        total_awlr++;
                                    }

                                    markerIcon = L.divIcon({ iconSize: new L.Point(40, 20), iconAnchor: new L.Point(20, 20), html:  `<div class="ts-marker-wrapper"><a href="javascript:void(0)" class="ts-marker ts-awlr" data-ts-id="64" data-ts-ln="60" style="outline: none;"><div class="ts-marker__title">${station.name}</div><div class="ts-marker__feature ts-marker__feature__blue ${awlr_level_class}"><i class="fas fa-water"></i></div></a></div>`});
                                    
                                    break;
                                case 'ARR':
                                    if(station.devices[0].arrLastReading != null) {
                                        var bg_intensity = `<div class="col-sm-3 content-sensor bg-no-data d-flex text-center">
                                            <div class="justify-content-center align-self-center w-100">
                                                <h4>-</h4>
                                            </div>
                                        </div>`;
            
                                        if(station.devices[0].arrLastReading.rainfallHour != null) {
                                            rainfall = station.devices[0].arrLastReading.rainfallHour;
                                        }
            
                                        if(station.devices[0].arrLastReading.readingAt == null) {
                                            reading_at = `Data tidak tersedia`;
                                        } else {
                                            reading_date = moment(station.devices[0].arrLastReading.readingAt).locale('id').format('dddd, D MMMM YYYY');
                                            reading_time = moment(station.devices[0].arrLastReading.readingAt).locale('id').format('HH:00');
                                            reading_at = `${reading_date} <span class="text-muted">${reading_time} WIB</span>`;
                                        }
            
                                        if(station.devices[0].arrLastReading.intensityHour != null) {
                                            intensity = station.devices[0].arrLastReading.intensityHour;
                                            show_intensity = `<img src="/images/intensity/${getIntensityIcon(intensity)}" alt="${intensity}">
                                                <p class="text-intensity mb-0">${intensity}</p>`;
                                            bg_intensity = `<div class="col-sm-3 content-sensor bg-arr">
                                                <div class="d-flex flex-column justify-content-center align-items-center bg-arr-am">
                                                    ${show_intensity}
                                                </div>
                                            </div>`;
                                        }
            
                                        // var contentArr = `<div class="card content-logger mb-2">
                                        //     <div class="row no-gutters">
                                        //         ${bg_intensity}
                                        //         <div class="col-sm-9">
                                        //             <div class="card-body content-station">
                                        //                 <div class="d-flex w-100 justify-content-between">
                                        //                     <h5 class="mb-1 mt-0 me-1">${station.name}</h5>
                                        //                     <span class="badge badge-outline-secondary mb-1" style="align-self: flex-start;">${station.device.brand.name} - ${station.device.device_id}</span>
                                        //                 </div>
                                        //                 <p class="card-text font-12">${reading_at}</small></p>
                                        //                 <p class="text-ch mb-0 fw-bold">Curah Hujan : ${rainfall}</p>
                                        //             </div>
                                        //         </div>
                                        //     </div>
                                        // </div>`;

                                        var contentArr = `<div class="card content-logger mb-1">
                                            <div class="card-body p-0">
                                                <div class="row no-gutters">
                                                    ${bg_intensity}
                                                    <div class="col-sm-9">
                                                        <div class="content-station">
                                                            <div class="row">
                                                                <div class="col-9">
                                                                    <h5 class="mb-1 mt-0 me-1">${station.name}</h5>
                                                                    <span class="badge badge-outline-secondary mb-1" style="align-self: flex-start;">${station.devices[0].brand.name} - ${station.devices[0].deviceId}</span>
                                                                    <p class="card-text">${reading_at}</p>
                                                                </div>
                                                                <div class="col-3">
                                                                    <div class="${getIntensityCircle(intensity)}">
                                                                        <span style="display: block; font-size: 1rem; font-weight: 700;"> ${rainfall}</span>
                                                                        <span style="display: block; font-size: 0.8rem; font-weight: 500;"> mm</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
            
                                        var isExist = document.getElementById('arr-' + station.id);
            
                                        if(isExist) {
                                            $('#arr' + station.id).html(contentArr);  
                                            // setTimeout(function() {
                                            //     $("#" + station.id + " .card").effect("highlight", {}, 2000);
                                            // }, 2000);
                                        } else {
                                            $('#group-arr').append(
                                                `<div class="card-station" onclick="loadStationDetailCard(this, event)" id="arr-${station.id}">
                                                    ${contentArr}
                                                </div>`
                                            );  
                                        }
            
                                        markerIcon = L.icon({
                                            iconUrl: '/assets/images/marker-arr-icon.png',
                                            iconSize: [32, 43], // size of the icon
                                            popupAnchor: [0,-15]
                                        })
            
                                        contentPopup = `<div class="table-responsive mb-2">
                                            <table class="table table-sm mb-0">
                                                <thead class="table-light">
                                                    <tr>
                                                        <th>Sensor</th>
                                                        <th>Nilai</th>
                                                        <th>Intensitas</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><strong>Curah Hujan</strong> (mm)</td>
                                                        <td class="text-center fw-bold">${rainfall}</td>
                                                        <td class="text-center fw-bold">${intensity}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>`;
                                        total_arr++;
                                    }

                                    markerIcon = L.divIcon({     iconSize: new L.Point(40, 20),     iconAnchor: new L.Point(20, 20),    html:  `<div class="ts-marker-wrapper"><a href="javascript:void(0)" class="ts-marker ts-arr" data-ts-id="64" data-ts-ln="60" style="outline: none;"><div class="ts-marker__title">${station.name}</div><div class="ts-marker__feature ts-marker__feature__green"><i class="wi wi-sleet"></i></div></a></div>`});
                                    break;
                                case 'AWS':
                                    if(station.devices[0].awsLastReading != null) {
                                        if(station.devices[0].awsLastReading.rainfallHour != null) {
                                            rainfall = station.devices[0].awsLastReading.rainfallHour;
                                        }
            
                                        if(station.devices[0].awsLastReading.readingAt == null) {
                                            reading_at = `Data tidak tersedia`;
                                        } else {
                                            reading_date = moment(station.devices[0].awsLastReading.readingAt).locale('id').format('dddd, D MMMM YYYY');
                                            reading_time = moment(station.devices[0].awsLastReading.readingAt).locale('id').format('HH:mm');
                                            reading_at = `${reading_date} ${reading_time} ${timezone_id}`;
                                        }
            
                                        if(station.devices[0].awsLastReading.intensityHour != null) {
                                            intensity = station.devices[0].awsLastReading.intensityHour;
                                        }

                                        var contentAws = `<div class="card content-logger mb-1">
                                            <div class="card-header bg-danger">
                                                <h5 class="text-white my-0">${station.name} <span class="fw-normal float-end font-14">${reading_at}</span></h5>
                                            </div>
                                            <div class="card-body px-2 py-0">
                                                <ul class="list-group list-group-flush list-aws-sensor">
                                                    <li class="list-group-item">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="d-flex align-items-center p-2">
                                                                    <img src="/images/icons/icon-rainfall.png" class="me-2" height="35" alt="Rainfall Icon">
                                                                    <div class="w-100">
                                                                        <div class="row-sensor d-flex justify-content-between align-items-start fw-light">
                                                                            <span>Curah Hujan :</span>
                                                                            <span>${rainfall} mm</span>
                                                                        </div>  
                                                                        <div class="row-sensor d-flex justify-content-between align-items-start fw-light">
                                                                            <span>Intensitas :</span>
                                                                            <span>${intensity}</span>
                                                                        </div>  
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="d-flex align-items-center p-2">
                                                                    <img src="/images/icons/icon-humidity.png" class="me-2" height="35" alt="Humidity Icon">
                                                                    <div class="w-100">
                                                                        <div class="row-sensor d-flex justify-content-between align-items-start fw-light">
                                                                            <span>Suhu :</span>
                                                                            <span>${station.devices[0].awsLastReading.temperature} &#8451;</span>
                                                                        </div>  
                                                                        <div class="row-sensor d-flex justify-content-between align-items-start fw-light">
                                                                            <span>Kelembaban :</span>
                                                                            <span>${station.devices[0].awsLastReading.humidityStatus} (${station.devices[0].awsLastReading.humidity} %)</span>
                                                                        </div>  
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="d-flex align-items-center p-2">
                                                                    <img src="/images/icons/icon-wind.jpeg" class="me-2" height="35" alt="Rainfall Icon">
                                                                    <div class="w-100">
                                                                        <div class="row-sensor d-flex justify-content-between align-items-start fw-light">
                                                                            <span>Kecepatan Angin :</span>
                                                                            <span>${station.devices[0].awsLastReading.windSpeed} Km/jam</span>
                                                                        </div>  
                                                                        <div class="row-sensor d-flex justify-content-between align-items-start fw-light">
                                                                            <span>Arah Angin :</span>
                                                                            <span><i class="fe-arrow-right me-1"></i> ${station.devices[0].awsLastReading.windDirectionStatus} (${station.devices[0].awsLastReading.windDirection}°)</span>
                                                                        </div>  
                                                                        <div class="row-sensor d-flex justify-content-between align-items-start fw-light">
                                                                            <span>Tekanan Udara :</span>
                                                                            <span>${station.devices[0].awsLastReading.pressure} mb</span>
                                                                        </div>  
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="p-2">
                                                                    <div class="row-sensor d-flex justify-content-between align-items-center fw-light">
                                                                        <span><i class="fe-sun icon-sensor text-warning me-1"></i> Radiasi Matahari :</span>
                                                                        <span>${station.devices[0].awsLastReading.solarRadiation} W/m<sup>2</sup></span>
                                                                    </div>  
                                                                    <div class="row-sensor d-flex justify-content-between align-items-center fw-light">
                                                                        <span><i class="fe-sunrise icon-sensor me-1"></i> Penguapan :</span>
                                                                        <span>${station.devices[0].awsLastReading.evaporation} mm</sup></span>
                                                                    </div> 
                                                                    <div class="row-sensor d-flex justify-content-between align-items-center fw-light">
                                                                        <span><i class="fe-battery-charging icon-sensor me-1"></i> Baterai :</span>
                                                                        <span>${station.devices[0].awsLastReading.volt} Volt</span>
                                                                    </div>   
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>`;
            
                                        var isExist = document.getElementById('aws-' + station.id);
            
                                        if(isExist) {
                                            $('#aws' + station.id).html(contentAws);  
                                        } else {
                                            $('#group-aws').append(
                                                `<div class="card-station" onclick="loadStationDetailCard(this, event)" id="aws-${station.id}">
                                                    ${contentAws}
                                                </div>`
                                            );  
                                        }
            
                                        markerIcon = L.icon({
                                            iconUrl: '/assets/images/marker-aws-icon.png',
                                            iconSize: [32, 43], // size of the icon
                                            popupAnchor: [0,-15]
                                        })
            
                                        contentPopup = `<div class="table-responsive mb-2">
                                            <table class="table table-sm mb-0">
                                                <thead class="table-light">
                                                    <tr>
                                                        <th>Sensor</th>
                                                        <th>Nilai</th>
                                                        <th>Intensitas</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><strong>Curah Hujan</strong> (mm)</td>
                                                        <td class="text-center fw-bold">${rainfall}</td>
                                                        <td class="text-center fw-bold">${intensity}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>`;
                                        total_aws++;
                                    }

                                    markerIcon = L.divIcon({     iconSize: new L.Point(40, 20),     iconAnchor: new L.Point(20, 20),    html:  `<div class="ts-marker-wrapper"><a href="javascript:void(0)" class="ts-marker ts-arr" data-ts-id="64" data-ts-ln="60" style="outline: none;"><div class="ts-marker__title">${station.name}</div><div class="ts-marker__feature ts-marker__feature__red"><i class="wi wi-day-cloudy-gusts"></i></div></a></div>`});
                                    break;
                            }
        
                            popup = L.popup({
                                maxWidth: 500
                            }).setContent(`
                                <div class="d-flex justify-content-start mb-2">
                                    <div class="image-container">
                                        <a href="/images/default-image.png" class="image-popup" title="${station.name}" id="detail_image_url" style="cursor: zoom-in;">
                                            <img src="/images/default-image.png" class="rounded avatar-md" alt="${station.name}" id="detail_image">
                                        </a>
                                    </div>
                                    
                                    <div class="px-2">
                                        <h5 class="card-title mb-1">${station.name}</h5>
                                        <span class="badge badge-outline-secondary mb-1" style="align-self: flex-start;">${station.devices[0].brand.name} - ${station.devices[0].deviceId}</span>
                                    </div>
                                </div>
                                <p class="card-text mt-0 mb-1 text-center"><span class="text-muted"><i class="fe-calendar"></i> ${reading_at}</span></p>
                                ${contentPopup}
                                <a href="/StationDetail/Index/${station.id}" class="btn btn-sm btn-blue rounded-pill w-100"><i class="fe-eye"></i> Lihat Detail</a>
                            `);
                            // var marker = L.marker(new L.LatLng(station.latitude, station.longitude), {icon: markerIcon}, { title: station.name }, {id: 'marker-' + station.id});
                            // marker.bindPopup(popup);
                            // markers.addLayer(marker);
                            // load_markers['marker-' + station.id] = marker;

                            

                            // markerIcon = L.divIcon({     iconSize: new L.Point(40, 20),     iconAnchor: new L.Point(20, 20),    html:  `<div class="ts-marker-wrapper"><a href="javascript:void(0)" class="ts-marker ts-arr" data-ts-id="64" data-ts-ln="60" style="outline: none;"><div class="ts-marker__title">${station.name}</div><div class="ts-marker__feature ts-marker__feature__green"><i class="fa fa-map-marker"></i></div></a></div>`});
                
                            var marker = L.marker(new L.LatLng(station.latitude, station.longitude), {icon: markerIcon}, { title: station.name });

                            // popup = L.popup({
                            //     maxWidth: 400
                            // }).setContent(mapContent);

                            marker.bindPopup(popup).addTo(map);

                        }
                    });    
                    i++;
                }
            },
            error:function(eventError, textStatus, errorThrown) {  
                        
            }
        });

        // let mapContent = ``;
        // stations.forEach(station => {

        //     if(station.tipe == 'AWLR') {
        //         markerIcon = L.divIcon({     iconSize: new L.Point(40, 20),     iconAnchor: new L.Point(20, 20),    html:  `<div class="ts-marker-wrapper"><a href="javascript:void(0)" class="ts-marker ts-awlr" data-ts-id="64" data-ts-ln="60" style="outline: none;"><div class="ts-marker__title">${station.name}</div><div class="ts-marker__feature ts-marker__feature__blue ${station.status}"><i class="fa fa-map-marker"></i></div></a></div>`});
        //     } else if(station.tipe == 'ARR') {
        //         markerIcon = L.divIcon({     iconSize: new L.Point(40, 20),     iconAnchor: new L.Point(20, 20),    html:  `<div class="ts-marker-wrapper"><a href="javascript:void(0)" class="ts-marker ts-arr" data-ts-id="64" data-ts-ln="60" style="outline: none;"><div class="ts-marker__title">${station.name}</div><div class="ts-marker__feature ts-marker__feature__green"><i class="fa fa-map-marker"></i></div></a></div>`});
        //     }



        //     var marker = L.marker(new L.LatLng(station.latitude, station.longitude), {icon: markerIcon}, { title: station.name });
        //     popup = L.popup({
        //         maxWidth: 400
        //     }).setContent(mapContent);
        //     marker.bindPopup(popup).addTo(map);

        // });
    }

    return {

        //main function to initiate the module
        init: function () {
            initMap();
            initInput();
            loadLastReading();
            setInterval(loadLastReading, 300000);
        },

    };

}();

jQuery(document).ready(function () {
    RealtimeMonitoringSystem.init();
});

function getIntensityIcon(status) {
    let icon = '';
    switch (status) {
        case 'Berawan':
            icon = 'berawan-siang.png';
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

function getIntensityCircle(status) {
    let result = '';
    switch (status) {
        case 'Berawan':
            result = 'circle-berawan';
            break;

        case 'Hujan Ringan':
            result = 'circle-hujan-ringan';
            break;

        case 'Hujan Sedang':
            result = 'circle-hujan-sedang';
            break;

        case 'Hujan Lebat':
            result = 'circle-hujan-lebat';
            break;

        case 'Hujan Sangat Lebat':
            result = 'circle-hujan-sangat-lebat';
            break;
    }

    return result;
}

function getLevelStatusCircle(status) {
    let result = '';
    switch (status) {
        case 'Normal':
            result = 'circle-normal';
            break;
        case 'Siaga 3':
            result = 'circle-siaga-3';
            break;
        case 'Siaga 2':
            result = 'circle-siaga-2';
            break;
        case 'Siaga 1':
            result = 'circle-siaga-1';
            break;
    }

    return result;
}

function loadStationDetail(input, evt){
    const id = $(input).data("id");
    
}

// var connection = new signalR.HubConnectionBuilder().withUrl("/RealtimeMonitoringSystemHub", {
//     skipNegotiation: true,
//     transport: signalR.HttpTransportType.WebSockets
// }).build();

// $(function () {
//     connection.start().then(function () {
// 		alert('Connected to dashboardHub');

// 		// InvokeProducts();
		

//     }).catch(function (err) {
//         return console.error(err.toString());
//     });
// });

// // Product
// function InvokeProducts() {
// 	connection.invoke("SendProducts").catch(function (err) {
// 		return console.error(err.toString());
// 	});
// }

// connection.on("ReceivedProducts", function (products) {
// 	BindProductsToGrid(products);
// });

// function BindProductsToGrid(products) {
// 	$('#tblProduct tbody').empty();

// 	var tr;
// 	$.each(products, function (index, product) {
// 		tr = $('<tr/>');
// 		tr.append(`<td>${(index + 1)}</td>`);
// 		tr.append(`<td>${product.name}</td>`);
// 		tr.append(`<td>${product.category}</td>`);
// 		tr.append(`<td>${product.price}</td>`);
// 		$('#tblProduct').append(tr);
// 	});
// }