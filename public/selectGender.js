function selectGender(id){
    //$("#gender-dropdown").val(id);
    document.getElementById("gender-dropdown").value = id;
    console.log(id);
    console.log(document.getElementById("gender-dropdown").value);
}
