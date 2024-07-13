var dataTableApi;
console.log("this is api");
var TabelApi = (function () {
  var initData = function () {
    $("#length-station-table").change(function () {
      dataTableApi.page.len($(this).val()).draw();
    });
  };

  var initDataTable = function () {
    dataTableApi = $("#table-api").DataTable({
      processing: true,
      serverSide: true,
      dom: "tipr",
      order: [],
      ajax: {
        url: "/Api/GetDatatableStation",
        type: "POST",
        dataType: "JSON",
        data: function (d) {
          d.draw = d.draw || 1;
          d.start = d.start || 0;
          d.length = d.length || 10;
        },
      },
      columns: [
        { data: null },
        { data: "name", name: "Name" },
        {
          data: "type",
          name: "Type",
          render: function (data, type, row) {
            let stationType = "";
            if (data == "AWLR") {
              stationType =
                '<span class="badge bg-soft-blue text-blue rounded-1 shadow-sm px-1" style="padding: 0.3rem 0.1rem;">Pos Duga Air</span>';
            } else if (data == "ARR") {
              stationType =
                '<span class="badge bg-soft-success text-success rounded-1 shadow-sm px-1" style="padding: 0.3rem 0.1rem;">Pos Curah Hujan</span>';
            } else if (data == "AWLR_ARR") {
              stationType =
                '<span class="badge bg-soft-warning text-warning rounded-1 shadow-sm px-1" style="padding: 0.3rem 0.1rem;">PDA & PCH</span>';
            } else if (data == "AWS") {
              stationType =
                '<span class="badge bg-soft-danger text-danger rounded-1 shadow-sm px-1" style="padding: 0.3rem 0.1rem;">Pos Klimatologi</span>';
            } else {
              stationType = "";
            }

            return stationType;
          },
        },
        { data: "deviceId", name: "DeviceId" },
        {
          render: function (data, type, row) {
            const baseUrl =
              "https://api.higertech.com/v2/reading/device/" + row.deviceId;
            if (row.type == "AWLR_ARR") {
              return `  <a href="${baseUrl}" target="_blank">${baseUrl}</a>
                        <br>
                        <a href="${baseUrl}?sensor=awlr" target="_blank">${baseUrl}?sensor=awlr</a>
                        <br>
                        <a href="${baseUrl}?sensor=arr" target="_blank">${baseUrl}?sensor=arr</a>
                        `;
            } else {
              return `<a href="${baseUrl}" target="_blank">${baseUrl}</a>`;
            }
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
        // {
        //   targets: -1,
        //   searchable: false,
        //   orderable: false,
        //   width: "18%",
        //   className: "text-center",
        // },
      ],
      language: {
        url: "/data/datatable_locale_id.json",
        paginate: {
          previous: "<i class='mdi mdi-chevron-left'>",
          next: "<i class='mdi mdi-chevron-right'>",
        },
      },
      drawCallback: function () {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
      },
    });
    dataTableApi.on("draw.dt", function () {
      var info = dataTableApi.page.info();
      dataTableApi
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
      initData();
      initDataTable();
    },
  };
})();

jQuery(document).ready(function () {
  TabelApi.init();
});
