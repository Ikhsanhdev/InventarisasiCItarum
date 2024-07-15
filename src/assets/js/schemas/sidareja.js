"use strict";

const whiteBasemap = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/3cwcakAAAAASUVORK5CYII=');

const map = L.map('map', {
    attributionControl: false,
    center: [-7.444992423191618, 109.47077209463006],
    // center: [-8.5, 109.47077209463006],
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

var SkemaSidareja = (function () {
    var initMap = function () {
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
                    <td class="text-center fw-bold">K</td>
                    <td>Debit Kebutuhan</td>
                  </tr>
                  <tr>
                    <td class="text-center text-primary fw-bold">A</td>
                    <td>Debit Aktual</td>
                  </tr>
                  <tr>
                    <td class="text-center text-warning fw-bold">R</td>
                    <td>Debit Rekomendasi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `;
          return div;
        };

        legendControl.addTo(map);
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

    var initBs1 = function () {
      const linePts1Ki = [[-7.325, 108.77], [-7.325, 108.81]];
      generateBoxPetak('fca11354-774f-4924-8dc6-c88bcd5f2de6', 'Pts. 1 Ki', linePts1Ki, 'right');

      const lineBs1 = [
        [-7.235, 108.77],
        [-7.325, 108.77]
      ];
      generateBangunanPembagiDanSadap('BS. I', lineBs1);
    }

    var initBs2 = function () {
      const bs2Point = [-7.5, 108.77];
      const bks1Point = [-7.5, 108.93];
      const bks2Point = [-7.5, 109.1];

      // Set Bks. 2
      const linePtKs2Ki = [bks2Point, [-7.475, bks2Point[1]]];
      generateBoxPetak('a26be22c-f1e0-4400-af78-82b3b93cb1bf', 'Pt. Ks. 2-Ki', linePtKs2Ki, 'top');
      
      const lineBks2 = [
        bs2Point, 
        bks2Point
      ];
      generateBangunanSadap('BKs. 2', 'bottomcenter', lineBks2, 90);

      // Set BKs. 1
      const linePtKs1Ki = [bks1Point, [-7.475, bks1Point[1]]];
      generateBoxPetak('3ca505a2-0038-45a7-aa38-e2f43205d84d', 'Pt. Ks. 1-Ki', linePtKs1Ki, 'top');

      const lineBks1 = [
        bs2Point, 
        bks1Point
      ];
      generateBangunanSadap('BKs. 1', 'bottomcenter', lineBks1, 90);

      // Set BS. II
      const lineBs2 = [
        [-7.325, 108.77],
        bs2Point
      ];
      generateBangunanPembagi('BS. II', lineBs2);

      generateTextSaluranSekunder('SS. KARANG SARI', [-7.4, 108.92], 0)
    }

    var initBs3 = function () {
      const bs3Point = [-7.675, 108.77];
      const brm1Point = [bs3Point[0], 108.87];
      const brm2Point = [bs3Point[0], 109.038];
      const brm3Point = [bs3Point[0], 109.15];
      const brm4Point = [bs3Point[0], 109.33];
      const brm5Point = [bs3Point[0], 109.51];

      // Set BRm. 5
      const linePtsRm5Ki = [brm5Point, [-7.65, brm5Point[1]]];
      generateBoxPetak('9420e89d-7dac-4532-ae6c-2c780837e57b', 'Pts. Rm. 5-Ki', linePtsRm5Ki, 'top');

      const linePtsRm5Kn = [brm5Point, [-7.73, brm5Point[1]]];
      generateBoxPetak('89c2cd98-caea-42d4-af0b-2ba7bd55c667', 'Pts. Rm. 5-Kn', linePtsRm5Kn, 'bottom');
       
      const lineBrm5 = [
        bs3Point, 
        brm5Point
      ];
      generateBangunanSadap('BRm. 5', 'bottomright', lineBrm5, 90);

      // Set BRm. 4
      const linePtsRm4Ki = [brm4Point, [-7.65, brm4Point[1]]];
      generateBoxPetak('af93bac3-682a-4c93-a997-91979f0ae3a0', 'Pts. Rm. 4-Ki', linePtsRm4Ki, 'top');
      
      const lineBrm4 = [
        bs3Point, 
        brm4Point
      ];
      generateBangunanSadap('BRm. 4', 'bottomcenter', lineBrm4, 90);

      // Set BRm. 3
      const linePtsRm3Ki = [brm3Point, [-7.65, brm3Point[1]]];
      generateBoxPetak('509a16fd-9b7c-475f-89a0-24386d38709f', 'Pts. Rm. 3-Ki', linePtsRm3Ki, 'top');
      
      const lineBrm3 = [
        bs3Point, 
        brm3Point
      ];
      generateBangunanSadap('BRm. 3', 'bottomcenter', lineBrm3, 90);

      // Set BRm. 2
      const linePtsRm2Kn = [brm2Point, [-7.72, brm2Point[1]]];
      generateBoxPetak('7cfa3b50-14b2-4724-a582-fddfb27ed8bc', 'Pts. Rm. 2-Kn', linePtsRm2Kn, 'bottom');
      
      const lineBrm2 = [
        bs3Point, 
        brm2Point
      ];
      generateBangunanSadap('BRm. 2', 'bottomright', lineBrm2, 90);

      // Set BRm. 1
      const linePtsRm1Ki = [brm1Point, [-7.65, brm1Point[1]]];
      generateBoxPetak('8c2c67ac-756f-4de2-b3c2-f0b9e21cd6e5', 'Pts. Rm. 1-Ki', linePtsRm1Ki, 'top');

      const linePtsRm1Kn = [brm1Point, [-7.72, brm1Point[1]]];
      generateBoxPetak('1518f3d6-5f9e-4ae7-b734-8ece837bcdc1', 'Pts. Rm. 1-Kn', linePtsRm1Kn, 'bottom');

      const lineBrm1 = [
        bs3Point, 
        brm1Point
      ];
      generateBangunanSadap('BRm. 1', 'bottomright', lineBrm1, 90);

      // Set BS. III
      const lineBs3 = [
        [-7.325, 108.77],
        bs3Point
      ];
      generateBangunanPembagi('BS. III', lineBs3);

      generateTextSaluranSekunder('SS. REJA MULYA', [-7.57, 109.2], 0);
    }

    var initBs4 = function () {
      const bs4Point = [-7.86, 108.77];

      const linePts4Ki = [bs4Point, [bs4Point[0], 108.81]];
      generateBoxPetak('0d219996-918d-4549-9a4a-0a6820e9e40d', 'Pts. IV Ki', linePts4Ki, 'right');

      const lineBs4 = [
        [-7.675, 108.77],
        bs4Point
      ];
      generateBangunanPembagiDanSadap('BS. IV', lineBs4);
    }

    var initBs5 = function () {
      const bs5Point = [-8.05, 108.77];
      const bkd1Point = [bs5Point[0], 108.87];
      const bkd2Point = [bs5Point[0], 109.04];
      const bkd3Point = [bs5Point[0], 109.22];
      const bkd4Point = [bs5Point[0], 109.4];
      const bkd5Point = [bs5Point[0], 109.58];
      const bkd6Point = [bs5Point[0], 109.76];
      const bkd7Point = [bs5Point[0], 109.88];
      const bkd8Point = [bs5Point[0], 110.08];

      // Set BKd. 8
      const linePtKd8Ki = [bkd8Point, [-8, bkd8Point[1]]];
      generateBoxPetak('19f7b89b-09ec-4538-a27d-f522792d6b54', 'Pt. Kd. 8-Ki', linePtKd8Ki, 'top');

      const linePtKd8Kn = [bkd8Point, [-8.1, bkd8Point[1]]];
      generateBoxPetak('bf22c9b5-1310-45f2-8c55-b1c729660edf', 'Pt. Kd. 8-Kn', linePtKd8Kn, 'bottom');

      const lineBkd8 = [
        bs5Point, 
        bkd8Point
      ];
      generateBangunanSadap('BKd. 8', 'bottomright', lineBkd8, 90);

      // Set BKd. 7
      const linePtKd7Kn = [bkd7Point, [-8.1, bkd7Point[1]]];
      generateBoxPetak('bb284931-2b5a-48ad-87e5-75a048c42c48', 'Pt. Kd. 7-Kn', linePtKd7Kn, 'bottom');

      const lineBkd7 = [
        bs5Point, 
        bkd7Point
      ];
      generateBangunanSadap('BKd. 7', 'bottomright', lineBkd7, 90);

      // Set BKd. 6
      const linePtKd6Ki = [bkd6Point, [-8, bkd6Point[1]]];
      generateBoxPetak('37ae32d1-80ca-4197-8ac5-69b13653f261', 'Pt. Kd. 6-Ki', linePtKd6Ki, 'top');

      const lineBkd6 = [
        bs5Point, 
        bkd6Point
      ];
      generateBangunanSadap('BKd. 6', 'bottomcenter', lineBkd6, 90);

      // Set BKd. 5
      const linePtKd5Ki = [bkd5Point, [-8, bkd5Point[1]]];
      generateBoxPetak('87d948a4-46d7-4c2f-92b1-eae58b8e8d24', 'Pt. Kd. 5-Ki', linePtKd5Ki, 'top');

      const lineBkd5 = [
        bs5Point, 
        bkd5Point
      ];
      generateBangunanSadap('BKd. 5', 'bottomcenter', lineBkd5, 90);

      // Set BKd. 4
      const linePtKd4Ki = [bkd4Point, [-8, bkd4Point[1]]];
      generateBoxPetak('5b8b2241-d1df-42e1-9409-a444f42a329e', 'Pt. Kd. 4-Ki', linePtKd4Ki, 'top');

      const lineBkd4 = [
        bs5Point, 
        bkd4Point
      ];
      generateBangunanSadap('BKd. 4', 'bottomcenter', lineBkd4, 90);

      // Set BKd. 3
      const linePtKd3Ki = [bkd3Point, [-8, bkd3Point[1]]];
      generateBoxPetak('c4690341-532f-43a6-9dd0-9a9d90e4f996', 'Pt. Kd. 3-Ki', linePtKd3Ki, 'top');

      const lineBkd3 = [
        bs5Point, 
        bkd3Point
      ];
      generateBangunanSadap('BKd. 3', 'bottomcenter', lineBkd3, 90);

      // Set BKd. 2
      const linePtKd2Ki = [bkd2Point, [-8, bkd2Point[1]]];
      generateBoxPetak('d2ea57f2-ac28-4aea-9626-619e46804ea1', 'Pt. Kd. 2-Ki', linePtKd2Ki, 'top');

      const linePtKd2Kn = [bkd2Point, [-8.1, bkd2Point[1]]];
      generateBoxPetak('2a91cbf6-acd3-40f0-9c14-00856b14aba6', 'Pt. Kd. 2-Kn', linePtKd2Kn, 'bottom');

      const lineBkd2 = [
        bs5Point, 
        bkd2Point
      ];
      generateBangunanSadap('BKd. 2', 'topleft', lineBkd2, 90);

      // Set BKd. 1
      const linePtKd1Kn = [bkd1Point, [-8.1, bkd1Point[1]]];
      generateBoxPetak('c5dc7b64-2019-4c6d-97c8-ccc4a54a130b', 'Pt. Kd. 1-Kn', linePtKd1Kn, 'bottom');

      const lineBkd1 = [
        bs5Point, 
        bkd1Point
      ];
      generateBangunanSadap('BKd. 1', 'topcenter', lineBkd1, 90);

      // Set BS. V
      const lineBs5 = [
        [-7.855, 108.77],
        bs5Point
      ];
      generateBangunanPembagi('BS. V', lineBs5);

      generateTextSaluranSekunder('SS. KEDUNG DADAP', [-7.9, 109.3], 0);
    }

    var initBs6 = function () {
      const bs6Point = [-8.38, 108.72];

      // Set BS. VI
      const lineBs6 = [
        [-8.05, 108.77],
        [-8.22, 108.77],
        [-8.22, 108.72],
        [-8.3, 108.72],
        bs6Point
      ];
      generateBangunanPembagi('BS. VI', lineBs6);

      // generateTextSaluranSekunder('SS. CIKALAPA', [-7.9, 109.3], 0);
    }

    return {
        //main function to initiate the module
        init: function () {
            initMap();

            // Generate Skema
            initBs6();
            initBs5();
            initBs4();
            initBs3();
            initBs2();
            initBs1();
            initAliranMasuk();
        },
    };
})();

jQuery(document).ready(function () {
  SkemaSidareja.init();
  getSchemaData('2024-07-14');
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

  const originalContent = point.getTooltip().getContent();
  point.unbindTooltip();
  point.bindTooltip(originalContent, {
      permanent: true,
      direction: 'left',
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


function generateBangunanPembagi(title, lineCoords) {
  L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);

  const pointTitle = `<div class="bs-title">${title}</div>`;

  var point = L.circle(lineCoords[lineCoords.length - 1], 1000, circleBgWhite).addTo(map);
  L.circle(lineCoords[lineCoords.length - 1], 380, circleBgBlack).addTo(map);

  // Bind tooltip to the polyline end point
  point.bindTooltip(pointTitle, {
      permanent: true,
      direction: 'left',
      className: 'transparent-tooltip',
      offset: [-15, 0]
  }).openTooltip();

  bangunanPembagiList.push(point);
}

function generateBangunanPembagiDanSadap(title, lineCoords) {
  L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);

  const pointTitle = `<div class="bs-title">${title}</div>`;

  var point = L.circle(lineCoords[1], 250, circleBgWhite).addTo(map);

  point.bindTooltip(pointTitle, {
      permanent: true,
      direction: 'left',
      className: 'transparent-tooltip',
      offset: [-15, 0] // Adjust the offset to position the tooltip correctly at the end of the polyline
  }).openTooltip();

  bangunanPembagiList.push(point);
}

function generateBangunanSadap(title, titlePosition, lineCoords, textDeg) {
  L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);

  const pointTitle = `<div class="bangunan-sadap-title" style="transform: rotate(${textDeg}deg);white-space: nowrap;">${title}</div>`;

  var point = L.circle(lineCoords[1], 250, circleBgWhite).addTo(map);

  var offset = [0, 0];
  var direction = 'center';

  if(titlePosition == 'topcenter') {
    direction = 'top';
    offset = [0, -10];
  } else if(titlePosition == 'topleft') {
    direction = 'top';
    offset = [-10, -10];
  } else if(titlePosition == 'bottomcenter') {
    direction = 'bottom';
    offset = [0, 10];
  } else if(titlePosition == 'bottomright') {
    direction = 'bottom';
    offset = [8, 10];
  }

  point.bindTooltip(pointTitle, {
      permanent: true,
      direction: direction,
      className: 'transparent-tooltip',
      offset: offset
  }).openTooltip();

  bangunanSadapList.push(point);
}

function generateBoxPetak(petakId, petakName, lineCoords, position, golongan) {

  const linePetak = L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);

  const tooltipContent = `
    <div class="box-petak golongan-a">
        <table id="petak-${petakId}">
            <tr>
                <th class="text-center" colspan="2">${petakName}</th>
            </tr>
            <tr>
                <td class="luas-petak">
                  A= <strong>-</strong>
                </td>
                <td>
                  <span class="debit-kebutuhan text-dark">K= <strong>-</strong></span>
                  </br>
                  <span class="debit-aktual text-primary">A= <strong>-</strong></span>
                  </br>
                  <span class="debit-rekomendasi text-warning">R= <strong>-</strong></span>
                </td>
            </tr>
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

function generateTextSaluranSekunder(title, latlng, textDeg) {
  var text = L.marker(latlng, {
    icon: L.divIcon({
      className: 'text-saluran-sekunder',
      iconSize: [100, 40],
      html: `<div style="transform: rotate(${textDeg}deg);">${title}</div>`
    }),
  }).addTo(map);
}

function getSchemaData(tanggal) {
  console.log(boxPetakList)
  getData(`/Schema/GetSchemaDataByDate/${tanggal}`).then(res => {
    let result = res.data
    if (result.metaData.code == 200) {
      $.each(result.response, function (key, data) {
        if(data.luas == null) {
          $(`#petak-${data.id}`).find('.luas-petak').html(`A= <strong>-</strong>`);
        } else {
          $(`#petak-${data.id}`).find('.luas-petak').html(`A= ${data.luas} Ha`);
        }

        if(data.debit_kebutuhan == null) {
          $(`#petak-${data.id}`).find('.debit-kebutuhan').html(`K= <strong>-</strong>`);
        } else {
          $(`#petak-${data.id}`).find('.debit-kebutuhan').html(`K= ${data.debit_kebutuhan} m3/dt`);
        }

        if(data.debit_rekomendasi == null) {
          $(`#petak-${data.id}`).find('.debit-rekomendasi').html(`R= <strong>-</strong>`);
        } else {
          $(`#petak-${data.id}`).find('.debit-rekomendasi').html(`R= ${data.debit_rekomendasi} m3/dt`);
        }
      });                    
    }
  }).catch(err => {
    let error = err.response.data
    if(!error.success) {
        console.log(error.message)
    }
  })
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