"use strict";

var dataTableUser;

var Datauser = (function () {
  var initInput = function () {
    $(".parsley-validation").parsley();
    $("#search-user-table").keyup(function () {
      dataTableUser.search($(this).val()).draw();
    });
    $("#length-user-table").change(function () {
      dataTableUser.page.len($(this).val()).draw();
    });
  };

  var initDataTable = function () {
    dataTableUser = $("#table-user").DataTable({
      processing: true,
      serverSide: true,
      dom: "tipr",
      order: [[2, "asc"]],
      ajax: {
        url: "/User/GetdataTableUser",
        type: "POST",
        dataType: "JSON",
      },
      columns: [
        { data: null },
        { data: "username", name: "Username" },
        {
          data: "name",
          name: "Name",
          className: "text-nowrap",
        },
        { data: "email", name: "Email" },
        {
          data: "phone",
          name: "Phone",
          className: "text-nowrap",
        },
        {
          data: "lastLogin",
          name: "LastLogin",
          className: "text-nowrap",
        },
        {
          className: "text-nowrap",
          render: function (data, type, row) {
            return `<button type="button" class="btn btn-xs btn-success me-1 rounded-2" data-id="${row.id}" onclick="createEditUser(this, event)"><i class="mdi mdi-square-edit-outline me-1"></i>Edit</button>
                            <button type="button" class="btn btn-xs btn-danger rounded-2" data-id="${row.id}" onclick="deleteUser(this, event)"><i class="mdi mdi-delete me-1"></i>Delete</button>`;
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
          targets: 5,
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

    dataTableUser.on("draw.dt", function () {
      var info = dataTableUser.page.info();
      dataTableUser
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
  Datauser.init();
});

window.createEditUser = (input, evt) => {
  evt.preventDefault();

  var contentBtn = $(input).html();

  beforeLoadingButton($(input));

  var id = $(input).data("id");

  var formData = new FormData();
  formData.append("Id", id);

  postData("/User/CreateEditUser", formData).then((res) => {
    let result = res.data;
    $("#modalCreateEditUser .modal-content").html(result);
    $("#modalCreateEditUser").modal("show");

    afterLoadingButton($(input), contentBtn);
  });
};

window.saveUser = (form, evt) => {
  evt.preventDefault();

  var btnSubmit = $(form).find("button[type=submit]");

  $(form).parsley().validate();

  if ($(form).parsley().isValid()) {
    beforeLoadingButton(btnSubmit);
    var formData = new FormData();
    formData.append("Id", getValueById("Id"));
    formData.append("Name", getValueById("Name"));
    formData.append("Email", getValueById("Email"));
    formData.append("Phone", getValueById("Phone"));
    formData.append("Username", getValueById("Username"));
    formData.append("Password", getValueById("Password"));

    postData("/User/SaveUser", formData)
      .then((res) => {
        let result = res.data;
        if (result.code == 200) {
          $("#modalCreateEditUser").modal("hide");
          showMessage("success", "Sukses!", result.message);
          dataTableUser.ajax.reload();
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

window.deleteUser = (input, evt) => {
  evt.preventDefault();
  var id = $(input).data("id");

  Swal.fire({
    title: "Hapus Pengguna",
    text: "Anda yakin untuk menghapus pengguna tersebut ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return deleteData("/User/DeleteUser/" + id)
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
        $("#modalCreateEditUser").modal("hide");
        showMessage("success", "Sukses!", result.value.data.message);
        dataTableUser.ajax.reload();
      } else {
        showMessage("error", "Failed", result.value.data.message);
      }
    }
  });
};
