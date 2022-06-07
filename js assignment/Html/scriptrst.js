var items = [{ "id": 1, "type": "main-course", "name": "Biryani", "cost": 300 },
{ "id": 2, "type": "main-course", "name": "Chicken65", "cost": 250 },
{ "id": 3, "type": "starter", "name": "Noodles", "cost": 80 },
{ "id": 4, "type": "starter", "name": "Burger", "cost": 100 },
{ "id": 5, "type": "starter", "name": "Pizza", "cost": 180 },
{ "id": 6, "type": "starter", "name": "Wrap", "cost": 120 },
{ "id": 7, "type": "main-course", "name": "Manchurian", "cost": 150 },
{ "id": 8, "type": "extra", "name": "French Fries", "cost": 120 }];
//console.log(items);
var tables = [{ "tableNo": "1", "itemNos": 0, "amount": 0, "itemIds": [] },
{ "tableNo": "2", "itemNos": 0, "amount": 0, "itemIds": [] },
{ "tableNo": "3", "itemNos": 0, "amount": 0, "itemIds": [] },
{ "tableNo": "4", "itemNos": 0, "amount": 0, "itemIds": [] },
{ "tableNo": "5", "itemNos": 0, "amount": 0, "itemIds": [] },
{"tableNo": "6", "itemNos": 0, "amount": 0, "itemIds": [] }];
//console.log(tables);


var array = [];
var count = [];

var key = 0;
var actModal = document.getElementsByClassName("modal-content")[0].innerHTML;

function loadPage() {
  for (var i = 0; i < tables.length; i++) {
    var div = document.createElement('div');
    div.id = i;
    div.className = "table";
    div.innerText = "Table-" + tables[i].tableNo ;
    div.addEventListener("dragover", allowDrop);
    div.addEventListener("drop", drop);
   div.addEventListener("click", function() {
    showBill(this);
      });

    var divInfo = document.createElement('div');
    divInfo.id = 'T' + (i + 1);
    divInfo.className = "info";

    divInfo.innerText = "Rs. " + tables[i].amount + " | Total items: " + tables[i].itemNos;
    div.appendChild(divInfo);
    document.getElementById('tableBox').appendChild(div);
  }

  for (var i = 0; i < items.length; i++) {
    var div = document.createElement('div');
    div.id = items[i].id;
    div.className = "items";
    
    div.innerText= items[i].name + " (Category: " + items[i].type + ")";
    div.setAttribute("draggable", true);
    div.addEventListener("dragover", allowDrop);
    div.addEventListener("dragstart", drag);
    
    var divInfo = document.createElement('div');
    divInfo.className = "info";
    divInfo.innerText = "Rs. " + items[i].cost;
    div.appendChild(divInfo);
    document.getElementById('itemBox').appendChild(div);
    div.addEventListener("click", function() {
      showTable(this);
    });
  }
}
function searchTable(){
    var input = document.getElementById("searchTable");
    var val = input.value.toUpperCase();
  
    for(var i = 0; i < tables.length; i++) {
      if(document.getElementsByClassName('table')[i].innerText.toUpperCase().indexOf(val) > -1){
        document.getElementsByClassName('table')[i].style.display = "block";
      }else {
        document.getElementsByClassName('table')[i].style.display = "none";
      }
    }
  }
  
  function searchFood(){
    var input = document.getElementById("searchFood");
    var val = input.value.toUpperCase();
    let x = document.getElementsByClassName('items');
    for(var i = 0; i < x.length; i++){
      if(x[i].innerHTML.toUpperCase().includes(val)){
            x[i].style.display = "block";
      // }else if (items[i].type.toUpperCase().indexOf(val) == 0){
      //   document.getElementsByClassName('items')[i].style.display = "block";
      } else{
           x[i].style.display = "none";
      }
    }
  }


function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    for (var i = 0; i < items.length; i++) {
      if(items[i].id == data) {
        tables[ev.target.id].amount += items[i].cost;
        tables[ev.target.id].itemNos += 1;
        break;
      }
    }
    tables[ev.target.id].itemIds.push(data);
    document.getElementById('T' + (parseInt(ev.target.id) + 1)).innerText = "Rs. " + tables[ev.target.id].amount + " | Total items: " + tables[ev.target.id].itemNos;
  }
  
function sortNumber(a,b) {
    return a - b;
  }
  
  function showBill(table) {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
  
    document.getElementById(table.id).style.backgroundColor = "#ffc04a";
    document.getElementById('T' + (parseInt(table.id) + 1)).style.backgroundColor = "#ffc04a";
  
    var top = document.getElementById('top');
    top.innerHTML = "Table-" + (parseInt(table.id) + 1) + " | Order Details";
  
    tables[table.id].itemIds.sort(sortNumber);
    var arr = tables[table.id].itemIds;
    var prev;
    array = [];
    count = [];
    for ( var i = 0; i < arr.length; i++ ) {
      if ( arr[i] !== prev ) {
          array.push(arr[i]);
          count.push(1);
      } else {
          count[count.length - 1]++;
      }
      prev = arr[i];
    }
    setData(table.id);
  
    //close
    span.onclick = function() {
      // document.getElementById(modalcontent).innerHTML = "";
      modal.style.display = "none";
      if(key == 1) {
        document.getElementsByClassName("modal-content")[0].innerHTML = actModal;
      }
      document.getElementById(table.id).style.backgroundColor = "white";
      document.getElementById('T' + (parseInt(table.id) + 1)).style.backgroundColor = "white";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        if(key == 1) {
          document.getElementsByClassName("modal-content")[0].innerHTML = actModal;
        }
        document.getElementById(table.id).style.backgroundColor = "white";
        document.getElementById('T' + (parseInt(table.id) + 1)).style.backgroundColor = "white";
      }
    }
  }
  
  
  function setData(id) {
    var tableData = document.getElementById("tableData");
    var c = "<tr style='font-weight:bold'><td>Item</td><td>Number of servings</td><td>Total Price</td></tr>";
    for(var i = 0; i < array.length; i++){
      c += "<tr><td>" + items[array[i]-1].name
        + "</td><td><input type='number' id='input-"+i+"-table-"+id+"' onchange='change(event)' value = "
        + count[i] + "></input></td><td><span id='totCost-"+i+"'>"
        + (count[i] * items[array[i]-1].cost) + "</span></td></tr>";
    }
  
    tableData.innerHTML =
        "<div class='modaldiv'><table style='width:100%'>" + c + "</table><h4> Total Amount : Rs. "
        + tables[id].amount
        + "</h4><button id='final' onclick='bill(" + id + ")'>Generate Bill/Close Session</button></div>";
  
  }
  
  
  function change(ev){
    var data = ev.target.id;
    var myarray = data.split('-');
    var i = myarray[1];
    var id = myarray[3];
    var item = items[array[i]-1];
    var input =  document.getElementById(ev.target.id).value;
    if(input <= 0) {
      var check = confirm("Are you sure you want to remove "+item.name+" from bill?");
      if(!check) {
        setData(id);
        return;
      }
      array.splice(i, 1);
      count.splice(i,1);
    } else {
      count[i] = input;
    }
  
    tables[id].amount = 0;
    tables[id].itemNos = 0;
    tables[id].itemIds = [];
    for(var itm = 0; itm < array.length; itm++){
      tables[id].itemNos += parseInt(count[itm]);
      tables[id].amount += count[itm] * items[array[itm]-1].cost;
      for(var x = 0; x < count[itm]; x++) {
        tables[id].itemIds.push(array[itm]);
      }
    }
    document.getElementById('T' + (parseInt(id) + 1)).innerText = "Rs. " + tables[id].amount
      + " | Total items: "+ tables[id].itemNos;
  
    setData(id);
  }
  
  function bill(id){
    var modal = document.getElementsByClassName("modal-content")[0];
  
    modal.style.textAlign = "bottom";
    var title = "<h3>Bill for Table-"+(id+1)+"</h3>";
    var c = "<tr style='font-weight:bold'><td>Item</td><td>quantity</td><td>Total Price</td></tr>";
    for(var i = 0; i < array.length; i++){
      c += "<tr><td>" + items[array[i]-1].name + "</td><td>" + count[i]
        + "</td><td><span id='totCost-"+i+"'>" + (count[i] * items[array[i]-1].cost) + "</span></td></tr>";
  }
  
    modal.innerHTML = title + "<table style='width:100%'>" + c + "</table><h4> <b>Total Amount : Rs. "
      + tables[id].amount + "</b></h4>";
    tables[id].itemNos = 0;
    tables[id].amount = 0;
    tables[id].itemIds = [];
    document.getElementById('T'+ (parseInt(id)+1)).innerText="Rs. "+tables[id].amount +" | Total items: "+tables[id].itemNos;
    array = [];
    count = [];
    key = 1;
  }
  
  function reload(){
    var container = document.getElementsByClassName("modal-content")[0];
    var content = container.innerHTML;
    container.innerHTML= content;
  }
  
  
  
  
  
  
  
  