/**
 * Created by xavi on 26/1/16.
 */

$(function(){
    $('#order-select').on('change', function() {
        var action = $('#order-form').attr('action');
        if ($(this).val() == ''){
            return false;
        }
        window.location = action.indexOf('?') === -1 ? action + '?o=' + $(this).val() : action + '&o=' + $(this).val();
    });

    $('#search-form').on('submit', function(e){
        if($("#q").val() == "") {
            return false;
        }
    });

    $('form.contact').on('submit', function(e){
        e.preventDefault();

        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: $(this).serialize()
        })
            .done(function (data) {
                if (typeof data.message !== 'undefined') {
                    $('#contact_success').show();
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (typeof jqXHR.responseJSON !== 'undefined') {
                    if (jqXHR.responseJSON.hasOwnProperty('form')) {
                        $('#form_body').html(jqXHR.responseJSON.form);
                    }

                    $('.form_error').html(jqXHR.responseJSON.message);

                } else {
                    alert(errorThrown);
                }

            });
    });


    $('#range-slider').on('change', function(){
        var value = $('#range-slider').val(),
            actual_url = $('#order-form').attr('action');
        if (actual_url.indexOf('precio') > -1){
            actual_url = actual_url.replace(/precio=\d+-\d+/g, "");
        }
        actual_url = actual_url.replace(/\/\s*$/, "");
        var url = actual_url + '/precio=' + value[0] + "-" + value[1];
        window.location = url;
    });
});
