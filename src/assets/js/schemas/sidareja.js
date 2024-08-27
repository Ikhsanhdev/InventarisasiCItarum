"use strict";
console.log("test");
const whiteBasemap = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/3cwcakAAAAASUVORK5CYII=');

const map = L.map('map', {
    // attributionControl: false,
    // center: [-7.444992423191618, 109.47077209463006],
    // center: [-8.7, 110.4],
    center: [-9.7, 108.72],
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
                    <td class="text-center fw-bold">A</td>
                    <td>Luas Petak</td>
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
                    <td>Debit Rekomendasi
                    (Hasil Model AI)</td>
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

      const lineBoxAliranMasuk = [lineCoords[1],[-7.32, 108.71]];
      generateBox("9595 Ha","13.611 m3/s","193.70 m",lineBoxAliranMasuk,'top')
  
    }
   
    var initBs1 = function () {
      const linePts1Ki = [[-7.325, 108.77], [-7.325, 108.81]];
      generateBoxPetak('fca11354-774f-4924-8dc6-c88bcd5f2de6', 'Pts. 1 Ki', linePts1Ki, 'right', 'golongan-a');

      const lineBs1 = [
        [-7.235, 108.77],
        [-7.325, 108.77]
      ];
      generateBangunanPembagiDanSadap('BS. I', lineBs1);

      const lineBoxBs1 = [[-7.435, 108.71], [-7.435, 108.71]];
      generateBox("9079 Ha","13.544 m3/s","1002.56 m",lineBoxBs1,'top')
    }

    var initBs2 = function () {
      const bs2Point = [-7.5, 108.77];
      const bks1Point = [-7.5, 108.93];
      const bks2Point = [-7.5, 109.1];

      // Set Bks. 2
      const linePtKs2Ki = [bks2Point, [-7.475, bks2Point[1]]];
      generateBoxPetak('a26be22c-f1e0-4400-af78-82b3b93cb1bf', 'Pt. Ks. 2-Ki', linePtKs2Ki, 'top', 'golongan-a');
      
      const lineBks2 = [
        bs2Point, 
        bks2Point
      ];
      generateBangunanSadap('BKs. 2', 'bottomcenter', lineBks2, 90);

      const lineBoxPtKs2Ki = [[-7.57, 109.001], [-7.57, 109.001]];
      generateBox("57 Ha","0.083 m3/s","429.87 m",lineBoxPtKs2Ki,'top')

      // Set BKs. 1
      const linePtKs1Ki = [bks1Point, [-7.475, bks1Point[1]]];
      generateBoxPetak('3ca505a2-0038-45a7-aa38-e2f43205d84d', 'Pt. Ks. 1-Ki', linePtKs1Ki, 'top', 'golongan-a');

      const lineBks1 = [
        bs2Point, 
        bks1Point
      ];
      generateBangunanSadap('BKs. 1', 'bottomcenter', lineBks1, 90);

      const lineBoxPtKs1Ki = [[-7.57, 108.85], [-7.57, 108.85]];
      generateBox("96 Ha","0.140 m3/s","340.20 m",lineBoxPtKs1Ki,'top')

      // Set BS. II
      const lineBs2 = [
        [-7.325, 108.77],
        bs2Point
      ];
      generateBangunanPembagi('BS. II', lineBs2);

      generateTextSaluranSekunder('SS. KARANG SARI', [-7.4, 108.92], 0)

      const lineBoxBs2 = [[-7.615, 108.71], [-7.615, 108.71]];
      generateBox("8983 Ha","13.401 m3/s","1479.73 m",lineBoxBs2,'top')
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
      generateBoxPetak('9420e89d-7dac-4532-ae6c-2c780837e57b', 'Pts. Rm. 5-Ki', linePtsRm5Ki, 'top', 'golongan-a');

      const linePtsRm5Kn = [brm5Point, [-7.73, brm5Point[1]]];
      generateBoxPetak('89c2cd98-caea-42d4-af0b-2ba7bd55c667', 'Pts. Rm. 5-Kn', linePtsRm5Kn, 'bottom', 'golongan-a');
       
      const lineBrm5 = [
        bs3Point, 
        brm5Point
      ];
      generateBangunanSadap('BRm. 5', 'bottomright', lineBrm5, 90);

      // Set BRm. 4
      const linePtsRm4Ki = [brm4Point, [-7.65, brm4Point[1]]];
      generateBoxPetak('af93bac3-682a-4c93-a997-91979f0ae3a0', 'Pts. Rm. 4-Ki', linePtsRm4Ki, 'top', 'golongan-a');
      
      const lineBrm4 = [
        bs3Point, 
        brm4Point
      ];
      generateBangunanSadap('BRm. 4', 'bottomcenter', lineBrm4, 90);

      const lineBoxPtsRm4Ki = [[-7.72, 109.42], [-7.72, 109.42]];
      generateBox("56 Ha","0.082 m3/s","1008.09 m",lineBoxPtsRm4Ki,'top')

      // Set BRm. 3
      const linePtsRm3Ki = [brm3Point, [-7.65, brm3Point[1]]];
      generateBoxPetak('509a16fd-9b7c-475f-89a0-24386d38709f', 'Pts. Rm. 3-Ki', linePtsRm3Ki, 'top', 'golongan-a');
      
      const lineBrm3 = [
        bs3Point, 
        brm3Point
      ];
      generateBangunanSadap('BRm. 3', 'bottomcenter', lineBrm3, 90);

      const lineBoxPtsRm3Ki = [[-7.72, 109.25], [-7.72, 109.25]];
      generateBox("122 Ha","0.178 m3/s","1263.50 m",lineBoxPtsRm3Ki,'top')

      // Set BRm. 2
      const linePtsRm2Kn = [brm2Point, [-7.72, brm2Point[1]]];
      generateBoxPetak('7cfa3b50-14b2-4724-a582-fddfb27ed8bc', 'Pts. Rm. 2-Kn', linePtsRm2Kn, 'bottom', 'golongan-a');
      
      const lineBrm2 = [
        bs3Point, 
        brm2Point
      ];
      generateBangunanSadap('BRm. 2', 'bottomright', lineBrm2, 90);

      const lineBoxPtsRm2Kn = [[-7.72, 109.1], [-7.72, 109.1]];
      generateBox("165 Ha","0.241 m3/s","608 m",lineBoxPtsRm2Kn,'top')

      // Set BRm. 1
      const linePtsRm1Ki = [brm1Point, [-7.65, brm1Point[1]]];
      generateBoxPetak('8c2c67ac-756f-4de2-b3c2-f0b9e21cd6e5', 'Pts. Rm. 1-Ki', linePtsRm1Ki, 'top', 'golongan-a');

      const linePtsRm1Kn = [brm1Point, [-7.72, brm1Point[1]]];
      generateBoxPetak('1518f3d6-5f9e-4ae7-b734-8ece837bcdc1', 'Pts. Rm. 1-Kn', linePtsRm1Kn, 'bottom', 'golongan-a');

      const lineBrm1 = [
        bs3Point, 
        brm1Point
      ];
      generateBangunanSadap('BRm. 1', 'bottomright', lineBrm1, 90);

      const lineBoxPtsRm1Kn = [[-7.66, 108.80], [-7.66, 108.80]];
      generateBox("325 Ha","0.475 m3/s","260 m",lineBoxPtsRm1Kn,'top')

      const lineBoxPtsRm1Ki = [[-7.66, 108.95], [-7.66, 108.95]];
      generateBox("217 Ha","0.317 m3/s","487.50 m",lineBoxPtsRm1Ki,'top')

      // Set BS. III
      const lineBs3 = [
        [-7.325, 108.77],
        bs3Point
      ];
      generateBangunanPembagi('BS. III', lineBs3);

      generateTextSaluranSekunder('SS. REJA MULYA', [-7.57, 109.2], 0);

      const lineBoxBs3 = [[-7.795, 108.71], [-7.795, 108.71]];
      generateBox("8658 Ha","12.916 m3/s","2417.45 m",lineBoxBs3,'top')
    }

    var initBs4 = function () {
      const bs4Point = [-7.86, 108.77];

      const linePts4Ki = [bs4Point, [bs4Point[0], 108.81]];
      generateBoxPetak('0d219996-918d-4549-9a4a-0a6820e9e40d', 'Pts. IV Ki', linePts4Ki, 'right', 'golongan-a');

      const lineBs4 = [
        [-7.675, 108.77],
        bs4Point
      ];
      generateBangunanPembagiDanSadap('BS. IV', lineBs4);

      const lineBoxBs4 = [[-7.98, 108.71], [-7.98, 108.71]];
      generateBox("8562 Ha","12.773 m3/s","689.41 m",lineBoxBs4,'top')
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
      generateBoxPetak('19f7b89b-09ec-4538-a27d-f522792d6b54', 'Pt. Kd. 8-Ki', linePtKd8Ki, 'top', 'golongan-a');

      const linePtKd8Kn = [bkd8Point, [-8.1, bkd8Point[1]]];
      generateBoxPetak('bf22c9b5-1310-45f2-8c55-b1c729660edf', 'Pt. Kd. 8-Kn', linePtKd8Kn, 'bottom', 'golongan-a');

      const lineBkd8 = [
        bs5Point, 
        bkd8Point
      ];
      generateBangunanSadap('BKd. 8', 'bottomright', lineBkd8, 90);

      // Set BKd. 7
      const linePtKd7Kn = [bkd7Point, [-8.1, bkd7Point[1]]];
      generateBoxPetak('bb284931-2b5a-48ad-87e5-75a048c42c48', 'Pt. Kd. 7-Kn', linePtKd7Kn, 'bottom', 'golongan-a');

      const lineBkd7 = [
        bs5Point, 
        bkd7Point
      ];
      generateBangunanSadap('BKd. 7', 'bottomright', lineBkd7, 90);

      const lineBoxPtKd7Kn = [[-8.04, 109.99], [-8.04, 109.99]];
      generateBox("119 Ha","0.174 m3/s","501.56 m",lineBoxPtKd7Kn,'top')

      // Set BKd. 6
      const linePtKd6Ki = [bkd6Point, [-8, bkd6Point[1]]];
      generateBoxPetak('37ae32d1-80ca-4197-8ac5-69b13653f261', 'Pt. Kd. 6-Ki', linePtKd6Ki, 'top', 'golongan-a');

      const lineBkd6 = [
        bs5Point, 
        bkd6Point
      ];
      generateBangunanSadap('BKd. 6', 'bottomcenter', lineBkd6, 90);

      const lineBoxPtKd6Ki = [[-8.10, 109.82], [-8.10, 109.82]];
      generateBox("207 Ha","0.303 m3/s","957.60 m",lineBoxPtKd6Ki,'top')

      // Set BKd. 5
      const linePtKd5Ki = [bkd5Point, [-8, bkd5Point[1]]];
      generateBoxPetak('87d948a4-46d7-4c2f-92b1-eae58b8e8d24', 'Pt. Kd. 5-Ki', linePtKd5Ki, 'top', 'golongan-a');

      const lineBkd5 = [
        bs5Point, 
        bkd5Point
      ];
      generateBangunanSadap('BKd. 5', 'bottomcenter', lineBkd5, 90);

      const lineBoxPtKd5Ki = [[-8.10, 109.67], [-8.10, 109.67]];
      generateBox("248 Ha","0.363 m3/s","1253.10 m",lineBoxPtKd5Ki,'top')

      // Set BKd. 4
      const linePtKd4Ki = [bkd4Point, [-8, bkd4Point[1]]];
      generateBoxPetak('5b8b2241-d1df-42e1-9409-a444f42a329e', 'Pt. Kd. 4-Ki', linePtKd4Ki, 'top', 'golongan-a');

      const lineBkd4 = [
        bs5Point, 
        bkd4Point
      ];
      generateBangunanSadap('BKd. 4', 'bottomcenter', lineBkd4, 90);

      const lineBoxPtKd4Ki = [[-8.10, 109.49], [-8.10, 109.49]];
      generateBox("332 Ha","0.485 m3/s","1359 m",lineBoxPtKd4Ki,'top')

      // Set BKd. 3
      const linePtKd3Ki = [bkd3Point, [-8, bkd3Point[1]]];
      generateBoxPetak('c4690341-532f-43a6-9dd0-9a9d90e4f996', 'Pt. Kd. 3-Ki', linePtKd3Ki, 'top', 'golongan-a');

      const lineBkd3 = [
        bs5Point, 
        bkd3Point
      ];
      generateBangunanSadap('BKd. 3', 'bottomcenter', lineBkd3, 90);

      const lineBoxPtKd3Ki = [[-8.10, 109.29], [-8.10, 109.29]];
      generateBox("416 Ha","0.611 m3/s","1220.40 m",lineBoxPtKd3Ki,'top')

      // Set BKd. 2
      const linePtKd2Ki = [bkd2Point, [-8, bkd2Point[1]]];
      generateBoxPetak('d2ea57f2-ac28-4aea-9626-619e46804ea1', 'Pt. Kd. 2-Ki', linePtKd2Ki, 'top', 'golongan-a');

      const linePtKd2Kn = [bkd2Point, [-8.1, bkd2Point[1]]];
      generateBoxPetak('2a91cbf6-acd3-40f0-9c14-00856b14aba6', 'Pt. Kd. 2-Kn', linePtKd2Kn, 'bottom', 'golongan-a');

      const lineBkd2 = [
        bs5Point, 
        bkd2Point
      ];
      generateBangunanSadap('BKd. 2', 'topleft', lineBkd2, 90);

      const lineBoxPtKd2Ki = [[-8.04, 108.93], [-8.04, 108.93]];
      generateBox("626 Ha","0.915 m3/s","1291.20 m",lineBoxPtKd2Ki,'top')

      const lineBoxPtKd2Kn = [[-8.10, 109.13], [-8.10, 109.13]];
      generateBox("516 Ha","0.754 m3/s","1073.40 m",lineBoxPtKd2Kn,'top')

      // Set BKd. 1
      const linePtKd1Kn = [bkd1Point, [-8.1, bkd1Point[1]]];
      generateBoxPetak('c5dc7b64-2019-4c6d-97c8-ccc4a54a130b', 'Pt. Kd. 1-Kn', linePtKd1Kn, 'bottom', 'golongan-a');

      const lineBkd1 = [
        bs5Point, 
        bkd1Point
      ];
      generateBangunanSadap('BKd. 1', 'topcenter', lineBkd1, 90);

      const lineBoxPtKd1Kn = [[-8.04, 108.82], [-8.04, 108.82]];
      generateBox("684 Ha","1000 m3/s","227.10 m",lineBoxPtKd1Kn,'top')

      // Set BS. V
      const lineBs5 = [
        [-7.855, 108.77],
        bs5Point
      ];
      generateBangunanPembagi('BS. V', lineBs5);

      generateTextSaluranSekunder('SS. KEDUNG DADAP', [-7.9, 109.3], 0);

      const lineBoxBs5 = [[-8.15, 108.71], [-8.15, 108.71]];
      generateBox("7878 Ha","11.753 m3/s","1615.05 m",lineBoxBs5,'top')
    }

    var initBs6 = function () {
      const bs6Point = [-8.38, 108.72];
      const bck1Point = [bs6Point[0], 108.85];
      const bck2Point = [bs6Point[0], 109.08];
      const bck3Point = [bs6Point[0], 109.21];
      const bck4Point = [bs6Point[0], 109.4];
      const bck5Point = [bs6Point[0], 109.59];
      const bck6Point = [bs6Point[0], 109.78];
      const bck7Point = [bs6Point[0], 109.88];
      const bck8Point = [bs6Point[0], 110.12];
      const bck9Point = [bs6Point[0], 110.36];
      const bck10Point = [bs6Point[0], 110.66];

      const bld1Point = [bs6Point[0] - 0.215, 109.14];
      const bld2Point = [bld1Point[0] - 0.17, bld1Point[1] + 0.2];
      const bld3Point = [bld2Point[0] - 0.15, bld2Point[1] + 0.17];
      const btr1Point = bck7Point;
      const btr2Point = [bck7Point[0] - 0.2, bck7Point[1]];
      const btr3Point = [bck7Point[0] - 0.32, bck7Point[1]];
      const btr4Point = [bck7Point[0] - 0.46, bck7Point[1]];
      const btr5Point = [bck7Point[0] - 0.6, bck7Point[1]];
      const btr6Point = [bck7Point[0] - 0.74, bck7Point[1]];
      const bdt1Point = [bck9Point[0] - 0.2, bck9Point[1]];
      const bdt2Point = [bck9Point[0] - 0.32, bck9Point[1]];
      const bdt3Point = [bck9Point[0] - 0.42, bck9Point[1]];
      const bckki1Point = [bck10Point[0], bck10Point[1] + 0.14];
      const bckki2Point = [bck10Point[0], bck10Point[1] + 0.34];
      const bckkn1Point = [bck10Point[0] - 0.2, bck10Point[1]];
      const bckkn12Point = [bck10Point[0] - 0.32, bck10Point[1]];
      const bckkn13Point = [bck10Point[0] - 0.46, bck10Point[1]];
      const bckkn14Point = [bck10Point[0] - 0.56, bck10Point[1]];
      const bckkn15Point = [bck10Point[0] - 0.72, bck10Point[1]];
      const bckkn16Point = [bck10Point[0] - 0.84, bck10Point[1]];
      const bckkn17Point = [bck10Point[0] - 0.96, bck10Point[1]];
      const bckkr17Point = [bck10Point[0] - 0.96, bck10Point[1]];
      const bckkn18Point = [bck10Point[0] - 1.08, bck10Point[1]];

      // Set BCkKn. 18
      const linePtCk18Kn = [bckkn18Point, [bckkn18Point[0], bckkn18Point[1] - 0.06]];
      generateBoxPetak('abf3088b-38b8-47a7-957e-b8a8c176d9d7', 'Pt. CK. 18-Kn', linePtCk18Kn, 'left', 'golongan-b');

      const lineBckKn18 = [
        bck10Point, 
        bckkn18Point, 
      ];
      generateBangunanSadap('BCk. Kn18', 'centerright', lineBckKn18, 0);

      // Set BCkkrKn. 17
      const linePtCk17Kr = [bckkr17Point, [bckkr17Point[0], bckkr17Point[1] + 0.06]];
      generateBoxPetak('c8e17113-3795-4562-bf19-e9365ed22acc', 'Pt. CK. 17-Kr', linePtCk17Kr, 'right', 'golongan-b');

      const linePtCk17Kn = [bckkn17Point, [bckkn17Point[0], bckkn17Point[1] - 0.06]];
      generateBoxPetak('288c23b6-bf60-4319-9d61-298b65b26521', 'Pt. CK. 17-Kn', linePtCk17Kn, 'left', 'golongan-b');

      const lineBckKn17 = [
        bck10Point, 
        bckkn17Point, 
      ];
      generateBangunanSadap('BCk. Kn17', 'topright', lineBckKn17, 0);

      const lineBoxBckKn17 = [[-9.42, 110.59], [-9.42, 110.59]];
      generateBox("93 Ha","0.136 m3/s","529 m",lineBoxBckKn17,'top')

      // Set BCkKn. 16
      const linePtCk16Kn = [bckkn16Point, [bckkn16Point[0], bckkn16Point[1] - 0.06]];
      generateBoxPetak('7c88b4e5-99af-4703-b223-10f5032e65a1', 'Pt. CK. 16-Kn', linePtCk16Kn, 'left', 'golongan-b');

      const lineBckKn16 = [
        bck10Point, 
        bckkn16Point, 
      ];
      generateBangunanSadap('BCk. Kn16', 'centerright', lineBckKn16, 0);

      const lineBoxBckKn16 = [[-9.3, 110.59], [-9.3, 110.59]];
      generateBox("167 Ha","0.244 m3/s","389.50 m",lineBoxBckKn16,'top')

      // Set BCkKnkr. 15
      const linePtCk15Kn = [bckkn15Point, [bckkn15Point[0], bckkn15Point[1] - 0.06]];
      generateBoxPetak('64f09dad-3f32-4439-90fb-09f3e3c2cef3', 'Pt. CK. 15-Kn', linePtCk15Kn, 'left', 'golongan-b');

      const linePtCk15Kr = [bckkn15Point, [bckkn15Point[0], bckkn15Point[1] + 0.1]];
      generateBoxPetak('6738f990-c821-4f1b-9a1d-a8b7dbcbf00f', 'Pt. CK. 15-Kr', linePtCk15Kr, 'right', 'golongan-b');

      const lineBckKn15 = [
        bck10Point, 
        bckkn15Point, 
      ];
      generateBangunanSadap('BCk. Kn15', 'topright', lineBckKn15, 0);

      const lineBoxBckKn15 = [[-9.04, 110.59], [-9.04, 110.59]];
      generateBox("313 Ha","0.458 m3/s","351 m",lineBoxBckKn15,'top')

      const lineBoxBckKr15 = [[-9.18, 110.59], [-9.18, 110.59]];
      generateBox("245 Ha","0.358 m3/s","527 m",lineBoxBckKr15,'top')

      // Set BCkkrKn. 14
      const linePtCk14Kr = [bckkn14Point, [bckkn14Point[0], bckkn14Point[1] + 0.1]];
      generateBoxPetak('5fb2294d-1f39-4cd7-8a46-9272f5cb70cb', 'Pt. CK. 14-Kr', linePtCk14Kr, 'right', 'golongan-b');

      const lineBckKn14 = [
        bck10Point, 
        bckkn14Point, 
      ];
      generateBangunanSadap('BCk. Kn14', 'centerleft', lineBckKn14, 0);

      const lineBoxBckKn14 = [[-8.93, 110.59], [-8.93, 110.59]];
      generateBox("348 Ha","0.509 m3/s","1199 m",lineBoxBckKn14,'top')

      // Set BCkKn. 13
      const linePtCk13Kn = [bckkn13Point, [bckkn13Point[0], bckkn13Point[1] - 0.04]];
      generateBoxPetak('2720ee3e-519b-47cc-8559-3c50dd860f90', 'Pt. CK. 13-Kn', linePtCk13Kn, 'left', 'golongan-b');

      const lineBckKn13 = [
        bck10Point, 
        bckkn13Point, 
      ];
      generateBangunanSadap('BCk. Kn13', 'centerright', lineBckKn13, 0);

      const lineBoxBckKn13 = [[-8.78, 110.59], [-8.78, 110.59]];
      generateBox("391 Ha","0.572 m3/s","727 m",lineBoxBckKn13,'top')

      // Set BCkKn. 12
      const linePtCk12Kr = [bckkn12Point, [bckkn12Point[0], bckkn12Point[1] + 0.1]];
      generateBoxPetak('dddcf36e-809a-4ef0-b1af-1a463f8cb2ac', 'Pt. CK. 12-Kr', linePtCk12Kr, 'right', 'golongan-b');

      const lineBckKn12 = [
        bck10Point, 
        bckkn12Point, 
      ];
      generateBangunanSadap('BCk. Kn12', 'centerleft', lineBckKn12, 0);

      const lineBoxBckKn12 = [[-8.66, 110.59], [-8.66, 110.59]];
      generateBox("475 Ha","0.694 m3/s","1108.50 m",lineBoxBckKn12,'top')

      // Set BCkKr. 11
      const linePtCk11Kr = [bckkn1Point, [bckkn1Point[0], bckkn1Point[1] + 0.1]];
      generateBoxPetak('3d6328fe-45c3-4d59-ad14-90adf6c2cc6d', 'Pt. CK. 11-Kr', linePtCk11Kr, 'right', 'golongan-b');

      const lineBoxPtCk11Kr = [[-8.5, 110.59], [-8.5, 110.59]];
      generateBox("506 Ha","0.740 m3/s","1191.50 m",lineBoxPtCk11Kr,'top')

      // Set BCkKn. 1
      const lineBckKn1 = [
        bck10Point, 
        bckkn1Point, 
      ];
      generateBangunanSadap('BCk. Kn1', 'centerleft', lineBckKn1, 0);

      // Set BCkKi. 2
      const linePtCkKi2Kn = [bckki2Point, [bckki2Point[0] - 0.04, bckki2Point[1]]];
      generateBoxPetak('88aff689-aabc-4a7d-8f6b-d691cafa4b73', 'Pt. CK.Ki 2-Kn', linePtCkKi2Kn, 'bottom', 'golongan-b');

      const lineBckKi2 = [
        bck10Point, 
        bckki2Point, 
      ];
      generateBangunanSadap('BCkKi. 2', 'topcenter', lineBckKi2, 90);

      // Set BCkKi. 1
      const linePtCkKi1Kn = [bckki1Point, [bckki1Point[0] - 0.04, bckki1Point[1]]];
      generateBoxPetak('bfe0a3e4-a1ad-4241-a5cf-746098673441', 'Pt. CK.Ki 1-Kn', linePtCkKi1Kn, 'bottom', 'golongan-b');

      const lineBckKi1 = [
        bck10Point, 
        bckki1Point, 
      ];
      generateBangunanSadap('BCkKi. 1', 'topcenter', lineBckKi1, 90);

      const lineBoxBckKi1 = [[-8.37, 110.88], [-8.37, 110.88]];
      generateBox("32 Ha","0.047 m3/s","822.43 m",lineBoxBckKi1,'top')

      // Set BCk. 10
      const lineBck10 = [
        bs6Point, 
        bck10Point
      ];
      generateBangunanSadapDanPembagi('BCk. 10', 'topcenter', lineBck10, 90);

      const lineBoxBck10 = [[-8.37, 110.73], [-8.37, 110.73]];
      generateBox("113 Ha","0.165 m3/s","457.80 m",lineBoxBck10,'top')

      // Set BDt. 3
      const linePtDt3 = [bdt3Point, [bdt3Point[0] - 0.04, bdt3Point[1]]];
      generateBoxPetak('4822f056-c75e-4822-9120-b434b3d98bca', 'Pt. Dt. 3', linePtDt3, 'bottom', 'golongan-b');
      
      const lineBdt3 = [
        bck9Point, 
        bdt3Point, 
      ];
      generateBangunanSadap('BDt. 3', 'centerleft', lineBdt3, 0);

      // Set BDt. 2
      const linePtDt2Kn = [bdt2Point, [bdt2Point[0], bdt2Point[1] - 0.06]];
      generateBoxPetak('08ea3e28-fadc-46bb-85ca-0e361dd9bf38', 'Pt. Dt. 2-Kn', linePtDt2Kn, 'left', 'golongan-b');
      
      const lineBdt2 = [
        bck9Point, 
        bdt2Point, 
      ];
      generateBangunanSadap('BDt. 2', 'topleft', lineBdt2, 0);

      const lineBoxPtDt2Kn = [[-8.79, 110.3], [-8.79, 110.3]];
      generateBox("67 Ha","0.098 m3/s","621.63 m",lineBoxPtDt2Kn,'top')

      // Set BDt. 1
      const linePtDt1Kr = [bdt1Point, [bdt1Point[0], bdt1Point[1] + 0.06]];
      generateBoxPetak('f979e41e-c313-4f25-826e-d54ace194e74', 'Pt. Dt. 1-Kr', linePtDt1Kr, 'right', 'golongan-b');

      const linePtDt1Kn = [bdt1Point, [bdt1Point[0], bdt1Point[1] - 0.06]];
      generateBoxPetak('6ad63e56-5180-41c6-b81c-e1482e83c836', 'Pt. Dt. 1-Kn', linePtDt1Kn, 'left', 'golongan-b');
      
      const lineBdt1 = [
        bck9Point, 
        bdt1Point, 
      ];
      generateBangunanSadap('BDt. 1', 'topleft', lineBdt1, 0);

      const lineBoxPtDt1Kr = [[-8.47, 110.3], [-8.47, 110.3]];
      generateBox("182 Ha","0.266 m3/s","356.40 m",lineBoxPtDt1Kr,'top')

      const lineBoxPtDt1Kn = [[-8.66, 110.3], [-8.66, 110.3]];
      generateBox("111 Ha","0.162 m3/s","363.30 m",lineBoxPtDt1Kn,'top')

      // Set BCK. 9
      const lineBck9 = [
        bs6Point, 
        bck9Point
      ];
      generateBangunanSadapDanPembagi('BCk. 9', 'topcenter', lineBck9, 90);

      const lineBoxBck9 = [[-8.37, 110.5], [-8.37, 110.5]];
      generateBox("619 Ha","0.905 m3/s","665.50 m",lineBoxBck9,'top')

      // Set BCk. 8
      const linePtCk8Kn = [bck8Point, [-8.42, bck8Point[1]]];
      generateBoxPetak('0f715ffe-696b-4c85-8ef2-6017048ad341', 'Pt. Ck. 8-Kn', linePtCk8Kn, 'bottom', 'golongan-b');

      const lineBck8 = [
        bs6Point, 
        bck8Point
      ];
      generateBangunanSadap('BCk. 8', 'topcenter', lineBck8, 90);

      const lineBoxBck8 = [[-8.37, 110.25], [-8.37, 110.25]];
      generateBox("801 Ha","1.171 m3/s","1511.50 m",lineBoxBck8,'top')

      // Set BTr. 6
      const linePtTr6 = [btr6Point, [btr6Point[0] - 0.06, btr6Point[1]]];
      generateBoxPetak('f199f0d7-6f13-46bf-85f8-8d1f83d4fb65', 'Pt. Tr. 6 cik', linePtTr6, 'bottom', 'golongan-b');

      const linePtTr6Kr = [btr6Point, [btr6Point[0], btr6Point[1] + 0.06]];
      generateBoxPetak('564531c7-761f-479f-b94d-d9e85affee3a', 'Pt. Tr. 6-Kr', linePtTr6Kr, 'right', 'golongan-b');
      
      const lineBtr6 = [
        bck7Point, 
        btr6Point, 
      ];
      generateBangunanSadap('BTr. 6', 'topright', lineBtr6, 0);

      // Set BTr. 5
      const linePtTr5Kr = [btr5Point, [btr5Point[0], btr5Point[1] + 0.06]];
      generateBoxPetak('7595e215-b0bd-491b-9ce6-945cac35931c', 'Pt. Tr. 5-Kr', linePtTr5Kr, 'right', 'golongan-b');
      
      const lineBtr5 = [
        bck7Point, 
        btr5Point, 
      ];
      generateBangunanSadap('BTr. 5', 'topright', lineBtr5, 0);

      const lineBoxPtTr5Kr = [[-9.08, 109.94], [-9.08, 109.94]];
      generateBox("146 Ha","0.213 m3/s","1296.52 m",lineBoxPtTr5Kr,'top')

      // Set BTr. 4
      const linePtTr4Kr = [btr4Point, [btr4Point[0], btr4Point[1] + 0.06]];
      generateBoxPetak('5c41e1ea-9dfb-4727-ba3f-fc35b27226a1', 'Pt. Tr. 4-Kr', linePtTr4Kr, 'right', 'golongan-b');
      
      const lineBtr4 = [
        bck7Point, 
        btr4Point, 
      ];
      generateBangunanSadap('BTr. 4', 'topright', lineBtr4, 0);

      const lineBoxPtTr4Kr = [[-8.94, 109.94], [-8.94, 109.94]];
      generateBox("221 Ha","0.323 m3/s","515 m",lineBoxPtTr4Kr,'top')

      // Set BTr. 3
      const linePtTr3Kn = [btr3Point, [btr3Point[0], btr3Point[1] - 0.06]];
      generateBoxPetak('f96a51b0-6fcc-4ca4-af2e-2de41b41bd75', 'Pt. Tr. 3-Kn', linePtTr3Kn, 'left', 'golongan-b');
      
      const lineBtr3 = [
        bck7Point, 
        btr3Point, 
      ];
      generateBangunanSadap('BTr. 3', 'centerright', lineBtr3, 0);

      const lineBoxPtTr3Kn = [[-8.78, 109.94], [-8.78, 109.94]];
      generateBox("256 Ha","0.374 m3/s","539 m",lineBoxPtTr3Kn,'top')

      // Set BTr. 2
      const linePtTr2Kn = [btr2Point, [btr2Point[0], btr2Point[1] - 0.06]];
      generateBoxPetak('678b079a-46d7-4cdb-92b2-2df8d5a5a0e2', 'Pt. Tr. 2-Kn', linePtTr2Kn, 'left', 'golongan-b');
      
      const lineBtr2 = [
        bck7Point, 
        btr2Point, 
      ];
      generateBangunanSadap('BTr. 2', 'centerright', lineBtr2, 0);

      const lineBoxPtTr2Kn = [[-8.67, 109.94], [-8.67, 109.94]];
      generateBox("354 Ha","0.517 m3/s","591 m",lineBoxPtTr2Kn,'top')

      // Set BTr. 1
      const linePtTr1Kn = [btr1Point, [btr1Point[0] - 0.15, btr1Point[1] + 0.15]];
      generateBoxPetak('dec728c0-64f2-4516-bbd4-79c023c331f3', 'Pt. Tr. 1-Kn', linePtTr1Kn, 'bottom', 'golongan-b');
      
      const lineBtr1 = [
        btr1Point, 
        bck7Point, 
      ];
      generateBangunanSadapDanPembagi('BTr. 1', 'bottomright', lineBtr1, 90);

      const lineBoxPtTr1Kn = [[-8.45, 109.98], [-8.45, 109.98]];
      generateBox("476 Ha","0.696 m3/s","201.50 m",lineBoxPtTr1Kn,'top')

      const lineeBoxPtTr1Kn = [[-8.55, 109.94], [-8.55, 109.94]];
      generateBox("432 Ha","0.632 m3/s","348 m",lineeBoxPtTr1Kn,'top')

      // Set BCk. 7
      const lineBck7 = [
        bs6Point, 
        bck7Point
      ];
      generateBangunanSadapDanPembagi('BCk. 7', 'topcenter', lineBck7, 90);

      const lineBoxBck7 = [[-8.37, 109.98], [-8.37, 109.98]];
      generateBox("870 Ha","1.272 m3/s","766.50 m",lineBoxBck7,'top')

      // Set BCk. 6
      const linePtCk6Kn = [bck6Point, [-8.42, bck6Point[1]]];
      generateBoxPetak('60eb2f2f-512a-4715-a75a-fd81596062f0', 'Pt. Ck. 6-Kn', linePtCk6Kn, 'bottom', 'golongan-b');

      const lineBck6 = [
        bs6Point, 
        bck6Point
      ];
      generateBangunanSadap('BCk. 6', 'topcenter', lineBck6, 90);

      const lineBoxPtCk6Kn = [[-8.37, 109.83], [-8.37, 109.83]];
      generateBox("1365 Ha","1.996 m3/s","547 m",lineBoxPtCk6Kn,'top')

      // Set BCk. 5
      const linePtCk5Kn = [bck5Point, [-8.42, bck5Point[1]]];
      generateBoxPetak('cb1a52bb-e373-4e06-b8ef-3a8571ef1163', 'Pt. Ck. 5-Kn', linePtCk5Kn, 'bottom', 'golongan-b');

      const lineBck5 = [
        bs6Point, 
        bck5Point
      ];
      generateBangunanSadap('BCk. 5', 'topcenter', lineBck5, 90);

      const lineBoxPtCk5Kn = [[-8.37, 109.7], [-8.37, 109.7]];
      generateBox("1451 Ha","2.121 m3/s","863.50 m",lineBoxPtCk5Kn,'top')

      // Set BCk. 4
      const linePtCk4Kn = [bck4Point, [-8.45, bck4Point[1]]];
      generateBoxPetak('8257c58d-23e4-4e69-96a8-5e752edee4a8', 'Pt. Ck. 4-Kn', linePtCk4Kn, 'bottom', 'golongan-b');

      const lineBck4 = [
        bs6Point, 
        bck4Point
      ];
      generateBangunanSadap('BCk. 4', 'topcenter', lineBck4, 90);

      const lineBoxPtCk4Kn = [[-8.37, 109.5], [-8.37, 109.5]];
      generateBox("1501 Ha","2.194 m3/s","1110 m",lineBoxPtCk4Kn,'top')

      // Set BCk. 3
      const linePtCk3Kn = [bck3Point, [-8.42, bck3Point[1]]];
      generateBoxPetak('a32dd81f-4736-4393-94cb-ddd69f14ac4d', 'Pt. Ck. 3-Kn', linePtCk3Kn, 'bottom', 'golongan-b');

      const lineBck3 = [
        bs6Point, 
        bck3Point
      ];
      generateBangunanSadap('BCk. 3', 'topcenter', lineBck3, 90);

      const lineBoxPtCk3Kn = [[-8.37, 109.3], [-8.37, 109.3]];
      generateBox("1566 Ha","2.319 m3/s","747 m",lineBoxPtCk3Kn,'top')

      // Set BLd. 3
      const linePtLd3 = [bld3Point, [bld3Point[0] - 0.015, bld3Point[1] + 0.018]];
      generateBoxPetak('e4bc311d-72a5-4f05-b2c6-7a1924b0b971', 'Pt. Ld. 3', linePtLd3, 'bottom', 'golongan-b');
      
      const lineBld3 = [
        bld2Point, 
        bld3Point, 
      ];
      generateBangunanSadap('BLd. 3', 'topright', lineBld3, 330);

      // Set BLd. 2
      const linePtLd2Ki = [bld2Point, [bld2Point[0] + 0.02, bld2Point[1] + 0.06]];
      generateBoxPetak('91abd34b-19d6-4851-b59d-7cf73f363a21', 'Pt. Ld. 2-Ki', linePtLd2Ki, 'right', 'golongan-b');

      const linePtLd2Kn = [bld2Point, [bld2Point[0] - 0.01, bld2Point[1] - 0.1]];
      generateBoxPetak('7c91a5b8-d19e-4539-954d-5a909a76f276', 'Pt. Ld. 2-Kn', linePtLd2Kn, 'left', 'golongan-b');
      
      const lineBld2 = [
        bld1Point, 
        bld2Point, 
      ];
      generateBangunanSadap('BLd. 2', 'bottomleft', lineBld2, 330);

      const lineBoxtLd2Ki = [[-8.92, 109.4], [-8.92, 109.4]];
      generateBox("60 Ha","0.088 m3/s","644.81 m",lineBoxtLd2Ki,'top')

      // Set BLd. 1
      const linePtLd1Ki = [bld1Point, [bld1Point[0] + 0.01, bld1Point[1] + 0.08]];
      generateBoxPetak('96721e56-a46a-41af-8492-2141bbd5785b', 'Pt. Ld. 1-Ki', linePtLd1Ki, 'right', 'golongan-b');

      const linePtLd1Kn = [bld1Point, [bld1Point[0] - 0.01, bld1Point[1] - 0.1]];
      generateBoxPetak('8d4898ca-f935-4fa2-a579-e7128160dda4', 'Pt. Ld. 1-Kn', linePtLd1Kn, 'left', 'golongan-b');
      
      const lineBld1 = [
        bck2Point, 
        [bck2Point[0] - 0.16, bck2Point[1]], 
        bld1Point, 
      ];
      generateBangunanSadap('BLd. 1', 'bottomleft', lineBld1, 330);

      const lineBoxPtLd1Ki = [[-8.56, 109.15], [-8.56, 109.15]];
      generateBox("211 Ha","0.308 m3/s","634.20 m",lineBoxPtLd1Ki,'top')

      const lineBoxPtLd1Kn = [[-8.725, 109.15], [-8.725, 109.15]];
      generateBox("135 Ha","0.197 m3/s","927.20 m",lineBoxPtLd1Kn,'top')

      // Set BCk. 2
      const lineBck2 = [
        bs6Point, 
        bck2Point
      ];
      generateBangunanSadapDanPembagi('BCk. 2', 'topcenter', lineBck2, 90);

      const lineBoxBck2 = [[-8.37, 109.15], [-8.37, 109.15]];
      generateBox("1611 Ha","2.355 m3/s","340 m",lineBoxBck2,'top')

      // Set BCk. 1
      const linePtCk1Ki = [bck1Point, [-8.32, bck1Point[1]]];
      generateBoxPetak('c75657c4-1e68-4328-a18b-17a395d1e8e9', 'Pt. Ck. 1-Ki', linePtCk1Ki, 'top', 'golongan-b');

      const linePtCk1Kn = [bck1Point, [-8.42, bck1Point[1]]];
      generateBoxPetak('adcf560e-d7bc-48e1-8334-e85fb741faad', 'Pt. Ck. 1-Kn', linePtCk1Kn, 'bottom', 'golongan-b');

      const lineBck1 = [
        bs6Point, 
        bck1Point
      ];
      generateBangunanSadap('BCk. 1', 'topright', lineBck1, 90);

      const lineBoxPtCk1Ki = [[-8.37, 108.78], [-8.37, 108.78]];
      generateBox("1994 Ha","2.915 m3/s","277.50 m",lineBoxPtCk1Ki,'top')

      const lineBoxPtCk1Kn = [[-8.37, 108.98], [-8.37, 108.98]];
      generateBox("1822 Ha","2.664 m3/s","1288.50 m",lineBoxPtCk1Kn,'top')

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

      const lineBoxBs6 = [[-8.6, 108.78], [-8.6, 108.78]];
      generateBox("5884 Ha","8.778 m3/s","1159.05 m",lineBoxBs6,'top')
    }

    var initBs7 = function() {
      const bs7Point = [-8.75, 108.72];
      const linePtSm4 = [bs7Point, [bs7Point[0], 108.81]];
      generateBoxPetak('ece08111-0685-4435-8963-4860a4d0c356', 'Pt.Sm-4', linePtSm4, 'right', 'golongan-b');

      const lineBs7 = [
        [-8.38, 108.72],
        bs7Point
      ];
      generateBangunanPembagiDanSadap('BS.VII', lineBs7);

      const lineBoxBs7 = [[-8.86, 108.78], [-8.86, 108.78]];
      generateBox("5834 Ha","8.703 m3/s","924.75 m",lineBoxBs7,'top')
    }

    var initBs8 = function() {
      const bs8Point = [-9.00, 108.72];
      const bsd1Point = [bs8Point[0], 108.85];
      const bsd2Point = [bs8Point[0], 109.08];

      const lineBsd1Ki = [bsd1Point, [-8.94, bsd1Point[1]]];
      generateBoxPetak('0739446b-88d9-457e-a08c-03c11c926689', 'B.Sd 1-Ki', lineBsd1Ki, 'top', 'golongan-b');

      const lineBsd1Ka = [bsd1Point, [-9.05, bsd1Point[1]]];
      generateBoxPetak('200845cd-a500-4c12-9590-ba9c05e03b63', 'B.Sd 1-Ka', lineBsd1Ka, 'bottom', 'golongan-b');

      const lineBsd2 = [bsd1Point, [-9.00, 109.1]];
      generateBoxPetak('0b8e2745-fb8f-40a3-956b-fb7109707cd2', 'B.Sd 2', lineBsd2, 'right', 'golongan-b');

      const lineBsd1 = [
        bs8Point,
        bsd1Point
      ];
      generateBangunanSadap('BSd. 1', 'bottomright', lineBsd1, 90);

      const lineBsd2bagi = [
        bs8Point,
        bsd2Point
      ];
      generateBangunanSadap('BSd. 2', 'bottomright', lineBsd2bagi, 90);

      const lineBs8 = [
        [-8.75, 108.72],
        bs8Point
      ];
      generateBangunanPembagi('BS.VIII', lineBs8);
      generateTextSaluranSekunder('SS. SIDODADI', [-8.95, 109.1], 0);
      
      //Kotak line
      const lineBoxBsd1Ki = [[-8.99, 108.78], [-8.99, 108.78]];
      generateBox("190 Ha","0.278 m3/s","682.50 m",lineBoxBsd1Ki,'top')

      const lineBoxBsd1Ka = [[-9.06, 108.98], [-9.06, 108.98]];
      generateBox("74 Ha","0.108 m3/s","1584.60 m",lineBoxBsd1Ka,'top')

      const lineBoxBs8 = [[-9.2, 108.78], [-9.2, 108.78]];
      generateBox("5644 Ha","8.420 m3/s","1417.81 m",lineBoxBs8,'top')
    }

    var initBs9 = function() {
      const bs9Point = [-9.35, 108.72];
      const bsh1Point = [bs9Point[0], 108.85];
      const bsh2Point = [bs9Point[0], 109.08];

      const lineBsh1Ki = [bsh1Point, [-9.29, bsh1Point[1]]];
      generateBoxPetak('2035c600-85a6-4e95-9e7c-576b4060435e', 'B.Sh 1-Ki', lineBsh1Ki, 'top', 'golongan-b');

      const lineBsh1Ka = [bsh1Point, [-9.41, bsh1Point[1]]];
      generateBoxPetak('5716d697-3b8f-411e-a22b-b6e1822215e1', 'B.Sh 1-Ka', lineBsh1Ka, 'bottom', 'golongan-b');

      const lineBsh2 = [bsh1Point, [-9.35, 109.1]];
      generateBoxPetak('85866435-e4b6-4850-a895-4c9838e7d88d', 'B.Sh 2', lineBsh2, 'right', 'golongan-b');
    
      const lineBsh1 = [
        bs9Point,
        bsh1Point
      ];
      generateBangunanSadap('BSh. 1', 'bottomright', lineBsh1, 90);

      const lineBsh2bagi = [
        bs9Point,
        bsh2Point
      ];
      generateBangunanSadap('BSh. 2', 'bottomright', lineBsh2bagi, 90);

      const lineBs9 = [
        [-9.00, 108.72],
        bs9Point
      ];
      generateBangunanPembagiDanSadap('BS.IX', lineBs9);
      generateTextSaluranSekunder('SS. SIDAHURIP', [-9.3, 109.1], 0);
      
      //Kotak line
      const lineBoxBsh1Ki = [[-9.34, 108.78], [-9.34, 108.78]];
      generateBox("183 Ha","0.268 m3/s","266.19 m",lineBoxBsh1Ki,'top')

      const lineBoxBsh1Kn = [[-9.34, 108.98], [-9.34, 108.98]];
      generateBox("62 Ha","0.091 m3/s","1753.38 m",lineBoxBsh1Kn,'top')

      const lineBoxBs9 = [[-9.55, 108.78], [-9.55, 108.78]];
      generateBox("5461 Ha","8.147 m3/s","1298.62 m",lineBoxBs9,'top')
    }

    var initBs10 = function() {
      const bs10Point = [-9.7, 108.72];
      const bkdn1Point = [bs10Point[0], 108.83];
      const bkdn2Point = [bs10Point[0], 109.06];
      const bkdn3Point = [bs10Point[0], 109.28];
      const bkdn4Point = [bs10Point[0], 109.45];
      const bkdn5Point = [bs10Point[0], 109.55];
      const bkdn6Point = [bs10Point[0], 109.66];
      const bkdn7Point = [bs10Point[0], 109.88];
      const bkdn8Point = [bs10Point[0], 110.00];
      const bkdn9Point = [-10.00, bkdn8Point[1]];
      const bkdn10Point = [-10.10, bkdn8Point[1]];
      const bkdn11Point = [-10.3, bkdn8Point[1]];
      const bbp1Point = [-9.9, bkdn6Point[1]];
      const bbp2Point = [-10.1, bkdn6Point[1]];
      const bbp3Point = [-10.2, bkdn6Point[1]];
      const bbp4Point = [-10.3, bkdn6Point[1]];
      const bbp5Point = [-10.5, bkdn6Point[1]];
      const bbp6Point = [-10.6, bkdn6Point[1]];

      const lineBoxBs10i =  [bs10Point,[bs10Point[0]+0.1, bs10Point[1]-0.05]];
      generateBox("4266 Ha","6.364 m3/s","1999.93 m",lineBoxBs10i,"top");

      const lineBoxBx10s =  [bs10Point,[bs10Point[0], bs10Point[1]+0.05]];
      generateBox("1195 Ha","1.747 m3/s","348.50 m",lineBoxBx10s,"top");

      const lineBkdn1ki = [bkdn1Point, [-9.64, bkdn1Point[1]]];
      generateBoxPetak('add86818-623c-45db-9836-3ef692b61005', 'B.Kdn 1-ki', lineBkdn1ki, 'top', 'golongan-b');
      const lineBkdn1 = [
        bs10Point,
        bkdn1Point
      ];
      generateBangunanSadap('BKdn. 1', 'bottomright', lineBkdn1, 90);

       
      const lineBoxBkdn1 =  [bkdn1Point,[bkdn1Point[0], bkdn1Point[1]+0.1]];
      generateBox("1172 Ha","1.713 m3/s","926.50 m",lineBoxBkdn1,"top");

      const lineBkdn2ka = [bkdn2Point, [-9.76, bkdn2Point[1]]];
      generateBoxPetak('8726bc87-468f-4724-8396-1a68dd56df00', 'B.Kdn 2-ka', lineBkdn2ka, 'bottom', 'golongan-b');

      const lineBkdn2ki = [bkdn2Point, [-9.64, bkdn2Point[1]]];
      generateBoxPetak('5f4e5cd2-e4e3-45e1-8a94-287367e391b9', 'B.Kdn 2-ki', lineBkdn2ki, 'top', 'golongan-b');
      const lineBkdn2 = [
        bs10Point,
        bkdn2Point
      ];
      generateBangunanSadap('BKdn. 2', 'bottomright', lineBkdn2, 90);

      const lineBoxBkdn2 =  [bkdn2Point,[bkdn2Point[0], bkdn2Point[1]+0.1]];
      generateBox("1014 Ha","1.482 m3/s","446.50 m",lineBoxBkdn2,"top");

      const lineBkdn3ki = [bkdn3Point, [-9.64, bkdn3Point[1]]];
      generateBoxPetak('41655fc9-3e85-4d3f-95d9-38fb363d7e4f', 'B.Kdn 3-ki', lineBkdn3ki, 'top', 'golongan-b');

      const lineBkdn3 = [
        bs10Point,
        bkdn3Point
      ];
      generateBangunanSadap('BKdn. 3', 'bottomright', lineBkdn3, 90);

      const lineBoxBkdn3 =  [bkdn3Point,[bkdn3Point[0], bkdn3Point[1]+0.1]];
      generateBox("925 Ha","1352 m3/s","397 m",lineBoxBkdn3,"top");

      const lineBkdn4ka = [bkdn4Point, [-9.76, bkdn4Point[1]]];
      generateBoxPetak('71cfbcd0-0e6b-46ed-9175-011d0f96001a', 'B.Kdn 4-ka', lineBkdn4ka, 'bottom', 'golongan-b');
      const lineBkdn4 = [
        bs10Point,
        bkdn4Point
      ];
      generateBangunanSadap('BKdn. 4', 'topright', lineBkdn4, 90);

      const lineBoxBkdn4 =  [bkdn4Point,[bkdn4Point[0], bkdn4Point[1]+0.05]];
      generateBox("843 Ha","1.232 m3/s","593 m",lineBoxBkdn4,"top");

      const lineBkdn5ki = [bkdn5Point, [-9.64, bkdn5Point[1]]];
      generateBoxPetak('92ef18fa-6bd3-4d69-a2d9-b4f99b55bc45', 'B.Kdn 5-ki', lineBkdn5ki, 'top', 'golongan-b');
      const lineBkdn5 = [
        bs10Point,
        bkdn5Point
      ];
      generateBangunanSadap('BKdn. 5', 'bottomright', lineBkdn5, 90);

      const lineBoxBkdn5 =  [bkdn5Point,[bkdn5Point[0], bkdn5Point[1]+0.05]];
      generateBox("730 Ha","1.067 m3/s","1045.50 m",lineBoxBkdn5,"top");

      const lineBkdn6 = [
        bs10Point,
        bkdn6Point
      ];
      generateBangunanSadapDanPembagi('BKdn. 6', 'topcenter', lineBkdn6, 90);

      const lineBoxBkdn6 =  [bkdn6Point,[bkdn6Point[0], bkdn6Point[1]+0.1]];
      generateBox("419 Ha","0.613 m3/s","580.50 m",lineBoxBkdn6,"top");

      const lineBoxBkdn6s =  [bkdn6Point,[bkdn6Point[0]-0.05, bkdn6Point[1]+0.05]];
      generateBox("311 Ha","0.455 m3/s","192.50 m",lineBoxBkdn6s,"bottom");

      const lineBkdn7ka = [bkdn7Point, [-9.76, bkdn7Point[1]]];
      generateBoxPetak('6f91cc3d-2acb-4295-97b8-e57e107dc7b8', 'B.Kdn 7-ka', lineBkdn7ka, 'bottom', 'golongan-b');
      const lineBkdn7 = [
        bs10Point,
        bkdn7Point
      ];
      generateBangunanSadap('BKdn. 7', 'topcenter', lineBkdn7, 90);

      const lineBoxBkdn7 =  [bkdn7Point,[bkdn7Point[0], bkdn7Point[1]+0.08]];
      generateBox("362 Ha","0.529 m3/s","299.50 m",lineBoxBkdn7,"top");

      const lineBkdn8ki = [bkdn8Point, [-9.7, 110.05]];
      generateBoxPetak('7cede638-11ea-4b59-92b5-66e2770a7da6', 'B.Kdn 8-ki', lineBkdn8ki, 'right', 'golongan-b');
      const lineBkdn8 = [
        bs10Point,
        bkdn8Point
      ];
      generateBangunanSadap('BKdn. 8', 'topcenter', lineBkdn8, 90);

      const lineBoxBkdn8 =  [bkdn8Point,[bkdn8Point[0]-0.1, bkdn8Point[1]+0.05]];
      generateBox("327 Ha","0.478 m3/s","450 m",lineBoxBkdn8,"top");

      const lineBkdn9ki = [bkdn9Point, [bkdn9Point[0], 110.1]];
      generateBoxPetak('dd6d9111-79db-441f-aa4c-64062af9271e', 'B.Kdn 9-ki', lineBkdn9ki, 'right', 'golongan-b');
      const lineBkdn9ka = [bkdn9Point, [bkdn9Point[0], 109.95]];
      generateBoxPetak('af028ceb-1836-4911-a8b2-48a69449ad42', 'B.Kdn 9-ka', lineBkdn9ka, 'left', 'golongan-b');
      const lineBkdn9 = [
        bkdn8Point,
        bkdn9Point
      ];
      generateBangunanSadap('BKdn. 9', 'topleft', lineBkdn9, 0);

      const lineBoxBkdn9 =  [bkdn9Point,[bkdn9Point[0]-0.08, bkdn9Point[1]+0.05]];
      generateBox("222 Ha","30.325 m3/s","460 m",lineBoxBkdn9,"top");

      const lineBkdn10ki = [bkdn10Point, [bkdn10Point[0], 110.1]];
      generateBoxPetak('92515563-ab2f-48ac-b9f9-b00e169c4927', 'B.Kdn 10-ki', lineBkdn10ki, 'right', 'golongan-b');
      const lineBkdn10 = [
        bkdn8Point,
        bkdn10Point
      ];
      generateBangunanSadap('BKdn. 10', 'topleft', lineBkdn10, 0);

      const lineBoxBkdn10 =  [bkdn10Point,[bkdn10Point[0]-0.1, bkdn10Point[1]+0.05]];
      generateBox("126 Ha","0.184 m3/s","547.60 m",lineBoxBkdn10,"top");

      const lineBkdn11ki = [bkdn11Point, [-10.40, 110.05]];
      generateBoxPetak('1be187d8-d385-4bba-9b7e-50e1f3fbdddd', 'B.Kdn 11-ki', lineBkdn11ki, 'right', 'golongan-b');
      const lineBkdn11ka = [bkdn11Point, [-10.40, 109.95]];
      generateBoxPetak('7284d61a-95ab-4e2f-9f39-7fa6632f5c58', 'B.Kdn 11-ka', lineBkdn11ka, 'left', 'golongan-b');
      const lineBkdn11 = [
        bkdn8Point,
        bkdn11Point
      ];
      generateBangunanSadap('BKdn. 11', 'topleft', lineBkdn11, 0);

      const lineBbp1ki = [bbp1Point, [bbp1Point[0], 109.70]];
      generateBoxPetak('7dd68ad0-c78c-438a-9b63-fc5a00989f4d', 'B.Bp 1 ki', lineBbp1ki, 'right', 'golongan-b');
      const lineBbp1 = [
        bkdn6Point,
        bbp1Point
      ];
      generateBangunanSadap('BBp. 1', 'topleft', lineBbp1, 0);

      const lineBoxBbp1 =  [bbp1Point,[bbp1Point[0]-0.1, bbp1Point[1]+0.05]];
      generateBox("241 Ha","0.352 m3/s","786.50 m",lineBoxBbp1,"top");

      const lineBbp2ki = [bbp2Point, [bbp2Point[0], 109.70]];
      generateBoxPetak('57728550-c169-4254-a0ab-acd84b9f02e1', 'B.Bp 2 ki', lineBbp2ki, 'right', 'golongan-b');
      const lineBbp2 = [
        bkdn6Point,
        bbp2Point
      ];
      generateBangunanSadap('BBp. 2', 'topleft', lineBbp2, 0);

      const lineBoxBbp2 =  [bbp2Point,[bbp2Point[0]-0.08, bbp2Point[1]-0.05]];
      generateBox("209 Ha","0.306 m3/s","896.50 m",lineBoxBbp2,"top");

      const lineBbp3ki = [bbp3Point, [bbp3Point[0], 109.70]];
      generateBoxPetak('c95c6982-ca57-4aa2-9ae3-2fb986860567', 'B.Bp 3 ki', lineBbp3ki, 'right', 'golongan-b');
      const lineBbp3 = [
        bkdn6Point,
        bbp3Point
      ];
      generateBangunanSadap('BBp. 3', 'topleft', lineBbp3, 0);

      const lineBoxBbp3 =  [bbp3Point,[bbp3Point[0]-0.08, bbp3Point[1]-0.05]];
      generateBox("183 Ha","0.268 m3/s","539 m",lineBoxBbp3,"top");

      const lineBbp4ki = [bbp4Point, [bbp4Point[0], 109.70]];
      generateBoxPetak('68c76f77-5f0e-46b8-9df7-e57cbc83cde4', 'B.Bp 4 ki', lineBbp4ki, 'right', 'golongan-b');
      const lineBbp4 = [
        bkdn6Point,
        bbp4Point
      ];
      generateBangunanSadap('BBp. 4', 'topleft', lineBbp4, 0);

      const lineBoxBbp4 =  [bbp4Point,[bbp4Point[0]-0.08, bbp4Point[1]-0.05]];
      generateBox("91 Ha","0.133 m3/s","906 m",lineBoxBbp4,"top");

      const lineBbp5ki = [bbp5Point, [bbp5Point[0], 109.70]];
      generateBoxPetak('39b71541-c6c0-4401-a84e-5c59727d9c57', 'B.Bp 5 ki', lineBbp5ki, 'right', 'golongan-b');
      const lineBbp5 = [
        bkdn6Point,
        bbp5Point
      ];
      generateBangunanSadap('BBp. 5', 'topleft', lineBbp5, 0);

      const lineBoxBbp5 =  [bbp5Point,[bbp5Point[0]-0.08, bbp5Point[1]-0.05]];
      generateBox("55 Ha","0.080 m3/s","537.98 m",lineBoxBbp5,"top");

      const lineBbp6te = [bbp6Point, [-10.63, bbp6Point[1]]];
      generateBoxPetak('349d1cdd-b192-4757-9145-529930fdcda8', 'B.Bp 6', lineBbp6te, 'bottom', 'golongan-b');
      const lineBbp6 = [
        bkdn6Point,
        bbp6Point
      ];
      generateBangunanSadap('BBp. 6', 'topleft', lineBbp6, 0);

      const lineBs10 = [
        [-9.35, 108.72],
        bs10Point
      ];
      generateBangunanPembagi('BS.X', lineBs10);
      generateTextSaluranSekunder('SS. KEDUNG-DAON', [-9.55, 109.1], 0);
      generateTextSaluranSekunder('SS. BULU PAYUNG', [-10.00, 109.6], 90);
      generateTextSaluranSekunder('SS. KN. KEPLEK', [-10.00, 110.3], 90);
    }

    var initBs11 = function() {
      const bs11Point = [-10.85, 108.72];
      const bcw1Point = [bs11Point[0], 108.85];
      const bcw2Point = [bs11Point[0], 108.95];
      const bcw3Pointk = [bs11Point[0], 109.05];
      const bcw3Pointkk = [bs11Point[0], 109.1];
      const bcw3Point = [bs11Point[0], 109.2];
      const bcw4Point = [bs11Point[0], 109.35];
      const bcw5Point = [bs11Point[0], 109.5];
      const bcw6Pointk = [bs11Point[0], 109.65];
      const bcw6Point = [bs11Point[0], 109.7];
      const bcw7Point = [bs11Point[0], 109.82];
      const bcw8Pointk = [bs11Point[0], 109.85];
      const bcw8Point = [bs11Point[0], 109.95];
      const bcw9Pointk = [bs11Point[0], 110];
      const bcw9Point = [bs11Point[0], 110.05];
      const bcw10Pointk = [bs11Point[0], 110.17];
      const bcw10Pointkk = [bs11Point[0], 110.3];
      const bcw10Point = [bs11Point[0], 110.42];
      const bkm2Point = [-11.00, bcw10Point[1]];
      const bkk2Point = [-10.67, bcw7Point[1]];
      const bkg2Point = [-10.95, bcw8Point[1]];
      const bcw11Point = [bs11Point[0], 110.55];
      const bcw12Point = [bs11Point[0], 110.71];
      const bcw13Point = [bs11Point[0], 110.8];
      const bcw14Point = [bs11Point[0], 110.9];
      const bcw15Point = [bs11Point[0], 111.00];

      const lineBoxBs11 =  [bs11Point,[bs11Point[0], bs11Point[1]+0.05]];
      generateBox("975 Ha","1.425 m3/s","317 m",lineBoxBs11,"top");

      const lineBoxBs11s =  [bs11Point,[bs11Point[0]-0.1, bs11Point[1]+0.05]];
      generateBox("3291 Ha","4.811 m3/s","478 m",lineBoxBs11s,"top");

      const lineBcw1ki = [bcw1Point, [-10.7, bcw1Point[1]]];
      generateBoxPetak('dba1820e-c513-4003-9068-8e29e9f2fbda', 'B.Cw 1-ki', lineBcw1ki, 'top', 'golongan-b');
      const lineBcw1 = [
        bs11Point,
        bcw1Point
      ];
      generateBangunanSadap('BCw. 1', 'bottomleft', lineBcw1, 90);

      const lineBoxBcw1 =  [bcw1Point,[bcw1Point[0], bcw1Point[1]+0.05]];
      generateBox("1895 Ha","1.308 m3/s","752.50 m",lineBoxBcw1,"top");

      const lineBcw2ki = [bcw2Point, [-10.8, bcw2Point[1]]];
      generateBoxPetak('c17a56df-eaec-4fd8-b719-f9889419fb72', 'B.Cw 2-ki', lineBcw2ki, 'top', 'golongan-b');
      const lineBcw2 = [
        bs11Point,
        bcw2Point
      ];
      generateBangunanSadap('BCw. 2', 'bottomleft', lineBcw2, 90);

      const lineBcw3kka = [bcw3Pointk, [-10.9, bcw3Pointk[1]]];
      generateBoxPetak('', `B.Cw 3' ka`, lineBcw3kka, 'bottom', 'golongan-b');
      const lineBcw3k = [
        bs11Point,
        bcw3Pointk
      ];
      generateBangunanSadap(`BCw. 3'`, 'bottomleft', lineBcw3k, 90);

      const lineBcw3kki = [bcw3Pointkk, [-10.72, bcw3Pointkk[1]]];
      generateBoxPetak('', `B.Cw 3' ki`, lineBcw3kki, 'top', 'golongan-b');
      const lineBcw3kk = [
        bs11Point,
        bcw3Pointkk
      ];
      generateBangunanSadap(`BCw. 3"`, 'bottomleft', lineBcw3kk, 90);

      const lineBoxBcw3kk =  [bcw3Pointkk,[bcw3Pointkk[0], bcw3Pointkk[1]+0.05]];
      generateBox("826 Ha","1.208 m3/s","861 m",lineBoxBcw3kk,"top");
      
      const lineBcw3ka = [bcw3Point, [-10.9, bcw3Point[1]]];
      generateBoxPetak('6d2a8c41-4fb9-428d-9723-ca3e5b281ac3', 'B.Cw 3-ka', lineBcw3ka, 'bottom', 'golongan-b');
      const lineBcw3 = [
        bs11Point,
        bcw3Point
      ];
      generateBangunanSadap('BCw. 3', 'topleft', lineBcw3, 90);

      const lineBoxBcw3 =  [bcw3Point,[bcw3Point[0], bcw3Point[1]+0.05]];
      generateBox("759 Ha","1.110 m3/s","933.50 m",lineBoxBcw3,"top");

      const lineBcw4ka = [bcw4Point, [-10.98, bcw4Point[1]]];
      generateBoxPetak('a4cea82a-cb5e-4ee9-9f0f-0124d93b1fc8', 'B.Cw 4-ka', lineBcw4ka, 'bottom', 'golongan-b');
      const lineBcw4 = [
        bs11Point,
        bcw4Point
      ];
      generateBangunanSadap('BCw. 4', 'topleft', lineBcw4, 90);

      const lineBoxBcw4 =  [bcw4Point,[bcw4Point[0], bcw4Point[1]+0.05]];
      generateBox("713 Ha","1.042 m3/s","591.50 m",lineBoxBcw4,"top");
      
      const lineBcw5ka = [bcw5Point, [-10.9, bcw5Point[1]]];
      generateBoxPetak('f8372f33-de1a-4e93-8a1c-0e312728b3f8', 'B.Cw 5-ka', lineBcw5ka, 'bottom', 'golongan-b');
      const lineBcw5 = [
        bs11Point,
        bcw5Point
      ];
      generateBangunanSadap('BCw. 5', 'topleft', lineBcw5, 90);

      const lineBoxBcw5 =  [bcw5Point,[bcw5Point[0], bcw5Point[1]+0.05]];
      generateBox("670 Ha","0.980 m3/s","936 m",lineBoxBcw5,"top");

      const lineBcw6kki = [bcw6Pointk, [-10.8, 109.6]];
      generateBoxPetak('', `B.Cw 6' ki`, lineBcw6kki, 'top', 'golongan-b');
      const lineBcw6k = [
        bs11Point,
        bcw6Pointk
      ];
      generateBangunanSadap(`BCw. 6'`, 'bottomleft', lineBcw6k, 90);

      const lineBoxBcw6 =  [bcw6Pointk,[bcw6Pointk[0], bcw6Pointk[1]+0.1]];
      generateBox("568 Ha","0.8330 m3/s","136,59 m",lineBoxBcw6,"top");

      const lineBcw6ka = [bcw6Point, [-10.9, bcw6Point[1]]];
      generateBoxPetak('f50d98fd-e816-4856-b0c6-3e2de50c0f9d', 'B.Cw 6-ka', lineBcw6ka, 'bottom', 'golongan-b');
      const lineBcw6 = [
        bs11Point,
        bcw6Point
      ];
      generateBangunanSadap('BCw. 6', 'topleft', lineBcw6, 90);

      const lineBkk2ka = [bkk2Point, [-10.62, bkk2Point[1]]];
      generateBoxPetak('b52da949-2723-45a8-9e5e-4ae94f05d47d', 'B.Kk 2-ka', lineBkk2ka, 'top', 'golongan-b');
      const lineBcw7 = [
        bs11Point,
        bcw7Point
      ];
      generateBangunanSadapDanPembagi('BCw. 7', 'bottomcenter', lineBcw7, 90);

      const lineBoxBcw7s =  [bcw7Point,[bcw7Point[0]+0.05, bcw7Point[1]-0.05]];
      generateBox("88 Ha","0.129 m3/s","255.50 m",lineBoxBcw7s,"top");

      const lineBkk2 = [
        bcw7Point,
        bkk2Point
      ];
      generateBangunanSadap('BKk. 2', 'topright', lineBkk2, 0);

      const lineBoxBkk2 =  [bkk2Point,[bkk2Point[0]-0.05, bkk2Point[1]-0.05]];
      generateBox("47 Ha","0.069 m3/s","557.25 m",lineBoxBkk2,"top");

      
      const lineBkk1ka = [bcw8Pointk, [-10.7, 109.93]];
      generateBoxPetak('43fd6e1f-755e-4959-91fc-3acb471a32cd', 'B.Kk 1-ka', lineBkk1ka, 'top', 'golongan-b');
      const lineBcw8k = [
        bs11Point,
        bcw8Pointk
      ];
      generateBangunanSadap(`BCw. 8'`, 'bottomright', lineBcw8k, 90);
      
      const lineBkg2ka = [bkg2Point, [-11.1, 109.85]];
      generateBoxPetak('0c684c28-3cc9-44b1-a236-5b05cd8f2125', 'B.Kg 2-ka', lineBkg2ka, 'left', 'golongan-b');
      const lineBkg2ki = [bkg2Point, [-11.1, 110.05]];
      generateBoxPetak('', 'B.Kg 2-ki', lineBkg2ki, 'right', 'golongan-b');
      const lineBkg2 = [
        bcw8Point,
        bkg2Point
      ];
      generateBangunanSadap(`BKg. 2`, 'topleft', lineBkg2, 90);

      const lineBcw8 = [
        bs11Point,
        bcw8Point
      ];
      generateBangunanSadapDanPembagi('BCw. 8', 'bottomcenter', lineBcw8, 90);

      const lineBoxBcw8 =  [bcw8Point,[bcw8Point[0]+0.02, bcw8Point[1]]];
      generateBox("360 Ha","0.526 m3/s","545.50 m",lineBoxBcw8,"top");

      const lineBcw9ki = [bcw9Point, [-10.8, bcw9Point[1]]];
      generateBoxPetak('0e69e52b-bde0-45b5-9a37-cd5538ecf27a', 'B.Cw 9-ki', lineBcw9ki, 'top', 'golongan-b');
      const lineBcw9 = [
        bs11Point,
        bcw9Point
      ];
      generateBangunanSadap(`BCw. 9`, 'topright', lineBcw9, 0);

      const lineBkg1ka = [bcw9Pointk, [-10.98, 110.1]];
      generateBoxPetak('3f273bff-3786-4c50-854e-cedf7d888576', 'B.Cw 9-ka', lineBkg1ka, 'bottom', 'golongan-b');
      const lineBcw9k = [
        bs11Point,
        bcw9Pointk
      ];
      generateBangunanSadap(`BCw. 9'`, 'bottomleft', lineBcw9k, 0);
      
      const lineBcw10kki = [bcw10Pointk, [-10.7, bcw10Pointk[1]]];
      generateBoxPetak('', `B.Cw 10'-ki`, lineBcw10kki, 'top', 'golongan-b');
      const lineBcw10kka = [bcw10Pointk, [-10.9, bcw10Pointk[1]]];
      generateBoxPetak('', `B.Cw 10'-ka`, lineBcw10kka, 'bottom', 'golongan-b');
      const lineBcw10k = [
        bs11Point,
        bcw10Pointk
      ];
      generateBangunanSadap(`BCw. 10'`, 'topright', lineBcw10k, 90);

      const lineBoxBcw10k =  [bcw10Pointk,[bcw10Pointk[0], bcw10Pointk[1]+0.05]];
      generateBox("297 Ha","0.434 m3/s","440 m",lineBoxBcw10k,"top");

      const lineBkm1ka = [bcw10Pointkk, [-10.9, bcw10Pointkk[1]]];
      generateBoxPetak('b8ce4ec4-6f77-43db-ab1b-eba34a44adec', `B.Km 1-ka`, lineBkm1ka, 'bottom', 'golongan-b');
      const lineBcw10kk = [
        bs11Point,
        bcw10Pointkk
      ];
      generateBangunanSadap(`BCw. 10"`, 'topright', lineBcw10kk, 90);

      const lineBcw10 = [
        bs11Point,
        bcw10Point
      ];
      generateBangunanSadapDanPembagi('BCw. 10', 'topcenter', lineBcw10, 90);

      const lineBoxBcw10 =  [bcw10Point,[bcw10Point[0], bcw10Point[1]+0.05]];
      generateBox("198 Ha","0.289 m3/s","249 m",lineBoxBcw10,"top");

      const lineBoxBcw10s =  [bcw10Point,[bcw10Point[0]-0.05, bcw10Point[1]+0.05]];
      generateBox("99 Ha","0.145 m3/s","164.40 m",lineBoxBcw10s,"top");

      const lineBkm2ka = [bkm2Point, [-11.07, 110.38]];
      generateBoxPetak('0e508f33-d1a8-4828-974f-4e9a22f2060a', `B.Km 2-ka`, lineBkm2ka, 'left', 'golongan-b');
      const lineBkm2ki = [bkm2Point, [-11.07, 110.46]];
      generateBoxPetak('', `B.Km 2-ki`, lineBkm2ki, 'right', 'golongan-b');

      const lineBoxBkm2ki = [bkm2Point,[bkm2Point[0], bkm2Point[1]+0.1]];
      generateBox("40 Ha","0.058 m3/s","137.55 m",lineBoxBkm2ki,"top");

      const lineBkm2 = [
        bcw10Point,
        bkm2Point
      ];
      generateBangunanSadap(`BKm. 2`, 'topleft', lineBkm2, 0);

      const lineBcw11ka = [bcw11Point, [-10.9, bcw11Point[1]]];
      generateBoxPetak('48e0db01-2e55-40ac-aeb8-9b122064b29f', `B.Cw 11-ka`, lineBcw11ka, 'bottom', 'golongan-b');
      const lineBcw11ki = [bcw11Point, [-10.8, bcw11Point[1]]];
      generateBoxPetak('290ece2b-8d45-4591-9e0b-cec93100b303', `B.Cw 11-ki`, lineBcw11ki, 'top', 'golongan-b');
      const lineBcw11 = [
        bs11Point,
        bcw11Point
      ];
      generateBangunanSadap(`BCw. 11`, 'topleft', lineBcw11, 90);

      const lineBoxBcw11 =  [bcw11Point,[bcw11Point[0], bcw11Point[1]+0.08]];
      generateBox("87 Ha","0.127 m3/s","200.64 m",lineBoxBcw11,"top");

      const lineBcw12ki = [bcw12Point, [-10.8, bcw12Point[1]]];
      generateBoxPetak('4fd60d4f-a224-42e2-b709-4df6a5d914c1', `B.Cw 12-ki`, lineBcw12ki, 'top', 'golongan-b');
      const lineBcw12 = [
        bs11Point,
        bcw12Point
      ];
      generateBangunanSadap(`BCw. 12`, 'bottomleft', lineBcw12, 90);

      const lineBcw13ka = [bcw13Point, [-10.9, bcw13Point[1]]];
      generateBoxPetak('', `B.Cw 13-ka`, lineBcw13ka, 'bottom', 'golongan-b');
      const lineBcw13 = [
        bs11Point,
        bcw13Point
      ];
      generateBangunanSadap(`BCw. 13`, 'topleft', lineBcw13, 90);

      const lineBcw14ki = [bcw14Point, [-10.8, bcw14Point[1]]];
      generateBoxPetak('', `B.Cw 14-ki`, lineBcw14ki, 'top', 'golongan-b');
      const lineBcw14 = [
        bs11Point,
        bcw14Point
      ];
      generateBangunanSadap(`BCw. 14`, 'bottomleft', lineBcw14, 90);

      const lineBcw15ki = [bcw15Point, [-10.8, bcw15Point[1]]];
      generateBoxPetak('', `B.Cw 15-ki`, lineBcw15ki, 'top', 'golongan-b');
      const lineBcw15 = [
        bs11Point,
        bcw15Point
      ];
      generateBangunanSadap(`BCw. 15`, 'bottomleft', lineBcw15, 90);

      const lineBs11 = [
        [-9.7, 108.72],
        bs11Point
      ];
      generateBangunanPembagi('BS.XI', lineBs11);
      generateTextSaluranSekunder('SS. CINYAWANG', [-10.7, 109.3], 0);
      generateTextSaluranSekunder('SS. KN. GUNDU', [-10.95, 110.03], 0);
      generateTextSaluranSekunder('SS. KN. MAPAG', [-11.03, 110.6], 0);
    }

    var initBn1 = function() {
      const bn1Point = [-11, 108.72];
      
      const lineBn1ki = [bn1Point, [bn1Point[0], 108.77]];
      generateBoxPetak('b7ee49fa-22e8-46f8-9195-92d112caa655', `B.N 1-ki`, lineBn1ki, 'right', 'golongan-c');
      const lineBn1 = [
        [-10.85, 108.72],
        bn1Point
      ];
      generateBangunanPembagiDanSadap('BN.1', lineBn1);
      generateTextSaluranSekunder('SS. PATIMUAN', [-11.02, 109], 0);

      const lineBoxBn1 = [bn1Point,[bn1Point[0]-0.07, bn1Point[1]+0.05]];
      generateBox("3246 Ha","4.746/s","1932.34 m",lineBoxBn1,"top");

    }

    var initBn2 = function() {
      const bn2Point = [-11.3, 108.72];
      const bpn1Point = [bn2Point[0], 108.85];
      const bpn2Point = [bn2Point[0], 109.03];
      const bpn3Point = [bn2Point[0], 109.2];
      const bpn4Point = [bn2Point[0], 109.3];
      const bpn5Point = [bn2Point[0], 109.4];
      const bpn6Point = [bn2Point[0], 109.7];
      const bpn6Pointk = [bn2Point[0], 109.75];
      const bpn7Point = [bn2Point[0], 109.9];
      const bpn72Point = [-11.52, bpn6Point[1]];
      const bpn8Point = [bn2Point[0], 110.1];
      const bpn82Point = [-11.72, bpn6Point[1]];
      const bpn9Point = [bn2Point[0], 110.3];
      const bpn92Point = [-11.85, bpn6Point[1]];
      const bpn10Point = [bn2Point[0], 110.45];

      const lineBoxBn2s = [bn2Point,[bn2Point[0], bn2Point[1]+0.05]];
      generateBox("1591 Ha","2.245 m3/s","554,40 m",lineBoxBn2s,"top");
      
      const lineBoxBn2 = [bn2Point,[bn2Point[0]-0.07, bn2Point[1]+0.05]];
      generateBox("1655 Ha","2.420 m3/s","2251.53 m",lineBoxBn2,"top");

      const lineBpn1ki = [bpn1Point, [-11.25, bpn1Point[1]]];
      generateBoxPetak('0f8ab630-5c90-449e-adb0-a818963128eb', `B.Pn 1-ki`, lineBpn1ki, 'top', 'golongan-c');
      const lineBpn1ka = [bpn1Point, [-11.35, bpn1Point[1]]];
      generateBoxPetak('6fef4c96-87d7-4b77-bf49-99890b2c181b', `B.Pn 1-ka`, lineBpn1ka, 'bottom', 'golongan-c');
      const lineBpn1 = [
        bn2Point,
        bpn1Point
      ];
      generateBangunanSadap(`BPn. 1`, 'bottomleft', lineBpn1, 90);
      
      const lineBoxBpn1 = [bpn1Point,[bpn1Point[0], bpn1Point[1]+0.07]];
      generateBox("1464 Ha","2.066 m3/s","700,50 m",lineBoxBpn1,"top");

      const lineBpn2ki = [bpn2Point, [-11.25, bpn2Point[1]]];
      generateBoxPetak('1b52b80f-c5e2-4a50-a78d-6317c0b8c184', `B.Pn 2-ki`, lineBpn2ki, 'top', 'golongan-c');
      const lineBpn2ka = [bpn2Point, [-11.35, bpn2Point[1]]];
      generateBoxPetak('441de1df-e8eb-4b16-b274-326859852f85', `B.Pn 2-ka`, lineBpn2ka, 'bottom', 'golongan-c');
      const lineBpn2 = [
        bn2Point,
        bpn2Point
      ];
      generateBangunanSadap(`BPn. 2`, 'bottomleft', lineBpn2, 90);

      const lineBoxBpn2 = [bpn2Point,[bpn2Point[0], bpn2Point[1]+0.07]];
      generateBox("1384 Ha","1.953 m3/s","632,10 m",lineBoxBpn2,"top");

      const lineBpn3ki = [bpn3Point, [-11.25, bpn3Point[1]]];
      generateBoxPetak('66c1d9b1-ff11-4188-9f81-af5f71be722c', `B.Pn 3-ki`, lineBpn3ki, 'top', 'golongan-c');
      const lineBpn3 = [
        bn2Point,
        bpn3Point
      ];
      generateBangunanSadap(`BPn. 3`, 'bottomleft', lineBpn3, 90);

      const lineBoxBpn3 = [bpn3Point,[bpn3Point[0], bpn3Point[1]+0.05]];
      generateBox("1318 Ha","1.860 m3/s","817,40 m",lineBoxBpn3,"top");

      const lineBpn4ka = [bpn4Point, [-11.35, bpn4Point[1]]];
      generateBoxPetak('658ac7cd-a2bb-4b86-9402-b2ca01f91de8', `B.Pn 4-ka`, lineBpn4ka, 'bottom', 'golongan-c');
      const lineBpn4 = [
        bn2Point,
        bpn4Point
      ];
      generateBangunanSadap(`BPn. 4`, 'bottomleft', lineBpn4, 90);

      const lineBoxBpn4 = [bpn4Point,[bpn4Point[0], bpn4Point[1]+0.05]];
      generateBox("1236 Ha","1.744 m3/s","813,60 m",lineBoxBpn4,"top");

      const lineBpn5ki = [bpn5Point, [-11.25, 109.45]];
      generateBoxPetak('fc3cc3b9-8ac8-4e7a-91fb-79f9fac68dd5', `B.Pn 5-ki`, lineBpn5ki, 'top', 'golongan-c');
      const lineBpn5ka = [bpn5Point, [-11.35, 109.46]];
      generateBoxPetak('2d95bf4d-473c-4c65-9e8d-54a7f07086d1', `B.Pn 5-ka`, lineBpn5ka, 'bottom', 'golongan-c');
      const lineBpn5 = [
        bn2Point,
        bpn5Point
      ];
      generateBangunanSadap(`BPn. 5`, 'bottomleft', lineBpn5, 90);

      const lineBoxBpn5 = [bpn5Point,[bpn5Point[0], bpn5Point[1]+0.1]];
      generateBox("1130 Ha","1.594 m3/s","1445,70 m",lineBoxBpn5,"top");

      const lineBpn6 = [
        bn2Point,
        bpn6Point
      ];
      generateBangunanSadapDanPembagi('BPn. 6', 'topcenter', lineBpn6, 0);

      const lineBoxBpn6 = [bpn6Point,[bpn6Point[0]+0.03, bpn6Point[1]+0.05]];
      generateBox("641.70 Ha","0.906 m3/s","191,2 m",lineBoxBpn6,"top");

      const lineBoxBpn6s = [bpn6Point,[bpn6Point[0]-0.1, bpn6Point[1]-0.05]];
      generateBox("488.30 Ha","0.689 m3/s","191,20 m",lineBoxBpn6s,"top");

      const lineBpn6ki = [bpn6Pointk, [-11.25, 109.8]];
      generateBoxPetak('1c627828-1015-4423-b770-fb87c423080f', `B.Pn I 6-ki`, lineBpn6ki, 'top', 'golongan-c');
      const lineBpn6ka = [bpn6Pointk, [-11.35, 109.8]];
      generateBoxPetak('3bcf8654-34a2-4fad-a2fa-e4b85516cc1d', `B.Pn I 6-ka`, lineBpn6ka, 'bottom', 'golongan-c');
      const lineBpn6k = [
        bn2Point,
        bpn6Pointk
      ];
      generateBangunanSadap(``, 'bottomleft', lineBpn6k, 90);

      const lineBpn71ki = [bpn7Point, [-11.25, 109.97]];
      generateBoxPetak('df66bfeb-b99d-4b1a-8436-ea4128092de8', `B.Pn I 7-ki`, lineBpn71ki, 'top', 'golongan-c');
      const lineBpn71ka = [bpn7Point, [-11.35, 109.97]];
      generateBoxPetak('cd1a1c25-6a95-4795-8fc8-76b08afcfedb', `B.Pn I 7-ka`, lineBpn71ka, 'bottom', 'golongan-c');
      const lineBpn7 = [
        bn2Point,
        bpn7Point
      ];
      generateBangunanSadap(`BPn I. 7`, 'bottomleft', lineBpn7, 0);

      const lineBoxBpn7 = [bpn7Point,[bpn7Point[0], bpn7Point[1]-0.05]];
      generateBox("525 Ha","0.741 m3/s","584,10 m",lineBoxBpn7,"top");
      
      const lineBoxBpn7i = [bpn7Point,[bpn7Point[0], bpn7Point[1]+0.07]];
      generateBox("428 Ha","0.604 m3/s"," 866,40 m",lineBoxBpn7i,"top");

      const lineBpn8ki = [bpn8Point, [-11.27, 110.15]];
      generateBoxPetak('8c2c621e-e3a2-418d-ae0d-beed5454cebd', `B.Pn I 8-ki`, lineBpn8ki, 'top', 'golongan-c');
      const lineBpn8ka = [bpn8Point, [-11.33, 110.15]];
      generateBoxPetak('d3026eea-1ee5-4a70-a28d-cc20b3cdffeb', `B.Pn I 8-ka`, lineBpn8ka, 'bottom', 'golongan-c');
      const lineBpn8 = [
        bn2Point,
        bpn8Point
      ];
      generateBangunanSadap(`BPn I. 8`, 'bottomleft', lineBpn8, 90);

      const lineBoxBpn8 = [bpn8Point,[bpn8Point[0], bpn8Point[1]+0.15]];
      generateBox("249.47 Ha","0.317 m3/s"," m",lineBoxBpn8,"top");

      const lneBoxBpn8i = [bpn8Point,[bpn8Point[0]+0.07, bpn8Point[1]+0.15]];
      generateBox("243.47 Ha","0.309 m3/s"," m",lneBoxBpn8i,"top");

      const lineBpn9ki = [bpn9Point, [-11.24, 110.35]];
      generateBoxPetak('1a3c679c-3fd2-4c25-b785-de0e2d5fc203', `B.Pn I 9-ki`, lineBpn9ki, 'top', 'golongan-c');
      const lineBpn9ka = [bpn9Point, [-11.36, 110.35]];
      generateBoxPetak('ddd3d9e6-274f-4122-905b-c1ac07ca08e7', `B.Pn I 9-ka`, lineBpn9ka, 'bottom', 'golongan-c');
      const lineBpn9 = [
        bn2Point,
        bpn9Point
      ];
      generateBangunanSadap(`BPn I. 9`, 'bottomleft', lineBpn9, 90);

      const lineBoxBpn9 = [bpn9Point,[bpn9Point[0], bpn9Point[1]+0.1]];
      generateBox("103.47 Ha","0.146 m3/s"," m",lineBoxBpn9,"top");

      const lineBpn10ki = [bpn10Point, [-11.28, 110.53]];
      generateBoxPetak('62fd18aa-4547-4d40-8159-f1df59d5ad9b', `B.Pn I 10-ki`, lineBpn10ki, 'top', 'golongan-c');
      const lineBpn10ka = [bpn10Point, [-11.32, 110.53]];
      generateBoxPetak('6991726c-55cd-4757-8c5e-0741862548bf', `B.Pn I 10-ka`, lineBpn10ka, 'bottom', 'golongan-c');
      const lineBpn10 = [
        bn2Point,
        bpn10Point
      ];
      generateBangunanSadap(`BPn I. 10`, 'bottomleft', lineBpn10, 90);

      const lineBpn72ki = [bpn72Point, [bpn72Point[0], 109.75]];
      generateBoxPetak('3162c7e1-45fc-4e41-a376-95f7f36823c8', `B.Pn II 7-ki`, lineBpn72ki, 'right', 'golongan-c');
      const lineBpn72ka = [bpn72Point, [bpn72Point[0], 109.65]];
      generateBoxPetak('482582b0-fd1a-4b82-b39c-bcb17d1fbf13', `B.Pn II 7-ka`, lineBpn72ka, 'left', 'golongan-c');
      const lineBpn72 = [
        bpn6Point,
        bpn72Point
      ];
      generateBangunanSadap(`BPn II. 7`, 'topright', lineBpn72, 0);

      const lineBoxBpnii7 = [bpn72Point,[bpn72Point[0]-0.1, bpn72Point[1]+0.05]];
      generateBox("411.63 Ha","0.581 m3/s","1031,40 m",lineBoxBpnii7,"top");

      const lineBpn82ki = [bpn82Point, [bpn82Point[0], 109.75]];
      generateBoxPetak('d13695e6-77de-4f9a-93f9-4c2e0c4be917', `B.Pn II 8-ki`, lineBpn82ki, 'right', 'golongan-c');
      const lineBpn82ka = [bpn82Point, [bpn82Point[0], 109.65]];
      generateBoxPetak('1aa2453a-1d11-495b-ab7f-6e6ba0813f8e', `B.Pn II 8-ka`, lineBpn82ka, 'left', 'golongan-c');
      const lineBpn82 = [
        bpn72Point,
        bpn82Point
      ];
      generateBangunanSadap(`BPn II. 8`, 'topright', lineBpn82, 0);

      const lineBoxBpnii8 = [bpn82Point,[bpn82Point[0]-0.1, bpn82Point[1]+0.05]];
      generateBox("193.54 Ha","0.273 m3/s","1084,02 m",lineBoxBpnii8,"top");

      const lineBpn92ki = [bpn92Point, [bpn92Point[0], 109.75]];
      generateBoxPetak('9b1d5a85-d705-409a-8807-2c0f223d4905', `B.Pn II 9-ki`, lineBpn92ki, 'right', 'golongan-c');
      const lineBpn92ka = [bpn92Point, [bpn92Point[0], 109.65]];
      generateBoxPetak('0781c0fc-61f5-47fd-a0f0-8e7f16b52baa', `B.Pn II 9-ka`, lineBpn92ka, 'left', 'golongan-c');
      const lineBpn92 = [
        bpn82Point,
        bpn92Point
      ];
      generateBangunanSadap(`BPn II. 9`, 'bottomcenter', lineBpn92, 0);

      const lineBn2 = [
        [-11, 108.72],
        bn2Point
      ];
      generateBangunanPembagi('BN.2', lineBn2);
      generateTextSaluranSekunder('SS. PATIMUAN I', [-11.15, 110], 0);
      generateTextSaluranSekunder('SS. PATIMUAN II', [-11.95, 109.75], 0);
    }

    var initBn3 = function() {
      const bn3Point = [-11.63, 108.72];
      const bpd1Point = [bn3Point[0], 108.77];
      const bpd2Point = [bn3Point[0], 108.89];
      const bpd3Point = [bn3Point[0], 109];
      const bpd4Point = [bn3Point[0], 109.16];
      const bpd5Point = [bn3Point[0], 109.25];
      const bpd6Point = [bn3Point[0], 109.35];
      const bpd7Point = [bn3Point[0], 109.408];
      const bksm1Point = [-11.85, bpd2Point[1]];
      const bksm2Point = [-12, 109];
      const bksm3Point = [-12.2, 109.15];
      const bksm4Point = [-12.35, 109.26];
      const bksm5Point = [-12.5, 109.37];
      const bksm6Point = [-12.58, 109.43];


      const lineBoxBn3s = [bn3Point,[bn3Point[0], bn3Point[1]+0.03]];
      generateBox("669 Ha","0.978 m3/s","353.10 m",lineBoxBn3s,"top");

      const lineBoxBn3 = [bn3Point,[bn3Point[0]-0.2, bn3Point[1]-0.05]];
      generateBox("977 Ha","1.428 m3/s","973.52 m",lineBoxBn3,"top");

      const lineBka3ka = [bn3Point, [bn3Point[0], 108.65]];
      generateBoxPetak('cd2edcab-362d-4d8b-9fe1-e597559e9258', `B.Ka II 3-ka`, lineBka3ka, 'left', 'golongan-c');

      const lineBpd1ka = [bpd1Point, [-11.68, bpd1Point[1]]];
      generateBoxPetak('140173f0-0dc0-48ab-a1d9-6337c7be4a01', `B.Pd 1-ka`, lineBpd1ka, 'bottom', 'golongan-c');
      const lineBpd1 = [
        bn3Point,
        bpd1Point
      ];
      generateBangunanSadap(`BPd. 1`, 'topcenter', lineBpd1, 0);
      
      const lineBoxBpd1 = [bpd1Point,[bpd1Point[0], bpd1Point[1]+0.05]];
      generateBox("641 Ha","0.937 m3/s","616.80 m",lineBoxBpd1,"top");

      const lineBpd2 = [
        bn3Point,
        bpd2Point
      ];
      generateBangunanSadapDanPembagi('BPd. 2', 'topcenter', lineBpd2, 0);
      
      const lineBoxBpd2 = [bpd2Point,[bpd2Point[0], bpd2Point[1]+0.05]];
      generateBox("300 Ha","0.439m3/s","616.80 m",lineBoxBpd2,"top");
      
      const lineBoxBpd2s = [bpd2Point,[bpd2Point[0]-0.2, bpd2Point[1]-0.05]];
      generateBox("341 Ha","0.449 m3/s","259.50 m",lineBoxBpd2s,"top");

      const lineBpd3ki = [bpd3Point, [-11.58, bpd3Point[1]]];
      generateBoxPetak('688a712b-a37b-4545-85bd-e150e400b63d', `B.Pd 3-ki`, lineBpd3ki, 'top', 'golongan-c');
      const lineBpd3ka = [bpd3Point, [-11.68, bpd3Point[1]]];
      generateBoxPetak('6f2daea4-7f73-4a52-a8b2-a3657dca7087', `B.Pd 3-ka`, lineBpd3ka, 'bottom', 'golongan-c');
      const lineBpd3 = [
        bn3Point,
        bpd3Point
      ];
      generateBangunanSadap(`BPd. 3`, 'topleft', lineBpd3, 90);

      const lineBoxBpd3 = [bpd3Point,[bpd3Point[0], bpd3Point[1]+0.05]];
      generateBox("237 Ha","0.346 m3/s","657.90 m",lineBoxBpd3,"top");

      const lineBpd4ki = [bpd4Point, [-11.51, bpd4Point[1]]];
      generateBoxPetak('94578959-fe94-42f3-9141-c41705095e3b', `B.Pd 4-ki`, lineBpd4ki, 'top', 'golongan-c');
      const lineBpd4 = [
        bn3Point,
        bpd4Point
      ];
      generateBangunanSadap(`BPd. 4`, 'topleft', lineBpd4, 90);

      const lineBoxBpd4 = [bpd4Point,[bpd4Point[0], bpd4Point[1]+0.05]];
      generateBox("198 Ha","0.289 m3/s","392.40 m",lineBoxBpd4,"top");

      const lineBpd5ki = [bpd5Point, [-11.6, bpd5Point[1]]];
      generateBoxPetak('67419be5-d2d1-4cc4-a5ce-e4690e7d5229', `B.Pd 5-ki`, lineBpd5ki, 'top', 'golongan-c');
      const lineBpd5ka = [bpd5Point, [-11.75, bpd5Point[1]]];
      generateBoxPetak('a8a397ae-4786-4067-bd09-223107185320', `B.Pd 5-ka`, lineBpd5ka, 'bottom', 'golongan-c');
      const lineBpd5 = [
        bn3Point,
        bpd5Point
      ];
      generateBangunanSadap(`BPd. 5`, 'bottomleft', lineBpd5, 90);

      const lineBoxBpd5 = [bpd5Point,[bpd5Point[0]-0.05, bpd5Point[1]+0.05]];
      generateBox("124 Ha","0.181 m3/s","792.90",lineBoxBpd5,"top");

      const lineBpd6ka = [bpd6Point, [-11.66, bpd6Point[1]]];
      generateBoxPetak('b0b57408-c26d-4990-a7aa-cfe1209aa396', `B.Pd 6-ka`, lineBpd6ka, 'bottom', 'golongan-c');
      const lineBpd6 = [
        bn3Point,
        bpd6Point
      ];
      generateBangunanSadap(`BPd. 6`, 'topleft', lineBpd6, 90);

      const lineBoxBpd6 = [bpd6Point,[bpd6Point[0], bpd6Point[1]+0.02]];
      generateBox("109 Ha","0.159 m3/s","551.28 m",lineBoxBpd6,"top");

      const lineBpd7ki = [bpd7Point, [-11.57, bpd7Point[1]]];
      generateBoxPetak('5880619c-0b64-441a-a121-c30c17eb9f6d', `B.Pd 7-ki`, lineBpd7ki, 'top', 'golongan-c');
      const lineBpd7te = [bpd1Point, [bpd7Point[0], 109.47]];
      generateBoxPetak('a2e1c7a1-d9e1-4de6-b17f-a7d0d65bc3de', `B.Pd 7-te`, lineBpd7te, 'right', 'golongan-c');
      const lineBpd7 = [
        bn3Point,
        bpd7Point
      ];
      generateBangunanSadap(`BPd. 7`, 'topleft', lineBpd7, 90);

      const lineBksm1ki = [bksm1Point, [bksm1Point[0], 108.94]];
      generateBoxPetak('1292e8e3-aa5d-4afe-bc0e-f3c9c44af27b', `B.Ksm 1-ki`, lineBksm1ki, 'right', 'golongan-c');
      const lineBksm1ka = [bksm1Point, [-11.9, 108.87]];
      generateBoxPetak('f3b1655f-f8fe-46e6-93e3-b4c0f9613b9a', `B.Ksm 1-ka`, lineBksm1ka, 'left', 'golongan-c');
      const lineBksm1 = [
        bpd2Point,
        bksm1Point
      ];
      generateBangunanSadap(`BKsm. 1`, 'topleft', lineBksm1, 0);

      const lineBoxBksm1 = [bksm1Point,[bksm1Point[0]-0.12, bksm1Point[1]+0.05]];
      generateBox("257 Ha","0.376 m3/s","819 m",lineBoxBksm1,"top");

      const lineBksm2ki = [bksm2Point, [-11.94, 109.1]];
      generateBoxPetak('0bd462d4-08cf-4804-bb00-0faae94daed6', `B.Ksm 2-ki`, lineBksm2ki, 'right', 'golongan-c');
      const lineBksm2 = [
        bksm1Point,
        bksm2Point
      ];
      generateBangunanSadap(`BKsm. 2`, 'topleft', lineBksm2, 0);
      const lineBoxBksm2 = [bksm2Point,[bksm2Point[0]-0.12, bksm2Point[1]+0.05]];
      generateBox("196 Ha","0.2787 m3/s","1428.30 m",lineBoxBksm2,"top");

      const lineBksm3ki = [bksm3Point, [-12.14, 109.25]];
      generateBoxPetak('00e4591e-774d-43e9-ac97-026595b15c86', `B.Ksm 3-ki`, lineBksm3ki, 'right', 'golongan-c');
      const lineBksm3 = [
        bksm2Point,
        bksm3Point
      ];
      generateBangunanSadap(`BKsm. 3`, 'topleft', lineBksm3, 0);

      const lineBoxBksm3 = [bksm3Point,[bksm3Point[0]-0.12, bksm3Point[1]+0.05]];
      generateBox("139 Ha","0.203 m3/s","867.30 m",lineBoxBksm3,"top");

      const lineBksm4ka = [bksm4Point, [bksm4Point[0], 109.19]];
      generateBoxPetak('90a1769b-8138-46fa-bccb-a4feef17be80', `B.Ksm 4-ka`, lineBksm4ka, 'left', 'golongan-c');
      const lineBksm4 = [
        bksm3Point,
        bksm4Point
      ];
      generateBangunanSadap(`BKsm. 4`, 'topleft', lineBksm4, 0);

      const lineBoxBksm4 = [bksm4Point,[bksm4Point[0]-0.12, bksm4Point[1]+0.05]];
      generateBox("106 Ha","0.155 m3/s","396.30 m",lineBoxBksm4,"top");

      const lineBksm5ki = [bksm5Point, [-12.44, 109.47]];
      generateBoxPetak('f1ed0e8e-2661-4133-94ea-2cac0d309300', `B.Ksm 5-ki`, lineBksm5ki, 'right', 'golongan-c');
      const lineBksm5 = [
        bksm4Point,
        bksm5Point
      ];
      generateBangunanSadap(`BKsm. 5`, 'topleft', lineBksm5, 0);

      const lineBoxBksm5 = [bksm5Point,[bksm5Point[0]-0.05, bksm5Point[1]+0.05]];
      generateBox("47 Ha","0.069 m3/s","302.09 m",lineBoxBksm5,"top");

      const lineBksm6ka = [bksm6Point, [-12.61, bksm6Point[1]]];
      generateBoxPetak('c353908b-c9c3-441d-bd90-dc6115652409', `B.Ksm 6-ka`, lineBksm6ka, 'bottom', 'golongan-c');
      const lineBksm6 = [
        bksm5Point,
        bksm6Point
      ];
      generateBangunanSadap(`BKsm. 6`, 'topleft', lineBksm6, 0);

      const lineBn3 = [
        [-11.3, 108.72],
        bn3Point
      ];
      generateBangunanPembagi('BN.3', lineBn3);
      generateTextSaluranSekunder('SS. PURWODADI', [-11.68, 109.1], 0);
      generateTextSaluranSekunder('SS. KEDUNGSALAM', [-12.3, 109.3], 0);
    }

    var initBn4 = function() {
      const bn4Point = [-12.1, 108.72];

      const lineBoxBn4 = [bn4Point,[bn4Point[0]-0.08, bn4Point[1]+0.05]];
      generateBox("904 Ha","1.322 m3/s","484.80 m",lineBoxBn4,"top");

      const lineBn4p = [bn4Point, [bn4Point[0], 108.77]];
      generateBoxPetak('e0dec75f-93bd-4cfa-8bea-0ec06e939481', `B.N 4`, lineBn4p, 'right', 'golongan-c');
      const lineBn4 = [
        [-11.63, 108.72],
        bn4Point
      ];
      generateBangunanPembagiDanSadap('BN.4', lineBn4);
    }

    var initBn5 = function() {
      const bn5Point = [-12.2, 108.72];

      const lineBoxBn5 = [bn5Point,[bn5Point[0]-0.08, bn5Point[1]+0.05]];
      generateBox("893 Ha","1.306 m3/s","515.28 m",lineBoxBn5,"top");

      const lineBn5p = [bn5Point, [bn5Point[0], 108.62]];
      generateBoxPetak('eaf64caf-cf50-405a-8a81-bac37e9322b6', `B.N 5`, lineBn5p, 'left', 'golongan-c');
      const lineBn5 = [
        [-12.1, 108.72],
        bn5Point
      ];
      generateBangunanPembagiDanSadap('BN.5', lineBn5);
    }

    var initBn6 = function() {
      const bn6Point = [-12.3, 108.72];

      const lineBoxBn6 = [bn6Point,[bn6Point[0]-0.08, bn6Point[1]+0.05]];
      generateBox("273 Ha","0.399 m3/s","221.90 m",lineBoxBn6,"top");

      const lineBn6p = [bn6Point, [bn6Point[0], 108.77]];
      generateBoxPetak('61472e41-ce43-49b5-be16-40d79458a20d', `B.N 6`, lineBn6p, 'right', 'golongan-c');
      const lineBn6 = [
        [-12.2, 108.72],
        bn6Point
      ];
      generateBangunanPembagiDanSadap('BN.6', lineBn6);
    }

    var initBn7 = function() {
      const bn7Point = [-12.6, 108.72];
      const bsm1Point = [bn7Point[0], 108.82];
      const bsm2Point = [bn7Point[0], 108.98];
      const bsm3Point = [bn7Point[0], 109.07];
      const bsm4Point = [bn7Point[0], 109.17];

      const lineBoxBn7s = [bn7Point,[bn7Point[0], bn7Point[1]+0.05]];
      generateBox("197 Ha","0.288 m3/s","465.85 m",lineBoxBn7s,"top");

      const lineBoxBn7 = [bn7Point,[bn7Point[0]-0.08, bn7Point[1]+0.05]];
      generateBox("638 Ha","0.933 m3/s","754.79 m",lineBoxBn7,"top");

      const lineBsm1ki = [bsm1Point, [-12.55, bsm1Point[1]]];
      generateBoxPetak('4bc34dd9-78f8-4a6c-8138-73e5bf8e663b', `B.Sm 1 ki`, lineBsm1ki, 'top', 'golongan-c');
      const lineBsm1 = [
        bn7Point,
        bsm1Point
      ];
      generateBangunanSadap(`BSm 1`, 'bottomleft', lineBsm1, 90);

      const lineBoxBsm1 = [bsm1Point,[bsm1Point[0], bsm1Point[1]+0.08]];
      generateBox("152 Ha","0.222 m3/s","449.20 m",lineBoxBsm1,"top");

      const lineBsm2ki = [bsm2Point, [-12.55, bsm2Point[1]]];
      generateBoxPetak('d220051d-14dd-4f7c-9f89-92ed356eb1b3', `B.Sm 2 ki`, lineBsm2ki, 'top', 'golongan-c');
      const lineBsm2 = [
        bn7Point,
        bsm2Point
      ];
      generateBangunanSadap(`BSm 2`, 'bottomleft', lineBsm2, 90);

      const lineBoxBsm2 = [bsm2Point,[bsm2Point[0], bsm2Point[1]+0.05]];
      generateBox("87 Ha","0.127 m3/s","624.60 m",lineBoxBsm2,"top");
     
      const lineBsm3ka = [bsm3Point, [-12.65, bsm3Point[1]]];
      generateBoxPetak('a83662bd-a7bd-4d45-8ad4-87049dd01ddc', `B.Sm 3 ka`, lineBsm3ka, 'bottom', 'golongan-c');
      const lineBsm3 = [
        bn7Point,
        bsm3Point
      ];
      generateBangunanSadap(`BSm 3`, 'bottomleft', lineBsm3, 90);

      const lineBoxBsm3 = [bsm3Point,[bsm3Point[0], bsm3Point[1]+0.05]];
      generateBox("40 Ha","0.058 m3/s","504.35 m",lineBoxBsm3,"top");

      const lineBsm4te = [bsm4Point, [bsm4Point[0], 109.19]];
      generateBoxPetak('ce09f17c-61de-41ae-ac57-c46733bf482f', `B.Sm 4`, lineBsm4te, 'right', 'golongan-c');
      const lineBsm4 = [
        bn7Point,
        bsm4Point
      ];
      generateBangunanSadap(`BSm 4`, 'bottomleft', lineBsm4, 90);

      const lineBn7 = [
        [-12.3, 108.72],
        bn7Point
      ];
      generateBangunanPembagi('BN.7', lineBn7);
      generateTextSaluranSekunder('SS. SIDO MUKTI', [-12.55, 109.2], 0);
    }

    var initBn8 = function() {
      const bn8Point = [-12.8, 108.72];

      const lineBoxBn8 = [bn8Point,[bn8Point[0]-0.08, bn8Point[1]-0.05]];
      generateBox("273 Ha","0.399 m3/s","221.90 m",lineBoxBn8,"top");

      const lineBn8p = [bn8Point, [bn8Point[0], 108.77]];
      generateBoxPetak('52d7ea9d-ef03-4975-8ad1-cf810a7e5a5f', `B.N 8`, lineBn8p, 'right', 'golongan-c');

      const lineBn8 = [
        [-12.6, 108.72],
        bn8Point
      ];
      generateBangunanPembagiDanSadap('BN.8', lineBn8);
    }

    var initBn9 = function() {
      const bn9Point = [-12.95, 108.72];
      const bka1Point = [bn9Point[0], 108.82];
      const bka2Point = [bn9Point[0], 109];
      const bka3Point = [-13.04, 109.2];

      const lineBoxBn9 = [bn9Point,[bn9Point[0]-0.08, bn9Point[1]-0.05]];
      generateBox("329 Ha","0.481 m3/s","1368.95 m",lineBoxBn9,"top");

      const lineBka1ki = [bka1Point, [-12.92, bka1Point[1]]];
      generateBoxPetak('76859afe-30ec-45e2-adb1-2786af0b7505', `B.Ka 1 ki`, lineBka1ki, 'top', 'golongan-c');
      const lineBka1ka = [bka1Point, [-13, bka1Point[1]]];
      generateBoxPetak('adadb8a0-1339-4b82-a7b8-6ab3fb99aea6', `B.Ka 1 ka`, lineBka1ka, 'bottom', 'golongan-c');
      const lineBka1 = [
        bn9Point,
        bka1Point
      ];
      generateBangunanSadap(`BKa 1`, 'bottomleft', lineBka1, 90);

      const lineBoxBka1 = [bka1Point,[bka1Point[0], bka1Point[1]+0.1]];
      generateBox("154 Ha","0.225 m3/s","570.15 m",lineBoxBka1,"top");

      const lineBka2ka = [bka2Point, [-13, bka2Point[1]]];
      generateBoxPetak('49e879e3-b403-45b2-bc41-cd65e25b9c50', `B.Ka 2 ka`, lineBka2ka, 'bottom', 'golongan-c');
      const lineBka2 = [
        bn9Point,
        bka2Point
      ];
      generateBangunanSadap(`BKa 2`, 'bottomleft', lineBka2, 90);

      const lineBoxBka2 = [bka2Point,[bka2Point[0]-0.05, bka2Point[1]+0.1]];
      generateBox("79 Ha","0.115 m3/s","667.48 m",lineBoxBka2,"top");

      const lineBka3ka = [bka3Point, [bka3Point[0], 109.25]];
      generateBoxPetak('df20309b-ffe2-48b3-9382-77ee5a1f4005', `B.Ka 3 ka`, lineBka3ka, 'right', 'golongan-c');
      const lineBka3 = [
        bka2Point,
        bka3Point
      ];
      generateBangunanSadap(`BKa 3`, 'topright', lineBka3, 0);

      const lineBn9 = [
        [-12.8, 108.72],
        bn9Point
      ];
      generateBangunanPembagi('BN.9', lineBn9);
      generateTextSaluranSekunder('SS. KALEN ANYAR', [-12.9, 109.2], 0);
    }

    var initBn10 = function() {
      const bn10Point = [-13.15, 108.72];

      const lineBoxBn10 = [bn10Point,[bn10Point[0]-0.08, bn10Point[1]-0.05]];
      generateBox("279 Ha","0.408 m3/s","1517.76 m",lineBoxBn10,"top");

      const lineBn10p = [bn10Point, [bn10Point[0], 108.77]];
      generateBoxPetak('ea562e0f-5747-4b54-8dab-6b558f877334', `B.N 10`, lineBn10p, 'right', 'golongan-c');
      const lineBn10 = [
        [-12.95, 108.72],
        bn10Point
      ];
      generateBangunanPembagiDanSadap('BN.10', lineBn10);
    }

    var initBn11 = function() {
      const bn11Point = [-13.25, 108.72];

      const lineBoxBn11 = [bn11Point,[bn11Point[0]-0.08, bn11Point[1]-0.05]];
      generateBox("188 Ha","0.275 m3/s","344.43 m",lineBoxBn11,"top");

      const lineBn11p = [bn11Point, [bn11Point[0], 108.77]];
      generateBoxPetak('3d9234e3-dd02-4409-bce8-4cf2662216d8', `B.N 11`, lineBn11p, 'right', 'golongan-c');
      const lineBn11 = [
        [-13.15, 108.72],
        bn11Point
      ];
      generateBangunanPembagiDanSadap('BN.11', lineBn11);
    }

    var initBn12 = function() {
      const bn12Point = [-13.35, 108.72];

      const lineBoxBn12 = [bn12Point,[bn12Point[0]-0.08, bn12Point[1]-0.05]];
      generateBox("157 Ha","0.230 m3/s","769.77 m",lineBoxBn12,"top");

      const lineBn12p = [bn12Point, [bn12Point[0], 108.77]];
      generateBoxPetak('83219454-d55f-4ff0-afe0-e5f8f4ebe0f8', `B.N 12`, lineBn12p, 'right', 'golongan-c');
      const lineBn12 = [
        [-13.25, 108.72],
        bn12Point
      ];
      generateBangunanPembagiDanSadap('BN.12', lineBn12);
    }

    var initBn13 = function() {
      const bn13Point = [-13.45, 108.72];

      const lineBoxBn13 = [bn13Point,[bn13Point[0]-0.08, bn13Point[1]-0.05]];
      generateBox("97 Ha","0.142 m3/s","552.86 m",lineBoxBn13,"top");

      const lineBn13p = [bn13Point, [bn13Point[0], 108.77]];
      generateBoxPetak('72190406-d3eb-4c70-ae3e-2650d480e6b7', `B.N 13`, lineBn13p, 'right', 'golongan-c');
      const lineBn13 = [
        [-13.35, 108.72],
        bn13Point
      ];
      generateBangunanPembagiDanSadap('BN.13', lineBn13);
    }

    var initBn14 = function() {
      const bn14Point = [-13.55, 108.72];

      const lineBn14p = [bn14Point, [-13.57, bn14Point[1]]];
      generateBoxPetak('b9a7db14-80a1-4b66-a9c0-03f126fdba58', `B.N 14`, lineBn14p, 'bottom', 'golongan-c');
      const lineBn14 = [
        [-13.45, 108.72],
        bn14Point
      ];
      generateBangunanPembagiDanSadap('BN.14', lineBn14);
    }

    return {
        //main function to initiate the module
        init: function () {
            initInput();
            initMap();

            // Generate Skema
            initBn14();
            initBn13();
            initBn12();
            initBn11();
            initBn10();
            initBn9();
            initBn8();
            initBn7();
            initBn6();
            initBn5();
            initBn4();
            initBn3();
            initBn2();
            initBn1();
            initBs11();
            initBs10();
            initBs9();
            initBs8();
            initBs7();
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

function getSchemaData(tanggal) {
  disableElements();
  // $('.box-petak tbody').html(`<tr><td class="text-center" colspan="2"><img src="/images/loading.gif" /></td></tr>`);
  getData(`/Schema/GetSchemaDataByDate/${tanggal}`).then(res => {
    let result = res.data;

    if (result.metaData.code == 200) {
      $.each(result.response, function (key, data) {
        var luas = 'A= <strong>-</strong>';
        var debit_kebutuhan = 'QK= <strong>-</strong>';
        var debit_aktual = 'QA= <strong>-</strong>';
        var debit_rekomendasi = 'QR= <strong>-</strong>';

        if (data.luas != null) {
          luas = `A= ${formatNumber(data.luas)} Ha`;
        }

        if (data.debit_kebutuhan != null) {
          if (isDateInRange(tanggal)) {
            debit_kebutuhan = `QK= 0 lt/dt`;
          } else {
            debit_kebutuhan = `QK= ${formatNumber(data.debit_kebutuhan)} lt/dt`;
          }
          
        }

        if (data.debit_aktual != null) {
          debit_aktual = `QA= ${formatNumber(data.debit_aktual)} lt/dt`;
        }

        if (data.debit_rekomendasi != null) {
          if (isDateInRange(tanggal)) {
            debit_rekomendasi = `QR= 0 lt/dt`;
          } else {
            debit_rekomendasi = `QR= ${formatNumber(data.debit_rekomendasi)} lt/dt`;
          }
          
        }

        $(`#${data.id}-petak`).html(`
          <table id="petak-${data.id}">
            <thead>
              <tr>
                <th class="text-center" colspan="2">${data.nama_petak}</th>
              </tr>
            </thead>
            <tbody>
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
            <tbody>
          </table>
        `);
      });

      enableElements();
    }
  }).catch(err => {
    enableElements();
    let error = err.response.data;
    if (!error.success) {
      console.log(error.message);
    }
  });
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