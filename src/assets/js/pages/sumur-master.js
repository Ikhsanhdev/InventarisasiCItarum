"use strict";


var dataTableSumur;

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
      dataTableSumur.ajax.reload();
    });
  };

  var initDataTableDetail = function () {    
    dataTableSumur = $("#table-sumur").DataTable({
      processing: true,
      serverSide: true,
      dom: "tipr",
      order: [[5, "asc"]],
      ajax: {
        url: "/Sumur/GetSumurData",
        type: "POST",
        dataType: "JSON",
        data: function (params) {
          params.filter_date = getValueById('monthpicker');
        }
      },
      columns: [
        { data: 'code'  },
        { data: 'alamat' },
        { data: 'kedalaman_bor'},
        { data: 'debit_sumur' },
        { data: 'kondisi_sumur' },
        { data: 'kondisi_mesin'},
        { data: 'kondisi_pompa'},
        { data: 'kondisi_rumah_pompa', },
        { data: 'irigasi_pipa_saluran',  },
        { data: 'irigasi_box_pembagi', },
        { data: 'status' },
        {
          className: "text-nowrap",
          className: "text-center",
          orderable: false,
          render: function (data, type, row) {
            return `<button onclick="editSumur(this,event);" data-id="${row.id}" type="button" class="btn btn-sm btn-success btn-icon me-1">Edit</i></button>  <button onclick="deleteSumur(this, event);" data-id="${row.id}" type="button" class="btn btn-sm btn-danger btn-icon">Hapus</button>`;
          },
        },
      ],
      language: {
        paginate: {
          previous: "<i class='mdi mdi-chevron-left'>",
          next: "<i class='mdi mdi-chevron-right'>",
        },
      },
      drawCallback: function () {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
      },
    });


  };

  return {
    //main function to initiate the module
    init: function () {
      // initInput();
      initDataTableDetail();
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
    formData.append("Status", document.getElementById("status").value);
    formData.append("Note", document.getElementById("note").value);

    postData("/Sumur/SaveSumur", formData)
      .then((res) => {
        let result = res.data;
        if (result.code == 200) {
          showMessage("success", "Sukses!", result.message);
          dataTableSumur.ajax.reload();
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

window.deleteSumur = (input, evt) => {
  evt.preventDefault();
  var id = $(input).data("id");

  Swal.fire({
    title: "Hapus Sumur",
    text: "Anda yakin untuk menghapus Petak tersebut ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return deleteData("/Sumur/DeleteSumur/" + id)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
          return response;
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      if (result.value.data.code == 200) {
        showMessage("success", "Sukses!", result.value.data.message);
        dataTableSumur.ajax.reload();
      } else {
        showMessage("error", "Failed", result.value.data.message);
      }
    }
  });
};


window.editSumur = (input, evt) => {
  evt.preventDefault();

  var contentBtn = $(input).html();

  beforeLoadingButton($(input));

  var id = $(input).data("id");
  window.location.href = "/Sumur/Edit/" + id;
};
