"use strict";

var dataTablePda;
var orgSchemaId = "457f4e80-334e-4147-9921-aecc583d3241";
var TabelPda = (function () {
    var initDataTable = function () {
        dataTablePda = $("#table-0").DataTable({
            processing: true,
            serverSide: true,
            dom: "tipr",
            order: [],
            ajax: {
                url: `/StationSchema/GetListPostByOrg?orgCode=${orgSchemaId}`,
                type: "POST",
                dataType: "JSON",
            },
            columns: [
                { data: "nopos", name: "Nopos" },
                { data: "name", name: "Name" },
                { data: "ws", name: "Ws"},
                { data: "jenis", name: "Jenis" },
                { data: "das", name: "Das" },
                { data: "sungai", name: "Sungai" },
                { data: "desa", name: "Desa" },
                { data: "kec", name: "Kec" },
                { data: "kab", name: "Kab" },
                { data: "keterangan", name: "Keterangan" },
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
                url: '/data/datatable_locale_id.json',
                paginate: {
                    previous: "<i class='mdi mdi-chevron-left'>",
                    next: "<i class='mdi mdi-chevron-right'>"
                }
            },
            drawCallback: function () {
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
            }
        });
        dataTablePda.on('draw.dt', function () {
            var info = dataTablePda.page.info();
            dataTablePda.column(0, { search: 'applied', order: 'applied', page: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
        });
    }
    return {
        //main function to initiate the module
        init: function () {
            initDataTable();
        },
    };
})();
TabelPda.init();
var map0;

$(document).ready(function() {
    // Initialize Leaflet map for map-0
    
    map0 = L.map('map-0').setView([51.483, -0.090], 13);

    var footer = '<b><u>Keterangan</u></b><br><br>';
    footer += '<div class="row"><div class="red-circle"></div>&nbsp: Manual</div><br>';
    footer += '<div class="row"><div class="purple-circle"></div>&nbsp: Manual & Telemetri (KOICA)</div><br>';
    footer += '<div class="row"><div class="green-triangle"></div>&nbsp: Bendungan</div><br>';
    footer += '<div class="image-container"><img src="/images/bendung.png" alt="Bendung" class="image"> : Bendung</div>';

    var standardLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: footer
    }).addTo(map0);

    map0.attributionControl.setPrefix(false);
    
    var linePrimer = L.polyline([
        [51.505, -0.01],
        [51.505, -0.160],
    ], { color: 'green', weight: 5}).addTo(map0);

    var middleLinePrimer = linePrimer.getCenter();

    var markerPrimer = L.marker(middleLinePrimer, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Laut Jawa',
            iconSize: [100, 40],
            iconAnchor: [50, 20]
        })
    }).addTo(map0);

    /* 
        black line
    */

    //start line black citarum
    var lineBlackCitarum = L.polyline([
        [51.505, -0.115],
        [51.430, -0.115]
    ], { color: 'black', weight: 5}).addTo(map0);

    // var middleLineCitarum = lineBlackCitarum.getCenter();
    var middleLineCitarum = ([51.467536549774074, -0.114]);

    var markerCitarum = L.marker(middleLineCitarum, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'S.Citarum',
            iconSize: [100, 40],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); color: red; font-weight: bold;">S.Citarum</div>'
        })
    }).addTo(map0);
    //end line black citarum

    //start line black cilamaya
    var lineBlackCilamaya = L.polyline([
    [51.505, -0.090],
    [51.470, -0.090]
    ], { color: 'black', weight: 5}).addTo(map0);

    // var middleLineCilamaya = lineBlackCilamaya.getCenter();
    var middleLineCilamaya = ([51.492, -0.091]);

    var markerCilamaya = L.marker(middleLineCilamaya, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'S.Cilamaya',
            iconSize: [100, 40],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); color: red; font-weight: bold;">S.Cilamaya</div>'
        })
    }).addTo(map0);
    //end line black cilamaya

    //start line black ciasem
    var lineBlackCiasem = L.polyline([
    [51.505, -0.073],
    [51.470, -0.073]
    ], { color: 'black', weight: 5}).addTo(map0);

    // var middleLineCilamaya = lineBlackCilamaya.getCenter();
    var middleLineCiasem = ([51.496, -0.074]);

    var markerCiasem = L.marker(middleLineCiasem, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'S.Ciasem',
            iconSize: [100, 40],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); color: red; font-weight: bold;">S.Ciasem</div>'
        })
    }).addTo(map0);
    //end line black ciasem

    //start line black cipunagara
    var lineBlackCipunagara = L.polyline([
    [51.505, -0.055],
    [51.458, -0.055]
    ], { color: 'black', weight: 5}).addTo(map0);

    // var middleLineCilamaya = lineBlackCilamaya.getCenter();
    var middleLineCipunagara = ([51.475, -0.056]);

    var markerCipunagara = L.marker(middleLineCipunagara, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'S.Cipunagara',
            iconSize: [100, 40],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); color: red; font-weight: bold;">S.Cipunagara</div>'
        })
    }).addTo(map0);
    //end line black cipunagara

    //start line black cibodas
    var lineBlackCibodas = L.polyline([
    [51.505, -0.035],
    [51.480, -0.035]
    ], { color: 'black', weight: 5}).addTo(map0);

    var middleLineCibodas = ([51.495, -0.036]);

    var markerCibodas = L.marker(middleLineCibodas, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'S.Cibodas',
            iconSize: [100, 40],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); color: red; font-weight: bold;">S.Cibodas</div>'
        })
    }).addTo(map0);
    //end line black cibodas

    /* end */

    /* 
        grey line
    */

    //start line grey saluran tarum timur barat
    var lineGreyTarumBaratTimur = L.polyline([
        [51.490, -0.055],
        [51.490, -0.160]
    ], { color: 'grey', weight: 5}).addTo(map0);

    var middleLineTarumBaratTimur = ([ 51.490041408695205, -0.100]);

    var markerTarumBaratTimur = L.marker(middleLineTarumBaratTimur, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Saluran Tarum Timur',
            iconSize: [100, 40],
            iconAnchor: [50, 20],
            html: '<div style="font-weight: bold; font-size: 10px;">Saluran Tarum Timur</div>'
        })
    }).addTo(map0);

    var middleLineTarumBaratTimur2 = ([ 51.490041408695205, -0.140]);

    var markerTarumBaratTimur2 = L.marker(middleLineTarumBaratTimur2, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Saluran Tarum Barat',
            iconSize: [100, 40],
            iconAnchor: [50, 20],
            html: '<div style="font-weight: bold; font-size: 10px;">Saluran Tarum Barat</div>'
        })
    }).addTo(map0);
    //end line grey saluran tarum timur barat

    //start line grey saluran tarum utara
    var lineGreyTarumUtara = L.polyline([ 
        [51.495, -0.115],
        [51.500, -0.092]
    ], { color: 'grey', weight: 5}).addTo(map0);

    var middleLineTarumUtara = ([ 51.495469315770275, -0.101]);
    // var middleLineTarumUtara = lineGreyTarumUtara.getCenter();
    // console.log(middleLineTarumUtara);

    var markerTarumUtara = L.marker(middleLineTarumUtara, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Saluran Tarum Utara',
            iconSize: [100, 40],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(-19deg); font-weight: bold; font-size: 10px;">Saluran Tarum Utara</div>'
        })
    }).addTo(map0);
    //end line grey saluran tarum utara

    /* end */

    /* 
        blue line
    */

    //start line blue bekasi
    var lineBlueBekasi = L.polyline([
        [51.503, -0.160],
        [51.500, -0.155],
        [51.480, -0.155]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueBekasi = ([ 51.480, -0.156]);

    var markerBlueBekasi = L.marker(middleLineBlueBekasi, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'S.Bekasi',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-weight: bold; font-size: 9px; color: blue;">S.Bekasi</div>'
        })
    }).addTo(map0);
    //end line blue bekasi

    //start line blue cikarang
    var lineBlueCikarang = L.polyline([
        [51.503, -0.145],
        [51.500, -0.140],
        [51.480, -0.140]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCikarang = ([ 51.480, -0.141]);

    var markerBlueCikarang = L.marker(middleLineBlueCikarang, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'S.Cikarang',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-weight: bold; font-size: 9px; color: blue;">S.Cikarang</div>'
        })
    }).addTo(map0);
    //end line blue cikarang

    //start line blue cibeet
    var lineBlueCibeet = L.polyline([
        [51.500, -0.115],
        [51.498, -0.127],
        [51.480, -0.127]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCibeet = ([ 51.478, -0.125]);

    var markerBlueCibeet = L.marker(middleLineBlueCibeet, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cibeet',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-weight: bold; font-size: 9px;">Cibeet</div>'
        })
    }).addTo(map0);
    //end line blue cibeet

    //start line blue cipamingkis
    var lineBlueCipamingkis = L.polyline([
        [51.485, -0.127],
        [51.480, -0.133],
        [51.470, -0.133]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCipamingkis = ([ 51.475, -0.134]);

    var markerBlueCipamingkis = L.marker(middleLineBlueCipamingkis, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cipamingkis',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-weight: bold; font-size: 9px;">Cipamingkis</div>'
        })
    }).addTo(map0);
    //end line blue cipamingkis

    //start line blue cisokan
    var lineBlueCisokan = L.polyline([
        [51.483, -0.115],
        [51.480, -0.125]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCisokan = ([ 51.479, -0.115]);

    var markerBlueCisokan = L.marker(middleLineBlueCisokan, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cisokan',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(-25deg); font-weight: bold; font-size: 9px;">Cisokan</div>'
        })
    }).addTo(map0);
    //end line blue cisokan

    //start line blue sedari
    var lineBlueSedari = L.polyline([
        [51.505, -0.112],
        [51.500, -0.112]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueSedari = ([ 51.499, -0.113]);

    var markerBlueSedari = L.marker(middleLineBlueSedari, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Sedari',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 10px;">Sedari</div>'
        })
    }).addTo(map0);
    //end line blue sedari

    //start line blue cisaga
    var lineBlueCisaga = L.polyline([
        [51.505, -0.109],
        [51.502, -0.109]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCisaga = ([ 51.501, -0.109]);

    var markerBlueCisaga = L.marker(middleLineBlueCisaga, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cisaga',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cisaga</div>'
        })
    }).addTo(map0);
    //end line blue cisaga

    //start line blue cibabar dua
    var lineBlueCibabarDua = L.polyline([
        [51.505, -0.106],
        [51.498, -0.106]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCibabarDua = ([ 51.498, -0.107]);

    var markerBlueCibabarDua = L.marker(middleLineBlueCibabarDua, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cibabar Dua',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cibabar Dua</div>'
        })
    }).addTo(map0);
    //end line blue cibabar dua

    //start line blue cibadak
    var lineBlueCibadak = L.polyline([
        [51.505, -0.103],
        [51.502, -0.103]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCibadak = ([ 51.502, -0.103]);

    var markerBlueCibadak = L.marker(middleLineBlueCibadak, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cibadak',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cibadak</div>'
        })
    }).addTo(map0);
    //end line blue cibadak

    //start line blue cikarokok
    var lineBlueCikarokok = L.polyline([
        [51.505, -0.100],
        [51.499, -0.100]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCikarokok = ([ 51.498, -0.100]);

    var markerBlueCikarokok = L.marker(middleLineBlueCikarokok, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cikarokok',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cikarokok</div>'
        })
    }).addTo(map0);
    //end line blue cikarokok

    //start line blue cibanteng
    var lineBlueCibanteng = L.polyline([
        [51.505, -0.097],
        [51.500, -0.097]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCibanteng = ([ 51.499, -0.097]);

    var markerBlueCibanteng = L.marker(middleLineBlueCibanteng, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cibanteng',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cibanteng</div>'
        })
    }).addTo(map0);
    //end line blue cibanteng

    //start line blue cigemari
    var lineBlueCigemari = L.polyline([
        [51.505, -0.080],
        [51.500, -0.080]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCigemari = ([ 51.499, -0.080]);

    var markerBlueCigemari = L.marker(middleLineBlueCigemari, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cigemari',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cigemari</div>'
        })
    }).addTo(map0);
    //end line blue cigemari

    //start line blue batang leutik
    var lineBlueBatangleutik = L.polyline([
        [51.505, -0.068],
        [51.498, -0.068]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueBatangleutik = ([ 51.497, -0.068]);

    var markerBlueBatangleutik = L.marker(middleLineBlueBatangleutik, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Batangleutik',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Batangleutik</div>'
        })
    }).addTo(map0);
    //end line blue batang leutik

    //start line blue cireungit
    var lineBlueCireungit = L.polyline([
        [51.505, -0.065],
        [51.500, -0.065]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCireungit = ([ 51.499, -0.065]);

    var markerBlueCireungit = L.marker(middleLineBlueCireungit, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cireungit',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cireungit</div>'
        })
    }).addTo(map0);
    //end line blue cireungit

    //start line blue cirandu
    var lineBlueCirandu = L.polyline([
        [51.505, -0.062],
        [51.499, -0.062]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCirandu = ([ 51.498, -0.062]);

    var markerBlueCirandu = L.marker(middleLineBlueCirandu, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cirandu',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cirandu</div>'
        })
    }).addTo(map0);
    //end line blue cirandu

    //start line blue sewo
    var lineBlueSewo = L.polyline([
        [51.505, -0.050],
        [51.499, -0.050]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueSewo = ([ 51.498, -0.050]);

    var markerBlueSewo = L.marker(middleLineBlueSewo, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Sewo',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Sewo</div>'
        })
    }).addTo(map0);
    //end line blue sewo

    //start line blue sukamaju
    var lineBlueSukamaju = L.polyline([
        [51.505, -0.046],
        [51.498, -0.046]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueSukamaju = ([ 51.497, -0.046]);

    var markerBlueSukamaju = L.marker(middleLineBlueSukamaju, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Sukamaju',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Sukamaju</div>'
        })
    }).addTo(map0);
    //end line blue sukamaju

    //start line blue bugel
    var lineBlueBugel = L.polyline([
        [51.505, -0.042],
        [51.500, -0.042]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueBugel = ([ 51.499, -0.042]);

    var markerBlueBugel = L.marker(middleLineBlueBugel, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bugel',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Bugel</div>'
        })
    }).addTo(map0);
    //end line blue bugel

    //start line blue cidongkol
    var lineBlueCidongkol = L.polyline([
        [51.505, -0.030],
        [51.500, -0.030]
    ], { color: 'blue' }).addTo(map0);

    var middleLineBlueCidongkol = ([ 51.499, -0.030]);

    var markerBlueCidongkol = L.marker(middleLineBlueCidongkol, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cidongkol',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cidongkol</div>'
        })
    }).addTo(map0);
    //end line blue cidongkol

    //start line blue curug cikao cilalawi
    var lineBlueCurugCikaoCilalawi = L.polyline([
        [51.489, -0.115],
        [51.487, -0.105],
        [51.488, -0.100]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCikao = ([ 51.486, -0.105]);

    var markerBlueCikao = L.marker(middleLineBlueCikao, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cikao',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(10deg); font-size: 9px;">Cikao</div>'
        })
    }).addTo(map0);

    var middleLineBlueCilalawi = ([ 51.487, -0.096]);

    var markerBlueCilalawi = L.marker(middleLineBlueCilalawi, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cilalawi',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(-15deg); font-size: 9px;">Cilalawi</div>'
        })
    }).addTo(map0);
    //end line blue curug cikao cilalawi

    //start line blue cisomang
    var lineBlueCisomang = L.polyline([
        [51.486, -0.115],
        [51.484, -0.105],
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCisomang = ([ 51.483, -0.105]);

    var markerBlueCisomang = L.marker(middleLineBlueCisomang, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cisomang',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(15deg); font-size: 9px;">Cisomang</div>'
        })
    }).addTo(map0);
    //end line blue cisomang

    //start line blue ciherang
    var lineBlueCiherang = L.polyline([
        [51.485, -0.090],
        [51.483, -0.098]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCiherang = ([ 51.483, -0.090]);

    var markerBlueCiherang = L.marker(middleLineBlueCiherang, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Ciherang',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(-20deg); font-size: 9px;">Ciherang</div>'
        })
    }).addTo(map0);
    //end line blue ciherang

    //start line blue cijengkol
    var lineBlueCijengkol = L.polyline([
        [51.495, -0.073],
        [51.493, -0.080],
        [51.485, -0.081]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCijengkol = ([ 51.485, -0.082]);

    var markerBlueCijengkol = L.marker(middleLineBlueCijengkol, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cijengkol',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cijengkol</div>'
        })
    }).addTo(map0);
    //end line blue cijengkol

    //start line blue cibodas
    var lineBlueCibodas = L.polyline([
        [51.483, -0.073],
        [51.481, -0.085],
        [51.478, -0.085]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCibodas = ([ 51.478, -0.085]);

    var markerBlueCibodas = L.marker(middleLineBlueCibodas, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cibodas',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cibodas</div>'
        })
    }).addTo(map0);
    //end line blue cibodas

    //start line blue cilamatan
    var lineBlueCilamatan = L.polyline([
        [51.489, -0.055],
        [51.488, -0.059],
        [51.484, -0.059]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCilamatan = ([ 51.483, -0.058]);

    var markerBlueCilamatan = L.marker(middleLineBlueCilamatan, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cilamatan',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cilamatan</div>'
        })
    }).addTo(map0);
    //end line blue cilamatan

    //start line blue cileuleuy
    var lineBlueCileuleuy = L.polyline([
        [51.487, -0.059],
        [51.486, -0.062],
        [51.482, -0.062]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCileuleuy = ([ 51.487, -0.059]);

    var markerBlueCileuleuy = L.marker(middleLineBlueCileuleuy, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cileuleuy',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(-25deg); font-size: 9px;">Cileuleuy</div>'
        })
    }).addTo(map0);
    //end line blue cileuleuy

    //start line blue cibeber
    var lineBlueCibeber = L.polyline([
        [51.480, -0.055],
        [51.478, -0.045],
        [51.465, -0.045]
    ], {color: 'blue'}).addTo(map0);
    //end line blue cibeber

    //start line blue cibeber2
    var lineBlueCibeber2 = L.polyline([
        [51.474, -0.045],
        [51.472, -0.050],
        [51.468, -0.050]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCibeber = ([ 51.468, -0.051]);

    var markerBlueCibeber = L.marker(middleLineBlueCibeber, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cibeber',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cibeber</div>'
        })
    }).addTo(map0);
    //end line blue cibeber2

    //start line blue saguling
    var lineBlueSaguling = L.polyline([
        [51.480, -0.115],
        [51.478, -0.105],
        [51.475, -0.105]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueSaguling = ([ 51.480, -0.109]);

    var markerBlueSaguling = L.marker(middleLineBlueSaguling, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Saguling',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Saguling</div>'
        })
    }).addTo(map0);

    var middleLineBlueCimeta = ([ 51.474, -0.104]);

    var markerBlueCimeta = L.marker(middleLineBlueCimeta, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cimeta',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(90deg); font-size: 9px;">Cimeta</div>'
        })
    }).addTo(map0);
    //end line blue saguling

    //start line blue ciwidey
    var lineBlueCiwidey = L.polyline([
        [51.470, -0.115],
        [51.467, -0.135]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCiwidey = ([ 51.466, -0.125]);

    var markerBlueCiwidey = L.marker(middleLineBlueCiwidey, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Ciwidey',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(-15deg); font-size: 9px;">Ciwidey</div>'
        })
    }).addTo(map0);
    //end line blue ciwidey

    //start line blue cimahi
    var lineBlueCimahi = L.polyline([
        [51.465, -0.115],
        [51.462, -0.100]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCimahi = ([ 51.465, -0.106]);

    var markerBlueCimahi = L.marker(middleLineBlueCimahi, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cimahi',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Cimahi</div>'
        })
    }).addTo(map0);
    //end line blue cimahi

    //start line blue ciburandul
    var lineBlueCiburandul = L.polyline([
        [51.463, -0.105],
        [51.460, -0.100]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCiburandul = ([ 51.460, -0.093]);
    // var middleLineBlueCiburandul = lineBlueCiburandul.getCenter();   

    var markerBlueCiburandul = L.marker(middleLineBlueCiburandul, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Ciburandul',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Ciburandul</div>'
        })
    }).addTo(map0);
    //end line blue ciburandul

    //start line blue cisangkuy
    var lineBlueCisangkuy = L.polyline([
        [51.460, -0.115],
        [51.456, -0.145]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCisangkuy = ([ 51.456, -0.125]);

    var markerBlueCisangkuy = L.marker(middleLineBlueCisangkuy, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cisangkuy',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(-15deg); font-size: 9px;">Cisangkuy</div>'
        })
    }).addTo(map0);
    //end line blue cisangkuy

    //start line blue cikapundung
    var lineBlueCikapundung = L.polyline([
        [51.458, -0.115],
        [51.455, -0.095]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCikapundung = ([ 51.455, -0.089]);

    var markerBlueCikapundung = L.marker(middleLineBlueCikapundung, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cikapundung',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Cikapundung</div>'
        })
    }).addTo(map0);
    //end line blue cikapundung

    //start line blue cidurian
    var lineBlueCidurian = L.polyline([
        [51.454, -0.115],
        [51.452, -0.100]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCidurian = ([ 51.450, -0.100]);

    var markerBlueCidurian = L.marker(middleLineBlueCidurian, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cidurian',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(15deg); font-size: 9px;">Cidurian</div>'
        })
    }).addTo(map0);
    //end line blue cidurian

    //start line blue cikeruh
    var lineBlueCikeruh = L.polyline([
        [51.449, -0.115],
        [51.446, -0.095],
        [51.448, -0.087]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCikeruh = ([ 51.445, -0.098]);

    var markerBlueCikeruh = L.marker(middleLineBlueCikeruh, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cikeruh',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(10deg); font-size: 9px;">Cikeruh</div>'
        })
    }).addTo(map0);
    //end line blue cikeruh

    //start line blue citarik
    var lineBlueCitarik = L.polyline([
        [51.445, -0.115],
        [51.442, -0.095]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCitarik = ([ 51.444, -0.106]);

    var markerBlueCitarik = L.marker(middleLineBlueCitarik, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Citarik',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(15deg); font-size: 9px;">Citarik</div>'
        })
    }).addTo(map0);
    //end line blue citarik

    //start line blue cisarea
    var lineBlueCisarea = L.polyline([
        [51.442, -0.115],
        [51.440, -0.130]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCisarea = ([ 51.439, -0.130]);

    var markerBlueCisarea = L.marker(middleLineBlueCisarea, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cisarea',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Cisarea</div>'
        })
    }).addTo(map0);
    //end line blue cisarea

    //start line blue cimande
    var lineBlueCimande = L.polyline([
        [51.442, -0.095],
        [51.446, -0.075]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCimande = ([ 51.446, -0.075]);

    var markerBlueCimande = L.marker(middleLineBlueCimande, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cimande',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(-15deg); font-size: 9px;">Cimande</div>'
        })
    }).addTo(map0);
    //end line blue cimande

    //start line blue cinambo
    var lineBlueCinambo = L.polyline([
        [51.442, -0.095],
        [51.443, -0.075]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCinambo = ([ 51.443, -0.070]);

    var markerBlueCinambo = L.marker(middleLineBlueCinambo, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cinambo',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Cinambo</div>'
        })
    }).addTo(map0);
    //end line blue cinambo

    //start line blue ciburaleng
    var lineBlueCiburaleng = L.polyline([
        [51.442, -0.095],
        [51.440, -0.075]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCiburaleng = ([ 51.440, -0.070]);

    var markerBlueCiburaleng = L.marker(middleLineBlueCiburaleng, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Ciburaleng',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Ciburaleng</div>'
        })
    }).addTo(map0);
    //end line blue ciburaleng

    //start line blue cijalupang
    var lineBlueCijalupang = L.polyline([
        [51.442, -0.095],
        [51.437, -0.075]
    ], {color: 'blue'}).addTo(map0);

    var middleLineBlueCijalupang = ([ 51.438, -0.087]);

    var markerBlueCijalupang = L.marker(middleLineBlueCijalupang, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cijalupang',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(25deg); font-size: 9px;">Cijalupang</div>'
        })
    }).addTo(map0);
    //end line blue cijalupang

    /* end */

    /* 
        start polygon triagle green
    */

    //start jatiluhur
    var jatiluhur = L.polygon([
        [51.488, -0.116],
        [51.488, -0.114],
        [51.487, -0.115]
    ], { color: 'green' }).addTo(map0);

    var middleLineJatiluhur = ([ 51.486, -0.110]);

    var markerJatiluhur = L.marker(middleLineJatiluhur, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Jatiluhur',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Jatiluhur</div>'
        })
    }).addTo(map0);
    //end jatiluhur

    //start cirata
    var cirata = L.polygon([
        [51.485, -0.116],
        [51.485, -0.114],
        [51.484, -0.115]
    ], { color: 'green' }).addTo(map0);

    var middleLineCirata = ([ 51.483, -0.110]);

    var markerCirata = L.marker(middleLineCirata, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Cirata',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Cirata</div>'
        })
    }).addTo(map0);
    //end cirata

    //start saguling
    var saguling = L.polygon([
        [51.481, -0.116],
        [51.481, -0.114],
        [51.480, -0.115]
    ], { color: 'green' }).addTo(map0);
    //end saguling

    //start cipancuh
    var cipancuh = L.polygon([
        [51.491, -0.036],
        [51.491, -0.034],
        [51.490, -0.035]
    ], { color: 'green' }).addTo(map0);

    var middleLineCipancuh = ([ 51.489, -0.035]);

    var markerCipancuh = L.marker(middleLineCipancuh, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bendungan Cipancuh',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bendungan<br>Cipancuh</div>'
        })
    }).addTo(map0);
    //end cipancuh

    //start cipanunjang
    var cipanunjang = L.polygon([
        [51.457, -0.145],
        [51.455, -0.144],
        [51.457, -0.142],
        
    ], { color: 'green' }).addTo(map0);

    var middleLineCipanunjang = ([ 51.454, -0.145]);

    var markerCipanunjang = L.marker(middleLineCipanunjang, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bendungan Cipanunjang',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bendungan<br>Cipanunjang</div>'
        })
    }).addTo(map0);
    //end cipanunjang

    //start cileunca
    var cileunca = L.polygon([
        [51.458, -0.138],
        [51.456, -0.137],
        [51.457, -0.135],
        
    ], { color: 'green' }).addTo(map0);

    var middleLineCileunca = ([ 51.459, -0.133]);

    var markerCileunca = L.marker(middleLineCileunca, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bendungan Cileunca',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bendungan<br>Cileunca</div>'
        })
    }).addTo(map0);
    //end cileunca

    /* end */

    /* 
        start line bendungan green
    */

    //start bd bekasi
    var bdBekasi1 = L.polyline([
        [51.495, -0.158],
        [51.494, -0.156],
        [51.494, -0.154],
        [51.495, -0.152]
    ], {color: 'green', weight: 2}).addTo(map0);

    var bdBekasi2 = L.polyline([
        [51.491, -0.158],
        [51.492, -0.156],
        [51.492, -0.154],
        [51.491, -0.152]
    ], {color: 'green', weight: 2}).addTo(map0);

    var middleLinebdBekasi = ([ 51.495, -0.157]);

    var markerbdBekasi = L.marker(middleLinebdBekasi, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bd Bekasi',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bd Bekasi</div>'
        })
    }).addTo(map0);
    //end bd bekasi

    //start bd shiponBekasi
    var bdshiponBekasi1 = L.polyline([
        [51.491, -0.158],
        [51.490, -0.156],
        [51.490, -0.154],
        [51.491, -0.152]
    ], {color: 'red', weight: 2}).addTo(map0);

    var bdshiponBekasi2 = L.polyline([
        [51.487, -0.158],
        [51.488, -0.156],
        [51.488, -0.154],
        [51.487, -0.152]
    ], {color: 'red', weight: 2}).addTo(map0);

    var middleLineSiphonBekasi = ([ 51.486, -0.160]);

    var markerSiphonBekasi = L.marker(middleLineSiphonBekasi, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Siphon Bekasi',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Siphon Bekasi</div>'
        })
    }).addTo(map0);
    //end bd shiponBekasi

    //start bd cikarang
    var bdcikarang1 = L.polyline([
        [51.492, -0.143],
        [51.491, -0.141],
        [51.491, -0.139],
        [51.492, -0.137]
    ], {color: 'green', weight: 2}).addTo(map0);

    var bdcikarang2 = L.polyline([
        [51.488, -0.143],
        [51.489, -0.141],
        [51.489, -0.139],
        [51.488, -0.137]
    ], {color: 'green', weight: 2}).addTo(map0);

    var middleLinebdCikarang = ([ 51.487, -0.132]);

    var markerbdCikarang = L.marker(middleLinebdCikarang, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bd Cikarang',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bd Cikarang</div>'
        })
    }).addTo(map0);
    //end bd cikarang

    //start bd siphonCibeet
    var bdsiphonCibeet1 = L.polyline([
        [51.491, -0.130],
        [51.490, -0.128],
        [51.490, -0.126],
        [51.491, -0.124]
    ], {color: 'red', weight: 2}).addTo(map0);

    var bdsiphonCibeet2 = L.polyline([
        [51.489, -0.130],
        [51.490, -0.128],
        [51.490, -0.126],
        [51.489, -0.124]
    ], {color: 'red', weight: 2}).addTo(map0);

    var middleLineSiphonCibeet = ([ 51.491, -0.125]);

    var markerSiphonCibeet = L.marker(middleLineSiphonCibeet, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Siphon Cibeet',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Siphon Cibeet</div>'
        })
    }).addTo(map0);
    //end bd siphonCibeet

    //start bd Cibeet
    var bdCibeet1 = L.polyline([
        [51.489, -0.130],
        [51.488, -0.128],
        [51.488, -0.126],
        [51.489, -0.124]
    ], {color: 'green', weight: 2}).addTo(map0);

    var bdCibeet2 = L.polyline([
        [51.487, -0.130],
        [51.488, -0.128],
        [51.488, -0.126],
        [51.487, -0.124]
    ], {color: 'green', weight: 2}).addTo(map0);

    var middleLinebdCibeet = ([ 51.487, -0.119]);

    var markerbdCibeet = L.marker(middleLinebdCibeet, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bd Cibeet',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bd Cibeet</div>'
        })
    }).addTo(map0);
    //end bd Cibeet

    //start bd Curug
    var bdCurug1 = L.polyline([
        [51.491, -0.118],
        [51.490, -0.116],
        [51.490, -0.114],
        [51.491, -0.112]
    ], {color: 'green', weight: 2}).addTo(map0);

    var bdCurug2 = L.polyline([
        [51.489, -0.118],
        [51.490, -0.116],
        [51.490, -0.114],
        [51.489, -0.112]
    ], {color: 'green', weight: 2}).addTo(map0);

    var middleLinebdCurug = ([ 51.491, -0.115]);

    var markerbdCurug = L.marker(middleLinebdCurug, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bd Curug',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bd Curug</div>'
        })
    }).addTo(map0);
    //end bd Curug

    //start bd Walahar
    var bdWalahar1 = L.polyline([
        [51.496, -0.118],
        [51.495, -0.116],
        [51.495, -0.114],
        [51.496, -0.112]
    ], {color: 'green', weight: 2}).addTo(map0);

    var bdWalahar2 = L.polyline([
        [51.494, -0.118],
        [51.495, -0.116],
        [51.495, -0.114],
        [51.494, -0.112]
    ], {color: 'green', weight: 2}).addTo(map0);

    var middleLinebdWalahar = ([ 51.496, -0.116]);

    var markerbdWalahar = L.marker(middleLinebdWalahar, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bd Walahar',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bd Walahar</div>'
        })
    }).addTo(map0);
    //end bd Walahar

    //start bd Cipangmingkis
    var bdCipangmingkis1 = L.polyline([
        [51.473, -0.136],
        [51.472, -0.134],
        [51.472, -0.132],
        [51.473, -0.130]
    ], {color: 'green', weight: 2}).addTo(map0);

    var bdCipangmingkis2 = L.polyline([
        [51.471, -0.136],
        [51.472, -0.134],
        [51.472, -0.132],
        [51.471, -0.130]
    ], {color: 'green', weight: 2}).addTo(map0);

    var middleLinebdCipamingkis = ([ 51.470, -0.138]);

    var markerbdCipamingkis = L.marker(middleLinebdCipamingkis, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bd Cipamingkis',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bd Cipamingkis</div>'
        })
    }).addTo(map0);
    //end bd Cipangmingkis

    //start bd Cihea
    var bdCihea1 = L.polyline([
        [51.478, -0.108],
        [51.477, -0.106],
        [51.477, -0.104],
        [51.478, -0.102]
    ], {color: 'green', weight: 2}).addTo(map0);

    var bdCihea2 = L.polyline([
        [51.476, -0.108],
        [51.477, -0.106],
        [51.477, -0.104],
        [51.476, -0.102]
    ], {color: 'green', weight: 2}).addTo(map0);

    var middleLinebdCihea = ([ 51.476, -0.097]);

    var markerbdCihea = L.marker(middleLinebdCihea, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bd Cihea',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bd Cihea</div>'
        })
    }).addTo(map0);
    //end bd Cihea

    //start bd Macan
    var bdMacan1 = L.polyline([
        [51.490, -0.076],
        [51.489, -0.074],
        [51.489, -0.072],
        [51.490, -0.070]
    ], {color: 'green', weight: 2}).addTo(map0);

    var bdMacan2 = L.polyline([
        [51.488, -0.076],
        [51.489, -0.074],
        [51.489, -0.072],
        [51.488, -0.070]
    ], {color: 'green', weight: 2}).addTo(map0);

    var middleLinebdMacan = ([ 51.488, -0.066]);

    var markerbdMacan = L.marker(middleLinebdMacan, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bd Macan',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bd Macan</div>'
        })
    }).addTo(map0);
    //end bd Macan

    //start bd Salamdarma
    var bdSalamdarma1 = L.polyline([
        [51.491, -0.058],
        [51.490, -0.056],
        [51.490, -0.054],
        [51.491, -0.052]
    ], {color: 'green', weight: 2}).addTo(map0);

    var bdSalamdarma2 = L.polyline([
        [51.489, -0.058],
        [51.490, -0.056],
        [51.490, -0.054],
        [51.489, -0.052]
    ], {color: 'green', weight: 2}).addTo(map0);

    var middleLinebdSalamdarma = ([ 51.491, -0.047]);

    var markerbdSalamdarma = L.marker(middleLinebdSalamdarma, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bd Salamdarma',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bd Salamdarma</div>'
        })
    }).addTo(map0);
    //end bd Salamdarma

    //start bd Cileuleuy
    var bdCileuleuy1 = L.polyline([
        [51.486, -0.065],
        [51.485, -0.063],
        [51.485, -0.061],
        [51.486, -0.059]
    ], {color: 'green', weight: 2}).addTo(map0);

    var bdCileuleuy2 = L.polyline([
        [51.484, -0.065],
        [51.485, -0.063],
        [51.485, -0.061],
        [51.484, -0.059]
    ], {color: 'green', weight: 2}).addTo(map0);

    var middleLinebdCileuleuy = ([ 51.483, -0.066]);

    var markerbdCileuleuy = L.marker(middleLinebdCileuleuy, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bd Cileuleuy',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bd Cileuleuy</div>'
        })
    }).addTo(map0);
    //end bd Cileuleuy

    //start bd Leuwinangka
    var bdLeuwinangka1 = L.polyline([
        [51.481, -0.076],
        [51.480, -0.074],
        [51.480, -0.072],
        [51.481, -0.070]
    ], {color: 'green', weight: 2}).addTo(map0);

    var bdLeuwinangka2 = L.polyline([
        [51.479, -0.076],
        [51.480, -0.074],
        [51.480, -0.072],
        [51.479, -0.070]
    ], {color: 'green', weight: 2}).addTo(map0);

    var middleLinebdLeuwinangka = ([ 51.478, -0.065]);

    var markerbdLeuwinangka = L.marker(middleLinebdLeuwinangka, {
        icon: L.divIcon({
            className: 'text-label',
            html: 'Bd Leuwinangka',
            iconSize: [90, 30],
            iconAnchor: [50, 20],
            html: '<div style="transform: rotate(0deg); font-size: 9px;">Bd Leuwinangka</div>'
        })
    }).addTo(map0);
    //end bd Leuwinangka

    var lineBox8 = L.polyline([
        [51.449, -0.095],
        [51.447, -0.100],
    ], {color: 'blue', weight: 1}).addTo(map0);

    standardLayer.setOpacity(0);

    // Handle tab activation events
    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var tabId = $(e.target).attr('href');
        var counterTab = parseInt(tabId.split('-')[1]);

        // Notify Leaflet that the map container has changed size
        if (counterTab === 0) {
            map0.invalidateSize();
        }
    });

    var rectanglePda = getDataRectangleTma();

    rectanglePda.then(resRectangle => {
        resRectangle.forEach(rec => {
            //start rectangle data
            const rectangleCoords = [[rec.latitude, rec.longitude], [rec.latitude2, rec.longitude2]];
            const rectangleOptions = { color: rec.color, weight: 1 };

            // Add rectangle to the map
            const rectangle = L.rectangle(rectangleCoords, rectangleOptions).addTo(map0);

            // Create a div element for the text
            const textElement = document.createElement('div');

            getDataPosByStationIdPda(rec.stationId).then(readRec => {
                // var textBox = createTextBoxTma(readRec);
                if(readRec.result.readingAt != null) {
                    var text_tma = `${readRec.result.waterLevel.toFixed(2)}`;
            
                    if(readRec.result.unitSensor == 'cmdpl' || readRec.result.unitSensor == 'mdpl') {
                        text_tma = '-';
                    }
            
                    textElement.innerHTML = rec.no + '.TMA: <b>' + text_tma + ' ' + readRec.result.unitDisplay + '</b>';
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            });

            textElement.className = 'rectangle-text';

            // Append the text element to the map container
            map0.getPane('overlayPane').appendChild(textElement);

            // Function to update the text position based on rectangle bounds
            function updateTextPosition() {
                const bounds = rectangle.getBounds();
                const topLeft = map0.latLngToLayerPoint(bounds.getNorthWest());
                const bottomRight = map0.latLngToLayerPoint(bounds.getSouthEast());

                // Position the text element inside the rectangle
                textElement.style.left = topLeft.x + 'px';
                textElement.style.top = topLeft.y + 'px';
                textElement.style.width = (bottomRight.x - topLeft.x) + 'px';
                textElement.style.height = (bottomRight.y - topLeft.y) + 'px';
            }

            // Initial position update
            updateTextPosition();

            // Event listener to update text position when the map is zoomed or panned
            map0.on('zoomend', updateTextPosition);
            map0.on('moveend', updateTextPosition);
            //end rectangle data
        });
    }).catch(error => {
        console.error(error);
    });

    var circlePda = getDataSebaranPda();

    circlePda.then(results => {
        results.forEach(r => {
            var circle = L.circle([r.latitude, r.longitude], {
                color: r.color,
                fillColor: r.color,
                fillOpacity: 1,
                radius: 50
            }).addTo(map0);

            var textIcon = L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="text-align: center; font-weight: bold; font-size: 11px;">${r.no}</div>`,
                iconSize: [120, 40]
            });

            var textMarker = L.marker([r.latitude, r.textLongt], { 
                icon: textIcon 
            }).addTo(map0);

            getDataPosByStationIdPda(r.stationId)
                .then(reading => {
                    // Bind popup when data is available
                    textMarker.bindPopup(createDetailPosPda(reading));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });
    }).catch(error => {
        console.error(error);
    });
});

async function getDataSebaranPda() {
    try {
        var orgCode = "457f4e80-334e-4147-9921-aecc583d3241";
        const response = await fetch(`/StationSchema/GetSkemaByOrg?orgCode=${orgCode}`);

        if (response.ok) {
            const skemaSebaranPda = await response.json();
            return skemaSebaranPda;
        } else {
            // Handle non-ok response (e.g., 404, 500)
            console.error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
    }
}

async function getDataRectangleTma() {
    try {
        var orgCode = "457f4e80-334e-4147-9921-aecc583d3241";
        const response = await fetch(`/StationSchema/GetRectangleSkemaByOrg?orgCode=${orgCode}`);

        if (response.ok) {
            const skemaSebaranPda = await response.json();
            return skemaSebaranPda;
        } else {
            // Handle non-ok response (e.g., 404, 500)
            console.error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
    }
}

async function getDataPosByStationIdPda(stationId) {
    console.log('harus ada');
    try {
        if(stationId != null) {
            const response = await fetch(`/StationSchema/GetDataPosPdaByStationId?idStation=${stationId}`);
            if (response.ok) {
                const detailPos = await response.json();
                return detailPos;
            } else {
                // Handle non-ok response (e.g., 404, 500)
                console.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } else {
            return '';
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
    }
}

function createDetailPosPda(reading) {
    var photo = '/images/default-pu.png';

    if(reading.result.photo != null) {
        photo = `/uploads/images/stations/${reading.result.photo}`;
    }
    var device_status = '<small class="mdi mdi-circle text-danger"></small> Offline';

    if(reading.result.deviceStatus == 'online') {
        device_status = '<small class="mdi mdi-circle text-success"></small> Online';
    }

    var panelContent = '<table class="table mb-2 font-12"><tbody>';

    panelContent += '<tr>';
    panelContent += `<td class="px-0 py-2" colspan="3">
        <div class="d-flex align-items-start">
            <img class="me-2 rounded-3" src="${photo}" width="35" height="35" alt="${reading.result.name}">
            <div class="w-100">
                <h5 class="mt-0 mb-1 fw-semibold font-12">${reading.result.name}</h5>
                ${device_status}
            </div>
        </div>
    </td>`;
    panelContent += '</tr>';

    panelContent += '<tr>';
    panelContent += `<td class="py-1 px-0">Logger</td>`;
    panelContent += `<td class="py-1 px-2">:</td>`;
    panelContent += `<td class="py-1 px-0 align-middle">
        ${reading.result.brandName} <span class="badge badge-outline-secondary rounded-1">${reading.result.deviceId}</span>
    </td>`;
    panelContent += '</tr>';

    panelContent += '</tr>';
    panelContent += '<tr>';
    panelContent += `<td class="py-1 px-0">Koordinat</td>`;
    panelContent += `<td class="py-1 px-2">:</td>`;
    panelContent += `<td class="py-1 px-0 align-middle">${reading.result.latitude}, ${reading.result.longitude}</td>`;
    panelContent += '</tr>';

    if(reading.result.readingAt != null) {
        panelContent += '<tr>';
        panelContent += `<td class="py-1 px-0">Waktu</td>`;
        panelContent += `<td class="py-1 px-2">:</td>`;
        panelContent += `<td class="py-1 px-0">${moment(reading.result.readingAt).locale('id').format('D MMMM YYYY HH:mm')} WIB</td>`;
        panelContent += '</tr>';

        var water_level_elevation = reading.result.waterLevelElevation == null ? '-' : `${reading.result.waterLevelElevation.toFixed(2)} <sup>Mdpl</sup>`;
        var debit = reading.result.debit == null ? '-' : `${reading.result.debit} <sup>m3/s</sup>`;

        var text_tma = `${reading.result.waterLevel.toFixed(2)} <sup>${reading.result.unitDisplay}`;

        if(reading.result.unitSensor == 'cmdpl' || reading.result.unitSensor == 'mdpl') {
            text_tma = '-';
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
    }

    panelContent += '</tbody></table>';

    panelContent += `<a href="/Station/Detail/${reading.result.slug}" target="_blank" class="btn btn-sm btn-primary rounded-pill waves-effect waves-light text-white w-100">Lihat Detail</a>`;

    return panelContent;
}

function createTextBoxTma(reading) {
    
}