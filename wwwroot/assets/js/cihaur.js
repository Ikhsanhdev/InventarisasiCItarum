var mapSkema;
$(document).ready(function() {
  // Inisialisasi peta
  mapSkema = L.map('mapCihaur').setView([-6.23, 108.817404], 9);

  // Tambahkan tile layer OSM
  var tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: `&copy;${new Date().getFullYear()} - BBWS Citanduy - Higertech`,
    subdomains: ['a', 'b', 'c', 'd']
  },  { position: 'topright' }).addTo(mapSkema);

  mapSkema.attributionControl.setPrefix(false);

  tileLayer.setOpacity(0);

  // Tambahkan control untuk legenda
  var legendControl = L.control({ position: 'bottomright' });

  legendControl.onAdd = function (mapSkema) {
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
              <td><img src="/assets/img/lingx.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
              <td>7 KWH Belum Terbayar</td>
            </tr>
            <tr>
              <td><img src="/assets/img/ling.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
              <td>13 KWH Terbayar</td>
            </tr>
            <tr>
              <td><img src="/assets/img/perpan.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
              <td>20 KWH Terpasang</td>
            </tr>
            <tr>
              <td><img src="/assets/img/on.png" style="width: 20px; height: 20px; margin-right: 5px;"></td>
              <td>20 KWH</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    return div;
  };

  // <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
  // <thead>
  //   <tr>
  //     <th style="border: 1px solid #ccc; text-align: center;">NAMA SAL</th>
  //     <th style="border: 1px solid #ccc; text-align: center;">JUMLAH</th>
  //     <th style="border: 1px solid #ccc; text-align: center;">ON</th>
  //     <th style="border: 1px solid #ccc; text-align: center;">OFF</th>
  //   </tr>
  // </thead>
  // <tbody>
  //   <tr>
  //     <td style="border: 1px solid #ccc;">1. BCH</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">15</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">15</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">0</td>
  //   </tr>
  //   <tr>
  //     <td style="border: 1px solid #ccc;">2. BSR</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">5</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">5</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">0</td>
  //   </tr>
  //   <tr>
  //     <td style="border: 1px solid #ccc;">3. BKC</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">2</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">2</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">0</td>
  //   </tr>
  //   <tr>
  //     <td style="border: 1px solid #ccc;">4. BCW</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">2</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">2</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">0</td>
  //   </tr>
  //   <tr>
  //     <td style="border: 1px solid #ccc; text-align: center;">TOTAL</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">24</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">24</td>
  //     <td style="border: 1px solid #ccc; text-align: center;">0</td>
  //   </tr>
  // </tbody>
  // </table>
  legendControl.addTo(mapSkema);

  // S. Cihaur
  var cihaur = L.polygon(
    [
      [-6.92321, 107.487404], //kiri
      [-6.92321, 107.709404], //kanan
    ],
    {
      color: 'black',
    }
  ).addTo(mapSkema);

  var cihaur1 = L.polygon(
    [
      [-5.68889, 107.709404], //atas
      [-6.92321, 107.709404], //bawah
    ],
    {
      color: 'black',
    }
  ).addTo(mapSkema);

  var cihaur1 = L.marker([-6.38321, 107.64404], {
    icon: L.divIcon({
      className: 'text-label',
      iconSize: [100, 40],
      html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 16px; white-space: nowrap;">SALURAN INDUK CIHAUR</div>',
    }),
  }).addTo(mapSkema);

  var cihaur2 = L.polygon(
    [
      [-5.68889, 107.709404], //kiri
      [-5.68889, 110.109404], //kanan
    ],
    {
      color: 'black',
    }
  ).addTo(mapSkema);

  var cihaur2 = L.marker([-5.76889, 108.789404], {
    icon: L.divIcon({
      className: 'text-label',
      iconSize: [100, 40],
      html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 14px; white-space: nowrap;">SALURAN INDUK CIHAUR</div>',
    }),
  }).addTo(mapSkema);

  var cihaur3 = L.polygon(
    [
      [-6.58889, 107.709404], //kiri
      [-6.58889, 108.709404], //kanan
    ],
    {
      color: 'black',
    }
  ).addTo(mapSkema);

  var cihaur3 = L.marker([-6.67889, 108.289404], {
    icon: L.divIcon({
      className: 'text-label',
      iconSize: [100, 40],
      html: '<div style="transform: rotate(0deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">SAL.SEK.SIDAREJA</div>',
    }),
  }).addTo(mapSkema);

  var cihaur4 = L.polygon(
    [
      [-5.68889, 108.109404], //atas
      [-6.28889, 108.109404], //bawah
    ],
    {
      color: 'black',
    }
  ).addTo(mapSkema);

  var cihaur4 = L.marker([-5.89889, 108.0597], {
    icon: L.divIcon({
      className: 'text-label',
      iconSize: [100, 40],
      html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">SAL.SEK.KUNCI</div>',
    }),
  }).addTo(mapSkema);

  var cihaur5 = L.polygon(
    [
      [-5.68889, 109.809404], //atas
      [-6.28889, 109.809404], //bawah
    ],
    {
      color: 'black',
    }
  ).addTo(mapSkema);

  var cihaur5 = L.marker([-6.09889, 109.903404], {
    icon: L.divIcon({
      className: 'text-label',
      iconSize: [100, 40],
      html: '<div style="transform: rotate(-90deg); color: black; font-weight: bold; font-size: 12px; white-space: nowrap;">SAL.SEK.CIAWITALI</div>',
    }),
  }).addTo(mapSkema);

  //{ arus, lingx/ling, perpan, on }
  var arus = L.marker([-6.68, 107.709404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus.addTo(mapSkema);

  var lingx = L.marker([-6.68, 107.76], {
    icon: L.icon({
      iconUrl: '/assets/img/lingx.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  lingx.addTo(mapSkema);

  var perpan = L.marker([-6.72, 107.77], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan.addTo(mapSkema);

  var on = L.marker([-6.76, 107.77], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on.addTo(mapSkema);

  var arus1 = L.marker([-6.58889, 107.709404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus1.addTo(mapSkema);

  var ling1 = L.marker([-6.53889, 107.74], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling1.addTo(mapSkema);

  var perpan1 = L.marker([-6.499, 107.75], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan1.addTo(mapSkema);

  var on1 = L.marker([-6.46, 107.74], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on1.addTo(mapSkema);

  var arus2 = L.marker([-6.58889, 107.88], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus2.addTo(mapSkema);

  var lingx2 = L.marker([-6.53, 107.938], {
    icon: L.icon({
      iconUrl: '/assets/img/lingx.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  lingx2.addTo(mapSkema);

  var perpan2 = L.marker([-6.49, 107.938], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan2.addTo(mapSkema);

  var on2 = L.marker([-6.45, 107.938], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on2.addTo(mapSkema);

  var arus3 = L.marker([-6.58889, 107.98], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus3.addTo(mapSkema);

  var arus4 = L.marker([-6.58889, 108.08], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus4.addTo(mapSkema);

  var lingx4 = L.marker([-6.53, 108.08], {
    icon: L.icon({
      iconUrl: '/assets/img/lingx.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  lingx4.addTo(mapSkema);

  var perpan4 = L.marker([-6.53, 108.14], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan4.addTo(mapSkema);

  var on4 = L.marker([-6.49, 108.13], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on4.addTo(mapSkema);

  var arus5 = L.marker([-6.58889, 108.25], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus5.addTo(mapSkema);

  var lingx5 = L.marker([-6.53, 108.25], {
    icon: L.icon({
      iconUrl: '/assets/img/lingx.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  lingx5.addTo(mapSkema);

  var perpan5 = L.marker([-6.53, 108.31], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan5.addTo(mapSkema);

  var on5 = L.marker([-6.49, 108.3], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on5.addTo(mapSkema);

  var arus6 = L.marker([-6.58889, 108.48], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus6.addTo(mapSkema);

  var lingx6 = L.marker([-6.53, 108.48], {
    icon: L.icon({
      iconUrl: '/assets/img/lingx.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  lingx6.addTo(mapSkema);

  var perpan6 = L.marker([-6.53, 108.54], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan6.addTo(mapSkema);

  var on6 = L.marker([-6.49, 108.53], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on6.addTo(mapSkema);

  var arus7 = L.marker([-6.58889, 108.709404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus7.addTo(mapSkema);

  var lingx7 = L.marker([-6.53, 108.709404], {
    icon: L.icon({
      iconUrl: '/assets/img/lingx.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  lingx7.addTo(mapSkema);

  var perpan7 = L.marker([-6.53, 108.77], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan7.addTo(mapSkema);

  var on7 = L.marker([-6.49, 108.76], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on7.addTo(mapSkema);

  var arus8 = L.marker([-6.18889, 107.709404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus8.addTo(mapSkema);

  var ling8 = L.marker([-6.14, 107.74], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling8.addTo(mapSkema);

  var perpan8 = L.marker([-6.1, 107.75], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan8.addTo(mapSkema);

  var on8 = L.marker([-6.06, 107.74], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on8.addTo(mapSkema);

  var arus9 = L.marker([-5.78889, 107.709404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus9.addTo(mapSkema);

  var ling9 = L.marker([-5.78889, 107.66], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling9.addTo(mapSkema);

  var perpan9 = L.marker([-5.75, 107.67], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan9.addTo(mapSkema);

  var on9 = L.marker([-5.71, 107.66], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on9.addTo(mapSkema);

  var arus10 = L.marker([-5.68889, 108.109404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus10.addTo(mapSkema);

  var ling10 = L.marker([-5.61, 108.17], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling10.addTo(mapSkema);

  var perpan10 = L.marker([-5.57, 108.17], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan10.addTo(mapSkema);

  var on10 = L.marker([-5.61, 108.22], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on10.addTo(mapSkema);

  var arus11 = L.marker([-6.05, 108.109404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus11.addTo(mapSkema);

  var lingx11 = L.marker([-6.12, 108.05], {
    icon: L.icon({
      iconUrl: '/assets/img/lingx.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  lingx11.addTo(mapSkema);

  var on11 = L.marker([-6.12, 107.998], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on11.addTo(mapSkema);

  var arus12 = L.marker([-6.17, 108.109404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus12.addTo(mapSkema);

  var arus13 = L.marker([-6.28889, 108.109404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus13.addTo(mapSkema);

  var lingx13 = L.marker([-6.34, 108.14], {
    icon: L.icon({
      iconUrl: '/assets/img/lingx.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  lingx13.addTo(mapSkema);

  var on13 = L.marker([-6.34, 108.19], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on13.addTo(mapSkema);

  var arus14 = L.marker([-5.68889, 108.21], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus14.addTo(mapSkema);

  var arus15 = L.marker([-5.68889, 108.41], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus15.addTo(mapSkema);

  var ling15 = L.marker([-5.63, 108.41], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling15.addTo(mapSkema);

  var perpan15 = L.marker([-5.59, 108.41], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan15.addTo(mapSkema);

  var on15 = L.marker([-5.63, 108.46], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on15.addTo(mapSkema);

  var arus16 = L.marker([-5.68889, 108.58], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus16.addTo(mapSkema);

  var ling16 = L.marker([-5.72, 108.54], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling16.addTo(mapSkema);

  var perpan16 = L.marker([-5.76, 108.54], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan16.addTo(mapSkema);

  var on16 = L.marker([-5.8, 108.51], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on16.addTo(mapSkema);

  var arus17 = L.marker([-5.68889, 108.76], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus17.addTo(mapSkema);

  var ling17 = L.marker([-5.63, 108.76], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling17.addTo(mapSkema);

  var perpan17 = L.marker([-5.59, 108.76], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan17.addTo(mapSkema);

  var on17 = L.marker([-5.63, 108.81], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on17.addTo(mapSkema);

  var arus18 = L.marker([-5.68889, 108.94], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus18.addTo(mapSkema);

  var lingx18 = L.marker([-5.63, 108.94], {
    icon: L.icon({
      iconUrl: '/assets/img/lingx.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  lingx18.addTo(mapSkema);

  var perpan18 = L.marker([-5.59, 108.94], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan18.addTo(mapSkema);

  var on18 = L.marker([-5.63, 108.99], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on18.addTo(mapSkema);

  var arus19 = L.marker([-5.68889, 109.12], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus19.addTo(mapSkema);

  var lingx19 = L.marker([-5.63, 109.12], {
    icon: L.icon({
      iconUrl: '/assets/img/lingx.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  lingx19.addTo(mapSkema);

  var perpan19 = L.marker([-5.59, 109.12], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan19.addTo(mapSkema);

  var on19 = L.marker([-5.63, 109.17], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on19.addTo(mapSkema);

  var arus20 = L.marker([-5.68889, 109.3], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus20.addTo(mapSkema);

  var ling20 = L.marker([-5.63, 109.3], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling20.addTo(mapSkema);

  var perpan20 = L.marker([-5.59, 109.3], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan20.addTo(mapSkema);

  var on20 = L.marker([-5.55, 109.29], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on20.addTo(mapSkema);

  var arus21 = L.marker([-5.68889, 109.48], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus21.addTo(mapSkema);

  var ling21 = L.marker([-5.63, 109.48], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling21.addTo(mapSkema);

  var perpan21 = L.marker([-5.59, 109.48], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan21.addTo(mapSkema);

  var on21 = L.marker([-5.55, 109.47], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on21.addTo(mapSkema);

  var arus22 = L.marker([-5.68889, 109.66], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus22.addTo(mapSkema);

  var ling22 = L.marker([-5.63, 109.66], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling22.addTo(mapSkema);

  var perpan22 = L.marker([-5.59, 109.66], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan22.addTo(mapSkema);

  var on22 = L.marker([-5.55, 109.65], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on22.addTo(mapSkema);

  var arus23 = L.marker([-5.68889, 109.809404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus23.addTo(mapSkema);

  var ling23 = L.marker([-5.6, 109.86], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling23.addTo(mapSkema);

  var perpan23 = L.marker([-5.56, 109.86], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan23.addTo(mapSkema);

  var on23 = L.marker([-5.52, 109.85], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on23.addTo(mapSkema);

  var arus24 = L.marker([-6.05, 109.809404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus24.addTo(mapSkema);

  var ling24 = L.marker([-6.01, 109.78], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling24.addTo(mapSkema);

  var perpan24 = L.marker([-5.97, 109.76], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan24.addTo(mapSkema);

  var on24 = L.marker([-6.01, 109.73], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on24.addTo(mapSkema);

  var arus25 = L.marker([-6.28889, 109.809404], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus25.addTo(mapSkema);

  var lingx25 = L.marker([-6.25, 109.78], {
    icon: L.icon({
      iconUrl: '/assets/img/lingx.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  lingx25.addTo(mapSkema);

  var perpan25 = L.marker([-6.21, 109.76], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan25.addTo(mapSkema);

  var on25 = L.marker([-6.25, 109.73], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on25.addTo(mapSkema);

  var arus26 = L.marker([-5.68889, 109.905], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus26.addTo(mapSkema);

  var arus27 = L.marker([-5.68889, 109.998], {
    icon: L.icon({
      iconUrl: '/assets/img/arus.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 20], // Ukuran icon
    }),
  });
  arus27.addTo(mapSkema);

  var ling27 = L.marker([-5.63, 110.02], {
    icon: L.icon({
      iconUrl: '/assets/img/ling.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [15, 15], // Ukuran icon
    }),
  });
  ling27.addTo(mapSkema);

  var perpan27 = L.marker([-5.63, 110.08], {
    icon: L.icon({
      iconUrl: '/assets/img/perpan.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [25, 10], // Ukuran icon
    }),
  });
  perpan27.addTo(mapSkema);

  var on27 = L.marker([-5.59, 110.07], {
    icon: L.icon({
      iconUrl: '/assets/img/on.png', // Ganti dengan path atau URL icon yang sesuai
      iconSize: [20, 15], // Ukuran icon
    }),
  });
  on27.addTo(mapSkema);
});