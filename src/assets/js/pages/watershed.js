"use strict";

var dataTableWatershed;

var DataWatershed = (function () {
  var initInput = function () {
    $(".parsley-validation").parsley();
    $("#search-watershed-table").keyup(function () {
      dataTableWatershed.search($(this).val()).draw();
    });
    $("#length-watershed-table").change(function () {
      dataTableWatershed.page.len($(this).val()).draw();
    });
  };

  var initDataTable = function () {
    dataTableWatershed = $("#table-watershed").DataTable({
      processing: true,
      serverSide: true,
      dom: "tipr",
      order: [[2, "desc"]],
      ajax: {
        url: "/Watershed/GetdataTableWatershed",
        type: "POST",
        dataType: "JSON",
      },
      columns: [
        { data: null },
        { data: "riverAreaName", name: "RiverAreaName" },
        { data: "code", name: "Code" },
        { data: "name", name: "Name" },
        { data: "updatedAt", name: "UpdatedAt" },
        {
          render: function (data, type, row) {
            return `<button type="button" class="btn btn-xs btn-success me-1 rounded-2" data-id="${row.id}" onclick="createEditWatershed(this, event)"><i class="mdi mdi-square-edit-outline me-1"></i>Edit</button>
                            <button type="button" class="btn btn-xs btn-danger rounded-2" data-id="${row.id}" onclick="deleteWatershed(this, event)"><i class="mdi mdi-delete me-1"></i>Delete</button>`;
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
          targets: 4,
          render: function (data) {
            if (data === null) {
              return "";
            } else {
              return (
                moment(data).format("DD-MMM-YYYY") +
                ' <small class="text-muted">' +
                moment(data).format("HH:mm") +
                "</small>"
              );
            }
          },
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

    dataTableWatershed.on("draw.dt", function () {
      var info = dataTableWatershed.page.info();
      dataTableWatershed
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
  DataWatershed.init();
});

window.createEditWatershed = (input, evt) => {
  evt.preventDefault();

  var contentBtn = $(input).html();

  beforeLoadingButton($(input));

  var id = $(input).data("id");

  var formData = new FormData();
  formData.append("Id", id);

  postData("/Watershed/CreateEditWatershed", formData).then((res) => {
    let result = res.data;
    $("#modalCreateEditWatershed .modal-content").html(result);
    $("#modalCreateEditWatershed").modal("show");
    afterLoadingButton($(input), contentBtn);
  });
};

window.saveWatershed = (form, evt) => {
  evt.preventDefault();

  var btnSubmit = $(form).find("button[type=submit]");

  $(form).parsley().validate();

  if ($(form).parsley().isValid()) {
    beforeLoadingButton(btnSubmit);
    var formData = new FormData();
    formData.append("Id", getValueById("Id"));
    formData.append("Name", getValueById("Name"));
    formData.append("Code", getValueById("Code"));
    formData.append("RiverAreaId", getValueById("RiverAreaId"));

    postData("/Watershed/SaveWatershed", formData)
      .then((res) => {
        let result = res.data;
        if (result.code == 200) {
          $("#modalCreateEditWatershed").modal("hide");
          showMessage("success", "Sukses!", result.message);
          dataTableWatershed.ajax.reload();
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

window.deleteWatershed = (input, evt) => {
  evt.preventDefault();
  var id = $(input).data("id");

  Swal.fire({
    title: "Hapus DAS",
    text: "Anda yakin untuk menghapus DAS tersebut ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return deleteData("/Watershed/DeleteWatershed/" + id)
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
        $("#modalCreateEditWatershed").modal("hide");
        showMessage("success", "Sukses!", result.value.data.message);
        dataTableWatershed.ajax.reload();
      } else {
        showMessage("error", "Failed", result.value.data.message);
      }
    }
  });
};
