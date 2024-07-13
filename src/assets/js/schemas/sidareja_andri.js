"use strict";

var SkemaSidareja = (function () {
    var initMap = function () {
        const whiteBasemap = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/3cwcakAAAAASUVORK5CYII=');

        const map = L.map('map', {
            // center: [-22.13, 108.917404],
            attributionControl: false,
            center: [-7.444992423191618, 109.47077209463006],
            zoom: 10,
            maxZoom: 13,
            minZoom: 10,
            layers: [whiteBasemap]
        });

        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map);

        // Tambahkan control untuk legenda
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
                    <td class="text-center text-warning fw-bold">K</td>
                    <td>Debit Rekomendasi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `;
          return div;
        };

        legendControl.addTo(map);

        var circleOptionsTransparent = {
          color: 'black',
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: 1
        }

        var circleOptionsBgWhite = {
          color: 'black',
          fillColor: 'white',
          fillOpacity: 1,
          weight: 1
        }

        var circleOptionsBgBlack = {
          color: 'black',
          fillColor: 'black',
          fillOpacity: 1,
          weight: 1
        }

        L.circle([-7.1, 108.8], 380, circleOptionsTransparent).addTo(map);
        L.circle([-7.1, 108.8], 830, circleOptionsTransparent).addTo(map);

        // Koordinat untuk garis lurus di bawah polygon
        const lineCoords = [
          [-7.1, 108.8],
          [-7.235, 108.77], // titik awal di luar polygon
          [-7.325, 108.77],
          [-7.445, 108.77]  // titik akhir di luar polygon
        ];

        // Buat garis lurus di bawah polygon
        const polygon = L.polyline(lineCoords, { color: 'black', weight: 1 }).addTo(map);


        const line_bs1 = L.polyline([[-7.325, 108.77], [-7.325, 108.7945]], { color: 'black', weight: 1 }).addTo(map);
        // var sidareja4 = L.marker([-7.325, 108.77], {
        //   icon: L.divIcon({
        //       className: 'text-label',
        //       html: '<div style="display: flex; align-items: center; justify-content: center; height: 20px; transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BS.I</div>',
        //       iconSize: [40, 20]  // Adjust iconSize to the size of your text container
        //   }),
        // }).addTo(map);

        const bangunanPembagiList = [];

        var bs1Point = L.circle([-7.325, 108.77], 225, circleOptionsBgWhite).addTo(map);
        
        const petakBks1 = L.polyline([[-7.445, 108.77], [-7.445, 108.8625]], { color: 'black', weight: 1 }).addTo(map);

        circleBangunanPembagi('BS. II', [-7.445, 108.77]);

        const bs1Title = `<div class="bs-title">BS. I</div>`;
        const bs2Title = `<div class="bs-title">BS. II</div>`;
        const bs3Title = `<div class="bs-title">BS. III</div>`;
        const bs4Title = `<div class="bs-title">BS. IV</div>`;
        const bs5Title = `<div class="bs-title">BS. V</div>`;
        const bs6Title = `<div class="bs-title">BS. VI</div>`;
        const bs7Title = `<div class="bs-title">BS. VII</div>`;
        const bs8Title = `<div class="bs-title">BS. VIII</div>`;

        // Bind tooltip to the polyline end point
        bs1Point.bindTooltip(bs1Title, {
            permanent: true,
            direction: 'left',
            className: 'transparent-tooltip',
            offset: [-5, 0] // Adjust the offset to position the tooltip correctly at the end of the polyline
        }).openTooltip();

        bangunanPembagiList.push(bs1Point);

        // HTML content for the tooltip (example table)
        const tooltipContent = `
            <div class="box-bangunan-detail">
                <table>
                    <tr>
                        <th colspan="2">Pts. 1 kl</th>
                    </tr>
                    <tr>
                        <td>A=45 Ha</td>
                        <td>
                          <span class="text-dark fw-semibold">K=0.070 m3/dt</span>
                          </br>
                          <span class="text-primary fw-semibold">A=0.070 m3/dt</span>
                          </br>
                          <span class="text-warning fw-semibold">R=0.070 m3/dt</span>
                        </td>
                    </tr>
                </table>
            </div>
        `;

        // Bind tooltip to the polyline
        const endPoint = line_bs1.getLatLngs()[1];

        // Bind tooltip to the polyline end point
        line_bs1.bindTooltip(tooltipContent, {
            permanent: true,
            direction: 'right',
            className: 'transparent-tooltip',
            offset: [0, 0] // Adjust the offset to position the tooltip correctly at the end of the polyline
        }).openTooltip(endPoint);

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
          var fontSize = (zoomLevel-4) + 1;  // Example: increase font size based on zoom level
          // alert(fontSize)
          const textLabels = document.querySelectorAll('.box-bangunan-detail');
          textLabels.forEach(label => {
              label.style.fontSize = `${fontSize}px`;
          });

          var fontSizeBsTitle = zoomLevel + 10;
          const bsTitles = document.querySelectorAll('.bs-title');
          bsTitles.forEach(bsTitle => {
            bsTitle.style.fontSize = `${fontSizeBsTitle}px`;
          });

          bangunanPembagiList.forEach(point => {
            updateOffsetBangunanPembagi(point, zoomLevel);
          });

          // // Update the text marker's position to the left of the circle
          // const offsetLat = 0;
          // const offsetLng = -0.3 / zoomLevel;  // Adjust offset based on zoom level
          // sidareja4.setLatLng([ -7.325 + offsetLat, 108.77 + offsetLng ]);
        }

        // Update text on zoom end
        map.on('zoomend', setResponsiveSkema);

        // Initial text update
        setResponsiveSkema();


        function circleBangunanPembagi(title, latlng) {
          const pointTitle = `<div class="bs-title">${title}</div>`;

          var point = L.circle(latlng, 1000, circleOptionsBgWhite).addTo(map);
          L.circle(latlng, 380, circleOptionsBgBlack).addTo(map);

          // Bind tooltip to the polyline end point
          point.bindTooltip(pointTitle, {
              permanent: true,
              direction: 'left',
              className: 'transparent-tooltip',
              offset: [-15, 0]
          }).openTooltip();

          bangunanPembagiList.push(point);
        }
    }

    var initBs1 = function () {

    }

    var initBs2 = function () {

    }

    return {
        //main function to initiate the module
        init: function () {
            initMap();
            initBs1();
            initBs2();
        },
    };
})();

jQuery(document).ready(function () {
  SkemaSidareja.init();
});