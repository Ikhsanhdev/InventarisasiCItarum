// Inisialisasi peta
var map = L.map('mapSidareja').setView([-22.13, 108.917404], 9);

// Tambahkan tile layer OSM
var tileLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://higertech.com">Higertech</a>',
}).addTo(map);

// Tambahkan control untuk legenda
var legendControl = L.control({ position: 'topright' });

legendControl.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'legend');
  div.innerHTML = `
    <div style="background-color: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th colspan="2">LEGENDA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="/assets/img/lingtih.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
            <td>Bangunan Pengambil/Sadap</td>
          </tr>
          <tr>
            <td><img src="/assets/img/lingtem.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
            <td>Bangunan Pembagi</td>
          </tr>
          <tr>
            <td><img src="/assets/img/hijau.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
            <td>Golongan A</td>
          </tr>
          <tr>
            <td><img src="/assets/img/biru.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
            <td>Golongan B</td>
          </tr>
          <tr>
            <td><img src="/assets/img/ungu.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
            <td>Golongan C</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  return div;
};

legendControl.addTo(map);

// S. Sidareja
var sidareja = L.polygon(
  [
    [-7.02321, 107.487404], //atas
    [-7.22321, 107.487404], //bawah
  ],
  {
    color: 'black',
  }
).addTo(map);

var sidareja = L.polygon(
  [
    [-7.22321, 107.487404], //atas
    [-28.04321, 107.487404], //bawah
  ],
  {
    color: 'black',
  }
).addTo(map);

var sidareja1 = L.polygon(
  [
    [-7.02321, 107.487404], //kiri
    [-7.02321, 107.749404], //kanan
  ],
  {
    color: 'black',
  }
).addTo(map);

var sidareja2 = L.polygon(
  [
    [-4.05889, 107.709404], //atas
    [-7.02321, 107.709404], //bawah
  ],
  {
    color: 'black',
  }
).addTo(map);

var sidareja3 = L.polygon(
  [
    [-3.26889, 107.989404], //atas
    [-4.05889, 107.709404], //bawah
  ],
  {
    color: 'black',
  }
).addTo(map);

var sidareja4 = L.polygon(
  [
    [-6.76321, 107.709404], //kiri
    [-6.76321, 110.409404], //kanan
  ],
  {
    color: 'black',
  }
).addTo(map);

var sidareja4 = L.marker([-6.37921, 108.829404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. KEDUNG DADAP</div>',
  }),
}).addTo(map);

var sidareja5 = L.polygon(
  [
    [-5.90321, 107.709404], //kiri
    [-5.90321, 109.529404], //kanan
  ],
  {
    color: 'black',
  }
).addTo(map);

var sidareja5 = L.marker([-5.56821, 108.724404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. REJA MULYA</div>',
  }),
}).addTo(map);

var sidareja6 = L.polygon(
  [
    [-5.20321, 107.709404], //kiri
    [-5.20321, 108.609404], //kanan
  ],
  {
    color: 'black',
  }
).addTo(map);

var sidareja6 = L.marker([-4.85321, 108.109404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. KARANG SARI</div>',
  }),
}).addTo(map);

//{ start garis sidareja 1}

var lingtem = L.marker([-6.76321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var BSV = L.marker([-6.78321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.V</div>',
  }),
}).addTo(map);

var lingtih = L.marker([-6.76321, 107.979404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var BKd1 = L.polygon(
  [
    [-6.76321, 107.979404], //atas
    [-6.90321, 107.979404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKd1 = L.marker([-6.76821, 107.959404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd.1</div>',
  }),
}).addTo(map);

var lingtih1 = L.marker([-6.76321, 108.449404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih1 = L.polygon(
  [
    [-6.62321, 108.449404], //atas
    [-6.90321, 108.449404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKd2 = L.marker([-6.76821, 108.432404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd.2</div>',
  }),
}).addTo(map);

var lingtih2 = L.marker([-6.76321, 108.784404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih2 = L.polygon(
  [
    [-6.62321, 108.784404], //atas
    [-6.76321, 108.784404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKd3 = L.marker([-6.76821, 108.784404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd.3</div>',
  }),
}).addTo(map);

var lingtih3 = L.marker([-6.76321, 109.131404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih3 = L.polygon(
  [
    [-6.62321, 109.131404], //atas
    [-6.76321, 109.131404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKd4 = L.marker([-6.77821, 109.131404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 4</div>',
  }),
}).addTo(map);

var lingtih4 = L.marker([-6.76321, 109.534404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih4 = L.polygon(
  [
    [-6.62321, 109.534404], //atas
    [-6.76321, 109.534404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKd5 = L.marker([-6.77821, 109.534404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5</div>',
  }),
}).addTo(map);

var lingtih5 = L.marker([-6.76321, 109.884404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih5 = L.polygon(
  [
    [-6.62321, 109.884404], //atas
    [-6.76321, 109.884404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKd6 = L.marker([-6.77821, 109.884404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 6</div>',
  }),
}).addTo(map);

var lingtih6 = L.marker([-6.76321, 110.214404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih6 = L.polygon(
  [
    [-6.76321, 110.214404], //atas
    [-6.90321, 110.214404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKd7 = L.marker([-6.76821, 110.194404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd.7</div>',
  }),
}).addTo(map);

var lingtih7 = L.marker([-6.76321, 110.409404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih7 = L.polygon(
  [
    [-6.76321, 110.409404], //kiri
    [-6.76321, 110.539404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih8 = L.polygon(
  [
    [-6.76321, 110.409404], //kiri
    [-6.96321, 110.539404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKd8 = L.marker([-6.76821, 110.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd.8</div>',
  }),
}).addTo(map);

var lingtih9 = L.marker([-6.40321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih9 = L.polygon(
  [
    [-6.40321, 107.709404], //kiri
    [-6.40321, 107.879404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSIV = L.marker([-6.42321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.IV</div>',
  }),
}).addTo(map);

// garis kedua
var lingtem4 = L.marker([-5.90321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var BSIII = L.marker([-5.92321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.III</div>',
  }),
}).addTo(map);

var lingtih10 = L.marker([-5.90321, 107.939404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih10 = L.polygon(
  [
    [-5.75321, 107.939404], //atas
    [-6.05321, 107.939404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BRm1 = L.marker([-5.90321, 107.969404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.1</div>',
  }),
}).addTo(map);

var lingtih11 = L.marker([-5.90321, 108.339404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih11 = L.polygon(
  [
    [-5.90321, 108.339404], //atas
    [-6.05321, 108.339404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BRm2 = L.marker([-5.90321, 108.369404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.2</div>',
  }),
}).addTo(map);

var lingtih12 = L.marker([-5.90321, 108.589404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih12 = L.polygon(
  [
    [-5.75321, 108.589404], //atas
    [-5.90321, 108.589404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BRm3 = L.marker([-5.92821, 108.589404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.3</div>',
  }),
}).addTo(map);

var lingtih13 = L.marker([-5.90321, 109.169404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih13 = L.polygon(
  [
    [-5.75321, 109.169404], //atas
    [-5.90321, 109.169404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BRm4 = L.marker([-5.92821, 109.169404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.4</div>',
  }),
}).addTo(map);

var lingtih14 = L.marker([-5.90321, 109.529404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih14 = L.polygon(
  [
    [-5.75321, 109.529404], //atas
    [-6.05321, 109.529404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BRm5 = L.marker([-5.90321, 109.559404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.5</div>',
  }),
}).addTo(map);

//garis ketiga
var lingtem9 = L.marker([-5.20321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var BSII = L.marker([-5.22321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.II</div>',
  }),
}).addTo(map);

var lingtih15 = L.marker([-5.20321, 108.069404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih15 = L.polygon(
  [
    [-5.05321, 108.069404], //atas
    [-5.20321, 108.069404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKs1 = L.marker([-5.22321, 108.069404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKs.1</div>',
  }),
}).addTo(map);

var lingtih16 = L.marker([-5.20321, 108.609404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih16 = L.polygon(
  [
    [-5.05321, 108.609404], //atas
    [-5.20321, 108.609404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKs2 = L.marker([-5.22321, 108.609404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKs.2</div>',
  }),
}).addTo(map);

var lingtih17 = L.marker([-4.50321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtih17 = L.polygon(
  [
    [-4.50321, 107.709404], //kiri
    [-4.50321, 107.879404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSI = L.marker([-4.52321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.I</div>',
  }),
}).addTo(map);

var lingtih19 = L.marker([-8.22321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih19 = L.polygon(
  [
    [-8.22321, 107.487404], //kiri
    [-8.22321, 107.649404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSVII = L.marker([-8.24321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VII</div>',
  }),
}).addTo(map);

//garis kelima
var lingtem23 = L.marker([-9.09321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem23 = L.polygon(
  [
    [-9.09321, 107.487404], //kiri
    [-9.09321, 108.349404], //kanan
  ],
  {
    color: 'black',
  }
).addTo(map);

var BSVIII = L.marker([-9.11321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIII</div>',
  }),
}).addTo(map);

var SSSIDODADI = L.marker([-8.84321, 108.302404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. SIDODADI</div>',
  }),
}).addTo(map);

var lingtih20 = L.marker([-9.09321, 107.887404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih20 = L.polygon(
  [
    [-8.92321, 107.887404], //atas
    [-9.27321, 107.887404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSd1 = L.marker([-9.09321, 107.915404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1</div>',
  }),
}).addTo(map);

var lingtih21 = L.marker([-9.09321, 108.349404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih21 = L.polygon(
  [
    [-9.09321, 108.349404], //kiri
    [-9.09321, 108.429404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSd2 = L.marker([-9.09321, 108.349404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2</div>',
  }),
}).addTo(map);

//garis keenam
var lingtem27 = L.marker([-9.97321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem27 = L.polygon(
  [
    [-9.97321, 107.487404], //kiri
    [-9.97321, 108.349404], //kanan
  ],
  {
    color: 'black',
  }
).addTo(map);

var BSIX = L.marker([-9.99321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.IX</div>',
  }),
}).addTo(map);

var SSSIDAHURIP = L.marker([-9.74321, 108.302404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. SIDAHURIP</div>',
  }),
}).addTo(map);

var lingtih22 = L.marker([-9.97321, 107.887404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih22 = L.polygon(
  [
    [-9.79321, 107.887404], //atas
    [-10.17321, 107.887404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSh1 = L.marker([-9.97321, 107.914404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.1</div>',
  }),
}).addTo(map);

var lingtih23 = L.marker([-9.97321, 108.349404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih23 = L.polygon(
  [
    [-9.97321, 108.349404], //kiri
    [-9.97321, 108.429404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSh2 = L.marker([-9.97321, 108.349404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.2</div>',
  }),
}).addTo(map);

//garis keempat
var lingtem18 = L.marker([-7.52321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem18 = L.polygon(
  [
    [-7.52321, 107.487404], //kiri
    [-7.52321, 113.429404], //kanan
  ],
  {
    color: 'black',
  }
).addTo(map);

var BSVI = L.marker([-7.54321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VI</div>',
  }),
}).addTo(map);

var SSCIKALAPA = L.marker([-7.34321, 108.809404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. CIKALAPA</div>',
  }),
}).addTo(map);

var SSCIKALAPAKIRI = L.marker([-7.34321, 112.909404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. CIKALAPA KIRI</div>',
  }),
}).addTo(map);

var lingtih24 = L.marker([-7.52321, 107.722404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih24 = L.polygon(
  [
    [-7.38321, 107.722404], //atas
    [-7.68321, 107.722404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCk1 = L.marker([-7.51321, 107.752404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.1</div>',
  }),
}).addTo(map);

//garis keempat a
var lingtem33 = L.marker([-7.52321, 108.227404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem33 = L.polygon(
  [
    [-7.52321, 108.227404], //atas
    [-7.82321, 108.227404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtem33 = L.polygon(
  [
    [-7.82321, 108.227404], //atas
    [-8.74321, 108.872404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCk2 = L.marker([-7.36321, 108.227404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.2</div>',
  }),
}).addTo(map);

var SSLEDENG = L.marker([-8.24321, 108.727404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(60deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. LEDENG</div>',
  }),
}).addTo(map);

var lingtih25 = L.marker([-7.98321, 108.337404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih25 = L.polygon(
  [
    [-8.02321, 108.137404], //kiri
    [-7.98321, 108.337404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var lingtih25 = L.polygon(
  [
    [-7.98321, 108.337404], //kiri
    [-7.92321, 108.537404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BLd1 = L.marker([-8.08321, 108.357404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.1</div>',
  }),
}).addTo(map);

var lingtih26 = L.marker([-8.40321, 108.632404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih26 = L.polygon(
  [
    [-8.44321, 108.437404], //kiri
    [-8.40321, 108.632404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var lingtih26 = L.polygon(
  [
    [-8.40321, 108.632404], //kiri
    [-8.34321, 108.822404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BLd2 = L.marker([-8.39321, 108.782404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.2</div>',
  }),
}).addTo(map);

var lingtih27 = L.marker([-8.74321, 108.872404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih27 = L.polygon(
  [
    [-8.74321, 108.872404], //atas
    [-8.80321, 108.909404], //bawah
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BLd3 = L.marker([-8.77321, 109.042404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.3</div>',
  }),
}).addTo(map);

var lingtih28 = L.marker([-7.52321, 108.632404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih28 = L.polygon(
  [
    [-7.52321, 108.632404], //atas
    [-7.68321, 108.632404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCk3 = L.marker([-7.51321, 108.612404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.3</div>',
  }),
}).addTo(map);

var lingtih29 = L.marker([-7.52321, 108.952404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih29 = L.polygon(
  [
    [-7.52321, 108.952404], //atas
    [-7.68321, 108.952404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCk4 = L.marker([-7.51321, 108.932404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.4</div>',
  }),
}).addTo(map);

var lingtih30 = L.marker([-7.52321, 109.382404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih30 = L.polygon(
  [
    [-7.52321, 109.382404], //atas
    [-7.68321, 109.382404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCk5 = L.marker([-7.51321, 109.362404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.5</div>',
  }),
}).addTo(map);

var lingtih31 = L.marker([-7.52321, 109.722404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih31 = L.polygon(
  [
    [-7.52321, 109.722404], //atas
    [-7.68321, 109.722404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCk6 = L.marker([-7.51321, 109.702404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.6</div>',
  }),
}).addTo(map);

//garis keempat b
var lingtem37 = L.marker([-7.52321, 110.042404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem37 = L.polygon(
  [
    [-7.38321, 110.042404], //atas
    [-9.99321, 110.042404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCk7 = L.marker([-7.54321, 110.022404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.7</div>',
  }),
}).addTo(map);

var SSTAMBAKREJA = L.marker([-9.64321, 109.822404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. TAMBAKREJA</div>',
  }),
}).addTo(map);

var lingtih32 = L.marker([-7.99321, 110.042404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih32 = L.polygon(
  [
    [-7.99321, 110.042404], //kiri
    [-7.99321, 110.222404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BTr1 = L.marker([-8.03321, 110.055404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.1</div>',
  }),
}).addTo(map);

var lingtih33 = L.marker([-8.40321, 110.042404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih33 = L.polygon(
  [
    [-8.40321, 109.852404], //kiri
    [-8.40321, 110.042404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BTr2 = L.marker([-8.44321, 110.225404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.2</div>',
  }),
}).addTo(map);

var lingtih34 = L.marker([-8.85321, 110.042404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih34 = L.polygon(
  [
    [-8.85321, 109.852404], //kiri
    [-8.85321, 110.222404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BTr3 = L.marker([-8.85321, 110.142404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.3</div>',
  }),
}).addTo(map);

var lingtih35 = L.marker([-9.14321, 110.042404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-9.14321, 110.042404], //kiri
    [-9.14321, 110.222404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BTr4 = L.marker([-9.18321, 110.055404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.4</div>',
  }),
}).addTo(map);

var lingtih36 = L.marker([-9.49321, 110.042404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih36 = L.polygon(
  [
    [-9.49321, 110.042404], //kiri
    [-9.49321, 110.222404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BTr5 = L.marker([-9.52321, 110.055404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.5</div>',
  }),
}).addTo(map);

var lingtih37 = L.marker([-9.99321, 110.042404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih37 = L.polygon(
  [
    [-9.99321, 110.042404], //kiri
    [-9.99321, 110.222404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var lingtih37 = L.polygon(
  [
    [-9.99321, 110.042404], //atas
    [-10.14321, 110.042404], //bawah
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BTr6 = L.marker([-10.03321, 110.055404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.6</div>',
  }),
}).addTo(map);

var lingtih38 = L.marker([-7.52321, 110.522404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih38 = L.polygon(
  [
    [-7.52321, 110.522404], //atas
    [-7.68321, 110.522404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCk8 = L.marker([-7.51321, 110.502404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.8</div>',
  }),
}).addTo(map);

//garis keempat c
var lingtem42 = L.marker([-7.52321, 111.022404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem42 = L.polygon(
  [
    [-7.52321, 111.022404], //atas
    [-8.86821, 111.022404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCk9 = L.marker([-7.54321, 111.002404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.9</div>',
  }),
}).addTo(map);

var SSDUKUHTENGAH = L.marker([-8.54321, 111.202404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. DUKUH TENGAH</div>',
  }),
}).addTo(map);

var lingtih39 = L.marker([-7.96821, 111.022404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih39 = L.polygon(
  [
    [-7.96821, 110.832404], //kiri
    [-7.96821, 111.212404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BDt1 = L.marker([-7.97821, 111.055404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BDt.1</div>',
  }),
}).addTo(map);

var lingtih40 = L.marker([-8.46821, 111.022404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih40 = L.polygon(
  [
    [-8.46821, 110.832404], //kiri
    [-8.46821, 111.022404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BDt2 = L.marker([-8.47821, 111.055404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BDt.2</div>',
  }),
}).addTo(map);

var lingtih41 = L.marker([-8.86821, 111.022404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih41 = L.polygon(
  [
    [-7.86821, 111.022404], //atas
    [-8.99321, 111.022404], //bawah
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BDt3 = L.marker([-8.90821, 111.055404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BDt.3</div>',
  }),
}).addTo(map);

//garis keempat d
var lingtem43 = L.marker([-7.52321, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem43 = L.polygon(
  [
    [-7.52321, 112.222404], //atas
    [-12.26821, 112.222404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCk10 = L.marker([-7.36321, 112.222404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.10</div>',
  }),
}).addTo(map);

var SSCIKALAPAKANAN = L.marker([-9.04321, 112.902404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. CIKALAPA KANAN</div>',
  }),
}).addTo(map);

var lingtih42 = L.marker([-8.06821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih42 = L.polygon(
  [
    [-8.06821, 112.222404], //kiri
    [-8.06821, 112.422404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn1 = L.marker([-8.06821, 112.382404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn1</div>',
  }),
}).addTo(map);

var lingtih43 = L.marker([-8.36821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih43 = L.polygon(
  [
    [-8.36821, 112.012404], //kiri
    [-8.36821, 112.222404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn12 = L.marker([-8.40821, 112.382404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn12</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-8.96821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih44 = L.polygon(
  [
    [-8.96821, 112.222404], //kiri
    [-8.96821, 112.422404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn12 = L.marker([-9.00821, 112.202404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn12</div>',
  }),
}).addTo(map);

var lingtih45 = L.marker([-9.36821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih45 = L.polygon(
  [
    [-9.36821, 112.222404], //kiri
    [-9.36821, 112.422404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn13 = L.marker([-9.40821, 112.202404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn13</div>',
  }),
}).addTo(map);

var lingtih46 = L.marker([-9.66821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih46 = L.polygon(
  [
    [-9.66821, 112.012404], //kiri
    [-9.66821, 112.222404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn13 = L.marker([-9.70821, 112.382404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn13</div>',
  }),
}).addTo(map);

var lingtih47 = L.marker([-10.06821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih47 = L.polygon(
  [
    [-10.06821, 112.012404], //kiri
    [-10.06821, 112.422404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn14 = L.marker([-10.06821, 112.382404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn14</div>',
  }),
}).addTo(map);

var lingtih48 = L.marker([-10.46821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih48 = L.polygon(
  [
    [-10.46821, 112.222404], //kiri
    [-10.46821, 112.422404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn14 = L.marker([-10.50821, 112.202404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn14</div>',
  }),
}).addTo(map);

var lingtih49 = L.marker([-10.76821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih49 = L.polygon(
  [
    [-10.76821, 112.012404], //kiri
    [-10.76821, 112.222404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn15 = L.marker([-10.80821, 112.382404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn15</div>',
  }),
}).addTo(map);

var lingtih50 = L.marker([-10.96821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih50 = L.polygon(
  [
    [-10.96821, 112.012404], //kiri
    [-10.96821, 112.422404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn15 = L.marker([-10.96821, 112.382404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn15</div>',
  }),
}).addTo(map);

var lingtih51 = L.marker([-11.26821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih51 = L.polygon(
  [
    [-11.26821, 112.012404], //kiri
    [-11.26821, 112.222404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn16 = L.marker([-11.30821, 112.382404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn16</div>',
  }),
}).addTo(map);

var lingtih52 = L.marker([-11.66821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih52 = L.polygon(
  [
    [-11.66821, 112.012404], //kiri
    [-11.66821, 112.422404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn17 = L.marker([-11.66821, 112.382404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn17</div>',
  }),
}).addTo(map);

var lingtih53 = L.marker([-11.96821, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih53 = L.polygon(
  [
    [-11.96821, 112.222404], //kiri
    [-11.96821, 112.422404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn18 = L.marker([-11.96821, 112.382404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn18</div>',
  }),
}).addTo(map);

var lingtih54 = L.marker([-12.268221, 112.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih54 = L.polygon(
  [
    [-12.26821, 112.012404], //kiri
    [-12.26821, 112.222404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var lingtih54 = L.polygon(
  [
    [-12.26821, 112.222404], //atas
    [-12.46821, 112.222404], //bawah
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BCkkn18 = L.marker([-12.308221, 112.382404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.kn18</div>',
  }),
}).addTo(map);

var lingtih55 = L.marker([-7.52321, 112.712404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih55 = L.polygon(
  [
    [-7.52321, 112.712404], //atas
    [-7.68321, 112.712404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCkki1 = L.marker([-7.36321, 112.712404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCkki.1</div>',
  }),
}).addTo(map);

var lingtih56 = L.marker([-7.52321, 113.429404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih56 = L.polygon(
  [
    [-7.52321, 113.429404], //atas
    [-7.68321, 113.429404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCkki2 = L.marker([-7.36321, 113.429404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCkki.2</div>',
  }),
}).addTo(map);

//{End garis sidareja 1-2}

//{garis sidareja 3}
// garis ketujuh
var lingtem44 = L.marker([-14.52321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem44 = L.polygon(
  [
    [-14.52321, 107.487404], //kiri
    [-14.52321, 111.769404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSX = L.marker([-14.54321, 107.434404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.X</div>',
  }),
}).addTo(map);

var lingtem44 = L.marker([-14.52321, 107.897404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var BKdn1 = L.marker([-14.55321, 107.897404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKdn.1</div>',
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-14.52321, 107.897404], //atas
    [-13.99621, 107.897404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih44 = L.marker([-14.52321, 108.467404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-14.25321, 108.467404], //atas
    [-14.82321, 108.467404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKdn2 = L.marker([-14.55321, 108.487404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKdn.2</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-14.52321, 108.967404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-14.25321, 108.967404], //atas
    [-14.52321, 108.967404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKdn3 = L.marker([-14.55321, 108.967404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKdn.3</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-14.52321, 109.367404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-14.52321, 109.367404], //atas
    [-14.74321, 109.367404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKdn4 = L.marker([-14.37321, 109.367404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKdn.4</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-14.52321, 109.767404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-14.25321, 109.767404], //atas
    [-14.52321, 109.767404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKdn5 = L.marker([-14.55321, 109.767404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKdn.5</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-14.52321, 110.897404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-14.52321, 110.897404], //atas
    [-14.58321, 110.897404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKdn7 = L.marker([-14.38321, 110.897404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKdn.7</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-14.52321, 111.647404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var BKdn8 = L.marker([-14.423971, 111.937404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKdn.8</div>',
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-14.52321, 111.647404], //atas
    [-16.51321, 111.647404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih35 = L.polygon(
  [
    [-16.71321, 111.447404], //atas
    [-16.51321, 111.647404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih35 = L.polygon(
  [
    [-16.71321, 111.847404], //atas
    [-16.51321, 111.647404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKdn11 = L.marker([-16.51321, 111.637404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKdn.11</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-16.51321, 111.647404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih44 = L.marker([-15.25321, 111.647404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih44 = L.polygon(
  [
    [-15.25321, 111.412404], //kiri
    [-15.25321, 111.784404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKdn9 = L.marker([-15.25321, 111.637404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKdn.9</div>',
  }),
}).addTo(map);

var SSKNKEPLEK = L.marker([-14.95321, 112.237404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 30px; white-space: nowrap;">SS.KN.KEPLEK</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-15.85321, 111.647404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih44 = L.polygon(
  [
    [-15.85321, 111.652404], //kiri
    [-15.85321, 111.784404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKdn10 = L.marker([-15.88321, 111.637404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKdn.10</div>',
  }),
}).addTo(map);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//garis bawah bkdn 6
var lingtem44 = L.marker([-14.52321, 110.397404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem35 = L.polygon(
  [
    [-14.52321, 110.397404], //atas
    [-16.74321, 110.397404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

//garis miring ke bbp5
var lingtem35 = L.polygon(
  [
    [-16.74321, 110.397404], //atas
    [-17.54321, 111.197404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKdn6 = L.marker([-14.35321, 110.397404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKdn.6</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-14.97321, 110.397404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var BBp1 = L.marker([-14.99321, 110.387404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BBp.1</div>',
  }),
}).addTo(map);

var lingtih44 = L.polygon(
  [
    [-14.97321, 110.397404], //kiri
    [-14.97321, 110.74404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih44 = L.marker([-15.47321, 110.397404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var BBp2 = L.marker([-15.49321, 110.387404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BBp.2</div>',
  }),
}).addTo(map);

var lingtih44 = L.polygon(
  [
    [-15.47321, 110.397404], //kiri
    [-15.47321, 110.74404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih44 = L.marker([-15.97321, 110.397404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var BBp3 = L.marker([-15.99321, 110.387404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BBp.3</div>',
  }),
}).addTo(map);

var lingtih44 = L.polygon(
  [
    [-15.97321, 110.397404], //kiri
    [-15.97321, 110.74404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih44 = L.marker([-16.47321, 110.397404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih44 = L.polygon(
  [
    [-16.47321, 110.397404], //kiri
    [-16.47321, 110.74404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BBp4 = L.marker([-16.49321, 110.387404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BBp.4</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-17.13971, 110.797404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih44 = L.polygon(
  [
    [-17.13971, 110.997404], //kiri
    [-17.13971, 110.794404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BBp5 = L.marker([-17.16971, 110.787404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BBp.5</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-17.43971, 111.100004], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var BBp6 = L.marker([-17.46971, 111.100004], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BBp.6</div>',
  }),
}).addTo(map);

//garis 2//

var bsXI = L.marker([-18.72321, 107.427404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 20px; white-space: nowrap;">BS.XI</div>',
  }),
}).addTo(map);

var lingtem44 = L.marker([-18.72321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem44 = L.polygon(
  [
    [-18.72321, 107.487404], //kiri
    [-18.72321, 115.489404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih44 = L.marker([-18.72321, 107.994604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var BCw1 = L.marker([-18.92321, 107.994604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.1</div>',
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.22321, 107.994604], //atas
    [-18.72321, 107.994604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih44 = L.marker([-18.72321, 108.994604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.52321, 108.994604], //atas
    [-18.72321, 108.994604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw2 = L.marker([-18.92321, 108.994604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.2</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 109.394604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.99321, 109.394604], //atas
    [-18.72321, 109.394604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw3 = L.marker([-18.92321, 109.364604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.3"</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 109.594604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.23321, 109.594604], //atas
    [-18.72321, 109.594604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih44 = L.marker([-18.72321, 109.994604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var BCw3 = L.marker([-18.92321, 109.594604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.3"</div>',
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.99321, 109.994604], //atas
    [-18.72321, 109.994604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw3 = L.marker([-18.76321, 109.994604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.3</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 110.584604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-19.29321, 110.584604], //atas
    [-18.72321, 110.584604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw4 = L.marker([-18.76321, 110.584604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.4</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 111.154604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.99321, 111.154604], //atas
    [-18.72321, 111.154604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw5 = L.marker([-18.76321, 111.154604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.5</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 111.554604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.19321, 111.124604], //atas
    [-18.72321, 111.554604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw6 = L.marker([-18.96321, 111.554604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.6"</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 111.754604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.99321, 111.754604], //atas
    [-18.72321, 111.754604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw6 = L.marker([-18.76321, 111.754604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.6</div>',
  }),
}).addTo(map);

var lingtem44 = L.marker([-18.72321, 111.984604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem35 = L.polygon(
  [
    [-17.60321, 111.984604], //atas
    [-18.72321, 111.984604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih44 = L.marker([-17.80321, 111.984604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.50321, 111.984604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var BCw7 = L.marker([-18.96321, 111.984604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.7</div>',
  }),
}).addTo(map);

var BKk2 = L.marker([-17.83321, 112.184604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKk.2</div>',
  }),
}).addTo(map);

var SSCINYAWANG = L.marker([-17.83321, 110.184604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 20px; white-space: nowrap;">SS.CINYAWANG</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 112.084604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.10321, 112.084604], //atas
    [-18.72321, 112.084604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw8 = L.marker([-18.96321, 112.094604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.8</div>',
  }),
}).addTo(map);

var lingtem44 = L.marker([-18.72321, 112.384604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem35 = L.polygon(
  [
    [-19.39321, 112.384604], //atas
    [-18.72321, 112.384604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih35 = L.polygon(
  [
    [-19.19321, 112.584604], //atas
    [-18.72321, 112.384604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih44 = L.marker([-19.39321, 112.384604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-19.49321, 112.184604], //atas
    [-19.39321, 112.384604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih35 = L.polygon(
  [
    [-19.49321, 112.584604], //atas
    [-19.39321, 112.384604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw8 = L.marker([-18.96321, 112.324604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.8</div>',
  }),
}).addTo(map);

var BKg2 = L.marker([-19.39321, 112.424604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKg.2</div>',
  }),
}).addTo(map);

var SSKNGUNDU = L.marker([-19.44321, 112.824604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 20px; white-space: nowrap;">S.S K.N GUNDU</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 112.584604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.52321, 112.584604], //atas
    [-18.72321, 112.584604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw9 = L.marker([-18.82321, 112.700004], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.9</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 112.884604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.12321, 112.884604], //atas
    [-18.96321, 112.884604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw10 = L.marker([-18.62321, 112.934604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCw.10</div>',
  }),
}).addTo(map);

var lingtem44 = L.marker([-18.72321, 113.694604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem35 = L.polygon(
  [
    [-19.39321, 113.694604], //atas
    [-18.72321, 113.694604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.89321, 113.494604], //atas
    [-18.72321, 113.694604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih44 = L.marker([-19.39321, 113.694604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-19.58321, 113.494604], //atas
    [-19.39321, 113.694604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih35 = L.polygon(
  [
    [-19.58321, 113.894604], //atas
    [-19.39321, 113.694604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BCw10 = L.marker([-18.57321, 113.694604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">B C w.10</div>',
  }),
}).addTo(map);

var BKm2 = L.marker([-19.39321, 113.724604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKm.2</div>',
  }),
}).addTo(map);

var SSKNMAPAG = L.marker([-19.39321, 113.924604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(deg); color: black; font-weight: bold; font-size: 20px; white-space: nowrap;">SS.KN.MAPAG</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 114.124604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.42321, 114.124604], //atas
    [-18.99921, 114.124604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BcW11 = L.marker([-18.59321, 114.104604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BcW.11</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 114.624604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.42321, 114.624604], //atas
    [-18.72921, 114.624604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BcW12 = L.marker([-18.75321, 114.624604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BcW.12</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 114.824604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.72321, 114.824604], //atas
    [-18.98921, 114.824604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BcW13 = L.marker([-18.58321, 114.824604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BcW.13</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 115.10604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.42321, 115.10604], //atas
    [-18.72921, 115.10604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BcW14 = L.marker([-18.75321, 115.10604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BcW.14</div>',
  }),
}).addTo(map);

var lingtih44 = L.marker([-18.72321, 115.49604], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
}).addTo(map);

var lingtih35 = L.polygon(
  [
    [-18.42321, 115.49604], //atas
    [-18.72921, 115.49604], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BcW15 = L.marker([-18.75321, 115.49604], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BcW.15</div>',
  }),
}).addTo(map);

//{end garis sidareja 3}

//{garis sidareja 4}
// garis kedelapan
var lingtih57 = L.marker([-21.99321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih57 = L.polygon(
  [
    [-21.99321, 107.487404], //kiri
    [-21.99321, 107.829404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN1 = L.marker([-22.00921, 107.489404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.1</div>',
  }),
}).addTo(map);

//horizontal 1
var lingtem45 = L.marker([-22.52321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem45 = L.polygon(
  [
    [-22.52321, 107.487404], //kiri
    [-22.52321, 113.529404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN2 = L.marker([-22.54321, 107.459404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.2</div>',
  }),
}).addTo(map);

var SSPATIMUAN = L.marker([-21.94321, 108.809404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. PATIMUAN</div>',
  }),
}).addTo(map);

var lingtih58 = L.marker([-22.52321, 107.887404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih58 = L.polygon(
  [
    [-22.38421, 107.887404], //atas
    [-22.68421, 107.887404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPn1 = L.marker([-22.58321, 107.857404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn. 1</div>',
  }),
}).addTo(map);

var lingtih59 = L.marker([-22.52321, 108.357404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih59 = L.polygon(
  [
    [-22.38421, 108.357404], //atas
    [-22.68421, 108.357404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPn2 = L.marker([-22.58321, 108.327404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn. 2</div>',
  }),
}).addTo(map);

var lingtih60 = L.marker([-22.52321, 108.807404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih60 = L.polygon(
  [
    [-22.38421, 108.807404], //atas
    [-22.53421, 108.807404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPn3 = L.marker([-22.58321, 108.777404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn. 3</div>',
  }),
}).addTo(map);

var lingtih61 = L.marker([-22.52321, 109.187404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih61 = L.polygon(
  [
    [-22.51421, 109.187404], //atas
    [-22.68421, 109.187404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPn4 = L.marker([-22.58321, 109.157404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn. 4</div>',
  }),
}).addTo(map);

var lingtih62 = L.marker([-22.52321, 109.497404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih62 = L.polygon(
  [
    [-22.52321, 109.497404], //kiri
    [-22.32321, 109.887404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih62 = L.polygon(
  [
    [-22.52321, 109.487404], //atas
    [-22.72321, 109.887404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPn5 = L.marker([-22.68321, 109.497404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn. 5</div>',
  }),
}).addTo(map);

var lingtem47 = L.marker([-22.52321, 110.492404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var BPn6 = L.marker([-22.50321, 110.532404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn. 6</div>',
  }),
}).addTo(map);

var SSPATIMUANII = L.marker([-24.04321, 110.632404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. PATIMUAN II</div>',
  }),
}).addTo(map);

//Vertikal 1
var lingtem47 = L.polygon(
  [
    [-22.51421, 110.492404], //atas
    [-23.80421, 110.492404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih63 = L.marker([-23.13321, 110.492404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih63 = L.polygon(
  [
    [-23.13321, 110.352404], //kiri
    [-23.13321, 110.651404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BPnII7 = L.marker([-23.13321, 110.542404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn II. 7</div>',
  }),
}).addTo(map);

var lingtih64 = L.marker([-23.56321, 110.492404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih64 = L.polygon(
  [
    [-23.56321, 110.352404], //kiri
    [-23.56321, 110.651404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BPnII8 = L.marker([-23.56321, 110.542404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn II. 8</div>',
  }),
}).addTo(map);

var lingtih65 = L.marker([-23.78321, 110.492404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih65 = L.polygon(
  [
    [-23.78321, 110.352404], //kiri
    [-23.78321, 110.651404], //kanan
  ],
  {
    color: 'black',
    weight: 0.2,
  }
).addTo(map);

var BPnII9 = L.marker([-23.83321, 110.542404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn II. 9</div>',
  }),
}).addTo(map);

var lingtih66 = L.marker([-22.52321, 110.655404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih66 = L.polygon(
  [
    [-22.52321, 110.655404], //kiri
    [-22.12321, 110.987404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih66 = L.polygon(
  [
    [-22.52321, 110.655404], //kiri
    [-22.92321, 110.987404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih67 = L.marker([-22.52321, 111.415404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih67 = L.polygon(
  [
    [-22.52321, 111.415404], //kiri
    [-22.22321, 111.657404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih67 = L.polygon(
  [
    [-22.52321, 111.415404], //kiri
    [-22.82321, 111.657404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPnI7 = L.marker([-22.57321, 111.387404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn I. 7</div>',
  }),
}).addTo(map);

var SSPATIMUANI = L.marker([-21.94321, 111.387404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. PATIMUAN I</div>',
  }),
}).addTo(map);

var lingtih68 = L.marker([-22.52321, 111.958404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih68 = L.polygon(
  [
    [-22.52321, 111.958404], //kiri
    [-22.42321, 112.258404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih68 = L.polygon(
  [
    [-22.52321, 111.958404], //kiri
    [-22.62321, 112.258404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPnI8 = L.marker([-22.70021, 111.948404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn I. 8</div>',
  }),
}).addTo(map);

var lingtih69 = L.marker([-22.52321, 112.908404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih69 = L.polygon(
  [
    [-22.52321, 112.908404], //kiri
    [-22.10321, 113.108404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih69 = L.polygon(
  [
    [-22.52321, 112.908404], //kiri
    [-22.94321, 113.108404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPnI9 = L.marker([-22.70021, 112.898404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn I. 9</div>',
  }),
}).addTo(map);

var lingtih98 = L.marker([-22.52321, 113.529404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih98 = L.polygon(
  [
    [-22.52321, 113.529404], //kiri
    [-22.42321, 113.829404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih98 = L.polygon(
  [
    [-22.52321, 113.529404], //kiri
    [-22.62321, 113.829404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPnI10 = L.marker([-22.70021, 113.529404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPn I. 10</div>',
  }),
}).addTo(map);

//Horizontal2
var lingtem48 = L.marker([-23.32321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var lingtem48 = L.polygon(
  [
    [-23.32321, 107.487404], //kiri
    [-23.32321, 109.809404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtem48 = L.polygon(
  [
    [-23.50321, 107.087404], //kiri
    [-23.32321, 107.509404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN3 = L.marker([-23.32321, 107.459404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.3</div>',
  }),
}).addTo(map);

var lingtih70 = L.marker([-23.32321, 107.859404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih70 = L.polygon(
  [
    [-23.32321, 107.859404], //atas
    [-23.48421, 107.859404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPd1 = L.marker([-23.33321, 107.859404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPd. 1</div>',
  }),
}).addTo(map);

var lingtem49 = L.marker([-23.32321, 108.359404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [33, 33], // Ukuran icon
  }),
}).addTo(map);

var BPd2 = L.marker([-23.33321, 108.299404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPd. 2</div>',
  }),
}).addTo(map);

//Vertikal 2
var lingtem49 = L.polygon(
  [
    [-23.32321, 108.359404], //atas
    [-23.78421, 108.359404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtem49 = L.polygon(
  [
    [-23.78321, 108.359404], //atas
    [-24.89021, 109.714404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih71 = L.marker([-23.78321, 108.359804], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih71 = L.polygon(
  [
    [-23.78321, 108.359804], //kiri
    [-23.78321, 108.599804], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih71 = L.polygon(
  [
    [-23.89321, 108.129804], //kiri
    [-23.78321, 108.369804], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var Bksm1 = L.marker([-23.78321, 108.312804], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BKsm. 1</div>',
  }),
}).addTo(map);

var lingtih72 = L.marker([-24.01321, 108.629934], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih72 = L.polygon(
  [
    [-24.01321, 109.059804], //kiri
    [-24.01321, 108.629934], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var Bksm2 = L.marker([-24.05321, 108.482804], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(160deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BKsm. 2</div>',
  }),
}).addTo(map);

var lingtih73 = L.marker([-24.22321, 108.879934], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih73 = L.polygon(
  [
    [-24.22321, 109.059804], //kiri
    [-24.22321, 108.879934], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var Bksm3 = L.marker([-24.27321, 108.732804], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(160deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BKsm. 3</div>',
  }),
}).addTo(map);

var lingtih74 = L.marker([-24.42321, 109.129934], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih74 = L.polygon(
  [
    [-24.40321, 108.929804], //kiri
    [-24.42321, 109.149804], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var Bksm4 = L.marker([-24.51321, 109.032804], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(160deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BKsm. 4</div>',
  }),
}).addTo(map);

var SSKEDUNGSALAM = L.marker([-24.46321, 109.332404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(43deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. KEDUNG SALAM</div>',
  }),
}).addTo(map);

var lingtih75 = L.marker([-24.64321, 109.398934], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih75 = L.polygon(
  [
    [-24.64321, 109.389804], //kiri
    [-24.64321, 109.659934], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih76 = L.marker([-24.88321, 109.688934], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih76 = L.polygon(
  [
    [-25.08321, 109.559934], //kiri
    [-24.88321, 109.699804], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var Bksm6 = L.marker([-24.88321, 109.749804], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(160deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BKsm. 6</div>',
  }),
}).addTo(map);
//end of vertical1

var lingtih77 = L.marker([-23.32321, 108.679404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih77 = L.polygon(
  [
    [-23.22321, 108.679404], //atas
    [-23.43421, 108.679404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPd3 = L.marker([-23.41321, 108.709404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPd. 3</div>',
  }),
}).addTo(map);

var lingtih78 = L.marker([-23.32321, 108.969404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih78 = L.polygon(
  [
    [-23.07321, 108.969404], //atas
    [-23.33421, 108.969404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPd4 = L.marker([-23.47321, 108.969404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPd. 4</div>',
  }),
}).addTo(map);

var SSPURWODADI = L.marker([-23.56321, 109.032404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. PURWODADI</div>',
  }),
}).addTo(map);

var lingtih79 = L.marker([-23.32321, 109.319404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih79 = L.polygon(
  [
    [-23.25321, 109.319404], //atas
    [-23.63421, 109.319404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPd5 = L.marker([-23.47321, 109.289404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPd. 5</div>',
  }),
}).addTo(map);

var lingtih80 = L.marker([-23.32321, 109.509404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih80 = L.polygon(
  [
    [-23.31321, 109.509404], //atas
    [-23.43421, 109.509404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPd6 = L.marker([-23.33321, 109.509404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPd. 6</div>',
  }),
}).addTo(map);

var lingtih81 = L.marker([-23.32321, 109.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih81 = L.polygon(
  [
    [-23.22321, 109.709404], //atas
    [-23.32421, 109.709404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BPd7 = L.marker([-23.40321, 109.729404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BPd. 7</div>',
  }),
}).addTo(map);

var lingtih82 = L.marker([-24.20321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih82 = L.polygon(
  [
    [-24.20321, 107.487404], //kiri
    [-24.20321, 107.689404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN4 = L.marker([-24.22321, 107.489404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.4</div>',
  }),
}).addTo(map);

var lingtih83 = L.marker([-24.55321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih83 = L.polygon(
  [
    [-24.55321, 107.299404], //kiri
    [-24.55321, 107.487404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN5 = L.marker([-24.55321, 107.509404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.5</div>',
  }),
}).addTo(map);

var lingtih84 = L.marker([-24.85321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih84 = L.polygon(
  [
    [-24.85321, 107.487404], //kiri
    [-24.85321, 107.589404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN6 = L.marker([-24.87321, 107.489404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.6</div>',
  }),
}).addTo(map);

var lingtem50 = L.marker([-25.17321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var BN7 = L.marker([-25.30321, 107.479404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.7</div>',
  }),
}).addTo(map);

//Horizontal 3
var lingtem50 = L.polygon(
  [
    [-25.28321, 107.487404], //kiri
    [-25.28321, 108.889404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih85 = L.marker([-25.28321, 107.847404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih85 = L.polygon(
  [
    [-25.28521, 107.847404], //atas
    [-25.18421, 107.897404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSm1 = L.marker([-25.44521, 107.847404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BSm. 1</div>',
  }),
}).addTo(map);

var lingtih86 = L.marker([-25.28321, 108.157404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih86 = L.polygon(
  [
    [-25.28521, 108.157404], //atas
    [-24.98421, 108.288404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSm2 = L.marker([-25.44521, 108.157404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BSm. 2</div>',
  }),
}).addTo(map);

var lingtih87 = L.marker([-25.28321, 108.477404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih87 = L.polygon(
  [
    [-25.28321, 108.477404], //atas
    [-25.43421, 108.477404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSm3 = L.marker([-25.28521, 108.477404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BSm. 3</div>',
  }),
}).addTo(map);

var lingtih88 = L.marker([-25.28321, 108.777404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var BSm4 = L.marker([-25.28521, 108.777404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BSm. 4</div>',
  }),
}).addTo(map);

var SSSIDOMUKTI = L.marker([-24.96321, 108.732404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. SIDO MUKTI</div>',
  }),
}).addTo(map);
//end of Horizontal3

var lingtih89 = L.marker([-25.67321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih89 = L.polygon(
  [
    [-25.67321, 107.487404], //kiri
    [-25.67321, 107.689404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN8 = L.marker([-25.69321, 107.509404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.8</div>',
  }),
}).addTo(map);

var lingtem51 = L.marker([-26.11321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [35, 35], // Ukuran icon
  }),
}).addTo(map);

var BN9 = L.marker([-26.13321, 107.479404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.9</div>',
  }),
}).addTo(map);

//Horizontal 4
var lingtem51 = L.polygon(
  [
    [-26.11321, 107.487404], //kiri
    [-26.11321, 108.189404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtem51 = L.polygon(
  [
    [-26.11321, 108.187404], //kiri
    [-26.51321, 108.509404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih90 = L.marker([-26.11321, 107.677404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih90 = L.polygon(
  [
    [-25.88521, 107.877404], //atas
    [-26.11321, 107.677404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtih90 = L.polygon(
  [
    [-26.11321, 107.677404], //atas
    [-26.28421, 107.677404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKa1 = L.marker([-26.20521, 107.637404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BKa.1</div>',
  }),
}).addTo(map);

var lingtih91 = L.marker([-26.11321, 108.077404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih91 = L.polygon(
  [
    [-26.11321, 108.077404], //atas
    [-26.48421, 108.077404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKa2 = L.marker([-26.26521, 108.107404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BKa.2</div>',
  }),
}).addTo(map);

var lingtih92 = L.marker([-26.51321, 108.507404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih92 = L.polygon(
  [
    [-26.51321, 108.787404], //kiri
    [-26.51321, 108.507404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BKa3 = L.marker([-26.51321, 108.507404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BKa.3</div>',
  }),
}).addTo(map);

var SSKALENANYAR = L.marker([-26.16321, 108.732404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 15px; white-space: nowrap;">SS. KALEN ANYAR</div>',
  }),
}).addTo(map);

var lingtih93 = L.marker([-26.81321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih93 = L.polygon(
  [
    [-26.81321, 107.487404], //kiri
    [-26.81321, 107.689404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN10 = L.marker([-26.83321, 107.479404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.10</div>',
  }),
}).addTo(map);

var lingtih94 = L.marker([-27.11321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih94 = L.polygon(
  [
    [-27.11321, 107.487404], //kiri
    [-27.11321, 107.689404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN11 = L.marker([-27.13321, 107.479404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.11</div>',
  }),
}).addTo(map);

var lingtih95 = L.marker([-27.41321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih95 = L.polygon(
  [
    [-27.41321, 107.487404], //kiri
    [-27.41321, 107.689404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN12 = L.marker([-27.43321, 107.479404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.12</div>',
  }),
}).addTo(map);

var lingtih96 = L.marker([-27.71321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih96 = L.polygon(
  [
    [-27.71321, 107.487404], //kiri
    [-27.71321, 107.689404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN13 = L.marker([-27.73321, 107.479404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.13</div>',
  }),
}).addTo(map);

var lingtih97 = L.marker([-28.04321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtih97 = L.polygon(
  [
    [-27.11421, 107.487404], //atas
    [-28.15421, 107.487404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BN14 = L.marker([-28.06321, 107.479404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BN.14</div>',
  }),
}).addTo(map);

//looping box petak

var rectangle = getBoxDataIrigasi();

rectangle.then(result => {
  result.forEach(r => {
    var kotak = L.marker([r.latitude, r.longitude], {
      icon: L.icon({
        iconUrl: `${r.iconUrl}`,
        iconSize: [r.iconWidth, r.iconHeight],
      }),
    }).addTo(map);
  });
}).catch(error => {
  console.error(error);
});

//end looping box petak

// {isi kotak dummy}
var BKd1 = L.marker([-6.97121, 108.069404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Pt.Kd.1-Kn</div>',
  }),
}).addTo(map);

var BKd1 = L.marker([-7.02121, 107.984404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Luas <br>taman <br>xxxxx ha</div>',
  }),
}).addTo(map);

var BKd1 = L.marker([-7.00821, 108.114404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 7px; white-space: nowrap;">Q Kebutuhan <br>00000 lt/dt</div>',
  }),
}).addTo(map);

var BKd1 = L.marker([-7.05121, 108.114404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 7px; white-space: nowrap;">Q Actual <br>00000 lt/dt</div>',
  }),
}).addTo(map);

async function getBoxDataIrigasi() {
  try {
      const response = await fetch(`/Schema/GetBoxDataIrigasi`);

      if (response.ok) {
          const boxSkema = await response.json();
          return boxSkema;
      } else {
          // Handle non-ok response (e.g., 404, 500)
          console.error(`Error: ${response.status} - ${response.statusText}`);
      }
  } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
  }
}

//{--Start Kotak Hijau--}
// var kotak = L.marker([-6.99921, 107.979404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak1 = L.marker([-6.53921, 108.449404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak2 = L.marker([-6.99921, 108.449404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak3 = L.marker([-6.53921, 108.784404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak4 = L.marker([-6.53921, 109.131404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak5 = L.marker([-6.53921, 109.534404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak6 = L.marker([-6.53921, 109.884404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak7 = L.marker([-6.99921, 110.194404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak8 = L.marker([-6.76321, 110.679404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak9 = L.marker([-6.96321, 110.679404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak10 = L.marker([-6.40321, 108.029404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak11 = L.marker([-6.15321, 107.939404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak12 = L.marker([-5.67321, 107.939404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak13 = L.marker([-6.15321, 108.339404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak14 = L.marker([-5.67321, 108.589404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak15 = L.marker([-5.67321, 109.169404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak16 = L.marker([-6.15321, 109.529404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak17 = L.marker([-5.67321, 109.529404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak18 = L.marker([-4.96321, 108.069404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak19 = L.marker([-4.96321, 108.609404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak20 = L.marker([-4.50321, 108.029404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak21 = L.marker([-8.22321, 107.789404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak22 = L.marker([-8.84321, 107.887404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak23 = L.marker([-9.36321, 107.887404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak24 = L.marker([-9.09321, 108.569404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak25 = L.marker([-9.71321, 107.887404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak26 = L.marker([-10.26321, 107.887404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak27 = L.marker([-9.97321, 108.569404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak28 = L.marker([-7.30321, 107.722404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak29 = L.marker([-7.77321, 107.722404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak30 = L.marker([-8.02321, 107.987404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak31 = L.marker([-7.97321, 108.677404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak32 = L.marker([-8.44321, 108.287404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak33 = L.marker([-8.34321, 108.962404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak34 = L.marker([-8.90321, 108.909404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak35 = L.marker([-7.77321, 108.632404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak35 = L.marker([-7.77321, 108.952404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak36 = L.marker([-7.77321, 109.382404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak37 = L.marker([-7.77321, 109.722404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak38 = L.marker([-7.30321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak39 = L.marker([-7.99321, 110.362404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak40 = L.marker([-8.40321, 109.702404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak41 = L.marker([-8.85321, 109.702404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak42 = L.marker([-8.85321, 110.362404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak43 = L.marker([-9.14321, 110.362404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak44 = L.marker([-9.49321, 110.362404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak45 = L.marker([-9.99321, 110.362404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak46 = L.marker([-10.23321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak47 = L.marker([-7.77321, 110.522404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak48 = L.marker([-7.96821, 111.352404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak49 = L.marker([-7.96821, 110.682404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak50 = L.marker([-8.46821, 110.682404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak51 = L.marker([-9.08821, 111.022404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak52 = L.marker([-8.06821, 112.562404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak53 = L.marker([-8.36821, 111.882404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak54 = L.marker([-8.96821, 112.562404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak55 = L.marker([-9.36821, 112.562404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak56 = L.marker([-9.66821, 111.882404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak57 = L.marker([-10.06821, 112.562404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak58 = L.marker([-10.06821, 111.882404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak59 = L.marker([-10.46821, 112.562404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak60 = L.marker([-10.76821, 111.882404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak61 = L.marker([-10.96821, 112.562404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak62 = L.marker([-10.96821, 111.882404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak63 = L.marker([-11.26821, 111.882404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak64 = L.marker([-11.66821, 112.562404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak65 = L.marker([-11.66821, 111.882404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak66 = L.marker([-11.96821, 112.562404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak67 = L.marker([-12.26821, 111.882404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak68 = L.marker([-12.56821, 112.222404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak69 = L.marker([-7.77321, 112.712404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak70 = L.marker([-7.77321, 113.429404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

//{--End Kotak Hijau--}

//{--Start Kotak Biru--}
// var kotak71 = L.marker([-13.90621, 107.897404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak72 = L.marker([-14.15621, 108.467404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak73 = L.marker([-14.92621, 108.467404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak74 = L.marker([-14.15621, 108.967404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak75 = L.marker([-14.83621, 109.367404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak76 = L.marker([-14.15321, 109.767404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak77 = L.marker([-14.68321, 110.897404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak78 = L.marker([-14.52321, 111.937404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak79 = L.marker([-16.71321, 112.007404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak80 = L.marker([-16.71321, 111.287404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak81 = L.marker([-15.25321, 111.947404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak82 = L.marker([-15.25321, 111.247404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak83 = L.marker([-15.85321, 111.947404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak84 = L.marker([-14.97321, 110.917404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak85 = L.marker([-15.47321, 110.917404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak86 = L.marker([-15.97321, 110.917404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak87 = L.marker([-16.47321, 110.917404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak88 = L.marker([-17.13971, 111.167404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak89 = L.marker([-17.63971, 111.197404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak90 = L.marker([-18.12921, 107.994604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak91 = L.marker([-18.42921, 108.994604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak92 = L.marker([-19.09321, 109.394604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak93 = L.marker([-18.14321, 109.594604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak94 = L.marker([-19.09321, 109.994604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak95 = L.marker([-19.39321, 110.584604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak96 = L.marker([-19.09321, 111.154604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak97 = L.marker([-18.10321, 111.114604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak98 = L.marker([-19.09321, 111.754604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak99 = L.marker([-17.51321, 111.984604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak100 = L.marker([-18.01329, 112.244604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak101 = L.marker([-19.29321, 112.744604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak102 = L.marker([-19.59321, 112.73604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak103 = L.marker([-19.59321, 112.03604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak104 = L.marker([-18.43321, 112.57604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak105 = L.marker([-18.02321, 112.884604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak106 = L.marker([-19.06321, 112.884604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak107 = L.marker([-18.99321, 113.384604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak108 = L.marker([-19.68321, 113.384604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak109 = L.marker([-19.68321, 113.984604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak110 = L.marker([-18.33321, 114.124604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak111 = L.marker([-19.1, 114.124604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak112 = L.marker([-18.33, 114.624604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak113 = L.marker([-19.08999, 114.824604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak114 = L.marker([-18.32999, 115.10604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak115 = L.marker([-18.32999, 115.49604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak116 = L.marker([-18.32999, 115.49604], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak1.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);
//{--End Kotak Biru--}

//{--Start Kotak Ungu--}
// var kotak117 = L.marker([-21.99321, 107.997404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak118 = L.marker([-22.29421, 107.887404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak119 = L.marker([-22.77421, 107.887404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak120 = L.marker([-22.29421, 108.357404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak121 = L.marker([-22.77421, 108.357404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak122 = L.marker([-22.29421, 108.807404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak123 = L.marker([-22.77421, 109.187404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak124 = L.marker([-22.32321, 110.057404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak125 = L.marker([-22.72321, 110.057404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak126 = L.marker([-23.13321, 110.825404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak127 = L.marker([-23.13321, 110.195404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak128 = L.marker([-23.56321, 110.825404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak129 = L.marker([-23.56321, 110.195404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak130 = L.marker([-23.78321, 110.825404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak131 = L.marker([-23.78321, 110.195404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak132 = L.marker([-22.12321, 111.157404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak133 = L.marker([-22.92321, 111.157404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak134 = L.marker([-22.22321, 111.827404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak135 = L.marker([-22.82321, 111.827404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak136 = L.marker([-22.40321, 112.428404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak137 = L.marker([-22.64321, 112.428404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak138 = L.marker([-22.10321, 113.278404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak139 = L.marker([-22.94321, 113.278404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak140 = L.marker([-22.40321, 113.989404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak141 = L.marker([-22.64321, 113.989404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak142 = L.marker([-23.40321, 106.847404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
//   rotationAngle: 90,
// }).addTo(map);

// var kotak143 = L.marker([-23.57421, 107.859404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak144 = L.marker([-23.98321, 108.129804], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak145 = L.marker([-23.78321, 108.759804], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak146 = L.marker([-24.01321, 109.229934], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak147 = L.marker([-24.22321, 109.229934], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak148 = L.marker([-24.40321, 108.779804], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak149 = L.marker([-24.64321, 109.819934], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak150 = L.marker([-25.17321, 109.589804], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak151 = L.marker([-23.13321, 108.619404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak152 = L.marker([-23.52421, 108.679404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak153 = L.marker([-22.98321, 108.969404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak154 = L.marker([-23.16321, 109.319404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak155 = L.marker([-23.73421, 109.319404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak156 = L.marker([-23.52421, 109.509404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak157 = L.marker([-23.13321, 109.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak158 = L.marker([-23.35321, 109.969404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak159 = L.marker([-24.20321, 107.857404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak160 = L.marker([-24.45321, 107.057404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
//   rotationAngle: 90,
// }).addTo(map);

// var kotak161 = L.marker([-24.85321, 107.759404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak162 = L.marker([-25.09521, 107.847404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak163 = L.marker([-24.89421, 108.288404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak164 = L.marker([-25.53421, 108.477404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak165 = L.marker([-25.28321, 109.057404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak166 = L.marker([-25.58321, 107.859404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak167 = L.marker([-26.38421, 107.677404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak168 = L.marker([-25.79521, 107.967404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak169 = L.marker([-26.58421, 108.077404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak170 = L.marker([-26.51321, 108.947404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak171 = L.marker([-26.81321, 107.857404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak172 = L.marker([-27.11321, 107.857404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak173 = L.marker([-27.41321, 107.857404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak174 = L.marker([-27.71321, 107.857404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

// var kotak175 = L.marker([-28.24321, 107.487404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak2.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);
//{--End Kotak Ungu--}

//{end garis sidareja 4}

/* <tr>
<td><img src="/assets/img/box.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Bangunan Box</td>
</tr>
<tr>
<td><img src="/assets/img/lingtih.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Bangunan Pengambil/Sadap</td>
</tr>
<tr>
<td><img src="/assets/img/lingtem.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Bangunan Pembagi</td>
</tr>
<tr>
<td><img src="/assets/img/gorong.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Gorong - gorong</td>
</tr>
<tr>
<td><img src="/assets/img/drain.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Drain Crosing</td>
</tr>
<tr>
<td><img src="/assets/img/flum.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Parshal Flum</td>
</tr>
<tr>
<td><img src="/assets/img/check.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Bangunan Check</td>
</tr>
<tr>
<td><img src="/assets/img/pelimpah.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Bangunan Pelimpah</td>
</tr>
<tr>
<td><img src="/assets/img/drop.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Bangunan Drop</td>
</tr>
<tr>
<td><img src="/assets/img/cuci.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Tangga Cuci</td>
</tr>
<tr>
<td><img src="/assets/img/hijau.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Golongan A</td>
</tr>
<tr>
<td><img src="/assets/img/biru.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Golongan B</td>
</tr>
<tr>
<td><img src="/assets/img/ungu.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
<td>Golongan C</td>
</tr> */

// garis pertama
// var oncoran = L.marker([-7.08321, 107.457404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var oncoran1 = L.marker([-7.02321, 107.899404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">A=7878 Ha<br>Q=11.753 m3/s<br>L=1615.05 m</div>',
//   }),
// }).addTo(map);

// var drain = L.marker([-6.92321, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
// }).addTo(map);

// var BSVIa = L.marker([-6.94321, 107.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIa</div>',
//   }),
// }).addTo(map);

// var drop = L.marker([-6.76321, 107.789404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 25], // Ukuran icon
//   }),
// }).addTo(map);

// var BKd1a = L.marker([-6.77821, 107.789404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 1a</div>',
//   }),
// }).addTo(map);

// var BKd1 = L.polygon(
//   [
//     [-6.90321, 107.829404], //kiri
//     [-6.90321, 108.109404], //kanan
//   ],
//   {
//     color: 'green',
//     weight: 1,
//   }
// ).addTo(map);

// var BKd1 = L.polygon(
//   [
//     [-6.90321, 107.829404], //atas
//     [-6.95321, 107.829404], //bawah
//   ],
//   {
//     color: 'green',
//     weight: 1,
//   }
// ).addTo(map);

// var BKd1 = L.polygon(
//   [
//     [-6.90321, 108.109404], //atas
//     [-6.95321, 108.109404], //bawah
//   ],
//   {
//     color: 'green',
//     weight: 1,
//   }
// ).addTo(map);

// var BKd1 = L.polygon(
//   [
//     [-6.95321, 107.829404], //kiri
//     [-6.95321, 108.109404], //kanan
//   ],
//   {
//     color: 'green',
//     weight: 1,
//   }
// ).addTo(map);

// var BKd1 = L.polygon(
//   [
//     [-6.92521, 107.829404], //kiri
//     [-6.92521, 108.109404], //kanan
//   ],
//   {
//     color: 'green',
//     weight: 1,
//   }
// ).addTo(map);

// var BKd1 = L.marker([-6.97121, 108.069404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 8px; white-space: nowrap;">Pt.Kd.1-Kn</div>',
//   }),
// }).addTo(map);

// var BKd1 = L.marker([-7.02121, 107.984404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 8px; white-space: nowrap;">Luas <br>taman <br>xxxxx ha</div>',
//   }),
// }).addTo(map);

// var BKd1 = L.marker([-7.00821, 108.114404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 8px; white-space: nowrap;">Q Kebutuhan <br>00000 lt/dt</div>',
//   }),
// }).addTo(map);

// var BKd1 = L.marker([-7.07421, 108.114404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 8px; white-space: nowrap;">Q Actual <br>00000 lt/dt</div>',
//   }),
// }).addTo(map);

// var flum = L.marker([-6.76621, 108.029404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/flum.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BKd2a = L.marker([-6.77821, 108.029404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 2a</div>',
//   }),
// }).addTo(map);

// var cuci = L.marker([-6.75621, 108.079404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BKd2b = L.marker([-6.77821, 108.079404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 2b</div>',
//   }),
// }).addTo(map);

// var gorong = L.marker([-6.73621, 108.169404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd2c = L.marker([-6.77821, 108.142404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 2c</div>',
//   }),
// }).addTo(map);

// var gorong1 = L.marker([-6.73621, 108.249404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd2d = L.marker([-6.77821, 108.222404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 2d</div>',
//   }),
// }).addTo(map);

// var lingtem1 = L.marker([-6.76321, 108.269404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem1 = L.polygon(
//   [
//     [-6.66321, 108.269404], //atas
//     [-6.76321, 108.269404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran2 = L.marker([-6.78821, 108.269404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var box = L.marker([-6.76521, 108.319404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd2e = L.marker([-6.77821, 108.319404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 2e</div>',
//   }),
// }).addTo(map);

// var BKd2 = L.marker([-6.50921, 108.539404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 8px; white-space: nowrap;">Pt.Kd.2-Kl</div>',
//   }),
// }).addTo(map);

// var BKd2 = L.marker([-6.55921, 108.454404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 8px; white-space: nowrap;">Luas <br>taman <br>xxxxx ha</div>',
//   }),
// }).addTo(map);

// var BKd2 = L.marker([-6.54421, 108.574404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 8px; white-space: nowrap;">Q Kebutuhan <br>00000 lt/dt</div>',
//   }),
// }).addTo(map);

// var BKd2 = L.marker([-6.61421, 108.574404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 8px; white-space: nowrap;">Q Actual <br>00000 lt/dt</div>',
//   }),
// }).addTo(map);

// var lingtem2 = L.marker([-6.76321, 108.569404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem2 = L.polygon(
//   [
//     [-6.66321, 108.569404], //atas
//     [-6.76321, 108.569404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var cuci1 = L.marker([-6.75621, 108.659404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BKd3a = L.marker([-6.77821, 108.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 3a</div>',
//   }),
// }).addTo(map);

// var gorong2 = L.marker([-6.73621, 108.739404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd3b = L.marker([-6.77821, 108.714404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 3b</div>',
//   }),
// }).addTo(map);

// var check = L.marker([-6.76301, 108.834404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd4a = L.marker([-6.77821, 108.834404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 4a</div>',
//   }),
// }).addTo(map);

// var cuci2 = L.marker([-6.75621, 108.884404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BKd4b = L.marker([-6.77821, 108.884404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 4b</div>',
//   }),
// }).addTo(map);

// var box1 = L.marker([-6.76521, 108.964404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd4c = L.marker([-6.77821, 108.964404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 4c</div>',
//   }),
// }).addTo(map);

// var gorong3 = L.marker([-6.73621, 109.084404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd4d = L.marker([-6.77821, 109.061404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 4d</div>',
//   }),
// }).addTo(map);

// var check1 = L.marker([-6.76301, 109.183404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd5a = L.marker([-6.77821, 109.183404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5a</div>',
//   }),
// }).addTo(map);

// var box2 = L.marker([-6.76521, 109.234404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd5b = L.marker([-6.77821, 109.234404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5b</div>',
//   }),
// }).addTo(map);

// var gorong4 = L.marker([-6.73621, 109.344404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd5c = L.marker([-6.77821, 109.321404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5c</div>',
//   }),
// }).addTo(map);

// var cuci3 = L.marker([-6.76621, 109.395404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BKd5d = L.marker([-6.77821, 109.395404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5d</div>',
//   }),
// }).addTo(map);

// var pelimpah = L.marker([-6.71621, 109.444404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/pelimpah.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -180, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd5e = L.marker([-6.77821, 109.444404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5e</div>',
//   }),
// }).addTo(map);

// var gorong5 = L.marker([-6.73621, 109.514404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd5f = L.marker([-6.77821, 109.494404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5f</div>',
//   }),
// }).addTo(map);

// var check2 = L.marker([-6.76301, 109.574404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd6a = L.marker([-6.77821, 109.574404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 6a</div>',
//   }),
// }).addTo(map);

// var cuci4 = L.marker([-6.76621, 109.644404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BKd6b = L.marker([-6.77821, 109.644404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 6b</div>',
//   }),
// }).addTo(map);

// var box3 = L.marker([-6.76521, 109.724404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd6c = L.marker([-6.77821, 109.724404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 6c</div>',
//   }),
// }).addTo(map);

// var check3 = L.marker([-6.76301, 109.934404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd7a = L.marker([-6.77821, 109.934404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 7a</div>',
//   }),
// }).addTo(map);

// var cuci5 = L.marker([-6.76621, 109.994404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BKd7b = L.marker([-6.77821, 109.994404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 7b</div>',
//   }),
// }).addTo(map);

// var box4 = L.marker([-6.76521, 110.124404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKd7c = L.marker([-6.77821, 110.124404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 7c</div>',
//   }),
// }).addTo(map);

// var lingtem3 = L.marker([-6.76321, 110.314404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem3 = L.polygon(
//   [
//     [-6.66321, 110.314404], //atas
//     [-6.76321, 110.314404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran3 = L.marker([-6.63321, 110.294404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var drain1 = L.marker([-6.64321, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
// }).addTo(map);

// var BSVb = L.marker([-6.66321, 107.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Vb</div>',
//   }),
// }).addTo(map);

// var drain2 = L.marker([-6.54321, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
// }).addTo(map);

// var BSVa = L.marker([-6.56321, 107.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Va</div>',
//   }),
// }).addTo(map);

// var drain3 = L.marker([-6.23321, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
// }).addTo(map);

// var BSVIa = L.marker([-6.25321, 107.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIa</div>',
//   }),
// }).addTo(map);

// var flum1 = L.marker([-5.90821, 108.049404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/flum.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BRm2a = L.marker([-5.92821, 108.049404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.2a</div>',
//   }),
// }).addTo(map);

// var cuci6 = L.marker([-5.89521, 108.179404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BRm2b = L.marker([-5.92821, 108.179404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.2b</div>',
//   }),
// }).addTo(map);

// var box5 = L.marker([-5.90451, 107.789404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BRm1a = L.marker([-5.92821, 107.789404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm. 1a</div>',
//   }),
// }).addTo(map);

// var drop1 = L.marker([-5.90251, 107.859404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 25], // Ukuran icon
//   }),
// }).addTo(map);

// var BRm1b = L.marker([-5.92821, 107.859404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm. 1b</div>',
//   }),
// }).addTo(map);

// var gorong6 = L.marker([-5.87521, 108.464404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BRm3a = L.marker([-5.92821, 108.434404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.3a</div>',
//   }),
// }).addTo(map);

// var check4 = L.marker([-5.90321, 108.634404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BRm4a = L.marker([-5.92821, 108.624404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.4a</div>',
//   }),
// }).addTo(map);

// var cuci6 = L.marker([-5.89521, 108.684404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BRm4b = L.marker([-5.92821, 108.678404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.4b</div>',
//   }),
// }).addTo(map);

// var pelimpah1 = L.marker([-5.85521, 108.724404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/pelimpah.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -180, // Rotate the icon -90 degrees
// }).addTo(map);

// var BRm4c = L.marker([-5.92821, 108.724404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.4c</div>',
//   }),
// }).addTo(map);

// var box6 = L.marker([-5.90451, 108.794404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BRm4d = L.marker([-5.92821, 108.789404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.4d</div>',
//   }),
// }).addTo(map);

// var lingtem5 = L.marker([-5.90451, 108.839404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem5 = L.polygon(
//   [
//     [-5.90451, 108.839404], //atas
//     [-6.01321, 108.839404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran4 = L.marker([-5.92821, 108.821404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var box7 = L.marker([-5.90451, 108.879404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BRm4e = L.marker([-5.92821, 108.879404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm. 4e</div>',
//   }),
// }).addTo(map);

// var lingtem6 = L.marker([-5.90451, 108.949404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem6 = L.polygon(
//   [
//     [-5.90451, 108.949404], //atas
//     [-6.01321, 108.949404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran5 = L.marker([-5.92821, 108.932404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var lingtem7 = L.marker([-5.90451, 109.019404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem7 = L.polygon(
//   [
//     [-5.90451, 109.019404], //atas
//     [-6.01321, 109.019404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran6 = L.marker([-5.92821, 109.006404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var lingtem8 = L.marker([-5.90451, 109.089404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem8 = L.polygon(
//   [
//     [-5.90451, 109.089404], //atas
//     [-6.01321, 109.089404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran7 = L.marker([-5.92821, 109.073404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var box8 = L.marker([-5.90451, 109.129404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BRm4f = L.marker([-5.92821, 109.129404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm. 4f</div>',
//   }),
// }).addTo(map);

// var check5 = L.marker([-5.90321, 109.209404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BRm5a = L.marker([-5.92821, 109.205404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.5a</div>',
//   }),
// }).addTo(map);

// var cuci7 = L.marker([-5.90521, 109.325404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BRm5b = L.marker([-5.92821, 109.325404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.5b</div>',
//   }),
// }).addTo(map);

// var box9 = L.marker([-5.90451, 109.425404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BRm5c = L.marker([-5.92821, 109.425404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.5c</div>',
//   }),
// }).addTo(map);

// var box10 = L.marker([-5.55451, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSIIIa = L.marker([-5.57451, 107.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.IIIa</div>',
//   }),
// }).addTo(map);

// var drop2 = L.marker([-5.20321, 107.839404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 25], // Ukuran icon
//   }),
// }).addTo(map);

// var BKs1a = L.marker([-5.22321, 107.839404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKs.1a</div>',
//   }),
// }).addTo(map);

// var lingtem10 = L.marker([-5.20321, 107.909404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem10 = L.polygon(
//   [
//     [-5.20321, 107.909404], //atas
//     [-5.30321, 107.909404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran8 = L.marker([-5.22321, 107.892404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var box11 = L.marker([-5.20421, 107.979404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKs1b = L.marker([-5.22321, 107.979404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKs.1b</div>',
//   }),
// }).addTo(map);

// var check6 = L.marker([-5.20121, 108.129404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKs2a = L.marker([-5.22321, 108.129404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKs.2a</div>',
//   }),
// }).addTo(map);

// var lingtem11 = L.marker([-5.20321, 108.209404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem11 = L.polygon(
//   [
//     [-5.20321, 108.209404], //atas
//     [-5.30321, 108.209404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran9 = L.marker([-5.22321, 108.189404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var lingtem12 = L.marker([-5.20321, 108.299404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem12 = L.polygon(
//   [
//     [-5.20321, 108.299404], //atas
//     [-5.30321, 108.299404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran10 = L.marker([-5.22321, 108.282404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var lingtem13 = L.marker([-5.20321, 108.399404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem13 = L.polygon(
//   [
//     [-5.20321, 108.399404], //atas
//     [-5.30321, 108.399404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran11 = L.marker([-5.22321, 108.381404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var box12 = L.marker([-5.20421, 108.521404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BKs2b = L.marker([-5.22321, 108.521404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKs.2b</div>',
//   }),
// }).addTo(map);

// var drain4 = L.marker([-4.98321, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
// }).addTo(map);

// var BSIIb = L.marker([-5.00321, 107.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.IIb</div>',
//   }),
// }).addTo(map);

// var lingtem14 = L.marker([-4.88321, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem14 = L.polygon(
//   [
//     [-4.88321, 107.499404], //kiri
//     [-4.88321, 107.823404], //kanan
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var drain5 = L.marker([-4.78321, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
// }).addTo(map);

// var BSIIa = L.marker([-4.80321, 107.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.IIa</div>',
//   }),
// }).addTo(map);

// var lingtem15 = L.marker([-4.68321, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem15 = L.polygon(
//   [
//     [-4.68321, 107.499404], //kiri
//     [-4.68321, 107.823404], //kanan
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran12 = L.polygon(
//   [
//     [-4.68321, 107.499404], //atas
//     [-5.05321, 107.499404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran12 = L.marker([-4.89321, 107.469404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var drop3 = L.marker([-4.30321, 107.709804], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 25], // Ukuran icon
//   }),
// }).addTo(map);

// var BSId = L.marker([-4.32321, 107.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Id</div>',
//   }),
// }).addTo(map);

// var gorong6 = L.marker([-4.25321, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSIc = L.marker([-4.27321, 107.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Ic</div>',
//   }),
// }).addTo(map);

// var box13 = L.marker([-4.20321, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSIb = L.marker([-4.22321, 107.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Ib</div>',
//   }),
// }).addTo(map);

// var lingtih18 = L.marker([-4.15321, 107.709804], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSIa = L.marker([-4.17321, 107.659404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Ia</div>',
//   }),
// }).addTo(map);

// var lingtem16 = L.marker([-4.11321, 107.709404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem16 = L.polygon(
//   [
//     [-4.11321, 107.599404], //kiri
//     [-4.11321, 107.709404], //kanan
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var BSO = L.marker([-4.13321, 107.909404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.O</div>',
//   }),
// }).addTo(map);

//{garis sidareja 2}
// var lingtem17 = L.marker([-7.32321, 107.487404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem17 = L.polygon(
//   [
//     [-7.32321, 107.309404], //kiri
//     [-7.32321, 107.549404], //kanan
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var lingtem17 = L.polygon(
//   [
//     [-7.32321, 107.309404], //atas
//     [-7.48321, 107.309404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran13 = L.marker([-7.32321, 107.409404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var check7 = L.marker([-7.63321, 107.469404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSVIIa = L.marker([-7.67321, 107.409404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIIa</div>',
//   }),
// }).addTo(map);

// var box14 = L.marker([-7.75321, 107.487404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSVIIb = L.marker([-7.77321, 107.409404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIIb</div>',
//   }),
// }).addTo(map);

// var lingtem19 = L.marker([-7.88321, 107.487404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var lingtem19 = L.polygon(
//   [
//     [-7.88321, 107.309404], //kiri
//     [-7.88321, 107.549404], //kanan
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var lingtem19 = L.polygon(
//   [
//     [-7.88321, 107.309404], //atas
//     [-8.04321, 107.309404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran14 = L.marker([-7.88321, 107.409404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var lingtem20 = L.marker([-8.42321, 107.487404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem20 = L.polygon(
//   [
//     [-8.42321, 107.309404], //kiri
//     [-8.42321, 107.549404], //kanan
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var lingtem20 = L.polygon(
//   [
//     [-8.42321, 107.309404], //atas
//     [-8.58321, 107.309404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran15 = L.marker([-8.42321, 107.409404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var drain5 = L.marker([-8.52321, 107.487404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
// }).addTo(map);

// var BSVIIIa = L.marker([-8.52321, 107.409404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIIIa</div>',
//   }),
// }).addTo(map);

// var lingtem21 = L.marker([-8.74321, 107.487404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem21 = L.polygon(
//   [
//     [-8.74321, 107.309404], //kiri
//     [-8.74321, 107.549404], //kanan
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran16 = L.marker([-8.79321, 107.409404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var drain6 = L.marker([-8.86321, 107.487404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
// }).addTo(map);

// var BSVIIIb = L.marker([-8.88321, 107.409404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIIIb</div>',
//   }),
// }).addTo(map);

// var lingtem22 = L.marker([-8.90321, 107.487404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem22 = L.polygon(
//   [
//     [-8.90321, 107.309404], //kiri
//     [-8.90321, 107.549404], //kanan
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran17 = L.marker([-8.95321, 107.409404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var drop4 = L.marker([-9.09321, 107.569404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 25], // Ukuran icon
//   }),
// }).addTo(map);

// var BSd1a = L.marker([-9.12321, 107.569404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1a</div>',
//   }),
// }).addTo(map);

// var drain7 = L.marker([-9.07321, 107.639404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BSd1b = L.marker([-9.12321, 107.619404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1b</div>',
//   }),
// }).addTo(map);

// var cuci8 = L.marker([-9.08321, 107.689404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BSd1c = L.marker([-9.12321, 107.689404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1c</div>',
//   }),
// }).addTo(map);

// var box15 = L.marker([-9.09621, 107.749404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSd1d = L.marker([-9.12321, 107.749404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1d</div>',
//   }),
// }).addTo(map);

// var box16 = L.marker([-9.09621, 107.819404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSd1e = L.marker([-9.12321, 107.819404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1e</div>',
//   }),
// }).addTo(map);

// var flum2 = L.marker([-9.09821, 107.955404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/flum.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BSd2a = L.marker([-9.12321, 107.955404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2a</div>',
//   }),
// }).addTo(map);

// var drain8 = L.marker([-9.07321, 108.095404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BSd2b = L.marker([-9.12321, 108.075404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2b</div>',
//   }),
// }).addTo(map);

// var cuci9 = L.marker([-9.08321, 108.115404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BSd2c = L.marker([-9.12321, 108.115404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2c</div>',
//   }),
// }).addTo(map);

// var lingtem24 = L.marker([-9.09321, 108.155404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem24 = L.polygon(
//   [
//     [-8.98321, 108.155404], //atas
//     [-9.09321, 108.155404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran18 = L.marker([-8.97321, 108.175404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var drain9 = L.marker([-9.07321, 108.235404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BSd2d = L.marker([-9.12321, 108.215404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2d</div>',
//   }),
// }).addTo(map);

// var lingtem25 = L.marker([-9.09321, 108.265404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem25 = L.polygon(
//   [
//     [-8.98321, 108.265404], //atas
//     [-9.09321, 108.265404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran19 = L.marker([-8.97321, 108.280404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var box17 = L.marker([-9.09621, 108.310404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSd2e = L.marker([-9.12321, 108.310404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2e</div>',
//   }),
// }).addTo(map);

// var lingtem26 = L.marker([-9.50321, 107.487404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem26 = L.polygon(
//   [
//     [-9.50321, 107.309404], //kiri
//     [-9.50321, 107.549404], //kanan
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran20 = L.marker([-9.55321, 107.409404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var drain10 = L.marker([-9.75321, 107.487404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
// }).addTo(map);

// var BSIXa = L.marker([-9.77321, 107.409404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.IXa</div>',
//   }),
// }).addTo(map);

// var drop5 = L.marker([-9.97321, 107.569404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 25], // Ukuran icon
//   }),
// }).addTo(map);

// var BSh1a = L.marker([-10.01321, 107.569404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.1a</div>',
//   }),
// }).addTo(map);

// var cuci10 = L.marker([-9.98321, 107.669404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BSh1b = L.marker([-10.01321, 107.669404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.1b</div>',
//   }),
// }).addTo(map);

// var box18 = L.marker([-9.97621, 107.769404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSh1c = L.marker([-10.01321, 107.769404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.1c</div>',
//   }),
// }).addTo(map);

// var check8 = L.marker([-9.97421, 107.957404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSh2a = L.marker([-10.01321, 107.957404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.2a</div>',
//   }),
// }).addTo(map);

// var lingtem28 = L.marker([-9.97321, 108.117404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem28 = L.polygon(
//   [
//     [-9.86321, 108.117404], //atas
//     [-9.97321, 108.117404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran21 = L.marker([-10.02321, 108.110404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var lingtem29 = L.marker([-9.97321, 108.149404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem29 = L.polygon(
//   [
//     [-9.86321, 108.149404], //atas
//     [-9.97321, 108.149404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran22 = L.marker([-10.02321, 108.140404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var lingtem30 = L.marker([-9.97321, 108.179404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem30 = L.polygon(
//   [
//     [-9.86321, 108.179404], //atas
//     [-9.97321, 108.179404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran23 = L.marker([-10.02321, 108.170404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var lingtem31 = L.marker([-9.97321, 108.209404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem31 = L.polygon(
//   [
//     [-9.86321, 108.209404], //atas
//     [-9.97321, 108.209404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran24 = L.marker([-10.02321, 108.200404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var lingtem32 = L.marker([-9.97321, 108.249404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem32 = L.polygon(
//   [
//     [-9.86321, 108.249404], //atas
//     [-9.97321, 108.249404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran25 = L.marker([-10.02321, 108.240404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var box19 = L.marker([-9.97621, 108.300404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BSh2b = L.marker([-10.01321, 108.300404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.2b</div>',
//   }),
// }).addTo(map);

// var cuci11 = L.marker([-7.51321, 107.549404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BCk1a = L.marker([-7.54321, 107.549404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.1a</div>',
//   }),
// }).addTo(map);

// var drop6 = L.marker([-7.52321, 107.602404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 25], // Ukuran icon
//   }),
// }).addTo(map);

// var BCk1b = L.marker([-7.54321, 107.602404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.1b</div>',
//   }),
// }).addTo(map);

// var flum3 = L.marker([-7.52721, 107.792404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/flum.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BCk2a = L.marker([-7.54321, 107.792404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.2a</div>',
//   }),
// }).addTo(map);

// var lingtem30 = L.marker([-7.52321, 107.942404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem30 = L.polygon(
//   [
//     [-7.42321, 107.942404], //atas
//     [-7.52321, 107.942404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran26 = L.marker([-7.56321, 107.940404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var gorong7 = L.marker([-7.48321, 108.084404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 30], // Ukuran icon
//   }),
//   rotationAngle: -90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BCk2b = L.marker([-7.36321, 108.044404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.2b</div>',
//   }),
// }).addTo(map);

// var box20 = L.marker([-7.52621, 108.104404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BCk2c = L.marker([-7.36321, 108.104404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.2c</div>',
//   }),
// }).addTo(map);

// var drop7 = L.marker([-7.61321, 108.227404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 25], // Ukuran icon
//   }),
// }).addTo(map);

// var BLd1a = L.marker([-7.65321, 108.207404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.1a</div>',
//   }),
// }).addTo(map);

// var cuci12 = L.marker([-7.66321, 108.242404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BLd1b = L.marker([-7.72321, 108.207404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.1b</div>',
//   }),
// }).addTo(map);

// var box21 = L.marker([-7.78321, 108.227404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BLd1c = L.marker([-7.81321, 108.207404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.1c</div>',
//   }),
// }).addTo(map);

// var lingtem34 = L.marker([-7.88321, 108.267404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem34 = L.polygon(
//   [
//     [-7.78321, 108.407404], //atas
//     [-7.88321, 108.267404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 0.2,
//   }
// ).addTo(map);

// var oncoran27 = L.marker([-7.84321, 108.427404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-35deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var check9 = L.marker([-8.08321, 108.397404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 50, // Rotate the icon -90 degrees
// }).addTo(map);

// var BLd2a = L.marker([-8.08321, 108.557404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.2a</div>',
//   }),
// }).addTo(map);

// var check10 = L.marker([-8.44321, 108.647404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 50, // Rotate the icon -90 degrees
// }).addTo(map);

// var BLd3a = L.marker([-8.50321, 108.647404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.3a</div>',
//   }),
// }).addTo(map);

// var lingtem35 = L.marker([-8.57321, 108.747404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem35 = L.polygon(
//   [
//     [-8.47321, 108.907404], //atas
//     [-8.57321, 108.747404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 0.2,
//   }
// ).addTo(map);

// var oncoran28 = L.marker([-8.52321, 108.907404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-35deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var box22 = L.marker([-8.66321, 108.797404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 50, // Rotate the icon -90 degrees
// }).addTo(map);

// var BLd3b = L.marker([-8.69321, 109.007404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.3b</div>',
//   }),
// }).addTo(map);

// var check11 = L.marker([-7.52321, 108.312404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BCk3a = L.marker([-7.54321, 108.312404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.3a</div>',
//   }),
// }).addTo(map);

// var cuci13 = L.marker([-7.51321, 108.682404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BCk4a = L.marker([-7.54321, 108.682404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.4a</div>',
//   }),
// }).addTo(map);

// var gorong8 = L.marker([-7.50321, 108.752404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BCk4b = L.marker([-7.54321, 108.740404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.4b</div>',
//   }),
// }).addTo(map);

// var gorong9 = L.marker([-7.50321, 108.882404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BCk4c = L.marker([-7.54321, 108.860404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.4c</div>',
//   }),
// }).addTo(map);

// var gorong10 = L.marker([-7.50321, 109.182404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BCk5a = L.marker([-7.54321, 109.162404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.5a</div>',
//   }),
// }).addTo(map);

// var lingtem36 = L.marker([-7.52321, 109.222404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem36 = L.polygon(
//   [
//     [-7.52321, 109.222404], //atas
//     [-7.68321, 109.222404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran29 = L.marker([-7.56321, 109.202404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var box23 = L.marker([-7.52621, 109.292404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BCk5b = L.marker([-7.54321, 109.292404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.5b</div>',
//   }),
// }).addTo(map);

// var gorong10 = L.marker([-7.50321, 109.482404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BCk6a = L.marker([-7.54321, 109.462404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.6a</div>',
//   }),
// }).addTo(map);

// var cuci14 = L.marker([-7.51321, 109.522404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BCk6b = L.marker([-7.54321, 109.522404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.6b</div>',
//   }),
// }).addTo(map);

// var gorong11 = L.marker([-7.50321, 109.642404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BCk6c = L.marker([-7.54321, 109.622404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.6c</div>',
//   }),
// }).addTo(map);

// var gorong12 = L.marker([-7.50321, 109.822404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BCk7a = L.marker([-7.54321, 109.802404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.7a</div>',
//   }),
// }).addTo(map);

// var pelimpah2 = L.marker([-7.51321, 109.872404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/pelimpah.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BCk7b = L.marker([-7.54321, 109.872404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.7b</div>',
//   }),
// }).addTo(map);

// var box24 = L.marker([-7.52621, 109.922404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BCk7c = L.marker([-7.54321, 109.922404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.7c</div>',
//   }),
// }).addTo(map);

// var drop8 = L.marker([-7.71321, 110.045404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 25], // Ukuran icon
//   }),
// }).addTo(map);

// var BTr1a = L.marker([-7.75321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.1a</div>',
//   }),
// }).addTo(map);

// var lingtem38 = L.marker([-8.22321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
// }).addTo(map);

// var lingtem38 = L.polygon(
//   [
//     [-8.22321, 110.042404], //kiri
//     [-8.22321, 110.222404], //kanan
//   ],
//   {
//     color: 'black',
//     weight: 0.2,
//   }
// ).addTo(map);

// var oncoran30 = L.marker([-8.22321, 110.222404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var cuci15 = L.marker([-8.28321, 110.078404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BTr2a = L.marker([-8.35321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.2a</div>',
//   }),
// }).addTo(map);

// var check12 = L.marker([-8.45321, 110.022404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BTr3a = L.marker([-8.50321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.3a</div>',
//   }),
// }).addTo(map);

// var cuci16 = L.marker([-8.51321, 110.054404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BTr3b = L.marker([-8.57321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.3b</div>',
//   }),
// }).addTo(map);

// var gorong15 = L.marker([-8.60321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var BTr3c = L.marker([-8.64321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.3c</div>',
//   }),
// }).addTo(map);

// var box25 = L.marker([-8.66321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BTr3d = L.marker([-8.70321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.3d</div>',
//   }),
// }).addTo(map);

// var cuci17 = L.marker([-8.70321, 110.054404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BTr3e = L.marker([-8.76321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.3e</div>',
//   }),
// }).addTo(map);

// var check13 = L.marker([-8.90321, 110.022404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BTr4a = L.marker([-8.96321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.4a</div>',
//   }),
// }).addTo(map);

// var gorong16 = L.marker([-8.99321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var BTr4b = L.marker([-9.03321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.4b</div>',
//   }),
// }).addTo(map);

// var box26 = L.marker([-9.06321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BTr4c = L.marker([-9.09321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.4c</div>',
//   }),
// }).addTo(map);

// var box27 = L.marker([-9.32321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BTr5a = L.marker([-9.35321, 110.055404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.5a</div>',
//   }),
// }).addTo(map);

// var check13 = L.marker([-9.54321, 110.022404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 90, // Rotate the icon -90 degrees
// }).addTo(map);

// var BTr6a = L.marker([-9.60321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.6a</div>',
//   }),
// }).addTo(map);

// var gorong17 = L.marker([-9.63321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var BTr6b = L.marker([-9.67321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.6b</div>',
//   }),
// }).addTo(map);

// var gorong19 = L.marker([-9.72321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var BTr6c = L.marker([-9.76321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.6c</div>',
//   }),
// }).addTo(map);

// var box28 = L.marker([-9.81321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BTr6d = L.marker([-9.85321, 110.225404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BTr.6d</div>',
//   }),
// }).addTo(map);

// var lingtem39 = L.marker([-9.88321, 110.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
// }).addTo(map);

// var lingtem39 = L.polygon(
//   [
//     [-9.88321, 110.042404], //kiri
//     [-9.88321, 110.222404], //kanan
//   ],
//   {
//     color: 'black',
//     weight: 0.2,
//   }
// ).addTo(map);

// var oncoran31 = L.marker([-9.88321, 110.222404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var check14 = L.marker([-7.52321, 110.142404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [15, 15], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BCk8a = L.marker([-7.38321, 110.142404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.8a</div>',
//   }),
// }).addTo(map);

// var lingtem40 = L.marker([-7.52321, 110.282404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem40 = L.polygon(
//   [
//     [-7.52321, 110.282404], //atas
//     [-7.68321, 110.282404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran32 = L.marker([-7.56321, 110.262404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var lingtem41 = L.marker([-7.52321, 110.362404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [10, 10], // Ukuran icon
//   }),
//   rotationAngle: 0,
// }).addTo(map);

// var lingtem41 = L.polygon(
//   [
//     [-7.52321, 110.362404], //atas
//     [-7.68321, 110.362404], //bawah
//   ],
//   {
//     color: 'black',
//     weight: 1,
//   }
// ).addTo(map);

// var oncoran33 = L.marker([-7.56321, 110.342404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
//   }),
// }).addTo(map);

// var box29 = L.marker([-7.52621, 110.442404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BCk8b = L.marker([-7.54321, 110.442404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.8b</div>',
//   }),
// }).addTo(map);

// var gorong20 = L.marker([-7.50321, 110.602404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BCk9a = L.marker([-7.54321, 110.582404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.9a</div>',
//   }),
// }).addTo(map);

// var gorong21 = L.marker([-7.50321, 110.702404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 15], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BCk9b = L.marker([-7.54321, 110.682404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.9b</div>',
//   }),
// }).addTo(map);

// var cuci18 = L.marker([-7.51321, 110.752404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
// }).addTo(map);

// var BCk9c = L.marker([-7.54321, 110.752404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.9c</div>',
//   }),
// }).addTo(map);

// var box30 = L.marker([-7.52621, 110.882404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: 0, // Rotate the icon -90 degrees
// }).addTo(map);

// var BCk9d = L.marker([-7.54321, 110.882404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.9d</div>',
//   }),
// }).addTo(map);

// var drop9 = L.marker([-7.71321, 111.022404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [30, 25], // Ukuran icon
//   }),
// }).addTo(map);

// var BDt1a = L.marker([-7.75321, 111.205404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BDt.1a</div>',
//   }),
// }).addTo(map);

// var cuci19 = L.marker([-7.80321, 111.042404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [20, 20], // Ukuran icon
//   }),
//   rotationAngle: -90,
// }).addTo(map);

// var BDt1b = L.marker([-7.86821, 111.205404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BDt.1b</div>',
//   }),
// }).addTo(map);