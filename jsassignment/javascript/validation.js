function validateEmail(){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var element=document.getElementById("email");
    if(element.value.match(mailformat)){
        return true;
    }
    else{
        alert("You have entered an invalid email address!");
        return false;
    }
}