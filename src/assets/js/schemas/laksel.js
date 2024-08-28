"use strict";

const whiteBasemap = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/3cwcakAAAAASUVORK5CYII=');

const map = L.map('map', {
    // attributionControl: false,
    // Default location
    center: [-8.6, 106.65],
    zoom: 10,
    maxZoom: 13,
    minZoom: 10,
    layers: [whiteBasemap]
});

var circleBgTransparent = {
  color: 'black',
  fillColor: 'transparent',
  fillOpacity: 0,
  weight: 1
}

var circleBgWhite = {
  color: 'black',
  fillColor: 'white',
  fillOpacity: 1,
  weight: 1
}

var circleBgBlack = {
  color: 'black',
  fillColor: 'black',
  fillOpacity: 1,
  weight: 1
}

var bangunanPembagiList = [];
var bangunanSadapList = [];
var boxPetakList = [];
var box = [];

var SkemaLaksel = (function () {
    var initInput = function () {
      const inputField = document.getElementById("filter-date");

      const flatpickrInstance = $('#filter-date').flatpickr({
        locale: "id",
        defaultDate: new Date(),
        altInput: true,
        altFormat: "j F Y",
        dateFormat: "Y-m-d",
      });

      // Function to add days to the current date
      function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

      // Event listener for previous button
      $("#btn-prev").on("click", function() {
        const currentDate = flatpickrInstance.selectedDates[0] || new Date();
        const newDate = addDays(currentDate, -1);
        flatpickrInstance.setDate(newDate);
        inputField.dispatchEvent(new Event('change'));
      });

      // Event listener for next button
      $("#btn-next").on("click", function() {
        const currentDate = flatpickrInstance.selectedDates[0] || new Date();
        const newDate = addDays(currentDate, 1);
        flatpickrInstance.setDate(newDate);
        inputField.dispatchEvent(new Event('change'));
      });

      $("#filter-date").on("change", function () {
        let tanggal = $(this).val();
        getSchemaData(tanggal);
      });
    
    };
    var initMap = function () {
        map.attributionControl.setPrefix(false);
        map.attributionControl.addAttribution('DI. Manganti Skema Laksel Versi: R4 (Update 16 Juli 2024) | App Versi 2.1 (Update 13 Agustus 2024)');

        var legendControl = L.control({ position: 'topright' });

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
                    <td class="text-center"><img src="/images/icon-bangunan-sadap.png" style="height: 20px; margin-right: 5px;"></td>
                    <td>Bangunan Pengambil/Sadap</td>
                  </tr>
                  <tr>
                    <td class="text-center"><img src="/images/icon-bangunan-pembagi.png" style="height: 20px; margin-right: 5px;"></td>
                    <td>Bangunan Pembagi</td>
                  </tr>
                  <tr>
                    <td class="text-center"><span style="vertical-align: middle;border: 2px solid rgba(26,188,156);display: inline-block;width: 1rem;height: 1rem;border-radius: 2px; margin-right: 5px;"></span></td>
                    <td><span style="vertical-align: middle;">Golongan A</span></td>
                  </tr>
                  <tr>
                    <td class="text-center"><span style="vertical-align: middle;border: 2px solid #027DFC;display: inline-block;width: 1rem;height: 1rem;border-radius: 2px; margin-right: 5px;"></span></td>
                    <td><span style="vertical-align: middle;">Golongan B</span></td>
                  </tr>
                  <tr>
                    <td class="text-center"><span style="vertical-align: middle;border: 2px solid #F509F2;display: inline-block;width: 1rem;height: 1rem;border-radius: 2px; margin-right: 5px;"></span></td>
                    <td><span style="vertical-align: middle;">Golongan C</span></td>
                  </tr>
                  <tr>
                    <td class="text-center fw-bold">QK</td>
                    <td>Debit Kebutuhan</td>
                  </tr>
                  <tr>
                    <td class="text-center text-primary fw-bold">QA</td>
                    <td>Debit Aktual</td>
                  </tr>
                  <tr>
                    <td class="text-center text-warning fw-bold">QR</td>
                    <td>
                        <div class="d-flex align-items-start flex-column">
                            <div>Debit Rekomendasi</div>
                            <div>(Hasil Rekomendasi AI)</div>
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          `;
          return div;
        };

        legendControl.addTo(map);
    }

    var initBch14 = function () {
      const bch0Point = [-8.6, 106.65];
      const bmt0Point = [-8.6, 106.65];
      const bnmg1Point = [bmt0Point[0]-0.2, bmt0Point[1]];
      const bmt2Point = [bnmg1Point[0]-0.15,bnmg1Point[1]]

      const bmng2Point = [bmt2Point[0]-0.2, bmt2Point[1]];
      const bmng3Point = [bmng2Point[0]-0.2, bmng2Point[1]];

      const bmt4Point = [bmng2Point[0]-0.1,bmng2Point[1]]
     
      const bmng4Point = [bmt4Point[0]-0.22, bmt4Point[1]+0.08];
     
      const bmt7Point = [bmng4Point[0]-0.04,bmng4Point[1]+0.06]
      
      const bmng5Point = [bmng4Point[0]-0.08, bmng4Point[1]+0.15];
      
      const bmt9Point = [bmng5Point[0]-0.02,bmng5Point[1]+0.1]
      const bmng5iPoint = [bmng5Point[0]-0.03, bmng5Point[1]+0.2];
      const bbl0Pint = [bmng5iPoint[0], bmng5iPoint[1]];
      
      
      const bbh1Point = [bmng4Point[0]-0.1, bmng4Point[1]-0.08];
      const bbh2Point = [bbh1Point[0]-0.1, bbh1Point[1]-0.08];
      const bbh3Point = [bbh2Point[0]-0.1, bbh2Point[1]-0.08];
      const bbh4Point = [bbh3Point[0]-0.1, bbh3Point[1]-0.08];

      const sry3Point = [bnmg1Point[0], bnmg1Point[1]-0.25];
       
      generateTextSaluranSekunder('SAL. SIDARAHAYU', [sry3Point[0]+0.04,sry3Point[1]+0.1], 0);
      
      generateTextSaluranPrimer('SAL. PRIMER MANGANTI', [bmng2Point[0]+0.2,bmng2Point[1]+0.1], 90);
      generateTextSaluranPrimer('BENDUNGAN MANGANTI', [bmt0Point[0]+0.15,bmt0Point[1]-0.05], 0);
      
      // Sungai Citanduy
      generateLineCustom([[bmt0Point[0]+0.12, bmt0Point[1]-0.2],[bmt0Point[0]+0.12, 106.8]]);
      
      generateTextSaluranPrimer('S.CITANDU', [bmt0Point[0]+0.05,bmt0Point[1]-0.05], 0);
      AliranMasuk([bch0Point[0]+0.075,bch0Point[1]-0.2],0);
      
      generateLineCustom([[bmt0Point[0], bmt0Point[1]-0.2],[-8.6, 106.8]]);


      // Sungai Ciseel
      generateLineCustom([[bmng4Point[0], bmng4Point[1]-0.1],[bmng4Point[0]+0.12, bmng4Point[1]+0.02]]);
      
      generateTextSaluranPrimer('S.CISEEL', [bmng4Point[0]-0.05,bmt0Point[1]-0.02], 313);
      
      AliranMasuk([bmng4Point[0]+0.06,bmng4Point[1]-0.03],345);
      
      generateLineCustom([[bmng4Point[0]-0.08, bmng4Point[1]-0.08],[bmng4Point[0]+0.05, bmng4Point[1]+0.05]]);

      const linebmt0Point = [bmt0Point,[-8.6, 106.65]];
      generateBangunanPembagi('BMT.0','topright',linebmt0Point);

      const lineBnmg1Point = [bmt0Point,bnmg1Point];
      generateBangunanPembagi('BMT.1','topright',lineBnmg1Point);

      const lineSry3Point = [bnmg1Point,sry3Point];
      generateBangunanPembagi('B.SRY.3','topright',lineSry3Point);

      const lineBoxBsa1 = [sry3Point,[sry3Point[0]+0.08, sry3Point[1]+0.08]];
      generateBox("4.540.00 Ha","7.515 m3/s","3.502  m", lineBoxBsa1,'top' )

      const lineBsa1Ka = [sry3Point,[sry3Point[0]-0.08, sry3Point[1]]];
      generateBoxPetak('a66bcaee-b888-4876-ae62-fc113eb51942', 'BSA.1.Ka', lineBsa1Ka, 'bottom','');

      const lineBmt2Point = [bnmg1Point,bmt2Point];
      generateBangunanPembagiDanSadap('BMT.2','topright',lineBmt2Point);

      const lineBmt2ka = [bmt2Point,[bmt2Point[0], bmt2Point[1]-0.02]];
      generateBoxPetak('6622f2b4-52b3-4038-9245-94542093be49', 'MT.22 Ka', lineBmt2ka, 'left','');

      const lineBmng2Point = [bnmg1Point,bmng2Point];
      generateBangunanPembagiDanSadap('BMT.3','topright',lineBmng2Point);

      const lineBmt3Ka = [bmng2Point,[bmng2Point[0], bmng2Point[1]-0.02]];
      generateBoxPetak('1e52ea36-f585-4c9f-a26d-21e632eb9bfd', 'MT.33 Ka', lineBmt3Ka, 'left','');

      const lineBmt4Point = [bmng2Point,bmt4Point];
      generateBangunanPembagiDanSadap('BMT.4','topright',lineBmt4Point);

      const lineBmt4ka = [bmt4Point,[bmt4Point[0], bmt4Point[1]-0.02]];
      generateBoxPetak('1853a814-f7ae-4397-b9c7-c7a0de356e58', 'MT.4 Ki', lineBmt4ka, 'left','');

      const lineBmng3Point = [bmng2Point,bmng3Point];
      generateBangunanPembagiDanSadap('BMT.5','topright',lineBmng3Point);

      const lineBmt5Ka = [bmng3Point,[bmng3Point[0], bmng3Point[1]-0.02]];
      generateBoxPetak('f980295c-6296-43f4-8df4-48608a662407', 'MT.5 Ka', lineBmt5Ka, 'left','');

      const lineBmng4Point = [bmng3Point,bmng4Point];
      generateBangunanPembagi('BMT.6','topright',lineBmng4Point);

      const lineBmt7Point = [bmng4Point,bmt7Point];
      generateBangunanPembagiDanSadap('BMT.7','topright',lineBmt7Point);

      const lineBmt7ka = [bmt7Point,[bmt7Point[0]+0.18, bmt7Point[1]]];
      generateBoxPetak('082a87f4-4a79-475a-8c87-c40f88bba7f3', 'MT.7 Ki', lineBmt7ka, 'top','');

      const lineBmng5Point = [bmt7Point,bmng5Point];
      generateBangunanPembagiDanSadap('BMT.8','topright',lineBmng5Point);

      const lineBmt8ka = [bmng5Point,[bmng5Point[0]+0.14, bmng5Point[1]]];
      generateBoxPetak('5e82325e-787d-42c7-950e-a5bc096a5d51', 'MT.8 Ki', lineBmt8ka, 'top','');

      const lineBmt9Point = [bmng5Point,bmt9Point];
      generateBangunanPembagiDanSadap('BMT.9','topright',lineBmt9Point);

      const lineBmt9ka = [bmt9Point,[bmt9Point[0]+0.06, bmt9Point[1]]];
      generateBoxPetak('cdcbbbce-2cee-48b9-aeff-8a9844f003cc', 'MT.9 Ki', lineBmt9ka, 'top','');

      const lineBbl0Pint = [bmt9Point,bbl0Pint];
      generateBangunanPembagi('BBL.0','topright',lineBbl0Pint);
      }
     
    return {
        //main function to initiate the module
        init: function () {
            initInput();
            initMap();

            // Generate Skema 
            initBch14();
        },
    };
})();

jQuery(document).ready(function () {
  SkemaLaksel.init();
  getSchemaData(getValueById('filter-date'));
});

function isDateInRange(dateToCheck) {
            // Tanggal batas awal dan akhir
      const startDate = new Date('2024-08-24');
      const endDate = new Date('2024-09-05');

      // Menghilangkan waktu dari tanggal yang akan dicek
      const date = new Date(dateToCheck);
      date.setHours(0, 0, 0, 0);

      // Membandingkan apakah tanggal berada dalam rentang
      return date >= startDate && date <= endDate;
  }

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

  if(originalDirection == 'top') {
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


function generateBangunanPembagi(title, titlePosition, lineCoords) {
  L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);

  const pointTitle = `<div class="bs-title">${title}</div>`;

  var point = L.circle(lineCoords[lineCoords.length - 1], 1000, circleBgWhite).addTo(map);
  L.circle(lineCoords[lineCoords.length - 1], 380, circleBgBlack).addTo(map);

  var offset = [-15, 0];
  var direction = 'left';

  if(titlePosition == 'topcenter') {
    direction = 'top';
    offset = [0, -10];
  }else if(titlePosition == 'topleft') {
    direction = 'top';
    offset = [-10, -10];
  } else if(titlePosition == 'topright') {
    direction = 'top';
    offset = [10, -10];
  } else if(titlePosition == 'bottomcenter') {
    direction = 'bottom';
    offset = [0, 10];
  } else if(titlePosition == 'bottomright') {
    direction = 'bottom';
    offset = [8, 15];
  }

  // Bind tooltip to the polyline end point
  point.bindTooltip(pointTitle, {
      permanent: true,
      direction: direction,
      className: 'transparent-tooltip',
      offset: offset
  }).openTooltip();

  bangunanPembagiList.push(point);
}

function generateLineCustom(lineCoords) {
  L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);
}

function generateBangunanPembagiDanSadap(title, titlePosition, lineCoords) {
  L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);

  const pointTitle = `<div class="bs-title">${title}</div>`;

  var point = L.circle(lineCoords[lineCoords.length - 1], 250, circleBgWhite).addTo(map);

  var offset = [-15, 0];
  var direction = 'left';

  if(titlePosition == 'topcenter') {
    direction = 'top';
    offset = [0, -10];
  } else if(titlePosition == 'topright') {
    direction = 'top';
    offset = [35, -10];
  }

  point.bindTooltip(pointTitle, {
      permanent: true,
      direction: direction,
      className: 'transparent-tooltip',
      offset: offset // Adjust the offset to position the tooltip correctly at the end of the polyline
  }).openTooltip();

  bangunanPembagiList.push(point);
}

function generateBangunanSadap(title, titlePosition, lineCoords, textDeg) {
  L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);

  const pointTitle = `<div class="bangunan-sadap-title" style="transform: rotate(${textDeg}deg);white-space: nowrap;">${title}</div>`;

  var point = L.circle(lineCoords[lineCoords.length - 1], 250, circleBgWhite).addTo(map);

  var offset = [0, 0];
  var direction = 'center';

  if(titlePosition == 'topcenter') {
    direction = 'top';
    offset = [0, -10];
  } else if(titlePosition == 'topleft') {
    direction = 'top';
    offset = [-10, -10];
  } else if(titlePosition == 'topright') {
    direction = 'top';
    offset = [10, -10];
  } else if(titlePosition == 'bottomcenter') {
    direction = 'bottom';
    offset = [0, 10];
  } else if(titlePosition == 'bottomright') {
    direction = 'bottom';
    offset = [8, 10];
  } else if(titlePosition == 'bottomleft') {
    direction = 'bottom';
    offset = [-8, 10];
  } else if(titlePosition == 'centerright') {
    direction = 'right';
    offset = [10, 0];
  } else if(titlePosition == 'centerleft') {
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

function generateBangunanSadapDanPembagi(title, titlePosition, lineCoords, textDeg) {
  L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);

  const pointTitle = `<div class="bangunan-sadap-title" style="transform: rotate(${textDeg}deg);white-space: nowrap;">${title}</div>`;

  var point = L.circle(lineCoords[lineCoords.length - 1], 1000, circleBgWhite).addTo(map);
  L.circle(lineCoords[lineCoords.length - 1], 380, circleBgBlack).addTo(map);

  var offset = [0, 0];
  var direction = 'center';

  if(titlePosition == 'topcenter') {
    direction = 'top';
    offset = [3, -15];
  } else if(titlePosition == 'topleft') {
    direction = 'top';
    offset = [-10, -10];
  } else if(titlePosition == 'topright') {
    direction = 'top';
    offset = [10, -10];
  } else if(titlePosition == 'bottomcenter') {
    direction = 'bottom';
    offset = [0, 10];
  } else if(titlePosition == 'bottomright') {
    direction = 'bottom';
    offset = [8, 15];
  }

  point.bindTooltip(pointTitle, {
      permanent: true,
      direction: direction,
      className: 'transparent-tooltip',
      offset: offset
  }).openTooltip();

  bangunanSadapList.push(point);
}

function generateBox(a,q,l, lineCoords,position) {

  const linePetak = L.polyline(lineCoords, { color: 'gray', weight: 1,opacity :0 }).addTo(map);

  const tooltipContent = `
    <div class="border-box">
        <table>
          <tbody>
            <tr>
                <td>
                  <span class="text-dark">A = ${a}</span>
                  </br>
                  <span class="text-dark">Q = ${q}</span>
                  </br>
                  <span class="text-dark">L = ${l}</span>
                </td>
            </tr>
          </tbody>
        </table>
    </div>
  `;

  // Bind tooltip to the polyline
  const endPoint = linePetak.getLatLngs()[1];

  // Bind tooltip to the polyline end point
  linePetak.bindTooltip(tooltipContent, {
    permanent: true,
    direction: position,
    className: 'transparent-tooltip',
    offset: [0, 0] // Adjust the offset to position the tooltip correctly at the end of the polyline
  }).openTooltip(endPoint);

  box.push(linePetak);
}

var initAliranMasuk = function () {
      // var text = L.marker([-7.1, 108.93], {
      //   icon: L.divIcon({
      //     className: 'text-sumber-aliran',
      //     iconSize: [200, 40],
      //     html: `<div style="">BENDUNG MANGANTI</div>`
      //   }),
      // }).addTo(map);

      var panahAliran = L.marker([-7.15, 108.8], {
        icon: L.divIcon({
          className: 'panah-aliran',
          html: '<img src="/images/panah-aliran3.png" style="width: 59px; height: 15px;transform: rotate(130deg);background-color: transparent;border-color:#fff;" />'
        }),
      }).addTo(map);

      const lineCoords = [
        [-7.1, 108.8],
        [-7.235, 108.77]
      ];

      L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);

      L.circle([-7.1, 108.8], 380, circleBgTransparent).addTo(map);
      var outerCircle = L.circle([-7.1, 108.8], 830, circleBgTransparent).addTo(map);

      outerCircle.bindTooltip('<div class="text-sumber-aliran">BENDUNG MANGANTI</div>', {
          permanent: true,
          direction: 'right',
          className: 'transparent-tooltip',
          offset: [10, 1]
      }).openTooltip();
    }

  function AliranMasuk (lineCoords,rotation) {
      
      L.marker(lineCoords, {
        icon: L.divIcon({
          className: 'panah-aliran',
          html: `<img src="/images/panah-aliran3.png" style="width: 59px; height: 15px; transform: rotate(${rotation}deg); background-color: transparent; border-color:#fff;" />`
        }),
      }).addTo(map);

    }
function generateBoxPetak(petakId, petakName, lineCoords, position, golongan) {

  const linePetak = L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);

  const tooltipContent = `
    <div class="box-petak ${golongan}" id="${petakId}-petak">
        <table id="petak-${petakId}">
          <thead>
            <tr>
                <th class="text-center" colspan="2">${petakName}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td class="luas-petak">
                  A= <strong>-</strong>
                </td>
                <td>
                  <span class="debit-kebutuhan text-dark">QK= <strong>-</strong></span>
                  </br>
                  <span class="debit-aktual text-primary">QA= <strong>-</strong></span>
                  </br>
                  <span class="debit-rekomendasi text-warning">QR= <strong>-</strong></span>
                </td>
            </tr>
          </tbody>
        </table>
    </div>
  `;

  // Bind tooltip to the polyline
  const endPoint = linePetak.getLatLngs()[1];

  // Bind tooltip to the polyline end point
  linePetak.bindTooltip(tooltipContent, {
    permanent: true,
    direction: position,
    className: 'transparent-tooltip',
    offset: [0, 0] // Adjust the offset to position the tooltip correctly at the end of the polyline
  }).openTooltip(endPoint);

  boxPetakList.push(linePetak);
}

function generateTextSaluranPrimer(title, latlng, textDeg) {
    var text = L.marker(latlng, {
      icon: L.divIcon({
        className: 'text-saluran-primer',
        iconSize: [100, 40],
        html: `<div style="transform: rotate(${textDeg}deg);">${title}</div>`
      }),
    }).addTo(map);
  }

function generateTextSaluranSekunder(title, latlng, textDeg) {
  var text = L.marker(latlng, {
    icon: L.divIcon({
      className: 'text-saluran-sekunder',
      iconSize: [100, 40],
      html: `<div style="transform: rotate(${textDeg}deg);">${title}</div>`
    }),
  }).addTo(map);
}

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

function getSchemaData(tanggal) {
  disableElements();
  $('.box-petak tbody').html(`<tr><td class="text-center" colspan="2"><img src="/images/loading.gif" /></td></tr>`);
  getData(`/Schema/GetSchemaDataByDate/${tanggal}`).then(res => {
    let result = res.data
    if (result.metaData.code == 200) {
      var luas = 'A= <strong>-</strong>';
      var debit_kebutuhan = 'QK= <strong>-</strong>';
      var debit_aktual = 'QA= <strong>-</strong>';
      var debit_rekomendasi = 'QR= <strong>-</strong>';

     $(`.box-petak tbody`).html(`
        <tr>
          <td class="luas-petak">
            ${luas}
          </td>
          <td>
            <span class="debit-kebutuhan text-dark">${debit_kebutuhan}</span>
            </br>
            <span class="debit-aktual text-primary">${debit_aktual}</span>
            </br>
            <span class="debit-rekomendasi text-warning">${debit_rekomendasi}</span>
          </td>
        </tr>
      `);
      
      $.each(result.response, function (key, data) {
        if(data.luas != null) {
          luas = `A= ${formatNumber(data.luas)} Ha`;
        }

        if(data.debit_kebutuhan != null) {
         if (isDateInRange(tanggal)) {
            debit_kebutuhan = `QK= 0 lt/dt`;
          } else {
            debit_kebutuhan = `QK= ${formatNumber(data.debit_kebutuhan)} lt/dt`;
          }
        }

        if(data.debit_aktual != null) {
          debit_aktual = `QA= ${formatNumber(data.debit_aktual)} lt/dt`;
        }

        if(data.debit_rekomendasi != null) {
          if (isDateInRange(tanggal)) {
            debit_rekomendasi = `QR= 0 lt/dt`;
          } else {
            debit_rekomendasi = `QR= ${formatNumber(data.debit_rekomendasi)} lt/dt`;
          }
        }

        $(`#petak-${data.id} tbody`).html(`
          <tr>
            <td class="luas-petak">
              ${luas}
            </td>
            <td>
              <span class="debit-kebutuhan text-dark">${debit_kebutuhan}</span>
              </br>
              <span class="debit-aktual text-primary">${debit_aktual}</span>
              </br>
              <span class="debit-rekomendasi text-warning">${debit_rekomendasi}</span>
            </td>
          </tr>
        `);
      });    
      enableElements();                
    }
  }).catch(err => {
    enableElements();
    let error = err.response.data
    if(!error.success) {
        console.log(error.message)
    }
  })
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
