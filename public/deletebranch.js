function deleteBranch(Id){
    $.ajax({
        url: '/branch/' + Id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
