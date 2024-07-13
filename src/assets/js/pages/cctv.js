"use strict";

var dataTableCctv;

var DataCctv = (function () {
  var initInput = function () {
    $(".parsley-validation").parsley();
    $("#search-station-table").keyup(function () {
      dataTableCctv.search($(this).val()).draw();
    });
    $("#length-station-table").change(function () {
      dataTableCctv.page.len($(this).val()).draw();
    });
  };

  var initDataTable = function () {
    dataTableCctv = $("#table-Cctv").DataTable({
      processing: true,
      serverSide: true,
      dom: "tipr",
      order: [[1, "asc"]],
      ajax: {
        url: "/Cctv/GetdataTableCctv",
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: function (d) {
          return JSON.stringify(d);
        },
      },
      columns: [
        { data: null },
        { data: "name", name: "name" },
        { data: "url", name: "url" },
        {
          render: function (data, type, row) {
            return `<button type="button" class="btn btn-xs btn-success me-1" data-id="${row.id}" onclick="createEdit(this, event)"><i class="mdi mdi-square-edit-outline me-1"></i>Edit</button>
                         <button type="button" class="btn btn-xs btn-danger" data-id="${row.id}" onclick="deleteCctv(this, event)"><i class="mdi mdi-delete me-1"></i>Delete</button>`;
          },
        },
      ],
      columnDefs: [
        {
          targets: 0,
          searchable: false,
          orderable: false,
          width: "9%",
          className: "text-center",
        },

        {
          targets: -1,
          searchable: false,
          orderable: false,
          width: "18%",
          className: "text-center",
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

    dataTableCctv.on("draw.dt", function () {
      var info = dataTableCctv.page.info();
      dataTableCctv
        .column(0, { search: "applied", order: "applied", page: "applied" })
        .nodes()
        .each(function (cell, i) {
          cell.innerHTML = i + 1 + info.start;
        });
    });
  };

  return {
    //main function to initiate the module
    init: function () {
      initInput();
      initDataTable();
    },
  };
})();

jQuery(document).ready(function () {
  DataCctv.init();
});

function createEdit(input, event) {
  var contentBtn = $(input).html();

  beforeLoadingButton($(input));

  var id = $(input).data("id");

  var formData = new FormData();
  formData.append("Id", id);

  postData("/Cctv/CreateEdit", formData).then((res) => {
    let result = res.data;
    console.log(result);
    $("#modalCreateEdit .modal-content").html(result);
    $("#modalCreateEdit").modal("show");
    afterLoadingButton($(input), contentBtn);
  });
}

function deleteCctv(input, event) {
  var id = $(input).data("id");
  Swal.fire({
    title: "Hapus CCTV",
    text: "Anda yakin untuk menghapus CCTV tersebut ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return deleteData("/Cctv/DeleteCctv/" + id)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          } else {
            return response;
          }
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      if (result.value.data.code == 200) {
        $("#modalCreateEdit").modal("hide");
        showMessage("success", "Sukses!", result.value.data.message);
        dataTableCctv.ajax.reload();
      } else {
        showMessage("error", "Failed", result.value.data.message);
      }
    }
  });
}

window.saveCctv = (form, evt) => {
  evt.preventDefault();

  var btnSubmit = $(form).find("button[type=submit]");

  $(form).parsley().validate();

  if ($(form).parsley().isValid()) {
    beforeLoadingButton(btnSubmit);
    var formData = new FormData();
    formData.append("Id", getValueById("Id"));
    formData.append("Name", getValueById("Name"));
    formData.append("Url", getValueById("Url"));

    postData("/Cctv/SaveUpdateCctv", formData)
      .then((res) => {
        let result = res.data;
        if (result.code == 200) {
          $("#modalCreateEdit").modal("hide");
          showMessage("success", "Sukses!", result.message);
          dataTableCctv.ajax.reload();
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
