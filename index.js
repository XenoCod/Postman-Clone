console.log("Post Man")

// Utility Function

// Utility fucntion to get DOM element from string
function elementCount(string){
    let div= document.createElement('div')
    div.innerHTML=string;
    return div.firstElementChild
}

let parametersBox = document.getElementById("parametersBox")
parametersBox.style.display = "none" //Hides the parameters box intially

let addParamCount = 0;//Intialiaze the parameters count


// If the user selects the content type of Custom paramater the Parataers bos show up otherwise it is hidden

//Checking whether the content type is custom parameters

let params = document.getElementById("paramsRadio")
params.addEventListener("click", () => {
    document.getElementById("requestJsonBox").style.display = 'none'
    document.getElementById("parametersBox").style.display = 'block'
})


// Checking whether the JSON option is enalbled and dispaying acoordingly

let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener("click", () => {
    document.getElementById("parametersBox").style.display = 'none'
    document.getElementById("requestJsonBox").style.display = 'block'
})

//If the user click on + button the it adda parameters values

let addParma = document.getElementById("addParam");
addParma.addEventListener('click', () => {
    let addparams = document.getElementById("params");
    let string = `<div class="form-row">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamCount+ 2}</label>
    <div class="row-md-4">
        <input type="text" class="form-control" id="parameterKey${addParamCount+ 2}" placeholder="Enter Parameter  ${addParamCount+ 2} Key">
    </div>
    <div class="row-md-4">
        <input type="text" class="form-control" id="parameterValue${addParamCount+ 2}" placeholder="Enter Parameter  ${addParamCount+ 2} Value">
    </div>
    <button  class="btn btn-primary my-3 deleteParam">Delete</button>

</div>`;



let element=elementCount(string)
addparams.appendChild(element)
//Addiing an event listnetr to deletin the existing params

let deleteParms= document.getElementsByClassName('deleteParam')
for(item of deleteParms){
item.addEventListener('click',(e)=>{
    if(confirm("You sure you want to delete this ?")){

        e.target.parentElement.remove();
    }
   
   
})
}
addParamCount++;

})


//Submit the parameters to fetch
let submit= document.getElementById('submit')
submit.addEventListener('click', ()=>{
    document.getElementById('responsePrism').innerHTML = "Please wait...fetching content"

    let url= document.getElementById('url').value
    let requestType= document.querySelector("input[name= 'requestType']:checked").value;
    let contentType= document.querySelector("input[name= 'contentType']:checked").value;
    

    //If user has used params insteda of json the collect all the params in an object

    if(contentType==='params'){
        data={};
        for(i=0; i<addParamCount+1;i++){
            if(document.getElementById('parameterKey'+(i+1)) != undefined) {
            let key=document.getElementById('parameterKey'+(i+1)).value
            let value=document.getElementById('parameterValue'+(i+1)).value
            data[key]=value;
            }
        }
        data= JSON.stringify(data)
    }
    else{
        data=document.getElementById('requestJsonText').value
    }

    console.log(url)
    console.log(requestType)
    console.log(contentType)
    console.log(data)
    if (requestType=='GET'){
        fetch(url, {
            method: 'GET',   
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }

    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });

    }


})



