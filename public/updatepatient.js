function updatePatient(id){
    $.ajax({
        url: '/patient/' + id,
        type: 'PUT',
        data: $('#update_patient').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
