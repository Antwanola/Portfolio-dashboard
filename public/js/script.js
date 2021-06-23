// import axios from "axios"


// let count  = 0
function like (e){
    let  toggle = document.querySelector('#toggle-heart')
toggle.addEventListener('change', (e)=>{
    let count = 0
 if(toggle.checked == true){
     count = +1
    //  console.log(count)
 }
 
 if(toggle.checked == false){
     count = -1
    //  console.log(count)
 }
console.log(count);
axios.post('/admin/likes', {count})
// const data = count
// xhr  = new XMLHttpRequest();
// xhr.open('POST', "/admin/likes")
// xhr.responseType= 'json'
// xhr.send(JSON.stringify(data))

});

}

like()