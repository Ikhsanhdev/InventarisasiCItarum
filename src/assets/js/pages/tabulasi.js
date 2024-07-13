"use strict";

var dataTableAwlr;
var dataTableArr;
var dataTableWqms;
var dataTableAws;
var dataTableVnotch;
var dataTablePiezometer;

const awlrMarker = L.layerGroup();
const arrMarker = L.layerGroup();
const awsMarker = L.layerGroup();

var TabelMonitoring = (function () {
    var initMap = function () {
        const map = L.map('map', {
            center: [parseFloat(mapLatitude), parseFloat(mapLongitude)],
            zoom: mapZoom,
            maxZoom: 18,
            layers: [awlrMarker, arrMarker, awsMarker]
        });

        map.attributionControl.setPrefix(false);

        new L.basemapsSwitcher([
        {
            layer: L.mapboxGL({
                accessToken: 'pk.eyJ1IjoiaGFuZHlhc3dhbiIsImEiOiJjbDY3YmNmcGgwODAxM2R0YjZzY3ZkN3M5In0.7aDstmvWZvOmZIwyPfMB4g',
                style: 'mapbox://styles/mapbox/streets-v11',
                attribution: `&copy;${new Date().getFullYear()} ${organizationName} | Higertech`
            }).addTo(map), //DEFAULT MAP
            icon: '/images/basemaps/basemap-grayscale.jpg',
            name: 'Grayscale'
        },
        {
            layer: L.mapboxGL({
                accessToken: 'pk.eyJ1IjoiaGFuZHlhc3dhbiIsImEiOiJjbDY3YmNmcGgwODAxM2R0YjZzY3ZkN3M5In0.7aDstmvWZvOmZIwyPfMB4g',
                style: 'mapbox://styles/mapbox/satellite-streets-v12',
                attribution: `${organizationName} &copy;${new Date().getFullYear()}`
            }),
            icon: '/images/basemaps/basemap-satellite.jpg',
            name: 'Satellite'
        },
        {
            layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: `${organizationName} &copy;${new Date().getFullYear()}`
            }),
            icon: '/images/basemaps/world-imagery.jpg',
            name: 'W.Imagery'
        }
        ], { position: 'topright' }).addTo(map);

        const overlays = {
            'Pos Duga Air': awlrMarker,
            'Pos Curah Hujan': arrMarker,
            'Pos Klimatologi': awsMarker
        };

        const layerControl = L.control.layers(null, overlays).addTo(map);

        // Create a "Home" button
        var homeButton = L.easyButton('fa-home', function(btn, map){
            map.setView([parseFloat(mapLatitude), parseFloat(mapLongitude)], mapZoom);
        }).addTo(map);

        L.TopoJSON = L.GeoJSON.extend({
            addData: function (data) {
            var geojson, key;
            if (data.type === "Topology") {
                for (key in data.objects) {
                if (data.objects.hasOwnProperty(key)) {
                    geojson = topojson.feature(data, data.objects[key]);
                    L.GeoJSON.prototype.addData.call(this, geojson);
                }
                }
                return this;
            }
            L.GeoJSON.prototype.addData.call(this, data);
            return this;
            }
        });

        L.topoJson = function (data, options) {
            return new L.TopoJSON(data, options);
        };
        
        async function getGeoData(url) {
            let response = await fetch(url);
            let data = await response.json();
            return data;
        }

        const colors = [
            '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', 
            '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', 
            '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', 
            '#aaffc3', '#808000', '#ffd8b1', '#000075', '#ff6f61', 
            '#6a0572', '#a6cee3', '#1f78b4', '#b2df8a'
        ];


        let i = 0;

        getData(`/RiverArea/GetAllRiverArea`).then(res => {
            let result = res.data;
            if(result.code == 200) {
                $.each(result.response, function (key, river_area) {
                    if(river_area.shpFile != null && river_area.shpFile != '') {
                        getGeoData(`/uploads/watersheds/${river_area.organizationCode}/${river_area.shpFile}`).then(data => {
                            var geojsonLayer = L.topoJson(null, {
                                onEachFeature: function(feature, layer) {
                                    console.log(feature.properties)
                                    if (feature.properties.NAMA_DAS != null && feature.properties.NAMA_DAS != '') {
                                        layer.bindTooltip(showDetailDas(`WS ${river_area.name}`, feature.properties), 
                                        { 
                                            direction: 'right',
                                            permanent: false,
                                            sticky: true,
                                            offset: [10, 0],
                                            opacity: 0.9,
                                            className: 'leaflet-tooltip-own' 
                                        }).openTooltip();

                                        layer.setStyle({fill: true, stroke: true, color: '#502909', fillColor: colors[i], weight: 1, fillOpacity: 0.2 });

                                        layer.on("mouseout", function() {
                                            layer.setStyle({fillOpacity: 0.2, weight: 1})
                                        });
                                        layer.on("mouseover", function() {
                                            layer.setStyle({fillOpacity: 0.5, weight: 1.5})
                                    
                                        });
                                    } else {
                                        layer.setStyle({fill: false, stroke: false });
                                    }
                                    i++;
                                    if (i > 24) i = 0;
                                }
                            }).addTo(map);
                            geojsonLayer.addData(data);
                            layerControl.addOverlay(geojsonLayer, `DAS WS ${river_area.name}`);
                        });
                    }
                });
            }
        }).catch(err => {
            console.log(err.response)
        })

        function showDetailDas(river_area, properties) {
            var panelContent = `<p style="color: #fcfcfc;font-size: 0.55rem;margin: 0;">${river_area}</p>
                <h5 style="font-size: 0.75rem;margin: 3px 0;"><span style="color: #0ECAF0;">#${properties.KODE_DAS}: </span> <span style="color: #FFC10A;">${properties.NAMA_DAS}</span></h5>
            `;
            return panelContent;
        }

        getData(`/Home/GetAwlrLastReading`).then(res => {
            let result = res.data
            
            if (result.code == 200) {
                awlrMarker.clearLayers();
                $.each(result.response, function (key, data) {
                    let awlr_level_class = '';

                    switch (data.warningStatus) {
                        case 'Normal':
                            awlr_level_class = '';
                            break;
                        case 'Siaga 3':
                            awlr_level_class = 'alert-siaga3';
                            break;
                        case 'Siaga 2':
                            awlr_level_class = 'alert-siaga2';
                            break;
                        case 'Siaga 1':
                            awlr_level_class = 'alert-siaga1';
                            break;
                        default:
                            awlr_level_class = '';
                            break;
                    }
                    
                    var customIcon = L.divIcon({ 
                        iconSize: new L.Point(40, 20), 
                        iconAnchor: new L.Point(20, 20), 
                        html:  `<div class="ts-marker-wrapper"><a href="javascript:void(0)" class="ts-marker ts-awlr" data-ts-id="64" data-ts-ln="60" style="outline: none;"><div class="ts-marker__title">${data.name}</div><div class="ts-marker__feature ts-marker__feature__blue ${awlr_level_class}"><i class="fas fa-water"></i></div></a></div>`
                    });

                    var stationMarker = L.marker([data.latitude, data.longitude], {
                        icon: customIcon,
                    }).bindPopup(createDetailPanelStation(data)).addTo(awlrMarker);

                    // Add a custom attribute to the marker to associate it with the corresponding div
                    stationMarker.options.id = data.id;
                });
            }
        }).catch(err => {
            console.log(err.response)
        })

        getData(`/Home/GetArrLastReading`).then(res => {
            let result = res.data
            if (result.code == 200) {
                arrMarker.clearLayers();
                $.each(result.response, function (key, data) {
                    var intensity = 'arr-icon-offline.png';
                    var blinking_class = '';

                    if(data.intensityLastHour != 'Berawan' && data.deviceStatus == 'online') {
                        intensity = getIntensityIcon(data.intensityLastHour);
                        if(data.intensityLastHour != 'Berawan') {
                            blinking_class = 'blinking-content';
                        }
                    }
                    
                    var customIcon = L.divIcon({ 
                        iconSize: new L.Point(40, 20), 
                        iconAnchor: new L.Point(20, 20), 
                        html:  `<div class="ts-marker-wrapper"><a href="javascript:void(0)" class="ts-marker ts-arr" data-ts-id="64" data-ts-ln="60" style="outline: none;"><div class="ts-marker__title">${data.name}</div><image class="${blinking_class}" src="/images/arr/${intensity}" height="26" /></a></div>`}
                    );
                    
                    var stationMarker = L.marker([data.latitude, data.longitude], {
                        icon: customIcon,
                    }).bindPopup(createDetailPanelStation(data)).addTo(arrMarker);
                    

                    // Add a custom attribute to the marker to associate it with the corresponding div
                    stationMarker.options.id = data.id;
                });
            }
        }).catch(err => {
            console.log(err.response)
        })

        getData(`/Home/GetAwsLastReading`).then(res => {
            let result = res.data
            
            if (result.code == 200) {
                awsMarker.clearLayers();
                $.each(result.response, function (key, data) {
                    let aws_intensity = '';

                    // switch (data.warningStatus) {
                    //     case 'Normal':
                    //         awlr_level_class = '';
                    //         break;
                    //     case 'Siaga 3':
                    //         awlr_level_class = 'alert-siaga3';
                    //         break;
                    //     case 'Siaga 2':
                    //         awlr_level_class = 'alert-siaga2';
                    //         break;
                    //     case 'Siaga 1':
                    //         awlr_level_class = 'alert-siaga1';
                    //         break;
                    //     default:
                    //         awlr_level_class = '';
                    //         break;
                    // }

                    var customIcon = L.divIcon({ 
                        iconSize: new L.Point(40, 20), 
                        iconAnchor: new L.Point(20, 20), 
                        html:  `<div class="ts-marker-wrapper"><a href="javascript:void(0)" class="ts-marker ts-aws" data-ts-id="64" data-ts-ln="60" style="outline: none;"><div class="ts-marker__title">${data.name}</div><div class="ts-marker__feature ts-marker__feature__red ${aws_intensity}"><i class="bi bi-cloud-haze2-fill"></i></div></a></div>`
                    });

                    var stationMarker = L.marker([data.latitude, data.longitude], {
                        icon: customIcon,
                    }).bindPopup(createDetailPanelStation(data)).addTo(awsMarker);

                    // Add a custom attribute to the marker to associate it with the corresponding div
                    stationMarker.options.id = data.id;
                });
            }
        }).catch(err => {
            console.log(err.response)
        });

    }

    var initDataTable = function () {
        $.fn.dataTable.ext.errMode = 'none';
        
        dataTableAwlr = $("#awlr-table").DataTable({
            processing: true,
            serverSide: true,
            paging: false,
            searching: false,
            ordering: false,
            info: false,
            ajax: {
                url: "/Home/GetDatatableAwlrLastReading",
                type: "POST",
                dataType: "JSON",
                error: function(eventError, textStatus, errorThrown) {
                    alert(formatErrorMessage(eventError, errorThrown));
                }        
            },
            columns: [
                { data: null},
                { 
                    data: "Name",
                    name: "Name",
                    className: "text-nowrap",
                    render: function (data, type, row) {   
                        if(row.deviceStatus == 'offline') {
                            return `<i class="mdi mdi-alert-circle-outline me-1"></i><a href="/station/detail/${row.Slug}" target="_blank" class="text-danger fw-semibold" title="Offline" tabindex="0" data-plugin="tippy" data-tippy-animation="shift-away" data-tippy-arrow="true">${data}</a>`;
                        }

                        return `<a href="/Station/Detail/${row.Slug}" target="_blank" class="text-blue fw-semibold">${data}</a>`;
                    } 
                },
                {
                    data: "WatershedName",
                    name: "WatershedName",
                    render: function (data, type, row) {
                        if(data == null) {
                            return '-';
                        }

                        return data;
                    } 
                },
                { 
                    data: "ReadingAt",
                    name: "ReadingAt",
                    className: "text-nowrap",
                    render: function (data, type, row) {
                        if(data != null) {
                            return `${moment(data).locale('id').format("D MMMM YYYY")}`;
                        }

                        return '-';
                    } 
                },
                { 
                    data: "ReadingAt",
                    name: "ReadingAt",
                    className: "text-center text-nowrap",
                    render: function (data, type, row) {
                        if(data != null) {
                            return `${moment(data).locale('id').format("HH:mm")}`;
                        }

                        return '-';
                    } 
                },
                { 
                    data: "WaterLevel",
                    name: "WaterLevel",
                    className: "text-center",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).removeClass("bg-normal");
                        $(td).removeClass("bg-siaga3");
                        $(td).removeClass("bg-siaga2");
                        $(td).removeClass("bg-siaga1");
                        $(td).removeClass("bg-nostatus");

                        if(rowData.UnitSensor != 'cmdpl' && rowData.UnitSensor != 'mdpl') {
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

                        if((row.UnitSensor == 'cmdpl' || row.UnitSensor == 'mdpl') && data == row.WaterLevelElevation) {
                            return '-';
                        }

                        return `<span class="text-dark fw-semibold">${data} ${row.UnitDisplay}</span>`;
                    } 
                },
                { 
                    data: "WaterLevelElevation",
                    name: "WaterLevelElevation",
                    className: "text-center",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).removeClass("bg-normal");
                        $(td).removeClass("bg-siaga3");
                        $(td).removeClass("bg-siaga2");
                        $(td).removeClass("bg-siaga1");
                        $(td).removeClass("bg-nostatus");

                        if(rowData.UnitSensor == 'cmdpl' || rowData.UnitSensor == 'mdpl') {
                            switch (rowData.WarningStatus) {
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
                    data: "ChangeStatus",
                    name: "ChangeStatus",
                    className: "text-center",
                    render: function (data, type, row) {
                        if(data == 'constant') {
                            return `-`;
                        } else if(data == 'increase') {
                            return `<div class="d-flex justify-content-center align-items-center">
                                <i class="mdi mdi-arrow-up-circle text-danger font-16 me-1"></i>
                                <small class="text-danger">${row.ChangeValue}</small>
                            </div>`;
                        } else if(data == 'decrease') {
                            return `<div class="d-flex justify-content-center align-items-center">
                                <i class="mdi mdi-arrow-down-circle text-success font-16 me-1"></i>
                                <small class="text-success">${row.ChangeValue}</small>
                            </div>`;
                        }

                        return '';
                    } 
                },
                { 
                    data: "Debit",
                    name: "Debit",
                    className: "text-center",
                    render: function (data, type, row) {
                        if(data == null) {
                            return '-';
                        }

                        return `<span class="fw-semibold">${data}</span>`;
                    } 
                },
                { data: "Battery", name: "Battery", className: "text-center" }
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
            },
            drawCallback: function(settings) {
                if ($('[data-plugin="tippy"]').length > 0) {
                    tippy('[data-plugin="tippy"]');
                }
            }
        });

        dataTableAwlr.on( 'error.dt', function ( e, settings, techNote, message ) {
            console.log( 'An error has been reported by DataTables: ', message );
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
                url: "/Home/GetDatatableArrLastReading",
                type: "POST",
                dataType: "JSON"
            },
            columns: [
                { data: null},
                { 
                    data: "Name",
                    name: "Name",
                    render: function (data, type, row) {   
                        if(row.deviceStatus == 'offline') {
                            return `<i class="mdi mdi-alert-circle-outline me-1"></i><a href="/Station/Detail/${row.Slug}" target="_blank" class="text-danger fw-semibold" title="Offline" tabindex="0" data-plugin="tippy" data-tippy-animation="shift-away" data-tippy-arrow="true">${data}</a>`;
                        }

                        return `<a href="/Station/Detail/${row.Slug}" target="_blank" class="text-blue fw-semibold">${data}</a>`;
                    } 
                },
                {
                    data: "WatershedName",
                    name: "WatershedName",
                    render: function (data, type, row) {
                        if(data == null) {
                            return '-';
                        }

                        return data;
                    } 
                },
                { 
                    data: "ReadingAt",
                    name: "ReadingAt",
                    className: "text-nowrap",
                    render: function (data, type, row) {
                        if(data != null) {
                            return `${moment(data).locale('id').format("D MMMM YYYY")}`;
                        }

                        return '-';
                    } 
                },
                { 
                    data: "ReadingAt",
                    name: "ReadingAt",
                    className: "text-center",
                    render: function (data, type, row) {
                        if(data != null) {
                            return `${moment(data).locale('id').format("HH:mm")}`;
                        }

                        return '-';
                    } 
                },
                { 
                    data: "RainfallLastHour",
                    name: "RainfallLastHour",
                    className: "text-center",
                    render: function (data, type, row) {
                        if(data == null) {
                            return '-';
                        }

                        return `<span class="text-dark fw-semibold">${data}</span>`;
                    } 
                },
                { 
                    data: "IntensityLastHour",
                    name: "IntensityLastHour",
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
                    data: "RainfallLastDay",
                    name: "RainfallLastDay",
                    className: "text-center",
                    render: function (data, type, row) {
                        if(data == null) {
                            return '-';
                        }

                        return `<span class="text-dark fw-semibold">${data}</span>`;
                    } 
                },
                { 
                    data: "IntensityLastDay",
                    name: "IntensityLastDay",
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
                    data: "Battery",
                    name: "Battery",
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
            },
            drawCallback: function(settings) {
                if ($('[data-plugin="tippy"]').length > 0) {
                    tippy('[data-plugin="tippy"]');
                }
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
                        if(row.deviceStatus == 'offline') {
                            return `<i class="mdi mdi-alert-circle-outline me-1"></i><a href="/Station/Detail/${row.slug}" target="_blank" class="text-danger fw-semibold" title="Offline" tabindex="0" data-plugin="tippy" data-tippy-animation="shift-away" data-tippy-arrow="true">${data}</a>`;
                        }

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
            },
            drawCallback: function(settings) {
                if ($('[data-plugin="tippy"]').length > 0) {
                    tippy('[data-plugin="tippy"]');
                }
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
                        if(data == null) {
                            return '-';
                        }

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

        dataTablePiezometer = $("#piezometer-table").DataTable({
            processing: true,
            serverSide: true,
            paging: false,
            searching: false,
            ordering: false,
            info: false,
            ajax: {
                url: "/Home/GetDatatableMvPiezometerLastReading",
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
                        if(data == null) {
                            return '-';
                        }

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

        dataTablePiezometer.on("draw.dt", function () {
            var info = dataTablePiezometer.page.info();
            dataTablePiezometer
                .column(0, { search: "applied", order: "applied", page: "applied" })
                .nodes()
                .each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
        });

        loadCctv();
        setInterval(loadLastReading, 300000);
    };

    return {
        //main function to initiate the module
        init: function () {
            initMap();
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
    datatableAwlrArr.ajax.reload();
    datatableAws.ajax.reload();
    loadCctv();
}

function loadCctv() {
    if($('#card-cctv').length > 0) {
        $('#card-cctv .card-body').html('<div class="text-center"><div class="spinner-border avatar-sm text-primary m-auto" role="status"></div></div>');

        let currTimestamp = new Date().getTime();

        getData(`/Cctv/GetListCctv`).then(res => {
            let result = res.data;
            console.log(result);
            var cctv_items = '';
            $.each(result, function (key, data) {
                cctv_items += `
                    <div class="item" style="background-image: url('${data.Url}?v=${currTimestamp}');">
                        <a class="image-title image-popup" href="${data.Url}?v=${currTimestamp}" title="${data.Name}">
                            <div class="d-flex justify-content-between align-items-center">
                                <span>${data.Name}</span>
                                <i class="mdi mdi-eye"></i>
                            </div>
                        </a>
                    </div>
                `;
            });  
            
            $('#card-cctv .card-body').html(`<div class="owl-carousel owl-theme" id="cctv-carousel">${cctv_items}</div>`);

            $('.owl-carousel').owlCarousel({
                autoplay: true,
                autoplayTimeout: 10000,
                items:3,
                nav: false,
                lazyLoad:true,
                loop:false,
                margin: 10,
                responsiveClass:true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    1000:{
                        items:3
                    }
                }
            });

            $('.image-popup').magnificPopup({
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: false,
                mainClass: 'mfp-with-zoom mfp-img-mobile',
                image: {
                    verticalFit: true,
                    titleSrc: function(item) {
                        return item.el.attr('title');
                    }
                },
                gallery: {
                    enabled: true
                }
            });
        }).catch(err => {
            let error = err.response.data
            if(!error.success) {
                alert(error.message)
            }
        });
    }
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

function createDetailPanelStation(reading) {
    var photo = '/images/default-pu.png';

    if(reading.photo != null) {
        var photo = `/uploads/images/stations/${reading.photo}`;
    }
    var device_status = '<small class="mdi mdi-circle text-danger"></small> Offline';

    if(reading.deviceStatus == 'online') {
        device_status = '<small class="mdi mdi-circle text-success"></small> Online';
    }

    var panelContent = '<table class="table mb-2 font-12"><tbody>';
    
    panelContent += '<tr>';
    panelContent += `<td class="px-0 py-2 pt-1" colspan="3">
        <div class="d-flex align-items-start">
            <img class="me-2 rounded-3" src="${photo}" width="35" height="35" alt="${reading.name}">
            <div class="w-100">
                <h5 class="mt-0 mb-1 fw-bold font-12" style="color: #2A62A6;">${reading.name}</h5>
                ${device_status}
            </div>
        </div>
    </td>`;
    panelContent += '</tr>';

    panelContent += '<tr>';
    panelContent += `<td class="py-1 px-0">Logger</td>`;
    panelContent += `<td class="py-1 px-2">:</td>`;
    panelContent += `<td class="py-1 px-0 align-middle">
        ${reading.brandName} <span class="badge badge-outline-secondary rounded-1">${reading.deviceId}</span>
    </td>`;
    panelContent += '</tr>';

    panelContent += '<tr>';
    panelContent += `<td class="py-1 px-0">Koordinat</td>`;
    panelContent += `<td class="py-1 px-2">:</td>`;
    panelContent += `<td class="py-1 px-0 align-middle">
        <a href="https://www.google.com/maps?q=${reading.latitude},${reading.longitude}" target="_blank">${reading.latitude}, ${reading.longitude}</a>
    </td>`;
    panelContent += '</tr>';

    if(reading.readingAt != null) {
        panelContent += '<tr>';
        panelContent += `<td class="py-1 px-0">Waktu</td>`;
        panelContent += `<td class="py-1 px-2">:</td>`;
        panelContent += `<td class="py-1 px-0">${moment(reading.readingAt).locale('id').format('D MMMM YYYY HH:mm')} WIB</td>`;
        panelContent += '</tr>';

        if(reading.type == 'AWLR') {
            var water_level_elevation = reading.waterLevelElevation == null ? '-' : `${reading.waterLevelElevation.toFixed(2)} <sup>Mdpl</sup>`;
            var debit = reading.debit == null ? '-' : `${reading.debit} <sup>m3/s</sup>`;

            var text_tma = `${reading.waterLevel.toFixed(2)} <sup>${reading.unitDisplay}`;

            if(reading.unitSensor == 'cmdpl' || reading.unitSensor == 'mdpl') {
                var text_tma = '-';
            }

            panelContent += '<tr>';
            panelContent += `<td class="py-1 px-0 nowrap">Tinggi Muka Air</td>`;
            panelContent += `<td class="py-1 px-2">:</td>`;
            panelContent += `<td class="py-1 px-0 fw-semibold">${text_tma}</td>`;
            panelContent += '</tr>';

            panelContent += '<tr>';
            panelContent += `<td class="py-1 px-0 nowrap">Elevasi Muka Air</td>`;
            panelContent += `<td class="py-1 px-2">:</td>`;
            panelContent += `<td class="py-1 px-0 fw-semibold">${water_level_elevation}</td>`;
            panelContent += '</tr>';

            panelContent += '<tr>';
            panelContent += `<td class="py-1 px-0 nowrap">Debit</td>`;
            panelContent += `<td class="py-1 px-2">:</td>`;
            panelContent += `<td class="py-1 px-0 fw-semibold">${debit}</td>`;
            panelContent += '</tr>';
        } else if(reading.type == 'ARR') {
            panelContent += '<tr>';
            panelContent += `<td class="py-1 px-0 nowrap">Curah Hujan</td>`;
            panelContent += `<td class="py-1 px-2">:</td>`;
            panelContent += `<td class="py-1 px-0 fw-semibold">${reading.rainfall.toFixed(2)} <sup>mm</sup></td>`;
            panelContent += '</tr>';

            panelContent += '<tr>';
            panelContent += `<td class="py-1 px-0 nowrap">Curah Hujan Maks.</td>`;
            panelContent += `<td class="py-1 px-2">:</td>`;
            panelContent += `<td class="py-1 px-0 fw-semibold">${reading.rainfallMax.toFixed(2)} <sup>mm</sup></td>`;
            panelContent += '</tr>';
        }
    }
    
    panelContent += '</tbody></table>';

    panelContent += `<a href="/Station/Detail/${reading.slug}" target="_blank" class="btn btn-sm btn-primary rounded-pill waves-effect waves-light text-white w-100">Lihat Detail</a>`;

    return panelContent;
}