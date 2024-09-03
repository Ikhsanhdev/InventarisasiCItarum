"use strict";

var dataTablePengambilan;

var dataPengambilan = (function() {
    var initInputPengambilan = function() {
        $(".parsley-validation").parsley();

        $("#search-pengambilan-table").keyup(function () {
            dataTablePengambilan.search($(this).val()).draw();
        });
        $("#length-pengambilan-table").change(function () {
            dataTablePengambilan.page.len($(this).val()).draw();
        });
    };

    var initDataTablePengambilan = function() {
        dataTablePengambilan = $('#table-pengambilan').DataTable({
            processing: true,
            serverSide: true,
            dom: "tipr",
            order: [[2, "asc"]],
            ajax: {
                url: "/DebitBendung/GetDataDebitPengambilan",
                type: "POST",
                dataType: "JSON",
            },
            columns: [
                { data: null },
                {
                    data: "tanggal",
                    name: "Tanggal",
                    render: function (data) {
                        var date = formatDate(data, 'tanggal');
                        return date;
                    }
                },
                {
                    data: "nilai",
                    name: "Nilai",
                    render: function (data) {
                        return data ? `<span class="ketersediaan-color fw-semibold text-center d-block">${parseFloat(data).toFixed(2)}</span>` : '<span class="text-center d-block">-</span>';
                    }
                },
                {data: "satuan", name: "Satuan", className: "text-center"},
                {
                    data: "update",
                    name: "Update",
                    render: function (data) {
                        var date = formatDate(data, 'update');
                        return date;
                    }
                },
                {
                    className: "text-nowrap",
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-xs btn-success me-1 rounded-2 action-button" data-id="${row.id}" onclick="createEditDebit(this, event)"><i class="mdi mdi-square-edit-outline me-1"></i>Edit</button>
                            <button type="button" class="btn btn-xs btn-danger rounded-2" data-id="${row.id}" onclick="deleteDebit(this, event)"><i class="mdi mdi-delete me-1"></i>Delete</button>`;
                    },
                }
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

        dataTablePengambilan.on("draw.dt", function () {
            var info = dataTablePengambilan.page.info();
            dataTablePengambilan
              .column(0, { search: "applied", order: "applied", page: "applied" })
              .nodes()
              .each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
        });
    };

    return {
        init: function () {
            initInputPengambilan();
            initDataTablePengambilan();
        },
    };
})();

jQuery(document).ready(function () {
    dataPengambilan.init();

    $('#input-pengambilan').on('submit', function(e) {
        e.preventDefault();
        var $submitButton = $(this).find('button[type="submit"]');
        var originalButtonText = $submitButton.text();

        $submitButton.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');

        $.ajax({
            url: '/DebitBendung/SavePengambilan', 
            type: 'POST',
            data: $(this).serialize(), 
            success: function(response) {
                if (response.code == 200) {
                    $('#input-pengambilan')[0].reset();
                    dataTablePengambilan.ajax.reload(null, false);
                } else {
                    alert('There was an error submitting the form.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Submission failed:', error);
                alert('An error occurred while submitting the form.');
            },
            complete: function() {
                $submitButton.prop('disabled', false).html(originalButtonText);
            }
        });
    });

    // $('#form-update').on('submit', function(e) {
    //     e.preventDefault();
    //     var $submitButton = $(this).find('button[type="submit"]');
    //     var originalButtonText = $submitButton.text();

    //     $submitButton.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');

    //     $.ajax({
    //         url: '/DebitBendung/UpdatePengambilan', 
    //         type: 'POST',
    //         data: $(this).serialize(), 
    //         success: function(response) {
    //             if (response.code == 200) {
    //                 e.preventDefault();
    //                 console.log($(this).serialize());
    //                 showMessage("error", "Failed", response);
    //                 // $("#modalCreateEditDebit").modal("hide");
    //                 // dataTablePengambilan.ajax.reload(null, false);
    //             } else {
    //                 alert('There was an error submitting the form.');
    //             }
    //         },
    //         error: function(xhr, status, error) {
    //             console.error('Submission failed:', error);
    //             alert('An error occurred while submitting the form.');
    //         },
    //         complete: function() {
    //             $submitButton.prop('disabled', false).html(originalButtonText);
    //         }
    //     });
    // });
});

window.createEditDebit = (input, evt) => {
    evt.preventDefault();
  
    var contentBtn = $(input).html();
  
    beforeLoadingButton($(input));
  
    var id = $(input).data("id");
  
    var formData = new FormData();
    formData.append("Id", id);
  
    postData("/DebitBendung/CreateEditPengambilan", formData).then((res) => {
        let result = res.data;
        $("#modalCreateEditDebit .modal-content").html(result);
        $("#modalCreateEditDebit").modal("show");
    
        afterLoadingButton($(input), contentBtn);
    });
};

window.updatePengambilan = (form, evt) => {
    evt.preventDefault();
  
    var btnSubmit = $(form).find("button[type=submit]");
  
    $(form).parsley().validate();
  
    if ($(form).parsley().isValid()) {
        beforeLoadingButton(btnSubmit);

        var formData = new FormData();
        formData.append("Id", getValueById("Id"));
        formData.append("Nilai", getValueById("Nilai"));
        formData.append("Satuan", getValueById("Satuan"));
  
        postData("/DebitBendung/UpdatePengambilan", formData)
            .then((res) => {
            let result = res.data;
            if (result.code == 200) {
                console.log('tanggal: ', tanggal);
                console.log('id: ', formData.append("Id", getValueById("Id")));
                $("#modalCreateEditDebit").modal("hide");
                dataTablePengambilan.ajax.reload(null, false);
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

window.deleteDebit = (input, evt) => {
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
        return deleteData("/DebitBendung/DeletePengambilan/" + id)
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
            dataTablePengambilan.ajax.reload(null, false);
        } else {
          showMessage("error", "Failed", result.value.data.message);
        }
      }
    });
};

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

// function getValueById(id) {
//     return document.getElementById(id).value;
// }