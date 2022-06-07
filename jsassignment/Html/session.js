clickCountingLocal=()=>{
    if(localStorage.clickcount){
        localStorage.clickcount=Number(localStorage.clickcount)+1;
    }
    else{
        localStorage.clickcount=1;
    }
    document.getElementById("local-storage").innerHTML="You have clicked the button " + localStorage.clickcount + " time(s)."; 
}
clickCountingSession=()=>{
    if (sessionStorage.clickcount) {
    sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
} else {
    sessionStorage.clickcount = 1;
}
document.getElementById("session-storage").innerHTML = "You have clicked the button " +
sessionStorage.clickcount + " time(s) in this session.";
}