"use strict";

//  ========== Initialize the map

const whiteBasemap = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/3cwcakAAAAASUVORK5CYII=');
// https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
var layerpeta = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; OpenStreetMap contributors'
});

// Inisialisasi peta dengan pengaturan khusus
// const map = L.map('map', {
//   center: [-7.085, 107.677], // Pusat peta pada koordinat tertentu
//   zoom: 12, // Zoom awal
//   maxZoom: 50, // Zoom maksimal
//   minZoom: 10, // Zoom minimal
//   layers: [layerpeta], // Layer default yang akan dimuat
//   attributionControl: true, // Menampilkan kontrol attribution (misalnya, OpenStreetMap credits)
// });

// ==== End Initialize the map

//  Initialize the Google Maps
// var map = new google.maps.Map(document.getElementById('map'), {
//   center: { lat: -7.085, lng: 107.677 },
//   zoom: 12,
//   mapTypeId: 'satellite'
// });

// Inisialisasi peta Google Maps
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 12, // Zoom awal
  center: { lat: -7.797068, lng: 110.370529 }, // Koordinat pusat peta
});

// Data sumur yang akan ditampilkan dalam InfoWindow
const sumur = "Detail informasi sumur";

// Membuat marker pada peta
// const marker = new google.maps.Marker({
//   position: { lat: -7.085, lng: 107.677 }, // Posisi marker
//   map: map,
// });


// ===== End Initialize the Google Maps

var circleBgWhite = {
  color: 'black',
  fillColor: 'white',
  fillOpacity: 1,
  weight: 1,
  opacity: 40
}

let iconStatus = {
  path: google.maps.SymbolPath.CIRCLE,  // Use Google Maps predefined circle path
  fillColor: '#ff0000',  // Default color (gray)
  fillOpacity: 1,
  scale: 10,  // Size of the circle (adjust as needed)
  strokeColor: '#ffffff',  // Border color (white)
  strokeWeight: 2,  // Border thickness
};

var bangunanPembagiList = [];
var bangunanSadapList = [];
var boxPetakList = [];
var box = [];

var Skema = (function () {
  
  function createDetailPanelSumur(reading) {

    
    var photo = '/images/favicon.png';

    var status_offline = '<small class="mdi mdi-circle text-danger"></small> TIDAK OPERASI';

    if (reading.status == 'OPERASI') {
      status_offline = '<small class="mdi mdi-circle text-success"></small> OPERASI';
    }

    var panelContent = '<table class="table mb-2 font-12"><tbody>';


    
    panelContent += '<tr>';
    panelContent += `<td class="px-0 py-2" colspan="3">
          <div class="d-flex align-items-start">
              <img class="me-2 rounded-3" src="${photo}" width="45" height="45" alt="${reading.code}">
              <div class="w-100">
                  <h5 class="mt-0 mb-1 fw-semibold font-12">${reading.code}</h5>
                  ${status_offline}
              </div>
          </div>
      </td>`;
    panelContent += '</tr>';

      panelContent += '<tr>';
      panelContent += `<td class="py-1 px-0">Kedalaman Bor</td>`;
      panelContent += `<td class="py-1 px-2">:</td>`;
      panelContent += `<td class="py-1 px-0">${reading.kedalaman_bor ? reading.kedalaman_bor : "-" } m</td>`;
      panelContent += '</tr>';
      
      panelContent += '<tr>';
      panelContent += `<td class="py-1 px-0">Debit</td>`;
      panelContent += `<td class="py-1 px-2">:</td>`;
      panelContent += `<td class="py-1 px-0">${reading.debit_sumur ? reading.debit_sumur : "-" } lt/dt</td>`;

      panelContent += '</tr>';

      panelContent += '<tr>';
      panelContent += `<td class="py-1 px-0">Tahun Pengeboran</td>`;
      panelContent += `<td class="py-1 px-2">:</td>`;
      panelContent += `<td class="py-1 px-0">${reading.tahun_pengeboran ? reading.tahun_pengeboran : "-"}</td>`;

      panelContent += '</tr>';

    panelContent += '</tbody></table>';

    panelContent += `<div class="text-end"><a href="/Home/Detail?code=${reading.code}" target="_blank">Lihat Detail <i class="mdi mdi-arrow-right"></i></a></div>`;

    return panelContent;
  }

  var initMap = function () {
    map.attributionControl.setPrefix(false);
    map.attributionControl.addAttribution('Skema Versi: ## (Update ## Agustus ##) | App Versi #.# (Update ## Agustus ####)');

    var legendControl = L.control({
      position: 'topright'
    });

    legendControl.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'legend');
      div.innerHTML = `
            <div>
              <table id="table-legenda" style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr>
                    <th colspan="2">KETERANGAN :</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-center"><span style="vertical-align: middle;border: 2px solid rgba(26,188,156);display: inline-block;width: 1rem;height: 1rem;border-radius: 2px; margin-right: 5px;"></span></td>
                    <td><span style="vertical-align: middle;">Opsi A</span></td>
                  </tr>
                  <tr>
                    <td class="text-center"><span style="vertical-align: middle;border: 2px solid #027DFC;display: inline-block;width: 1rem;height: 1rem;border-radius: 2px; margin-right: 5px;"></span></td>
                    <td><span style="vertical-align: middle;">Opsi B</span></td>
                  </tr>
                  <tr>
                    <td class="text-center"><span style="vertical-align: middle;border: 2px solid #F509F2;display: inline-block;width: 1rem;height: 1rem;border-radius: 2px; margin-right: 5px;"></span></td>
                    <td><span style="vertical-align: middle;">Opsi C</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          `;
      return div;
    };

    legendControl.addTo(map);
  }


  var sumurPoint = [];


  // INIT SUMUR / DATA
  var initSumur = function () {

    getData(`/Home/GetPointSumur`).then(res => {
      let result = res.data;
      
      if (res.status == 200) {
        sumurPoint = result;
        console.log(sumurPoint);
        
        sumurPoint.forEach(function (sumur) {
          console.log(sumur);

          var lat = parseFloat(sumur.latitude);
          var lng = parseFloat(sumur.longitude);
          var point = { lat: lat, lng: lng }; 
          console.log(point);
          
          if (sumur.status == 'OPERASI') {
            iconStatus.fillColor = '#4caf50';  // Green for 'OPERASI'
          }else{
            iconStatus.fillColor = '#f44336';  // Red for 'TIDAK OPERASI'
          }
          // Create a marker for each point (well)
          var mapMarker = new google.maps.Marker({
            position: point,
            map: map,
            icon: iconStatus,
          });
    
          // Create an InfoWindow for the marker
          const infoWindow = new google.maps.InfoWindow({
            content: createDetailPanelSumur(sumur), // Use your function to create content for the popup
          });
    
          // Add event listener to show InfoWindow when marker is clicked
          mapMarker.addListener('click', function () {
            infoWindow.open(map, mapMarker);
          });
        });
      }
    }).catch(err => {
      let error = err.response.data;
      if (!error.success) {
        console.log(error.message);
      }
    });

  }

  return {
    //main function to initiate the module
    init: function () {
      initSumur();
    },
  };
})();

jQuery(document).ready(function () {
  Skema.init();
});

function updateOffsetBangunanPembagi(point, zoom) {
  var newOffset = [0, 0];

  if (zoom === 10) {
    newOffset = [-15, 0];
  } else if (zoom === 11) {
    newOffset = [-25, 0];
  } else if (zoom === 12) {
    newOffset = [-45, 0];
  } else if (zoom === 13) {
    newOffset = [-75, 0];
  } else {
    newOffset = [-55, 0];
  }

  const originalTooltip = point.getTooltip();
  const originalContent = originalTooltip.getContent();
  const originalDirection = originalTooltip.options.direction || 'auto';

  if (originalDirection == 'top') {
    newOffset = [0, -10];

    // if (zoom === 10) {
    //     newOffset = [-15, 0];
    // } else if (zoom === 11) {
    //     newOffset = [-25, 0];
    // } else if (zoom === 12) {
    //  newOffset = [-45, 0];
    // } else if (zoom === 13) {
    //     newOffset = [-75, 0];
    // } else {
    //     newOffset = [-55, 0];
    // }
  }

  point.unbindTooltip();
  point.bindTooltip(originalContent, {
    permanent: true,
    direction: originalDirection,
    className: 'transparent-tooltip',
    offset: newOffset
  }).openTooltip();
}

// Function to update the font size and position based on zoom level
function setResponsiveSkema() {
  const zoomLevel = map.getZoom();
  var fontSize = (zoomLevel) + 5;
  // alert(fontSize);
  // alert(fontSize)

  // const boxPetak = document.querySelectorAll('.box-petak');

  // boxPetak.forEach(petak => {
  //   petak.style.fontSize = `${fontSize}px`;
  // });

  // boxPetakList.forEach(petak => {
  //   if(petak) {
  //     petak.update();
  //   }
  // });

  var fontSizeBsTitle = zoomLevel + 10;
  const bsTitles = document.querySelectorAll('.bs-title');
  bsTitles.forEach(bsTitle => {
    bsTitle.style.fontSize = `${fontSizeBsTitle}px`;
  });

  bangunanPembagiList.forEach(point => {
    updateOffsetBangunanPembagi(point, zoomLevel);
  });
}

// Update text on zoom end
map.on('zoomend', setResponsiveSkema);

// Initial text update
setResponsiveSkema();



function generateLineCustom(lineCoords) {
  L.polyline(lineCoords, {
    color: 'black',
    weight: 1
  }).addTo(map);
}

// Sumur 
function generateSumur(title, titlePosition, lineCoords, textDeg) {

  L.circleMarker(lineCoords, {
    color: 'black',
    weight: 1,
    opacity: 0
  }).addTo(map);

  

  const pointTitle = `<div class="bangunan-sadap-title" style="transform: rotate(${textDeg}deg);white-space: nowrap;">${title}</div>`;

  
  var point = L.circle(lineCoords, 20, circleBgWhite).addTo(map);


  var offset = [0, 0];
  var direction = 'center';

  if (titlePosition == 'topcenter') {
    direction = 'top';
    offset = [0, -10];
  } else if (titlePosition == 'topleft') {
    direction = 'top';
    offset = [-10, -10];
  } else if (titlePosition == 'topright') {
    direction = 'top';
    offset = [10, -10];
  } else if (titlePosition == 'bottomcenter') {
    direction = 'bottom';
    offset = [0, 10];
  } else if (titlePosition == 'bottomright') {
    direction = 'bottom';
    offset = [8, 10];
  } else if (titlePosition == 'bottomleft') {
    direction = 'bottom';
    offset = [-8, 10];
  } else if (titlePosition == 'centerright') {
    direction = 'right';
    offset = [10, 0];
  } else if (titlePosition == 'centerleft') {
    direction = 'left';
    offset = [-10, 0];
  }

  point.bindTooltip(pointTitle, {
    permanent: true,
    direction: direction,
    className: 'transparent-tooltip',
    offset: offset
  }).openTooltip();


  bangunanSadapList.push(point);
}

// End Sumur

const inputField = document.getElementById("filter-date");
const prevButton = document.getElementById("btn-prev");
const nextButton = document.getElementById("btn-next");

// Function to disable elements
function disableElements() {
  prevButton.disabled = true;
  nextButton.disabled = true;
  inputField.disabled = true;
  inputField.classList.add('disabled');
}

// Function to enable elements
function enableElements() {
  prevButton.disabled = false;
  nextButton.disabled = false;
  inputField.disabled = false;
  inputField.classList.remove('disabled');
}

function formatNumber(value) {
  // Convert the number to a string and use parseFloat to remove unnecessary zeros
  let formattedValue = parseFloat(value.toFixed(2)).toString();

  // Check if the formatted string ends with .00 and remove it
  if (formattedValue.endsWith('.00')) {
    formattedValue = formattedValue.slice(0, -3); // Remove the .00 part
  }

  // Return the formatted value
  return formattedValue;
}

// function refreshTooltips() {
//   boxPetakList.forEach(function(element) {
//       var tooltipContent = element.getTooltip().getContent();
//       var tooltipOptions = element.getTooltip().options;

//       // Unbind the current tooltip
//       element.unbindTooltip();

//       // Bind the tooltip again with the same content and options
//       element.bindTooltip(tooltipContent, tooltipOptions).openTooltip();
//   });
// }