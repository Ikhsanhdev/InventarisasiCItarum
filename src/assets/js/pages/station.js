"use strict";

var dtStation;
var currentYear = new Date().getFullYear();

var DataStation = function () {

    var initInput = function() {
        if(stationId == null) {
            $('#form-device-id').hide();
        } else {
            $('#form-device-id').show();
        }
        
        $('input[name="IsNewDevice"]').change(function() {
            // Get the value of the checked radio button
            var selectedValue = $('input[name="IsNewDevice"]:checked').val();
            if(selectedValue == 'false') {
                $('#form-device-id').fadeIn(300);
                $('#DeviceId').attr('required', true);
            } else {
                $('#form-device-id').fadeOut(300);
                $('#DeviceId').attr('required', false);
            }
        });

        loadAdditionalForm()
        $('.parsley-validation').parsley();
        $('.selectize-parsley').on('change', function() {
            // Clear the error message associated with this input
            var parsleyInstance = $(this).parsley();
            parsleyInstance.removeError('required', {updateClass: true});
        });
        $('#search-station-table').keyup(function(){
            dtStation.search($(this).val()).draw() ;
        });
        $('#length-station-table').change( function() { 
            dtStation.page.len( $(this).val() ).draw();
        });

        $(".filter_station").change(function() {
            dtStation.ajax.reload();
        });

        if ($('[data-plugins="dropify"]').length > 0) {
            $('[data-plugins="dropify"]').dropify({
                messages: {
                    'default': 'Upload Foto',
                    'replace': 'Upload Foto',
                    'remove': 'Hapus',
                    'error': 'Ooops, something wrong appended.',
                },
                fileSize: '2M',
                error: {
                    'fileSize': 'Ukuran file terlalu besar (maksimal 2MB).'
                }
            });
        }

        $("#Type").on("change", function() {
            loadAdditionalForm();
        });

        $("#BrandCode").on("change", function() {
            if($(this).val().toLowerCase() == 'b001') {
                $('#form-device-id').fadeOut(300);
                $('#form-confirm-device').fadeIn(300);
            } else {
                $('#form-device-id').fadeIn(300);
                $('#form-confirm-device').fadeOut(300);
            }
        });

        // $('.input-double').on('input', function() {
        //     // Get the current input value
        //     var inputValue = $(this).val();
    
        //     // Use a regular expression to match numbers and the decimal point
        //     var validInput = inputValue.replace(/[^0-9.]/g, '');
    
        //     // Set the input value to the valid characters
        //     $(this).val(validInput);
        // });

        window.Parsley.addValidator('siaga1', {
            validateString: function(value, requirements) {
                var siaga2Value = $('.input-siaga2').val();
                if(siaga2Value == null || siaga2Value == '') {
                    return false;
                }

                return parseFloat(value) > parseFloat(siaga2Value);
            },
            messages: {
                en: 'Nilai Siaga 1 harus lebih besar dari Siaga 2'
            }
        });

        window.Parsley.addValidator('siaga2', {
            validateString: function(value, requirements) {
                var siaga1Value = $('.input-siaga1').val();
                var siaga3Value = $('.input-siaga3').val();

                if(siaga1Value == null || siaga1Value == '') {
                    return false;
                } else if(siaga3Value == null || siaga3Value == '') {
                    return false;
                }

                return (parseFloat(value) < parseFloat(siaga1Value) || parseFloat(value) > parseFloat(siaga3Value));
            },
            messages: {
                en: 'Nilai Siaga 2 harus lebih besar dari Siaga 3 dan lebih kecil dari Siaga 1'
            }
        });

        window.Parsley.addValidator('siaga3', {
            validateString: function(value, requirements) {
                var siaga2Value = $('.input-siaga2').val();
                if(siaga2Value == null && siaga2Value == '') {
                    return false;
                }

                return parseFloat(value) < parseFloat(siaga2Value);
            },
            messages: {
                en: 'Nilai Siaga 3 harus lebih kecil dari Siaga 2'
            }
        });

        window.Parsley.addValidator('double', {
            validateString: function(value) {
                // Use a regular expression to check if the value is a double
                return /^-?\d*(\.\d+)?$/.test(value);
            },
            messages: {
                en: 'Format angka tidak valid. Contoh: 0.5',
            }
        });

        // Define custom validators for latitude and longitude
        window.Parsley.addValidator('latitude', {
            validateString: function(value) {
                // Define a regex to validate latitude (e.g., -90.0 to 90.0)
                var regex = /^-?([0-8]?[0-9]|90)(\.\d{1,16})?$/;
                return regex.test(value);
            },
            messages: {
                en: 'Format latitude tidak valid. Contoh: -0.9767567',
            },
        });

        window.Parsley.addValidator('longitude', {
            validateString: function(value) {
                // Define a regex to validate longitude (e.g., -180.0 to 180.0)
                var regex = /^-?((1[0-7][0-9]|[0-9]{1,2})(\.\d{1,16})?|180(\.0{1,6})?)$/;
                return regex.test(value);
            },
            messages: {
                en: 'Format longitude tidak valid. Contoh: 117.3422262',
            },
        });

        if($('#BuiltYear').length > 0 && $('#RenovationYear').length > 0) {
            $('#BuiltYear, #RenovationYear').datepicker({
                autoclose: true,
                format: 'yyyy',
                startView: 2,
                minViewMode: 2,
                endDate: new Date()
            });
        }

        if($('#InstalledDate').length > 0) {
            $('#InstalledDate').flatpickr({
                dateFormat: "Y-m-d",
                maxDate: new Date()
            });
        }

        $("#RiverAreaId").on("change", function() {
            var watershed_id = $('#WatershedId')[0].selectize;
            watershed_id.setValue(null);
            watershed_id.clearOptions();
            watershed_id.disable();
            watershed_id.$control_input.attr('placeholder', 'Loading...');
            var river_area_id = $(this).val();

            getData(`/Watershed/GetAllByRiverAreaId/${river_area_id}`).then(res => {
                let result = res.data
                if (result.code == 200) {
                    $.each(result.response, function (key, value) {
                        watershed_id.addOption({value: value.id, text: value.name});
                    });                    
                }
                watershed_id.enable();
                watershed_id.$control_input.attr('placeholder', 'Pilih Daerah Aliran Sungai...');
            }).catch(err => {
                let error = err.response.data
                if(!error.success) {
                    alert(error.message)
                }
            })
        });

        $("#ProvinceId").on("change", function() {
            var regency_id = $('#RegencyId')[0].selectize;
            regency_id.setValue(null);
            regency_id.clearOptions();
            regency_id.disable();
            regency_id.$control_input.attr('placeholder', 'Loading...');
            var province_id = $(this).val();

            getData(`/Global/GetRegencyByProvinceId/${province_id}`).then(res => {
                let result = res.data
                if (result.code == 200) {
                    $.each(result.response, function (key, value) {
                        regency_id.addOption({value: value.id, text: value.name});
                    });  
                }
                regency_id.enable();
                regency_id.$control_input.attr('placeholder', 'Pilih Kota / Kabupaten...');
            }).catch(err => {
                let error = err.response.data
                if(!error.success) {
                    alert(error.message)
                }
            })
        });

        $("#RegencyId").on("change", function() {
            var district_id = $('#DistrictId')[0].selectize;
            district_id.setValue(null);
            district_id.clearOptions();
            district_id.disable();
            district_id.$control_input.attr('placeholder', 'Loading...');
            var regency_id = $(this).val();

            getData(`/Global/GetDistrictByRegencyId/${regency_id}`).then(res => {
                let result = res.data
                if (result.code == 200) {
                    $.each(result.response, function (key, value) {
                        district_id.addOption({value: value.id, text: value.name});
                    });  
                }
                district_id.enable();
                district_id.$control_input.attr('placeholder', 'Pilih Kecamatan...');
            }).catch(err => {
                let error = err.response.data
                if(!error.success) {
                    alert(error.message)
                }
            })
        });

        $("#DistrictId").on("change", function() {
            var village_id = $('#VillageId')[0].selectize;
            village_id.setValue(null);
            village_id.clearOptions();
            village_id.disable();
            village_id.$control_input.attr('placeholder', 'Loading...');
            var district_id = $(this).val();

            getData(`/Global/GetVillageByDistrictId/${district_id}`).then(res => {
                let result = res.data
                if (result.code == 200) {
                    $.each(result.response, function (key, value) {
                        village_id.addOption({value: value.id, text: value.name});
                    });  
                }
                village_id.enable();
                village_id.$control_input.attr('placeholder', 'Pilih Kelurahan / Desa...');
            }).catch(err => {
                let error = err.response.data
                if(!error.success) {
                    alert(error.message)
                }
            })
        });
    }

    var initDataTable = function () {

        dtStation = $("#table-station").DataTable({
            processing: true,
            serverSide: true,
            dom: 'tipr',
            order: [],
            ajax: {
                url: "/Station/GetDatatableStation",
                type: "POST",
                dataType: "JSON",
                data: function (data) {
                    data.watershed_id = getValueById('filter_watershed');
                    data.brand_code = getValueById('filter_brand');
                    data.type = getValueById('filter_type');
                    data.device_status = getValueById('filter_device_status');
                }
            },
            columns: [
                { data: null},
                { 
                    data: "name",
                    name: "Name",
                    render: function (data, type, row) {    
                        var stationImage = "/images/default-pu.png";

                        if(row.photo !== null) {
                            stationImage = `/uploads/images/stations/${row.photo}`;
                        }

                        let stationType = '';

                        if(row.type == 'AWLR') {
                            stationType = '<span class="badge bg-soft-blue text-blue rounded-1 shadow-sm px-1" style="padding: 0.3rem 0.1rem;">Pos Duga Air</span>';
                        } else if(row.type == 'ARR') {
                            stationType = '<span class="badge bg-soft-success text-success rounded-1 shadow-sm px-1" style="padding: 0.3rem 0.1rem;">Pos Curah Hujan</span>';
                        } else if(row.type == 'AWLR_ARR') {
                            stationType = '<span class="badge bg-soft-warning text-warning rounded-1 shadow-sm px-1" style="padding: 0.3rem 0.1rem;">PDA & PCH</span>';
                        } else if(row.type == 'AWS') {
                            stationType = '<span class="badge bg-soft-danger text-danger rounded-1 shadow-sm px-1" style="padding: 0.3rem 0.1rem;">Pos Klimatologi</span>';
                        } else {
                            stationType = '';
                        }

                        return `<div class="d-flex align-items-start">
                                <a class="image-popup-single" href="${stationImage}" title="${row.name}" style="cursor: zoom-in;">
                                    <img src="${stationImage}" class="me-2 rounded" height="42" width="42" alt="${row.name}">
                                </a>
                            <div>
                                <h5 class="mt-0 font-13" style="margin-bottom: 0.3rem;">
                                    <a href="/Station/Detail/${row.slug}" target="_blank" class="text-reset">${data}</a>
                                </h5>
                                ${stationType}
                            </div>
                        </div>`;
                    } 
                },
                { 
                    data: "watershedName",
                    name: "WatershedName",
                    render: function (data, type, row) {
                       
                        return data;
                    } 

                },
                { 
                    data: "brandName",
                    name: "BrandName",
                    render: function (data, type, row) {
                       
                        return data;
                    } 

                },
                { 
                    data: "deviceId", name: "DeviceId"
                },
                { data: "lastReadingAt", name: "LastReadingAt" },
                { 
                    data: "deviceStatus", 
                    name: "DeviceStatus", 
                    render: function (data, type, row) {
                        let status = `<p class="mt-1 mb-0 text-muted font-12">
                            <small class="mdi mdi-circle text-danger m-0"></small> Offline
                        </p>`;

                        if (row.lastReadingAt != null && data == 'online') {
                            status = `<p class="mt-1 mb-0 text-muted font-12">
                                <small class="mdi mdi-circle text-success m-0"></small> Online
                            </p>`
                        }

                        return status;
                    }
                },
                { 
                    render: function (data, type, row) {
                       
                        // return `<div class="btn-group dropdown">
                        //         <a href="javascript: void(0);" class="table-action-btn dropdown-toggle arrow-none btn btn-blue btn-sm" data-bs-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-vertical"></i></a>
                        //         <div class="dropdown-menu dropdown-menu-end customDropdown">
                        //             <a class="dropdown-item font-14" href="#"><i class="mdi mdi-eye me-2 text-muted vertical-middle"></i>Lihat Detail</a>
                        //             <a class="dropdown-item font-14" href="/Station/${row.id}/Edit"><i class="mdi mdi-square-edit-outline me-2 text-muted vertical-middle"></i>Edit</a>
                        //             <a class="dropdown-item font-14" href="#"><i class="mdi mdi-delete me-2 text-muted vertical-middle" data-id="${row.id}" onclick="deleteStation(this, event)"></i>Hapus</a>
                        //         </div>
                        //     </div>`;

                        // <a href="/Station/${row.id}/Edit" class="btn btn-xs btn-success rounded-2 me-1"><i class="mdi mdi-square-edit-outline"></i></a>`;

                        var actionBtn = `<div class="btn-group dropdown">
                                <a href="javascript: void(0);" class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-sm" data-bs-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></a>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <a class="dropdown-item" href="/station/detail/${row.slug}" target="_blank"><i class="mdi mdi-eye me-2 text-muted font-18 vertical-middle"></i>Lihat Detail</a>
                                    <a class="dropdown-item" href="/station/${row.id}/edit"><i class="mdi mdi-square-edit-outline me-2 text-muted font-18 vertical-middle"></i>Edit</a>
                                    <a class="dropdown-item" href="#"><i class="mdi mdi-delete me-2 text-muted font-18 vertical-middle"></i>Hapus</a>
                                </div>
                            </div>`;

                        if(row.brandCode != 'B001') {
                            // actionBtn += `<button type="button" class="btn btn-xs btn-danger rounded-2" data-id="${row.id}" onclick="deleteStation(this, event)"><i class="mdi mdi-delete"></i></button>`;
                            actionBtn += `<button type="button" class="btn btn-xs btn-danger rounded-2" data-id="${row.id}" onclick="showMessage('info', 'Mohon Maaf', 'Fitur sedang dalam pengembangan.');"><i class="mdi mdi-delete"></i></button>`;
                        }

                        return actionBtn;
                    } 
                }
            ],
            columnDefs: [
                {
                    targets: 0,
                    searchable: false,
                    orderable: false,
                    width: '6%',
                    className: "text-center",
                },
                {
                    targets: 5,
                    render: function (data) {
                        const currentDate = moment().format('YYYY-MMM-DD'); 

                        if(data != null) {
                            if(moment(data).format("YYYY-MMM-DD") == currentDate) {
                                return `Hari Ini <span class="text-muted">${moment(data).format("HH:mm")}</span>`;
                            } else {
                                return `${moment(data).locale('id').format("D-MMM-YYYY")} <span class="text-muted">${moment(data).format("HH:mm")}</span>`;
                            }
                        }

                        return null;
                    },
                },
                {
                    targets: -1,
                    searchable: false,
                    orderable: false,
                    // width: '20%',
                    className: "text-center"
                },
            ],
            language: {
                url: '/data/datatable_locale_id.json',
                paginate: {
                    previous: "<i class='mdi mdi-chevron-left'>",
                    next: "<i class='mdi mdi-chevron-right'>"
                }
            },
            drawCallback: function () {
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
                initPopupImage();
            }
        });
    
        dtStation.on('draw.dt', function () {
            var info = dtStation.page.info();
            dtStation.column(0, { search: 'applied', order: 'applied', page: 'applied' }).nodes().each(function (cell, i) {
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

}();

jQuery(document).ready(function () {
    DataStation.init();
});

function loadAdditionalForm() {
    var type = $('#Type').val();
    if(type == 'AWLR' || type == 'AWLR_ARR') {
        var formData = new FormData();
        if(stationId == null) {
            formData.append("stationId", "");
            formData.append("deviceId", "");
        } else {
            formData.append("stationId", stationId);
            formData.append("deviceId", getValueById('DeviceId'));
        }
        postData('/Station/GetAwlrStationForm', formData).then(res => {
            let result = res.data;
            $("#form-awlr").html(result);
        });
    } else if(type == 'AWS') {
        $("#form-awlr").empty();
        var formData = new FormData();
        if(stationId == null) {
            formData.append("stationId", "");
            formData.append("deviceId", "");
        } else {
            formData.append("stationId", stationId);
            formData.append("deviceId", getValueById('DeviceId'));
        }
        postData('/Station/GetAwsStationForm', formData).then(res => {
            let result = res.data;
            $("#form-aws").html(result);
        });
    } else {
        $("#form-awlr, #form-aws").empty();
    }
}

function resetFilter() {
    var filter_watershed = $('#filter_watershed')[0].selectize;
    var filter_brand = $('#filter_brand')[0].selectize;
    var filter_type = $('#filter_type')[0].selectize;
    var filter_device_status = $('#filter_device_status')[0].selectize;
    filter_watershed.setValue('all');
    filter_brand.setValue('all');
    filter_type.setValue('all');
    filter_device_status.setValue('all');
}

function initPopupImage() {
    $(".image-popup-single").magnificPopup({
        type: "image",
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: "mfp-with-zoom mfp-img-mobile",
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return item.el.attr("title");
            }
        },
        zoom: {
            enabled: true,
            duration: 300,
            opener: function(element) {
                return element.find("img");
            }
        }
    });
}

window.createStation = (btnSubmit, evt) => {
    evt.preventDefault();
    $('#form-create').parsley().validate();

    if ($('#form-create').parsley().isValid()) {
        beforeLoadingButton($(btnSubmit), 'Menyimpan Data Pos...');

        var formData = new FormData();

        // Informasi Pos
        let station_image = document.querySelector('#StationImage');
        formData.append("StationImage", station_image.files[0] ? station_image.files[0] : null);
        formData.append("StationName", getValueById('Name'));
        formData.append("StationType", getValueById('Type'));
        formData.append("NoRegister", getValueById('NoRegister'));
        formData.append("Elevation", getValueById('Elevation'));
        formData.append("RiverAreaId", getValueById('RiverAreaId'));
        formData.append("WatershedId", getValueById('WatershedId'));
        formData.append("BuiltBy", getValueById('BuiltBy'));
        formData.append("BuiltYear", getValueById('BuiltYear'));
        formData.append("RenovationBy", getValueById('RenovationBy'));
        formData.append("RenovationYear", getValueById('RenovationYear'));
        formData.append("Note", getValueById('Note'));

        // Location
        formData.append("Latitude", getValueById('Latitude'));
        formData.append("Longitude", getValueById('Longitude'));
        formData.append("ProvinceId", getValueById('ProvinceId'));
        formData.append("RegencyId", getValueById('RegencyId'));
        formData.append("DistrictId", getValueById('DistrictId'));
        formData.append("VillageId", getValueById('VillageId'));
        formData.append("TimeZone", timeZone1);

        // Device ID
        formData.append("BrandCode", getValueById('BrandCode'));
        formData.append("IsNewDevice", $('input[name="IsNewDevice"]:checked').val());
        formData.append("DeviceId", getValueById('DeviceId'));
        formData.append("NoGsm", getValueById('NoGsm'));
        formData.append("InstalledDate", getValueById('InstalledDate'));
        formData.append("Calibration", getValueById('Calibration'));

        if(getValueById('Type') == 'AWLR' || getValueById('Type') == 'AWLR_ARR') {
            formData.append("UnitSensor", getValueById('UnitSensor'));
            formData.append("UnitDisplay", getValueById('UnitDisplay'));
            // Debit & Peilschaal
            formData.append("Siaga1", getValueById('Siaga1'));
            formData.append("Siaga2", getValueById('Siaga2'));
            formData.append("Siaga3", getValueById('Siaga3'));
            formData.append("KonstantaA", getValueById('KonstantaA'));
            formData.append("KonstantaB", getValueById('KonstantaB'));
            formData.append("PeilschaalBasisValue", getValueById('PeilschaalBasisValue'));
            formData.append("PeilschaalBasisElevation", getValueById('PeilschaalBasisElevation'));
            if(organizationCategory == 'Bendung') {
                formData.append("HeightMercu", getValueById('HeightMercu'));
            }
        } else if(getValueById('Type') == 'AWS') {
            // Sensor Data
            var selectedSensors = [];
            var i = 0;
            $('input[name="sensor[]"]:checked').each(function() {
                formData.append(`Sensor[${i}]`, $(this).val());
                i++;
            });
        }
        
        postData('/Station/Create', formData).then(res => {
            let result = res.data;
            if (result.code == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Data Pos berhasil disimpan.',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                }).then((confirm) => {
                    if (confirm.isConfirmed) {
                        window.location.href = '/Station';
                    }
                });
            } else{
                showMessage('error', 'Perhatian!', result.message)
            }
            afterLoadingButton($(btnSubmit), 'Simpan Data Pos');
        }).catch(err => {
            console.log(err);
            afterLoadingButton($(btnSubmit), 'Simpan Data Pos');
        });
    }
}

window.updateStation = (btnSubmit, evt) => {
    evt.preventDefault();
    $('#form-create').parsley().validate();

    if ($('#form-create').parsley().isValid()) {
        beforeLoadingButton($(btnSubmit), 'Menyimpan Data Pos...');

        var formData = new FormData();

        // Informasi Pos
        formData.append("Id", getValueById('Id'));
        let station_image = document.querySelector('#StationImage');
        formData.append("StationImage", station_image.files[0] ? station_image.files[0] : null);
        formData.append("StationName", getValueById('Name'));
        formData.append("StationType", getValueById('Type'));
        formData.append("NoRegister", getValueById('NoRegister'));
        formData.append("Elevation", getValueById('Elevation'));
        formData.append("RiverAreaId", getValueById('RiverAreaId'));
        formData.append("WatershedId", getValueById('WatershedId'));
        formData.append("BuiltBy", getValueById('BuiltBy'));
        formData.append("BuiltYear", getValueById('BuiltYear'));
        formData.append("RenovationBy", getValueById('RenovationBy'));
        formData.append("RenovationYear", getValueById('RenovationYear'));
        formData.append("Note", getValueById('Note'));

        // Location
        formData.append("Latitude", getValueById('Latitude'));
        formData.append("Longitude", getValueById('Longitude'));
        formData.append("ProvinceId", getValueById('ProvinceId'));
        formData.append("RegencyId", getValueById('RegencyId'));
        formData.append("DistrictId", getValueById('DistrictId'));
        formData.append("VillageId", getValueById('VillageId'));
        formData.append("TimeZone", timeZone1);

        // Device ID
        formData.append("BrandCode", getValueById('BrandCode'));
        formData.append("IsNewDevice", $('input[name="IsNewDevice"]:checked').val());
        formData.append("DeviceId", getValueById('DeviceId'));
        formData.append("NoGsm", getValueById('NoGsm'));
        formData.append("InstalledDate", getValueById('InstalledDate'));
        formData.append("Calibration", getValueById('Calibration'));

        if(getValueById('Type') == 'AWLR' || getValueById('Type') == 'AWLR_ARR') {
            formData.append("UnitSensor", getValueById('UnitSensor'));
            formData.append("UnitDisplay", getValueById('UnitDisplay'));
            // Debit & Peilschaal
            formData.append("Siaga1", getValueById('Siaga1'));
            formData.append("Siaga2", getValueById('Siaga2'));
            formData.append("Siaga3", getValueById('Siaga3'));
            formData.append("KonstantaA", getValueById('KonstantaA'));
            formData.append("KonstantaB", getValueById('KonstantaB'));
            formData.append("PeilschaalBasisValue", getValueById('PeilschaalBasisValue'));
            formData.append("PeilschaalBasisElevation", getValueById('PeilschaalBasisElevation'));
            if(organizationCategory == 'Bendung') {
                formData.append("HeightMercu", getValueById('HeightMercu'));
            }
        } else if(getValueById('Type') == 'AWS') {
            // Sensor Data
            var selectedSensors = [];
            var i = 0;
            $('input[name="sensor[]"]:checked').each(function() {
                formData.append(`Sensor[${i}]`, $(this).val());
                i++;
            });
        }
        
        postData('/Station/Update', formData).then(res => {
            let result = res.data;
            if (result.code == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Data Pos berhasil diubah.',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                }).then((confirm) => {
                    if (confirm.isConfirmed) {
                        window.location.href = '/Station';
                    }
                });
            } else{
                showMessage('error', 'Perhatian!', result.message)
            }
            afterLoadingButton($(btnSubmit), 'Simpan Perubahan');
        }).catch(err => {
            console.log(err);
            afterLoadingButton($(btnSubmit), 'Simpan Perubahan');
        });
    }
}