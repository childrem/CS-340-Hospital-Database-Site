function deleteBranch(Id){
    $.ajax({
        url: '/branch/' + Id,
        type: 'DELETE',
        success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
};
        
        /*
        success: function(result){
            window.location.reload(true);
        }
    })
};
*/
