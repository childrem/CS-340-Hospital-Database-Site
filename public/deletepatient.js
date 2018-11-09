function deletePatient(Id){
    $.ajax({
        url: '/patient/' + Id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
