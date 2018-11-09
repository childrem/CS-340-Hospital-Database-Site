function deleteDoctorBranch(BId, DocId){
  $.ajax({
      url: '/doctor_branch/BId/' + BId + '/DocId/' + DocId,
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
