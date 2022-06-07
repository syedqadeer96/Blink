var dataArray = {};
const addForm = document.querySelector('.add-form');
let globalID = 8;

fetch("../images.json")
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data)
    dataArray=data;
})

function loadData(){
    let images=''
    dataArray.map((image)=>{
        images+=`
        <img src="${image.url}" alt="x">`
    });
    document.querySelector('.grid').innerHTML=images
}


function loadCards() {
    
    let date = new Date();
    let today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    let images = ''
    dataArray.map((image) => {
        images += `
        <div class="card" style="visibility:true">
            <img src="${image.url}" alt="image">
            <div class="container">
                <h4><b>${image.name}</b></h4>
                <p>${image.information} ${image.uploadedDate}</p>
                <div class="card-buttons">
                    <button class="btn"><i class="fa fa-edit" onclick="editImage(event)"></i></button>
                    <button class="btn"><i class="fa fa-trash" onclick="deleteImage(event)"></i></button>                                        
                </div>
                
            </div>
        </div>
        `
    });
    document.querySelector('#card').innerHTML = images;
}

function addImage(e){
    
        e.preventDefault();     
    const name = document.querySelector('#new-name');
    const url = document.querySelector('#new-url');
    const information = document.querySelector('#new-information');
    
    let date = new Date();
    let today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    let obj = {
        "id": globalID,
        "url": `${url.value}`,
        "name": `${name.value}`,
        "information": `${information.value}`,
        "uploadedDate": `${today}`
    };

    globalID++;
    console.log(globalID);
    console.log(obj.id);
    console.log(obj.url);
    console.log(dataArray)
    dataArray.push(obj);
    console.log(dataArray)
    console.log(name);
    // name.value = '';
    // url.value = '';
    // information.value = '';
    loadCards();
}
function editImage(e){
    let src = e.target.parentElement.parentElement.parentElement.parentElement.children[0].src;
    var index = dataArray.map((item) => {return item.url;}).indexOf(src);
    console.log(index)

    let item = dataArray[index];
    console.log(item);

    currID = item.id;
    let editContent = `
            <label for="url">URL</label>
            <input id="edit-url" type="url" name="url" placeholder="url" autocomplete="off" value = "${item.url}" required/>
            <label for="name">Name</label>
            <input id="edit-name" type="text" name="name" placeholder="Name" autocomplete="off" value = "${item.name}" required/>
            <label for="information">Information</label>
            <input id="edit-information" type="text" name="information" placeholder="Information" value = "${item.information}" autocomplete="off" required/>
            
            <div style="display: flex; width: 25%; margin: auto;">
                <input type="submit" value="submit" class="add-submit">
            </div>
        `;
        //console.log(editContent);
    document.querySelector('#edit-form').innerHTML = editContent;
}
function deleteImage(e){
    let src = e.target.parentElement.parentElement.parentElement.parentElement.children[0].src;
    
    var index = dataArray.map((item) => {return item.url;}).indexOf(src);
    dataArray.splice(index, 1);
    loadCards();
    console.log(e.target.parentElement.parentElement.parentElement.parentElement.children[0].src);
}