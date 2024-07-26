"use strict";

const whiteBasemap = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/3cwcakAAAAASUVORK5CYII=');

const map = L.map('map', {
    // attributionControl: false,
    center: [-7, 109.5],
    // center: [-8.7, 110.4],
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
        map.attributionControl.addAttribution('DI. Manganti Versi: R4 (Update 16 Juli 2024)');

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

    var initBch15 = function () {
        const bch15Point = [-7.125, 108.93];
        const bch16Point = [-6.98, 108.93];
        const bch17Point = [-6.68, 108.93];
        const bch18Point = [-6.55, 109.3];
        const bch19Point = [-6.55, 109.65];
        const bch20Point = [-6.55, 109.9];
        const bch21Point = [-6.55, 110.3];
        const bch22Point = [-6.55, 110.6];
        const bch23Point = [-6.55, 110.9];
        const bch24Point = [-6.55, 111.2];
        const bch25Point = [-6.55, 111.5];
        const bch26Point = [-6.55, 111.8];
        const bch27Point = [-6.55, 112];
        const bsr1Point = [bch15Point[0], 109.08];
        const bsr2Point = [bch15Point[0], 109.26];
        const bsr3Point = [bch15Point[0], 109.44];
        const bsr4Point = [bch15Point[0], 109.62];
        const bsr5Point = [bch15Point[0], 109.8];
        const bkc1Point = [-6.85, bch18Point[1]];
        const bkc2Point = [-6.98, bch18Point[1]];
        const bcw1Point = [-6.85, bch26Point[1]];
        const bcw2Point = [-7, bch26Point[1]];

        // Petak B.Ch 27
        const lineCh27Ki = [bch27Point, [-6.45, bch27Point[1]]];
        generateBoxPetak('9d05c2bc-5924-403d-9195-6c30516d5ca0', 'Ch 27 Ki', lineCh27Ki, 'top');

        // Petak B.Ch 26
        const lineCw2Ka = [bcw2Point, [bcw2Point[0], 111.72]];
        generateBoxPetak('ba4ec83a-a600-416f-a599-1a81273b32d6', 'Cw 2 Ka', lineCw2Ka, 'left');

        const lineBcw2 = [
            bch26Point, 
            bcw2Point
        ];
        generateBangunanSadap('B.Cw 2', 'centerright', lineBcw2, 0);

        const lineCw1Ka = [bcw1Point, [bcw1Point[0], 111.72]];
        generateBoxPetak('13210921-967b-4bdc-9490-a8a7c33132bb', 'Cw 1 Ka', lineCw1Ka, 'left');

        const lineBcw1 = [
            bch26Point, 
            bcw1Point
        ];
        generateBangunanSadap('B.Cw 1', 'centerright', lineBcw1, 0);

        const lineCh26Ka = [bch26Point, [-6.65, 111.95]];
        generateBoxPetak('be135653-0e70-4322-96f1-672c82bb4a3f', 'Ch 26 Ka', lineCh26Ka, 'bottom');

        // Petak B.Ch 25
        const lineCh25Ka = [bch25Point, [-6.63, bch25Point[1]]];
        generateBoxPetak('1111b9da-59f7-4590-be94-0249c3a94ba6', 'Ch 25 Ka', lineCh25Ka, 'bottom');

        // Petak B.Ch 24
        const lineCh24Ka = [bch24Point, [-6.63, bch24Point[1]]];
        generateBoxPetak('72740a1e-8f67-43ec-9925-2f0340c4129f', 'Ch 24 Ka', lineCh24Ka, 'bottom');

        // Petak B.Ch 23
        const lineCh23Ka = [bch23Point, [-6.63, bch23Point[1]]];
        generateBoxPetak('e028c976-3cbf-4c8a-8668-5f7b31850ae1', 'Ch 23 Ka', lineCh23Ka, 'bottom');

        // Petak B.Ch 22
        const lineCh22Ka = [bch22Point, [-6.63, bch22Point[1]]];
        generateBoxPetak('0fb63ac6-79c5-4947-a2ba-b88d838e93c7', 'Ch 22 Ka', lineCh22Ka, 'bottom');

        // Petak B.Ch 21
        const lineCh21Ka = [bch21Point, [-6.63, bch21Point[1]]];
        generateBoxPetak('938e9429-883d-4b81-b703-ca4906e20971', 'Ch 21 Ka', lineCh21Ka, 'bottom');

        // Petak B.Ch 20
        const lineCh20Ka = [bch20Point, [-6.63, bch20Point[1]]];
        generateBoxPetak('856a6944-f7fa-41e5-9d13-62dedf4a3faf', 'Ch 20 Ka', lineCh20Ka, 'bottom');

        // Petak B.Ch 19
        const lineCh19Ka = [bch19Point, [-6.63, bch19Point[1]]];
        generateBoxPetak('2cb54ac1-5e76-456b-87ef-c024b35e7f8a', 'Ch 19 Ka', lineCh19Ka, 'bottom');

        // Petak B.Ch 18
        const lineKc2Ki = [bkc2Point, [bkc2Point[0], 109.4]];
        generateBoxPetak('ea80ef9a-70db-450b-8a8c-73e9126f8a44', 'Kc 2 Ki', lineKc2Ki, 'right');

        const lineBkc2 = [
            bch18Point, 
            bkc2Point
        ];
        generateBangunanSadap('B.Kc 2', 'centerleft', lineBkc2, 0);

        const lineKc1Ka = [bkc1Point, [bkc1Point[0], 109.25]];
        generateBoxPetak('b24a7e0a-70c7-41f8-9ebe-582fff3ced85', 'Kc 1 Ka', lineKc1Ka, 'left');

        const lineBkc1 = [
            bch18Point, 
            bkc1Point
        ];
        generateBangunanSadap('B.Kc 1', 'centerright', lineBkc1, 0);

        const lineCh18Ka = [bch18Point, [-6.68, 109.43]];
        generateBoxPetak('063e7557-ee1b-43da-afa6-38d8f81e2a13', 'Ch 18 Ka', lineCh18Ka, 'bottom');

        // Petak B.Ch 17
        const lineCh17Ka = [bch17Point, [bch17Point[0], 109]];
        generateBoxPetak('1fcae390-0b0e-4ac1-bfca-fc3fa5e9177d', 'Ch 17 Ka', lineCh17Ka, 'right');

        // Petak B.Ch 16
        const lineCh16Ka = [bch16Point, [bch16Point[0], 109]];
        generateBoxPetak('33fb18ff-1bf1-44bd-bcc8-bba6f6d1d5ed', 'Ch 16 Ka', lineCh16Ka, 'right');

        // Petak B.Ch 15
        generateTextSaluranSekunder('SAL.SEK.SIDAREJA', [-7.165, 109.44], 0)

        const lineSr5Ka = [bsr5Point, [bsr5Point[0] - 0.06, bsr5Point[1]]];
        generateBoxPetak('c7c1ae72-c5f5-4485-bb13-886785a919c7', 'Sr 5 Ka', lineSr5Ka, 'bottom');

        const lineSr4Ka = [bsr4Point, [bsr4Point[0] - 0.06, bsr4Point[1]]];
        generateBoxPetak('0402022b-6f4c-48c8-998e-28f813d2732e', 'Sr 4 Ka', lineSr4Ka, 'bottom');
        
        const lineSr3Ka = [bsr3Point, [bsr3Point[0] - 0.06, bsr3Point[1]]];
        generateBoxPetak('2ae66f2e-5a6f-4a7a-be5f-79905adb7339', 'Sr 3 Ka', lineSr3Ka, 'bottom');

        const lineSr2Ka = [bsr2Point, [bsr2Point[0] - 0.06, bsr2Point[1]]];
        generateBoxPetak('ff5f37d4-9b2c-47af-9800-f90f807de06c', 'Sr 2 Ka', lineSr2Ka, 'bottom');

        const lineSr1Ka = [bsr1Point, [bsr1Point[0] - 0.06, bsr1Point[1]]];
        generateBoxPetak('1fcae390-0b0e-4ac1-bfca-fc3fa5e9167d', 'Sr 1 Ka', lineSr1Ka, 'bottom');

        const lineBsr5 = [
            bch15Point, 
            bsr5Point
        ];
        generateBangunanSadap('B.Sr 4', 'topcenter', lineBsr5, 0);

        const lineBsr4 = [
            bch15Point, 
            bsr4Point
        ];
        generateBangunanSadap('B.Sr 4', 'topcenter', lineBsr4, 0);

        const lineBsr3 = [
            bch15Point, 
            bsr3Point
        ];
        generateBangunanSadap('B.Sr 3', 'topcenter', lineBsr3, 0);

        const lineBsr2 = [
            bch15Point, 
            bsr2Point
        ];
        generateBangunanSadap('B.Sr 2', 'topcenter', lineBsr2, 0);

        const lineBsr1 = [
            bch15Point, 
            bsr1Point
        ];
        generateBangunanSadap('B.Sr 1', 'topcenter', lineBsr1, 0);

        // Generate Bangunan Pembagi

        const lineBch27 = [
            bch26Point,
            bch27Point
        ];
        generateBangunanPembagiDanSadap('B.Ch. 27', 'topright', lineBch27);

        const lineBch26 = [
            bch25Point,
            bch26Point
        ];
        generateBangunanPembagi('B.Ch. 26', 'topcenter', lineBch26);

        const lineBch25 = [
            bch24Point,
            bch25Point
        ];
        generateBangunanPembagiDanSadap('B.Ch. 25', 'topcenter', lineBch25);

        const lineBch24 = [
            bch23Point,
            bch24Point
        ];
        generateBangunanPembagiDanSadap('B.Ch. 24', 'topcenter', lineBch24);

        const lineBch23 = [
            bch22Point,
            bch23Point
        ];
        generateBangunanPembagiDanSadap('B.Ch. 23', 'topcenter', lineBch23);

        generateTextSaluranPrimer('SALURAN INDUK CIHAUR', [-6.6, 110.1], 0)

        const lineBch22 = [
            bch21Point,
            bch22Point
        ];
        generateBangunanPembagiDanSadap('B.Ch. 22', 'topcenter', lineBch22);

        const lineBch21 = [
            bch20Point,
            bch21Point
        ];
        generateBangunanPembagiDanSadap('B.Ch. 21 (BC.II - IX)', 'topcenter', lineBch21);

        const lineBch20 = [
            bch19Point,
            bch20Point
        ];
        generateBangunanPembagiDanSadap('B.Ch. 20', 'topcenter', lineBch20);

        const lineBch19 = [
            bch18Point,
            bch19Point
        ];
        generateBangunanPembagiDanSadap('B.Ch. 19', 'topcenter', lineBch19);

        generateTextSaluranSekunder('SAL.SEK.KUNCI', [-6.7, 109.27], 270)

        const lineBch18 = [
            bch17Point,
            [-6.55, 108.93],
            [-6.55, 109.3]
        ];
        generateBangunanPembagi('B.Ch. 18', 'topcenter', lineBch18);

        const lineBch17 = [
            bch15Point,
            bch17Point
        ];
        generateBangunanPembagiDanSadap('B.Ch. 17', 'left', lineBch17);

        const lineBch16 = [
            bch15Point,
            bch16Point
        ];
        generateBangunanPembagiDanSadap('B.Ch. 16', 'left', lineBch16);

        const lineBch15 = [
            [-7.325, 108.77],
            [-7.325, 108.93],
            bch15Point
        ];
        generateBangunanPembagi('B.Ch. 15', 'left', lineBch15);

        generateTextSaluranPrimer('SALURAN INDUK CIHAUR', [-7.05, 108.8], 270)
    }
    
    var initBch16 = function () {

    }

    return {
        //main function to initiate the module
        init: function () {
            initInput();
            initMap();

            // Generate Skema
            initBch16();
            initBch15();
        },
    };
})();

jQuery(document).ready(function () {
  SkemaSidareja.init();
  getSchemaData(getValueById('filter-date'));
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

function generateBoxPetak(petakId, petakName, lineCoords, position, golongan) {

  const linePetak = L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);

  const tooltipContent = `
    <div class="box-petak">
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
          debit_kebutuhan = `QK= ${formatNumber(data.debit_kebutuhan)} lt/dt`;
        }

        if(data.debit_aktual != null) {
          debit_aktual = `QA= ${formatNumber(data.debit_aktual)} lt/dt`;
        }

        if(data.debit_rekomendasi != null) {
          debit_rekomendasi = `QR= ${formatNumber(data.debit_rekomendasi)} lt/dt`;
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
