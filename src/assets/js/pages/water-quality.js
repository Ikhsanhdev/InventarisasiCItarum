"use strict";

var dataTablePosWaterQuality;
var dataTableWaterQuality;

var DataWaterQuality = (function () {
  var initInput = function () {
    $(".parsley-validation").parsley();
    $("#search-station-table").keyup(function () {
      dataTablePosWaterQuality.search($(this).val()).draw();
      dataTableWaterQuality.search($(this).val()).draw();
    });
    $("#length-station-table").change(function () {
      dataTablePosWaterQuality.page.len($(this).val()).draw();
      dataTableWaterQuality.page.len($(this).val()).draw();
    });
  };

  var initDataTable = function () {
    dataTablePosWaterQuality = $("#table-pos-water-quality").DataTable({
      processing: true,
      serverSide: true,
      dom: "tipr",
      order: [[1, "asc"]],
      ajax: {
        url: "/WaterQuality/GetdataTablePosWaterQuality",
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
        {
          data: "latitude",
          name: "latitude",
          render: function (type, row, data) {
            if (data == null) {
              return `-`;
            }
            return `${data.latitude}, ${data.longitude}`;
          },
        },
        { data: "lastValue", name: "lastValue" },
        { data: "lastStatus", name: "lastStatus" },
        { data: "lastUpdated", name: "lastUpdated" },
        {
          render: function (data, type, row) {
            return `<a href="/WaterQuality/Detail/${row.id}" target="_blank" class="btn btn-xs btn-blue rounded-2 me-1" data-id="${row.id}"><i class="mdi mdi-eye"></i></a>
                            <button onclick="createEdit(this, event)" data-id="${row.id}" class="btn btn-xs btn-success rounded-2 me-1"><i class="mdi mdi-square-edit-outline"></i></button>
                            <button type="button" class="btn btn-xs btn-danger rounded-2" data-id="${row.id}" onclick="deletePos(this, event)"><i class="mdi mdi-delete"></i></button>`;
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
              return moment(data).format("DD-MMM-YYYY");
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

    dataTablePosWaterQuality.on("draw.dt", function () {
      var info = dataTablePosWaterQuality.page.info();
      dataTablePosWaterQuality
        .column(0, { search: "applied", order: "applied", page: "applied" })
        .nodes()
        .each(function (cell, i) {
          cell.innerHTML = i + 1 + info.start;
        });
    });
  };

  var initDataTableWq = function () {
    let stId = $("#station-id").val();
    if (stId == null || stId == "") {
      return;
    }
    dataTableWaterQuality = $("#table-water-quality").DataTable({
      processing: true,
      serverSide: true,
      dom: "tipr",
      order: [[1, "asc"]],
      ajax: {
        url: "/WaterQuality/GetDatatableWaterQuality?StationId=" + stId,
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: function (d) {
          return JSON.stringify(d);
        },
      },
      columns: [
        { data: null },
        { data: "qualityValue", name: "qualityValue" },
        { data: "qualityStatus", name: "qualityStatus" },
        { data: "createdDate", name: "createdDate" },
        {
          render: function (data, type, row) {
            return `
                <button onclick="createEditWq(this, event)" data-id="${row.id}" data-date="${row.createdDate}"  class="btn btn-xs btn-success rounded-2 me-1"><i class="mdi mdi-square-edit-outline"></i></button>
                <button type="button" class="btn btn-xs btn-danger rounded-2" data-id="${row.id}" onclick="deleteWq(this, event)"><i class="mdi mdi-delete"></i></button>`;
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
          targets: 3,
          render: function (data) {
            if (data === null) {
              return "";
            } else {
              return moment(data).format("DD-MMM-YYYY");
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

    dataTableWaterQuality.on("draw.dt", function () {
      var info = dataTableWaterQuality.page.info();
      dataTableWaterQuality
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
      initDataTableWq();
    },
  };
})();

jQuery(document).ready(function () {
  DataWaterQuality.init();
});

function createEditWq(input, event) {
  var contentBtn = $(input).html();

  beforeLoadingButton($(input));

  var id = $(input).data("id");
  var date = $(input).data("date");
  var formData = new FormData();
  formData.append("Id", id);

  if (id !== "" || id == null) {
    formData.append("CreatedDate", date);
  } else {
    formData.append("CreatedDate", $("#CreatedDate").val());
  }

  postData(
    `/WaterQuality/CreateEditWq?StationId=${$("#station-id").val()}`,
    formData
  ).then((res) => {
    let result = res.data;
    console.log(result);
    $("#modalCreateEditWq .modal-content").html(result);
    $("#modalCreateEditWq").modal("show");
    afterLoadingButton($(input), contentBtn);
  });
}

function createEdit(input, event) {
  var contentBtn = $(input).html();

  beforeLoadingButton($(input));

  var id = $(input).data("id");

  var formData = new FormData();
  formData.append("Id", id);

  postData("/WaterQuality/CreateEdit", formData).then((res) => {
    let result = res.data;
    console.log(result);
    $("#modalCreateEdit .modal-content").html(result);
    $("#modalCreateEdit").modal("show");
    afterLoadingButton($(input), contentBtn);
  });
}

window.savePosWaterQuality = (form, evt) => {
  evt.preventDefault();

  var btnSubmit = $(form).find("button[type=submit]");

  $(form).parsley().validate();

  if ($(form).parsley().isValid()) {
    beforeLoadingButton(btnSubmit);
    var formData = new FormData();
    formData.append("Id", getValueById("Id"));
    formData.append("Name", getValueById("Name"));
    formData.append("Latitude", getValueById("Latitude"));
    formData.append("Longitude", getValueById("Longitude"));
    formData.append("LastValue", getValueById("LastValue"));
    postData("/WaterQuality/SavePosWaterQuality", formData)
      .then((res) => {
        let result = res.data;
        if (result.code == 200) {
          $("#modalCreateEdit").modal("hide");
          showMessage("success", "Sukses!", result.message);
          dataTablePosWaterQuality.ajax.reload();
          if (result.response != "updated") {
            window.location.href = "/WaterQuality/Detail/" + result.response.id;
          }
          console.log(result);
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

window.saveWaterQuality = (form, evt) => {
  evt.preventDefault();

  var btnSubmit = $(form).find("button[type=submit]");

  $(form).parsley().validate();

  if ($(form).parsley().isValid()) {
    beforeLoadingButton(btnSubmit);
    var formData = new FormData();
    formData.append("Id", getValueById("Id"));
    formData.append("StationId", getValueById("StationId"));
    formData.append("QualityValue", getValueById("QualityValue"));
    formData.append("CreatedDate", getValueById("CreatedDate"));

    postData("/WaterQuality/SaveWaterQuality", formData)
      .then((res) => {
        let result = res.data;
        if (result.code == 200) {
          $("#modalCreateEditWq").modal("hide");
          showMessage("success", "Sukses!", result.message);
          dataTableWaterQuality.ajax.reload();
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

function deletePos(input, event) {
  var id = $(input).data("id");
  Swal.fire({
    title: "Hapus Kualitas Air",
    text: "Anda yakin untuk menghapus Pos Kualitas Air tersebut ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return deleteData("/WaterQuality/DeletePosWaterQuality/" + id)
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
        dataTablePosWaterQuality.ajax.reload();
      } else {
        showMessage("error", "Failed", result.value.data.message);
      }
    }
  });
}

window.deleteWq = (input, evt) => {
  evt.preventDefault();
  var id = $(input).data("id");

  Swal.fire({
    title: "Hapus Kualitas Air",
    text: "Anda yakin untuk menghapus Kualitas Air tersebut ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return deleteData("/WaterQuality/DeleteWaterQuality/" + id)
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
    if (result.isConfirmed) {
      if (result.value.data.code == 200) {
        $("#modalCreateEditWq").modal("hide");
        showMessage("success", "Sukses!", result.value.data.message);
        dataTableWaterQuality.ajax.reload();
      } else {
        showMessage("error", "Failed", result.value.data.message);
      }
    }
  });
};
