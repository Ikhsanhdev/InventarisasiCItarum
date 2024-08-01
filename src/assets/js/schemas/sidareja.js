"use strict";
console.log("test");
const whiteBasemap = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/3cwcakAAAAASUVORK5CYII=');

const map = L.map('map', {
    // attributionControl: false,
    // center: [-7.444992423191618, 109.47077209463006],
    center: [-8.7, 110.4],
    zoom: 10,
    maxZoom: 13,
    minZoom: 5,
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
    }

    var initBs1 = function () {
      const linePts1Ki = [[-7.325, 108.77], [-7.325, 108.81]];
      generateBoxPetak('fca11354-774f-4924-8dc6-c88bcd5f2de6', 'Pts. 1 Ki', linePts1Ki, 'right', 'golongan-a');

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
      generateBoxPetak('a26be22c-f1e0-4400-af78-82b3b93cb1bf', 'Pt. Ks. 2-Ki', linePtKs2Ki, 'top', 'golongan-a');
      
      const lineBks2 = [
        bs2Point, 
        bks2Point
      ];
      generateBangunanSadap('BKs. 2', 'bottomcenter', lineBks2, 90);

      // Set BKs. 1
      const linePtKs1Ki = [bks1Point, [-7.475, bks1Point[1]]];
      generateBoxPetak('3ca505a2-0038-45a7-aa38-e2f43205d84d', 'Pt. Ks. 1-Ki', linePtKs1Ki, 'top', 'golongan-a');

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

      // Set BRm. 3
      const linePtsRm3Ki = [brm3Point, [-7.65, brm3Point[1]]];
      generateBoxPetak('509a16fd-9b7c-475f-89a0-24386d38709f', 'Pts. Rm. 3-Ki', linePtsRm3Ki, 'top', 'golongan-a');
      
      const lineBrm3 = [
        bs3Point, 
        brm3Point
      ];
      generateBangunanSadap('BRm. 3', 'bottomcenter', lineBrm3, 90);

      // Set BRm. 2
      const linePtsRm2Kn = [brm2Point, [-7.72, brm2Point[1]]];
      generateBoxPetak('7cfa3b50-14b2-4724-a582-fddfb27ed8bc', 'Pts. Rm. 2-Kn', linePtsRm2Kn, 'bottom', 'golongan-a');
      
      const lineBrm2 = [
        bs3Point, 
        brm2Point
      ];
      generateBangunanSadap('BRm. 2', 'bottomright', lineBrm2, 90);

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
      generateBoxPetak('0d219996-918d-4549-9a4a-0a6820e9e40d', 'Pts. IV Ki', linePts4Ki, 'right', 'golongan-a');

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

      // Set BKd. 6
      const linePtKd6Ki = [bkd6Point, [-8, bkd6Point[1]]];
      generateBoxPetak('37ae32d1-80ca-4197-8ac5-69b13653f261', 'Pt. Kd. 6-Ki', linePtKd6Ki, 'top', 'golongan-a');

      const lineBkd6 = [
        bs5Point, 
        bkd6Point
      ];
      generateBangunanSadap('BKd. 6', 'bottomcenter', lineBkd6, 90);

      // Set BKd. 5
      const linePtKd5Ki = [bkd5Point, [-8, bkd5Point[1]]];
      generateBoxPetak('87d948a4-46d7-4c2f-92b1-eae58b8e8d24', 'Pt. Kd. 5-Ki', linePtKd5Ki, 'top', 'golongan-a');

      const lineBkd5 = [
        bs5Point, 
        bkd5Point
      ];
      generateBangunanSadap('BKd. 5', 'bottomcenter', lineBkd5, 90);

      // Set BKd. 4
      const linePtKd4Ki = [bkd4Point, [-8, bkd4Point[1]]];
      generateBoxPetak('5b8b2241-d1df-42e1-9409-a444f42a329e', 'Pt. Kd. 4-Ki', linePtKd4Ki, 'top', 'golongan-a');

      const lineBkd4 = [
        bs5Point, 
        bkd4Point
      ];
      generateBangunanSadap('BKd. 4', 'bottomcenter', lineBkd4, 90);

      // Set BKd. 3
      const linePtKd3Ki = [bkd3Point, [-8, bkd3Point[1]]];
      generateBoxPetak('c4690341-532f-43a6-9dd0-9a9d90e4f996', 'Pt. Kd. 3-Ki', linePtKd3Ki, 'top', 'golongan-a');

      const lineBkd3 = [
        bs5Point, 
        bkd3Point
      ];
      generateBangunanSadap('BKd. 3', 'bottomcenter', lineBkd3, 90);

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

      // Set BKd. 1
      const linePtKd1Kn = [bkd1Point, [-8.1, bkd1Point[1]]];
      generateBoxPetak('c5dc7b64-2019-4c6d-97c8-ccc4a54a130b', 'Pt. Kd. 1-Kn', linePtKd1Kn, 'bottom', 'golongan-a');

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

      // Set BCk. 10

      const linePtCk18Kn = [bckkn18Point, [bckkn18Point[0], bckkn18Point[1] - 0.06]];
      generateBoxPetak('abf3088b-38b8-47a7-957e-b8a8c176d9d7', 'Pt. CK. 18-Kn', linePtCk18Kn, 'left', 'golongan-b');

      const lineBckKn18 = [
        bck10Point, 
        bckkn18Point, 
      ];
      generateBangunanSadap('BCk. Kn18', 'centerright', lineBckKn18, 0);

      const linePtCk17Kr = [bckkr17Point, [bckkr17Point[0], bckkr17Point[1] + 0.06]];
      generateBoxPetak('c8e17113-3795-4562-bf19-e9365ed22acc', 'Pt. CK. 17-Kr', linePtCk17Kr, 'right', 'golongan-b');

      const linePtCk17Kn = [bckkn17Point, [bckkn17Point[0], bckkn17Point[1] - 0.06]];
      generateBoxPetak('288c23b6-bf60-4319-9d61-298b65b26521', 'Pt. CK. 17-Kn', linePtCk17Kn, 'left', 'golongan-b');

      const lineBckKn17 = [
        bck10Point, 
        bckkn17Point, 
      ];
      generateBangunanSadap('BCk. Kn17', 'topright', lineBckKn17, 0);

      const linePtCk16Kn = [bckkn16Point, [bckkn16Point[0], bckkn16Point[1] - 0.06]];
      generateBoxPetak('7c88b4e5-99af-4703-b223-10f5032e65a1', 'Pt. CK. 16-Kn', linePtCk16Kn, 'left', 'golongan-b');

      const lineBckKn16 = [
        bck10Point, 
        bckkn16Point, 
      ];
      generateBangunanSadap('BCk. Kn16', 'centerright', lineBckKn16, 0);

      const linePtCk15Kn = [bckkn15Point, [bckkn15Point[0], bckkn15Point[1] - 0.06]];
      generateBoxPetak('64f09dad-3f32-4439-90fb-09f3e3c2cef3', 'Pt. CK. 15-Kn', linePtCk15Kn, 'left', 'golongan-b');

      const linePtCk15Kr = [bckkn15Point, [bckkn15Point[0], bckkn15Point[1] + 0.1]];
      generateBoxPetak('6738f990-c821-4f1b-9a1d-a8b7dbcbf00f', 'Pt. CK. 15-Kr', linePtCk15Kr, 'right', 'golongan-b');

      const lineBckKn15 = [
        bck10Point, 
        bckkn15Point, 
      ];
      generateBangunanSadap('BCk. Kn15', 'topright', lineBckKn15, 0);

      const linePtCk14Kr = [bckkn14Point, [bckkn14Point[0], bckkn14Point[1] + 0.1]];
      generateBoxPetak('5fb2294d-1f39-4cd7-8a46-9272f5cb70cb', 'Pt. CK. 14-Kr', linePtCk14Kr, 'right', 'golongan-b');

      const lineBckKn14 = [
        bck10Point, 
        bckkn14Point, 
      ];
      generateBangunanSadap('BCk. Kn14', 'centerleft', lineBckKn14, 0);

      const linePtCk13Kn = [bckkn13Point, [bckkn13Point[0], bckkn13Point[1] - 0.04]];
      generateBoxPetak('2720ee3e-519b-47cc-8559-3c50dd860f90', 'Pt. CK. 13-Kn', linePtCk13Kn, 'left', 'golongan-b');

      const lineBckKn13 = [
        bck10Point, 
        bckkn13Point, 
      ];
      generateBangunanSadap('BCk. Kn13', 'centerright', lineBckKn13, 0);

      const linePtCk12Kr = [bckkn12Point, [bckkn12Point[0], bckkn12Point[1] + 0.1]];
      generateBoxPetak('dddcf36e-809a-4ef0-b1af-1a463f8cb2ac', 'Pt. CK. 12-Kr', linePtCk12Kr, 'right', 'golongan-b');

      const lineBckKn12 = [
        bck10Point, 
        bckkn12Point, 
      ];
      generateBangunanSadap('BCk. Kn12', 'centerleft', lineBckKn12, 0);

      const linePtCk11Kr = [bckkn1Point, [bckkn1Point[0], bckkn1Point[1] + 0.1]];
      generateBoxPetak('3d6328fe-45c3-4d59-ad14-90adf6c2cc6d', 'Pt. CK. 11-Kr', linePtCk11Kr, 'right', 'golongan-b');

      const lineBckKn1 = [
        bck10Point, 
        bckkn1Point, 
      ];
      generateBangunanSadap('BCk. Kn1', 'centerleft', lineBckKn1, 0);

      const linePtCkKi2Kn = [bckki2Point, [bckki2Point[0] - 0.04, bckki2Point[1]]];
      generateBoxPetak('88aff689-aabc-4a7d-8f6b-d691cafa4b73', 'Pt. CK.Ki 2-Kn', linePtCkKi2Kn, 'bottom', 'golongan-b');

      const lineBckKi2 = [
        bck10Point, 
        bckki2Point, 
      ];
      generateBangunanSadap('BCkKi. 2', 'topcenter', lineBckKi2, 90);

      const linePtCkKi1Kn = [bckki1Point, [bckki1Point[0] - 0.04, bckki1Point[1]]];
      generateBoxPetak('bfe0a3e4-a1ad-4241-a5cf-746098673441', 'Pt. CK.Ki 1-Kn', linePtCkKi1Kn, 'bottom', 'golongan-b');

      const lineBckKi1 = [
        bck10Point, 
        bckki1Point, 
      ];
      generateBangunanSadap('BCkKi. 1', 'topcenter', lineBckKi1, 90);

      const lineBck10 = [
        bs6Point, 
        bck10Point
      ];
      generateBangunanSadapDanPembagi('BCk. 10', 'topcenter', lineBck10, 90);

      // Set BCk. 9

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

      const lineBck9 = [
        bs6Point, 
        bck9Point
      ];
      generateBangunanSadapDanPembagi('BCk. 9', 'topcenter', lineBck9, 90);

      // Set BCk. 8
      const linePtCk8Kn = [bck8Point, [-8.42, bck8Point[1]]];
      generateBoxPetak('0f715ffe-696b-4c85-8ef2-6017048ad341', 'Pt. Ck. 8-Kn', linePtCk8Kn, 'bottom', 'golongan-b');

      const lineBck8 = [
        bs6Point, 
        bck8Point
      ];
      generateBangunanSadap('BCk. 8', 'topcenter', lineBck8, 90);

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

      // Set BTr. 4
      const linePtTr4Kr = [btr4Point, [btr4Point[0], btr4Point[1] + 0.06]];
      generateBoxPetak('5c41e1ea-9dfb-4727-ba3f-fc35b27226a1', 'Pt. Tr. 4-Kr', linePtTr4Kr, 'right', 'golongan-b');
      
      const lineBtr4 = [
        bck7Point, 
        btr4Point, 
      ];
      generateBangunanSadap('BTr. 4', 'topright', lineBtr4, 0);

      // Set BTr. 3
      const linePtTr3Kn = [btr3Point, [btr3Point[0], btr3Point[1] - 0.06]];
      generateBoxPetak('f96a51b0-6fcc-4ca4-af2e-2de41b41bd75', 'Pt. Tr. 3-Kn', linePtTr3Kn, 'left', 'golongan-b');
      
      const lineBtr3 = [
        bck7Point, 
        btr3Point, 
      ];
      generateBangunanSadap('BTr. 3', 'centerright', lineBtr3, 0);

      // Set BTr. 2
      const linePtTr2Kn = [btr2Point, [btr2Point[0], btr2Point[1] - 0.06]];
      generateBoxPetak('678b079a-46d7-4cdb-92b2-2df8d5a5a0e2', 'Pt. Tr. 2-Kn', linePtTr2Kn, 'left', 'golongan-b');
      
      const lineBtr2 = [
        bck7Point, 
        btr2Point, 
      ];
      generateBangunanSadap('BTr. 2', 'centerright', lineBtr2, 0);

      // Set BTr. 1
      const linePtTr1Kn = [btr1Point, [btr1Point[0] - 0.15, btr1Point[1] + 0.15]];
      generateBoxPetak('dec728c0-64f2-4516-bbd4-79c023c331f3', 'Pt. Tr. 1-Kn', linePtTr1Kn, 'bottom', 'golongan-b');
      
      const lineBtr1 = [
        btr1Point, 
        bck7Point, 
      ];
      generateBangunanSadapDanPembagi('BTr. 1', 'bottomright', lineBtr1, 90);

      // Set BCk. 7
      const lineBck7 = [
        bs6Point, 
        bck7Point
      ];
      generateBangunanSadapDanPembagi('BCk. 7', 'topcenter', lineBck7, 90);

      // Set BCk. 6
      const linePtCk6Kn = [bck6Point, [-8.42, bck6Point[1]]];
      generateBoxPetak('60eb2f2f-512a-4715-a75a-fd81596062f0', 'Pt. Ck. 6-Kn', linePtCk6Kn, 'bottom', 'golongan-b');

      const lineBck6 = [
        bs6Point, 
        bck6Point
      ];
      generateBangunanSadap('BCk. 6', 'topcenter', lineBck6, 90);

      // Set BCk. 5
      const linePtCk5Kn = [bck5Point, [-8.42, bck5Point[1]]];
      generateBoxPetak('cb1a52bb-e373-4e06-b8ef-3a8571ef1163', 'Pt. Ck. 5-Kn', linePtCk5Kn, 'bottom', 'golongan-b');

      const lineBck5 = [
        bs6Point, 
        bck5Point
      ];
      generateBangunanSadap('BCk. 5', 'topcenter', lineBck5, 90);

      // Set BCk. 4
      const linePtCk4Kn = [bck4Point, [-8.45, bck4Point[1]]];
      generateBoxPetak('8257c58d-23e4-4e69-96a8-5e752edee4a8', 'Pt. Ck. 4-Kn', linePtCk4Kn, 'bottom', 'golongan-b');

      const lineBck4 = [
        bs6Point, 
        bck4Point
      ];
      generateBangunanSadap('BCk. 4', 'topcenter', lineBck4, 90);

      // Set BCk. 3
      const linePtCk3Kn = [bck3Point, [-8.42, bck3Point[1]]];
      generateBoxPetak('a32dd81f-4736-4393-94cb-ddd69f14ac4d', 'Pt. Ck. 3-Kn', linePtCk3Kn, 'bottom', 'golongan-b');

      const lineBck3 = [
        bs6Point, 
        bck3Point
      ];
      generateBangunanSadap('BCk. 3', 'topcenter', lineBck3, 90);

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

      // Set BCk. 2
      const lineBck2 = [
        bs6Point, 
        bck2Point
      ];
      generateBangunanSadapDanPembagi('BCk. 2', 'topcenter', lineBck2, 90);

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

    var initBs7 = function() {
      const bs7Point = [-8.75, 108.72];
      const linePtSm4 = [bs7Point, [bs7Point[0], 108.81]];
      generateBoxPetak('ece08111-0685-4435-8963-4860a4d0c356', 'Pt.Sm-4', linePtSm4, 'right', 'golongan-b');

      const lineBs7 = [
        [-8.38, 108.72],
        bs7Point
      ];
      generateBangunanPembagiDanSadap('BS.VII', lineBs7);
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
    }

    // var initBs10 = function() {
    //   const bs10Point = [-10.35, 108.72];
    // }

    return {
        //main function to initiate the module
        init: function () {
            initInput();
            initMap();

            // Generate Skema
            // initBs10();
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
          debit_kebutuhan = `QK= ${formatNumber(data.debit_kebutuhan)} lt/dt`;
        }

        if (data.debit_aktual != null) {
          debit_aktual = `QA= ${formatNumber(data.debit_aktual)} lt/dt`;
        }

        if (data.debit_rekomendasi != null) {
          debit_rekomendasi = `QR= ${formatNumber(data.debit_rekomendasi)} lt/dt`;
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