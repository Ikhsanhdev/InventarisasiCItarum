"use strict";

var dataTablePetak;

var dataPetak = (function() {
    var initInput = function() {
        $(".parsley-validation").parsley();
        $("#search-petak-table").keyup(function () {
            dataTablePetak.search($(this).val()).draw();
        });
        $("#length-petak-table").change(function () {
            dataTablePetak.page.len($(this).val()).draw();
        });
    };

    var initDataTable = function() {
        dataTablePetak = $("#table-petak").DataTable({
            processing: true,
            serverSide: true,
            dom: "tipr",
            order: [[2, "asc"]],
            ajax: {
                url: "/Master/GetDataPetak",
                type: "POST",
                dataType: "JSON",
            },
            columns: [
                { data: null },
                { data: "namaPetak", name: "NamaPetak" },
                { data: "jenisBangunan", name: "JenisBangunan" },
                { data: "namaBangunan", name: "NamaBangunan" },
                { data: "luas", name: "Luas" },
                { data: "debitKebutuhan", name: "DebitKebutuhan" },
                { data: "location", name: "Location" },
                {
                  className: "text-nowrap",
                  render: function (data, type, row) {
                    return `<button type="button" class="btn btn-xs btn-success me-1 rounded-2" data-id="${row.id}" onclick="createEditPetak(this, event)"><i class="mdi mdi-square-edit-outline me-1"></i>Edit</button>
                                    <button type="button" class="btn btn-xs btn-danger rounded-2" data-id="${row.id}" onclick="deletePetak(this, event)"><i class="mdi mdi-delete me-1"></i>Delete</button>`;
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

        dataTablePetak.on("draw.dt", function () {
            var info = dataTablePetak.page.info();
            dataTablePetak
              .column(0, { search: "applied", order: "applied", page: "applied" })
              .nodes()
              .each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
        });
    };

    return {
        init: function () {
            initInput();
            initDataTable();
        },
    };
})();

jQuery(document).ready(function () {
    dataPetak.init();
});

window.createEditPetak = (input, evt) => {
    evt.preventDefault();
  
    var contentBtn = $(input).html();
  
    beforeLoadingButton($(input));
  
    var id = $(input).data("id");
  
    var formData = new FormData();
    formData.append("Id", id);
  
    postData("/Master/CreateEditPetak", formData).then((res) => {
        let result = res.data;
        $("#modalCreateEditPetak .modal-content").html(result);
        $("#modalCreateEditPetak").modal("show");
    
        afterLoadingButton($(input), contentBtn);
    });
};

window.savePetak = (form, evt) => {
    evt.preventDefault();
  
    var btnSubmit = $(form).find("button[type=submit]");
  
    $(form).parsley().validate();
  
    if ($(form).parsley().isValid()) {
      beforeLoadingButton(btnSubmit);
      var formData = new FormData();
      formData.append("Id", getValueById("Id"));
      formData.append("NamaPetak", getValueById("NamaPetak"));
      formData.append("JenisBangunan", getValueById("JenisBangunan"));
      formData.append("Luas", getValueById("Luas"));
      formData.append("DebitKebutuhan", getValueById("DebitKebutuhan"));
      formData.append("Location", getValueById("Location"));
  
      postData("/Master/SavePetak", formData)
        .then((res) => {
          let result = res.data;
          if (result.code == 200) {
            $("#modalCreateEditPetak").modal("hide");
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

window.deletePetak = (input, evt) => {
    evt.preventDefault();
    var id = $(input).data("id");
  
    Swal.fire({
      title: "Hapus Petak",
      text: "Anda yakin untuk menghapus Petak tersebut ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return deleteData("/Master/DeletePetak/" + id)
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
        //   $("#modalCreateEditUser").modal("hide");
          showMessage("success", "Sukses!", result.value.data.message);
          dataTablePetak.ajax.reload();
        } else {
          showMessage("error", "Failed", result.value.data.message);
        }
      }
    });
};