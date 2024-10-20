"use strict";

const whiteBasemap = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/3cwcakAAAAASUVORK5CYII=');

const map = L.map('map', {
    // attributionControl: false,
    // Default location
    center: [-7, 109.5],
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
        map.attributionControl.addAttribution('DI. Manganti Skema Cihaur Versi: R4 (Update 16 Juli 2024) | App Versi 2.1 (Update 13 Agustus 2024)');

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
      const induksidareja =   [bch0Point[0], 106.8];
      const maganti = [bch0Point[0], 106.4];
      const bch1Point = [-8.4,bch0Point[1]];
      const bch2Point = [-8.2, bch0Point[1]];
      const bch3Point = [-8,bch0Point[1]];
      const bch4Point = [-7.8,bch0Point[1]];
      const bch5Point = [-7.6,bch0Point[1]];
      const bch6Point = [-7.5,bch0Point[1]];
      const bch7Point = [-7.325, 106.8];
      const bch8Point = [bch7Point[0], 107];
      const bch9Point = [bch7Point[0], 107.3];
      const bch10Point = [bch7Point[0], 107.6];
      const bch11Point = [bch7Point[0], 107.8];
      const bch12Point = [bch7Point[0], 108];
      const bch13Point = [bch7Point[0], 108.2];
      const bch14Point = [bch7Point[0], 108.67];
      const bch15Point = [bch7Point[0], 108.93];
      const bms1Point = [bch2Point[0], 106.85];
      const bms2Point = [bch2Point[0], 107.06];
      const bms3Point = [bch2Point[0], 107.27];
      const bms4Point = [bch2Point[0], 107.49];
      const bms4iPoint = [bch2Point[0], 107.67];
      const bms5Point = [bch2Point[0], 107.89];
      const bpg1Point = [-8, bms2Point[1]];
      const bgs1Point = [bch4Point[0], 106.85];
      const bgs2Point = [bch4Point[0], 107.06];
      const bgs3Point = [bch4Point[0], 107.27];
      const bps1Point = [bch5Point[0], 106.85];
      const bps2Point = [bch5Point[0], 107.03];
      const bnd1Point = [-7.5, bch11Point[1]];
      const bnd2Point = [-7.6, bch11Point[1]];
      const bnd3Point = [-7.8, bch11Point[1]];
      const bcd1Point = [-7.5, bch13Point[1]];
      const bcd2iPoint = [-7.75, 108.45];
      const bcd2Point = [-7.83, bcd2iPoint[1]];
      const bcd3Point = [-7.95, bcd2Point[1]];
      const bcd4Point = [-8.2, bcd2Point[1]];
      const bcd5Point = [-8.35, bcd2Point[1]];
      const bcd6Point = [-8.55, bcd2Point[1]];
      const bcp1Point = [-7.66, bch13Point[1]];
      const bcp2Point = [-7.95, bch13Point[1]];
      const bkw1Point = [-8.33, 108.67];
      const bkw2Point = [-8.55, bkw1Point[1]];
      const bkw3Point = [-8.68,bkw1Point[1]];
      // Petak B.ch 14 
      const lineBch14 = [bch15Point,bch14Point];
      generateBangunanPembagiDanSadap('B.Ch. 14','topcenter',lineBch14,0);

      const lineBoxBch14 = [bch14Point ,[-7.25,108.87]];
      generateBox("10.005,95 Ha","19.302 m3/s","1515,04 m", lineBoxBch14,'top' )

      const lineCh14ka = [bch14Point,[-7.35, 108.67]];
      generateBoxPetak('725ac603-64d3-45a8-a7f1-c4b05f049a39', 'Ch 14 Ka', lineCh14ka, 'bottom','golongan-a');

      // Petak B.Ch 13
      const lineBch13 = [bch14Point,bch13Point];
      generateBangunanPembagi('B.Ch 13 (BC.I - X)','topcenter',lineBch13,0);

      const lineBoxBch13 = [bch13Point ,[-7.39,108.45]];
      generateBox("10.024,35 Ha","19,337 m3/s","952,64 m", lineBoxBch13,'top' )

      const lineBoxBch13s = [bch13Point ,[-7.43,108.25]];
      generateBox("740,30 Ha","1,285 m3/s","412,77 m", lineBoxBch13s,'top' )

      const lineBcd1 = [bch13Point,bcd1Point];
      generateBangunanPembagi('B.Cd 1','topright',lineBcd1,0);

      const lineBoxBcd1 = [bcd1Point ,[-7.6,108.15]];
      generateBox("145,80 Ha","0,253 m3/s","894,65 m", lineBoxBcd1,'top' )

      const lineBoxBcd1s = [bcd1Point ,[-7.5,108.35]];
      generateBox("560,80 Ha","0,974 m3/s","975,60 m", lineBoxBcd1s,'top' )

      const lineCd1ka = [bcd1Point,[-7.55, 108.25]];
      generateBoxPetak('6f6ea29b-9d1a-4c68-9e91-c2d2f621c450', 'Cd 1 Ka', lineCd1ka, 'right','golongan-a');

      const lineBcd2i = [bcd1Point,[-7.5,108.45],bcd2iPoint];
      generateBangunanSadap("B.Cd 2'",'centerright',lineBcd2i,0);

      const lineBcd2iKa = [bcd2iPoint,[bcd2iPoint[0], 108.4]];
      generateBoxPetak('', "Cd 2' Ka", lineBcd2iKa, 'left','golongan-a');

      const lineBcd2 = [bcd2iPoint,bcd2Point];
      generateBangunanSadap('B.Cd 2','centerright',lineBcd2,0);

      const lineBoxBcd2 = [bcd2Point ,[-7.92,108.5]]; 
      generateBox("512,20 Ha","0,889 m3/s","808,00 m", lineBoxBcd2,'top' )

      const lineCd2ka = [bcd2Point,[bcd2Point[0], 108.4]];
      generateBoxPetak('e38f2077-f1c2-4657-b1f7-f94860eb9cc2', 'Cd 2 Ka', lineCd2ka, 'left','golongan-a');

      const lineBcd3 = [bcd2Point,bcd3Point];
      generateBangunanSadap('B.Cd 3','centerright',lineBcd3,0);
      
      const lineBoxBch3 = [bcd3Point ,[-8.05,108.5]];
      generateBox("5461,10 Ha","0,801 m3/s","1794,77 m", lineBoxBch3,'top' )
      
      const lineCd3ka = [bcd3Point,[bcd3Point[0], 108.4]];
      generateBoxPetak('5b5d2385-912f-49c8-a55d-57d9a88a1593', 'Cd 3 Ka', lineCd3ka, 'left','golongan-a');

      const lineBcd4 = [bcd3Point,bcd4Point];
      generateBangunanPembagi('B.Cd 4','topright',lineBcd4,0);
      
      const lineBoxBcd4s = [bcd4Point ,[-8.2,108.6]];
      generateBox("155,70 Ha","589,01 m","0,270 m3/s", lineBoxBcd4s,'top' )

      const lineBoxBcd4 = [bcd4Point ,[-8.3,108.51]];
      generateBox("291,30 Ha","0,506 m3/s","594,68 m", lineBoxBcd4,'top' )

      const lineCd4ka = [bcd4Point,[bcd4Point[0], 108.4]];
      generateBoxPetak('709d62b6-ffbd-4005-82e0-fdee8adc1d72', 'Cd 4 Ka', lineCd4ka, 'left','golongan-a');

      const lineBkw1 = [bcd4Point,[-8.2, 108.67],bkw1Point];
      generateBangunanSadap('B.Kw 1','topright',lineBkw1,0);
      
      const lineBoxBkw1 = [bkw1Point ,[-8.45,108.72]];
      generateBox("93,90 Ha","0,163 m3/s","994,84 m", lineBoxBkw1,'top' )

      const lineKw1ki = [bkw1Point,[bkw1Point[0], 108.75]];
      generateBoxPetak('ea7da04a-9042-47db-9b0d-d3748c2d5886', 'Kw 1 Ki', lineKw1ki, 'right','golongan-a');
      
      const lineBkw2 = [bkw1Point,bkw2Point];
      generateBangunanSadap('B.Kw 2','topright',lineBkw2,0);

      const lineBoxBkw2 = [bkw2Point ,[-8.65,108.72]];
      generateBox("43,50 Ha","0,076 m3/s","1261,24 m", lineBoxBkw2,'top' )

      const lineKw2ki = [bkw2Point,[bkw2Point[0], 108.75]];
      generateBoxPetak('feb56ca0-aeaa-42c2-8c76-eeb81d677f3e', 'Kw 2 Ki', lineKw2ki, 'right','golongan-a');

      const lineBkw3 = [bkw2Point,bkw3Point];
      generateBangunanSadap('B.Kw 3','topright',lineBkw3,0);

      const lineKw3ki = [bkw3Point,[bkw3Point[0], 108.75]];
      generateBoxPetak('66edbdcf-368f-445c-bfe8-b70cd678b31e', 'Kw 3 Ki', lineKw3ki, 'right','golongan-a');

      const lineBcd5 = [bcd4Point,bcd5Point];
      generateBangunanSadap('B.Cd 5','centerright',lineBcd5,0);

      const lineBoxBcd5 = [bcd5Point ,[-8.45,108.5]];
      generateBox("67,60 Ha","0,117 m3/s","926,70 m", lineBoxBcd5,'top' )

      const lineCd5ka = [bcd5Point,[bcd5Point[0], 108.4]];
      generateBoxPetak('5ee4b7f0-9a2d-4992-804c-8b2e655cc9a1', 'Cd 5 Ka', lineCd5ka, 'left','golongan-a');

      const lineBcd6 = [bcd5Point,bcd6Point];
      generateBangunanSadap('B.Cd 6','centerleft',lineBcd6,0);

      const lineCd6ki = [bcd6Point,[-8.6,bcd6Point[1]]];
      generateBoxPetak('879741b3-b9a0-4ae0-9b4f-6a94b80fdc3e', 'Cd 6 Ki', lineCd6ki, 'bottom','golongan-a');

      const lineBcp1 = [bch13Point,bcp1Point];
      generateBangunanSadap('B.Cp 1','bottomright',lineBcp1,0);

      const lineBoxBcp1 = [bcp1Point,[-7.8, 108.15]];
      generateBox("43,90 Ha","0,076 m3/s","1330,08 m", lineBoxBcp1,'top' )

      const lineCp1ki = [bcp1Point,[bcp1Point[0], 108.25]];
      generateBoxPetak('f1b3b3b4-1b3b-4b3b-8b3b-3b3b3b3b3b3b', 'Cp 1 Ki', lineCp1ki, 'right','golongan-a');

      const lineCp1ka = [bcp1Point,[bcp1Point[0], 108.15]];
      generateBoxPetak('f1b3b3b4-1b3b-4b3b-8b3b-3b3b3b3b3b3b', 'Cp 1 Ka', lineCp1ka, 'left','golongan-a');

      const lineBcp2 = [bch13Point,bcp2Point];
      generateBangunanSadap('B.Cp 2','bottomleft',lineBcp2,0);

      const lineCp2ki = [bcp2Point,[bcp2Point[0], 108.15]];
      generateBoxPetak('6f544910-1339-449b-8b7d-30bae4ad09cb', 'Cp 2 Ki', lineCp2ki, 'left','golongan-a');

      // Petak B.Ch 12
      const lineBch12 = [bch13Point,bch12Point];
      generateBangunanPembagiDanSadap('B.Ch 12 (BC.I-IX)','topcenter',lineBch12);
      
      const lineBoxBch12 = [bch12Point ,[-7.32,108.1]];
      generateBox("10.764,65 Ha","20,765 m3/s","659,45 m", lineBoxBch12,'top' )
      
      const lineBch12ka = [bch12Point,[-7.35, 108]];
      generateBoxPetak('1bc59d88-36e0-4894-be1a-cb754e92495a', 'Ch 12 Ka', lineBch12ka, 'bottom','golongan-a');

      // Petak B.Ch 11
      const lineBch11 = [bch12Point,bch11Point];
      generateBangunanPembagi('B.Ch 11 (BC.I - VIII)','topcenter',lineBch11);

      const lineBoxBch11 = [bch11Point ,[-7.32,107.9]];
      generateBox("10.808,75 Ha","20,850 m3/s","1033,31 m", lineBoxBch11,'top' )
        
      const lineBoxBch11s = [bch11Point ,[-7.4,107.75]];
      generateBox("148,00 Ha","0,257 m3/s","145,80 m", lineBoxBch11s,'top' )

      const lineBnd1 = [bch11Point,bnd1Point];
      generateBangunanSadap('B.Nd 1','topleft',lineBnd1,0);

      const lineBoxBnd1 = [bnd1Point ,[-7.56,107.75]];
      generateBox("109,70 Ha","0,190 m3/s","958,59 m", lineBoxBnd1,'top' )

      const lineNd1ki = [bnd1Point,[-7.5, 107.85]];
      generateBoxPetak('46aa6793-3b60-4ea8-b35a-37fd19b498d3', 'Nd 1 Ki', lineNd1ki, 'right','golongan-c');

      const lineBnd2 = [bch11Point,bnd2Point];
      generateBangunanSadap('B.Nd 2','topleft',lineBnd2,0);

      const lineBoxBnd2 = [bnd2Point ,[-7.75,107.75]];
      generateBox("37,50 Ha","0,065 m3/s","702,00 m", lineBoxBnd2,'top' )

      const lineNd2ka = [bnd2Point,[-7.6, 107.75]];
      generateBoxPetak('8120ddad-135d-4df1-bb6a-7796494c0c2a', 'Nd 2 Ka', lineNd2ka, 'left','golongan-c');

      const lineBnd3 = [bch11Point,bnd3Point]; 
      generateBangunanSadap('B.Nd 3','topleft',lineBnd3,0);

      const lineNd3ki = [bnd3Point,[-7.8, 107.85]];
      generateBoxPetak('a0b103cd-8bbb-4afd-aec4-596ece1c7aa4', 'Nd 3 Ki', lineNd3ki, 'right','golongan-c');


      // Petak B.Ch 10
      const lineBch10 = [bch11Point,bch10Point];
      generateBangunanPembagiDanSadap('B.Ch 10 (BC.I - VII)','topcenter',lineBch10);

      const lineBoxlineBch10 = [bch10Point ,[-7.32,107.7]];
      generateBox("10.956,75 Ha","21,136 m3/s","801,46 m", lineBoxlineBch10,'top' )

      const lineBch10ka = [bch10Point,[-7.35, 107.6]];
      generateBoxPetak('921b4e09-ad3f-4f32-a9ff-819ec5bfcbcc', 'Ch 10 Ka', lineBch10ka, 'bottom','golongan-c');

      // Peta B.Ch 9
      const lineBch9 = [bch10Point,bch9Point];
      generateBangunanPembagiDanSadap('B.Ch 9 (BC.I - V / BSC.7)','topcenter',lineBch9);
    
      const lineBoxBch10 = [bch9Point ,[-7.39,107.45]];
      generateBox("10.990,35 Ha","21,201 m3/s","884,26 m", lineBoxBch10,'top' )

      const lineBch9ka = [bch9Point,[-7.35, 107.3]];
      generateBoxPetak('eb5eb0fb-0992-4f1d-817a-f512369c5de6', 'Ch 9 Ka', lineBch9ka, 'bottom','golongan-c');

      const lineBch9ki = [bch9Point,[-7.25, 107.3]];
      generateBoxPetak('daba68dc-9efc-4552-ad6f-74b90baba3a2', 'Ch 9 Ki', lineBch9ki, 'top','golongan-c');
      
      // Petak B.Ch 8
      const lineBch8 = [bch9Point,bch8Point];
      generateBangunanPembagiDanSadap('B.Ch 8 (BSc. 6)','topcenter',lineBch8);

      const lineBoxBch8 = [bch8Point ,[-7.39,107.15]];
      generateBox("11.036,25 Ha","21,289 m3/s","107,33 m", lineBoxBch8,'top' )

      const lineBch8ka = [bch8Point,[-7.35, 107]];
      generateBoxPetak('c0c3d64b-4151-4d33-8e1d-d1e11097c81c', 'Ch 8 Ka', lineBch8ka, 'bottom','golongan-c');
      
      // Petak B.Ch 7
      const lineBch7 = [bch8Point,bch7Point];
      generateBangunanPembagiDanSadap('B.Ch 7 (BSc. 5)','topcenter',lineBch7);

      const lineBoxBch7 = [bch7Point ,[-7.39,106.87]];
      generateBox("11.052,25 Ha","21,320 m3/s","367,76 m", lineBoxBch7,'top' )

      const lineBch7ki = [bch7Point,[-7.25, 106.8]];
      generateBoxPetak('74226493-211f-45a0-bad2-78b27fa49ea6', 'Ch 7 Ki', lineBch7ki, 'top','golongan-c');

      // Petak B.Ch 6
      const lineBch6 = [bch7Point,[-7.325, 106.65],bch6Point];
      generateBangunanPembagiDanSadap("B.Ch 6 (BSc. 5')",'centerleft',lineBch6);

      const lineBoxBch6 = [bch6Point ,[-7.45,106.7]];
      generateBox("11.091,75 Ha","21,396 m3/s","142,67 m", lineBoxBch6,'top' )

      const lineBch6ka = [bch6Point,[-7.5, 106.7]];
      generateBoxPetak('8bd4b5a0-ef22-4a52-96ba-24e5268b56ba', 'Ch 6 Ka', lineBch6ka, 'right','golongan-c');

      // Petak B.Ch 5
      const lineBch5 = [bch6Point,bch5Point];
      generateBangunanPembagi(" B.Ch 5 (BC.I-IV)",'centerleft',lineBch5);
      
      const lineBoxBch5 =  [bch5Point ,[-7.58,106.7]];
      generateBox("11.107,75 Ha","21,427 m3/s","467,28 m", lineBoxBch5,'top' )

      const lineBoxBch5s = [bch5Point ,[-7.66,106.74]];
      generateBox("78,8 Ha","0,137 m3/s","132,33 m", lineBoxBch5s,'top' )

      const lineBps1 = [bch5Point,bps1Point];
      generateBangunanSadap('B.Ps 1','bottomright',lineBps1,0);

      const lineBoxBps1 = [bps1Point ,[-7.6,106.93]];
      generateBox("50,8 Ha","0,088 m3/s","491,77 m", lineBoxBps1,'top' )

      const linePs1ka = [bps1Point,[-7.65, 106.85]];
      generateBoxPetak('6b83c438-4276-4ec7-9412-7f73090d5eef', 'Ps 1 Ka', linePs1ka, 'bottom','golongan-b');

      const lineBps2 = [bch5Point,bps2Point];
      generateBangunanSadap('B.Ps 2','bottomright',lineBps2,0);

      const linePs2 = [bps2Point,[-7.6, 107.15]];
      generateBoxPetak('54fc60cd-61b8-4a3a-a5bd-5b9df606c201', 'Ps 2', linePs2, 'right','golongan-b');

      // Petak B.Ch 4
      const lineBch4 = [bch6Point,bch4Point];
      generateBangunanPembagi('B.Ch 4 (BC.I-III)','centerleft',lineBch4);

      const lineBoxBch4 = [bch4Point ,[-7.73,106.7]];
      generateBox("11.341,15 Ha","21,877 m3/s","626,15 m", lineBoxBch4,'top' )

      const lineBoxBch4s = [bch4Point ,[-7.8,106.73]];
      generateBox("154,6 Ha","0,268 m3/s","417,94 m", lineBoxBch4s,'top' )

      const lineBgs1 = [bch4Point,bgs1Point];
      generateBangunanSadap('B.Gs 1','topcenter',lineBgs1,0);

      const lineBoxBgs1 = [bgs1Point ,[-7.86,106.98]];
      generateBox("114,6 Ha"," 0,199 m3/s","946,63 m", lineBoxBgs1,'top' )

      const lineGs1ka = [bgs1Point,[-7.85, 106.85]];
      generateBoxPetak('496505a7-f984-4614-8707-bc6a75ff06a1', 'Gs 1 Ka', lineGs1ka, 'bottom','golongan-b');

      const lineBgs2 = [bgs1Point,bgs2Point];
      generateBangunanSadap('B.Gs 2','bottomright',lineBgs2,0);

      const lineBoxBgs2 = [bgs2Point ,[-7.86,107.15]];
      generateBox("92,4 Ha","0,160 m3/s","649,89 m", lineBoxBgs2,'top' )

      const lineGs2ki = [bgs2Point,[-7.75, 107.06]];
      generateBoxPetak('09db72f8-b45b-4beb-bd99-24b560a6f8e7', 'Gs 2 Ki', lineGs2ki, 'top','golongan-b');

      const lineBgs3 = [bgs2Point,bgs3Point];
      generateBangunanSadap('B.Gs 3','bottomright',lineBgs3,0);

      const lineGs3ki = [bgs3Point,[-7.75, 107.27]];
      generateBoxPetak('2c91ef4e-a018-49c3-b7e7-9687aed6a168', 'Gs 3 Ki', lineGs3ki, 'top','golongan-b');

      // Petak B.Ch 3
      const lineBch3 = [bch4Point,bch3Point];
      generateBangunanPembagiDanSadap('B.Ch 3 (BSc. 2)','centerleft',lineBch3);
    
      const lineBch3ka = [bch3Point,[-8, 106.7]];
      generateBoxPetak('4943dc4e-cc8b-4c2d-88c7-8ff7f535bf6b', 'Ch 3 Ka', lineBch3ka, 'right','golongan-b');
      
      const lineBoxBc3 = [bch3Point ,[-7.95,106.71]];
      generateBox("11.341,15 Ha","21,877 m3/s","626,15 m", lineBoxBc3,'top' )

      // Petak B.Ch 2
      const lineBch2 = [bch3Point,bch2Point];
      generateBangunanPembagi('B.Ch 2 (BC.I-I)','centerleft',lineBch2);
    
      const lineBoxBch2 = [bch2Point ,[-8.13,106.71]];
      generateBox("11.361,15 Ha","21,916 m3/s","309,14 m", lineBoxBch2,'top' )
      
      const lineBoxBch2S = [bch2Point ,[-8.2,106.76]];
      generateBox("186,90 Ha","0,324 m3/s","59,92 m", lineBoxBch2S,'top' )

      const lineBms1 = [bch2Point,bms1Point];
      generateBangunanSadap('B.Ms 1','topcenter',lineBms1,0);

      const lineBoxBms1 = [bms1Point ,[-8.2,106.95]];
      generateBox("165.40 Ha","0.287 m3/s","338,62", lineBoxBms1,'top' )

      const linems1ka = [bms1Point,[-8.25, 106.85]];
      generateBoxPetak('68b473a4-d4a6-4282-9eee-549a2d35771a', 'Ms 1 Ka', linems1ka, 'bottom','golongan-a');
      const lineBms2 = [bms1Point,bms2Point];
      generateBangunanPembagi('B.Ms 2','bottomright',lineBms2,0);

      const lineBoxBpg1 = [bms2Point ,[-8.2,107.15]];
      generateBox("48,00 Ha","0,083 m3/s","711,32 m", lineBoxBpg1,'top' )

      const lineboxBpg1S = [bms2Point ,[-8.09,107]];
      generateBox("117.4 Ha","0,204 m3/s","502,99 m", lineboxBpg1S,'top' )

      const linebpg1 = [bms2Point,bpg1Point];
      generateBangunanSadap('B.Pg.1','topleft',linebpg1,0);

      const linePg1 = [bpg1Point,[-7.95, 107.06]];
      generateBoxPetak('', 'Pg 1', linePg1, 'top','golongan-a');

      const lineBms3 = [bms2Point,bms3Point];
      generateBangunanSadap('B.Ms 3','bottomright',lineBms3,0);

      const lineBoxBms3 = [bms3Point ,[-8.2,107.37]];
      generateBox("92.4 Ha","0,160 m3/s","649,89 m", lineBoxBms3,'top' )
      
      const lineMski = [bms3Point,[-8.15, 107.27]];
      generateBoxPetak('bdeb0403c-a9cf-4a4d-8d5f-bbbb50ba40e5', 'Ms 3 Ki', lineMski, 'top','golongan-a');

      const lineBms4 = [bms3Point,bms4Point];
      generateBangunanSadap("B.Ms 4'",'topcenter',lineBms4,0);
      
      const lineBoxBms4 = [bms4Point ,[-8.2,107.57]];
      generateBox("60,30 Ha","0,105 m3/s","305,39", lineBoxBms4,'top' )

      const lineSm4ika = [bms4Point,[-8.25, 107.49]];
      generateBoxPetak('d4fc54a7-bfb1-463f-ad35-4faee2247276', "Ms 4' Ka", lineSm4ika, 'bottom','golongan-a');

      const lineBms4i = [bms4Point,bms4iPoint];
      generateBangunanSadap('B.Ms 4','topcenter',lineBms4i,0);

      const lineBoxBms4i = [bms4iPoint ,[-8.26,107.82]];
      generateBox("23,50 Ha","0,041 m3/s","580,01 m", lineBoxBms4i,'top' )

      const lineBms4ka = [bms4iPoint,[-8.25, 107.67]];
      generateBoxPetak('1ae607ad-b2ec-46e4-9463-d30a1787a2ba', "Ms 4 Ka", lineBms4ka, 'bottom','golongan-a');

      const lineBms5 = [bms4iPoint,bms5Point];
      generateBangunanSadap('B.Ms 5','topcenter',lineBms5,0);

      const lineBms5ki = [bms5Point,[-8.15, 107.89]];
      generateBoxPetak('38ad1ff7-d21d-4f21-ad1d-e1b09a8de6ed', 'Ms 5 Ki', lineBms5ki, 'top','golongan-a');

      const lineBms5ka = [bms5Point,[-8.2, 107.99]];
      generateBoxPetak('7fda2b19-669c-4ac9-a123-861f0447fe30', 'Ms 5 Ka', lineBms5ka, 'right','golongan-a');

      // Petak B.CH 1
      const lineBch1 = [bch2Point,bch1Point];
      generateBangunanPembagiDanSadap("B.Ch 1 (BSc. 1')",'centerleft',lineBch1);
    
      const lineBch1ka = [bch1Point,[-8.4, 106.7]];
      generateBoxPetak('53df7c95-0263-45ec-9197-40826c9826f4', 'Ch 1 Ka', lineBch1ka, 'right','golongan-a');

      const lineBoxBch1 = [bch1Point ,[-8.35,106.71]];
      generateBox("11.548,05 Ha","22.276 m3/s","770,04  m", lineBoxBch1,'top' )

      // Petak B.Ch 0
      AliranMasuk([bch0Point[0]+0.1,bch0Point[1]-0.06],270);
      AliranMasuk([bch0Point[0]-0.03,bch0Point[1]+0.05],0);

      const lineBch0 = [bch1Point,bch0Point];
      generateBangunanPembagi('B.Ch 0 (BC.I-0)','topright',lineBch0); 
      
      const lineBoxBch0 = [bch0Point ,[-8.555,106.71]];
      generateBox("11.902  Ha","22.315m3/s"," 275,89 m", lineBoxBch0,'top' )

      // Petak Induk Sidareja
      const lineIndukSidareja = [bch0Point,induksidareja];
      generateBangunanPembagi('Induk Sidareja','topright',lineIndukSidareja);

      // Petak Manganti
      const lineManganti = [bch0Point,maganti];
      generateBangunanPembagi('Manganti','centerleft',lineManganti);

      generateTextSaluranPrimer('S A L.  I N D U K    C I H A U R', [-7.8,106.6], 270)
      generateTextSaluranSekunder('SAL.SEKUNDER MARGASARI', [-8.25,107.05], 0)
      generateTextSaluranSekunder('SAL.SEKUNDER GAYAM SARI', [-7.78,106.85], 0)
      generateTextSaluranSekunder('SAL.SEKUNDER PUDAKSARI', [-7.65,107], 0)
      generateTextSaluranSekunder('SAL.SEK.NUSADADI', [-7.65, 107.83], 270)
      generateTextSaluranPrimer("S A L U R A N   I N D U K   C I H A U R", [-7.3, 108.33], 0)
      generateTextSaluranSekunder('SAL.SEK.CIDURIAN', [-7.75, 108.55], 270)
      generateTextSaluranSekunder('SAL.SEK.KEDUNGWRINGIN', [-8.65, 108.63], 270)
      generateTextSaluranPrimer('SAL.INDUK SIDAREJA', [-8.6,106.89], 0)
      generateTextSaluranPrimer('BENDUNG MANGANTI', [-8.6,106], 0)
      generateTextSaluranSekunder('SAL.SEK.CIPARI', [-7.8,108.22], 270)
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
        generateBoxPetak('9d05c2bc-5924-403d-9195-6c30516d5ca0', 'Ch 27 Ki', lineCh27Ki, 'top','golongan-b');

        // Petak B.Ch 26
        const lineCw2Ka = [bcw2Point, [bcw2Point[0], 111.72]];
        generateBoxPetak('359fd776-b065-4762-b0a6-f47ddc8f40c4', 'Cw 2 Ka', lineCw2Ka, 'left','golongan-b');
      
        const lineBcw2 = [
            bch26Point, 
            bcw2Point
        ];
        generateBangunanSadap('B.Cw 2', 'centerright', lineBcw2, 0);

        const lineCw1Ka = [bcw1Point, [bcw1Point[0], 111.72]];
        generateBoxPetak('0c81b0ec-22c5-4789-8231-54052a09df4f', 'Cw 1 Ka', lineCw1Ka, 'left','golongan-b');

        const lineBoxCw1 = [bcw1Point ,[bcw1Point[0]-0.1,bcw1Point[1]-0.05]];
        generateBox("94,00 Ha","0,163 m3/s","502,00 m", lineBoxCw1,'top' )

        const lineBcw1 = [
            bch26Point, 
            bcw1Point
        ];
        generateBangunanSadap('B.Cw 1', 'centerright', lineBcw1, 0);

        const lineCh26Ka = [bch26Point, [-6.65, 111.95]];
        generateBoxPetak('81d3ab5e-3889-48f9-a904-7b777286c997', 'Ch 26 Ka', lineCh26Ka, 'bottom','golongan-b');
        
        const lineBoxCh26 = [bch26Point ,[bch26Point[0],bch26Point[1]+0.13]];
        generateBox("8.959,15 Ha","17,282 m3/s","34,53 m", lineBoxCh26,'top' )

        const lineBoxCh26s = [bch26Point ,[bch26Point[0]-0.15,bch26Point[1]-0.05]];
        generateBox("130,00 Ha","0,226 m3/s","1101,75 m", lineBoxCh26s,'top' )
        
        // Petak B.Ch 25
        const lineCh25Ka = [bch25Point, [-6.63, bch25Point[1]]];
        generateBoxPetak('1111b9da-59f7-4590-be94-0249c3a94ba6', 'Ch 25 Ka', lineCh25Ka, 'bottom','golongan-b');

        const lineBoxCh25 = [bch25Point ,[bch25Point[0],bch25Point[1]+0.15]];
        generateBox("9.149,15 Ha","17,649 m3/s","1012,93 m", lineBoxCh25,'top' )

        // Petak B.Ch 24
        const lineCh24Ka = [bch24Point, [-6.63, bch24Point[1]]];
        generateBoxPetak('72740a1e-8f67-43ec-9925-2f0340c4129f', 'Ch 24 Ka', lineCh24Ka, 'bottom','golongan-b');

        const lineBoxCh24 = [bch24Point ,[bch24Point[0],bch24Point[1]+0.15]];
        generateBox("9.175,25 Ha","17,699 m3/s","1192,77 m", lineBoxCh24,'top' )

        // Petak B.Ch 23
        const lineCh23Ka = [bch23Point, [-6.63, bch23Point[1]]];
        generateBoxPetak('e028c976-3cbf-4c8a-8668-5f7b31850ae1', 'Ch 23 Ka', lineCh23Ka, 'bottom','golongan-b');

        const lineBoxCh23 = [bch23Point ,[bch23Point[0],bch23Point[1]+0.15]];
        generateBox("9.216,75Ha","17,779m3/s","1246,88 m", lineBoxCh23,'top' )

        // Petak B.Ch 22
        const lineCh22Ka = [bch22Point, [-6.63, bch22Point[1]]];
        generateBoxPetak('0fb63ac6-79c5-4947-a2ba-b88d838e93c7', 'Ch 22 Ka', lineCh22Ka, 'bottom','golongan-b');

        const lineBoxCh22 = [bch22Point ,[bch22Point[0],bch22Point[1]+0.15]];
        generateBox("9.274,15 Ha","17,889 m3/s","457,08 m", lineBoxCh22,'top' )

        // Petak B.Ch 21
        const lineCh21Ka = [bch21Point, [-6.63, bch21Point[1]]];
        generateBoxPetak('938e9429-883d-4b81-b703-ca4906e20971', 'Ch 21 Ka', lineCh21Ka, 'bottom','golongan-b');

        const lineBoxCh21 = [bch21Point ,[bch21Point[0],bch21Point[1]+0.15]];
        generateBox("9.324,15 Ha","17,986 m3/s","691,86 m", lineBoxCh21,'top' )

        // Petak B.Ch 20
        const lineCh20Ka = [bch20Point, [-6.63, bch20Point[1]]];
        generateBoxPetak('856a6944-f7fa-41e5-9d13-62dedf4a3faf', 'Ch 20 Ka', lineCh20Ka, 'bottom','golongan-b');

        const lineBoxCh20 = [bch20Point ,[bch20Point[0],bch20Point[1]+0.15]];
        generateBox("9.359,15 Ha","18.054 m3/s","842,47 m", lineBoxCh20,'top' )

        // Petak B.Ch 19
        const lineCh19Ka = [bch19Point, [-6.63, bch19Point[1]]];
        generateBoxPetak('2cb54ac1-5e76-456b-87ef-c024b35e7f8a', 'Ch 19 Ka', lineCh19Ka, 'bottom','golongan-b');

        const lineBoxCh19 = [bch19Point ,[bch19Point[0],bch19Point[1]+0.15]];
        generateBox("9.433,15 Ha","18,197 m3/s","104,88 m", lineBoxCh19,'top' )

        // Petak B.Ch 18
        const lineKc2Ki = [bkc2Point, [bkc2Point[0], 109.4]];
        generateBoxPetak('ea80ef9a-70db-450b-8a8c-73e9126f8a44', 'Kc 2 Ki', lineKc2Ki, 'right','golongan-b');
        
        const lineBoxBc18 = [bch18Point ,[bch18Point[0],bch18Point[1]+0.15]];
        generateBox("9.463,15 Ha","18.255 m3/s","490,02 m", lineBoxBc18,'top' )

        const lineBkc2 = [
            bch18Point, 
            bkc2Point
        ];
        generateBangunanSadap('B.Kc 2', 'centerleft', lineBkc2, 0);
        
        const lineBoxKc2 = [bkc2Point, [bkc2Point[0]+0.03, bkc2Point[1]+0.05]];
        generateBox("54,00 Ha", "0,094 m3/s", "788,59 m", lineBoxKc2, 'top')

        const lineKc1Ka = [bkc1Point, [bkc1Point[0], 109.25]];
        generateBoxPetak('b24a7e0a-70c7-41f8-9ebe-582fff3ced85', 'Kc 1 Ka', lineKc1Ka, 'left','golongan-b');

        const lineBkc1 = [
            bch18Point, 
            bkc1Point
        ];
        generateBangunanSadap('B.Kc 1', 'centerright', lineBkc1, 0);

        const lineBoxKc1 = [bkc1Point, [bkc1Point[0]+0.03, bkc1Point[1]+0.05]];
        generateBox("122,00 Ha", "0,212 m3/s", "393,90 m", lineBoxKc1, 'top')
        
        const lineCh18Ka = [bch18Point, [-6.68, 109.43]];
        generateBoxPetak('063e7557-ee1b-43da-afa6-38d8f81e2a13', 'Ch 18 Ka', lineCh18Ka, 'bottom','golongan-b');

        // Petak B.Ch 17
        const lineCh17Ka = [bch17Point, [bch17Point[0], 109]];
        generateBoxPetak('1fcae390-0b0e-4ac1-bfca-fc3fa5e9177d', 'Ch 17 Ka', lineCh17Ka, 'right','golongan-a');

        const lineBoxCh17 = [bch17Point, [bch18Point[0]-0.07, bch18Point[1]-0.15]];
        generateBox("9.599,25 Ha", "18.517 m3/s", "1895,32 m", lineBoxCh17, 'top')

        // Petak B.Ch 16
        const lineCh16Ka = [bch16Point, [bch16Point[0], 109]];
        generateBoxPetak('33fb18ff-1bf1-44bd-bcc8-bba6f6d1d5ed', 'Ch 16 Ka', lineCh16Ka, 'right','golongan-a');

        const lineBoxCh16 = [bch16Point, [bch16Point[0]+ 0.08, bch16Point[1]+0.05]];
        generateBox("9.653,95 Ha", "18.623 m3/s", "1524,27 m", lineBoxCh16, 'top')

        // Petak B.Ch 15
        generateTextSaluranSekunder('SAL.SEK.SIDAREJA', [-7.165, 109.44], 0)

        const lineSr5Ka = [bsr5Point, [bsr5Point[0] - 0.06, bsr5Point[1]]];
        generateBoxPetak('c7c1ae72-c5f5-4485-bb13-886785a919c7', 'Sr 5 Ka', lineSr5Ka, 'bottom','golongan-a');

        const lineBoxSr4 = [bsr4Point, [bsr4Point[0], bsr4Point[1] + 0.08]];
        generateBox("63,90 Ha", "0,111 m3/s", "472,31 m", lineBoxSr4, 'top')

        const lineSr4Ka = [bsr4Point, [bsr4Point[0] - 0.06, bsr4Point[1]]];
        generateBoxPetak('0402022b-6f4c-48c8-998e-28f813d2732e', 'Sr 4 Ka', lineSr4Ka, 'bottom','golongan-a');
        
        const lineBoxSr3 = [bsr3Point, [bsr3Point[0], bsr3Point[1] + 0.08]];
        generateBox("122,90 Ha", "0,213 m3/s", "549,01 m", lineBoxSr3, 'top')

        const lineSr3Ka = [bsr3Point, [bsr3Point[0] - 0.06, bsr3Point[1]]];
        generateBoxPetak('2ae66f2e-5a6f-4a7a-be5f-79905adb7339', 'Sr 3 Ka', lineSr3Ka, 'bottom','golongan-a');

        const lineBoxSr2 = [bsr2Point, [bsr2Point[0], bsr2Point[1] + 0.08]];
        generateBox("174,40 Ha", "0,303 m3/s", "626,10 m", lineBoxSr2, 'top')

        const lineSr2Ka = [bsr2Point, [bsr2Point[0] - 0.06, bsr2Point[1]]];
        generateBoxPetak('ff5f37d4-9b2c-47af-9800-f90f807de06c', 'Sr 2 Ka', lineSr2Ka, 'bottom','golongan-a');

        const lineBoxSr1 = [bsr1Point, [bsr1Point[0], bsr1Point[1] + 0.08]];
        generateBox("204,00 Ha", "0,354 m3/s", "802,78 m", lineBoxSr1, 'top')

        const lineSr1Ka = [bsr1Point, [bsr1Point[0] - 0.06, bsr1Point[1]]];
        generateBoxPetak('1fcae390-0b0e-4ac1-bfca-fc3fa5e9167d', 'Sr 1 Ka', lineSr1Ka, 'bottom','golongan-a');

        const lineBoxBch15s = [bch15Point, [-7.125, 109]];
        generateBox("297,00 Ha", "0,516 m3/s", "263,61 m", lineBoxBch15s, 'top')

        const lineBoxBch15 = [bch15Point, [-7.1, 108.87]];
        generateBox("9.708,95 Ha", "18.729 m3/s", "420,64 m", lineBoxBch15, 'top')

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
      const bch27Point = [-6.55, 112];
      const bch28Point = [bch27Point[0], 112.3];
      const bch29Point = [bch27Point[0], 112.4];
      const bch30iPoint = [bch27Point[0], 112.55];
      const bch30Point = [bch27Point[0], 112.7];
      const bch31Point = [bch27Point[0], 113];
      const bch32Point = [bch27Point[0], 113.3];
      const bch33Point = [bch27Point[0], 113.6];
      const bch34Point = [bch27Point[0], 113.9];
      const bch35Point = [bch27Point[0], 114.1];
      const bkr1Point = [-7,bch28Point[1]];
      const bab1Point = [-7,bch30Point[1]];
      const bkg1Point = [-6.88,bch31Point[1]];
      const bkg2Point = [-7.2,bch31Point[1]];
      const bpu1Point = [-6.78,bch32Point[1]];
      const bpu2Point = [-6.88,bch32Point[1]];
      const bpu3Point = [-7,bch32Point[1]];
      const bss1Point = [-6.78, bch33Point[1]];
      const bss2Point = [-6.98, bch33Point[1]];
      const bku1Point = [-7.05, bch34Point[1]];
      const bku2Point = [-7.15, bch34Point[1]];
      const bku3Point = [-7.30, bch34Point[1]];
      const bku4Point = [-7.51, bch34Point[1]];
      const bct1Point = [-7.61, 114.15];
      const bct2Point = [-7.71, 114.15];
      const bct3Point = [-7.81, 114.15];
      const bku5Point = [-7.68, bch34Point[1]];
      const bku6Point = [-7.9, bch34Point[1]];
      const bss3Point = [-7.1, bch33Point[1]];
      const bpwd1Point = [-7.35,113.3]
      const bpwd2Point = [-7.53,113.3]
      const bss4Point = [-7.25, bch33Point[1]];
      const bss5Point = [-7.43, bch33Point[1]];
      const bss6Point = [-7.6, bch33Point[1]];
      const bss7Point = [-7.75, bch33Point[1]];
      const bss8Point = [-7.95, 113.45];
      const bss9Point = [-7.95, 113.29];
      const bss10Point = [-7.95, 113.13];

      // Petak B.Ch 35
      const lineCh35Ka = [bch35Point, [-6.65, 114.1]];
      generateBoxPetak('402db369-4de6-4f0d-91d3-b073dfe45ceb', 'Ch 35 Ka', lineCh35Ka, 'bottom','golongan-b');

      const lineBoxCh35 = [bch35Point ,[bch35Point[0],bch35Point[1]+0.15]];
      generateBox("6.853,25 Ha","13,220 m3/s","1758,48 m", lineBoxCh35,'top' )

      // Petak B.Ch 34
      const lineCh34Ka = [bch34Point, [-6.65, 113.9]];
      generateBoxPetak('ea08461a-3232-494e-a22b-0a0887aae200', 'Ch 34 Ka', lineCh34Ka, 'bottom','golongan-b');

      const lineBoxCh34 = [bch34Point ,[bch34Point[0],bch34Point[1]+0.1]];
      generateBox("6.895,25 Ha","13.301 m3/s","846,02 m", lineBoxCh34,'top' )


      // Petak B.Ch 33
      const lineCh33ka = [bch33Point, [-6.65, 113.72]];
      generateBoxPetak('a487d155-d935-4ce2-b541-9783a2045481', 'Ch 33 Ka', lineCh33ka, 'bottom','golongan-b');

      const lineBoxCh33 = [bch33Point ,[bch33Point[0],bch33Point[1]+0.15]];
      generateBox("6.919,25 Ha","13.347 m3/s","973,67 m", lineBoxCh33,'top' )

      const lineBoxCh33s = [bch33Point ,[bch33Point[0]-0.15,bch33Point[1]-0.05]];
      generateBox("1.157,00 Ha","2,009 m3/s","391,65 m", lineBoxCh33s,'top' )

      const lineBss1 = [bch33Point, [-6.78, 113.6]];
      generateBangunanSadap('B.Ss 1', 'centerright', lineBss1, 0);

      const lineBoxBss1 = [bss1Point ,[bss1Point[0] - 0.1,bss1Point[1]+0.05]];
      generateBox("1.111,00 Ha","1,929 m3/s","377,70 m", lineBoxBss1,'top' )

      const lineSs1ka = [bss1Point, [-6.78, 113.5]];
      generateBoxPetak('b5927429-e2f8-4cdd-8d1f-dbeb93f56a59', 'Ss 1 Ka', lineSs1ka, 'left','golongan-b');

      const lineBss2 = [bss1Point, bss2Point];
      generateBangunanPembagi('B.Ss 2', 'topleft', lineBss2, 0);

      const lineBoxBss2 = [bss2Point ,[bss2Point[0] - 0.1,bss2Point[1]+0.05]];
      generateBox("552,00 Ha","0,958 m3/s","497,28 m", lineBoxBss2,'top' )

      const lineBoxBss2s = [bss2Point ,[bss2Point[0],bss2Point[1]+0.15]];
      generateBox("559,00 Ha","0,970 m3/s","454,34 m", lineBoxBss2s,'top' )

      const lineBku1 = [bss2Point,[-6.98,113.9], bku1Point];
      generateBangunanSadap('B.Ku 1', 'topright', lineBku1, 0);

      const lineBoxBku1 = [bku1Point ,[bku1Point[0] - 0.07,bku1Point[1]+0.05]];
      generateBox("515,00 Ha","0,894 m3/s","654,24 m", lineBoxBku1,'top' )

      const lineKu1ki = [bku1Point, [-7.05, 113.95]];
      generateBoxPetak('5e57ed50-198d-45fb-b267-102ee0f53ab3', 'Ku 1 Ki', lineKu1ki, 'right','golongan-b');

      const lineBku2 = [bku1Point, bku2Point];
      generateBangunanSadap('B.Ku 2', 'topright', lineBku2, 0);

      const lineBoxBku2 = [bku2Point ,[bku2Point[0] - 0.1,bku2Point[1]+0.05]];
      generateBox("482,00 Ha","0,837 m3/s","734,04 m", lineBoxBku2,'top' )

      const lineKu2ki = [bku2Point, [-7.15, 113.95]];
      generateBoxPetak('df3f9266-50d3-4419-b8d4-75de4d0a0d8d', 'Ku 2 ki',lineKu2ki,'right','golongan-b')

      const lineBku3 =  [bku2Point,bku3Point]
      generateBangunanSadap('B.Ku 3','topright',lineBku3,0)

      const lineBoxBku3 = [bku3Point ,[bku3Point[0] - 0.1,bku3Point[1]+0.05]];
      generateBox("379,00 Ha","0,658 m3/s","791,20 m", lineBoxBku3,'top' )

      const lineKu3ki = [bku3Point,[-7.3,113.95]]
      generateBoxPetak('521757f3-3a09-4875-9bb7-02c8b7af073a','Ku 3 Ki',lineKu3ki,'right','golongan-b')

      const lineKu3ka = [bku3Point,[-7.3,113.85]]
      generateBoxPetak('479936f3-e3fb-4b59-980e-aaa904869823','Ku 3 Ka',lineKu3ka,'left','golongan-b')

      const lineBku4 = [bku3Point,bku4Point]
      generateBangunanPembagi('B.Ku 4','topright',lineBku4,0)
      
      const lineBoxBku4 = [bku4Point ,[bku4Point[0] - 0.1,bku4Point[1]-0.05]];
      generateBox("189,00 Ha","0,328 m3/s","1280,97 m", lineBoxBku4,'top' )

      const lineBoxBku4s = [bku4Point ,[bku4Point[0],bku4Point[1]+0.2]];
      generateBox("105,00 Ha","0,182 m3/s","672,44 m", lineBoxBku4s,'top' )

      const lineBku4ka = [bku4Point,[-7.51,113.82]]
      generateBoxPetak('923a072a-e3ce-44f7-90fa-410287ab2e78','Ku 4 Ka',lineBku4ka,'left','golongan-b')

      const lineBku4ki = [bku4Point,[-7.56,113.95]]
      generateBoxPetak('e9346ec5-145c-4e0e-86a1-f2aaee47b919','Ku 4 Ki',lineBku4ki,'right','golongan-b')

      const lineBct1 = [bku4Point,[-7.51,114.15],bct1Point]
      generateBangunanSadap('B.Ct 1','topright',lineBct1,0)

      const lineBoxBct1 = [bct1Point ,[bct1Point[0] - 0.07,bct1Point[1]+0.05]];
      generateBox("64,00 Ha","0,111 m3/s","892,47 m", lineBoxBct1,'top' )

      const lineCt1Ki = [bct1Point,[-7.61,114.3]]
      generateBoxPetak('bfbaeab1-a6f3-4992-ac03-05bd697c186b','Ct 1 Ki',lineCt1Ki,'right','golongan-b')

      const lineBct2 = [bct1Point,bct2Point]
      generateBangunanSadap('B.Ct 2','topright',lineBct2,0)

      const lineBoxBct2 = [bct2Point ,[bct2Point[0] - 0.07,bct2Point[1]+0.05]];
      generateBox("30,00 Ha","0,052 m3/s","932,13 m", lineBoxBct2,'top' )

      const lineCt2ki = [bct2Point,[-7.71,114.3]]
      generateBoxPetak('68b25135-e797-44e0-91dc-4a8aff0d6167','Ct 2 Ki',lineCt2ki,'right','golongan-b')

      const lineBct3 = [bct2Point,bct3Point]
      generateBangunanSadap('B.Ct 3','topright',lineBct3,0)

      const lineCt3ki = [bct3Point,[-7.81,114.3]]
      generateBoxPetak('43d94725-d5a4-468c-90b7-84f180545740','Ct 3 Ki',lineCt3ki,'right','golongan-b')

      const lineBku5 = [bku4Point,bku5Point]
      generateBangunanSadap('B.Ku 5','topright',lineBku5,0)

      const lineBoxBku5 = [bku5Point ,[bku5Point[0] - 0.1,bku5Point[1]+0.05]];
      generateBox("110,00 Ha","0,191 m3/s","683,23 m", lineBoxBku5,'top' )

      const lineBku5ka = [bku5Point,[-7.68,113.82]]
      generateBoxPetak('b0b345ab-6c5f-41a4-82e4-387e65841910','Ku 5 Ka',lineBku5ka,'left','golongan-b')

      const lineBku5ki = [bku5Point,[-7.68,113.95]]
      generateBoxPetak('27ff9142-72c6-4706-8dbb-919b31b02598','Ku 5 Ki',lineBku5ki,'right','golongan-b')

      const lineBku6 = [bku5Point,bku6Point]
      generateBangunanSadap('B.Ku 6','topright',lineBku6,0)

      const lineBku6ka = [bku6Point,[-7.9,113.82]]
      generateBoxPetak('7c632fb0-9ff9-4072-86d1-6f9086eb2e1e','Ku 6 Ka',lineBku6ka,'left','golongan-b')

      const lineBku6ki = [bku6Point,[-7.9,113.95]]
      generateBoxPetak('731b5fa6-04a1-461d-aadd-b76359d0d9ac','Ku 6 Ki',lineBku6ki,'right','golongan-b')

      const lineBss3 = [bss2Point, bss3Point];
      generateBangunanPembagi('B.Ss 3', 'topcenter', lineBss3, 0);

      const lineBoxBss3 = [bss3Point ,[bss3Point[0] - 0.1,bss3Point[1]+0.05]];
      generateBox("376,00 Ha","0,653 m3/s","722,72 m", lineBoxBss3,'top' )

      const lineBoxBss3s = [bss3Point ,[bss3Point[0],bss3Point[1]-0.2]];
      generateBox("134,00 Ha","0,233 m3/s","409,42 m", lineBoxBss3s,'top' )

      const lineSs3ka = [bss3Point, [-7.15, 113.5]];
      generateBoxPetak('71a032a2-7a71-4514-bb49-ffda318cb838', 'Ss 3 Ka', lineSs3ka, 'left','golongan-b');

      const linePwd1 = [bss3Point,[-7.1,113.3],bpwd1Point];
      generateBangunanSadap('B.Pwd 1', 'topright', linePwd1, 0);
      
      const lineBoxPwd1 = [bpwd1Point ,[bpwd1Point[0]- 0.1,bpwd1Point[1]-0.05]];
      generateBox("96,00 Ha","0,167 m3/s","771,96 m", lineBoxPwd1,'top' )

      const linepwd1ki = [bpwd1Point,[-7.35,113.35]];
      generateBoxPetak('4b377fab-3224-4132-8d4b-05e04ebf27c4', 'Pwd 1 Ki', linepwd1ki, 'right','golongan-b');

      const linePwd2  = [bpwd1Point,bpwd2Point];
      generateBangunanSadap('B.Pwd 2', 'centerright', linePwd2, 0);

      const linepwd2ka = [bpwd2Point,[-7.53,113.2]];
      generateBoxPetak('70259b90-92f0-40d7-b0bb-5b98bb53b334', 'Pwd 2 Ka', linepwd2ka, 'left','golongan-b');

      const lineBss4 = [bss3Point, bss4Point];
      generateBangunanSadap('B.Ss 4', 'centerright', lineBss4, 0);

      const lineBoxBss4 = [bss4Point ,[bss4Point[0] - 0.1,bss4Point[1]+0.05]];
      generateBox("335,00 Ha","0,528 m3/s","1124,53 m", lineBoxBss4,'top' )

      const lineSs4ka = [bss4Point, [-7.25, 113.5]];
      generateBoxPetak('431efa50-fa6b-4a47-a2ac-18949ffb7e43', 'Ss 4 Ka', lineSs4ka, 'left','golongan-b');

      const lineBss5 = [bss4Point, bss5Point];
      generateBangunanSadap('B.Ss 5', 'topright', lineBss5, 0);

      const lineBoxBss5 = [bss5Point ,[bss5Point[0] - 0.1,bss5Point[1]+0.05]];
      generateBox("285,00 Ha","0,495 m3/s","567,25 m", lineBoxBss5,'top' )
      
      const lineSs5ki = [bss5Point, [-7.43, 113.68]];
      generateBoxPetak('84cd82f0-11d5-4f56-9117-df1ab0440ddc', 'Ss 5 Ki', lineSs5ki, 'right','golongan-b');

      const lineSs5ka = [bss5Point, [-7.43, 113.5]];
      generateBoxPetak('6c0f7a2b-8bb9-4927-9567-d6cd98bc31c1', 'Ss 5 Ka', lineSs5ka, 'left','golongan-b');

      const lineBss6 = [bss5Point, bss6Point];
      generateBangunanSadap('B.Ss 6', 'topright', lineBss6, 0);

      const lineBoxBss6 = [bss6Point ,[bss6Point[0] - 0.1,bss6Point[1]+0.05]];
      generateBox("230,00 Ha","0,399 m3/s","822,88 m", lineBoxBss6,'top' )

      const lineSs6ka = [bss6Point, [-7.6, 113.5]];
      generateBoxPetak('2d96e83f-5f19-4b75-a5d6-e4d1e4ce2a00', 'Ss 6 Ka', lineSs6ka, 'left','golongan-b');

      const lineSS6ki = [bss6Point, [-7.6, 113.68]];
      generateBoxPetak('9e38c0c3-98eb-4a8c-b269-5592430d50e4', 'Ss 6 Ki', lineSS6ki, 'right','golongan-b');

      const lineBss7 = [bss6Point, bss7Point];
      generateBangunanSadap('B.Ss 7', 'topright', lineBss7, 0);

      const lineBoxBss7 = [bss7Point ,[bss7Point[0] - 0.1,bss7Point[1]+0.05]];
      generateBox("193,00 Ha","0,335 m3/s","364,17 m", lineBoxBss7,'top' )

      const lineSs7ka = [bss7Point, [-7.75, 113.5]];
      generateBoxPetak('9ad7ceb2-423a-4407-84fd-b834767d5743', 'Ss 7 Ka', lineSs7ka, 'left','golongan-b');

      const lineBss8 = [bss7Point,[-7.95, bch33Point[1]], bss8Point];
      generateBangunanSadap('B.Ss 8', 'topright', lineBss8, 0);

      const lineBoxBss8 = [bss8Point ,[bss8Point[0],bss8Point[1]-0.08]];
      generateBox("163,00 Ha","0,283 m3/s","470,80 m", lineBoxBss8,'top' )

      const lineBss8ka = [bss8Point, [-7.88, 113.45]]; 
      generateBoxPetak('620311e0-2cae-4fc2-bef7-867dcf39c872', 'Ss 8 Ka', lineBss8ka, 'top','golongan-b');

      const lineBss9 = [bss8Point, bss9Point];
      generateBangunanSadap('B.Ss 9', 'topright', lineBss9, 0);

      const lineBoxBss9 = [bss9Point ,[bss9Point[0],bss9Point[1]-0.08]];
      generateBox("88,00 Ha","0,153 m3/s","551,92 m", lineBoxBss9,'top' )

      const lineBss9ka = [bss9Point, [-7.88, 113.29]];
      generateBoxPetak('766b899c-1765-41a6-bf38-b703e103a266', 'Ss 9 Ka', lineBss9ka, 'top','golongan-b');

      const lineBss9ki = [bss9Point, [-7.98, 113.29]];
      generateBoxPetak('8775edb0-0bea-44e7-be1a-4f77130ad247', 'Ss 9 Ki', lineBss9ki, 'bottom','golongan-b');

      const lineBss10 = [bss9Point, bss10Point];
      generateBangunanSadap('B.Ss 10', 'topright', lineBss10, 0);

      const lineBss10ka = [bss10Point, [-7.88, 113.13]];
      generateBoxPetak('484985b5-5ebe-4dbd-9bea-093ea0876dc9', 'Ss 10 Ka', lineBss10ka, 'top','golongan-b');

      const lineBss10ki = [bss10Point, [-7.98, 113.13]];
      generateBoxPetak('447e2d39-429b-4620-bbd4-af807df7f642', 'Ss 10 Ki', lineBss10ki, 'bottom','golongan-b');


      // Petak B.Ch 32
      const lineCh32ka = [bch32Point, [-6.65, 113.42]];
      generateBoxPetak('f97df597-83f3-4d08-a224-f0056cc00b92', 'Ch 32 Ka', lineCh32ka, 'bottom','golongan-b');

      const lineBoxCh32 = [bch32Point, [bch32Point[0], bch32Point[1] + 0.2]];
      generateBox("8.118,25 Ha", "15,660 m3/s", "572,23 m", lineBoxCh32, 'top')
      
      const lineBoxCh32s = [bch32Point, [bch32Point[0]-0.15,bch32Point[1] - 0.05]];
      generateBox("251,00 Ha", " 0,436 m3/s", "567,79 m", lineBoxCh32s, 'top')

      const lineBpu1 = [bch32Point, bpu1Point];
      generateBangunanSadap('B.Pu 1', 'centerright', lineBpu1, 0);

      const lineBoxBpu1 = [bpu1Point, [bpu1Point[0] - 0.08, bpu1Point[1] + 0.05]];
      generateBox("179,00 Ha", "0,311 m3/s", "536,19 m", lineBoxBpu1, 'top')

      const linePu1ka= [bpu1Point, [-6.78, 113.2]];
      generateBoxPetak('7dc8f607-b626-4370-8b81-1e3b19ba2562', 'Pu 1 Ka', linePu1ka, 'left','golongan-b');

      const linebpu2 = [bch32Point, bpu2Point];
      generateBangunanSadap('B.Pu 2', 'centerleft', linebpu2, 0);

      const lineBoxBpu2 = [bpu2Point, [bpu2Point[0] - 0.08, bpu2Point[1] + 0.05]];
      generateBox("133,00 Ha", "0,231 m3/s", "627,27 m", lineBoxBpu2, 'top')

      const linePu2ki = [bpu2Point, [-6.88, 113.35]];
      generateBoxPetak('51ee9daf-f08f-450a-bccc-684c8349b1d7', 'Pu 2 Ki', linePu2ki, 'right','golongan-b');

      const linebpu3 = [bch32Point, bpu3Point];
      generateBangunanSadap('B.Pu 3', 'topright', linebpu3, 0);

      const linePu3ki = [bpu3Point, [-7, 113.35]];
      generateBoxPetak('4d12ee41-45f6-429d-b4c1-f5e100639ce6', 'Pu 3 Ki', linePu3ki, 'right','golongan-b');

      const linePu3ka = [bpu3Point, [-7, 113.2]];
      generateBoxPetak('50a0e2de-6f5a-499a-a2fa-bd377847d400', 'Pu 3 Ka', linePu3ka, 'left','golongan-b');

      // Petak B.Ch 31
      const lineCh31Ka = [bch31Point, [-6.65, 113.12]];
      generateBoxPetak('0b528a64-4b65-4fdb-8579-64fdcaeb63c0', 'Ch 31 Ka', lineCh31Ka, 'bottom','golongan-b');

      const lineBoxCh31 = [bch31Point, [bch31Point[0], bch31Point[1] + 0.2]];
      generateBox("8.418,25 Ha", "16.239 m3/s", "1036,05 m", lineBoxCh31, 'top')

      const lineBoxCh31s = [bch31Point, [bch31Point[0]-0.3,bch31Point[1] + 0.05]];
      generateBox("177,00 Ha", "0,307 m3/s", "797,20 m", lineBoxCh31s, 'top')

      const lineBkg1 = [bch31Point, bkg1Point];
      generateBangunanSadap('B.Kg 1', 'topright', lineBkg1, 0);

      const lineBoxBk1 = [bkg1Point, [bkg1Point[0] - 0.25, bkg1Point[1] + 0.05]];
      generateBox("81,00 Ha", "0,141 m3/s", "1110,84 m", lineBoxBk1, 'top')

      const lineKg1ki = [bkg1Point, [-6.88, 113.05]];
      generateBoxPetak('f97df597-83f3-4d08-a224-f0056cc00b92', 'Kg 1 Ki', lineKg1ki, 'right','golongan-b');

      const lineKg1ka = [bkg1Point, [-6.88, 112.92]];
      generateBoxPetak('f97df597-83f3-4d08-a224-f0056cc00b92', 'Kg 1 Ka', lineKg1ka, 'left','golongan-b');

      const lineBkg2 = [bch31Point, bkg2Point];
      generateBangunanSadap('B.Kg 2', 'topright', lineBkg2, 0);

      const lineKg2ki = [bkg2Point, [-7.2, 113.05]];
      generateBoxPetak('a506f529-e54b-44c0-8bd8-199020fda19e', 'Kg 2 Ki', lineKg2ki, 'right','golongan-b');

      // Petak B.Ch 30
      const lineCh30Ka = [bch30Point, [-6.65, 112.85]]; 
      generateBoxPetak('6397333e-f063-4e89-b328-0085a174951f', 'Ch 30 Ka', lineCh30Ka, 'bottom','golongan-b'); 

      const lineBoxCh30 = [bch30Point, [bch30Point[0],bch30Point[1] + 0.2]];
      generateBox("8.663,25 Ha", "16.712 m3/s", "1516,69 m", lineBoxCh30, 'top')

      const lineBoxCh30s = [bch30Point, [bch30Point[0]-0.3,bch30Point[1] + 0.06]];
      generateBox("56,00 Ha", "0,097 m3/s", "2529,85 m", lineBoxCh30s, 'top')

      const linebab1 =[bch30Point,bab1Point]
      generateBangunanSadap('B.Ab 1', 'centerleft', linebab1, 0);

      const lineBabki = [bab1Point, [-7, 112.78]];
      generateBoxPetak('8bf6444d-a1fb-4fcb-84d4-e447a2322575', 'Ab 1 Ki', lineBabki, 'right','golongan-b');

      // Petak B.Ch 30'
      const lineCh30i = [bch29Point, bch30iPoint];
      generateBangunanSadap("B.Ch 30'", 'topcenter', lineCh30i, 0);
      
      const lineBoxCh30i = [bch30iPoint, [bch30iPoint[0],bch30iPoint[1]+0.06]];
      generateBox("8.773,25 Ha", "16.924 m3/s", "749,04 m", lineBoxCh30i, 'top')
      
      const lineCh29ika =  [bch30iPoint, [-6.65, 112.55]];
      generateBoxPetak('', 'Ch 29 Ka', lineCh29ika, 'bottom','golongan-b');

      // Petak B.Ch 29
      const lineCh29Ka = [bch29Point, [-6.65,112.4]];
      generateBoxPetak('67966f77-8510-4d81-b1eb-d5a86f719d3c', 'Ch 29 Ka', lineCh29Ka, 'bottom','golongan-b');
      
      // Petak B.Ch 28
      const lineCh28ki = [bch28Point, [-6.65, 112.15]];
      generateBoxPetak('620287eb-3f30-4e7b-a4f1-b15c318fc000', 'Ch 28 Ka', lineCh28ki, 'bottom','golongan-b');

      const lineBoxCh28 = [bch28Point, [bch28Point[0],bch28Point[1] + 0.04]];
      generateBox("8.818,25 Ha", "17,011 m3/s", "960,50 m", lineBoxCh28, 'top')

      const lineBoxCh28s = [bch28Point, [bch28Point[0]- 0.3,bch28Point[1] + 0.05 ]];
      generateBox("66,00 Ha", "0,115 m3/s", "1050,25 m ", lineBoxCh28s, 'top')

      const lineBkr1 = [bch28Point, bkr1Point];
      generateBangunanSadap('B.Kr 1', 'centerleft', lineBkr1, 0);

      const lineKr1Ki = [bkr1Point, [-7, 112.38]];
      generateBoxPetak('c1215a02-dbd1-4119-9185-e59366900a3c', 'Kr 1 Ki', lineKr1Ki, 'right','golongan-b');        

      // Ch 27
      const lineBoxCh27 = [bch27Point, [bch27Point[0]-0.06, bch27Point[1] + 0.1]];
      generateBox("8.925,45 Ha", "17.217 m3/s", "1162,28 m", lineBoxCh27, 'top')

      // Generate Bangunan Pembagi

        const lineBch35 = [
            bch34Point,
            bch35Point
        ]
        generateBangunanPembagiDanSadap('B.Ch. 35', 'topcenter', lineBch35);

        const lineBch34 = [
            bch33Point,
            bch34Point
        ]
        generateBangunanPembagiDanSadap('B.Ch. 34', 'topcenter', lineBch34);
          
        const lineBch33 = [
            bch32Point,
            bch33Point
        ]
        generateBangunanPembagi('B.Ch. 33', 'topcenter', lineBch33);

        const lineBch32 = [
            bch31Point,
            bch32Point
        ]
        generateBangunanPembagi('B.Ch. 32', 'topcenter', lineBch32);

        const lineBch31 = [
          bch30Point,
          bch31Point
        ]
        generateBangunanPembagi('B.Ch. 31', 'topcenter', lineBch31);

        const lineBch30 = [
          bch29Point,
          bch30Point
        ]
        generateBangunanPembagi('B.Ch. 30', 'topcenter', lineBch30);
        
        const lineBch29 = [
            bch28Point,
            bch29Point
        ];
        generateBangunanSadap('B.Ch. 29', 'topcenter', lineBch29);

        
        const lineBch28 = [ 
            bch27Point,
            bch28Point
        ];
        generateBangunanPembagi('B.Ch. 28', 'topcenter', lineBch28);
        // End L3a
        // L3a
        generateTextSaluranSekunder('SAL.SEK.KEDUNGREJA', [-6.85,  112.28], 270)
        generateTextSaluranSekunder('SAL.SEK.ALURBULU', [-6.85,  112.68], 270)
        generateTextSaluranSekunder('SAL.SEK.KARANGGANDUL', [-6.85,  112.98], 270)
        generateTextSaluranSekunder('SAL.SEK.PADAURIP', [-6.85,  113.28], 270)
        generateTextSaluranSekunder('SAL.SEKUNDER SIDOSARI', [-6.85,  113.58], 270)
        generateTextSaluranSekunder('SAL.SEK.PURWODADI', [-7.3,  113.28], 270)
        generateTextSaluranSekunder('SAL.SEKUNDER KURIPAN', [-7.15,  113.88], 270)
        generateTextSaluranSekunder('SAL.SEK.CITOTOK', [-7.5,  114], 0)
        generateTextSaluranPrimer('SALURAN INDUK CIHAUR', [-6.6, 113.28], 0)
        // End L3a
    }
    
    var initBch17 = function () {
      const bch35Point = [-6.55, 114.1];
      const bch36Point = [-6.55, 114.4];
      const bch37Point = [-6.55, 114.55];
      const bch38Point = [-6.55, 114.82];
      const bch39Point = [-6.55, 115.25];
      const bch40Point = [-6.55, 115.45];
      const bgm1Point = [-6.8, bch36Point[1]];
      const bgm2Point = [-6.95, bch36Point[1]];
      const bsk1Point = [-6.7, bch38Point[1]];
      const bsk2Point = [-6.85, bch38Point[1]];
      const ski1kaPoint = [bsk2Point[0], 114.7];
      const bsk3Point = [-7, bch38Point[1]];
      const bsk4Point = [-7.15, bch38Point[1]];
      const bskii1Point = [bsk4Point[0], 114.7];
      const bskii2Point = [bsk4Point[0], 114.4];
      const bsk5Point = [-7.25, bch38Point[1]];
      const bskiii1Point = [bsk5Point[0], 114.93];
      const bskiii2Point = [bsk5Point[0], 115.1];
      const bsk6Point = [-7.44, bch38Point[1]];
      const sk6kiPoint = [bsk6Point[0], 114.85];
      const bsk7Point = [-7.55, bch38Point[1]];
      const sk7kaPoint = [bsk7Point[0], 114.75];
      const bsk8Point = [-7.7, bch38Point[1]];
      const sk8kiPoint = [bsk8Point[0], 114.85];
      const sk8kaPoint = [bsk8Point[0], 114.75];
      const bss1Point = [-6.77, bch39Point[1]];
      const bss2Point = [-6.88, bch39Point[1]];
      const bss3Point = [-6.99, bch39Point[1]];
      const bss4Point = [-7.09, bch39Point[1]];
      const bss5Point = [-7.19, bch39Point[1]];
      const bss6Point = [-7.44, bch39Point[1]];
      const bss7Point = [-7.55, bch39Point[1]];
      const bss8Point = [-7.66, bch39Point[1]];
      const bss9Point = [-7.77, bch39Point[1]];
      const bst1Point = [-6.72, bch40Point[1]];
      const bst2Point = [-6.88, bch40Point[1]];
      const bst3Point = [-6.99, bch40Point[1]];
      const bst4Point = [-7.18, bch40Point[1]];
      const bst5Point = [-7.31, bch40Point[1]];
      const bst6Point = [-7.45, bch40Point[1]];
      const bst7Point = [-7.65, bch40Point[1]];
      const bst8iPoint = [-7.76, bch40Point[1]];
      const bst8Point = [-7.88, bch40Point[1]];
      const bsti1Point = [bst2Point[0], 115.58];
      const bsti2Point = [bst2Point[0], 115.8];
      const bstii1Point = [bst3Point[0], 115.55];
      const bstii2Point = [bst3Point[0], 115.63];
      const bstii3iPoint = [bst3Point[0], 115.76];
      const bstii3Point = [bst3Point[0], 115.89];
      const bstii4Point = [-7.18, 115.98];
      const bstii5Point = [-7.25, bstii4Point[1]];
      const bstii6Point = [-7.36, bstii4Point[1]];
      const bstii7Point = [-7.47, bstii4Point[1]];
      const bStiii1Point = [bst7Point[0], 115.58];
      const bStiii2Point = [bst7Point[0], 115.73];
      const bStiii3Point = [bst7Point[0], 115.9];

      // Petak B.Ch 40
      const lineBoxCh40 = [bch40Point, [bch40Point[0], bch40Point[1] + 0.2]];
      generateBox("4.385,30 Ha", "8.459 m3/s", "548,90 m", lineBoxCh40, 'top')

      const lineBoxCh40s = [bch40Point, [bch40Point[0]-0.1,bch40Point[1] + 0.05]];
      generateBox("1.074,00 Ha", "1,865 m3/s", "429,04 m", lineBoxCh40s, 'top')
      
      const lineBst1 = [bch40Point, bst1Point];
      generateBangunanSadap('B. St 1', 'centerleft', lineBst1, 0);
      
      const lineBoxBst1 = [bst1Point, [bst1Point[0] - 0.1, bst1Point[1] - 0.05]];
      generateBox("982,00 Ha", "1,705 m3/s", "471,42 m", lineBoxBst1, 'top')

      const lineSt1ki = [bst1Point, [-6.72, 115.5]];
      generateBoxPetak('42e76277-3cf1-48e6-a675-23fbab932e0e', 'St. 1 Ki', lineSt1ki, 'right','golongan-b');

      const lineBst2 = [bst1Point, bst2Point];
      generateBangunanPembagi('B. St 2', 'centerleft', lineBst2, 0);

      const lineBoxBst2 = [bst2Point, [bst2Point[0] - 0.1, bst2Point[1] - 0.05]];
      generateBox("886,00 Ha", "1,538 m3/s", "453,32 m", lineBoxBst2, 'top')
      
      const lineBoxBst2s = [bst2Point, [bst2Point[0], bst2Point[1] + 0.07]];
      generateBox("797,00 Ha", "1,384 m3/s", "435,32 m", lineBoxBst2s, 'top')
            
      const lineBsti1 = [bst2Point, bsti1Point];
      generateBangunanSadap('B. St I - 1', 'topleft', lineBsti1, 0);

      const lineBoxBsti1 = [bsti1Point, [bsti1Point[0], bsti1Point[1] + 0.1]];
      generateBox("50 Ha", "0,087 m3/s", "479,69 m", lineBoxBsti1, 'top')

      const lineSti1ki = [bsti1Point, [-6.85, bsti1Point[1]]];
      generateBoxPetak('de97e8b5-7383-4b91-aad8-a5f7fa307692', 'St.I - 1 Ki', lineSti1ki, 'top','golongan-b');

      const lineBsti2 = [bsti1Point, bsti2Point];
      generateBangunanSadap('B. St I - 2', 'topright', lineBsti2, 0);

      const lineSti2ki = [bsti2Point, [-6.85, 115.8]];
      generateBoxPetak('fde801f9-f399-4914-b1f4-c2e42928bf46', 'St.I - 2 Ki', lineSti2ki, 'top','golongan-b');

      const lineBst3 = [bst2Point, bst3Point];
      generateBangunanPembagi('B. St 3', 'centerleft', lineBst3, 0);

      const lineBoxBst3 = [bst3Point, [bst3Point[0] - 0.1, bst3Point[1] - 0.05]];
      generateBox("397,00 Ha", "0,689 m3/s", "606,36 m", lineBoxBst3, 'top')

      const lineBoxBst3s = [bst3Point, [bst3Point[0], bst3Point[1] + 0.04]];
      generateBox("489 Ha", "0,849 m3/s", "176,72 m", lineBoxBst3s, 'top')

      const lineBstii1 = [bst3Point, bstii1Point];
      generateBangunanSadap('B. St II - 1', 'topleft', lineBstii1, 0);

      const lineBoxBstii1 = [bstii1Point, [bstii1Point[0], bstii1Point[1] + 0.04]];
      generateBox("432 Ha", "0,750 m3/s", "745,76 m", lineBoxBstii1, 'top')

      const lineBstii2 = [bstii1Point, bstii2Point];
      generateBangunanSadap('B. St II - 2', 'topleft', lineBstii2, 0);

      const lineBoxBstii2 = [bstii2Point, [bstii2Point[0] + 0.03, bstii2Point[1] + 0.1]];
      generateBox("365,00 Ha", "0,634 m3/s", "1261,21 m", lineBoxBstii2, 'top')

      const lineStii2ka = [bstii2Point, [-7.03,bstii2Point[1]]];
      generateBoxPetak('e3de6126-7932-4c41-a6fa-4c2ac10df7da', 'St.II - 2 Ka', lineStii2ka, 'bottom','golongan-b');

      const lineStii3ki = [bstii2Point, bstii3iPoint];
      generateBangunanSadap("B. St.II - 3'", 'topright', lineStii3ki, 0);

      const lineStii3ka = [bstii3iPoint, [-7, bstii3iPoint[1]]];
      generateBoxPetak('', "St.II - 3' Ka", lineStii3ka, 'bottom','golongan-b');
      
      const lineBstii3 = [bstii2Point, bstii3Point];
      generateBangunanSadap('B. St II - 3', 'topleft', lineBstii3, 0);
      
      const lineBoxBstii3 = [bstii4Point, [bstii4Point[0] + 0.03, bstii4Point[1]+0.05]];
      generateBox("269,00 Ha", "0,467 m3/s", "722,00 m", lineBoxBstii3, 'top')

      const lineBstii3ki = [bstii3Point, [-6.95, bstii3Point[1]]];
      generateBoxPetak('', 'St.II - 3 Ki', lineBstii3ki, 'top','golongan-b');

      const lineBstii3ka = [bstii3Point, [-7.06, 115.89]];
      generateBoxPetak('af30ce0b-1e81-4dc0-a8a7-aca779520c38', 'St.II - 3 Ka', lineBstii3ka, 'bottom','golongan-b');

      const lineBstii4 = [bstii3Point,[-6.99, 115.98], bstii4Point];
      generateBangunanSadap('B. St II - 4', 'topright', lineBstii4, 0);

      const lineBoxBstii4 = [bstii4Point, [bstii4Point[0] - 0.05, bstii4Point[1] + 0.05]];
      generateBox("227,00 Ha", "0,394 m3/s", "183,29 m", lineBoxBstii4, 'top')

      const lineStii4ka = [bstii4Point, [-7.18, 115.9]];
      generateBoxPetak('1a49c31d-95d8-4787-aa4a-36bf082404a4', 'St.II - 4 Ka', lineStii4ka, 'left','golongan-b');
      
      const lineBstii5 = [bstii4Point, bstii5Point];
      generateBangunanSadap('B. St II - 5', 'topright', lineBstii5, 0);

      const lineBoxBstii5 = [bstii5Point, [bstii5Point[0] - 0.07, bstii5Point[1] + 0.05]];
      generateBox("172,00 Ha", "0,299 m3/s", "1360,80 m", lineBoxBstii5, 'top')

      const lineStii5ki = [bstii5Point, [-7.25, 116.15]];
      generateBoxPetak('b51d99d7-4697-4199-ba73-bf207d652a68', 'St.II - 5 Ki', lineStii5ki, 'right','golongan-b');

      const lineBstii6 = [bstii5Point, bstii6Point];
      generateBangunanSadap('B. St II - 6', 'topright', lineBstii6, 0);

      const lineBoxBstii6 = [bstii6Point, [bstii6Point[0] - 0.07, bstii6Point[1] + 0.05]];
      generateBox("72,00 Ha", "0,125 m3/s", "786,35 m", lineBoxBstii6, 'top')

      const lineStii6ki = [bstii6Point, [-7.36, 116.15]];
      generateBoxPetak('47abc807-f14d-4f0e-a83a-90f9ca911939', 'St.II - 6 Ki', lineStii6ki, 'right','golongan-b');

      const lineStii6ka = [bstii6Point, [-7.36, 115.9]];
      generateBoxPetak('97f21174-446d-4ba9-a83a-68d7747c9b5a', 'St.II - 6 Ka', lineStii6ka, 'left','golongan-b');

      const lineBstii7 = [bstii6Point, bstii7Point];
      generateBangunanSadap('B. St II - 7', 'topright', lineBstii7, 0);

      const lineStii7ki = [bstii7Point, [-7.47, 116.15]];
      generateBoxPetak('3d9cbe38-9e45-40b9-9116-7155b1ae242b', 'St.II - 7 Ki', lineStii7ki, 'right','golongan-b');

      const lineBstii7ka = [bstii7Point, [-7.47, 115.9]];
      generateBoxPetak('a20e75e0-fc9f-4cea-a3af-c0dbdf4d31ac', 'St.II - 7 Ka', lineBstii7ka, 'left','golongan-b');

      const lineBst4 = [bst3Point, bst4Point];
      generateBangunanSadap('B. St 4', 'topright', lineBst4, 0);

      const lineBoxBst4 = [bst4Point, [bst4Point[0] - 0.1, bst4Point[1] + 0.05]];
      generateBox("341,00 Ha", "0,592 m3/s", "486,85 m", lineBoxBst4, 'top')

      const lineSt4ki = [bst4Point, [bst4Point[0], 115.5]];
      generateBoxPetak('ab28eb22-65d0-4acc-ae8d-5d03e8c8a038', 'St. 4 Ki', lineSt4ki, 'right','golongan-b');

      const lineBst5 = [bst4Point, bst5Point];
      generateBangunanSadap('B. St 5', 'topright', lineBst5, 0);

      const lineBoxBst5 = [bst5Point, [bst5Point[0] - 0.1, bst5Point[1] - 0.05]];
      generateBox("305,00 Ha", "0,530 m3/s", "728,60 m", lineBoxBst5, 'top')
      
      const lineSt5ki = [bst5Point, [bst5Point[0], 115.5]];
      generateBoxPetak('d5da0f5d-8923-4c74-9f65-32916c5bb339', 'St. 5 Ki', lineSt5ki, 'right','golongan-b');

      const lineBst6 = [bst5Point, bst6Point];
      generateBangunanSadap('B. St 6', 'topright', lineBst6, 0);

      const lineBoxBst6 = [bst6Point, [bst6Point[0] - 0.1, bst6Point[1] + 0.05]];
      generateBox("233,00 Ha", "0,405 m3/s", "1117,30 m", lineBoxBst6, 'top')

      const lineSt6ki = [bst6Point, [-7.45, 115.5]];
      generateBoxPetak('eda39b97-8e39-4690-b26c-46ab378642cc', 'St. 6 Ki', lineSt6ki, 'right','golongan-b');

      const lineBst7 = [bst6Point, bst7Point];
      generateBangunanPembagi('B.St 7', 'centerleft', lineBst7, 0);
      
      const lineBoxBs7 = [bst7Point, [bst7Point[0], bst7Point[1] + 0.06]];
      generateBox("197,00 Ha", "0,342 m3/", "46,05 m", lineBoxBs7, 'top')

      const lineBstiii1 = [bst7Point, bStiii1Point];
      generateBangunanSadap('B.St III - 1', 'topleft', lineBstiii1, 0);

      const lineBoxBstiii1 = [bStiii1Point, [bStiii1Point[0], bStiii1Point[1] + 0.05]];
      generateBox("133 Ha", "0,231 m3/s", "102,80 m", lineBoxBstiii1, 'top')

      const lineBstiii2 = [bStiii1Point, bStiii2Point];
      generateBangunanSadap('B.St III - 2', 'topleft', lineBstiii2, 0);

      const lineBoxBstiii2 = [bStiii2Point, [bStiii2Point[0], bStiii2Point[1] + 0.08]];
      generateBox("68,00 Ha", "0,118 m3/s", "2133,96 m", lineBoxBstiii2, 'top')

      const lineStiii2ki =  [bStiii2Point, [-7.6, 115.73]];
      generateBoxPetak('45559f20-8d8d-48fb-ba58-1d8237af9912', 'St. III - 2 Ki', lineStiii2ki, 'top','golongan-b');

      const lineStiii2ka = [bStiii2Point, [-7.68, 115.73]];
      generateBoxPetak('75f4198d-5924-4845-acd0-f35ff6829dd9', 'St. III - 2 Ka', lineStiii2ka, 'bottom','golongan-b');

      const lineBstiii3 = [bStiii2Point, bStiii3Point];
      generateBangunanSadap('B.St III - 3', 'topleft', lineBstiii3, 0);

      const lineStiii3ki = [bStiii3Point, [-7.6, 115.9]];
      generateBoxPetak('09fa94b6-0543-43b7-ab90-c609666ee069', 'St. III - 3 Ki', lineStiii3ki, 'top','golongan-b');

      const lineStiii3ka = [bStiii3Point, [-7.68, 115.9]];
      generateBoxPetak('b0ad2c89-2cab-4c70-8f7b-6678a9ee2cdd', 'St. III - 3 Ka', lineStiii3ka, 'bottom','golongan-b');

      const lineBst8i = [bst7Point, bst8iPoint];
      generateBangunanSadap("B.St 8'", 'centerleft', lineBst8i, 0);

      const lineBoxBst8i = [bst8iPoint, [bst8iPoint[0]- 0.1, bst8iPoint[1] - 0.05]];
      generateBox("36 Ha", "0,063 m3/s", "971,28 m", lineBoxBst8i, 'top')

      const lineSt8iki = [bst8iPoint, [-7.76, 115.5]];
      generateBoxPetak('75057e8e-f9cd-43bc-b1b8-7adcdc794edb', "St. 8' Ki", lineSt8iki, 'right','golongan-b');

      const lineBst8 = [bst8iPoint, bst8Point];
      generateBangunanSadap('B.St 8', 'centerleft', lineBst8, 0);
      
      const lineSt8ki = [bst8Point, [-7.88, 115.5]];
      generateBoxPetak('7aec2e8f-bde2-4710-aec1-21f9e97f0ae8', 'St. 8 Ki', lineSt8ki, 'right','golongan-b');
       

      //Petak B.Ch 39
      const lineCh39Ka = [bch39Point,[-6.65, 115.05]];
      generateBoxPetak('10ce74cb-caac-4c46-a610-2115770b3efb', 'Ch 39 Ka', lineCh39Ka, 'bottom','golongan-b');
      
      const lineBoxCh39 = [bch39Point, [bch39Point[0], bch39Point[1] + 0.1]];
      generateBox( "5.459,30 Ha", "10.531 m3/s", "686,98 m", lineBoxCh39, 'top')

      const lineBoxCh39s = [bch39Point, [bch39Point[0]-0.15, bch39Point[1] + 0.05]];
      generateBox("494,05 Ha", "0,858 m3/s", "1169,42 m", lineBoxCh39s, 'top')

      const lineBss1 = [bch39Point, bss1Point];
      generateBangunanSadap('B.Bs.1 (B.Bs.2)', 'centerright', lineBss1, 0);

      const lineBoxBss1 = [bss1Point, [bss1Point[0] - 0.08, bss1Point[1] + 0.05]];
      generateBox("406,15 Ha", "0,705 m3/s", "2021,34 m", lineBoxBss1, 'top')

      const lineBs1ka = [bss1Point, [-6.77, 115.17]];
      generateBoxPetak('51f5dbf2-8e94-4fbf-b97e-52a05ce3e472', 'Bs - 1 Ka', lineBs1ka, 'left','golongan-b');

      const lineBss2 = [bss1Point, bss2Point];
      generateBangunanSadap('B.Bs.2 (B.Bs.3)', 'centerright', lineBss2, 0);

      const lineBoxBss2 = [bss2Point, [bss2Point[0] - 0.08, bss2Point[1] + 0.05]];
      generateBox("353,90 Ha", "0,614 m3/s", "586,33 m", lineBoxBss2, 'top')

      const lineBs2ka = [bss2Point, [-6.88, 115.17]];
      generateBoxPetak('c1097bd9-04b2-4bb9-9bab-6b48c8a7ef3e', 'Bs - 2 Ka', lineBs2ka, 'left','golongan-b');

      // Tidak Ada penamaan bangunan sadap
      const lineBss3 = [bss2Point, bss3Point];
      generateBangunanSadap('', 'centerright', lineBss3, 0);

      const lineBoxBss3 = [bss3Point, [bss3Point[0] - 0.08, bss3Point[1] + 0.05]];
      generateBox("302,25 Ha", "0,525 m3/s", "901,06 m", lineBoxBss3, 'top')

      const lineBs3ka = [bss3Point, [-6.99, 115.17]];
      generateBoxPetak('b1ba8e0b-c283-4960-a0ff-786f31228f66', 'Bs - 3 Ka', lineBs3ka, 'left','golongan-b');
      
      const lineBss4 = [bss3Point, bss4Point];
      generateBangunanSadap('B.Bs.4 (B.Bs.5)', 'centerright', lineBss4, 0);

      const lineBoxBss4 = [bss4Point, [bss4Point[0] - 0.08, bss4Point[1] + 0.05]];
      generateBox("228,40 Ha", "0,397 m3/s", "1287,52 m", lineBoxBss4, 'top') 

      const lineBss4ka = [bss4Point, [-7.09, 115.17]];
      generateBoxPetak('0bd8e2fc-21ac-4caa-9880-6245d39aba75', 'Bs - 4 Ka', lineBss4ka, 'left','golongan-b');

      const lineBss5 = [bss4Point, bss5Point];
      generateBangunanSadap('B.Bs.5', 'centerright', lineBss5, 0);

      const lineBoxBss5 = [bss5Point, [bss5Point[0] - 0.15, bss5Point[1] + 0.05]];
      generateBox("180,40 Ha", "0,313 m3/s", "613,65 m", lineBoxBss5, 'top')

      const lineBss5ka = [bss5Point, [-7.19, 115.17]];
      generateBoxPetak('029efdd5-9a37-4691-b1a6-7a0255c6ee60', 'Bs - 5 Ka', lineBss5ka, 'left','golongan-b');

      const lineBss6 = [bss5Point, bss6Point];
      generateBangunanSadap('B.Bs.6', 'centerright', lineBss6, 0);

      const lineBoxBss6 = [bss6Point, [bss6Point[0] - 0.08, bss6Point[1] + 0.05]];
      generateBox("136,05 Ha", "0,236 m3/s", "1028,29 m", lineBoxBss6, 'top')

      const lineBss6ka = [bss6Point, [-7.44, 115.17]];
      generateBoxPetak('ce517514-9d61-4af5-ad04-cb49ac9b2d30', 'Bs - 6 Ka', lineBss6ka, 'left','golongan-b');

      const lineBss7 = [bss6Point, bss7Point]; 
      generateBangunanSadap('B.Bs.7', 'centerright', lineBss7, 0);

      const lineBoxBss7 = [bss7Point, [bss7Point[0] - 0.08, bss7Point[1] + 0.05]];
      generateBox("76,05 Ha", "0,132 m3/s", "1232,10 m", lineBoxBss7, 'top')

      const lineBss7ka = [bss7Point, [-7.55, 115.17]];
      generateBoxPetak('c5d99288-aa87-47c6-ba72-eafcba975d93', 'Bs - 7 Ka', lineBss7ka, 'left','golongan-b');

      const lineBss8 = [bss7Point, bss8Point];
      generateBangunanSadap('B.Bs.8', 'centerright', lineBss8, 0);
      
      const lineBoxBss8 = [bss8Point, [bss8Point[0] - 0.08, bss8Point[1] + 0.05]];
      generateBox("35,30 Ha", "0,061 m3/s", "369,83 m", lineBoxBss8, 'top')

      const lineBss8ka = [bss8Point, [-7.66, 115.17]];
      generateBoxPetak('4bad8bdf-f43b-46df-9276-6b328986b36f', 'Bs - 8 Ka', lineBss8ka, 'left','golongan-b');

      const lineBss9 = [bss8Point, bss9Point];
      generateBangunanSadap('B.Bs.9', 'centerright', lineBss9, 0);

      const lineBss9ka = [bss9Point, [-7.77, 115.17]];
      generateBoxPetak('1946bc15-bc55-455d-b041-7354860cace2', 'Bs - 9 Ka', lineBss9ka, 'left','golongan-b');
      
      // Petak B.Ch 38
      const lineBoxCh38 = [bch38Point, [bch38Point[0], bch38Point[1] + 0.2]];
      generateBox("6.015,35 Ha", "11,604 m3/s", "1177,26 m", lineBoxCh38, 'top')

      const lineBoxCh38s = [bch38Point, [bch38Point[0]-0.1, bch38Point[1] - 0.05]];
      generateBox("598,00 Ha", "1,038 m3/s", "966,66 m", lineBoxCh38s, 'top')
 
      const lineBsk1 = [bch38Point, bsk1Point];
      generateBangunanSadap('B.Sk 1', 'topright', lineBsk1, 0);

      const lineBoxBsk1 = [bsk1Point, [bsk1Point[0]- 0.1 , bsk1Point[1] + 0.05]];
      generateBox("506,00 Ha", "0,878 m3/s", "794,60 m", lineBoxBsk1, 'top')

      const lineSk1ka = [bsk1Point, [-6.7, 114.78]];
      generateBoxPetak('0420e0ae-d076-4fa1-bb34-8eeee3104421', 'Sk 1 Ka', lineSk1ka, 'left','golongan-a');

      const lineBsk2 = [bsk1Point, bsk2Point];
      generateBangunanSadap('B.Sk 2', 'topright', lineBsk2, 0);

      const lineBoxBsk2 = [bsk2Point, [bsk2Point[0] - 0.1, bsk2Point[1] + 0.05]];
      generateBox("405,00 Ha", "0,703 m3/s", "920,45 m", lineBoxBsk2, 'top')

      const lineBoxBsk2s = [bsk2Point, [bsk2Point[0]  , bsk2Point[1] - 0.05]];
      generateBox("44,00 Ha", "0,076 m3/s", "597,57 m", lineBoxBsk2s, 'top')

      const lineSk2ka = [bsk2Point, [-6.92, 114.78]];
      generateBoxPetak('938789c0-4c54-43f6-adfd-13a58f519763', 'Sk 2 Ka', lineSk2ka, 'left','golongan-a');
      
      const lineBski1ka = [bsk2Point, ski1kaPoint];
      generateBangunanSadap('B.Sk I - 1 Ka', 'topleft', lineBski1ka);

      const lineSki1ka = [ski1kaPoint, [-6.83, 114.7]];
      generateBoxPetak('609a5ab2-406c-43ef-8f05-4e7fb1c1c33f','Sk I - 1Ka', lineSki1ka, 'top','golongan-a');
      
      const lineBsk3 = [bsk2Point, bsk3Point];
      generateBangunanSadap('B.Sk 3', 'topright', lineBsk3, 0);

      const lineBoxBsk3 = [bsk3Point, [bsk3Point[0] - 0.1, bsk3Point[1] + 0.05]];
      generateBox("346,00 Ha", "0,601 m3/s", "604,11 m", lineBoxBsk3, 'top')

      const lineSk3ka = [bsk3Point, [-7, 114.78]];
      generateBoxPetak('527563ad-ebde-41b7-8cc9-536e1dcc36f5', 'Sk 3 Ka', lineSk3ka, 'left','golongan-a');

      const lineBsk4 = [bsk3Point, bsk4Point];
      generateBangunanPembagi('B.Sk 4', 'topright', lineBsk4, 0);

      const lineBoxBsk4 = [bsk4Point, [bsk4Point[0] - 0.06, bsk4Point[1] + 0.05]];
      generateBox("196,00 Ha", "0,340 m3/s", "845,80 m", lineBoxBsk4, 'top')

      const lineBoxBsk4s = [bsk4Point, [bsk4Point[0]- 0.06, bsk4Point[1] - 0.05]];
      generateBox("150,00 Ha", "0,260 m3/s", "105,19 m", lineBoxBsk4s, 'top')
      
      const lineBskii1 = [bsk4Point, bskii1Point];
      generateBangunanSadap('B.Sk II - 1', 'bottomleft', lineBskii1, 0);

      const lineBoxBskii1 = [bskii1Point, [bskii1Point[0], bskii1Point[1] - 0.2]];
      generateBox("101,00 Ha", "0,175 m3/s", "713,46 m", lineBoxBskii1, 'top')

      const lineSkii1ki = [bskii1Point, [-7.2, 114.7]];
      generateBoxPetak('8621842a-49bf-44fc-a993-e97e89a371f9', 'Sk II - 1 Ki', lineSkii1ki, 'bottom','golongan-a');

      const lineBskii2 = [bskii1Point, bskii2Point];
      generateBangunanSadap('B.Sk II - 2', 'bottomright', lineBskii2, 0);

      const lineSkii2ki = [bskii2Point, [-7.2, 114.4]];
      generateBoxPetak('7dc11965-ac29-4033-8645-2faf84c668a2', 'Sk II - 2 Ki', lineSkii2ki, 'bottom','golongan-a');

      const lineBsk5 = [bsk4Point, bsk5Point];
      generateBangunanPembagi('B.Sk 5', 'topright', lineBsk5, 0);

      const lineBoxBsk5 = [bsk5Point, [bsk5Point[0] - 0.1, bsk5Point[1] - 0.05]];
      generateBox("156,00 Ha", "0,271 m3/s", "107,73 m", lineBoxBsk5, 'top')

      const lineBoxBsk5s = [bsk5Point, [bsk5Point[0] - 0.05, bsk5Point[1] + 0.05]];
      generateBox("40,00 Ha", "0.069 m3/s", "399,75 m", lineBoxBsk5s, 'top')
      
      const lineBskiii1 = [bsk5Point, bskiii1Point];
      generateBangunanSadap('B.Sk III - 1', 'bottomright', lineBskiii1, 0);

      const lineBoxBskiii1 = [bskiii1Point, [bskiii1Point[0]- 0.06, bskiii1Point[1] + 0.1]];
      generateBox("20,00 Ha", "0.035 m3/s", "1200,82 m", lineBoxBskiii1, 'top')


      const lineSkiii1ka = [bskiii1Point, [-7.3,bskiii1Point[1]]];
      generateBoxPetak('60291414-a232-4ffa-8c65-8b79fea86f40', 'Sk III - 1 Ka', lineSkiii1ka, 'bottom','golongan-a');

      const lineBskiii2 = [bsk5Point, bskiii2Point];
      generateBangunanSadap('B.Sk III - 2', 'bottomright', lineBskiii2, 0);
     
      const lineSkiii2ka = [bskiii2Point, [-7.3, 115.1]];
      generateBoxPetak('3264ccf9-bc37-4506-807d-a243c259833b', 'Sk III - 2 Ka', lineSkiii2ka, 'bottom','golongan-a');

      const lineBsk6 = [bsk5Point, bsk6Point];
      generateBangunanSadap('B.Sk 6', 'centerleft', lineBsk6, 0);

      const lineBoxBsk6 = [bsk6Point, [bsk6Point[0] - 0.1, bsk6Point[1] - 0.05]];
      generateBox("130,00 Ha", "0,226 m3/s", "584,88 m", lineBoxBsk6, 'top')

      const lineSk6ki = [bsk6Point, sk6kiPoint];
      generateBoxPetak('b5d738ac-2956-47d3-a88a-1079ec6a3fda', 'Sk 6 Ki', lineSk6ki, 'right','golongan-a');

      const lineBsk7 = [bsk6Point, bsk7Point];
      generateBangunanSadap('B.Sk 7', 'topleft', lineBsk7, 0);

      const lineBoxBsk7 = [bsk7Point, [bsk7Point[0] - 0.1, bsk7Point[1] - 0.05]];
      generateBox("100,00 Ha", "0,174 m3/s", "796,95 m", lineBoxBsk7, 'top')

      const lineSk7ka = [bsk7Point, sk7kaPoint];
      generateBoxPetak('351066eb-dec4-4b03-9069-84e1757367f0', 'Sk 7 Ka', lineSk7ka, 'left','golongan-a');

      const lineBsk8 = [bsk7Point, bsk8Point];
      generateBangunanSadap('B.Sk 8', 'topleft', lineBsk8, 0);
    
      const lineSk8ki = [bsk8Point, sk8kiPoint];
      generateBoxPetak('bbc906d8-0d8b-46e5-9c32-dd4826140e1d', 'Sk 8 Ki', lineSk8ki, 'right','golongan-a');

      const lineSk8ka = [bsk8Point, sk8kaPoint];
      generateBoxPetak('0380ada6-b846-40b1-ae21-97e5138907a6', 'Sk 8 Ka', lineSk8ka, 'left','golongan-a');

      // Petak B.Ch 37
      const lineCh37Ka = [bch37Point, [-6.65, bch37Point[1]]];
      generateBoxPetak('1df8a589-93d1-4c70-b98f-45320a0a0b64', 'Ch 37 Ka', lineCh37Ka, 'bottom','golongan-b');

      const lineBoxCh37 = [bch37Point, [bch37Point[0],bch37Point[1] + 0.08]];
      generateBox("6.613,35 Ha","12,757 m3/s","576,46 m", lineBoxCh37,'top' )

      // Petak B.Ch 36
      const lineCh36Ka = [bch36Point, [-6.65, 114.3]];
      generateBoxPetak('2208bc0f-f288-4e89-8b58-71f6a881ba25', 'Ch 36 Ka', lineCh36Ka, 'bottom','golongan-b');

      const lineBoxCh36 = [bch36Point, [bch36Point[0],bch36Point[1] + 0.08]];
      generateBox("6.702,35 Ha","12,929 m3/s","514,41 m", lineBoxCh36,'top' )

      const lineBoxCh36s = [bch36Point, [bch36Point[0]-0.1,bch36Point[1] + 0.05]];
      generateBox("110,00 Ha","0,191 m3/s","828,17 m", lineBoxCh36s,'top' )

      const lineBgm1 = [bch36Point, bgm1Point];
      generateBangunanSadap('B.Gm 1', 'centerright', lineBgm1, 0);

      const lineBoxBgm1 = [bgm1Point, [bgm1Point[0]-0.1, bgm1Point[1] + 0.05]];
      generateBox("55,00 Ha","0,095 m3/s","969,36 m", lineBoxBgm1,'top' )

      const lineGm1ka = [bgm1Point, [-6.8, 114.35]];
      generateBoxPetak('7711ad69-ce32-43bb-b44f-d747bcfc4bab', 'Gm 1 Ka', lineGm1ka, 'left','golongan-b');

      const lineBgm2 = [bgm1Point, bgm2Point]; 
      generateBangunanSadap('B.Gm 2', 'centerleft', lineBgm2, 0);

      const lineGm2Te = [bgm2Point, [-7, 114.4]];
      generateBoxPetak('87b87c2e-3547-485d-bc79-facea9697bf7', 'Gm 2 Te', lineGm2Te, 'bottom','golongan-b');

      const lineBc40 = [
        bch39Point,
        bch40Point
      ];
      generateBangunanPembagi('B.Ch. 40  (BC.IV - I)', 'topcenter', lineBc40);
      const lineBch39 = [
        bch38Point,
        bch39Point
      ];
      generateBangunanPembagi('B.Ch. 39', 'topcenter', lineBch39);

      const lineBch38 = [
        bch37Point,
        bch38Point
      ];
      generateBangunanPembagi('B.Ch. 38', 'topcenter', lineBch38);

      const lineBch37 = [
        bch36Point,
        bch37Point
      ];
      generateBangunanPembagiDanSadap('B.Ch. 37', 'topcenter', lineBch37);

      const lineBch36 = [
        bch35Point,
        bch36Point
      ];

      generateBangunanPembagi('B.Ch. 36', 'topcenter', lineBch36);

      generateTextSaluranSekunder('SAL.SEK.GANDRUNGMANIS', [-6.85,  114.39], 270)
      generateTextSaluranSekunder('SAL.SEK.SIDAKAYA I', [-6.88,  114.7], 0)
      generateTextSaluranSekunder('SAL.SEKUNDER SIDAKAYA', [-6.88,  114.85], 270)
      generateTextSaluranSekunder('SAL.SEK.SIDAKAYA II', [-7.15,  114.65], 0)
      generateTextSaluranSekunder('SAL.SEK.SIDAKAYA III', [-7.25,  114.93], 0)
      generateTextSaluranSekunder('SAL.SEK.BANTARSARI', [-7,  115.23], 270)
      generateTextSaluranSekunder('SAL.SEKUNDER SITINGGIL RAYA', [-7.25,  115.43], 270)
      generateTextSaluranSekunder('SAL.SEK.SITINGGIL I', [-6.92,  115.6], 0)
      generateTextSaluranSekunder('SAL.SEK. SITINGGIL II', [-7.29,  115.95], 270) 
      generateTextSaluranSekunder('SAL.SEK. SITINGGIL III', [-7.68,  115.65], 0) 
    
    }

    var initBch18 = function () {
      const bch40Point = [-6.55, 115.3];
      const bch41Point = [-6.45, 116.3];
      const bch42Point = [-6.3, bch41Point[1]];
      const bch43Point = [-6.15, bch41Point[1]];
      const bch44Point = [-6, bch41Point[1]];
      const bch45Point = [-5.65, 116.5];
      const bch46Point = [bch45Point[0], 116.7];
      const bch47Point = [bch45Point[0], 116.9];
      const bch48Point = [bch45Point[0], 117.2];
      const bch49Point = [bch45Point[0], 117.5];
      const bch50Point = [bch45Point[0], 117.7];
      const bch51Point = [bch45Point[0], 118.1];
      const bch52Point = [bch45Point[0], 118.3];
      const bch53Point = [bch45Point[0], 118.5];
      const bch54Point = [bch45Point[0], 118.7];
      const bjd1Point = [-5.85, bch47Point[1]];
      const bjd2Point = [-6, bch47Point[1]];
      const bjd3Point = [-6.15, bch47Point[1]];
      const bjd4Point = [-6.27, bch47Point[1]];
      const bjd5iPoint = [-6.35, bch47Point[1]];
      const bjd5Point = [-6.45, bch47Point[1]];
      const bkw1Point = [-5.85, bch49Point[1]];
      const bkw2Point = [-6, bch49Point[1]];
      const bkw3Point = [-6.1,117.7];
      const bkw4Point = [bkw3Point[0],117.9];
      const bkw5Point = [bkw3Point[0],118.08];
      const bkw6Point = [bkw3Point[0],118.25];
      const bkw7Point = [bkw3Point[0],118.45];
      const bkwka1Point = [-6.29, bkw3Point[1]];
      const bkwka2iPoint = [-6.37, bkw3Point[1]];
      const bkwka2Point = [-6.45, bkw3Point[1]];
      
      // Petak B.Ch 41
      const lineBch41 = [ bch40Point,[-6.55, 116.3], bch41Point];
      generateBangunanPembagiDanSadap('B.Ch 41  (BC.IV-II)', 'centerleft', lineBch41, 0);

      const lineBoxBch41 = [bch41Point, [bch41Point[0]+0.05, bch41Point[1] + 0.055]];
      generateBox("4.320,30 Ha", "8,334 m3/s", "2511,39 m", lineBoxBch41, 'top')

      const lineCh41ka = [bch41Point, [-6.45, 116.4]];
      generateBoxPetak('47494c3d-dbc4-45dd-8dc0-a7aee6a49b9c', 'Ch 41 Ka', lineCh41ka, 'right','golongan-b');
      
      // Petak B.Ch 42
      const lineBch42 = [bch41Point, bch42Point];
      generateBangunanPembagiDanSadap('B.Ch 42', 'centerleft', lineBch42, 0);

      const lineBoxBch42 = [bch42Point, [bch42Point[0]+0.05, bch42Point[1] + 0.055]];
      generateBox("4.267,30 Ha", "8,232 m3/s", "366,15 m", lineBoxBch42, 'top')

      const lineCh42ka = [bch42Point, [-6.3, 116.4]];
      generateBoxPetak('e3973a72-107f-44d4-aa67-09b67e1f9ae4', 'Ch 42 Ka', lineCh42ka, 'right','golongan-b');

      // Petak B.Ch 43
      const lineBch43 = [bch42Point, bch43Point];
      generateBangunanPembagiDanSadap('B.Ch 43', 'centerleft', lineBch43, 0);

      const lineBoxBch43 = [bch43Point, [bch43Point[0]+0.05, bch43Point[1] + 0.055]];
      generateBox("4.219,30 Ha", "8,139 m3/s", "651,25 m", lineBoxBch43, 'top')

      const lineCh34Ka = [bch43Point, [-6.15, 116.4]];
      generateBoxPetak('ae873b34-bca9-42fe-98e3-2d16e054c919', 'Ch 43 Ka', lineCh34Ka, 'right','golongan-b');

      // Petak B.Ch 44
      const lineBch44 = [bch43Point, bch44Point];
      generateBangunanPembagiDanSadap('B.Ch 44', 'centerleft', lineBch44, 0);
      
      const lineBoxBch44 = [bch44Point, [bch44Point[0]+0.05, bch44Point[1] + 0.055]];
      generateBox("4.184,30 Ha", "8,072 m3/s", "703,24 m", lineBoxBch44, 'top')

      const lineBch44ka = [bch44Point, [-6, 116.4]];
      generateBoxPetak('21643617-6983-4ac6-abef-574888ee2c75', 'Ch 44 Ka', lineBch44ka, 'right','golongan-b');

      // Petak B.Ch 45
      const lineBch45 = [bch44Point,[-5.65, 116.3], bch45Point];
      generateBangunanPembagiDanSadap('B.Ch 45', 'topcenter', lineBch45, 0);

      const lineBoxBch45 = [bch45Point, [bch45Point[0]-0.058, bch45Point[1] + 0.08]];
      generateBox("4.134,30 Ha", "7,975 m3/s", "190,52 m", lineBoxBch45, 'top')
      
      const lineBch45ka = [bch45Point, [-5.75, 116.5]];
      generateBoxPetak('f0a89873-4981-45b8-87d9-8c2033c4f0ff', 'Ch 45 Ka', lineBch45ka, 'bottom','golongan-b');

      // Petak B.Ch 46
      const lineBch46 = [bch45Point, bch46Point];
      generateBangunanPembagiDanSadap('B.Ch 46', 'topcenter', lineBch46, 0);

      const lineBoxBch46 = [bch46Point, [bch46Point[0]-0.058, bch46Point[1] + 0.08]];
      generateBox("4.074,30 Ha", "7,859 m3/s", "1378,34 m", lineBoxBch46, 'top')

      const lineBch46ka = [bch46Point, [-5.75, 116.7]];
      generateBoxPetak('eb9361fc-eee1-453a-b041-b70d0a4a58e5', 'Ch 46 Ka', lineBch46ka, 'bottom','golongan-b');

      // Petak B.Ch 47
      const lineBch47 = [bch46Point, bch47Point];
      generateBangunanPembagi('B.Ch 47 (BC.IV-IX)', 'topcenter', lineBch47, 0);

      const lineBoxBch47 = [bch47Point, [bch47Point[0]-0.058, bch47Point[1] + 0.08]];
      generateBox("3.736,30 Ha", "7,207 m3/s", "968,11 m", lineBoxBch47, 'top')

      const lineBoxBch47s = [bch47Point, [bch47Point[0]-0.15, bch47Point[1] + 0.05]];
      generateBox("338,00 Ha", "0,587 m3/s", "141,89 m", lineBoxBch47s, 'top')

      const lineBjd1 = [bch47Point, bjd1Point];
      generateBangunanSadap('B.Jd 1', 'topright', lineBjd1, 0);

      const lineBoxBjd1 = [bjd1Point, [bjd1Point[0]-0.1, bjd1Point[1] + 0.05]];
      generateBox("264,00 Ha", "0,458 m3/s", "1448,44 m", lineBoxBjd1, 'top')

      const lineBjd1ki = [bjd1Point, [-5.85, 116.95]];
      generateBoxPetak('5d30eb58-2a4e-4ff3-9c40-524db8d0f867', 'Jd. 1 Ki', lineBjd1ki, 'right','golongan-b');
      
      const lineBjd2 = [bjd1Point, bjd2Point];
      generateBangunanSadap('B.Jd 2', 'centerright', lineBjd2, 0);
      
      const lineBoxBjd2 = [bjd2Point, [bjd2Point[0]-0.1, bjd2Point[1] + 0.05]];
      generateBox("161,00 Ha", "0,280 m3/s", "1048,67 m", lineBoxBjd2, 'top')

      const lineBjd2ka = [bjd2Point, [bjd2Point[0], 116.8]];
      generateBoxPetak('6cbbfe45-a243-4b58-b337-fdd002d44f17', 'Jd. 2 Ka', lineBjd2ka, 'left','golongan-b');

      const lineBjd3 = [bjd2Point, bjd3Point];
      generateBangunanSadap('B.Jd 3', 'topright', lineBjd3, 0);
      
      const lineBoxBjd3 = [bjd3Point, [bjd3Point[0]-0.08, bjd3Point[1] + 0.05]];
      generateBox("124,00 Ha", "0,215 m3/s", "827,39 m", lineBoxBjd3, 'top')

      const lineBj3ki = [bjd3Point, [bjd3Point[0], 117]];
      generateBoxPetak('51de03b5-06bb-4eff-9422-0244e990b414', 'Jd. 3 Ki', lineBj3ki, 'right','golongan-b');

      const lineBj3ka = [bjd3Point, [bjd3Point[0], 116.8]];
      generateBoxPetak('cc69013f-03eb-42b5-9abe-5147b1d793c5', 'Jd. 3 Ka', lineBj3ka, 'left','golongan-b');

      const lineBjd4 = [bjd3Point, bjd4Point];
      generateBangunanSadap('B.Jd 4', 'topright', lineBjd4, 0);

      const lineBjd4ki = [bjd4Point, [bjd4Point[0], 117]];
      generateBoxPetak('ae445866-88f2-437b-b956-eb8764e7c7b0', 'Jd. 4 Ki', lineBjd4ki, 'right','golongan-b');

      const lineBjd5i = [bjd4Point, bjd5iPoint];
      generateBangunanSadap("B.Jd 5'", 'topright', lineBjd5i, 0);

      const lineBoxBjd5i = [bjd5iPoint, [bjd5iPoint[0]-0.07, bjd5iPoint[1] + 0.05]];
      generateBox("57,00 Ha", "0,099  m3/s", "1356,02 m", lineBoxBjd5i, 'top')

      const linBjd5iki = [bjd5iPoint, [bjd5iPoint[0], 117]];
      generateBoxPetak('9d06cd07-db03-4f95-9f46-cf000b72d757', "Jd. 5 Ki'", linBjd5iki, 'right','golongan-b');

      const lineBjd5 = [bjd5iPoint, bjd5Point];
      generateBangunanSadap('B.Jd 5', 'topright', lineBjd5, 0);

      const lineBjd5ki = [bjd5Point, [bjd5Point[0], 117]];
      generateBoxPetak('a6b47519-25de-4fc3-801f-07cb66eef3de', 'Jd. 5 Ki', lineBjd5ki, 'right','golongan-b');
      // Petak B.Ch 48
      const lineBch48 = [bch47Point, bch48Point];
      generateBangunanPembagiDanSadap('B.Ch 48 (BC.IV-X)', 'topcenter', lineBch48, 0);

      const lineBoxBch48 = [bch48Point, [bch48Point[0]-0.058, bch48Point[1] + 0.08]];
      generateBox("3.698,60 Ha", "7,135 m3/s", "541,19 m", lineBoxBch48, 'top')
      
      const lineBch48ka = [bch48Point, [-5.75, 117.2]];
      generateBoxPetak('7e8f4f51-f78d-468b-a2c4-c23f1583c88d', 'Ch 48 Ka', lineBch48ka, 'bottom','golongan-b');
      
      // Petak B.Ch 49
      const lineBch49 = [bch48Point, bch49Point];
      generateBangunanPembagi('B.Ch 49 (BC.V-XI)', 'topcenter', lineBch49, 0);
      
      const lineBoxBch49 = [bch49Point, [bch49Point[0]-0.058, bch49Point[1] + 0.08]];
      generateBox("3.150,60 Ha", "6,078 m3/s", "342,46 m", lineBoxBch49, 'top')

      const lineBoxBch49s = [bch49Point, [bch49Point[0]-0.18, bch49Point[1] + 0.05]];
      generateBox("548,00 Ha", "0,951 m3/s", "205,13 m", lineBoxBch49s, 'top')

      const lineBkw1 = [bch49Point, bkw1Point];
      generateBangunanSadap('B.Kw 1', 'centerright', lineBkw1, 0);
      
      const lineBoxBkw1 = [bkw1Point, [bkw1Point[0]-0.1, bkw1Point[1] + 0.05]];
      generateBox("486,00 Ha", "0,844 m3/s", "587,80 m", lineBoxBkw1, 'top')

      const lineKw1ka = [bkw1Point, [bkw1Point[0], 117.45]];
      generateBoxPetak('e28909f8-831d-4453-8ab5-a1910ab7eacc', ' Kw.1 Ka', lineKw1ka, 'left','golongan-b');

      const lineBkw2 = [bkw1Point, bkw2Point];
      generateBangunanSadap('B.Kw 2', 'centerright', lineBkw2, 0);

      const lineBoxBkw2 = [bkw2Point, [bkw2Point[0]-0.08, bkw2Point[1] + 0.05]];
      generateBox("457,00 Ha", "0,793 m3/s", "1539,16 m", lineBoxBkw2, 'top')

      const lineKw2ka = [bkw2Point, [bkw2Point[0], 117.45]];
      generateBoxPetak('fbffd0d4-92f7-45c0-bb32-1143e75c4511', 'Kw.2 Ka', lineKw2ka, 'left','golongan-b');

      const lineBkw3 = [bkw2Point,[-6.1,117.5], bkw3Point];
      generateBangunanPembagi('B.Kw 3', 'topcenter', lineBkw3, 0);

      const lineBoxBkw3 = [bkw3Point, [bkw3Point[0], bkw3Point[1] + 0.08]];
      generateBox("268,00 Ha", "0,465 m3/s", "93,08 m", lineBoxBkw3, 'top')

      const lineBoxBkw3s = [bkw3Point, [bkw3Point[0]-0.15, bkw3Point[1] - 0.05]];
      generateBox("189,00 Ha", "0,328 m3/s", "316,33 m", lineBoxBkw3s, 'top')

      const lineBkwka1 = [bkw3Point, bkwka1Point];
      generateBangunanSadap('B.Kw Ka1', 'centerleft', lineBkwka1, 0);

      const lineBoxBkwka1 = [bkwka1Point, [bkwka1Point[0]-0.07, bkwka1Point[1] - 0.05]];
      generateBox("118,00 Ha", "0,025 m3/s", "843,14 m", lineBoxBkwka1, 'top')

      const lineKwka1ki = [bkwka1Point, [bkwka1Point[0],117.8 ]];
      generateBoxPetak('a89dbaae-172d-4584-9be7-75d5a1a3c827', 'Kw.Ka 1 ki', lineKwka1ki, 'right','golongan-b');

      const lineBkwka2i = [bkwka1Point, bkwka2iPoint];
      generateBangunanSadap("B.Kw Ka2'", 'centerleft', lineBkwka2i, 0);

      const lineKwka2iki = [bkwka2iPoint, [bkwka2iPoint[0],117.8 ]];
      generateBoxPetak('3a4bef7b-5d6c-45d7-9f33-458989d989c8', "Kw.Ka 2' ki", lineKwka2iki, 'right','golongan-b');

      const lineBkwka2 = [bkwka2iPoint, bkwka2Point];
      generateBangunanSadap('B.Kw Ka2', 'centerleft', lineBkwka2, 0);

      const lineKwka2ki = [bkwka2Point, [bkwka2Point[0],117.8 ]];
      generateBoxPetak('', 'Kw.Ka 2 ki', lineKwka2ki, 'right','golongan-b');
      
      const lineBkw4 = [bkw3Point, bkw4Point];
      generateBangunanSadap('B.Kw 4', 'topcenter', lineBkw4, 0);

      const lineBoxBkw4 = [bkw4Point, [bkw4Point[0], bkw4Point[1] + 0.08]];
      generateBox("176,00 Ha", "0,306 m3/s", "1620,70 m", lineBoxBkw4, 'top')

      const lineKw4ka = [bkw4Point, [-6.15,bkw4Point[1]]];
      generateBoxPetak('72d29fda-4285-4d43-9a4f-f9147deea6f7', 'Kw.4 Ka', lineKw4ka, 'bottom','golongan-b');

      const lineBkw5 = [bkw4Point, bkw5Point];
      generateBangunanSadap('B.Kw 5', 'topcenter', lineBkw5, 0);

      const lineBoxBkw5 = [bkw5Point, [bkw5Point[0], bkw5Point[1] + 0.08]];
      generateBox("112,00 Ha", "0,194 m3/s", "766,19 m", lineBoxBkw5, 'top')

      const lineBkw5ka = [bkw5Point, [-6.15, bkw5Point[1]]];
      generateBoxPetak('338a7cdd-2c8b-4f15-b936-c7254777687e', 'Kw.5 Ka', lineBkw5ka, 'bottom','golongan-b');

      const lineBkw6 = [bkw5Point, bkw6Point];
      generateBangunanSadap('B.Kw 6', 'topcenter', lineBkw6, 0);

      const lineBoxBkw6 = [bkw6Point, [bkw6Point[0], bkw6Point[1] + 0.08]];
      generateBox("56,00 Ha", "0,097 m3/s", "765,10 m", lineBoxBkw6, 'top')

      const lineBkw6ka = [bkw6Point, [-6.15, bkw6Point[1]]];
      generateBoxPetak('872f46e7-55d4-4307-aa34-2eed59e90f86', 'Kw.6 Ka', lineBkw6ka, 'bottom','golongan-b');

      const lineBkw7 = [bkw6Point, bkw7Point];
      generateBangunanSadap('B.Kw 7', 'topcenter', lineBkw7, 0);
      
      const lineLw7ka = [bkw7Point, [-6.15, bkw7Point[1]]];
      generateBoxPetak('846a8884-c83e-4b2e-accd-9f4b5a2893cb', 'Kw.7 Ka', lineLw7ka, 'bottom','golongan-b');


      // Petak B.Ch 50
      const lineBch50 = [bch49Point, bch50Point];
      generateBangunanPembagiDanSadap(' B.Ch 50 (BC.IV-XI)', 'topcenter', lineBch50, 0);

      const lineBoxBch50 = [bch50Point, [bch50Point[0]-0.058, bch50Point[1] + 0.08]];
      generateBox("3.090,60 Ha", "5,962 m3/s", "1728,13 m", lineBoxBch50, 'top')
      
      const lineBch50ka = [bch50Point, [-5.75, 117.7]];
      generateBoxPetak('01f21f13-a299-47ef-ad63-6ad9647737a2', 'Ch 50 Ka', lineBch50ka, 'bottom','golongan-c');

      // Petak B.Ch 51
      const lineBch51 = [bch50Point, bch51Point];
      generateBangunanPembagiDanSadap('B.Ch 51 (BC.IV-XII)', 'topcenter', lineBch51, 0);
    
      const lineBoxBch51 = [bch51Point, [bch51Point[0]-0.058, bch51Point[1] + 0.08]];
      generateBox("3.051,60 Ha", "5,887 m3/s", "1108,70 m", lineBoxBch51, 'top')

      const lineBch51ka = [bch51Point, [-5.75, 118.1]];
      generateBoxPetak('db78df88-d4a9-4538-a2c4-fa1a7ce004c3', 'Ch 51 Ka', lineBch51ka, 'bottom','golongan-c');

      // Petak B.Ch 52
      const lineBch52 = [bch51Point, bch52Point];
      generateBangunanPembagiDanSadap('B.Ch 52 (BC.IV-XIII)', 'topcenter', lineBch52, 0);
      
      const lineBoxBch52 = [bch52Point, [bch52Point[0]-0.058, bch52Point[1] + 0.08]];
      generateBox("3.006,60 Ha", "5,800 m3/s", "769,32 m", lineBoxBch52, 'top')

      const lineBch52ka = [bch52Point, [-5.75, 118.3]];
      generateBoxPetak('05f93645-0f81-445b-8d06-1ab2d80fe23a', 'Ch 52 Ka', lineBch52ka, 'bottom','golongan-c');

      // Petak B.Ch 53
      const lineBch53 = [bch52Point, bch53Point];
      generateBangunanPembagiDanSadap('B.Ch 53 (BC.IV-XIV)', 'topcenter', lineBch53, 0);

      const lineBoxBch53 = [bch53Point, [bch53Point[0]-0.058, bch53Point[1] + 0.08]];
      generateBox("2.950,60 Ha", "5,692 m3/s", "494,59 m", lineBoxBch53, 'top')

      const lineBch53ki = [bch53Point, [-5.6, 118.5]];
      generateBoxPetak('09006327-68db-4dbc-a049-822b51da3451', 'Ch 53 Ki', lineBch53ki, 'top','golongan-c');
      
      // Petak B.Ch 54
      const lineBch54 = [bch53Point, bch54Point];
      generateBangunanPembagiDanSadap('B.Ch 54 (BC.IV-XV)', 'topcenter', lineBch54, 0);
      
      const lineBoxBch54 = [bch54Point, [bch54Point[0]-0.058, bch54Point[1] + 0.08]];
      generateBox("2.924,60 Ha", "5,642 m3/s", "1229,14", lineBoxBch54, 'top')

      const lineBch54ka = [bch54Point, [-5.75, 118.7]];
      generateBoxPetak('091766a8-e622-4c56-bac6-a1fff4a89efe', 'Ch 54 Ka', lineBch54ka, 'bottom','golongan-c');
    
      generateTextSaluranPrimer('SALURAN INDUK CIHAUR', [-6.2, 116.2], 270)
      generateTextSaluranSekunder('SAL.SEKUNDER JAGADENDA', [-6.18, 116.88], 270)
      generateTextSaluranSekunder('Ss  KAWUNGANTEN KANAN', [-6.5, 117.55], 270)
      generateTextSaluranSekunder('SAL.SEK.KAWUNGANTEN', [-6.05, 118], 0)
    
      
    }

    var initBch19 = function () {
      const bch54Point = [-5.65, 118.7];
      const bch55Point = [-5.65, 119.05];
      const bch56Point = [-5.5, 119.2];
      const bch57Point = [-5.15, bch56Point[1]];
      const bch58Point = [bch57Point[0], 119.5];
      const bch59Point = [bch57Point[0], 119.7];
      const bch60Point = [bch57Point[0], 119.9];
      const bch61iPoint = [bch57Point[0], 120.07];
      const bch61iiPoint = [bch57Point[0], 120.15];
      const bch61Point = [bch57Point[0], 120.25];
      const bch62Point = [bch57Point[0], 120.45];
      const bch63Point = [bch57Point[0], 120.63];
      const bch64Point = [bch57Point[0], 120.78];
      const bch65Point = [bch57Point[0], 120.98];
      const bch66Point = [bch57Point[0], 121.2];
      const bch67Point = [bch57Point[0], 121.35];
      const bch68iPoint = [bch57Point[0], 121.43];
      const bch68Point = [bch57Point[0], 121.51];
      const bch69Point = [bch57Point[0], 121.6];
      const bch70Point = [bch57Point[0], 121.85];
      const bch71iPoint = [-4.97, 121.95];
      const bch71Point = [-4.9, bch71iPoint[1]];
      const bch72iPoint = [-4.85, bch71iPoint[1]];
      const bch72Point = [-4.8, bch71iPoint[1]];
      const bch73Point = [-4.69, bch71iPoint[1]];
      const bch74Point = [-4.53, bch71iPoint[1]];
      const bch75Point = [-4.41, bch71iPoint[1]];
      const bks1Point = [-5.73, bch55Point[1]];
      const bks2Point = [-5.81, bch55Point[1]];
      const bks3Point = [-5.93, bch55Point[1]];
      const bks4Point = [-6.1, 119.67];
      const bsk5Point = [bks4Point[0], 119.9];
      const bsk6Point = [bks4Point[0], 120.2];
      const bsk7Point = [bks4Point[0], 120.53];
      const bbo1Point = [bks2Point[0], 119.36];
      const bbo2Point = [bks2Point[0], 119.67];
      const bbo3Point = [bks2Point[0], 119.9];
      const bbo4Point = [bks2Point[0], 120.2];
      const bbr1Point = [bch56Point[0], 119.53];
      const bbr2Point = [bch56Point[0], 119.74];
      const bbr3Point = [bch56Point[0], 119.97];
      const bbr4Point = [bch56Point[0], 120.31];
      const bkk1Point = [-4.95,bch56Point[1]];
      const bkk2Point = [-4.85,bch56Point[1]];
      const bkk3Point = [-4.70,bch56Point[1]];
      const bkk4iPoint = [-4.55,bch56Point[1]];
      const bkk4Point = [-4.51,119.53];
      const bkk5Point = [bkk4Point[0], 119.74];
      const bum1Point = [bkk2Point[0], 119.74];
      const bum2Point = [bkk2Point[0], 119.97];
      const bum3Point = [bkk2Point[0], 120.31];
      const bum4Point = [bkk2Point[0], 120.53];
      const bbb1Point = [-5.45, bch66Point[1]];
      const bbb2Point = [-5.66, bch66Point[1]];
      const bbb3Point = [-5.81, bch66Point[1]];
      const bbn1Point = [-5.55, bch69Point[1]];
      const bbn2Point = [-5.89, bch69Point[1]];
      const bpr1iPoint = [-5.35, bch70Point[1]];
      const bpr1Point = [-5.45, bch70Point[1]];
      const bpr2Point = [-5.66, bch70Point[1]];
      const bpr3Point = [-5.75, bch70Point[1]];
      const bpr4Point = [-6, bch70Point[1]];

      // Petak B.Ch 55
      const lineBch55 = [bch54Point, bch55Point];
      generateBangunanPembagi('B.Ch 55 (BC.V-I)', 'topcenter', lineBch55, 0);
      
      const lineBoxBch55s = [bch55Point, [bch55Point[0]-0.08, bch55Point[1] - 0.055]];
      generateBox("441,00 Ha", "8,139 m3/s", "651,25 m", lineBoxBch55s, 'top')

      const lineBoxBch55 = [bch56Point, [bch56Point[0]-0.1, bch56Point[1]+ 0.055 ]];
      generateBox("2.483,60 Ha", "4,791 m3/s", "789,02 m", lineBoxBch55, 'top')

      const lineBks1 = [bch55Point, bks1Point];
      generateBangunanPembagiDanSadap('B.Ks 1', 'topright', lineBks1, 0);

      const lineBoxBks1 = [bks1Point, [bks1Point[0]-0.07, bks1Point[1] - 0.055]];
      generateBox("394,00 Ha", "0,684 m3/s", "132,80 m", lineBoxBks1, 'top')

      const lineKs1ki = [bks1Point, [bks1Point[0], 119.1]];
      generateBoxPetak('174b9cc9-756e-4d22-9418-813256976c62', 'Ks. 1 Ki', lineKs1ki, 'right','golongan-b');

      const lineBks2 = [bks1Point, bks2Point];
      generateBangunanPembagi('B.Ks 2', 'topright', lineBks2, 0);
      
      const lineBoxBks2 = [bks2Point, [bks2Point[0]-0.07, bks2Point[1] - 0.05]];
      generateBox("181,00 Ha", "0,314 m3/s", "612,37 m", lineBoxBks2, 'top')

      const lineBoxBks2s = [bks2Point, [bks2Point[0] - 0.06, bks2Point[1] + 0.1]];
      generateBox("213,00 Ha", "0,369 m3/s", "151,42 m", lineBoxBks2s, 'top')

      const lineBks3 = [bks2Point, bks3Point];
      generateBangunanPembagiDanSadap('B.Ks 3', 'topright', lineBks3, 0);
      
      const lineBoxBks3 = [bks3Point, [bks4Point[0], bks4Point[1] - 0.3]];
      generateBox("134,00 Ha", "0,233 m3/s", "569,41 m", lineBoxBks3, 'top')

      const lineKs3ki = [bks3Point, [bks3Point[0], 119.1]];
      generateBoxPetak('d7fa4905-2d39-4f4e-a120-59df6a11a0fc', 'Ks. 3 Ki', lineKs3ki, 'right','golongan-b');

      const lineBks4 = [bks3Point,[-6.1,119.05], bks4Point];
      generateBangunanPembagiDanSadap('B.Ks 4', 'topright', lineBks4, 0);

      const lineBoxBks4 = [bks4Point, [bks4Point[0]-0.06, bks4Point[1] + 0.15]];
      generateBox("79,00 Ha", "0,137 m3/s", "2811,37 m", lineBoxBks4, 'top')

      const lineKs4ki = [bks4Point, [-6.05, bks4Point[1]]];
      generateBoxPetak('beb780ab-64c9-4940-b2e9-b23893bb6c06', 'Ks. 4 Ki', lineKs4ki, 'top','golongan-b');
      
      const lineKs4ka = [bks4Point, [-6.15, bks4Point[1]]];
      generateBoxPetak('e9f3dff0-9019-4674-a734-e1245f4bea27', 'Ks. 4 Ka', lineKs4ka, 'bottom','golongan-b');

      const lineBsk5 = [bks4Point, bsk5Point];
      generateBangunanSadap('B.Sk 5', 'topright', lineBsk5, 0);

      const lineBoxBsk5 = [bsk5Point, [bsk5Point[0]-0.06, bsk5Point[1] + 0.15]];
      generateBox("42,00 Ha", "0,073 m3/s", "289,62 m", lineBoxBsk5, 'top')

      const lineKs5ki = [bsk5Point, [-6.05, bsk5Point[1]]];
      generateBoxPetak('1e87f60b-6137-45d9-8bbe-43531f72376f', 'Ks. 5 Ki', lineKs5ki, 'top','golongan-b');

      const lineBsk6 = [bsk5Point, bsk6Point];
      generateBangunanSadap('B.Sk 6', 'topright', lineBsk6, 0);

      const lineBoxBsk6 = [bsk6Point, [bsk6Point[0]-0.06, bsk6Point[1] + 0.15]];
      generateBox("22,00 Ha", "0,038 m3/s", "953,28 m", lineBoxBsk6, 'top')

      const lineKs6ki = [bsk6Point, [-6.05, bsk6Point[1]]];
      generateBoxPetak('0d084f38-fc83-467f-b2e1-d71778f2d296', 'Ks. 6 Ki', lineKs6ki, 'top','golongan-b');

      const lineBsk7 = [bsk6Point, bsk7Point];
      generateBangunanSadap('B.Sk 7', 'topright', lineBsk7, 0);

      const lineKs7ki = [bsk7Point, [-6.05, bsk7Point[1]]];
      generateBoxPetak('d9a33d14-748e-4795-a410-f866af15deb8', 'Ks. 7 Ki', lineKs7ki, 'top','golongan-b');

      const linebbo1 = [bks2Point, bbo1Point];
      generateBangunanSadap('B.Bo 1', 'topleft', linebbo1, 0);

      const lineBoxBbo1 = [bbo1Point, [bbo1Point[0]-0.06, bbo1Point[1] + 0.1]];
      generateBox("176,00 Ha", "0,306 m3/s", "762,32 m", lineBoxBbo1, 'top')

      const linebo1ka = [bbo1Point, [-5.87, bbo1Point[1]]];
      generateBoxPetak('a4009200-64a9-46f1-9fe3-679a5fd3d50c', 'Bo. 1 Ka', linebo1ka, 'bottom','golongan-b');

      const linebbo2 = [bbo1Point, bbo2Point];
      generateBangunanSadap('B.Bo 2', 'topleft', linebbo2, 0);

      const lineBoxBbo2 = [bbo2Point, [bbo2Point[0], bbo2Point[1] + 0.12]];
      generateBox("93,00 Ha", "0,161 m3/s", "779,67 m", lineBoxBbo2, 'top')

      const linebo2ki = [bbo2Point, [-5.77, bbo2Point[1]]];
      generateBoxPetak('92bf40db-22ba-41be-a888-2d789cfb26b4', 'Bo. 2 Ki', linebo2ki, 'top','golongan-b');

      const linebo2ka = [bbo2Point, [-5.87, bbo2Point[1]]];
      generateBoxPetak('79a18ba2-a098-4946-80e7-d249f14539b4', 'Bo. 2 Ka', linebo2ka, 'bottom','golongan-b');

      const linebbo3 = [bbo2Point, bbo3Point];
      generateBangunanSadap('B.Bo 3', 'topleft', linebbo3, 0);

      const lineBoxBbo3 = [bbo3Point, [bbo3Point[0]-0.06, bbo3Point[1] + 0.1]];
      generateBox("63,00 Ha", "0,109 m3/s", "1231,16 m", lineBoxBbo3, 'top')

      const lineBo3ka = [bbo3Point, [-5.87, bbo3Point[1]]];
      generateBoxPetak('18357d94-6805-4f16-a67d-af8b342fec78', 'Bo. 3 Ka', lineBo3ka, 'bottom','golongan-b');

      const linebbo4 = [bbo3Point, bbo4Point];
      generateBangunanSadap('B.Bo 4', 'topleft', linebbo4, 0);

      const lineBo4ki = [bbo4Point, [-5.77, bbo4Point[1]]];
      generateBoxPetak('636d57b9-569d-427d-bc70-69fa41b31a89', 'Bo. 4 Ki', lineBo4ki, 'top','golongan-b');

      const lineBo4ka = [bbo4Point, [-5.87, bbo4Point[1]]];
      generateBoxPetak('ebc95ed2-fe73-4b4f-8327-1f6cd71a370b', 'Bo. 4 Ka', lineBo4ka, 'bottom');

      // Petak B.Ch 56
      const lineBch56 = [bch55Point,[-5.65, 119.2], bch56Point];
      generateBangunanPembagi('B.Ch 56 (BC.V-II)', 'topleft', lineBch56, 0);

      const lineBoxBch56 = [bch56Point, [bch56Point[0]+0.1, bch56Point[1] + 0.05]];
      generateBox("2.190,60 Ha", "4,226 m3/s", "693,55 m", lineBoxBch56, 'top')

      const lineBoxBch56s = [bch56Point, [bch56Point[0], bch56Point[1] + 0.15]];
      generateBox("293,00 Ha", "0,509 m3/s", "51,76 m", lineBoxBch56s, 'top')

      const lineBbr1 = [bch56Point, bbr1Point];
      generateBangunanSadap('B.Br 1', 'topright', lineBbr1, 0);

      const lineBoxBbr1 = [bbr1Point, [bbr1Point[0], bbr1Point[1] + 0.1]];
      generateBox("198,00 Ha", "0,344 m3/s", "1091,61 m", lineBoxBbr1, 'top')

      const lineBr1ki = [bbr1Point, [-5.44, bbr1Point[1]]];
      generateBoxPetak('c8870912-6570-4785-91a0-02be0a19df94', 'Br. 1 Ki', lineBr1ki, 'top','golongan-b');

      const lineBr1ka = [bbr1Point, [-5.55, bbr1Point[1]]];
      generateBoxPetak('6fd3edab-9f4d-4763-aff9-cc3d94b1ebde', 'Br. 1 Ka', lineBr1ka, 'bottom','golongan-b');

      const lineBbr2 = [bbr1Point, bbr2Point];
      generateBangunanSadap('B.Br 2', 'topright', lineBbr2, 0);

      const lineBoxBbr2 = [bbr2Point, [bbr2Point[0], bbr2Point[1] + 0.1]];
      generateBox("110,00 Ha", "0,191 m3/s", "1071,09 m", lineBoxBbr2, 'top')

      const lineBr2ki = [bbr2Point, [-5.44, bbr2Point[1]]];
      generateBoxPetak('4d1d34b2-1627-412d-8390-1a4984eeefbe', 'Br. 2 Ki', lineBr2ki, 'top','golongan-b');

      const lineBr2ka = [bbr2Point, [-5.55, bbr2Point[1]]];
      generateBoxPetak('f507cebc-5890-439c-a433-6c367cb84dcb', 'Br. 2 Ka', lineBr2ka, 'bottom','golongan-b');

      const lineBbr3 = [bbr2Point, bbr3Point];
      generateBangunanSadap('B.Br 3', 'topright', lineBbr3, 0);
      
      const lineBoxBbr3 = [bbr3Point, [bbr3Point[0], bbr3Point[1] + 0.1]];
      generateBox("62,00 Ha", "0,108 m3/s", "510,30 m", lineBoxBbr3, 'top')

      const lineBr3ki = [bbr3Point, [-5.44, bbr3Point[1]]];
      generateBoxPetak('567956a9-69cf-4540-b613-8eae57eccee0', 'Br. 3 Ki', lineBr3ki, 'top','golongan-b');

      const lineBbr4 = [bbr3Point, bbr4Point];
      generateBangunanSadap('B.Br 4', 'topright', lineBbr4, 0);

      const lineBr4ki = [bbr4Point, [-5.45, bbr4Point[1]]];
      generateBoxPetak('84050b0a-747d-41ee-9054-9e5b03d3c969', 'Br. 4 Ki', lineBr4ki, 'top','golongan-b');

      const lineBr4ka = [bbr4Point, [-5.55, bbr4Point[1]]];
      generateBoxPetak('c78356f9-5c3a-4f6b-8580-fb9d5711e6a9', 'Br. 4 Ka', lineBr4ka, 'bottom','golongan-b');

      const lineBr4te = [bbr4Point, [bbr4Point[0], 120.4]];
      generateBoxPetak('257b8ca7-1d42-4942-b6b5-b41d5b80bf72', 'Br. 4 Te', lineBr4te, 'right','golongan-b');

      // Petak B.Ch 57
      const lineBch57 = [bch56Point, bch57Point];
      generateBangunanPembagi('B.Ch 57 (BC.V-III)', 'topcenter', lineBch57, 0);
      
      const lineBoxBch57 = [bch57Point, [bch57Point[0], bch57Point[1] + 0.15]];
      generateBox("1.723,60 Ha", "3,325 m3/s", "65,41 m", lineBoxBch57, 'top')

      const lineBoxBch57s = [bch57Point, [bch57Point[0]+0.08, bch57Point[1] + 0.05]];
      generateBox("467,00 Ha", "0,811 m3/s", "766,44 m", lineBoxBch57s, 'top')

      const lineBkk1 = [bch57Point, bkk1Point];
      generateBangunanSadap('B.Kk 1', 'centerleft', lineBkk1, 0);

      const lineBoxBkk1 = [bkk1Point, [bkk1Point[0] + 0.02, bkk1Point[1] - 0.05]];
      generateBox("444,00 Ha", "0,771 m3/s", "482,41 m", lineBoxBkk1, 'top')
      
      const lineKk1ka = [bkk1Point, [bkk1Point[0],119.25 ]];
      generateBoxPetak('f94b5dc49-5ce9-4933-ae8c-b4672a47d5e5', 'Kk. 1 Ka', lineKk1ka, 'right','golongan-c');

      const lineBkk2 = [bkk1Point, bkk2Point];
      generateBangunanPembagi('B.Kk 2', 'centerleft', lineBkk2, 0);

      const lineBoxBkk2 = [bkk2Point, [bkk2Point[0] + 0.05, bkk2Point[1] + 0.05]];
      generateBox("141,00 Ha", "0,245 m3/s", "510,60 m", lineBoxBkk2, 'top')

      const lineBoxBkk2s = [bkk2Point, [bkk2Point[0] , bkk2Point[1] + 0.15]];
      generateBox("299,00 Ha", "0,519 m3/s", "52,27 m", lineBoxBkk2s, 'top')

      const lineBum1 = [bkk2Point, bum1Point];
      generateBangunanSadap('B.Um 1', 'topleft', lineBum1, 0);

      const lineBoxBum1 = [bum1Point, [bum1Point[0], bum1Point[1] + 0.08]];
      generateBox("241,00 Ha", "0,418 m3/s", "783,46 m", lineBoxBum1, 'top')

      const lineUm1ki = [bum1Point, [-4.78,bum1Point[1] ]];
      generateBoxPetak('bd6969eb-1c2a-4c59-b4fd-e8d7e95fa1d6', 'Um. 1 Ki', lineUm1ki, 'top','golongan-c');

      const lineUm1ka = [bum1Point, [-4.9,bum1Point[1] ]];
      generateBoxPetak('8316cbd2-3c8d-458e-8007-e24fde144a21', 'Um. 1 Ka', lineUm1ka, 'bottom','golongan-c');

      const lineBum2 = [bum1Point, bum2Point];
      generateBangunanSadap('B.Um 2', 'topleft', lineBum2, 0);

      const lineBoxBum2 = [bum2Point, [bum2Point[0], bum2Point[1] + 0.08]];
      generateBox("160,00 Ha", "0,278 m3/s", "417,37 m", lineBoxBum2, 'top')
      
      const lineUm2ki = [bum2Point, [-4.78,bum2Point[1] ]];
      generateBoxPetak('79e2f439-0078-4846-b34b-8216661e6c13', 'Um. 2 Ki', lineUm2ki, 'top','golongan-c');

      const lineUm2ka = [bum2Point, [-4.9,bum2Point[1] ]];
      generateBoxPetak('7a76405c-795b-4209-a61a-9f753b82c04b', 'Um. 2 Ka', lineUm2ka, 'bottom','golongan-c');

      const lineBum3 = [bum2Point, bum3Point];
      generateBangunanSadap('B.Um 3', 'topleft', lineBum3, 0);

      const lineBoxBum3 = [bum3Point, [bum3Point[0], bum3Point[1] + 0.08]];
      generateBox("66,00 Ha", "0,115 m3/s", "453,99 m", lineBoxBum3, 'top')
      
      const lineUm3ki = [bum3Point, [-4.78,bum3Point[1] ]];
      generateBoxPetak('8a60304f-fb4f-48a7-9ca7-8c7c0d3f5f99', 'Um. 3 Ki', lineUm3ki, 'top','golongan-c');

      const lineUm3ka = [bum3Point, [-4.9,bum3Point[1] ]];
      generateBoxPetak('d5d3d759-8c47-4b80-b37b-c71e567e188f', 'Um. 3 Ka', lineUm3ka, 'bottom','golongan-c');

      const lineBum4 = [bum3Point, bum4Point];
      generateBangunanSadap('B.Um 4', 'topleft', lineBum4, 0);

      const lineUm4ki = [bum4Point, [-4.8,bum4Point[1] ]];
      generateBoxPetak('2510f409-4b2e-4a5a-be91-d47b097e36ff', 'Um. 4 Ki', lineUm4ki, 'top','golongan-c');

      const lineUm4ka = [bum4Point, [-4.9,bum4Point[1] ]];
      generateBoxPetak('19950ae5-eca1-4973-b6b5-b01c2881b274', 'Um. 4 Ka', lineUm4ka, 'bottom','golongan-c');

      const lineBkk3 = [bkk2Point, bkk3Point];
      generateBangunanSadap('B.Kk 3', 'centerleft', lineBkk3, 0);

      const lineBoxBkk3 = [bkk3Point, [bkk3Point[0] + 0.02, bkk3Point[1] - 0.05]];
      generateBox("106,00 Ha", "0,184 m3/s", "890,62 m", lineBoxBkk3, 'top')

      const linekk3ka = [bkk3Point, [bkk3Point[0],119.25 ]];
      generateBoxPetak('245d151c-6c25-41f6-80e3-7146e26f5061', 'Kk. 3 Ka', linekk3ka, 'right','golongan-c');

      const lineBkk4i = [bkk3Point, bkk4iPoint];
      generateBangunanSadap("B.Kk 4'", 'centerleft', lineBkk4i, 0);
      
      const lineKk4iki = [bkk4iPoint, [bkk4iPoint[0], 119.25]];
      generateBoxPetak('', "Kk. 4' Ki", lineKk4iki, 'right','golongan-c');
      
      const lineBkk4 = [bkk4iPoint,[-4.51,119.2], bkk4Point];
      generateBangunanSadap('B.Kk 4', 'topleft', lineBkk4, 0);
      
      const lineBoxBkk4 = [bkk4Point, [bkk4Point[0], bkk4Point[1] + 0.1]];
      generateBox("88,00 Ha", "0,153 m3/s", "395,99 m", lineBoxBkk4, 'top')

      const lineKk4ka = [bkk4Point, [-4.55, bkk4Point[1]]];
      generateBoxPetak('8dcdbeac-8825-489b-b36b-b88b4dc9b719', 'Kk. 4 Ka', lineKk4ka, 'bottom','golongan-c');

      const lineBkk5 = [bkk4Point, bkk5Point];
      generateBangunanSadap('B.Kk 5', 'topcenter', lineBkk5, 0);

      const lineBoxBkk5 = [bkk5Point, [bkk5Point[0], bkk5Point[1] + 0.1]];
      generateBox("36,00 Ha", "0,063 m3/s", "451,59 m", lineBoxBkk5, 'top')

      const lineKk5ka = [bkk5Point, [-4.55, bkk5Point[1]]];
      generateBoxPetak('f206325f-458f-410c-9c69-e14fd4593fa9', 'Kk. 5 Ka', lineKk5ka, 'bottom','golongan-c');

      const lineKk5te = [bkk5Point, [bkk5Point[0], 119.95]];
      generateBoxPetak('060581ea-4232-4d48-b9f6-2b15b970c932', 'Kk. 5 Te', lineKk5te, 'right','golongan-c');

      // Petak B.Ch 58
      const lineBch58 = [bch57Point, bch58Point];
      generateBangunanPembagiDanSadap('B.Ch 58 (BC.V-IV)', 'topcenter', lineBch58, 0);

      const lineBoxBch58 = [bch58Point, [bch58Point[0]-0.06, bch58Point[1] + 0.1]];
      generateBox("1.628,60 Ha", "3,142 m3/s", "575,51 m", lineBoxBch58, 'top')

      const lineCh58ki = [bch58Point, [-5.1, bch58Point[1]]];
      generateBoxPetak('a616665e-ef63-4873-ba4e-b94532a59333', 'Ch 58 Ki', lineCh58ki, 'top','golongan-c');

      const lineCh58ka = [bch58Point, [-5.23, bch58Point[1]]];
      generateBoxPetak('d21d3b99-f267-49a9-b9ee-ac327bf4b517', 'Ch 58 Ka', lineCh58ka, 'bottom','golongan-c');

      // Petak B.Ch 59
      const lineBch59 = [bch58Point, bch59Point];
      generateBangunanPembagiDanSadap('B.Ch 59 (BC.V-V)', 'topcenter', lineBch59, 0);

      const lineBoxBch59 = [bch59Point, [bch59Point[0]-0.06, bch59Point[1] + 0.1]];
      generateBox("1.542,10 Ha", "2,975 m3/s", "757,92 m", lineBoxBch59, 'top')

      const lineCh59ki = [bch59Point, [-5.1, bch59Point[1]]];
      generateBoxPetak('238aa4e1-107c-4b3c-b04a-2cc68ddc36e4', 'Ch 59 Ki', lineCh59ki, 'top','golongan-c');

      const lineCh59ka = [bch59Point, [-5.23, bch59Point[1]]];
      generateBoxPetak('ca11a709-0936-4014-bbf2-cb583c4171d7', 'Ch 59 Ka', lineCh59ka, 'bottom','golongan-c');

      // Petak B.Ch 60
      const lineBch60 = [bch59Point, bch60Point];
      generateBangunanPembagiDanSadap('B.Ch 60', 'topcenter', lineBch60, 0);

      const lineBoxBch60 = [bch60Point, [bch60Point[0]-0.06, bch60Point[1] + 0.1]];
      generateBox("1.431,10 Ha", "2,761 m3/s", "1003,92 m", lineBoxBch60, 'top')

      const lineCh60ki = [bch60Point, [-5.1, bch60Point[1]]];
      generateBoxPetak('276b6dc6-0595-41c9-b2da-d4747436bd6c', 'Ch 60 Ki', lineCh60ki, 'top','golongan-c');

      const lineCh60ka = [bch60Point, [-5.23, bch60Point[1]]];
      generateBoxPetak('1f93e31d-4317-4a56-9427-32f8c28000d7', 'Ch 60 Ka', lineCh60ka, 'bottom','golongan-c');

      // Petak B.Ch 61'
      const lineBch61i = [bch60Point, bch61iPoint];
      generateBangunanPembagiDanSadap("B.Ch 61'", 'topcenter', lineBch61i, 0);

      const lineCh61iki = [bch61iPoint, [-5.1, bch61iPoint[1]]];
      generateBoxPetak('', "Ch 61' Ki", lineCh61iki, 'top','golongan-c');

      const lineCh61ika = [bch61iPoint, [-5.23, bch61iPoint[1]]];
      generateBoxPetak('', "Ch 61' Ka", lineCh61ika, 'bottom','golongan-c');

      // Petak B.Ch 61''
      const lineBch61ii = [bch61iPoint, bch61iiPoint];
      generateBangunanPembagiDanSadap("B.Ch 61''", 'topcenter', lineBch61ii, 0);

      const lineCh61iika = [bch61iiPoint, [-5.24, 120.2]];
      generateBoxPetak('', "Ch 61'' Ki", lineCh61iika, 'right','golongan-c');

      // Petak B.Ch 61
      const lineBch61 = [bch61iiPoint, bch61Point];
      generateBangunanPembagiDanSadap('B.Ch 61', 'topcenter', lineBch61, 0);

      const lineBoxBch61 = [bch61Point, [bch61Point[0], bch61Point[1] + 0.1]];
      generateBox("1.358,10 Ha", "2,620 m3/s", "163,21 m", lineBoxBch61, 'top')

      const lineCh61ki = [bch61Point, [-5.08, bch61Point[1]]];
      generateBoxPetak('929447ae-2fd8-4355-be18-cc1b81e2d778', 'Ch 61 Ki', lineCh61ki, 'top','golongan-c');

      // Petak B.Ch 62
      const lineBch62 = [bch61Point, bch62Point];
      generateBangunanPembagiDanSadap('B.Ch 62', 'topcenter', lineBch62, 0);

      const lineBoxBch62 = [bch62Point, [bch62Point[0], bch62Point[1] + 0.1]];
      generateBox("1.300,100 Ha", "2,508 m3/s", "454,36 m", lineBoxBch62, 'top')

      const lineCh62ki = [bch62Point, [-5.08, bch62Point[1]]];
      generateBoxPetak('f588b44d-92b2-4c52-92d9-c97f301140a7', 'Ch 62 Ki', lineCh62ki, 'top','golongan-c');

      // Petak B.Ch 63
      const lineBch63 = [bch62Point, bch63Point];
      generateBangunanPembagiDanSadap('B.Ch 63', 'topcenter', lineBch63, 0);

      const lineBoxBch63 = [bch63Point, [bch63Point[0], bch63Point[1] + 0.08]];
      generateBox("1.264,10 Ha", "2,438 m3/s", "250,60 m", lineBoxBch63, 'top')

      const lineCh63ki = [bch63Point, [-5.08, bch63Point[1]]];
      generateBoxPetak('943f8e56-2bc1-49de-bb74-4dd1b5bdc91d', 'Ch 63 Ki', lineCh63ki, 'top','golongan-c');

      // Petak B.Ch 64
      const lineBch64 = [bch63Point, bch64Point];
      generateBangunanPembagiDanSadap('B.Ch 64', 'topcenter', lineBch64, 0);

      const lineBoxBch64 = [bch64Point, [bch64Point[0], bch64Point[1] + 0.08]];
      generateBox("1.209,30 Ha", "2,333 m3/s", "307,08 m", lineBoxBch64, 'top')

      const lineCh64ka = [bch64Point, [-5.2, bch64Point[1]]];
      generateBoxPetak('036297af-227f-4a07-a61d-f44aa855d768', 'Ch 64 Ka', lineCh64ka, 'bottom','golongan-c');

      // Petak B.Ch 65
      const lineBch65 = [bch64Point, bch65Point];
      generateBangunanPembagiDanSadap('B.Ch 65 (BC.V-X)', 'topcenter', lineBch65, 0);

      const lineBox65 = [bch65Point, [bch65Point[0]-0.06, bch65Point[1] + 0.16]];
      generateBox("1.126,30 Ha", "2,173 m3/s", "275,21 m", lineBox65, 'top')

      const lineCh65ka = [bch65Point, [-5.2, bch65Point[1]]];
      generateBoxPetak('bac89ff6-db38-470b-b84c-3339bee70840', 'Ch 65 Ka', lineCh65ka, 'bottom','golongan-c');

      // Petak B.Ch 66
      const lineBch66 = [bch65Point, bch66Point];
      generateBangunanPembagi('B.Ch 66 (BC.V-XI)', 'topcenter', lineBch66, 270);

      const lineBoxBch66 = [bch66Point, [bch66Point[0], bch66Point[1] + 0.08]];
      generateBox("874,20 Ha", "1,686 m3/s", "144,16 m", lineBoxBch66, 'top')

      const lineBoxBch66i = [bch66Point, [bch66Point[0]-0.06, bch66Point[1] + 0.08]];
      generateBox("950,30 Ha", "1,833 m3/s", "839,17 m", lineBoxBch66i, 'top')
      
      const lineBoxBch66s = [bch66Point, [bch66Point[0]-0.25, bch66Point[1] - 0.05]];
      generateBox("176,00 Ha", "0,306 m3/s", "123,96 m", lineBoxBch66s, 'top')

      const lineBbb1 = [bch66Point, bbb1Point];
      generateBangunanSadap('B.Bb 1', 'topleft', lineBbb1, 0);

      const lineBoxBbb1 = [bbb1Point, [bbb1Point[0]-0.13, bbb1Point[1] - 0.05]];
      generateBox("132,00 Ha", "0,229 m3/s", "638,19 m", lineBoxBbb1, 'top')

      const lineBb1ka = [bbb1Point, [bbb1Point[0],121.15 ]];
      generateBoxPetak('7fe4ca05-906b-4350-94d3-57d1286d5a17', 'B.B 1 Ka', lineBb1ka, 'left','golongan-c');

      const lineBb1ki = [bbb1Point, [bbb1Point[0],121.25 ]];
      generateBoxPetak('b032b13c-cdcd-410b-bc6c-eb9a137ac292', 'B.B 1 Ki', lineBb1ki, 'right','golongan-c');

      const lineBbb2 = [bbb1Point, bbb2Point];
      generateBangunanSadap('B.Bb 2', 'topleft', lineBbb2, 0);

      const lineBoxBb2 = [bbb2Point, [bbb2Point[0]-0.1, bbb2Point[1] + 0.05]];
      generateBox("42,00 Ha", "0,073 m3/s", "514,65 m", lineBoxBb2, 'top')

      const lineBb2ka = [bbb2Point, [bbb2Point[0],121.15 ]];
      generateBoxPetak('eee660ea-7665-4e22-801e-b4876701ec8d', 'B.B 2 Ka', lineBb2ka, 'left','golongan-c');

      const lineBb2ki = [bbb2Point, [bbb2Point[0],121.25 ]];
      generateBoxPetak('33576b16-60a0-4153-8d2a-5f3f587e9231', 'B.B 2 Ki', lineBb2ki, 'right','golongan-c');

      const lineBbb3 = [bbb2Point, bbb3Point];
      generateBangunanSadap('B.Bb 3', 'topright', lineBbb3, 0);

      const lineBb3ka = [bbb3Point, [bbb3Point[0],121.15 ]];
      generateBoxPetak('', 'B.B 3 Ka', lineBb3ka, 'left','golongan-c');

      const lineBb3te = [bbb3Point, [-5.85, bbb3Point[1]]];
      generateBoxPetak('d5cb771a-7b3f-450f-b59b-2fdfe8f1fa21', 'B.B 3 Te', lineBb3te, 'bottom','golongan-c');
      
      // Petak B.Ch 67
      const lineBch67 = [bch66Point, bch67Point];
      generateBangunanPembagiDanSadap('B.Ch 67', 'topcenter', lineBch67, 270);

      const lineCh67ka = [bch67Point, [-5.3, bch67Point[1]]];
      generateBoxPetak('e6689908-21f8-45a7-9c44-42f7919492ec', 'Ch 67 Ka', lineCh67ka, 'bottom','golongan-c');

      // Petak B.Ch 68'
      const lineBch68i = [bch67Point, bch68iPoint];
      generateBangunanPembagiDanSadap("B.Ch 68'", 'topright', lineBch68i, 270);
      
      const lineCh68ika = [bch68iPoint, [-5.2, bch68iPoint[1]]];
      generateBoxPetak('', "Ch 68' Ka", lineCh68ika, 'bottom','golongan-c');

      // Petak B.Ch 68
      const lineBch68 = [bch68iPoint, bch68Point];
      generateBangunanPembagiDanSadap('B.Ch 68', 'topcenter', lineBch68, 270);

      const lineBoxBch68 = [bch68Point, [bch68Point[0], bch68Point[1] + 0.05]];
      generateBox("831,70 Ha", "1,604 m3/s", "765,79 m", lineBoxBch68, 'top')

      const lineCh68ki = [bch68Point, [-5.05, bch68Point[1]]];
      generateBoxPetak('c5b7b3e4-6c', 'Ch 68 Ki', lineCh68ki, 'right','golongan-c');

      // Petak B.Ch 69
      const lineBch69 = [bch68Point, bch69Point];
      generateBangunanPembagi('B.Ch 69', 'bottomright', lineBch69, 0);

      const lineBoxBch69 = [bch69Point, [bch69Point[0]-0.06, bch69Point[1] + 0.15]];
      generateBox("671,70 Ha", "1,296 m3/s", "341,74 m", lineBoxBch69, 'top')

      const lineBoxBch69s = [bch69Point, [bch69Point[0] - 0.2, bch69Point[1] - 0.05]];
      generateBox("160,00 Ha", "0,278 m3/s", "39,71 m", lineBoxBch69s, 'top')

      const lineBbn1 = [bch69Point, bbn1Point];
      generateBangunanSadap('B.Bn 1', 'topleft', lineBbn1, 0);

      const lineBoxBbn1 = [bbn1Point, [bbn1Point[0]-0.2, bbn1Point[1] - 0.05]];
      generateBox("74,00 Ha", "0,128 m3/s", "1234,77 m", lineBoxBbn1, 'top')

      const lineBn1ka = [bbn1Point, [bbn1Point[0],121.55 ]];
      generateBoxPetak('f08cbe68-693b-4b9c-8a43-3711c2a8ab8b', 'B.Bn 1 Ka', lineBn1ka, 'left','golongan-c');

      const lineBn1ki = [bbn1Point, [bbn1Point[0],121.65 ]];
      generateBoxPetak('debc2472-78e4-4a5a-9a51-f9da99370ce5', 'B.Bn 1 Ki', lineBn1ki, 'right','golongan-c');

      const lineBbn2 = [bbn1Point, bbn2Point];
      generateBangunanSadap('B.Bn 2', 'topleft', lineBbn2, 0);

      const lineBn2ki = [bbn2Point, [bbn2Point[0],121.65 ]];
      generateBoxPetak('8c6217ae-4b1d-40dc-90e0-4813530f8842', 'B.Bn 2 Ki', lineBn2ki, 'right','golongan-c');

      // Petak B.Ch 70
      const lineBch70 = [bch69Point, bch70Point];
      generateBangunanPembagi('B.Ch 70', 'topright', lineBch70, 0);

      const lineBoxBch70 = [bch71iPoint, [bch71iPoint[0]-0.07, bch71iPoint[1] - 0.05]];
      generateBox("375,70 Ha", "0,725 m3/s", "771,00 m", lineBoxBch70, 'top')

      const lineBoxBch70s = [bch70Point, [bch70Point[0] - 0.17, bch70Point[1] - 0.05]];
      generateBox("296,00 Ha", "0,514 m3/", "290,12 m", lineBoxBch70s, 'top')

      const lineCh70ki = [bch70Point, [-5.05, bch70Point[1]]];
      generateBoxPetak('', 'Ch 70 Ki', lineCh70ki, 'left','golongan-c');

      const lineBpr1i = [bch70Point, bpr1iPoint];
      generateBangunanSadap("B.Pr 1'", 'topleft', lineBpr1i, 0);

      const lineBpr1iki = [bpr1iPoint, [bpr1iPoint[0],121.9]];
      generateBoxPetak('', "Pr. 1' Ki", lineBpr1iki, 'right','golongan-c');

      const lineBpr1 = [bpr1iPoint, bpr1Point];
      generateBangunanSadap('B.Pr 1', 'topleft', lineBpr1, 0);

      const lineBoxBpr1 = [bpr1Point, [bpr1Point[0]-0.13, bpr1Point[1] + 0.05]];
      generateBox("259,00 Ha", "0,450 m3/s", "569,35 m", lineBoxBpr1, 'top')

      const lineBpr1ka = [bpr1Point, [bpr1Point[0],121.8]];
      generateBoxPetak('2c006d22-36d7-4d9a-aaa1-85ebb962e510', 'Pr. 1 Ka', lineBpr1ka, 'left','golongan-c');

      const lineBpr2 = [bpr1Point, bpr2Point];
      generateBangunanSadap('B.Pr 2', 'topleft', lineBpr2, 0);

      const lineBoxBpr2 = [bpr2Point, [bpr2Point[0]-0.08, bpr2Point[1] + 0.05]];
      generateBox("142,00 Ha", "0,247 m3/s", "1162,97 m", lineBoxBpr2, 'top')

      const lineBpr2ki = [bpr2Point, [bpr2Point[0],121.96]];
      generateBoxPetak('7261e694-28d1-47de-875f-5c1dcd21d858', 'Pr. 2 Ki', lineBpr2ki, 'right','golongan-c');

      const lineBpr2ka = [bpr2Point, [bpr2Point[0],121.8]];
      generateBoxPetak('abe3717e-fd6f-4135-b81c-ec7b2b5e2e52', 'Pr. 2 Ka', lineBpr2ka, 'left','golongan-c');

      const lineBpr3 = [bpr2Point, bpr3Point];
      generateBangunanSadap('B.Pr 3', 'topleft', lineBpr3, 0);

      const lineBoxBpr3 = [bpr3Point, [bpr3Point[0]-0.15, bpr3Point[1] + 0.05]];
      generateBox("75,00 Ha", "0,130 m3/s", "852,04 m", lineBoxBpr3, 'top')

      const lineBpr3ki = [bpr3Point, [bpr3Point[0],121.96]];
      generateBoxPetak('ee6e4136-fa7b-47cc-a82b-15a4596e22cb', 'Pr. 3 Ki', lineBpr3ki, 'right','golongan-c');

      const lineBpr3ka = [bpr3Point, [bpr3Point[0],121.8]];
      generateBoxPetak('bb2a0b5d-05e0-4b8b-9c28-b5b3209cbccc', 'Pr. 3 Ka', lineBpr3ka, 'left','golongan-c');

      const lineBpr4 = [bpr3Point, bpr4Point];  
      generateBangunanSadap('B.Pr 4', 'topleft', lineBpr4, 0);

      const lineBpr4ki = [bpr4Point, [bpr4Point[0],121.9]];
      generateBoxPetak('e2151e1a-2fc5-4372-ae1c-c0c151181e7a', 'Pr. 4 Ki', lineBpr4ki, 'right','golongan-c');

      const lineBpr4ka = [bpr4Point, [bpr4Point[0],121.8]];
      generateBoxPetak('430c5b78-1a49-479b-be71-52a45bdfcd3e', 'Pr. 4 Ka', lineBpr4ka, 'left','golongan-c');

      const lineBpr4tg = [bpr4Point, [-6.1,bpr4Point[1]]];
      generateBoxPetak('6dc9a5a1-2814-4acd-bc14-a8e8dfee5cc7', 'Pr. 4 Tg', lineBpr4tg, 'bottom','golongan-c');
     
      // Petak B.Ch 71'
      const lineBch71i = [bch70Point,[-5.15, 121.95],bch71iPoint];
      generateBangunanSadap("B.Ch 71'", 'centerright', lineBch71i, 0);

      const lineCh7iki = [bch71iPoint, [bch71iPoint[0],121.75]];
      generateBoxPetak('', "Ch 71' Ki", lineCh7iki, 'left','golongan-c');

      // Petak B.Ch 71
      const lineBch71 = [bch71iPoint, bch71Point];
      generateBangunanSadap('B.Ch 71 (BC.V-XIV)', 'centerright', lineBch71, 0);

      const lineCh71ki = [bch71Point, [bch71Point[0],121.9 ]];
      generateBoxPetak('e38d55ae-45e3-4583-ad0b-e2192d0289b5', 'Ch 71 Ki', lineCh71ki, 'left','golongan-c');

      // Petak B.Ch 72'
      const lineBch72i = [bch71Point, bch72iPoint];
      generateBangunanSadap("B.Ch 72'", 'centerright', lineBch72i, 0);

      const lineCh72ika = [bch72iPoint,[bch72iPoint[0], 121.75]];
      generateBoxPetak('', "Ch 72' Ka", lineCh72ika, 'left','golongan-c');

      // Petak B.Ch 72
      const lineBch72 = [bch72iPoint, bch72Point];
      generateBangunanSadap('B.Ch 72 (BC.V-XVI)', 'centerright', lineBch72, 0);

      const lineBoxBch72 = [bch72Point, [bch72Point[0]+0.04, bch72Point[1] - 0.05]];
      generateBox("271,80 Ha", "0,524 m3/s", "642,99 m", lineBoxBch72, 'top')

      const lineBoxBch72s = [bch72Point, [bch72Point[0] + 0.02, bch72Point[1] + 0.1]];
      generateBox("324,80 Ha", "0,627 m3/s", "826,68 m", lineBoxBch72s, 'top')

      const lineCh72ki = [bch72Point, [bch72Point[0],121.9 ]];
      generateBoxPetak('289c04ba-25d9-41f9-ae96-01cd6fc8e803', 'Ch 72 Ki', lineCh72ki, 'left','golongan-c');

      // Petak B.Ch 73
      const lineBch73 = [bch72Point, bch73Point];
      generateBangunanSadap('B.Ch 73 (BC.V-XV)', 'centerright', lineBch73, 0);

      const lineBoxBch73 = [bch73Point, [bch73Point[0]+0.04, bch73Point[1] - 0.05]];
      generateBox("180,8 Ha", "0,349 m3/s", "457,92 m", lineBoxBch73, 'top')

      const lineCh73ki = [bch73Point, [bch73Point[0],121.84 ]];
      generateBoxPetak('467469a2-970c-403c-a013-0a99e92a76d2', 'Ch 73 Ki', lineCh73ki, 'left','golongan-c');

      // Petak B.Ch 74
      const lineBch74 = [bch73Point, bch74Point];
      generateBangunanSadap('B.Ch 74 (BC.V-XVII)', 'centerleft', lineBch74, 0);

      const lineBoxBch74 = [bch74Point, [bch74Point[0]+0.02, bch74Point[1] - 0.05]];
      generateBox("112,40 Ha", "0,217 m3/s", "785,02 m", lineBoxBch74, 'top')

      const lineCh74ka = [bch74Point, [bch74Point[0],122 ]];
      generateBoxPetak('bd0ea090-39d6-4704-9f08-21c0cb42b7e5', 'Ch 74 Ka', lineCh74ka, 'right','golongan-c');

      // Petak B.Ch 75
      const lineBch75 = [bch74Point, bch75Point];
      generateBangunanSadap('B.Ch 75 (BC.V-XVIII)', 'topleft', lineBch75, 0);

      const lineCh75ki = [bch75Point, [bch75Point[0],121.9]];
      generateBoxPetak('709bef28-5bf8-4c29-b6e9-2c744a023535', 'Ch 75 Ki', lineCh75ki, 'left','golongan-c');

      const lineCh75ka = [bch75Point, [bch75Point[0],122]];
      generateBoxPetak('9ff88b3c-33df-4b28-b35c-f1ed1d050841', 'Ch 75 Ka', lineCh75ka, 'right','golongan-c');

      // Generate Text
      generateTextSaluranSekunder('SAL.SEKUNDER KRAMASARI', [-6.07, 119.67], 0)
      generateTextSaluranSekunder('SAL.SEKUNDER BOJONG', [-5.85, 119.67], 0)
      generateTextSaluranSekunder('SAL.SEKUNDER BRINGKENG', [-5.55, 119.74], 0)
      generateTextSaluranSekunder('SAL.SEKUNDER UJUNG MANIK', [-4.9, 119.97], 0)
      generateTextSaluranSekunder('SAL.SEKUNDER BABAKAN', [-5.5,121.23], 270)
      generateTextSaluranSekunder('SAL.SEKUNDER BINANGUN', [-5.55,121.63], 270)
      generateTextSaluranSekunder('SAL.SEKUNDER PARID', [-5.45,121.88], 270)
      generateTextSaluranSekunder('SAL.INDUK CIHAUR', [-5.15,121.98], 270)
      generateTextSaluranPrimer('SALURAN INDUK CIHAUR', [-5.2, 120.35], 0)
      
    }
    return {
        //main function to initiate the module
        init: function () {
            initInput();
            initMap();

            // Generate Skema
            initBch19();
            initBch18();
            initBch17();
            initBch16();
            initBch15();
            initBch14();
        },
    };
})();

jQuery(document).ready(function () {
  SkemaSidareja.init();
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
