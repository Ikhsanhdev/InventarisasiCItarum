"use strict";


var dataTableHulu;

var dataSumur = (function () {

  var initInput = function () {

    flatpickr("#monthpicker", {
      altInput: true,
      locale: "id", // Set locale to Indonesian
      dateFormat: "Y-M", // Format to display month and year
      defaultDate: new Date(), // Automatically select the current month
      maxDate: new Date(), // Set the maximum selectable date to the current date
      plugins: [
        new monthSelectPlugin({
          altInput: true,
          shorthand: true, // Shortened month names
          dateFormat: "Y-m", // Format to display month and year
          altFormat: "F Y", // Alternate format to display month and year
          theme: "light" // Light theme
        })
      ]
    });


    $("#monthpicker").on('change', function () {
      dataTableManual.ajax.reload();
    });
  };

  return {
    //main function to initiate the module
    init: function () {
      // initInput();
    },
  };
})();

jQuery(document).ready(function () {
  dataSumur.init();

});


function formatDate(dateString, type) {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Parse the input date string
  const date = new Date(dateString);

  // Extract day, month, year, hour, and minute
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  // Format the date as "dd MMMM yyyy HH:mm"
  if (type === 'tanggal') {
    return `${day} ${month} ${year}`;
  } else if (type === 'update') {
    return `${day} ${month} ${year} ${hour}:${minute}`;
  }

}


window.saveSumur = (form, evt) => {
  evt.preventDefault();

  console.log("Save Sumur");
  
  var btnSubmit = $(form).find("button[type=submit]");

  $(form).parsley().validate();
  debugger

  if ($(form).parsley().isValid()) {
    beforeLoadingButton(btnSubmit);
    var formData = new FormData();
    formData.append("Id", getValueById("Id"));
    formData.append("Code", document.getElementById("kode").value);
    formData.append("Alamat", document.getElementById("alamat").value);
    formData.append("SumberEnergi", document.getElementById("sumber_energi").value); 
    formData.append("Latitude", document.getElementById("latitude").value);
    formData.append("Longitude", document.getElementById("longitude").value);
    formData.append("TahunPengeboran", document.getElementById("tahun_pengeboran").value);
    formData.append("tahunRehab", document.getElementById("tahun_rehab").value);
    formData.append("TahunPerbaikanJiat", document.getElementById("tahun_perbaikan_jiat").value);
    formData.append("TahunPerbaikanMesin", document.getElementById("tahun_perbaikan_Mesin").value);
    formData.append("KedalamanBor", document.getElementById("kedalaman_bor").value);
    formData.append("DebitSumur", document.getElementById("debit").value);
    formData.append("KondisiSumur", document.getElementById("kondisi_sumur").value);
    formData.append("KondisiMesin", document.getElementById("kondisi_mesin").value);
    formData.append("KondisiPompa", document.getElementById("kondisi_pompa").value);
    formData.append("KondisiRumahPompa", document.getElementById("kondisi_rumah_pompa").value);
    formData.append("IrigasiPipaSaluran", document.getElementById("irigasi_pipa_saluran").value);
    formData.append("IrigasiBoxPembagi", document.getElementById("irigasi_box_pembagi").value);
    formData.append("FungsiAirBaku", document.getElementById("fungsi_air_baku").value);
    formData.append("FungsiIrigasi", document.getElementById("fungsi_irigasi").value);
    formData.append("Status", document.getElementById("inputStatus").value);
    formData.append("Note", document.getElementById("note").value);

    postData("/Sumur/SaveSumur", formData)
      .then((res) => {
        let result = res.data;
        if (result.code == 200) {
          showMessage("success", "Sukses!", result.message);
          dataTablePetak.ajax.reload();
        } else {
          showMessage("error", "Gagal!", result.message);
        }
        afterLoadingButton(btnSubmit);
      })
      .catch((err) => {
        console.log(err);
        afterLoadingButton(btnSubmit);
      });
  }
};