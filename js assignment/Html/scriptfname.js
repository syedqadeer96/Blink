
document.getElementById('signup').addEventListener('submit',(event)=>{
    var FName=document.getElementById('firstName').value;
    var LName=document.getElementById('lastName').value;
    console.log(FName.charAt(0)+LName.charAt(0));
   alert(FName.charAt(0)+LName.charAt(0));
    event.preventDefault();
})