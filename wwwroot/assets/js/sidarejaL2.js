// Inisialisasi peta
var map = L.map('mapSidarejaL2').setView([-7.73, 108.817404], 9);

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
    [-10.82321, 107.487404], //bawah
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
    [-3.96889, 107.789404], //atas
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

//{garis sidareja 1}
// garis pertama
var oncoran = L.marker([-7.08321, 107.457404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

// var oncoran1 = L.marker([-7.02321, 107.899404], {
//   icon: L.divIcon({
//     className: 'text-label',
//     iconSize: [100, 40],
//     html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">A=7878 Ha<br>Q=11.753 m3/s<br>L=1615.05 m</div>',
//   }),
// }).addTo(map);

var drain = L.marker([-6.92321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
}).addTo(map);

var BSVIa = L.marker([-6.94321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIa</div>',
  }),
}).addTo(map);

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

var drop = L.marker([-6.76321, 107.789404], {
  icon: L.icon({
    iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 25], // Ukuran icon
  }),
}).addTo(map);

var BKd1a = L.marker([-6.77821, 107.789404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 1a</div>',
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

// var kotak = L.marker([-6.99921, 107.979404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
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

var flum = L.marker([-6.76621, 108.029404], {
  icon: L.icon({
    iconUrl: '/assets/img/flum.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 20], // Ukuran icon
  }),
}).addTo(map);

var BKd2a = L.marker([-6.77821, 108.029404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 2a</div>',
  }),
}).addTo(map);

var cuci = L.marker([-6.75621, 108.079404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BKd2b = L.marker([-6.77821, 108.079404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 2b</div>',
  }),
}).addTo(map);

var gorong = L.marker([-6.73621, 108.169404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: -90, // Rotate the icon -90 degrees
}).addTo(map);

var BKd2c = L.marker([-6.77821, 108.142404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 2c</div>',
  }),
}).addTo(map);

var gorong1 = L.marker([-6.73621, 108.249404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: -90, // Rotate the icon -90 degrees
}).addTo(map);

var BKd2d = L.marker([-6.77821, 108.222404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 2d</div>',
  }),
}).addTo(map);

var lingtem1 = L.marker([-6.76321, 108.269404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem1 = L.polygon(
  [
    [-6.66321, 108.269404], //atas
    [-6.76321, 108.269404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran2 = L.marker([-6.78821, 108.269404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var box = L.marker([-6.76521, 108.319404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKd2e = L.marker([-6.77821, 108.319404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 2e</div>',
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

var BKd2 = L.marker([-6.76821, 108.432404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd.2</div>',
  }),
}).addTo(map);

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

var lingtem2 = L.marker([-6.76321, 108.569404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem2 = L.polygon(
  [
    [-6.66321, 108.569404], //atas
    [-6.76321, 108.569404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var cuci1 = L.marker([-6.75621, 108.659404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BKd3a = L.marker([-6.77821, 108.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 3a</div>',
  }),
}).addTo(map);

var gorong2 = L.marker([-6.73621, 108.739404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: -90, // Rotate the icon -90 degrees
}).addTo(map);

var BKd3b = L.marker([-6.77821, 108.714404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 3b</div>',
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

// var kotak3 = L.marker([-6.53921, 108.784404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BKd3 = L.marker([-6.76821, 108.784404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd.3</div>',
  }),
}).addTo(map);

var check = L.marker([-6.76301, 108.834404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKd4a = L.marker([-6.77821, 108.834404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 4a</div>',
  }),
}).addTo(map);

var cuci2 = L.marker([-6.75621, 108.884404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BKd4b = L.marker([-6.77821, 108.884404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 4b</div>',
  }),
}).addTo(map);

var box1 = L.marker([-6.76521, 108.964404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKd4c = L.marker([-6.77821, 108.964404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 4c</div>',
  }),
}).addTo(map);

var gorong3 = L.marker([-6.73621, 109.084404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: -90, // Rotate the icon -90 degrees
}).addTo(map);

var BKd4d = L.marker([-6.77821, 109.061404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 4d</div>',
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

// var kotak4 = L.marker([-6.53921, 109.131404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BKd4 = L.marker([-6.77821, 109.131404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 4</div>',
  }),
}).addTo(map);

var check1 = L.marker([-6.76301, 109.183404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKd5a = L.marker([-6.77821, 109.183404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5a</div>',
  }),
}).addTo(map);

var box2 = L.marker([-6.76521, 109.234404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKd5b = L.marker([-6.77821, 109.234404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5b</div>',
  }),
}).addTo(map);

var gorong4 = L.marker([-6.73621, 109.344404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: -90, // Rotate the icon -90 degrees
}).addTo(map);

var BKd5c = L.marker([-6.77821, 109.321404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5c</div>',
  }),
}).addTo(map);

var cuci3 = L.marker([-6.76621, 109.395404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BKd5d = L.marker([-6.77821, 109.395404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5d</div>',
  }),
}).addTo(map);

var pelimpah = L.marker([-6.71621, 109.444404], {
  icon: L.icon({
    iconUrl: '/assets/img/pelimpah.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: -180, // Rotate the icon -90 degrees
}).addTo(map);

var BKd5e = L.marker([-6.77821, 109.444404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5e</div>',
  }),
}).addTo(map);

var gorong5 = L.marker([-6.73621, 109.514404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: -90, // Rotate the icon -90 degrees
}).addTo(map);

var BKd5f = L.marker([-6.77821, 109.494404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5f</div>',
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

// var kotak5 = L.marker([-6.53921, 109.534404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BKd5 = L.marker([-6.77821, 109.534404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 5</div>',
  }),
}).addTo(map);

var check2 = L.marker([-6.76301, 109.574404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKd6a = L.marker([-6.77821, 109.574404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 6a</div>',
  }),
}).addTo(map);

var cuci4 = L.marker([-6.76621, 109.644404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BKd6b = L.marker([-6.77821, 109.644404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 6b</div>',
  }),
}).addTo(map);

var box3 = L.marker([-6.76521, 109.724404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKd6c = L.marker([-6.77821, 109.724404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 6c</div>',
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

// var kotak6 = L.marker([-6.53921, 109.884404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BKd6 = L.marker([-6.77821, 109.884404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 6</div>',
  }),
}).addTo(map);

var check3 = L.marker([-6.76301, 109.934404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKd7a = L.marker([-6.77821, 109.934404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 7a</div>',
  }),
}).addTo(map);

var cuci5 = L.marker([-6.76621, 109.994404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BKd7b = L.marker([-6.77821, 109.994404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 7b</div>',
  }),
}).addTo(map);

var box4 = L.marker([-6.76521, 110.124404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKd7c = L.marker([-6.77821, 110.124404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd. 7c</div>',
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

// var kotak7 = L.marker([-6.99921, 110.194404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var lingtem3 = L.marker([-6.76321, 110.314404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem3 = L.polygon(
  [
    [-6.66321, 110.314404], //atas
    [-6.76321, 110.314404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran3 = L.marker([-6.63321, 110.294404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
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

var BKd8 = L.marker([-6.76821, 110.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKd.8</div>',
  }),
}).addTo(map);

var drain1 = L.marker([-6.64321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
}).addTo(map);

var BSVb = L.marker([-6.66321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Vb</div>',
  }),
}).addTo(map);

var drain2 = L.marker([-6.54321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
}).addTo(map);

var BSVa = L.marker([-6.56321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Va</div>',
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

// var kotak10 = L.marker([-6.40321, 108.029404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BSIV = L.marker([-6.42321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.IV</div>',
  }),
}).addTo(map);

var drain3 = L.marker([-6.23321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
}).addTo(map);

var BSVIa = L.marker([-6.25321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIa</div>',
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

var box5 = L.marker([-5.90451, 107.789404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BRm1a = L.marker([-5.92821, 107.789404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm. 1a</div>',
  }),
}).addTo(map);

var drop1 = L.marker([-5.90251, 107.859404], {
  icon: L.icon({
    iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 25], // Ukuran icon
  }),
}).addTo(map);

var BRm1b = L.marker([-5.92821, 107.859404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm. 1b</div>',
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

var BRm1 = L.marker([-5.90321, 107.969404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.1</div>',
  }),
}).addTo(map);

var flum1 = L.marker([-5.90821, 108.049404], {
  icon: L.icon({
    iconUrl: '/assets/img/flum.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 20], // Ukuran icon
  }),
}).addTo(map);

var BRm2a = L.marker([-5.92821, 108.049404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.2a</div>',
  }),
}).addTo(map);

var cuci6 = L.marker([-5.89521, 108.179404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BRm2b = L.marker([-5.92821, 108.179404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.2b</div>',
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

// var kotak13 = L.marker([-6.15321, 108.339404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BRm2 = L.marker([-5.90321, 108.369404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.2</div>',
  }),
}).addTo(map);

var gorong6 = L.marker([-5.87521, 108.464404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: -90, // Rotate the icon -90 degrees
}).addTo(map);

var BRm3a = L.marker([-5.92821, 108.434404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.3a</div>',
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

// var kotak14 = L.marker([-5.67321, 108.589404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BRm3 = L.marker([-5.92821, 108.589404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.3</div>',
  }),
}).addTo(map);

var check4 = L.marker([-5.90321, 108.634404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BRm4a = L.marker([-5.92821, 108.624404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.4a</div>',
  }),
}).addTo(map);

var cuci6 = L.marker([-5.89521, 108.684404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BRm4b = L.marker([-5.92821, 108.678404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.4b</div>',
  }),
}).addTo(map);

var pelimpah1 = L.marker([-5.85521, 108.724404], {
  icon: L.icon({
    iconUrl: '/assets/img/pelimpah.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: -180, // Rotate the icon -90 degrees
}).addTo(map);

var BRm4c = L.marker([-5.92821, 108.724404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.4c</div>',
  }),
}).addTo(map);

var box6 = L.marker([-5.90451, 108.794404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BRm4d = L.marker([-5.92821, 108.789404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.4d</div>',
  }),
}).addTo(map);

var lingtem5 = L.marker([-5.90451, 108.839404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem5 = L.polygon(
  [
    [-5.90451, 108.839404], //atas
    [-6.01321, 108.839404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran4 = L.marker([-5.92821, 108.821404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var box7 = L.marker([-5.90451, 108.879404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BRm4e = L.marker([-5.92821, 108.879404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm. 4e</div>',
  }),
}).addTo(map);

var lingtem6 = L.marker([-5.90451, 108.949404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem6 = L.polygon(
  [
    [-5.90451, 108.949404], //atas
    [-6.01321, 108.949404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran5 = L.marker([-5.92821, 108.932404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var lingtem7 = L.marker([-5.90451, 109.019404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem7 = L.polygon(
  [
    [-5.90451, 109.019404], //atas
    [-6.01321, 109.019404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran6 = L.marker([-5.92821, 109.006404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var lingtem8 = L.marker([-5.90451, 109.089404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem8 = L.polygon(
  [
    [-5.90451, 109.089404], //atas
    [-6.01321, 109.089404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran7 = L.marker([-5.92821, 109.073404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var box8 = L.marker([-5.90451, 109.129404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BRm4f = L.marker([-5.92821, 109.129404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm. 4f</div>',
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

// var kotak15 = L.marker([-5.67321, 109.169404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BRm4 = L.marker([-5.92821, 109.169404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.4</div>',
  }),
}).addTo(map);

var check5 = L.marker([-5.90321, 109.209404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BRm5a = L.marker([-5.92821, 109.205404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.5a</div>',
  }),
}).addTo(map);

var cuci7 = L.marker([-5.90521, 109.325404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BRm5b = L.marker([-5.92821, 109.325404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.5b</div>',
  }),
}).addTo(map);

var box9 = L.marker([-5.90451, 109.425404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BRm5c = L.marker([-5.92821, 109.425404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.5c</div>',
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

var BRm5 = L.marker([-5.90321, 109.559404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BRm.5</div>',
  }),
}).addTo(map);

var box10 = L.marker([-5.55451, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BSIIIa = L.marker([-5.57451, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.IIIa</div>',
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

var drop2 = L.marker([-5.20321, 107.839404], {
  icon: L.icon({
    iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 25], // Ukuran icon
  }),
}).addTo(map);

var BKs1a = L.marker([-5.22321, 107.839404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKs.1a</div>',
  }),
}).addTo(map);

var lingtem10 = L.marker([-5.20321, 107.909404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem10 = L.polygon(
  [
    [-5.20321, 107.909404], //atas
    [-5.30321, 107.909404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran8 = L.marker([-5.22321, 107.892404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var box11 = L.marker([-5.20421, 107.979404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKs1b = L.marker([-5.22321, 107.979404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKs.1b</div>',
  }),
}).addTo(map);

var check6 = L.marker([-5.20121, 108.129404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKs2a = L.marker([-5.22321, 108.129404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKs.2a</div>',
  }),
}).addTo(map);

var lingtem11 = L.marker([-5.20321, 108.209404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem11 = L.polygon(
  [
    [-5.20321, 108.209404], //atas
    [-5.30321, 108.209404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran9 = L.marker([-5.22321, 108.189404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var lingtem12 = L.marker([-5.20321, 108.299404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem12 = L.polygon(
  [
    [-5.20321, 108.299404], //atas
    [-5.30321, 108.299404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran10 = L.marker([-5.22321, 108.282404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var lingtem13 = L.marker([-5.20321, 108.399404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem13 = L.polygon(
  [
    [-5.20321, 108.399404], //atas
    [-5.30321, 108.399404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran11 = L.marker([-5.22321, 108.381404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var box12 = L.marker([-5.20421, 108.521404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BKs2b = L.marker([-5.22321, 108.521404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKs.2b</div>',
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

// var kotak18 = L.marker([-4.96321, 108.069404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

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

// var kotak19 = L.marker([-4.96321, 108.609404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BKs2 = L.marker([-5.22321, 108.609404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BKs.2</div>',
  }),
}).addTo(map);

var drain4 = L.marker([-4.98321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
}).addTo(map);

var BSIIb = L.marker([-5.00321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.IIb</div>',
  }),
}).addTo(map);

var lingtem14 = L.marker([-4.88321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem14 = L.polygon(
  [
    [-4.88321, 107.499404], //kiri
    [-4.88321, 107.823404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var drain5 = L.marker([-4.78321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
}).addTo(map);

var BSIIa = L.marker([-4.80321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.IIa</div>',
  }),
}).addTo(map);

var lingtem15 = L.marker([-4.68321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem15 = L.polygon(
  [
    [-4.68321, 107.499404], //kiri
    [-4.68321, 107.823404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran12 = L.polygon(
  [
    [-4.68321, 107.499404], //atas
    [-5.05321, 107.499404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran12 = L.marker([-4.89321, 107.469404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
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

// var kotak20 = L.marker([-4.50321, 108.029404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BSI = L.marker([-4.52321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.I</div>',
  }),
}).addTo(map);

var drop3 = L.marker([-4.30321, 107.709804], {
  icon: L.icon({
    iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 25], // Ukuran icon
  }),
}).addTo(map);

var BSId = L.marker([-4.32321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Id</div>',
  }),
}).addTo(map);

var gorong6 = L.marker([-4.25321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BSIc = L.marker([-4.27321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Ic</div>',
  }),
}).addTo(map);

var box13 = L.marker([-4.20321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BSIb = L.marker([-4.22321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Ib</div>',
  }),
}).addTo(map);

var lingtih18 = L.marker([-4.15321, 107.709804], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtih.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BSIa = L.marker([-4.17321, 107.659404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.Ia</div>',
  }),
}).addTo(map);

var lingtem16 = L.marker([-4.11321, 107.709404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem16 = L.polygon(
  [
    [-4.11321, 107.599404], //kiri
    [-4.11321, 107.709404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var BSO = L.marker([-4.13321, 107.909404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.O</div>',
  }),
}).addTo(map);

//{garis sidareja 2}
var lingtem17 = L.marker([-7.32321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem17 = L.polygon(
  [
    [-7.32321, 107.309404], //kiri
    [-7.32321, 107.549404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtem17 = L.polygon(
  [
    [-7.32321, 107.309404], //atas
    [-7.48321, 107.309404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran13 = L.marker([-7.32321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var check7 = L.marker([-7.63321, 107.469404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 90, // Rotate the icon -90 degrees
}).addTo(map);

var BSVIIa = L.marker([-7.67321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIIa</div>',
  }),
}).addTo(map);

var box14 = L.marker([-7.75321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BSVIIb = L.marker([-7.77321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIIb</div>',
  }),
}).addTo(map);

var lingtem19 = L.marker([-7.88321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var lingtem19 = L.polygon(
  [
    [-7.88321, 107.309404], //kiri
    [-7.88321, 107.549404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtem19 = L.polygon(
  [
    [-7.88321, 107.309404], //atas
    [-8.04321, 107.309404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran14 = L.marker([-7.88321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
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

// var kotak21 = L.marker([-8.22321, 107.789404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BSVII = L.marker([-8.24321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VII</div>',
  }),
}).addTo(map);

var lingtem20 = L.marker([-8.42321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem20 = L.polygon(
  [
    [-8.42321, 107.309404], //kiri
    [-8.42321, 107.549404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var lingtem20 = L.polygon(
  [
    [-8.42321, 107.309404], //atas
    [-8.58321, 107.309404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran15 = L.marker([-8.42321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var drain5 = L.marker([-8.52321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
}).addTo(map);

var BSVIIIa = L.marker([-8.52321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIIIa</div>',
  }),
}).addTo(map);

var lingtem21 = L.marker([-8.74321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem21 = L.polygon(
  [
    [-8.74321, 107.309404], //kiri
    [-8.74321, 107.549404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran16 = L.marker([-8.79321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var drain6 = L.marker([-8.86321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
}).addTo(map);

var BSVIIIb = L.marker([-8.88321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.VIIIb</div>',
  }),
}).addTo(map);

var lingtem22 = L.marker([-8.90321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem22 = L.polygon(
  [
    [-8.90321, 107.309404], //kiri
    [-8.90321, 107.549404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran17 = L.marker([-8.95321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
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

var drop4 = L.marker([-9.09321, 107.569404], {
  icon: L.icon({
    iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 25], // Ukuran icon
  }),
}).addTo(map);

var BSd1a = L.marker([-9.12321, 107.569404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1a</div>',
  }),
}).addTo(map);

var drain7 = L.marker([-9.07321, 107.639404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
  rotationAngle: -90,
}).addTo(map);

var BSd1b = L.marker([-9.12321, 107.619404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1b</div>',
  }),
}).addTo(map);

var cuci8 = L.marker([-9.08321, 107.689404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BSd1c = L.marker([-9.12321, 107.689404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1c</div>',
  }),
}).addTo(map);

var box15 = L.marker([-9.09621, 107.749404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BSd1d = L.marker([-9.12321, 107.749404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1d</div>',
  }),
}).addTo(map);

var box16 = L.marker([-9.09621, 107.819404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BSd1e = L.marker([-9.12321, 107.819404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1e</div>',
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

var BSd1 = L.marker([-9.09321, 107.915404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.1</div>',
  }),
}).addTo(map);

var flum2 = L.marker([-9.09821, 107.955404], {
  icon: L.icon({
    iconUrl: '/assets/img/flum.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 20], // Ukuran icon
  }),
}).addTo(map);

var BSd2a = L.marker([-9.12321, 107.955404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2a</div>',
  }),
}).addTo(map);

var drain8 = L.marker([-9.07321, 108.095404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
  rotationAngle: -90,
}).addTo(map);

var BSd2b = L.marker([-9.12321, 108.075404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2b</div>',
  }),
}).addTo(map);

var cuci9 = L.marker([-9.08321, 108.115404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BSd2c = L.marker([-9.12321, 108.115404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2c</div>',
  }),
}).addTo(map);

var lingtem24 = L.marker([-9.09321, 108.155404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem24 = L.polygon(
  [
    [-8.98321, 108.155404], //atas
    [-9.09321, 108.155404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran18 = L.marker([-8.97321, 108.175404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var drain9 = L.marker([-9.07321, 108.235404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
  rotationAngle: -90,
}).addTo(map);

var BSd2d = L.marker([-9.12321, 108.215404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2d</div>',
  }),
}).addTo(map);

var lingtem25 = L.marker([-9.09321, 108.265404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem25 = L.polygon(
  [
    [-8.98321, 108.265404], //atas
    [-9.09321, 108.265404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran19 = L.marker([-8.97321, 108.280404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var box17 = L.marker([-9.09621, 108.310404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BSd2e = L.marker([-9.12321, 108.310404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2e</div>',
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

// var kotak24 = L.marker([-9.09321, 108.569404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

var BSd2 = L.marker([-9.09321, 108.349404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSd.2</div>',
  }),
}).addTo(map);

var lingtem26 = L.marker([-9.50321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem26 = L.polygon(
  [
    [-9.50321, 107.309404], //kiri
    [-9.50321, 107.549404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran20 = L.marker([-9.55321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var drain10 = L.marker([-9.75321, 107.487404], {
  icon: L.icon({
    iconUrl: '/assets/img/drain.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
}).addTo(map);

var BSIXa = L.marker([-9.77321, 107.409404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">BS.IXa</div>',
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

var drop5 = L.marker([-9.97321, 107.569404], {
  icon: L.icon({
    iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 25], // Ukuran icon
  }),
}).addTo(map);

var BSh1a = L.marker([-10.01321, 107.569404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.1a</div>',
  }),
}).addTo(map);

var cuci10 = L.marker([-9.98321, 107.669404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BSh1b = L.marker([-10.01321, 107.669404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.1b</div>',
  }),
}).addTo(map);

var box18 = L.marker([-9.97621, 107.769404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BSh1c = L.marker([-10.01321, 107.769404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.1c</div>',
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

var BSh1 = L.marker([-9.97321, 107.914404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.1</div>',
  }),
}).addTo(map);

var check8 = L.marker([-9.97421, 107.957404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BSh2a = L.marker([-10.01321, 107.957404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.2a</div>',
  }),
}).addTo(map);

var lingtem28 = L.marker([-9.97321, 108.117404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem28 = L.polygon(
  [
    [-9.86321, 108.117404], //atas
    [-9.97321, 108.117404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran21 = L.marker([-10.02321, 108.110404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var lingtem29 = L.marker([-9.97321, 108.149404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem29 = L.polygon(
  [
    [-9.86321, 108.149404], //atas
    [-9.97321, 108.149404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran22 = L.marker([-10.02321, 108.140404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var lingtem30 = L.marker([-9.97321, 108.179404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem30 = L.polygon(
  [
    [-9.86321, 108.179404], //atas
    [-9.97321, 108.179404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran23 = L.marker([-10.02321, 108.170404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var lingtem31 = L.marker([-9.97321, 108.209404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem31 = L.polygon(
  [
    [-9.86321, 108.209404], //atas
    [-9.97321, 108.209404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran24 = L.marker([-10.02321, 108.200404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var lingtem32 = L.marker([-9.97321, 108.249404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem32 = L.polygon(
  [
    [-9.86321, 108.249404], //atas
    [-9.97321, 108.249404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran25 = L.marker([-10.02321, 108.240404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var box19 = L.marker([-9.97621, 108.300404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BSh2b = L.marker([-10.01321, 108.300404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BSh.2b</div>',
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

// var kotak27 = L.marker([-9.97321, 108.569404], {
//   icon: L.icon({
//     iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
//     iconSize: [150, 100], // Ukuran icon
//   }),
// }).addTo(map);

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
    [-7.52321, 110.429404], //kanan
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

var cuci11 = L.marker([-7.51321, 107.549404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BCk1a = L.marker([-7.54321, 107.549404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.1a</div>',
  }),
}).addTo(map);

var drop6 = L.marker([-7.52321, 107.602404], {
  icon: L.icon({
    iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 25], // Ukuran icon
  }),
}).addTo(map);

var BCk1b = L.marker([-7.54321, 107.602404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.1b</div>',
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

var kotak28 = L.marker([-7.30321, 107.722404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var kotak29 = L.marker([-7.77321, 107.722404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var BCk1 = L.marker([-7.51321, 107.752404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.1</div>',
  }),
}).addTo(map);

var flum3 = L.marker([-7.52721, 107.792404], {
  icon: L.icon({
    iconUrl: '/assets/img/flum.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 20], // Ukuran icon
  }),
}).addTo(map);

var BCk2a = L.marker([-7.54321, 107.792404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.2a</div>',
  }),
}).addTo(map);

var lingtem30 = L.marker([-7.52321, 107.942404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem30 = L.polygon(
  [
    [-7.42321, 107.942404], //atas
    [-7.52321, 107.942404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran26 = L.marker([-7.56321, 107.940404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var gorong7 = L.marker([-7.48321, 108.084404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 30], // Ukuran icon
  }),
  rotationAngle: -90, // Rotate the icon -90 degrees
}).addTo(map);

var BCk2b = L.marker([-7.36321, 108.044404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.2b</div>',
  }),
}).addTo(map);

var box20 = L.marker([-7.52621, 108.104404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BCk2c = L.marker([-7.36321, 108.104404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.2c</div>',
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

var drop7 = L.marker([-7.61321, 108.227404], {
  icon: L.icon({
    iconUrl: '/assets/img/drop.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 25], // Ukuran icon
  }),
}).addTo(map);

var BLd1a = L.marker([-7.65321, 108.207404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.1a</div>',
  }),
}).addTo(map);

var cuci12 = L.marker([-7.66321, 108.242404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: -90,
}).addTo(map);

var BLd1b = L.marker([-7.72321, 108.207404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.1b</div>',
  }),
}).addTo(map);

var box21 = L.marker([-7.78321, 108.227404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BLd1c = L.marker([-7.81321, 108.207404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.1c</div>',
  }),
}).addTo(map);

var lingtem34 = L.marker([-7.88321, 108.267404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem34 = L.polygon(
  [
    [-7.78321, 108.407404], //atas
    [-7.88321, 108.267404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran27 = L.marker([-7.84321, 108.427404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-35deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
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
    weight: 1,
  }
).addTo(map);

var lingtih25 = L.polygon(
  [
    [-7.98321, 108.337404], //kiri
    [-7.92321, 108.537404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var kotak30 = L.marker([-8.02321, 107.987404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var kotak31 = L.marker([-7.97321, 108.677404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var BLd1 = L.marker([-8.08321, 108.357404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.1c</div>',
  }),
}).addTo(map);

var check9 = L.marker([-8.08321, 108.397404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 50, // Rotate the icon -90 degrees
}).addTo(map);

var BLd2a = L.marker([-8.08321, 108.557404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.2a</div>',
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
    weight: 1,
  }
).addTo(map);

var lingtih26 = L.polygon(
  [
    [-8.40321, 108.632404], //kiri
    [-8.34321, 108.822404], //kanan
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var kotak32 = L.marker([-8.44321, 108.287404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var kotak33 = L.marker([-8.34321, 108.962404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var BLd2 = L.marker([-8.39321, 108.782404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.2</div>',
  }),
}).addTo(map);

var check10 = L.marker([-8.44321, 108.647404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 50, // Rotate the icon -90 degrees
}).addTo(map);

var BLd3a = L.marker([-8.50321, 108.647404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.3a</div>',
  }),
}).addTo(map);

var lingtem35 = L.marker([-8.57321, 108.747404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem35 = L.polygon(
  [
    [-8.47321, 108.907404], //atas
    [-8.57321, 108.747404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran28 = L.marker([-8.52321, 108.907404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-35deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var box22 = L.marker([-8.66321, 108.797404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 50, // Rotate the icon -90 degrees
}).addTo(map);

var BLd3b = L.marker([-8.69321, 109.007404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.3b</div>',
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
    weight: 0.3,
  }
).addTo(map);

var kotak34 = L.marker([-8.90321, 108.909404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var BLd3 = L.marker([-8.77321, 109.042404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BLd.3</div>',
  }),
}).addTo(map);

var check11 = L.marker([-7.52321, 108.312404], {
  icon: L.icon({
    iconUrl: '/assets/img/check.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [15, 15], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BCk3a = L.marker([-7.54321, 108.312404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.3a</div>',
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

var kotak35 = L.marker([-7.77321, 108.632404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var BCk3 = L.marker([-7.51321, 108.612404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.3</div>',
  }),
}).addTo(map);

var cuci13 = L.marker([-7.51321, 108.682404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BCk4a = L.marker([-7.54321, 108.682404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.4a</div>',
  }),
}).addTo(map);

var gorong8 = L.marker([-7.50321, 108.752404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
  rotationAngle: -90,
}).addTo(map);

var BCk4b = L.marker([-7.54321, 108.740404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.4b</div>',
  }),
}).addTo(map);

var gorong9 = L.marker([-7.50321, 108.882404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
  rotationAngle: -90,
}).addTo(map);

var BCk4c = L.marker([-7.54321, 108.860404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.4c</div>',
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

var kotak35 = L.marker([-7.77321, 108.952404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var BCk4 = L.marker([-7.51321, 108.932404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.4</div>',
  }),
}).addTo(map);

var gorong10 = L.marker([-7.50321, 109.182404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
  rotationAngle: -90,
}).addTo(map);

var BCk5a = L.marker([-7.54321, 109.162404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.5a</div>',
  }),
}).addTo(map);

var lingtem36 = L.marker([-7.52321, 109.222404], {
  icon: L.icon({
    iconUrl: '/assets/img/lingtem.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [10, 10], // Ukuran icon
  }),
  rotationAngle: 0,
}).addTo(map);

var lingtem36 = L.polygon(
  [
    [-7.52321, 109.222404], //atas
    [-7.68321, 109.222404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var oncoran29 = L.marker([-7.56321, 109.202404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">Oncoran</div>',
  }),
}).addTo(map);

var box23 = L.marker([-7.52621, 109.292404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BCk5b = L.marker([-7.54321, 109.292404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.5b</div>',
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

var kotak36 = L.marker([-7.77321, 109.382404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var BCk5 = L.marker([-7.51321, 109.362404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.5</div>',
  }),
}).addTo(map);

var gorong10 = L.marker([-7.50321, 109.482404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
  rotationAngle: -90,
}).addTo(map);

var BCk6a = L.marker([-7.54321, 109.462404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.6a</div>',
  }),
}).addTo(map);

var cuci14 = L.marker([-7.51321, 109.522404], {
  icon: L.icon({
    iconUrl: '/assets/img/cuci.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
}).addTo(map);

var BCk6b = L.marker([-7.54321, 109.522404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.6b</div>',
  }),
}).addTo(map);

var gorong11 = L.marker([-7.50321, 109.642404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
  rotationAngle: -90,
}).addTo(map);

var BCk6c = L.marker([-7.54321, 109.622404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.6c</div>',
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

var kotak37 = L.marker([-7.77321, 109.722404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var BCk6 = L.marker([-7.51321, 109.702404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.6</div>',
  }),
}).addTo(map);

var gorong12 = L.marker([-7.50321, 109.822404], {
  icon: L.icon({
    iconUrl: '/assets/img/gorong.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [30, 15], // Ukuran icon
  }),
  rotationAngle: -90,
}).addTo(map);

var BCk7a = L.marker([-7.54321, 109.802404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.7a</div>',
  }),
}).addTo(map);

var pelimpah2 = L.marker([-7.51321, 109.872404], {
  icon: L.icon({
    iconUrl: '/assets/img/pelimpah.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BCk7b = L.marker([-7.54321, 109.872404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.7b</div>',
  }),
}).addTo(map);

var box24 = L.marker([-7.52621, 109.922404], {
  icon: L.icon({
    iconUrl: '/assets/img/box.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [20, 20], // Ukuran icon
  }),
  rotationAngle: 0, // Rotate the icon -90 degrees
}).addTo(map);

var BCk7c = L.marker([-7.54321, 109.922404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.7c</div>',
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
    [-9.62321, 110.042404], //bawah
  ],
  {
    color: 'black',
    weight: 1,
  }
).addTo(map);

var kotak38 = L.marker([-7.30321, 110.042404], {
  icon: L.icon({
    iconUrl: '/assets/img/kotak.png', // Ganti dengan path atau URL icon yang sesuai
    iconSize: [150, 100], // Ukuran icon
  }),
}).addTo(map);

var BCk7 = L.marker([-7.54321, 110.022404], {
  icon: L.divIcon({
    className: 'text-label',
    iconSize: [100, 40],
    html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 10px; white-space: nowrap;">BCk.7</div>',
  }),
}).addTo(map);
