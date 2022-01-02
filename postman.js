//take the url as per entered by the user
let url=document.getElementById('urlbox');
//initially hiding the content-type radio buttons and the post methods
let contentType=document.getElementById('dataForPost');
contentType.style.display='none';
let rawJson=document.getElementById('takejson');
rawJson.style.display='none';
let customData=document.getElementById('customparams');
customData.style.display='none';
//adding an event listener on the post and get options of the fieldset
let post=document.getElementById('post');
post.addEventListener('click', ()=>{
    contentType.style.display='flex';
    if(json.checked){
        rawJson.style.display='flex';
    }
    else if(custom.checked){
        customData.style.display='flex';
    }
});
let get=document.getElementById('get');
get.addEventListener('click', ()=>{
    contentType.style.display='none';
    rawJson.style.display='none';
    customData.style.display='none';
});
//adding an event listener on the radio buttons on the content type to accordingly show/hide the fields
let json=document.getElementById('json');
json.addEventListener('click', ()=>{
    rawJson.style.display='flex';
    customData.style.display='none';
});
let custom=document.getElementById('custom');
custom.addEventListener('click', ()=>{
    rawJson.style.display='none';
    customData.style.display='flex';
});
//adding event listener on the + button to include more than one parameters
let plusBtn=document.getElementById('button');
let elemCount=0;
let divCount=0;
let keyCount=1;
let valueCount=1;
plusBtn.addEventListener('click', ()=>{
    let minusDiv=document.getElementById('addedelems');
    let minusHtml=`<div id="addedBtns${divCount++}">
                        <input type="text" id="key${keyCount++}" class="key" placeholder="key">
                        <input type="text" id="value${valueCount++}" class="value" placeholder="value"> 
                        <button id="${elemCount++}" class="button" onclick="deleteFunc(this.id)">-</button> 
                    </div>`;
    minusDiv.innerHTML+= minusHtml;
});
//defining the delete function which deletes the parameter on clicking the minus button
function deleteFunc(index){
    let decide= confirm('Do you really want to delete this parameter?');
    if(decide){
        let toDelete=document.getElementById(`${index}`);
        toDelete.parentElement.remove();
    }
    else{
        alert('The parameter was not deleted');
    }
}
//adding click event listener on the get response button to process the inputs and provide the output
let responsebtn=document.getElementById('submit');
responsebtn.addEventListener('click', processInput);
//defining the processInput function
function processInput(){
    let codeHtml=document.getElementById('code');
    let urlVal=url.value;
    if(urlVal==''){
        codeHtml.innerHTML='please fill all the details properly to get the response!';
        setTimeout(()=>{
            codeHtml.innerHTML='The response will be visible here';
        }, 2500);
    }
    let requestRadio=document.querySelector('input[name="requestType"]:checked').value;
    if(requestRadio=='GET'){
        codeHtml.innerHTML='Please wait, your request is being processed...'; 
        fetch(urlVal, {
            method: 'GET',
        })
        .then(res=>res.text())
        .then(text=>{
            codeHtml.innerHTML=text;
            Prism.highlightAll();
        });
    }
    else if(requestRadio=='POST'){
        codeHtml.innerHTML='Please wait, your request is being processed...'; 
        let data;
        let contentRadio=document.querySelector('input[name="posttype"]:checked').value;
        if(contentRadio=='JSON'){
            data=document.getElementById('jsonInfo').value;
            fetch(urlVal, {
                method: 'POST',
                body: data,
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res=>res.text())
            .then(text=>{
                codeHtml.innerHTML=text;
                Prism.highlightAll();
            });
        }
        else if(contentRadio=='custom'){
            let dataObj={};
            for(i=0; i<keyCount; i++){
                let loopkey=document.getElementById(`key${i}`).value;
                let loopvalue=document.getElementById(`value${i}`).value;
                dataObj[loopkey]=loopvalue;
            }
            data=JSON.stringify(dataObj);
            fetch(urlVal, {
                method: 'POST',
                body: data,
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res=>res.text())
            .then(text=>{
                codeHtml.innerHTML=text;
                Prism.highlightAll();
            });
        }
    }
}
//reloading the window when the reset button is clicked
let resetBtn=document.getElementById('reset');
resetBtn.addEventListener('click', ()=>{
    window.location.reload();
});
