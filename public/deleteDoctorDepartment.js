function deleteDoctorDepartment(DocId, DepartId){
  $.ajax({
      url: '/doctor_department/DocId/' + DocId + '/DepartId/' + DepartId,
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
