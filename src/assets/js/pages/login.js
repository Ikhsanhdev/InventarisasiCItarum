"use strict";

var LoginPage = function () {

    var initInput = function(){
        $('.parsley-validation').parsley();
    }

    return {
        //main function to initiate the module
        init: function () {
            initInput();
        },

    };

}();

jQuery(document).ready(function () {
    LoginPage.init();
});

window.login = (form, evt) => {
    evt.preventDefault();

    $('.parsley-custom').remove();

    var btnSubmit = $(form).find("button[type=submit]");
    
    $(form).parsley().validate();

    if ($(form).parsley().isValid()){
        beforeLoadingButton(btnSubmit, 'Proses Login...');
        var formData = new FormData();
        formData.append("Username", getValueById('Username'));
        formData.append("Password", getValueById('Password'));
        
        postData('/Account/Login', formData).then(res => {
            let result = res.data.metaData;
            console.log(result);
            if (result.code == 200) {
                // location.reload();
                window.location.href = '/';
            } else if (result.code == 401) {
                $('#error-password').fadeIn(300);
                $('#error-password').html(`<ul class="parsley-errors-list filled parsley-custom" aria-hidden="false"><li class="parsley-required">${result.message}</li></ul>`);
            } else if (result.code == 404) {
                $('#error-username').fadeIn(300);
                $('#error-username').html(`<ul class="parsley-errors-list filled parsley-custom" aria-hidden="false"><li class="parsley-required">${result.message}</li></ul>`);
            } else{
                showMessage('error', 'Login Gagal', result.message)
            }

            if (result.code != 200) {
                afterLoadingButton(btnSubmit, 'Login <i class="fe-log-in ms-1">');
            }

        }).catch(err => {
            console.log(err);
            afterLoadingButton(btnSubmit, 'Login <i class="fe-log-in ms-1">');
        });
    }
}